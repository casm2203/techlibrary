import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const [result] = await pool.query(
      "SELECT * FROM book WHERE id = ? ORDER BY created_at ASC",
      [id]
    );

    if (result.length === 0) {
      throw new Error("No existe el libro");
    }
    return NextResponse.json({ result: result[0] });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Verifica si el libro existe utilizando la función GET
    const { status: getStatus } = await GET(request, { params });

    if (getStatus === 404) {
      throw new Error("Error: No existe el libro");
    }

    const [result] = await pool.query(
      "UPDATE book SET ?, updated_at = DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s') WHERE id = ?",
      [data, id]
    );

    return NextResponse.json(
      { id, data, message: "Ha sido actualizado con exito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message },{ status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const [result] = await pool.query("DELETE from book WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("Error: No existe el libro");
    }

    return NextResponse.json(
      { message: "Se ha eliminado el libro", id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
