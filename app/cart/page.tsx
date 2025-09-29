// app/cart/page.tsx
import type { Metadata } from "next";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Your Cart | Gericom Links Networks Nairobi",
  description:
    "View and manage your shopping cart at Gericom Links Networks, located along Ronald Ngala Street in Nairobi. Secure checkout for CCTV, IP cameras, PTZ cameras, and networking equipment.",
  keywords: [
    "cart",
    "Gericom Links Networks",
    "shopping cart",
    "checkout",
    "CCTV Nairobi",
    "IP cameras Kenya",
    "PTZ cameras Nairobi",
    "network equipment Nairobi",
  ],
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke/cart",
  },
  openGraph: {
    title: "Your Cart | Gericom Links Networks Nairobi",
    description:
      "View and manage your shopping cart at Gericom Links Networks in Nairobi, Kenya. Checkout securely for CCTV, IP cameras, PTZ cameras, and accessories.",
    url: "https://gericomlinksnetworks.co.ke/cart",
    siteName: "Gericom Links Networks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gericom Links Networks Cart",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Cart | Gericom Links Networks Nairobi",
    description:
      "Manage your shopping cart and proceed to secure checkout at Gericom Links Networks Nairobi.",
    images: ["/og-image.png"],
  },
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-600 mb-6">
        Manage the products in your cart before proceeding to checkout.
      </p>

      {/* ✅ Cart Drawer forced visible here */}
      <div className="border rounded-md shadow-sm p-4 bg-white">
        <CartDrawer />
      </div>
    </main>
  );
}
