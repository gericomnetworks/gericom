// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/app/CartProvider";
import { WishlistProvider } from "@/app/WishlistProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminProvider } from "./AdminProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <AdminProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </AdminProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}