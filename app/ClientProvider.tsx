"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // removed `frontendApi` prop because it's not part of the NextClerkProviderProps type
  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}