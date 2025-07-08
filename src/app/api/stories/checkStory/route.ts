//this route retrieves stories, picture-comic, audio, poll, trivia from database
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

// GET function to retrieve all story types with user information
export async function GET(request: NextRequest) {
    const client = await db.connect();
    try {
        // Query to get all stories with user information and type-specific data
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
            ORDER BY s.created_at DESC
        `;
        
        const { rows } = await client.query(query);
        
        if (rows.length > 0) {
            rows.forEach((story, index) => {
                
                
                // Type-specific data
                if (story.type === 'story' && story.text_content) {
                    
                } else if (story.type === 'picture_comic' && story.image_urls) {
                    
                } else if (story.type === 'audio' && story.audio_url) {
                    
                } else if (story.type === 'poll' && story.poll_question) {
                    
                } else if (story.type === 'trivia_quiz' && story.trivia_question) {
                    
                }
            });
        } else {
            
        }
        
        return NextResponse.json({ 
            stories: rows,
            count: rows.length,
            message: rows.length > 0 ? 'All stories retrieved successfully' : 'No stories found'
        }, { status: 200 });
        
    } catch (error) {
        
        return NextResponse.json({ 
            error: 'Database error: ' + (error as Error).message,
            stories: [],
            count: 0
        }, { status: 500 });
    } finally {
        await client.release();
        
    }
}