
import db from "@/lib/db";
import { NextResponse } from "next/server";

// GET: Mengambil semua produk
export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM products ORDER BY id DESC"
    );

    return NextResponse.json({
      message: "Berhasil mengambil data produk",
      data: rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan produk
export async function POST(request) {
  try {
    const { name, price, photo } = await request.json();

    if (!name || price === undefined || price === null || price === "") {
      return NextResponse.json(
        { message: "Nama dan harga wajib diisi" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      return NextResponse.json(
        { message: "Harga harus berupa angka positif" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "INSERT INTO products (name, price, photo) VALUES (?, ?, ?)",
      [name, Number(price), photo || null]
    );

    return NextResponse.json(
      {
        message: "Produk berhasil ditambahkan",
        id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}
