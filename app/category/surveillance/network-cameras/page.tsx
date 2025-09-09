"use client";

import * as React from "react";
import { useCart } from "@/app/CartProvider";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart as HeartIcon } from "lucide-react";

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
  { id: "p1", name: "4MP Fixed IR Dome Camera", brand: "Tiandy", price: 12900, status: "instock", image: "/products/net1.jpg" },
  { id: "p2", name: "4MP Fixed IR Bullet Camera", brand: "Tiandy", price: 14300, status: "instock", image: "/products/net2.jpg" },
  { id: "p3", name: "4MP Motorized IR Bullet Camera", brand: "Tiandy", price: 17880, oldPrice: 19500, status: "onsale", image: "/products/net3.jpg" },
  { id: "p4", name: "4MP Motorized IR Dome Camera", brand: "Tiandy", price: 17600, status: "instock", image: "/products/net4.jpg" },
  { id: "p5", name: "5MP Motorized Starlight IR Camera", brand: "Tiandy", price: 21250, status: "instock", image: "/products/net5.jpg" },
  { id: "p6", name: "5MP Super Starlight Motorized IR Bullet Camera", brand: "Tiandy", price: 26500, oldPrice: 28900, status: "onsale", image: "/products/net6.jpg" },
  { id: "p7", name: "5MP Super Starlight Motorized IR Dome Camera", brand: "Tiandy", price: 23200, status: "instock", image: "/products/net7.jpg" },
  { id: "p8", name: "6 Core Alarm Cable White 100m", brand: "Generic", price: 6900, status: "instock", image: "/products/net8.jpg" },
  { id: "p9", name: "ADX812-16 V3 16ch HD Video Decoder", brand: "Generic", price: 41800, status: "backorder", image: "/products/net9.jpg" },
  { id: "p10", name: "Akuvox A05S Commercial Access Control (Face + QR)", brand: "Akuvox", price: 94300, status: "instock", image: "/products/net10.jpg" },
  { id: "p11", name: "Akuvox C319 10\" Android Indoor Monitor", brand: "Akuvox", price: 134500, status: "instock", image: "/products/net11.jpg" },
  { id: "p12", name: "Akuvox E12 Single-Button Video Doorbell", brand: "Akuvox", price: 26500, status: "instock", image: "/products/net12.jpg" },
  { id: "p13", name: "Akuvox E16C Face Recognition Door Phone", brand: "Akuvox", price: 176000, status: "backorder", image: "/products/net13.jpg" },
  { id: "p14", name: "2MP Fixed IR Dome Camera", brand: "Dahua", price: 9200, status: "instock", image: "/products/net14.jpg" },
  { id: "p15", name: "2MP Fixed IR Bullet Camera", brand: "Dahua", price: 9800, status: "instock", image: "/products/net5.jpg" },
  { id: "p16", name: "8MP Motorized Varifocal Dome", brand: "Hikvision", price: 46350, status: "instock", image: "/products/net6.jpg" },
  { id: "p17", name: "8MP ColorVu Bullet Camera", brand: "Hikvision", price: 38990, oldPrice: 41990, status: "onsale", image: "/products/net7.jpg" },
  { id: "p18", name: "4MP LightHunter Bullet", brand: "UNIVIEW", price: 22460, status: "instock", image: "/products/net8.jpg" },
  { id: "p19", name: "4MP LightHunter Dome", brand: "UNIVIEW", price: 21990, status: "instock", image: "/products/net9.jpg" },
  { id: "p20", name: "EZVIZ C3TN 2MP Outdoor", brand: "EZVIZ", price: 6550, status: "instock", image: "/products/net10.jpg" },
  { id: "p21", name: "EZVIZ C8C 2MP Pan & Tilt", brand: "EZVIZ", price: 11500, status: "instock", image: "/products/net11.jpg" },
  { id: "p22", name: "BDCOM PoE Switch 16-Port", brand: "BDCOM", price: 28500, status: "instock", image: "/products/net12.jpg" },
  { id: "p23", name: "Cat6 UTP Cable 305m", brand: "Generic", price: 16900, status: "instock", image: "/products/net13.jpg" },
  { id: "p24", name: "Network Video Recorder 16CH", brand: "Generic", price: 55900, status: "backorder", image: "/products/net14.jpg" },
];

const ALL_BRANDS = [
  "BDCOM",
  "Hikvision",
  "Dahua",
  "Tiandy",
  "EZVIZ",
  "UNIVIEW",
  "Akuvox",
  "Generic",
] as const;

function formatKES(x: number) {
  return `Ksh${x.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export default function Page() {
  const [query, setQuery] = React.useState("");
  const [brands, setBrands] = React.useState<string[]>([]);
  const [stock, setStock] = React.useState<StockStatus[]>([]);
  const [priceMin, setPriceMin] = React.useState(3000);
  const [priceMax, setPriceMax] = React.useState(200000);
  const [perPage, setPerPage] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState("default");
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = React.useMemo(() => {
    let out = ALL_PRODUCTS.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (brands.length) out = out.filter((p) => brands.includes(p.brand));
    if (stock.length) out = out.filter((p) => stock.includes(p.status));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": return [...out].sort((a, b) => a.price - b.price);
      case "price-desc": return [...out].sort((a, b) => b.price - a.price);
      case "name-asc": return [...out].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc": return [...out].sort((a, b) => b.name.localeCompare(a.name));
      default: return out;
    }
  }, [priceMin, priceMax, brands, stock, sort, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  React.useEffect(() => setPage(1), [priceMin, priceMax, brands, stock, sort, perPage, query]);

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

  const { wishlist, toggleWish } = useWishlist();
  const { addToCart } = useCart();

  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(filtered.length, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1569235182173-379ecd0bba77?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="bg-gray-800/85">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">Surveillance &amp; Security</h1>
            <p className="mt-1 opacity-90">Network Cameras / IP Cameras</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar toggle for mobile */}
        <div className="col-span-12 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mb-4 w-full rounded-lg border bg-white px-4 py-2 font-medium shadow-sm"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {showFilters && (
            <aside className="space-y-8">{/* Filters (same as below) */}</aside>
          )}
        </div>

        {/* Sidebar (desktop) */}
        <aside className="hidden md:col-span-3 md:block space-y-8">
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
              {["onsale", "instock", "backorder"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={stock.includes(s as StockStatus)}
                    onChange={() => toggleStock(s as StockStatus)}
                    className="h-4 w-4"
                  />
                  {s === "onsale" ? "On sale" : s === "instock" ? "In stock" : "On backorder"}
                </label>
              ))}
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
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9">
          {/* Top controls */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{showingFrom}</span>–
              <span className="font-medium">{showingTo}</span> of{" "}
              <span className="font-medium">{filtered.length}</span> results
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm">
                Show:
                {[9, 12, 18, 24].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPerPage(n)}
                    className={`rounded-md px-2 py-1 ${
                      perPage === n ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border bg-white px-3 py-2 text-sm"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>

              <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products"
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
                      onClick={() => toggleWish({ id: p.id, name: p.name, price: p.price, image: p.image })}
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
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{p.name}</h3>
                      <div className="flex items-center gap-2">
                        {onSale && (
                          <span className="text-sm text-gray-400 line-through">{formatKES(p.oldPrice!)}</span>
                        )}
                        <span className="text-base font-semibold text-red-600">{formatKES(p.price)}</span>
                      </div>
                      <button
                        onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })}
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
                  page === n ? "bg-gray-800 font-semibold text-white" : "bg-white hover:bg-gray-50"
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
        </main>
      </div>
    </div>
  );
}
