//route tht handles retrieving data from influencers table and posts it on the admin dashboard.
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { parse } from "path";

// GET function to retrieve influencers
export async function GET(request: Request) {
  const client = await db.connect()

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10); //Default to page 1
    const limit = parseInt(searchParams.get('limit') || '10', 10); //Default to 10 records per page
    const offset = (page - 1) * limit;

    const influencersResult = await client.sql`
      SELECT * FROM influencers 
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
      `;
    //fetch total count of influencers
    const totalResult = await client.sql`
      SELECT COUNT(*) as total FROM influencers;
      `;
    const total = totalResult.rows[0].total;

    return NextResponse.json({ success: true, influencers: influencersResult.rows, total, page, limit, }, { status: 200 });
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch influencers" }, { status: 500 });
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

        await client.sql `DELETE FROM influencers WHERE email = ${email};`;

        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
    }
}
// DELETE function to delete an influencer
/*export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Influencer ID is required" }, { status: 400 });
    }
    await db.query("DELETE FROM influencers WHERE id = $1;", [id]);
    return NextResponse.json({ success: true, message: "Influencer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting influencer:", error);
    return NextResponse.json({ success: false, error: "Failed to delete influencer" }, { status: 500 });
  }
}*/

// PUT function to update an influencer
export async function PUT(req: Request) {
  try {
    const { first_name, last_name, email } = await req.json();
    if (!first_name || !last_name || !email) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    const updatedInfluencer = await db.query(
      "UPDATE influencers SET first_name = $1, last_name = $2, email = $3 WHERE email = $3 RETURNING *;",
      [first_name, last_name, email]
    );
    return NextResponse.json({ success: true, influencer: updatedInfluencer.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating influencer:", error);
    return NextResponse.json({ success: false, error: "Failed to update influencer" }, { status: 500 });
  }
}