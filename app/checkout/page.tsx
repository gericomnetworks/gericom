"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, MessageCircle, ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "@/app/CartProvider";
import { useAuth } from "@clerk/nextjs";

export default function CheckoutScenario2() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // If not signed in, redirect to /account
  if (!isSignedIn) {
    router.push("/account");
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Redirecting to login...</p>
      </main>
    );
  }

  let cart: ReturnType<typeof useCart>["cart"] = [];
  let clearCart: ReturnType<typeof useCart>["clearCart"] = () => {};

  try {
    const cartCtx = useCart();
    cart = cartCtx.cart;
    clearCart = cartCtx.clearCart;
  } catch {
    // fallback: no provider
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Cart is not available.</p>
      </main>
    );
  }

  const whatsappNumber = "254723809057";

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gray-800 py-12 px-6 flex justify-between items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
            Checkout
          </h1>
          <p className="text-white/70 text-sm md:text-base">Home / Checkout</p>
        </div>

        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
          <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-10 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Your Cart
            </h1>
            <p className="text-gray-500 mb-6">Looks like your cart is empty.</p>
            <button
              onClick={() => router.back()}
              className="mt-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={18} /> Back to Shopping
            </button>
          </div>
        </main>
      </section>
    );
  }

  const message = `Hello, I am a client enquiring about availability of these items:\n\n${cart
    .map(
      (item) =>
        `- ${item.name} (x${item.quantity}) @ KES ${item.price.toLocaleString()} each = KES ${(item.price * item.quantity).toLocaleString()}`
    )
    .join("\n")}\n\nTotal: KES ${cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString()}\n\nPlease confirm availability.`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gray-800 py-12 px-6 flex justify-between items-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
          Checkout
        </h1>
        <p className="text-white/70 text-sm md:text-base">Home / Checkout</p>
      </div>

      <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Cart Summary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="mb-6 flex items-center justify-center gap-2 w-full rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
              <Trash2 size={18} /> Clear Cart
            </button>

            <div className="flex justify-between font-semibold text-lg border-t pt-4">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Right: Actions + Payment */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Complete Your Order
            </h2>
            <p className="text-gray-600 mb-8">
              Please confirm item availability before making payment.
            </p>

            <div className="flex flex-col gap-4 w-full">
              <a
                href={`tel:+${whatsappNumber}`}
                className="flex items-center justify-center gap-3 bg-green-700 text-white px-6 py-3 rounded-full shadow hover:bg-green-800 transition"
              >
                <Phone size={20} /> Call Us
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition"
              >
                <MessageCircle size={20} /> Chat on WhatsApp (with Cart)
              </a>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-inner mt-8 w-full">
              <Image
                src="/pay.jpg"
                alt="Lipa Na Mpesa"
                width={400}
                height={280}
                className="mx-auto rounded-lg shadow"
              />
              <p className="text-sm text-gray-500 mt-4">
                Secure payments via Lipa Na M-Pesa
              </p>
            </div>

            <button
              onClick={() => router.back()}
              className="mt-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
