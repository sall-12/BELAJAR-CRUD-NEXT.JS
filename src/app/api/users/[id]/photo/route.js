
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { photo } = await request.json();

    if (!photo || typeof photo !== "string") {
      return NextResponse.json(
        { message: "Lokasi foto wajib diisi" },
        { status: 400 }
      );
    }

    if (!photo.startsWith("/uploads/")) {
      return NextResponse.json(
        { message: "Lokasi foto tidak valid" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "UPDATE users SET photo = ? WHERE id = ?",
      [photo, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Foto pengguna berhasil disimpan",
      photo,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menyimpan foto" },
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { photo } = await request.json();

    if (!photo || typeof photo !== "string") {
      return NextResponse.json(
        { message: "URL foto wajib diisi" },
        { status: 400 }
      );
    }

    let imageUrl;

    try {
      imageUrl = new URL(photo);
    } catch {
      return NextResponse.json(
        { message: "URL foto tidak valid" },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      return NextResponse.json(
        { message: "URL harus menggunakan HTTP atau HTTPS" },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      "UPDATE users SET photo = ? WHERE id = ?",
      [imageUrl.toString(), id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "URL foto berhasil disimpan",
      photo: imageUrl.toString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menyimpan URL foto" },
      { status: 500 }
    );
  }
}
