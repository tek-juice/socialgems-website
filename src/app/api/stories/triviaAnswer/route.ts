// this route will handle trivia quiz answers
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    // console.log('=== TRIVIA ANSWER ROUTE START ===');
    
    //check if user is logged in
    const session = await getSession(request);
    // console.log('Session check result:', session ? 'Session found' : 'No session');
    
    if (!session) {
        // console.log('No session found, redirecting to sign-in');
        //then redirect to sign-in page
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

  //  console.log('User email from session:', session.user.email);

    const { trivia_quiz_id, answer } = await request.json();
   // console.log('Request body - trivia_quiz_id:', trivia_quiz_id, 'answer:', answer);
    
    const client = await db.connect();
   // console.log('Database connection established');
    
    try {
        // Get user ID from session
       // console.log('Querying user profile for email:', session.user.email);
        const userEmail = session.user.email;
        if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
       // console.log('User query result rows:', userRes.rows.length);
        
        if (userRes.rows.length === 0) {
            //console.log('User not found in database');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;
       // console.log('User ID found:', userId);

        // Check if user has already answered this trivia quiz
       // console.log('Checking for existing answer - trivia_quiz_id:', trivia_quiz_id, 'user_id:', userId);
        const existingAnswer = await client.query(
            `SELECT id FROM trivia_quiz_answers WHERE trivia_quiz_id = $1 AND user_id = $2`,
            [trivia_quiz_id, userId]
        );
       // console.log('Existing answer check result rows:', existingAnswer.rows.length);
        
        if (existingAnswer.rows.length > 0) {
           // console.log('User has already answered this trivia quiz');
            return NextResponse.json({ error: 'You have already answered this trivia quiz' }, { status: 400 });
        }

        // Get the correct answer for this trivia quiz
       // console.log('Fetching correct answer for trivia_quiz_id:', trivia_quiz_id);
        const triviaRes = await client.query(
            `SELECT correct_answer FROM trivia_quizzes WHERE story_id = $1`,
            [trivia_quiz_id]
        );
       // console.log('Trivia query result rows:', triviaRes.rows.length);
        
        if (triviaRes.rows.length === 0) {
            // console.log('Trivia quiz not found in database');
            return NextResponse.json({ error: 'Trivia quiz not found' }, { status: 404 });
        }

        const correctAnswer = triviaRes.rows[0].correct_answer;
       // console.log('Correct answer from database:', correctAnswer);
       // console.log('User answer:', answer);
        
        const isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
       // console.log('Answer comparison - isCorrect:', isCorrect);
       // console.log('Normalized user answer:', answer.toLowerCase().trim());
       // console.log('Normalized correct answer:', correctAnswer.toLowerCase().trim());

        // Store the answer
       // console.log('Storing answer in database - trivia_quiz_id:', trivia_quiz_id, 'user_id:', userId, 'answer:', answer);
        await client.query(
            `INSERT INTO trivia_quiz_answers (trivia_quiz_id, user_id, answer) VALUES ($1, $2, $3)`,
            [trivia_quiz_id, userId, answer]
        );
       // console.log('Answer stored successfully');

       // console.log('=== TRIVIA ANSWER ROUTE SUCCESS ===');
        return NextResponse.json({ 
            message: 'Answer recorded successfully',
            isCorrect,
            correctAnswer: isCorrect ? correctAnswer : null
        }, { status: 200 });
    } catch (error) {
       // console.error('=== TRIVIA ANSWER ROUTE ERROR ===');
       // console.error('Error answering trivia quiz:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to record answer' }, { status: 500 });
    } finally {
       // console.log('Releasing database connection');
        client.release();
    }
}