import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET(request, { params }) {
  try {
    const { userId } = params;
    const [result] = await pool.query(
      "SELECT u.name AS usuario, b.*, l.id AS idLoan, l.status AS estado FROM user AS u INNER JOIN loan AS l ON u.id = l.user_id INNER JOIN book AS b ON l.book_id = b.id WHERE u.id = ?",
      [userId]
    );

    // if (result.length === 0) {
    //   throw new Error("El usuario no tiene libros prestados");
    // }
    return NextResponse.json({ result: result });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
