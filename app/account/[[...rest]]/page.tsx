"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [statusMsg, setStatusMsg] = useState("Checking login...");

  useEffect(() => {
    if (isSignedIn && user) {
      const checkAdmin = async () => {
        try {
          setStatusMsg("🔍 Checking if you are an admin...");
          const res = await fetch("/api/check-admin");
          const data = await res.json();

          if (data.isAdmin) {
            setStatusMsg("✅ You are an admin. Redirecting to /admin...");
            router.replace("/admin");
          } else {
            setStatusMsg("➡️ You are a normal user. Redirecting to homepage...");
            router.replace("/");
          }
        } catch (err) {
          console.error("❌ Error checking admin:", err);
          setStatusMsg("❌ Error occurred. Redirecting to homepage...");
          router.replace("/");
        }
      };
      checkAdmin();
    }
  }, [isSignedIn, user, router]);

  if (isSignedIn && user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">{statusMsg}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setMode("signin")}
            className={`px-4 py-2 rounded-l-lg ${
              mode === "signin" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded-r-lg ${
              mode === "signup" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {mode === "signin" ? (
          <SignIn
            appearance={{ elements: { card: "shadow-none" } }}
            path="/account"
            routing="path"
            signUpUrl="/account"
          />
        ) : (
          <SignUp
            appearance={{ elements: { card: "shadow-none" } }}
            path="/account"
            routing="path"
            signInUrl="/account"
          />
        )}
      </div>
    </div>
  );
}
