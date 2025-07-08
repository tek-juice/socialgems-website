//file to handle db creation for blogpost.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import  { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    const client = await db.connect();
    try {
        // Drop existing table if it exists
        //await client.sql`DROP TABLE IF EXISTS blog_post`;

        // Create new table with correct structure
       /* await client.sql`
            CREATE TABLE blog_post (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                tagline TEXT NOT NULL,
                description TEXT NOT NULL,
                attachment VARCHAR(255),
                approved VARCHAR(3) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;*/

        // Parse form data
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const tagline = formData.get('tagline') as string;
        const description = formData.get('description') as string;
        const attachment = formData.get('attachment') as File | null;

        // Handle file upload to Supabase if present
        let attachmentUrl = null;
        if (attachment) {
            const fileExt = attachment.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `blog-attachments/${fileName}`;

            const { data, error } = await supabase.storage
                .from('blog-attachments')
                .upload(filePath, attachment);

            if (error) throw error;
            //Get public URL
            attachmentUrl = supabase.storage
                .from('blog-attachments')
                .getPublicUrl(filePath).data.publicUrl;
            
        }

        //insert value in neon PostgreSQL table
        const insertBlog = await client.sql`
            INSERT INTO blog_post (title, tagline, description, attachment)
            VALUES (${title}, ${tagline}, ${description}, ${attachmentUrl})
            RETURNING *
        `;
        return NextResponse.json({ 
            success: true,
            message: 'Blog post created successfully', 
            blog: insertBlog.rows[0] 
        }, { status: 200 });
    } catch (error) {
        console.error('Error in blog creation:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to create blog post'
        }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function PUT(request: NextRequest) {
    const client = await db.connect();
    try {
        const { id, title, tagline, description, attachment } = await request.json();
        
        // Validate required fields
        if (!id) {
            return NextResponse.json({ 
                success: false,
                error: 'Blog ID is required' 
            }, { status: 400 });
        }

        // Update blog post
        const updateBlog = await client.sql`
            UPDATE blog_post 
            SET 
                title = COALESCE(${title}, title),
                tagline = COALESCE(${tagline}, tagline),
                description = COALESCE(${description}, description),
                attachment = COALESCE(${attachment}, attachment)
            WHERE id = ${id}
            RETURNING *
        `;

        if (updateBlog.rowCount === 0) {
            return NextResponse.json({ 
                success: false,
                error: 'Blog post not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true,
            message: 'Blog post updated successfully', 
            blog: updateBlog.rows[0] 
        }, { status: 200 });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to update blog post'
        }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function PATCH(request: NextRequest) {
    const client = await db.connect();
    try {
        const { id, action } = await request.json();
        
        if (!id || !action) {
            return NextResponse.json({ 
                success: false,
                error: 'Blog ID and action are required' 
            }, { status: 400 });
        }

        let query;
        if (action === 'approve') {
            query = client.sql`
                UPDATE blog_post 
                SET approved = 'YES'::text
                WHERE id = ${id}
                RETURNING *
            `;
        } else if (action === 'delete') {
            query = client.sql`
                DELETE FROM blog_post 
                WHERE id = ${id}
                RETURNING *
            `;
        } else {
            return NextResponse.json({ 
                success: false,
                error: 'Invalid action' 
            }, { status: 400 });
        }

        const result = await query;

        if (result.rowCount === 0) {
            return NextResponse.json({ 
                success: false,
                error: 'Blog post not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true,
            message: action === 'approve' ? 'Blog post approved successfully' : 'Blog post deleted successfully',
            blog: result.rows[0]
        }, { status: 200 });
    } catch (error) {
        console.error('Error in blog action:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to perform action on blog post'
        }, { status: 500 });
    } finally {
        client.release();
    }
}

export async function GET() {
    const client = await db.connect();
    try {
        const blogs = await client.sql`
            SELECT * FROM blog_post 
            ORDER BY created_at DESC
        `;
        
        return NextResponse.json({ 
            success: true,
            blogs: blogs.rows 
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Failed to fetch blogs'
        }, { status: 500 });
    } finally {
        client.release();
    }
}