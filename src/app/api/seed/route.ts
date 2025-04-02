import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@vercel/postgres'; // Ensure this is correctly imported
import { admins } from '../../lib/placeholder-data';

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

// POST handler to seed the database
export async function POST() {
  const client = await db.connect();
  try {
    console.log("seeding database...");

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log("UUID extension ensured.");

    //check if table admins exists
    const tableExists = await client.sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'admins'
        );
      `;

    //drop table if exists
    if (tableExists.rows[0].exists) {
      console.log("Admins table exists. Dropping it....");
      await client.sql`DROP TABLE admins;`;
      console.log("Admins table dropped.");
    }
    //create the admins table with the role column
    await client.sql`
      CREATE TABLE admins (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'manager'
      );
    `;
    console.log("Admins table created with column.");

    await Promise.all(
      admins.map(async (Admin) => {
        const hashedPassword = await bcrypt.hash(Admin.password, 10);
        return client.sql`
          INSERT INTO admins (id, name, email, password, role)
          VALUES (${Admin.id}, ${Admin.name}, ${Admin.email}, ${hashedPassword}, ${Admin.role})
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

/*
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
}*/
