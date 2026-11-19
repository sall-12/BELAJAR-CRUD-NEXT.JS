import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// READ ALL USERS
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, created_at FROM users"
    );

    return NextResponse.json({
      message: "Berhasil mengambil data pengguna",
      data: rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data pengguna" },
      { status: 500 }
    );
  }
}

// CREATE USER
export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua kolom wajib diisi" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return NextResponse.json({
      message: "Pengguna berhasil ditambahkan",
      id: result.insertId,
    }, { status: 201 });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email sudah digunakan" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}