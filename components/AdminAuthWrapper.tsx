// components/AdminAuthWrapper.tsx
"use client";

import { useAdmin } from "@/app/AdminProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdmin();
  const { isLoaded: isUserLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isUserLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [isAdmin, isLoading, isUserLoaded, isSignedIn, router]);

  if (isLoading || !isUserLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}