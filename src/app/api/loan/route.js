import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET() {
  try {
    const [result] = await pool.query(
      "SELECT b.*, u.*, l.status FROM book AS b INNER JOIN loan AS l ON l.book_id = b.id INNER JOIN user AS u ON u.id = l.user_id WHERE b.available = 0 and l.status = 'prestado' ORDER BY l.created_at ASC"
    );

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(request) {
  try {
    const { userId, bookId, status } = await request.json();

    const [loan] = await pool.query(
      "INSERT INTO loan (user_id, book_id, status, created_at, updated_at) VALUES (?,?,?,DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'),DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'))",
      [userId, bookId, status]
    );

    const [book] = await pool.query(
      "UPDATE book SET available = 0, updated_at = DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s') WHERE id = ?",
      [bookId]
    );

    const [result] = await pool.query(
      "SELECT b.title, l.status, b.available FROM book AS b INNER JOIN loan AS l ON l.book_id = b.id WHERE b.id = ? and l.created_at = DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s')",
      [bookId]
    );

    return NextResponse.json(
      { id: result.insertId, result: result[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
