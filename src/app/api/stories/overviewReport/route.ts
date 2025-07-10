//this route fetches an overview report of all stories.
//this route retrieves a report of all stories written by particular user, approved, rejected and those still in draft/under review.
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { db } from '@/app/lib/db';

export async function GET(request: NextRequest) {
    /*const session = await getSession(request);
    if(!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }*/

    const client = await db.connect();
    try {
        const storiesRes = await client.sql`SELECT * FROM stories order by created_at desc limit 100`;
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

        // Get edited stories (stories where updated_at is different from created_at)
        const editedStories = stories.filter((story: any) => {
            const created = new Date(story.created_at);
            const updated = new Date(story.updated_at);
            return updated.getTime() !== created.getTime();
        });

        // Get detailed edited stories with user info
        const detailedEditedStoriesRes = await client.sql`
            SELECT 
                s.id as story_id,
                s.title,
                s.type,
                s.status,
                s.created_at,
                s.updated_at,
                s.admin_feedback,
                s.tags,
                s.user_id,
                p.fname,
                p.lname,
                p.email,
                p.image as user_image,
                -- Text story content
                ts.content as text_content,
                -- Picture story data
                ps.image_urls,
                ps.content as picture_description,
                -- Audio story data
                audio.audio_url,
                -- Poll data
                poll.question as poll_question,
                poll.options as poll_options,
                poll.multiple_answers,
                -- Trivia quiz data
                tq.question as trivia_question,
                tq.correct_answer,
                tq.options as trivia_options,
                tq.time_limit
            FROM stories s
            JOIN profile p ON s.user_id = p.id
            LEFT JOIN text_stories ts ON s.id = ts.story_id
            LEFT JOIN picture_stories ps ON s.id = ps.story_id
            LEFT JOIN audio_stories audio ON s.id = audio.story_id
            LEFT JOIN polls poll ON s.id = poll.story_id
            LEFT JOIN trivia_quizzes tq ON s.id = tq.story_id
            WHERE s.updated_at != s.created_at
            ORDER BY s.updated_at DESC
        `;
        const detailedEditedStories = detailedEditedStoriesRes.rows;

        // Get stories with feedback (using same structure as checkStory API)
        const feedbackStoriesRes = await client.sql`
            SELECT 
                s.id as story_id,
                s.title,
                s.type,
                s.status,
                s.created_at,
                s.updated_at,
                s.admin_feedback,
                s.tags,
                s.user_id,
                p.fname,
                p.lname,
                p.email,
                p.image as user_image,
                -- Text story content
                ts.content as text_content,
                -- Picture story data
                ps.image_urls,
                ps.content as picture_description,
                -- Audio story data
                audio.audio_url,
                -- Poll data
                poll.question as poll_question,
                poll.options as poll_options,
                poll.multiple_answers,
                -- Trivia quiz data
                tq.question as trivia_question,
                tq.correct_answer,
                tq.options as trivia_options,
                tq.time_limit
            FROM stories s
            JOIN profile p ON s.user_id = p.id
            LEFT JOIN text_stories ts ON s.id = ts.story_id
            LEFT JOIN picture_stories ps ON s.id = ps.story_id
            LEFT JOIN audio_stories audio ON s.id = audio.story_id
            LEFT JOIN polls poll ON s.id = poll.story_id
            LEFT JOIN trivia_quizzes tq ON s.id = tq.story_id
            WHERE s.status = 'draft' AND s.admin_feedback IS NOT NULL AND s.admin_feedback != ''
            ORDER BY s.updated_at DESC
        `;
        const feedbackStories = feedbackStoriesRes.rows;

        // Get active users with their story counts
        const activeUsersRes = await client.sql`
            SELECT 
                p.id,
                p.fname,
                p.lname,
                p.email,
                p.image,
                COUNT(s.id) as total_stories,
                COUNT(CASE WHEN s.status = 'approved' THEN 1 END) as approved_stories
            FROM profile p
            LEFT JOIN stories s ON p.id = s.user_id
            WHERE s.id IS NOT NULL
            GROUP BY p.id, p.fname, p.lname, p.email, p.image
            ORDER BY total_stories DESC
            LIMIT 10
        `;
        const activeUsers = activeUsersRes.rows;

        return NextResponse.json({
            totalStories: stories.length,
            totalDraft: statusCounts.draft,
            typeCounts,
            statusCounts,
            totalApproved: statusCounts.approved,
            approvedByType,
            totalWithFeedback: feedbackStories.length,
            editedStories: editedStories.length,
            activeUsers,
            stories,
            detailedEditedStories,
            feedbackStories
        }, { status: 200 });
    } catch (error) {
        console.error('Error getting report:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.release();
    }
}
