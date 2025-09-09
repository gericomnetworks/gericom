"use client";

import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";

export default function Compare() {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 py-10 px-4 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-center sm:text-left">
        <h1 className="text-white text-3xl sm:text-4xl font-bold">Compare</h1>
        <p className="text-white/80 text-sm sm:text-base">Home / Compare</p>
      </div>

      {/* Empty compare message */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ArrowLeftRight
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mb-6"
          strokeWidth={1.5}
        />
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Compare list is empty.
        </h2>
        <p className="text-gray-600 max-w-md mb-6 text-sm sm:text-base">
          No products added in the compare list. You must add some products to
          compare them. <br />
          You will find a lot of interesting products on our{" "}
          <span className="font-medium">Shop</span> page.
        </p>

        {/* Return to shop button */}
        <Link
          href="/shop"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Return to Shop
        </Link>
      </div>
    </section>
  );
}
