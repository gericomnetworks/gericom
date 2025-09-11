// app/layout.tsx
import "./globals.css";
import ClientProviders from "./ClientProviders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gericom Networks",
  description: "E-commerce site",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <ClientProviders>
          <Header />
          <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
