import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Gericom Links Networks",
  description:
    "Complete your order with Gericom Links Networks. Review your cart, confirm availability, and pay securely via M-PESA Paybill.",
  alternates: {
    canonical: "https://gericomlinksnetworks.co.ke/checkout",
  },
  openGraph: {
    title: "Checkout | Gericom Links Networks",
    description:
      "Secure checkout at Gericom Links Networks. Confirm your order and pay with M-PESA Paybill.",
    url: "https://gericomlinksnetworks.co.ke/checkout",
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
    title: "Checkout | Gericom Links Networks",
    description:
      "Secure checkout at Gericom Links Networks. Confirm your order and pay with M-PESA Paybill.",
    images: ["/og-image.png"],
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
