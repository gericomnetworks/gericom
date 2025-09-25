import AccountPageClient from "./AccountPageClient";

export const metadata = {
  title: "Login or Sign Up | Gericom Links Networks Nairobi",
  description:
    "Access your account at Gericom Links Networks. Login or sign up to manage your cart, wishlist, and orders. Nairobi’s trusted CCTV and IP camera shop.",
  keywords: [
    "CCTV login Nairobi",
    "Camera shop account Kenya",
    "Gericom account",
    "Gericom Nairobi login",
  ],
  openGraph: {
    title: "Login or Sign Up | Gericom Nairobi",
    description:
      "Manage your cart and wishlist by logging into your Gericom Links Networks account.",
    url: "https://gericomlinksnetworks.co.ke/account",
    siteName: "Gericom Links Networks",
    locale: "en_KE",
    type: "website",
  },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
