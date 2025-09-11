import React from "react";
import ClientProvider from "../app/ClientProvider";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ClientProvider>
  );
}