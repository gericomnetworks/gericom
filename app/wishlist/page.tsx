"use client";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishedProducts = Object.values(wishlist);

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 py-10 px-6 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Wishlist</h1>
        <p className="text-white/80 text-sm">Home / Wishlist</p>
      </div>

      {/* Empty state */}
      {wishedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center"> 
          <Heart className="w-16 h-16 text-red-500 mb-6" strokeWidth={1.5} /> 
          <h2 className="text-xl font-semibold mb-3">This wishlist is empty.</h2> 
          <p className="text-gray-600 max-w-md mb-6">
            You don&apos;t have any products in the wishlist yet. <br /> 
            You will find a lot of interesting products on our{" "} 
            <span className="font-medium">Shop</span> page. 
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
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
              <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
              <p className="text-red-600 font-semibold text-sm mt-1">
                Ksh {p.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
