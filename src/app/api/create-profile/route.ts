//file to hande profile creation
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import bcrypt from 'bcryptjs';
import { getPublicSupabase } from '@/app/lib/supabase';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
    const client = await db.connect();
    const supabase = getPublicSupabase();
    try {
        const formData = await request.formData();
        const fname = formData.get('fname') as string;
        const lname = formData.get('lname') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;
        const image = formData.get('image') as File | null;

        // Validate image size if present
        if (image) {
            const maxSize = 420 * 1024; // 420KB in bytes
            if (image.size > maxSize) {
                return NextResponse.json({ 
                    error: `Image size (${(image.size / 1024).toFixed(1)}KB) exceeds the maximum allowed size of 420KB. Please choose a smaller image.` 
                }, { status: 400 });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if table exists, create if not
        await client.sql`
        CREATE TABLE IF NOT EXISTS profile (
            id SERIAL PRIMARY KEY,
            fname VARCHAR(255) NOT NULL,
            lname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            image VARCHAR(255),
            role VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        // Check if email already exists
        const { rows } = await client.sql`
            SELECT * FROM profile WHERE email = ${email};
        `;
        if (rows.length > 0) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }

        // Handle file upload to Supabase if present
        let imageUrl = null;
        if (image) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `blog-attachments/${fileName}`;

            const { data, error } = await supabase.storage
                .from('blog-attachments')
                .upload(filePath, image);

            if (error) throw error;
            imageUrl = supabase.storage
                .from('blog-attachments')
                .getPublicUrl(filePath).data.publicUrl;
        }

        // Insert into PostgreSQL
        await client.sql`
            INSERT INTO profile (fname, lname, email, phone, password, image, role)
            VALUES (${fname}, ${lname}, ${email}, ${phone}, ${hashedPassword}, ${imageUrl}, ${role})
        `;

        return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release();
    }
}

//UPDATE THE PROFILE IMAGE ALONE
export async function PUT(request: NextRequest) {
    const client = await db.connect();
    const supabase = getPublicSupabase();
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const image = request.body as File | null;

        // Validate image size if present
        if (image) {
            const maxSize = 420 * 1024; // 420KB in bytes
            if (image.size > maxSize) {
                return NextResponse.json({ 
                    error: `Image size (${(image.size / 1024).toFixed(1)}KB) exceeds the maximum allowed size of 420KB. Please choose a smaller image.` 
                }, { status: 400 });
            }
        }

        let imageUrl = null;
        if (image) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `blog-attachments/${fileName}`;

            const { data, error } = await supabase.storage
                .from('blog-attachments')
                .upload(filePath, image);

            if (error) throw error;
            imageUrl = supabase.storage
                .from('blog-attachments')
                .getPublicUrl(filePath).data.publicUrl;
        }

        await client.sql`
        UPDATE profile SET image = ${imageUrl} WHERE id = ${id}
        `;

        return NextResponse.json({ message: 'Profile image updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile image:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release();
    }
}

//get profile email and image from supabase storage
/*export async function GET(request: NextRequest) {
    const client = await db.connect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        const { data, error } = await supabase.storage
            .from('blog-attachments')
            .download(`blog-attachments/${email}`);

        if (error) throw error;
        const imageUrl = supabase.storage
            .from('blog-attachments')
            .getPublicUrl(`blog-attachments/${email}`).data.publicUrl;

        return NextResponse.json({ email: email, imageUrl: imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Error getting profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release(); 
    }
}*/
// Get profile by email (return email and image from DB)
export async function GET(request: NextRequest) {
    const client = await db.connect();
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        const { rows } = await client.sql`
            SELECT email, image FROM profile WHERE email = ${email};
        `;
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }
        return NextResponse.json({ profile: rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error getting profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release(); 
    }
}