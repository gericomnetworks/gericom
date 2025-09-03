"use client";

import Image from "next/image";
import { useCart } from "@/app/CartProvider";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { cart, removeFromCart, isOpen, closeCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    closeCart();              // close the drawer
    router.push("/checkout"); // go to Scenario 2 checkout page
  };

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={closeCart} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                {/* Product image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />

                {/* Product info */}
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Ksh{item.price}</p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <p className="mb-2 font-semibold">Total: Ksh{total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-black text-white py-2 rounded-md disabled:bg-gray-400"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
    </>
  );
}
