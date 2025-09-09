"use client";

import * as React from "react";
import { useCart } from "@/app/CartProvider";
import { useWishlist } from "@/app/WishlistProvider";
import { Heart as HeartIcon, X } from "lucide-react";

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
  { id: "p1", name: "Akuvox A05C commercial-grade access control terminal, access control via AI-powered face recognition", brand: "Akuvox", price: 21000, status: "instock", image: "/products/access1.jpg" },
  { id: "p2", name: "Akuvox C319 10” Android indoor monitor with built-in voice assistant", brand: "Akuvox", price: 33450, status: "instock", image: "/products/access2.jpg" },
  { id: "p3", name: "Akuvox E12 single-button SIP video door phone, mobile access and wireless communication", brand: "Akuvox", price: 9900, oldPrice: 12000, status: "onsale", image: "/products/access3.jpg" },
  { id: "p4", name: "Akuvox E16C Face recognition, mobile access, temperature measurement, and mask detection in one device.", brand: "Akuvox", price: 41250, status: "instock", image: "/products/access4.jpg" },
  { id: "p5", name: "Akuvox E18C 7″ with face recognition featuring touchless building access and wireless communication", brand: "Akuvox", price: 56550, status: "instock", image: "/products/access5.jpg" },
  { id: "p6", name: "Akuvox R20A SIP door intercom with 120 degree Wide-angle Video camera, Flush-mount casing", brand: "Akuvox", price: 21376, oldPrice: 24000, status: "onsale", image: "/products/access6.jpg" },
  { id: "p7", name: "Akuvox R20BX5 IP Video Intercom with 5 keys and RFID", brand: "Akuvox", price: 22485, status: "instock", image: "/products/access7.jpg" },
  { id: "p8", name: "Akuvox R29CT IP video door phone, touch display, dual camera, Facial Recognition, Finger Print, RFID card reader, pin code & Bluetooth", brand: "Akuvox", price: 120000, status: "instock", image: "/products/access8.jpg" },
  { id: "p9", name: "Akuvox SP-R50P advanced telephony", brand: "Akuvox", price: 5550, status: "backorder", image: "/products/access9.jpg" },
  { id: "p10", name: "ASA1222E Dahua Dhi- Biometric Standalone Time Attendance Recorder", brand: "Dahua", price: 6484, status: "instock", image: "/products/access10.jpg" },
  { id: "p11", name: "ASH100 Dahua Smart Lock Pda", brand: "Dahua", price: 28818, status: "instock", image: "/products/access11.jpg" },
  { id: "p12", name: "ASM200 Dahua Card Reader/Writer", brand: "Dahua", price: 14409, status: "instock", image: "/products/access12.jpg" },
  { id: "p13", name: "ASR1102A Dahua Fingerprint Reader + RFID", brand: "Dahua", price: 7050, status: "backorder", image: "/products/access13.jpg" },
  { id: "p14", name: "DS-K1107MK Hikvision Card Reader", brand: "Hikvision", price: 4669, status: "instock", image: "/products/access14.jpg" },
  { id: "p15", name: "DS-K2210 ELEVATOR CONTROLLER", brand: "Hikvision", price: 42015, status: "instock", image: "/products/access15.jpg" },
  { id: "p16", name: "DS-K2602T Hikvision Two-Door Access Controller", brand: "Hikvision", price: 32679, status: "instock", image: "/products/access16.jpg" },
  { id: "p17", name: "DS-K2604T Hikvision Two-Door Access Controller", brand: "Hikvision", price: 37347, oldPrice: 42000, status: "onsale", image: "/products/access17.jpg" },
  { id: "p18", name: "DS-K2M0016A ELEVATOR CONTROLLER", brand: "Hikvision", price: 49018, status: "instock", image: "/products/access18.jpg" },
  { id: "p19", name: "Exit Switch", brand: "Generic", price: 666, status: "instock", image: "/products/access19.jpg" },
];

const ALL_BRANDS = ["Hikvision", "Dahua", "Akuvox", "Generic"] as const;

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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { wishlist, toggleWish } = useWishlist();
  const { addToCart } = useCart();

  const filtered = React.useMemo(() => {
    let out = ALL_PRODUCTS.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (brands.length) out = out.filter((p) => brands.includes(p.brand));
    if (stock.length) out = out.filter((p) => stock.includes(p.status));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc":
        return [...out].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...out].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...out].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...out].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return out;
    }
  }, [priceMin, priceMax, brands, stock, sort, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  React.useEffect(() => {
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
            <h1 className="text-4xl font-extrabold">Access Control</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar (mobile toggle + overlay) */}
        <div className="col-span-12 md:col-span-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 w-full rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm md:hidden"
          >
            Show Filters
          </button>

          {/* Desktop sidebar */}
          <aside className="hidden md:block space-y-8">
            <Filters
              brands={brands}
              toggleBrand={toggleBrand}
              stock={stock}
              toggleStock={toggleStock}
              priceMin={priceMin}
              priceMax={priceMax}
              clampRange={clampRange}
            />
          </aside>

          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex">
              <div className="relative w-80 bg-white p-5 shadow-lg overflow-y-auto">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute right-3 top-3 rounded-full p-2 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <Filters
                  brands={brands}
                  toggleBrand={toggleBrand}
                  stock={stock}
                  toggleStock={toggleStock}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  clampRange={clampRange}
                />
              </div>
              <div
                className="flex-1 bg-black/40"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
          )}
        </div>

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
                      perPage === n
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
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
                <option value="price-asc">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
                <option value="name-asc">Sort by name: A → Z</option>
                <option value="name-desc">Sort by name: Z → A</option>
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
                const onSale =
                  p.status === "onsale" && p.oldPrice && p.oldPrice > p.price;
                return (
                  <div
                    key={p.id}
                    className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
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
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                      aria-label="Toggle wishlist"
                    >
                      <HeartIcon
                        className="w-5 h-5"
                        strokeWidth={1.5}
                        fill={wishlist[p.id] ? "red" : "transparent"}
                        stroke={wishlist[p.id] ? "red" : "gray"}
                      />
                    </button>

                    {/* Sale badge */}
                    {onSale && (
                      <div className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                        -{Math.round(
                          ((p.oldPrice! - p.price) / p.oldPrice!) * 100
                        )}
                        %
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
          <div className="mt-8 flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:opacity-50"
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
              className="rounded-lg border bg-white px-3 py-2 text-sm disabled:opacity-50"
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

/* Sidebar Filters component */
function Filters({
  brands,
  toggleBrand,
  stock,
  toggleStock,
  priceMin,
  priceMax,
  clampRange,
}: {
  brands: string[];
  toggleBrand: (b: string) => void;
  stock: StockStatus[];
  toggleStock: (s: StockStatus) => void;
  priceMin: number;
  priceMax: number;
  clampRange: (min: number, max: number) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Filter by Price */}
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
          <div className="flex items-center justify-between text-sm">
            <span>{formatKES(priceMin)}</span>
            <span>{formatKES(priceMax)}</span>
          </div>
        </div>
      </section>

      {/* Filter by Brand */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-4">Filter by Brand</h3>
        <div className="space-y-2">
          {ALL_BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => toggleBrand(b)}
              />
              {b}
            </label>
          ))}
        </div>
      </section>

      {/* Filter by Stock */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <h3 className="font-semibold mb-4">Filter by Stock</h3>
        <div className="space-y-2">
          {(["onsale", "instock", "backorder"] as StockStatus[]).map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={stock.includes(s)}
                onChange={() => toggleStock(s)}
              />
              {s === "onsale"
                ? "On Sale"
                : s === "instock"
                ? "In Stock"
                : "Backorder"}
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
