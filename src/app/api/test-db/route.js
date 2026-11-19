    import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1 AS hasil");

    return NextResponse.json({
      message: "Koneksi database berhasil!",
      data: rows,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Koneksi database gagal",
        error: error.message,
      },
      { status: 500 }
    );
  }
}