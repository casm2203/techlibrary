import { NextResponse } from "next/server";
import { pool } from "@/database/db.js";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const { name, last_name, rol, email, password } = await request.json();
    const [resultEmail] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    //Validaciones
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña es muy corta" },
        { status: 409 }
      );
    }
    if (resultEmail.length !== 0) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 409 }
      );
    }

    //Encriptar contraseña
    let passwordEncrypted = await bcryptjs.hash(password, 12);

    //Insertar en la base de datos
    const [result] = await pool.query(
      "INSERT INTO user(name, last_name, rol, email, password, created_at, updated_at) VALUES (?,?,?,?,?,DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'),DATE_FORMAT(CONVERT_TZ(NOW(), 'UTC', 'America/Bogota'), '%Y-%m-%d %H:%i:%s'))",
      [name, last_name, rol, email, passwordEncrypted]
    );

    return NextResponse.json(
      {
        id: result.insertId,
        data: { name, email },
        message: "Usuario creado",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
