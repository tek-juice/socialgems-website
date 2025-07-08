// PUT function to update story status and    admin feedback
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
export async function PUT(request: NextRequest) {   
    const client = await db.connect();
    try {
        const body = await request.json();
        const { storyId, status, adminFeedback } = body;
        
        if (!storyId) {
            return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
        }
        
        if (!status || !['draft', 'approved', 'rejected'].includes(status)) {
            return NextResponse.json({ error: 'Valid status is required (draft, approved, rejected)' }, { status: 400 });
        }
        
        // Update the story with new status and admin feedback
        const { rows } = await client.sql`
            UPDATE stories 
            SET status = ${status}, 
                admin_feedback = ${adminFeedback || null},
                updated_at = NOW()
            WHERE id = ${storyId}
            RETURNING id, title, status, admin_feedback, updated_at
        `;
        
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Story not found' }, { status: 404 });
        }
        
        const updatedStory = rows[0];
        
        return NextResponse.json({ 
            message: 'Story updated successfully',
            story: updatedStory
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
    }
}

