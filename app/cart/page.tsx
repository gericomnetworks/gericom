// app/cart/page.tsx
import { Metadata } from "next";
import CartDrawer from "@/components/CartDrawer"; // ✅ re-use your drawer

export const metadata: Metadata = {
  title: "Your Cart | Gericom Electronics Nairobi",
  description:
    "View and manage your shopping cart at Gericom Electronics, located along Ronald Ngala Street in Nairobi. Secure checkout for IP cameras, PTZ cameras, and network cameras.",
  keywords: [
    "cart",
    "Gericom Electronics",
    "shopping cart",
    "checkout",
    "IP cameras Nairobi",
    "PTZ cameras Nairobi",
    "network cameras Nairobi",
    "Ronald Ngala Street",
  ],
  openGraph: {
    title: "Your Cart | Gericom Electronics Nairobi",
    description:
      "View and manage your shopping cart at Gericom Electronics in Nairobi, Kenya. Checkout securely for cameras and accessories.",
    url: "https://gericomlinksnetworks.co.ke/cart",
    siteName: "Gericom Electronics",
    images: [
      {
        url: "/og-image.png", // 👈 replace with your OG image file in /public
        width: 1200,
        height: 630,
        alt: "Gericom Electronics Nairobi - Shopping Cart",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Cart | Gericom Electronics Nairobi",
    description:
      "Manage your shopping cart and proceed to secure checkout at Gericom Electronics Nairobi.",
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

      {/* ✅ Use the CartDrawer component but force it visible on this page */}
      <div className="border rounded-md shadow-sm p-4 bg-white">
        <CartDrawer />
      </div>
    </main>
  );
}
