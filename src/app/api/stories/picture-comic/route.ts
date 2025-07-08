//route to handle picture/comic stories
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    console.log('=== PICTURE-COMIC ROUTE STARTED ===');
    
    const session = await getSession(request);
    if (!session) {
        //console.log('❌ Unauthorized - No session found');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    //console.log('✅ Session found for user:', session.user.email);

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const images = formData.getAll('image') as File[];

    //console.log('📝 Form data received:');
    //console.log('- Title:', title);
    //console.log('- Description:', description);
    //console.log('- Number of images:', images.length);

    if (!title || !images.length) {
        //console.log('❌ Validation failed - missing title or images');
        return NextResponse.json({ error: 'Title and at least one image are required.' }, { status: 400 });
    }
    if (images.length > 4) {
        //console.log('❌ Validation failed - too many images:', images.length);
        return NextResponse.json({ error: 'You can upload up to 4 images only.' }, { status: 400 });
    }

    // Validate and upload images
    const imageUrls: string[] = [];
    //console.log('🔄 Starting image upload process...');
    
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        //console.log(`\n📸 Processing image ${i + 1}/${images.length}:`);
        //console.log('- File name:', image.name);
        //console.log('- File size:', image.size, 'bytes');
        //console.log('- File type:', image.type);
        
        if (!(image instanceof File)) {
            //console.log('❌ Invalid file object');
            continue;
        }
        
        if (image.size > 102400) {
           // console.log('❌ File too large:', image.size, 'bytes (max: 102400)');
            return NextResponse.json({ error: 'Each image must be 100KB or less.' }, { status: 400 });
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(image.type)) {
            //console.log('❌ Invalid file type:', image.type);
            return NextResponse.json({ error: 'Invalid image format.' }, { status: 400 });
        }
        
        const fileExt = image.name.split('.').pop();
        const filePath = `picture-attachments/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        //console.log('- Generated file path:', filePath);
        
        //console.log('📤 Attempting Supabase upload...');
        try {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('picture-attachments')
                .upload(filePath, image, { contentType: image.type });
                
            if (uploadError) {
                //console.log('❌ Supabase upload failed:', uploadError);
                return NextResponse.json({ error: 'Failed to upload image: ' + uploadError.message }, { status: 500 });
            }
            
            //console.log('✅ Supabase upload successful:', uploadData);
            
            const { data: publicUrlData } = supabase.storage.from('picture-attachments').getPublicUrl(filePath);
            const imageUrl = publicUrlData?.publicUrl;
            //console.log('🔗 Generated public URL:', imageUrl);
            
            if (imageUrl) {
                imageUrls.push(imageUrl);
                //console.log('✅ Image URL added to array');
            } else {
                //console.log('❌ Failed to generate public URL');
            }
        } catch (error) {
            //console.log('❌ Exception during upload:', error);
            return NextResponse.json({ error: 'Upload exception: ' + (error as Error).message }, { status: 500 });
        }
    }

    //console.log('\n📊 Upload summary:');
    //console.log('- Total images processed:', images.length);
    //console.log('- Successful uploads:', imageUrls.length);
    //console.log('- Image URLs:', imageUrls);

    const client = await db.connect();
    try {
        //console.log('\n🗄️ Connecting to database...');
        
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
        if (userRes.rows.length === 0) {
            //console.log('❌ User not found in database');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const user_id = userRes.rows[0].id;
        //console.log('✅ User found, ID:', user_id);

        // Insert into stories
        //console.log('📝 Inserting into stories table...');
        const { rows } = await client.sql`
            INSERT INTO stories (user_id, title, type, status)
            VALUES (${user_id}, ${title}, 'picture_comic', 'draft')
            RETURNING id
        `;
        const storyId = rows[0].id;
        //console.log('✅ Story inserted, ID:', storyId);

        // Insert into picture_stories
        //console.log('🖼️ Inserting into picture_stories table...');
        const imageUrlsArray = '{' + imageUrls.map(url => `"${url}"`).join(',') + '}';
        //console.log('📋 Image URLs array for DB:', imageUrlsArray);
        
        await client.sql`
            INSERT INTO picture_stories (story_id, image_urls, content)
            VALUES (${storyId}, ${imageUrlsArray}, ${description})
        `;
        //console.log('✅ Picture story data inserted successfully');

        //console.log('\n🎉 COMPLETE SUCCESS - Picture/Comic story uploaded');
        return NextResponse.json({ message: 'Picture/Comic story uploaded', storyId, imageUrls }, { status: 201 });
    } catch (error) {
        //console.log('❌ Database error:', error);
        return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
        //console.log('🔌 Database connection released');
    }
}
