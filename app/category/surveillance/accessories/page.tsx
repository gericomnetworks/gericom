"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useCart } from "@/app/CartProvider";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart as HeartIcon, SlidersHorizontal } from "lucide-react";

type StockStatus = "onsale" | "instock" | "backorder";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  status: StockStatus;
  image: string;
};

const ALL_PRODUCTS: Product[] = [
  { id: "p1", name: "6 Core Alarm Cable White (100Mt Coil) Alarm Cable 6 Cores", brand: "Generic", price: 1800, status: "instock", image: "/products/accessories1.jpg" },
  { id: "p2", name: "ARM808 Dahua Security Cctv 8-Zone Expansion Module (Mbus)", brand: "Dahua", price: 3325, oldPrice: 4750, status: "instock", image: "/products/accessories2.jpg" },
  { id: "p3", name: "ASM100 Dahua Mifare Card Reader And Writer", brand: "Dahua", price: 7204, oldPrice: 10293, status: "onsale", image: "/products/accessories2.jpg" },
  { id: "p4", name: "ASR1101A Dahua RFID Card Reader With Touch Keypad", brand: "Dahua", price: 3750, oldPrice: 8235, status: "instock", image: "/products/accessories4.jpg" },
  { id: "p5", name: "BDCOM GSFP-LX-20-D 1.25G SFP Optical Module", brand: "BDCOM", price: 913, status: "instock", image: "/products/accessories5.jpg" },
  { id: "p6", name: "DH-PFM905-E Dahua Technology Integrated Mount Tester", brand: "Dahua", price: 21786, oldPrice: 31121, status: "onsale", image: "/products/accessories6.jpg" },
  { id: "p7", name: "DH816W2 Camera Bracket Dahua", brand: "Dahua", price: 1439, status: "instock", image: "/products/accessories7.jpg" },
  { id: "p8", name: "HDMI 10M", brand: "Generic", price: 2059, status: "backorder", image: "/products/accessories8.jpg" },
  { id: "p10", name: "HDMI 15M", brand: "Generic", price: 2574, status: "instock", image: "/products/accessories10.jpg" },
  { id: "p11", name: "HDMI 20M", brand: "Generic", price: 3088, status: "instock", image: "/products/accessories11.jpg" },
  { id: "p12", name: "HDMI 25M", brand: "Generic", price: 7204, status: "instock", image: "/products/accessories12.jpg" },
  { id: "p13", name: "HDMI 3M", brand: "Generic", price: 618, status: "backorder", image: "/products/accessories13.jpg" },
  { id: "p14", name: "HDMI 40M", brand: "Generic", price: 9264, status: "instock", image: "/products/accessories14.jpg" },
  { id: "p15", name: "HDMI 50M", brand: "Generic", price: 11085, status: "instock", image: "/products/accessories15.jpg" },
  { id: "p16", name: "HDMI Splitter", brand: "Generic", price: 3088, status: "instock", image: "/products/accessories16.jpg" },
  { id: "p17", name: "PFA152 Dahua Technology Pole Mount Bracket", brand: "Dahua", price: 2161, oldPrice: 3088, status: "onsale", image: "/products/accessories17.jpg" },
  { id: "p18", name: "PFB203W Dahua Technology Waterproof Wall Mount Bracket", brand: "Dahua", price: 1662, oldPrice: 2376, status: "instock", image: "/products/accessories18.jpg" },
  { id: "p19", name: "PFB300C Dahua Technology Ceiling Mount Bracket", brand: "Dahua", price: 2882, oldPrice: 4117, status: "instock", image: "/products/accessories19.jpg" },
  { id: "p20", name: "PFT1200 Dahua Technology 60W High Poe Midspan", brand: "Dahua", price: 4989, oldPrice: 7126, status: "instock", image: "/products/accessories20.jpg" },
  { id: "p21", name: "PFT1300 Dahua Technology Poe Extender", brand: "Dahua", price: 2882, oldPrice: 4117, status: "instock", image: "/products/accessories21.jpg" },
  { id: "p22", name: "Security Alarm Cable 4-Core 100M White – Pp4C Alarm Cable 4 Cores", brand: "Generic", price: 4670, status: "instock", image: "/products/accessories22.jpg" },
  { id: "p23", name: "TR-WE45-IN Uniview PTZ Dome Wall Mount", brand: "Generic", price: 16900, status: "instock", image: "/products/accessories23.jpg" },
  { id: "p24", name: "TR-WM03-B-IN Uniview 3-Inch Fixed Dome Mount", brand: "UNIVIEW", price: 2730, status: "backorder", image: "/products/accessories24.jpg" },
  { id: "p25", name: "Uniview HB-7199-TP Wireless Screen Sharing Dongle", brand: "UNIVIEW", price: 9039, status: "backorder", image: "/products/accessories25.jpg" },
  { id: "p26", name: "UNV-PS-300W-AC Uniview Juniper Power Supply", brand: "UNIVIEW", price: 42300, status: "backorder", image: "/products/accessories26.jpg" },
  { id: "p27", name: "VTNS1060A Dahua 24V Network Power Supply", brand: "Dahua", price: 4989, status: "backorder", image: "/products/accessories27.jpg" },
];

const ALL_BRANDS = ["BDCOM", "Dahua", "UNIVIEW", "Generic"] as const;

function formatKES(x: number) {
  return `Ksh${x.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export default function AccessoriesPage() {
  const { wishlist, toggleWish } = useWishlist();
  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [stock, setStock] = useState<StockStatus[]>([]);
  const [priceMin, setPriceMin] = useState(3000);
  const [priceMax, setPriceMax] = useState(200000);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let out = ALL_PRODUCTS.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (brands.length) out = out.filter((p) => brands.includes(p.brand));
    if (stock.length) out = out.filter((p) => stock.includes(p.status));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
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
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [priceMin, priceMax, brands, stock, sort, perPage, query]);

  function toggleBrand(b: string) {
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }
  function toggleStock(s: StockStatus) {
    setStock((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }
  function clampRange(min: number, max: number) {
    if (min > max) [min, max] = [max, min];
    setPriceMin(min);
    setPriceMax(max);
  }

  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(filtered.length, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1569235182173-379ecd0bba77?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="bg-gray-800/85">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">Accessories</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:flex lg:gap-8">
        {/* Sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } fixed inset-y-0 left-0 z-20 w-72 bg-white p-5 shadow-lg lg:static lg:block lg:w-72 lg:shadow-none`}
        >
          {/* Filter by Price */}
          <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Filter by Price</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={3000}
                  max={200000}
                  value={priceMin}
                  onChange={(e) => clampRange(parseInt(e.target.value), priceMax)}
                  className="w-full"
                />
                <input
                  type="range"
                  min={3000}
                  max={200000}
                  value={priceMax}
                  onChange={(e) => clampRange(priceMin, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-600">
                Price: <span className="font-medium">{formatKES(priceMin)}</span> —{" "}
                <span className="font-medium">{formatKES(priceMax)}</span>
              </p>
            </div>
          </section>

          {/* Brands */}
          <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
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
          <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Stock Status</h3>
            <div className="space-y-2">
              {["onsale", "instock", "backorder"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={stock.includes(s as StockStatus)}
                    onChange={() => toggleStock(s as StockStatus)}
                    className="h-4 w-4"
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Promo */}
          <section className="rounded-2xl border bg-white overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1580906855280-95e535b1341c?q=80&w=1200&auto=format&fit=crop"
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

          <button
            onClick={() => setShowFilters(false)}
            className="mt-6 w-full rounded-lg bg-gray-800 px-4 py-2 text-white lg:hidden"
          >
            Close
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Controls */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Show Filters
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{showingFrom}</span>–
                <span className="font-medium">{showingTo}</span> of{" "}
                <span className="font-medium">{filtered.length}</span> results
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A–Z</option>
                <option value="name-desc">Name: Z–A</option>
              </select>

              <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                  className="w-52 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {current.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center text-gray-600">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {current.map((p) => {
                const onSale = p.status === "onsale" && p.oldPrice && p.oldPrice > p.price;
                return (
                  <div
                    key={p.id}
                    className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <button
                      onClick={() =>
                        toggleWish({ id: p.id, name: p.name, price: p.price, image: p.image })
                      }
                      className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                    >
                      <HeartIcon
                        className="w-5 h-5"
                        strokeWidth={1.5}
                        fill={wishlist[p.id] ? "red" : "transparent"}
                        stroke={wishlist[p.id] ? "red" : "gray"}
                      />
                    </button>

                    {onSale && (
                      <div className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                        -{Math.round(((p.oldPrice! - p.price) / p.oldPrice!) * 100)}%
                      </div>
                    )}

                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{p.name}</h3>
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
                          addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })
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
          <div className="mt-8 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:opacity-50"
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
              disabled={page === totalPages}
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
