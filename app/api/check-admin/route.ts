// app/api/check-admin/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }

    // Check if user exists in Admin table
    const admin = await prisma.admin.findUnique({
      where: { clerkId: userId },
    });

    return NextResponse.json({ isAdmin: !!admin });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}