// app/admin/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminPanelClient from "@/components/AdminPanelClient";

export default async function AdminPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/account?from=admin");
  }

  const admin = await prisma.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) {
    // not an admin
    redirect("/");
  }

  return <AdminPanelClient />;
}
