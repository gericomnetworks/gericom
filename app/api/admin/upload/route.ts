// app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, data } = body;

    if (!data || !filename) {
      return NextResponse.json({ error: "No file data provided" }, { status: 400 });
    }

    // Extract base64 data
    const base64Data = data.split(';base64,').pop();
    if (!base64Data) {
      return NextResponse.json({ error: "Invalid base64 data" }, { status: 400 });
    }

    const buffer = Buffer.from(base64Data, 'base64');

    // Create a unique filename
    const timestamp = Date.now();
    const extension = path.extname(filename);
    const cleanFilename = path.basename(filename, extension).replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueFilename = `${cleanFilename}_${timestamp}${extension}`;

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error("Error creating upload directory:", err);
    }

    // Save file
    const filepath = path.join(uploadDir, uniqueFilename);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ 
      url: fileUrl,
      filename: uniqueFilename
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}