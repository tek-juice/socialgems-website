// this route will handle poll voting.
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    //console.log('=== POLL VOTES ROUTE START ===');
    
    //check if user is logged in
    const session = await getSession(request);
    //console.log('Session check result:', session ? 'Session found' : 'No session');
    
    if (!session) {
        //console.log('No session found, redirecting to sign-in');
        //then redirect to sign-in page
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    //console.log('User email from session:', session.user.email);

    const { poll_id, vote_option } = await request.json();
    //console.log('Request body - poll_id:', poll_id, 'vote_option:', vote_option);
    
    const client = await db.connect();
    //console.log('Database connection established');
    
    try {
        // Get user ID from session
        //console.log('Querying user profile for email:', session.user.email);
        const userEmail = session.user.email;
        if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        //console.log('User query result rows:', userRes.rows.length);
        
        if (userRes.rows.length === 0) {
            //console.log('User not found in database');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = userRes.rows[0].id;
        //console.log('User ID found:', userId);

        //check if user has already voted on this poll
        //console.log('Checking for existing vote - poll_id:', poll_id, 'user_id:', userId);
        const existingVote = await client.query(
            `SELECT id FROM poll_votes WHERE poll_id = $1 AND user_id = $2`,
            [poll_id, userId]
        );
        //console.log('Existing vote check result rows:', existingVote.rows.length);
        
        if (existingVote.rows.length > 0) {
            //console.log('User has already voted on this poll');
            return NextResponse.json({ error: 'You have already voted on this poll' }, { status: 400 });
        }

        // Get current poll options
        //console.log('Fetching current poll options for poll_id:', poll_id);
        const pollRes = await client.query(
            `SELECT options FROM polls WHERE story_id = $1`,
            [poll_id]
        );
        //console.log('Poll query result rows:', pollRes.rows.length);
        
        if (pollRes.rows.length === 0) {
            //console.log('Poll not found in database');
            return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
        }

        const currentOptions = pollRes.rows[0].options;
        //console.log('Current poll options:', JSON.stringify(currentOptions, null, 2));
        
        // Update the vote count for the selected option
        const updatedOptions = currentOptions.map((option: any) => {
            if (option.text === vote_option) {
                const newVoteCount = (option.votes || 0) + 1;
                //console.log(`Updating option "${option.text}" votes from ${option.votes || 0} to ${newVoteCount}`);
                return { ...option, votes: newVoteCount };
            }
            return option;
        });
        //console.log('Updated options:', JSON.stringify(updatedOptions, null, 2));

        // Insert the vote record
        //console.log('Inserting vote record - poll_id:', poll_id, 'user_id:', userId, 'vote_option:', vote_option);
        await client.query(
            `INSERT INTO poll_votes (poll_id, user_id, vote_option) VALUES ($1, $2, $3)`,
            [poll_id, userId, vote_option]
        );
        // console.log('Vote record inserted successfully');

        // Update the poll options with new vote counts
        // console.log('Updating poll options in database');
        await client.query(
            `UPDATE polls SET options = $1 WHERE story_id = $2`,
            [JSON.stringify(updatedOptions), poll_id]
        );
        // console.log('Poll options updated successfully');

        //console.log('=== POLL VOTES ROUTE SUCCESS ===');
        return NextResponse.json({ 
            message: 'Vote recorded successfully',
            updatedOptions
        }, { status: 200 });
    } catch (error) {
       // console.error('=== POLL VOTES ROUTE ERROR ===');
       // console.error('Error voting on poll:', error);
       // console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ error: 'Failed to vote on poll' }, { status: 500 });
    } finally {
      //  console.log('Releasing database connection');
        client.release();
    }
}