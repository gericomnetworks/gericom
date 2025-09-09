"use client";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishedProducts = Object.values(wishlist);

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 py-10 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">Wishlist</h1>
        <p className="text-white/80 text-sm">Home / Wishlist</p>
      </div>

      {/* Empty state */}
      {wishedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-red-500 mb-6" strokeWidth={1.5} />
          <h2 className="text-lg sm:text-xl font-semibold mb-3">This wishlist is empty.</h2>
          <p className="text-gray-600 max-w-md mb-6 text-sm sm:text-base">
            You don&apos;t have any products in the wishlist yet. <br />
            You will find a lot of interesting products on our{" "}
            <span className="font-medium">Shop</span> page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 p-4 sm:p-6">
          {wishedProducts.map((p) => (
            <div
              key={p.uid}
              className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="aspect-square overflow-hidden rounded-md mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm sm:text-base font-medium line-clamp-2">{p.name}</h3>
              <p className="text-red-600 font-semibold text-sm sm:text-base mt-1">
                Ksh {p.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
