// Route to handle story saves
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
   // console.log('=== STORY SAVES ROUTE START ===');
    
    const session = await getSession(request);
   // console.log('Session check result:', session ? 'Session found' : 'No session');
    
    if (!session) {
       // console.log('No session found, user must be logged in to save');
        return NextResponse.json({ error: 'You must be logged in to save stories' }, { status: 401 });
    }

    const { story_id } = await request.json();
   // console.log('Request body - story_id:', story_id);
    
    if (!story_id) {
       // console.log('No story_id provided');
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    const client = await db.connect();
   // console.log('Database connection established');
    
    try {
        // Get user ID from session
       // console.log('Querying user profile for email:', session.user.email);
        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
       // console.log('User query result rows:', userRes.rows.length);
        
        if (userRes.rows.length === 0) {
           // console.log('User not found in database');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;
       // console.log('User ID found:', userId);

        // Check if user has already saved this story
       // console.log('Checking for existing save - story_id:', story_id, 'user_id:', userId);
        const existingSave = await client.query(
            `SELECT id FROM story_saves WHERE story_id = $1 AND user_id = $2`,
            [story_id, userId]
        );
       // console.log('Existing save check result rows:', existingSave.rows.length);
        
        if (existingSave.rows.length > 0) {
           // console.log('User has already saved this story, removing save');
            // Remove the save
            await client.query(
                `DELETE FROM story_saves WHERE story_id = $1 AND user_id = $2`,
                [story_id, userId]
            );
           // console.log('Save removed successfully');
            
            const saveCount = await getSaveCount(client, story_id);
            const isSaved = false;
           // console.log('Updated save count:', saveCount);

           // console.log('=== STORY SAVES ROUTE SUCCESS (UNSAVED) ===');
            return NextResponse.json({ 
                message: 'Save removed successfully',
                saveCount,
                isSaved
            }, { status: 200 });
        }

        // Save the story
       // console.log('Inserting save record - story_id:', story_id, 'user_id:', userId);
        await client.query(
            `INSERT INTO story_saves (story_id, user_id) VALUES ($1, $2)`,
            [story_id, userId]
        );
       // console.log('Save record inserted successfully');

        // Get updated save count
        const saveCount = await getSaveCount(client, story_id);
        const isSaved = true;
       // console.log('Updated save count:', saveCount);

       // console.log('=== STORY SAVES ROUTE SUCCESS (SAVED) ===');
        return NextResponse.json({ 
            message: 'Story saved successfully',
            saveCount,
            isSaved
        }, { status: 200 });
    } catch (error) {
       // console.error('=== STORY SAVES ROUTE ERROR ===');
       // console.error('Error handling save:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to handle save' }, { status: 500 });
    } finally {
       // console.log('Releasing database connection');
        client.release();
    }
}

// Helper function to get save count
async function getSaveCount(client: any, storyId: number): Promise<number> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_saves WHERE story_id = $1`,
        [storyId]
    );
    return parseInt(result.rows[0].count);
}

// Helper function to check if user has saved the story
async function isUserSaved(client: any, storyId: number, userId: number): Promise<boolean> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_saves WHERE story_id = $1 AND user_id = $2`,
        [storyId, userId]
    );
    return parseInt(result.rows[0].count) > 0;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('story_id');
    const session = await getSession(request);
    
    if (!storyId) {
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    const client = await db.connect();
    try {
        const saveCount = await getSaveCount(client, parseInt(storyId));
        let isSaved = false;
        
        if (session) {
            const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
            if (userRes.rows.length > 0) {
                const userId = userRes.rows[0].id;
                isSaved = await isUserSaved(client, parseInt(storyId), userId);
            }
        }
        
        return NextResponse.json({ saveCount, isSaved }, { status: 200 });
    } catch (error) {
       // console.error('Error getting save data:', error);
        return NextResponse.json({ error: 'Failed to get save data' }, { status: 500 });
    } finally {
        client.release();
    }
} 