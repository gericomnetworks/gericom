"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Heart, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/app/CartProvider";

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
};

const DASH_CAMERAS: Product[] = [
  {
    id: 1,
    name: "4K Ultra HD Dash Camera",
    price: 9999,
    oldPrice: 12999,
    image: "/dash1.jpg",
  },
  {
    id: 2,
    name: "Dual Lens Dash Camera",
    price: 7499,
    image: "/dash2.jpg",
  },
  {
    id: 3,
    name: "Night Vision Dash Camera",
    price: 8499,
    image: "/dash3.jpg",
  },
  {
    id: 4,
    name: "Compact Mini Dash Camera",
    price: 5999,
    image: "/dash4.jpg",
  },
  {
    id: 5,
    name: "WiFi Dash Camera",
    price: 10999,
    oldPrice: 12999,
    image: "/dash5.jpg",
  },
  {
    id: 6,
    name: "360° Wide Angle Dash Camera",
    price: 13999,
    image: "/dash6.jpg",
  },
];

function formatKES(value: number) {
  return `KES ${value.toLocaleString()}`;
}

export default function DashCamerasPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let products = DASH_CAMERAS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "name-asc") products.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") products.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
    return products;
  }, [search, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl lg:flex lg:gap-8">
        {/* Sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } fixed inset-y-0 left-0 z-20 w-64 bg-white p-6 shadow-lg lg:static lg:block lg:w-64 lg:shadow-none`}
        >
          <h2 className="mb-4 text-lg font-semibold">Filters</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> On Sale
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Price under 10k
            </label>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="mt-6 w-full rounded-lg bg-gray-800 px-4 py-2 text-white lg:hidden"
          >
            Close
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Show Filters
            </button>

            <div className="flex flex-1 flex-wrap justify-end gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-xs rounded-lg border px-3 py-2"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border px-3 py-2"
              >
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
              </select>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="rounded-lg border px-3 py-2"
              >
                {[6, 9, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {paginated.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => {
                const onSale = p.oldPrice && p.oldPrice > p.price;
                return (
                  <div
                    key={p.id}
                    className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    {onSale && (
                      <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        SALE
                      </span>
                    )}

                    <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-gray-600 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </button>

                    <div className="relative h-40 w-full">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="rounded-lg object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {onSale && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatKES(p.oldPrice!)}
                          </span>
                        )}
                        <span className="text-base font-semibold text-red-600">
                          {formatKES(p.price)}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            image: p.image,
                          })
                        }
                        className="mt-2 w-full rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded-lg border text-sm ${
                    page === n
                      ? "bg-gray-800 font-semibold text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
