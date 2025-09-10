// app/layout.tsx
"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";  // <-- Import Clerk
import { CartProvider } from "@/app/CartProvider";
import { WishlistProvider } from "@/app/WishlistProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>  {/* ✅ Wrap everything in ClerkProvider */}
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
