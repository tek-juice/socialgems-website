import { NextRequest, NextResponse } from "next/server";

import { db } from "@/app/lib/db";

// DELETE function to delete/reject a story
export async function POST(request: NextRequest) {
    const client = await db.connect();
    try {
        const body = await request.json();
        const { id: storyId } = body;
        
        if (!storyId) {
            return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
        }
        
        // First, get the story to confirm it exists
        const storyRes = await client.sql`SELECT id, title, type FROM stories WHERE id = ${storyId}`;
        
        if (storyRes.rows.length === 0) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }
        
        const story = storyRes.rows[0];
        
        // Delete the story (cascade will handle related tables)
        await client.sql`DELETE FROM stories WHERE id = ${storyId}`;
        
        return NextResponse.json({ 
            message: 'Story deleted successfully',
            deletedStory: story
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
    }
}