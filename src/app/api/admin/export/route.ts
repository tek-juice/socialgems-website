//This file handles downloads of records from influencers and brands for admin and manager to use.
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import ExcelJS from "exceljs";

export async function GET(request: NextRequest) {
    try {
      const url = new URL(request.url);
      const type = url.searchParams.get("type");
      const startDate = url.searchParams.get("startDate");
      const endDate = url.searchParams.get("endDate");
  
      if (!type || (type !== "brands" && type !== "influencers")) {
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
      }
  
      const client = await db.connect();
      const collection = type === "brands" ? "users" : "influencers" ;

      //build query for data filtering
      let query = `SELECT * FROM ${collection}`;
      const params = [];

      if (startDate && endDate) {
        query += ` WHERE created_at BETWEEN $1 AND $2`;
        params.push(startDate, endDate + 'T23:59:59.999Z'); // Include entire end day
      } else if (startDate) {
        query += ` WHERE created_at >= $1`;
        params.push(startDate);
      } else if (endDate) {
        query += ` WHERE created_at <= $1`;
        params.push(endDate + 'T23:59:59.999Z');
      }

      const { rows: data } = await client.query(query, params); //pass params
  
      if (!data.length) {
        return NextResponse.json(
          { error: "No records found" },
          { status: 404 }
        );
      }

      // Transform the data before adding to worksheet
      const transformedData = data.map((row: any) => {
        // Clone the row to avoid modifying the original
        const newRow = { ...row };
        
        // Handle social_media field if it exists
        if (newRow.social_media) {
          try {
            // Parse the social_media JSON if it's a string
            const socialMedia = typeof newRow.social_media === 'string' 
              ? JSON.parse(newRow.social_media) 
              : newRow.social_media;
            
            // Filter to only include platforms that are true
            const activePlatforms = Object.entries(socialMedia)
              .filter(([_, value]) => value === true)
              .map(([platform]) => platform);
            
            // Replace the social_media field with a cleaned version
            newRow.social_media = activePlatforms.length === 1 
              ? activePlatforms[0] //single platform
              : activePlatforms.length > 1
                ? activePlatforms.join(', ') //multiple platforms
              : 'NIL'; //no platforms selected
          } catch (error) {
            console.error('Error parsing social_media:', error);
            newRow.social_media = 'NIL';
          }
        }
        
        return newRow;
      });
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(
        `${type.charAt(0).toUpperCase() + type.slice(1)} List`
      );
  
      // Define columns dynamically based on database fields
      const columns = Object.keys(transformedData[0]).map((key) => ({
        header: key.replace(/_/g, " ").toUpperCase(),
        key,
      }));
  
      worksheet.columns = columns;
      worksheet.addRows(transformedData);
  
      const buffer = await workbook.xlsx.writeBuffer();
  
      return new NextResponse(buffer, {
        status: 200,
        headers: new Headers({
          "Content-Disposition": `attachment; filename=${type}_list_${startDate || 'all'}_to_${endDate || 'all'}.xlsx`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  
  // Explicitly declare other HTTP methods as not allowed
  export async function POST() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  export async function PUT() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  export async function DELETE() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
  export async function PATCH() {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }