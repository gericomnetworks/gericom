"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/app/CartProvider"; // ✅ correct path for your setup

export default function CheckoutScenario2() {
  const router = useRouter();
  const { cart } = useCart();

  const whatsappNumber = "254723809057"; // ✅ your WhatsApp number (no leading +)

  if (cart.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <button
            onClick={() => router.back()}
            className="mt-6 flex items-center justify-center gap-2 text-gray-700 hover:text-black"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </main>
    );
  }

  // ✅ Build WhatsApp message cleanly, then encode it
  const message = `Hello, I am a client enquiring about availability of these items:\n\n${cart
    .map((item) => `- ${item.name} @ KES ${item.price.toLocaleString()}`)
    .join("\n")}\n\nPlease confirm availability.`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Complete Your Order
        </h1>
        <p className="text-gray-600 mb-6">
          Please confirm item availability before making payment.  
          You can call us or chat with us on WhatsApp.
        </p>

        {/* Call Button */}
        <a
          href={`tel:+${whatsappNumber}`}
          className="flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl mb-4 hover:bg-green-800 transition"
        >
          <Phone size={20} /> Call Us
        </a>

        {/* WhatsApp Button with Pre-filled Cart */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl mb-6 hover:bg-green-600 transition"
        >
          <MessageCircle size={20} /> Chat on WhatsApp (with Cart)
        </a>

        {/* Payment Info */}
        <Image
          src="/pay.jpg"
          alt="Lipa Na Mpesa"
          width={500}
          height={350}
          className="mx-auto rounded-lg shadow-md"
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 flex items-center justify-center gap-2 text-gray-700 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>
    </main>
  );
}
