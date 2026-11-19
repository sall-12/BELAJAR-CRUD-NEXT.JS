
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "Foto wajib dipilih" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Format harus JPG, PNG, atau WEBP" },
        { status: 400 }
      );
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Ukuran foto maksimal 2 MB" },
        { status: 400 }
      );
    }

    const extension = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    }[file.type];

    const fileName = `${randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(
      path.join(uploadDir, fileName),
      Buffer.from(bytes)
    );

    const photoUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      message: "Foto berhasil diupload",
      photo: photoUrl,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { message: "Gagal mengupload foto" },
      { status: 500 }
    );
  }
}
