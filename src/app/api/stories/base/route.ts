//route to handle story creation
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getSession } from '@/app/lib/auth'; //get session from auth.ts

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await db.connect();
  try {
    const { title, type, tags } = await request.json();
    // session.user.email is available from the JWT
    // You may need to fetch user_id from the profile table using email if not present in token
    // For now, let's assume you only have email in the token
    // Fetch user_id from profile
    const userEmail = session.user.email;
    if (typeof userEmail !== 'string') {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }
    
    const userRes = await client.sql`SELECT id FROM profile WHERE email = ${userEmail}`;
    if (userRes.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const user_id = userRes.rows[0].id;
    const { rows } = await client.sql`
      INSERT INTO stories (user_id, title, type, tags, status)
      VALUES (${user_id}, ${title}, ${type}, ${tags}, 'draft')
      RETURNING id
    `;
    return NextResponse.json({ storyId: rows[0].id }, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.release();
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  
  const client = await db.connect();
  try {
    let query = `
      SELECT s.*, p.fname, p.lname, p.email 
      FROM stories s
      JOIN profile p ON s.user_id = p.id
    `;
    
    const params = [];
    if (status) {
      query += ` WHERE s.status = $1`;
      params.push(status);
    }
    
    query += ` ORDER BY s.created_at DESC`;
    
    const { rows } = await client.query(query, params);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await client.release();
  }
}