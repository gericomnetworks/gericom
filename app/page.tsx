import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Gericom Cameras Nairobi | Security & Surveillance Shop",
  description:
    "Gericom Cameras is your trusted shop in Nairobi along Ronald Ngala Street. We provide CCTV, IP Cameras, PTZ Cameras, recorders, and genuine security solutions across Kenya.",
  keywords: [
    "CCTV Nairobi",
    "IP Cameras Kenya",
    "PTZ Cameras",
    "Security Systems Nairobi",
    "Gericom Cameras",
    "Ronald Ngala Street",
    "Surveillance Kenya",
    "Nairobi Security Shop",
  ],
  openGraph: {
    title: "Gericom Cameras Nairobi | Security & Surveillance Shop",
    description:
      "Visit Gericom Cameras on Ronald Ngala Street, Nairobi. Genuine security products: CCTV, IP Cameras, PTZ, recorders, and accessories.",
    url: "https://gericomlinksnetworks.co.ke/", // 🔑 replace with your real domain
    siteName: "Gericom Links Networks",
    images: [
      {
        url: "https://gericomlinksnetworks.co.ke//og-image.png", // 🔑 replace with your shop banner image
        width: 1200,
        height: 630,
        alt: "Gericom Cameras Nairobi",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gericom Cameras Nairobi | Security & Surveillance Shop",
    description:
      "Shop CCTV, IP Cameras, PTZ Cameras, and security systems at Gericom Cameras Nairobi, Ronald Ngala Street.",
    images: ["https://gericomlinksnetworks.co.ke//og-image.png"], // 🔑 same as OG image
  },
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke/", // 🔑 set canonical to your live domain
  },
};

export default function Home() {
  return (
    <main className="bg-gray-50">
      <Hero />
      <ProductGrid />
    </main>
  );
}
