//route to handle approve stories
//PATCH function to approve a story
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function PATCH(request: NextRequest) {
    
    const client = await db.connect();
    try {
        const body = await request.json();
        const { storyId } = body;
        
        
        if (!storyId) {
            return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
        }
        
        // First, check the current status of the story
        const statusCheck = await client.sql`
            SELECT id, title, status, type 
            FROM stories 
            WHERE id = ${storyId}
        `;
        
        if (statusCheck.rows.length === 0) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }
        
        const story = statusCheck.rows[0];
        
        // Check if story is in draft status
        if (story.status !== 'draft') {
            return NextResponse.json({ 
                error: 'Story cannot be approved. Current status: ' + story.status,
                currentStatus: story.status
            }, { status: 400 });
        }
        
        // Update the story status to approved
        const { rows } = await client.sql`
            UPDATE stories 
            SET status = 'approved', 
                updated_at = NOW()
            WHERE id = ${storyId}
            RETURNING id, title, status, type, updated_at
        `;
        
        const approvedStory = rows[0];
        
        return NextResponse.json({ 
            message: 'Story approved successfully',
            story: approvedStory
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
    }
}
