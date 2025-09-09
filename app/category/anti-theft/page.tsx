"use client";

import * as React from "react";
import Image from "next/image";
import { useCart } from "@/app/CartProvider";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart as HeartIcon } from "lucide-react";

type StockStatus = "onsale" | "instock" | "backorder";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number; // KES
  oldPrice?: number;
  status: StockStatus;
  image: string;
};

const ALL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Airsec Floor-852 Am Floor System",
    brand: "Generic",
    price: 204750,
    status: "instock",
    image: "https://picsum.photos/seed/cam1/600/400",
  },
];

const ALL_BRANDS = ["Generic"] as const;

function formatKES(x: number) {
  return `Ksh${x.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export default function Page() {
  // UI state
  const [query, setQuery] = React.useState("");
  const [brands, setBrands] = React.useState<string[]>([]);
  const [stock, setStock] = React.useState<StockStatus[]>([]);
  const [priceMin, setPriceMin] = React.useState(3000);
  const [priceMax, setPriceMax] = React.useState(200000);
  const [perPage, setPerPage] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState("default");

  // Wishlist + Cart
  const { wishlist, toggleWish } = useWishlist();
  const { addToCart } = useCart();

  // Filtering + Sorting
  const filtered = React.useMemo(() => {
    let out = ALL_PRODUCTS.filter(
      (p) => p.price >= priceMin && p.price <= priceMax
    );
    if (brands.length) out = out.filter((p) => brands.includes(p.brand));
    if (stock.length) out = out.filter((p) => stock.includes(p.status));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        out = [...out].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out = [...out].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        out = [...out].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        out = [...out].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return out;
  }, [priceMin, priceMax, brands, stock, sort, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  React.useEffect(() => setPage(1), [priceMin, priceMax, brands, stock, sort, perPage, query]);

  // Helpers
  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(filtered.length, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1569235182173-379ecd0bba77?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="bg-gray-800/85">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">Anti-Theft Systems</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 space-y-8">
          {/* Price Filter */}
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
                    setPriceMin(Math.min(parseInt(e.target.value), priceMax))
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min={3000}
                  max={200000}
                  value={priceMax}
                  onChange={(e) =>
                    setPriceMax(Math.max(parseInt(e.target.value), priceMin))
                  }
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 text-sm">
                <input
                  type="number"
                  value={priceMin}
                  min={3000}
                  max={200000}
                  onChange={(e) =>
                    setPriceMin(Math.min(parseInt(e.target.value), priceMax))
                  }
                  className="w-20 border rounded px-1"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceMax}
                  min={3000}
                  max={200000}
                  onChange={(e) =>
                    setPriceMax(Math.max(parseInt(e.target.value), priceMin))
                  }
                  className="w-20 border rounded px-1"
                />
              </div>
              <p className="text-sm text-gray-600">
                Price: {formatKES(priceMin)} — {formatKES(priceMax)}
              </p>
            </div>
          </section>

          {/* Brands */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Filter by Brand</h3>
            {ALL_BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={() =>
                    setBrands((prev) =>
                      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
                    )
                  }
                />
                {b}
              </label>
            ))}
          </section>

          {/* Stock */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Stock Status</h3>
            {["onsale", "instock", "backorder"].map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={stock.includes(s as StockStatus)}
                  onChange={() =>
                    setStock((prev) =>
                      prev.includes(s as StockStatus)
                        ? prev.filter((x) => x !== s)
                        : [...prev, s as StockStatus]
                    )
                  }
                />
                {s === "onsale" ? "On sale" : s === "instock" ? "In stock" : "On backorder"}
              </label>
            ))}
          </section>
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

        </aside>

        {/* Main Products */}
        <main className="col-span-12 md:col-span-9">
          {/* Controls */}
          <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="text-sm text-gray-600">
              Showing {showingFrom}–{showingTo} of {filtered.length} results
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* perPage */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                Show:
                {[9, 12, 18, 24].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPerPage(n)}
                    className={`px-2 py-1 rounded ${
                      perPage === n ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              {/* Sorting */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>

              {/* Search */}
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Products Grid */}
          {current.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center text-gray-600">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {current.map((p) => {
                const onSale =
                  p.status === "onsale" && p.oldPrice && p.oldPrice > p.price;
                return (
                  <div
                    key={p.id}
                    className="group relative rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
                  >
                    {/* Wishlist */}
                    <button
                      onClick={() =>
                        toggleWish({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })
                      }
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                    >
                      <HeartIcon
                        className="w-5 h-5"
                        strokeWidth={1.5}
                        fill={wishlist[p.id] ? "red" : "transparent"}
                        stroke={wishlist[p.id] ? "red" : "gray"}
                      />
                    </button>

                    {/* Sale Badge */}
                    {onSale && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        -{Math.round(((p.oldPrice! - p.price) / p.oldPrice!) * 100)}%
                      </div>
                    )}

                    <div className="aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
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
                        className="w-full bg-gray-800 text-white py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition"
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
          <div className="mt-8 flex justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-3 py-2 border rounded ${
                  page === n ? "bg-gray-800 text-white" : "hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
