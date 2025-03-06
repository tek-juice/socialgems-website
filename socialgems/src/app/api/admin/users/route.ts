//route that handles retrieving users(brands information) from users table and displays it on dashbaord.

import { NextResponse } from "next/server";
import { db } from "../../../lib/db"; // Adjusted path according to the folder level of the  DB connection file

//Get function that retrieves users.
export async function GET(request: Request) {
  const client = await db.connect();

    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10); //Default to page 1
        const limit = parseInt(searchParams.get('limit') || '10', 10); //Default to 10 records per page
        const offset = (page - 1) * limit;

        //fetch all users from the database
        const usersResult = await client.sql`
          SELECT * FROM users 
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset};
          `;
        
        //fetch total count of users
        const totalResult = await client.sql`
          SELECT COUNT(*) as total FROM users;
          `;
        const total = totalResult.rows[0].total;

        return NextResponse.json({success: true, users: usersResult.rows, total, page, limit,}, {status: 200});
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({success: false, error: "Failed to fetch users"}, {status: 500});
    } finally {
      client.release();
    }
}

//delete function that deletes a user.
export async function DELETE(request: Request) {
  const client = await db.connect();

    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ success: false, error: "User Email is required" }, { status: 400 });
        }

        // Log the id to verify it's correct
        console.log("Deleting user with Email:", email);

        await client.sql `DELETE FROM users WHERE email = ${email};`;

        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
    }
}

// PUT function to update an influencer
export async function PUT(req: Request) {
  try {
    const { id, first_name, last_name, email } = await req.json();
    if (!id || !first_name || !last_name || !email) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    const updatedUser = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *;",
      [first_name, last_name, email, id]
    );
    return NextResponse.json({ success: true, user: updatedUser.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
  }
}

/*
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10); // Users per page
    const skip = (page - 1) * limit;

    const users = await db.users.findMany({
      skip,
      take: limit,
    });

    const totalUsers = await db.users.count(); // Get total users count

    return NextResponse.json({
      success: true,
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}
*/