//route to handle poll stories
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
    //console.log('=== POLL ROUTE STARTED ===');
    
    const session = await getSession(request);
    if (!session) {
        //console.log('❌ Unauthorized - No session found');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    //console.log('✅ Session found for user:', session.user.email);

    const formData = await request.formData();
    const question = formData.get('question') as string;
    const option1 = formData.get('option1') as string;
    const option2 = formData.get('option2') as string;
    const option3 = formData.get('option3') as string;
    const option4 = formData.get('option4') as string;

    //console.log('📝 Form data received:');
    //console.log('- Question:', question);
    //console.log('- Option 1:', option1);
    //console.log('- Option 2:', option2);
    //console.log('- Option 3:', option3);
    //console.log('- Option 4:', option4);

    if (!question || !option1 || !option2) {
        //console.log('❌ Validation failed - missing question or required options');
        //console.log('- Question present:', !!question);
        //console.log('- Option 1 present:', !!option1);
        //console.log('- Option 2 present:', !!option2);
        return NextResponse.json({ error: 'Question and at least two options are required.' }, { status: 400 });
    }

    //console.log('✅ Form validation passed');

    // Build options array for DB (with votes=0)
    const optionsArr = [option1, option2, option3, option4].filter(Boolean).map(text => ({ text, votes: 0 }));
    //console.log('📊 Options array for database:', optionsArr);

    const client = await db.connect();
    try {
        //console.log('\n🗄️ Connecting to database...');
        
        const userEmail = session.user.email;
        if (typeof userEmail !== 'string') {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }

        const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
        if (userRes.rows.length === 0) {
            //console.log('❌ User not found in database');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const user_id = userRes.rows[0].id;
        //console.log('✅ User found, ID:', user_id);

        // Insert into stories
        //console.log('📝 Inserting into stories table...');
        const { rows } = await client.sql`
            INSERT INTO stories (user_id, title, type, status)
            VALUES (${user_id}, ${question}, 'poll', 'draft')
            RETURNING id
        `;
        const storyId = rows[0].id;
        //console.log('✅ Story inserted, ID:', storyId);

        // Insert into polls
        //console.log('🗳️ Inserting into polls table...');
        const optionsJson = JSON.stringify(optionsArr);
        //console.log('- Options JSON:', optionsJson);
        
        await client.sql`
            INSERT INTO polls (story_id, question, options, multiple_answers)
            VALUES (${storyId}, ${question}, ${optionsJson}, false)
        `;
        //console.log('✅ Poll data inserted successfully');

        //console.log('\n🎉 COMPLETE SUCCESS - Poll story uploaded');
        return NextResponse.json({ message: 'Poll story uploaded', storyId }, { status: 201 });
    } catch (error) {
        //console.log('❌ Database error:', error);
        return NextResponse.json({ error: 'Database error: ' + (error as Error).message }, { status: 500 });
    } finally {
        await client.release();
        //console.log('🔌 Database connection released');
    }
}