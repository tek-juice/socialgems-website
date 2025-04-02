import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET() {
  const client = await db.connect();
  try {
    const result = await client.sql`SELECT * FROM admins`; // Fetch all admins
    return NextResponse.json({ admins: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error); // Log the actual error
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  } finally {
    client.release();
  }
}
