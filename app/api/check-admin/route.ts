import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Simple example: check Authorization header or cookie
    const auth = request.headers.get("authorization") ?? "";
    // Replace this check with real token/session verification
    const isAdmin = auth === "Bearer ADMIN_SECRET";

    return NextResponse.json({ admin: Boolean(isAdmin) });
  } catch (error) {
    return NextResponse.json({ admin: false }, { status: 500 });
  }
}