import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const uploadsDir = path.join(process.cwd(), "public/uploads");

  // Create uploads folder if not exist
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = `${Date.now()}_${file.name}`;
  const filePath = path.join(uploadsDir, filename);

  // Convert Blob to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
