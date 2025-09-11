import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // NOTE: This example does NOT upload to a remote store.
    // Replace with your S3 / Cloudinary upload logic here.
    // For now return basic metadata so front-end can proceed.
    return NextResponse.json(
      { name: file.name, size: file.size, type: file.type },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}