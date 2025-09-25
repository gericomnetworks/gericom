// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/app/CartProvider";
import { WishlistProvider } from "@/app/WishlistProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminProvider } from "./AdminProvider";

export const metadata: Metadata = {
  title: {
    default: "Gericom Links Networks | Networking Solutions in Kenya",
    template: "%s | Gericom Links Networks",
  },
  description:
    "Gericom Links Networks provides reliable networking and technology solutions in Kenya. Explore our products and services today.",
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke",
  },
  openGraph: {
    title: "Gericom Links Networks | Networking Solutions in Kenya",
    description:
      "Gericom Links Networks provides reliable networking and technology solutions in Kenya. Explore our products and services today.",
    url: "https://gericomlinksnetworks.co.ke",
    siteName: "Gericom Links Networks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gericom Links Networks",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gericom Links Networks | Networking Solutions in Kenya",
    description:
      "Discover networking and technology products at Gericom Links Networks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

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
