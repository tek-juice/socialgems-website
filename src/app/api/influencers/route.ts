//route that handles users(influencers) data insertion into the database table called influencers.
import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { Users } from "../../lib/definitions";

export async function POST(req: Request) {
    //console.log("Testing database connection...");

    //test database connection
    try {
        const testQuery = await db.query(`SELECT 1 + 1 AS result;`);
        //console.log("Database connection successful:", testQuery.rows[0].result);
    } catch (error) {
        //console.error("Database connection failed:", error);
        return NextResponse.json({ success: false, error: "Database connection failed" }, { status: 500 });
    }

    try {
        const body = await req.json();
        //console.log("Recieved data:", body); //debugging log

        // Validate input before inserting
        if (!body.first_name || !body.last_name || !body.email || !body.contact) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Check if the "influencers" table exists
        //console.log("Checking if 'influencers' table exists...");
        const checkTable = await db.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'influencers'
            ) AS exists;
        `);
        //console.log("Table exists query completed.");

        const tableExists = checkTable.rows[0].exists;

        //drop table
        /*if(tableExists) {
            console.log("Dropping existing 'users' table....");
            await db.query('Drop Table users');
            console.log("Table dropped successfully.")
        }*/

        // If the table does not exist, create it
        if (!tableExists) {
            await db.query(`
                CREATE TABLE influencers (
                    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                    first_name TEXT NOT NULL,
                    last_name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    contact TEXT,
                    social_media JSON,
                    influence TEXT,
                    message TEXT,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            `);
        }

        //Insert the user into the database but null the social_media
        const insertUser = await db.query(
            `INSERT INTO influencers (first_name, last_name, email, contact, social_media, influence, message)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *;`,
            [
                body.first_name,
                body.last_name,
                body.email,
                body.contact,
                null, //JSON.stringify(body.social_media), // Convert JSON to string
                body.influence,
                body.message,
            ]
        );

        return NextResponse.json({ success: true, user: insertUser.rows[0] }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to sign up. This email exists" }, { status: 500 });
    }
}
