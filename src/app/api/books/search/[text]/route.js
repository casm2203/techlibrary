import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET(request, { params }) {
  try {
    const { text } = params;
    const searchText = `%${text}%`;

    const [result] = await pool.query(
      "SELECT * FROM book WHERE title LIKE ? OR author LIKE ? ORDER BY created_at ASC",
      [searchText, searchText]
    );

    if (result.length === 0) {
      throw new Error("No existe el libro");
    }
    return NextResponse.json(
      { result: result[0], status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
