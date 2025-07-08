// Route to handle story likes
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
   // console.log('=== STORY LIKES ROUTE START ===');
    
    const session = await getSession(request);
   // console.log('Session check result:', session ? 'Session found' : 'No session');
    
    if (!session) {
       // console.log('No session found, user must be logged in to like');
        return NextResponse.json({ error: 'You must be logged in to like stories' }, { status: 401 });
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

        // Check if user has already liked this story
       // console.log('Checking for existing like - story_id:', story_id, 'user_id:', userId);
        const existingLike = await client.query(
            `SELECT id FROM story_likes WHERE story_id = $1 AND user_id = $2`,
            [story_id, userId]
        );
        console.log('Existing like check result rows:', existingLike.rows.length);
        
        if (existingLike.rows.length > 0) {
           // console.log('User has already liked this story, removing like');
            // Unlike the story
            await client.query(
                `DELETE FROM story_likes WHERE story_id = $1 AND user_id = $2`,
                [story_id, userId]
            );
           // console.log('Like removed successfully');
            
            const likeCount = await getLikeCount(client, story_id);
            const isLiked = false;
           // console.log('Updated like count:', likeCount);

           // console.log('=== STORY LIKES ROUTE SUCCESS (UNLIKED) ===');
            return NextResponse.json({ 
                message: 'Like removed successfully',
                likeCount,
                isLiked
            }, { status: 200 });
        }

        // Like the story
       // console.log('Inserting like record - story_id:', story_id, 'user_id:', userId);
        await client.query(
            `INSERT INTO story_likes (story_id, user_id) VALUES ($1, $2)`,
            [story_id, userId]
        );
       // console.log('Like record inserted successfully');

        // Get updated like count
        const likeCount = await getLikeCount(client, story_id);
        const isLiked = true;
       // console.log('Updated like count:', likeCount);

       // console.log('=== STORY LIKES ROUTE SUCCESS (LIKED) ===');
        return NextResponse.json({ 
            message: 'Story liked successfully',
            likeCount,
            isLiked
        }, { status: 200 });
    } catch (error) {
       // console.error('=== STORY LIKES ROUTE ERROR ===');
       // console.error('Error handling like:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to handle like' }, { status: 500 });
    } finally {
       // console.log('Releasing database connection');
        client.release();
    }
}

// Helper function to get like count
async function getLikeCount(client: any, storyId: number): Promise<number> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_likes WHERE story_id = $1`,
        [storyId]
    );
    return parseInt(result.rows[0].count);
}

// Helper function to check if user has liked the story
async function isUserLiked(client: any, storyId: number, userId: number): Promise<boolean> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_likes WHERE story_id = $1 AND user_id = $2`,
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
        const likeCount = await getLikeCount(client, parseInt(storyId));
        let isLiked = false;
        
        if (session) {
            const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
            if (userRes.rows.length > 0) {
                const userId = userRes.rows[0].id;
                isLiked = await isUserLiked(client, parseInt(storyId), userId);
            }
        }
        
        return NextResponse.json({ likeCount, isLiked }, { status: 200 });
    } catch (error) {
       // console.error('Error getting like data:', error);
        return NextResponse.json({ error: 'Failed to get like data' }, { status: 500 });
    } finally {
        client.release();
    }
} 