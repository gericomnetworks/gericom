"use client"
import { ArrowLeftRight } from "lucide-react"
import Link from "next/link"

export default function Compare() {
  return (
    <section className="min-h-screen bg-gray-50 ">
      {/* Red header */}
<div className="bg-gray-800 py-12 px-6 flex justify-between items-center">
  <h1 className="text-white text-4xl font-bold">Compare</h1>
  <p className="text-white/80 text-sm">Home / Compare</p>
</div>

      {/* Empty wishlist message */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ArrowLeftRight className="w-20 h-20 text-red-500 mb-6" strokeWidth={1.5} />
        <h2 className="text-2xl font-semibold mb-3">Compare list is empty.</h2>
        <p className="text-gray-600 max-w-md mb-6">
          No products added in the compare list. You must add some products to compare them. <br />
          You will find a lot of interesting products on our &quot;Shop&quot; page. <span className="font-medium">Shop</span> page.
        </p>

        {/* Return to shop button */}
        <Link
          href="/shop"
          className="bg-gray-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Return to shop
        </Link>
      </div>
    </section>
  )
}
