// app/account/[[...rest]]/page.tsx
import type { Metadata } from "next";
import AccountPageClient from "./AccountPageClient";

export const metadata: Metadata = {
  title: "Login or Sign Up | Gericom Links Networks Nairobi",
  description:
    "Access your account at Gericom Links Networks. Login or sign up to manage your cart, wishlist, and orders. Nairobi’s trusted CCTV and networking shop.",
  keywords: [
    "CCTV login Nairobi",
    "Camera shop account Kenya",
    "Gericom account",
    "Gericom Nairobi login",
    "Networking account Nairobi",
  ],
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke/account",
  },
  openGraph: {
    title: "Login or Sign Up | Gericom Links Networks Nairobi",
    description:
      "Manage your cart and wishlist by logging into your Gericom Links Networks account.",
    url: "https://gericomlinksnetworks.co.ke/account",
    siteName: "Gericom Links Networks",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login or Sign Up | Gericom Links Networks Nairobi",
    description:
      "Access and manage your account at Gericom Links Networks Nairobi.",
    images: ["/og-image.png"],
  },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
