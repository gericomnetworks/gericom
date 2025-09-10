"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
