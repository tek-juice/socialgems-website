//route tht handles retrieving data from influencers table and posts it on the admin dashboard.
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// GET function to retrieve influencers
export async function GET() {
  try {
    const influencers = await db.query("SELECT * FROM influencers ORDER BY created_at DESC;");
    return NextResponse.json({ success: true, influencers: influencers.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch influencers" }, { status: 500 });
  }
}

// DELETE function to delete an influencer
export async function DELETE(req: Request) {
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
}

// PUT function to update an influencer
export async function PUT(req: Request) {
  try {
    const { id, first_name, last_name, email } = await req.json();
    if (!id || !first_name || !last_name || !email) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    const updatedInfluencer = await db.query(
      "UPDATE influencers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *;",
      [first_name, last_name, email, id]
    );
    return NextResponse.json({ success: true, influencer: updatedInfluencer.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating influencer:", error);
    return NextResponse.json({ success: false, error: "Failed to update influencer" }, { status: 500 });
  }
}