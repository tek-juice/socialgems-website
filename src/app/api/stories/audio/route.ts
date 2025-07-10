//route to handle audio upload
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    //console.log('=== AUDIO ROUTE STARTED ===');
    
    const session = await getSession(request);
    if (!session) {
        //console.log('❌ Unauthorized - No session found');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
   // console.log('✅ Session found for user:', session.user.email);

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const audioFile = formData.get('audio') as File;

    //console.log('📝 Form data received:');
    //console.log('- Title:', title);
    //console.log('- Description:', description);
    //console.log('- Audio file:', audioFile ? `${audioFile.name} (${audioFile.size} bytes, ${audioFile.type})` : 'None');

    if (!title) {
        //console.log('❌ Validation failed - missing title');
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    
    if (!audioFile) {
        //console.log('❌ Validation failed - no audio file uploaded');
        return NextResponse.json({ error: 'No audio file uploaded' }, { status: 400 });
    }
    
    if (audioFile.size > 2 * 1024 * 1024) {
        //console.log('❌ File too large:', audioFile.size, 'bytes (max: 2MB)');
        return NextResponse.json({ error: 'Audio file must be 2MB or less.' }, { status: 400 });
    }
    
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/x-m4a', 'audio/wav', 'audio/ogg'];
    if (!allowedTypes.includes(audioFile.type)) {
        //console.log('❌ Invalid file type:', audioFile.type);
        return NextResponse.json({ error: 'Invalid audio format.' }, { status: 400 });
    }

    //console.log('✅ File validation passed');

    // Upload to Supabase Storage
    const fileExt = audioFile.name.split('.').pop();
    const filePath = `audio-attachments/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    //console.log('📤 Attempting Supabase upload...');
    //console.log('- File path:', filePath);
    
    try {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('audio-attachments')
            .upload(filePath, audioFile, { contentType: audioFile.type });

        if (uploadError) {
            //console.log('❌ Supabase upload failed:', uploadError);
            return NextResponse.json({ error: 'Failed to upload audio: ' + uploadError.message }, { status: 500 });
        }

        //console.log('✅ Supabase upload successful:', uploadData);

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from('audio-attachments').getPublicUrl(filePath);
        const audioUrl = publicUrlData?.publicUrl;
        //console.log('🔗 Generated public URL:', audioUrl);

        if (!audioUrl) {
            //console.log('❌ Failed to generate public URL');
            return NextResponse.json({ error: 'Failed to generate audio URL' }, { status: 500 });
        }

        const client = await db.connect();
        try {
            //console.log('\n🗄️ Connecting to database...');
            
            //const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
            const userEmail = session.user.email;
                if (typeof userEmail !== 'string') {
                return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
                }
                
            const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
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
                VALUES (${user_id}, ${title}, 'audio', 'draft')
                RETURNING id
            `;
            const storyId = rows[0].id;
            //console.log('✅ Story inserted, ID:', storyId);

            // Insert into audio_stories
            //console.log('🎵 Inserting into audio_stories table...');
            await client.sql`
                INSERT INTO audio_stories (story_id, audio_url)
                VALUES (${storyId}, ${audioUrl})
            `;
            //console.log('✅ Audio story data inserted successfully');

            //console.log('\n🎉 COMPLETE SUCCESS - Audio story uploaded');
            return NextResponse.json({ message: 'Audio story uploaded', storyId, audioUrl }, { status: 201 });
        } catch (error) {
            //console.log('❌ Database error:', error);
            return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
        } finally {
            await client.release();
            //console.log('🔌 Database connection released');
        }
    } catch (error) {
        //console.log('❌ Exception during upload:', error);
        return NextResponse.json({ error: 'Upload exception: ' + (error as Error).message }, { status: 500 });
    }
}