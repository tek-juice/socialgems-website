// Route to handle story shares
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
   // console.log('=== STORY SHARES ROUTE START ===');
    
    const session = await getSession(request);
   // console.log('Session check result:', session ? 'Session found' : 'No session');
    
    const { story_id, platform } = await request.json();
   // console.log('Request body - story_id:', story_id, 'platform:', platform);
    
    if (!story_id) {
       // console.log('No story_id provided');
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    if (!platform) {
       // console.log('No platform provided');
        return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
    }
    
    const validPlatforms = ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email', 'copy_link'];
    if (!validPlatforms.includes(platform)) {
       // console.log('Invalid platform provided:', platform);
        return NextResponse.json({ error: 'Invalid platform. Use: facebook, twitter, linkedin, whatsapp, email, copy_link' }, { status: 400 });
    }
    
    const client = await db.connect();
   // console.log('Database connection established');
    
    try {
        // Get user ID if logged in
        let userId = null;
        if (session) {
           // console.log('User email from session:', session.user.email);
            const userRes = await client.sql`SELECT id FROM profile WHERE email = ${session.user.email}`;
           // console.log('User query result rows:', userRes.rows.length);
            
            if (userRes.rows.length > 0) {
                userId = userRes.rows[0].id;
               // console.log('User ID found:', userId);
            }
        }

        // Get IP address for anonymous tracking
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
       //  console.log('IP address:', ip);

        await client.query(
            `INSERT INTO story_shares (story_id, user_id, platform, ip_address) VALUES ($1, $2, $3, $4)`,
            [story_id, userId, platform, ip]
        );
       // console.log('Share record inserted successfully');

        // Get updated share count
        const shareCount = await getShareCount(client, story_id);
       // console.log('Updated share count:', shareCount);

       // console.log('=== STORY SHARES ROUTE SUCCESS ===');
        return NextResponse.json({ 
            message: 'Share recorded successfully',
            shareCount,
            platform
        }, { status: 200 });
    } catch (error) {
       // console.error('=== STORY SHARES ROUTE ERROR ===');
       // console.error('Error recording share:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to record share' }, { status: 500 });
    } finally {
       // console.log('Releasing database connection');
        client.release();
    }
}

// Helper function to get share count
async function getShareCount(client: any, storyId: number): Promise<number> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_shares WHERE story_id = $1`,
        [storyId]
    );
    return parseInt(result.rows[0].count);
}

// Helper function to get share count by platform
async function getShareCountByPlatform(client: any, storyId: number, platform: string): Promise<number> {
    const result = await client.query(
        `SELECT COUNT(*) as count FROM story_shares WHERE story_id = $1 AND platform = $2`,
        [storyId, platform]
    );
    return parseInt(result.rows[0].count);
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('story_id');
    const platform = searchParams.get('platform');
    
    if (!storyId) {
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }
    
    const client = await db.connect();
    try {
        const shareCount = await getShareCount(client, parseInt(storyId));
        
        let platformCount = null;
        if (platform) {
            platformCount = await getShareCountByPlatform(client, parseInt(storyId), platform);
        }
        
        return NextResponse.json({ 
            shareCount, 
            platformCount: platformCount ? { [platform as string]: platformCount } : null 
        }, { status: 200 });
    } catch (error) {
       // console.error('Error getting share data:', error);
        return NextResponse.json({ error: 'Failed to get share data' }, { status: 500 });
    } finally {
        client.release();
    }
} 