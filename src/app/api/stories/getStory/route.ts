// Route to get a single story with all details for editing
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('id');

    if (!storyId) {
        return NextResponse.json({ error: 'Story ID is required' }, { status: 400 });
    }

    const client = await db.connect();
    try {
        // Get user ID from session
        const userEmail = session.user.email; //type checking and handling at runtime
        if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        if (userRes.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;

        // Get story with all related data
        const query = `
            SELECT 
                s.id as story_id,
                s.title,
                s.type,
                s.status,
                s.created_at,
                s.updated_at,
                s.admin_feedback,
                s.tags,
                p.id as user_id,
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
            WHERE s.id = $1 AND s.user_id = $2
        `;
        
        const { rows } = await client.query(query, [storyId, userId]);
        
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Story not found or access denied' }, { status: 404 });
        }

        const story = rows[0];
        
        // Process the story data based on type
        let processedStory: any = {
            story_id: story.story_id,
            title: story.title,
            type: story.type,
            status: story.status,
            created_at: story.created_at,
            updated_at: story.updated_at,
            admin_feedback: story.admin_feedback,
            tags: story.tags || [],
            user_id: story.user_id,
            fname: story.fname,
            lname: story.lname,
            email: story.email,
            user_image: story.user_image
        };

        // Add type-specific content
        switch (story.type) {
            case 'story':
                processedStory = {
                    ...processedStory,
                    content: story.text_content
                };
                break;
            case 'picture_comic':
                processedStory = {
                    ...processedStory,
                    image_urls: story.image_urls,
                    description: story.picture_description
                };
                break;
            case 'audio':
                processedStory = {
                    ...processedStory,
                    audio_url: story.audio_url
                };
                break;
            case 'poll':
                processedStory = {
                    ...processedStory,
                    question: story.poll_question,
                    options: story.poll_options,
                    multiple_answers: story.multiple_answers
                };
                break;
            case 'trivia_quiz':
                processedStory = {
                    ...processedStory,
                    question: story.trivia_question,
                    correct_answer: story.correct_answer,
                    options: story.trivia_options,
                    time_limit: story.time_limit
                };
                break;
        }

        return NextResponse.json({ 
            success: true,
            story: processedStory
        }, { status: 200 });
        
    } catch (error) {
        console.error('Error fetching story:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Database error: ' + (error as Error).message 
        }, { status: 500 });
    } finally {
        await client.release();
    }
} 