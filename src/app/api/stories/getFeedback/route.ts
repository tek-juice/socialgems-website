// this route picks any story that has feedback and also which user is the author.
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
    const session = await getSession(request);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await db.connect();
    try {
        // Query to get stories with feedback for the current user
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
            WHERE p.email = $1 
            AND s.admin_feedback IS NOT NULL 
            AND s.admin_feedback != ''
            AND s.status NOT IN ('approved', 'rejected')
            ORDER BY s.updated_at DESC
        `;
        
        const { rows } = await client.query(query, [session.user.email]);
        
        // Process the stories to include type-specific data
        const processedStories = rows.map(story => {
            const baseStory = {
                story_id: story.story_id,
                title: story.title,
                type: story.type,
                status: story.status,
                created_at: story.created_at,
                updated_at: story.updated_at,
                admin_feedback: story.admin_feedback,
                tags: story.tags,
                user_id: story.user_id,
                fname: story.fname,
                lname: story.lname,
                email: story.email
            };

            // Add type-specific content based on story type
            switch (story.type) {
                case 'story':
                    return {
                        ...baseStory,
                        content: story.text_content
                    };
                case 'picture_comic':
                    return {
                        ...baseStory,
                        image_urls: story.image_urls,
                        description: story.picture_description
                    };
                case 'audio':
                    return {
                        ...baseStory,
                        audio_url: story.audio_url
                    };
                case 'poll':
                    return {
                        ...baseStory,
                        question: story.poll_question,
                        options: story.poll_options,
                        multiple_answers: story.multiple_answers
                    };
                case 'trivia_quiz':
                    return {
                        ...baseStory,
                        question: story.trivia_question,
                        correct_answer: story.correct_answer,
                        options: story.trivia_options,
                        time_limit: story.time_limit
                    };
                default:
                    return baseStory;
            }
        });
        
        return NextResponse.json({ 
            success: true,
            stories: processedStories,
            count: processedStories.length,
            message: processedStories.length > 0 
                ? 'Stories with feedback retrieved successfully' 
                : 'No stories with feedback found for this user'
        }, { status: 200 }); 
        
    } catch (error) {
        console.error('Error fetching stories with feedback:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Database error: ' + (error as Error).message,
            stories: [],
            count: 0
        }, { status: 500 });
    } finally {
        await client.release();
    }
}