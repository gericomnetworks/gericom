// app/AdminProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isLoading: true,
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isUserLoaded) {
        setIsLoading(false);
        return;
      }
      
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/check-admin");
        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }
        
        const data = await response.json();
        
        if (data.isAdmin) {
          setIsAdmin(true);
          // If user is on home page and is admin, redirect to admin dashboard
          if (window.location.pathname === "/") {
            router.push("/admin");
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isUserLoaded, router]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);