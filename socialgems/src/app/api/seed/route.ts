import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@vercel/postgres';
import { admins } from '../../lib/placeholder-data';

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

//GET handler for testing in the browser
export async function GET() {
  return NextResponse.json({ message: 'Send a POST request to seed the database' }, { status: 200 });
}

// POST handler to seed the database
export async function POST() {
  const client = await db.connect();
  try {
    console.log("seeding database...");

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log("UUID extension ensured.");

    await client.sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    console.log("Admins table created or aleady exists.");

    await Promise.all(
      admins.map(async (Admin) => {
        const hashedPassword = await bcrypt.hash(Admin.password, 10);
        return client.sql`
          INSERT INTO admins (id, name, email, password)
          VALUES (${Admin.id}, ${Admin.name}, ${Admin.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log("seeding completed successfully.");
    return NextResponse.json({ message: 'Seeding completed successfully!' }, { status: 200 });
  } catch (error) {
    const err = error as Error; //Explicitly cast erro to Error
    return NextResponse.json({ error: 'Error seeding the database', details: err.message }, { status: 500 });
  } finally {
    client.release();
  }
}
