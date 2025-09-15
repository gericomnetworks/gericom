// app/api/admin/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if requesting user is admin
    const requestingAdmin = await prisma.admin.findUnique({
      where: { clerkId: userId },
    });

    if (!requestingAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if requesting user is admin
    const requestingAdmin = await prisma.admin.findUnique({
      where: { clerkId: userId },
    });

    if (!requestingAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Try to find user in Clerk by email
    let clerkUser;
    try {
      const users = await clerkClient.users.getUserList({ emailAddress: [email] });
      clerkUser = users.data[0];
    } catch (error) {
      console.error("Error finding user in Clerk:", error);
    }

    if (!clerkUser) {
      return NextResponse.json({ error: "User with this email not found" }, { status: 404 });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: { 
        OR: [
          { clerkId: clerkUser.id },
          { email: email.toLowerCase() }
        ]
      },
    });

    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
    }

    const admin = await prisma.admin.create({
      data: {
        clerkId: clerkUser.id,
        email: email.toLowerCase(),
        name: name || clerkUser.firstName || clerkUser.username || email.split('@')[0],
      },
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}