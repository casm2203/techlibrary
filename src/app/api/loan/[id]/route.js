import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const [result] = await pool.query(
      "SELECT * FROM loan WHERE id = ? ORDER BY created_at ASC",
      [id]
    );

    if (result.length === 0) {
      throw new Error("No existe el prestamo");
    }
    return NextResponse.json({ result: result[0] });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { bookId } = await request.json();

    const [resultLoan] = await pool.query("DELETE from loan WHERE id = ?", [
      id,
    ]);

    if (resultLoan.affectedRows === 1) {
      const [result] = await pool.query(
        "UPDATE book SET available = 1, updated_at = DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s') WHERE id = ?",
        [bookId]
      );
    }

    return NextResponse.json(
      { id, message: "Has devuelto el libro con exito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
