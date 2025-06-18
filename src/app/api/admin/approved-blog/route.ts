//this route picks approved blogs from database.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
    const client = await db.connect();
    try {
        const approvedBlogs = await client.sql`
        SELECT * FROM blog_post
        WHERE approved = 'YES'::text
        ORDER BY created_at DESC
        `;
        return NextResponse.json({
            success: true,
            blogs: approvedBlogs.rows
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