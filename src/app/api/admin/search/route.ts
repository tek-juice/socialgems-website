//this route handles searching of users on the brand or influencers tab.
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// GET function to search users or influencers
export async function GET(request: Request) {
  const client = await db.connect();

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || ""; // Search query
    const type = searchParams.get("type"); // "brands" or "influencers"

    if (!type) {
      return NextResponse.json(
        { success: false, error: "Select a Tab to seach from" },
        { status: 400 }
      );
    }

    let result;
    if (type === "brands") {
      // Search users
      result = await client.sql`
        SELECT * FROM users 
        WHERE first_name ILIKE ${`%${query}%`} 
          OR last_name ILIKE ${`%${query}%`} 
          OR email ILIKE ${`%${query}%`}
        ORDER BY created_at DESC;
      `;
    } else {
      // Search influencers
      result = await client.sql`
        SELECT * FROM influencers 
        WHERE first_name ILIKE ${`%${query}%`} 
          OR last_name ILIKE ${`%${query}%`} 
          OR email ILIKE ${`%${query}%`}
        ORDER BY created_at DESC;
      `;
    }

    return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error searching records:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search records" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}