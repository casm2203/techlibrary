import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET() {
  try {
    const [result] = await pool.query(
      "SELECT * FROM book ORDER BY created_at ASC"
    );

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(request) {
  try {
    const { title, description, author, cover, year } = await request.json();

    const [result] = await pool.query(
      "INSERT INTO book (title, description, author, cover, year, created_at, updated_at) VALUES (?,?,?,?,?,DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'),DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'))",
      [title, description, author, cover, year]
    );

    return NextResponse.json(
      { id: result.insertId, data: { title, description, author, cover } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
