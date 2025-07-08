//this route retrieves all approved stories from backend database
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request: NextRequest) {
    const client = await db.connect();
    try {
        // Query to get all approved stories with user information and type-specific data
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
            WHERE s.status = 'approved'
            ORDER BY s.created_at DESC
        `;
        
        const { rows } = await client.query(query);
        
        // Group stories by type for better organization
        const storiesByType = {
            text: rows.filter(story => story.type === 'story'),
            picture: rows.filter(story => story.type === 'picture_comic'),
            audio: rows.filter(story => story.type === 'audio'),
            poll: rows.filter(story => story.type === 'poll'),
            trivia: rows.filter(story => story.type === 'trivia_quiz')
        };
        
        return NextResponse.json({ 
            success: true,
            stories: rows,
            storiesByType,
            count: rows.length,
            message: rows.length > 0 ? 'Approved stories retrieved successfully' : 'No approved stories found'
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching approved stories:', error);
        return NextResponse.json({ 
            success: false,
            error: 'Database error: ' + (error as Error).message,
            stories: [],
            storiesByType: {
                text: [],
                picture: [],
                audio: [],
                poll: [],
                trivia: []
            },
            count: 0
        }, { status: 500 });
    } finally {
        await client.release();
    }
}

