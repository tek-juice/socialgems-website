import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres'; // Ensure this is correctly imported
import { users } from '../../lib/placeholder-data';

// CORS Headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET handler for testing in the browser
export async function GET() {
  return NextResponse.json({ message: 'Send a POST request to seed the database' }, { status: 200 });
}

export async function POST(req: Request) {
  try {
      // Initialize the database client
      const client = await db.connect();

      // Check if the table exists
      const checkTable = await client.query(`
          SELECT EXISTS (
              SELECT FROM information_schema.tables
              WHERE table_name = 'users'
          ) AS exists;
      `);

      if (!checkTable.rows[0].exists) {
          return NextResponse.json({ success: false, error: "Table 'users' does not exist" }, { status: 404 });
      }

      // Insert each influencer into the database
      for (const user of users) {
          await client.query(
              `INSERT INTO users (first_name, last_name, company_name, email, contact, social_media, expertise, message)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
              [
                  user.first_name,
                  user.last_name,
                  user.company_name,
                  user.email,
                  user.contact,
                  JSON.stringify(user.social_media),
                  user.expertise,
                  user.message,
              ]
          );
      }

      // Release the client back to the pool
      client.release();

      return NextResponse.json({ success: true, message: "Data seeded successfully" }, { status: 201 });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, error: "Failed to seed data" }, { status: 500 });
  }
}
/*
export async function POST(req: Request) {
  try {
      // Initialize the database client
      const client = await db.connect();

      // Check if the table exists
      const checkTable = await client.query(`
          SELECT EXISTS (
              SELECT FROM information_schema.tables
              WHERE table_name = 'influencers'
          ) AS exists;
      `);

      if (!checkTable.rows[0].exists) {
          return NextResponse.json({ success: false, error: "Table 'influencers' does not exist" }, { status: 404 });
      }

      // Insert each influencer into the database
      for (const influencer of influencers) {
          await client.query(
              `INSERT INTO influencers (first_name, last_name, email, contact, social_media, influence, message)
               VALUES ($1, $2, $3, $4, $5, $6, $7);`,
              [
                  influencer.first_name,
                  influencer.last_name,
                  influencer.email,
                  influencer.contact,
                  JSON.stringify(influencer.social_media),
                  influencer.influence,
                  influencer.message,
              ]
          );
      }

      // Release the client back to the pool
      client.release();

      return NextResponse.json({ success: true, message: "Data seeded successfully" }, { status: 201 });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, error: "Failed to seed data" }, { status: 500 });
  }
}*/

/* commentded out the admin seeding.
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
*/