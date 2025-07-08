//this route picks approved blogs from database.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
    const client = await db.connect();
    try {
        const approvedBlogs = await client.sql`
        SELECT id, title, tagline, description, attachment, created_at FROM blog_post
        WHERE approved = 'YES'::text
        ORDER BY created_at DESC
        `;

        //Transform blogs to ensure proper image URLs
        const blogsWithMedia = approvedBlogs.rows.map(blog => ({
            ...blog,
            //ensure attachment URL is properly formatted
            attachment: blog.attachment?.startsWith('http')
                ? blog.attachment
                : blog.attachment
                    ?`https://${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '')}/storage/
                    v1/object/public/blog-attachments${blog.attachment}`
                    : null
        }));

        return NextResponse.json({
            success: true,
            blogs: blogsWithMedia
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching approved blogs:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch Approved blogs'
        }, { status: 500 });
    } finally {
        client.release();
    }
}