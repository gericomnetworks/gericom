import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // Verify signature if configured (Clerk sends a signature header)
    // Process event: e.g. user.created, user.deleted, etc.
    // Keep this handler server-side only.

    // Minimal response for testing:
    return NextResponse.json({ received: true, event: payload?.type ?? null });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}