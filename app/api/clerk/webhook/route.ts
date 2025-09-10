// app/api/clerk/webhook/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Clerk webhook payload can wrap events; this is a minimal example.
    // Adjust based on Clerk actual webhook payload shape.
    // Example: { type: "user.created", data: { id: "...", primary_email_address: { email_address: "..." }, first_name: "...", last_name: "..." } }
    if (!body || !body.type) {
      return new Response("ignored", { status: 400 });
    }

    const type = body.type;
    const data = body.data || body;

    if (type === "user.created" || type === "user.updated") {
      const clerkId = data.id;
      const email = data.primary_email_address?.email_address ?? data.email_addresses?.[0]?.email_address ?? null;
      const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || data.name || null;

      if (clerkId) {
        await prisma.user.upsert({
          where: { clerkId },
          update: { email, name },
          create: { clerkId, email, name },
        });
      }
    }

    return new Response("ok");
  } catch (err) {
    console.error("clerk webhook error", err);
    return new Response("error", { status: 500 });
  }
}
