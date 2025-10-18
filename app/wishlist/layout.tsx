import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Gericom Links Networks Nairobi",
  description:
    "View and manage your wishlist at Gericom Links Networks, Nairobi. Save CCTV, IP, and PTZ cameras for later purchase. Located along Ronald Ngala Street, Nairobi town.",
  keywords: [
    "wishlist",
    "Gericom Links Networks",
    "CCTV wishlist Nairobi",
    "IP cameras wishlist",
    "PTZ cameras Nairobi",
    "network cameras Kenya",
    "electronics shop Nairobi",
  ],
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke/wishlist",
  },
  openGraph: {
    title: "Wishlist | Gericom Links Networks Nairobi",
    description:
      "Access your saved products wishlist at Gericom Links Networks, your trusted CCTV and networking shop in Nairobi.",
    url: "https://gericomlinksnetworks.co.ke/wishlist",
    siteName: "Gericom Links Networks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gericom Links Networks Wishlist",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wishlist | Gericom Links Networks Nairobi",
    description:
      "Keep track of your favorite CCTV and networking products at Gericom Links Networks Nairobi.",
    images: ["/og-image.png"],
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
