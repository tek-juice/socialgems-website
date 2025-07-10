// Route to handle story views
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
   // console.log('=== STORY VIEWS ROUTE START ===');
    
    const session = await getSession(request);
   // console.log('Session check result:', session ? 'Session found' : 'No session');
    
    const { story_id } = await request.json();
   // console.log('Request body - story_id:', story_id);
    
    if (!story_id) {
       // console.log('No story_id provided');
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    const client = await db.connect();
   // console.log('Database connection established');
    
    try {
        // Get user ID if logged in
        let userId = null;
        if (session) {
           // console.log('User email from session:', session.user.email);
           const userEmail = session.user.email;
           if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
           }
            const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
           // console.log('User query result rows:', userRes.rows.length);
            
            if (userRes.rows.length > 0) {
                userId = userRes.rows[0].id;
               // console.log('User ID found:', userId);
            }
        }

        // Get IP address for anonymous tracking
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
       // console.log('IP address:', ip);

        // Get user agent
        const userAgent = request.headers.get('user-agent') || 'unknown';
       // console.log('User agent:', userAgent);

        // Check if view already exists (within 1 hour for same user/IP instead of 24 hours)
        const existingView = await client.query(
            `SELECT id FROM story_views 
             WHERE story_id = $1 
             AND (user_id = $2 OR (user_id IS NULL AND ip_address = $3))
             AND created_at > NOW() - INTERVAL '1 hour'`,
            [story_id, userId, ip]
        );
       // console.log('Existing view check result rows:', existingView.rows.length);
        
        if (existingView.rows.length > 0) {
           // console.log('View already recorded within 1 hour');
            return NextResponse.json({ 
                message: 'View already recorded',
                viewCount: await getViewCount(client, story_id)
            }, { status: 200 });
        }

        // Insert the view record
       // console.log('Inserting view record - story_id:', story_id, 'user_id:', userId, 'ip:', ip);
        await client.query(
            `INSERT INTO story_views (story_id, user_id, ip_address, user_agent) VALUES ($1, $2, $3, $4)`,
            [story_id, userId, ip, userAgent]
        );
       // console.log('View record inserted successfully');

        // Get updated view count
        const viewCount = await getViewCount(client, story_id);
       // console.log('Updated view count:', viewCount);

       // console.log('=== STORY VIEWS ROUTE SUCCESS ===');
        return NextResponse.json({ 
            message: 'View recorded successfully',
            viewCount
        }, { status: 200 });
    } catch (error) {
       // console.error('=== STORY VIEWS ROUTE ERROR ===');
       // console.error('Error recording view:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
    } finally {
       // console.log('Releasing database connection');
        client.release();
    }
}

// Helper function to get view count
async function getViewCount(client: any, storyId: number): Promise<number> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_views WHERE story_id = $1`,
        [storyId]
    );
    return parseInt(result.rows[0].count);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('story_id');
    
    if (!storyId) {
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    const client = await db.connect();
    try {
        const viewCount = await getViewCount(client, parseInt(storyId));
        return NextResponse.json({ viewCount }, { status: 200 });
    } catch (error) {
       // console.error('Error getting view count:', error);
        return NextResponse.json({ error: 'Failed to get view count' }, { status: 500 });
    } finally {
        client.release();
    }
} 