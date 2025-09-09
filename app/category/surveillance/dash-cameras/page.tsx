"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Heart, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/app/CartProvider";

type StockStatus = "onsale" | "instock" | "backorder";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  stock: StockStatus;
};

const DASH_CAMERAS: Product[] = [
  {
    id: "1",
    name: "Dash Camera (G300H Pro)",
    price: 8993.81,
    image: "/products/dash1.jpg",
    brand: "Botslab",
    stock: "instock",
  },
  {
    id: "2",
    name: "Dash Camera (G500H Pro)",
    price: 11600.7,
    image: "/products/dash2.jpg",
    brand: "Botslab",
    stock: "onsale",
  },
  {
    id: "3",
    name: "Dash Camera (G980H) with 64 GB SD Card",
    price: 16293.13,
    image: "/products/dash3.jpg",
    brand: "Botslab",
    stock: "backorder",
  },
  {
    id: "4",
    name: "Dash Camera (HK30 Pro)",
    price: 5865.52,
    image: "/products/dash4.jpg",
    brand: "Botslab",
    stock: "instock",
  },
];

const ALL_BRANDS = ["Botslab"];

function formatKES(value: number) {
  return `Ksh ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function DashCamerasPage() {
  const { addToCart } = useCart();

  // Controls
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [perPage] = useState(6);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [priceMin, setPriceMin] = useState(3000);
  const [priceMax, setPriceMax] = useState(200000);
  const [brands, setBrands] = useState<string[]>([]);
  const [stock, setStock] = useState<StockStatus[]>([]);

  function toggleBrand(b: string) {
    setBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  }

  function toggleStock(s: StockStatus) {
    setStock((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function clampRange(min: number, max: number) {
    if (min > max) return;
    setPriceMin(min);
    setPriceMax(max);
  }

  const filtered = useMemo(() => {
    let products = DASH_CAMERAS.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Price filter
    products = products.filter((p) => p.price >= priceMin && p.price <= priceMax);

    // Brand filter
    if (brands.length > 0) {
      products = products.filter((p) => brands.includes(p.brand));
    }

    // Stock filter
    if (stock.length > 0) {
      products = products.filter((p) => stock.includes(p.stock));
    }

    // Sorting
    if (sort === "name-asc") products.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") products.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") products.sort((a, b) => b.price - a.price);

    return products;
  }, [search, sort, priceMin, priceMax, brands, stock]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1569235182173-379ecd0bba77?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center mb-2">
        <div className="bg-gray-800/85">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">Dash Cameras</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl lg:flex lg:gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-72 transform bg-white p-5 shadow-lg transition-transform md:static md:col-span-3 md:translate-x-0 ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-8 overflow-y-auto pb-20 md:pb-0">
            {/* Price */}
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Filter by Price</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={3000}
                    max={200000}
                    value={priceMin}
                    onChange={(e) =>
                      clampRange(parseInt(e.target.value), priceMax)
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={3000}
                    max={200000}
                    value={priceMax}
                    onChange={(e) =>
                      clampRange(priceMin, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <span className="font-medium">{formatKES(priceMin)}</span> —{" "}
                  <span className="font-medium">{formatKES(priceMax)}</span>
                </p>
              </div>
            </section>

            {/* Brands */}
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Filter by Brand</h3>
              <div className="space-y-2">
                {ALL_BRANDS.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={brands.includes(b)}
                      onChange={() => toggleBrand(b)}
                      className="h-4 w-4"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Stock */}
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Stock Status</h3>
              <div className="space-y-2">
                {(["onsale", "instock", "backorder"] as StockStatus[]).map(
                  (s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={stock.includes(s)}
                        onChange={() => toggleStock(s)}
                        className="h-4 w-4"
                      />
                      {s === "onsale"
                        ? "On sale"
                        : s === "instock"
                        ? "In stock"
                        : "On backorder"}
                    </label>
                  )
                )}
              </div>
            </section>

            {/* Promo */}
          <section className="rounded-2xl border bg-white overflow-hidden shadow-sm">
            <img
              src="/products/promo.jpg"
              alt="Promo"
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold">High Quality Products</h4>
              <p className="text-sm text-gray-600 mt-1">
                Reliable brands for professional surveillance.
              </p>
              <button className="mt-4 rounded-xl bg-gray-800 px-4 py-2 text-white hover:bg-red-700">
                Shop Now
              </button>
            </div>
          </section>
          </div>
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
            </div>
          </div>

          {/* Products Grid */}
          {paginated.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((p) => (
                <div
                  key={p.id}
                  className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                >
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
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`px-4 py-2 rounded-lg border ${
                    page === n
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
