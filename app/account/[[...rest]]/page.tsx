"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

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
