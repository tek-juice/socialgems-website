//this route retrieves a report of all stories written by particular user, approved, rejected and those still in draft/under review.
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { db } from '@/app/lib/db';

export async function GET(request: NextRequest) {
    const session = await getSession(request);
    if(!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await db.connect();
    try {
        //handle proper type checking for userEmail and handle at runtime
        const userEmail = session.user.email;
        if(typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        
        if(userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;

        const storiesRes = await client.sql`SELECT * FROM stories WHERE user_id = ${userId}`;
        const stories = storiesRes.rows;

        // Count by type
        const typeCounts = {
            story: 0,
            picture_comic: 0,
            audio: 0,
            poll: 0,
            trivia_quiz: 0
        };
        // Approved by type
        const approvedByType = {
            story: 0,
            picture_comic: 0,
            audio: 0,
            poll: 0,
            trivia_quiz: 0
        };
        stories.forEach((story: any) => {
            const t = story.type as keyof typeof typeCounts;
            if (t in typeCounts) typeCounts[t]!++;
            if (story.status === 'approved' && t in approvedByType) approvedByType[t]!++;
        });

        // Count by status
        const statusCounts = {
            approved: 0,
            rejected: 0,
            draft: 0,
            feedback: 0
        };
        stories.forEach((story: any) => {
            const s = story.status as keyof typeof statusCounts;
            if (s in statusCounts) statusCounts[s]!++;
        });

        // Stories with feedback (admin_feedback not null/empty, status is draft)
        const feedbackStories = stories.filter((story: any) => story.status === 'draft' && story.admin_feedback && story.admin_feedback.trim() !== '');

        return NextResponse.json({
            totalStories: stories.length,
            totalDraft: statusCounts.draft,
            typeCounts,
            statusCounts,
            totalApproved: statusCounts.approved,
            approvedByType,
            totalWithFeedback: feedbackStories.length,
            stories
        }, { status: 200 });
    } catch (error) {
        console.error('Error getting report:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release();
    }
}
