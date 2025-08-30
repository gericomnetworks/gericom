"use client";

import * as React from "react";

type StockStatus = "onsale" | "instock" | "backorder";

type Product = {
  id: string;
  name: string;
  brand: "Dahua" | "UNIVIEW";
  price: number;
  oldPrice?: number;
  status: StockStatus;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "ptz1", name: "Dahua PTZ1C200UE-GN 2MP Starlight IR PTZ Network Camera", brand: "Dahua", oldPrice: 82500, price: 75700, status: "onsale", image: "/products/ptz1.jpg" },
  { id: "ptz2", name: "IPC6252SR-X22UG Uniview Outdoor PTZ IP Security Camera", brand: "UNIVIEW", price: 92630, status: "instock", image: "/products/ptz2.jpg" },
  { id: "ptz3", name: "IPC6252SL-X33UP Uniview 2MP Starlight Laser IR Network PTZ Dome", brand: "UNIVIEW", price: 226430, status: "instock", image: "/products/ptz3.jpg" },
  { id: "ptz4", name: "IPC6852SR-X44U Uniview 2MP 44X Starlight Network PTZ Dome", brand: "UNIVIEW", price: 226430, status: "instock", image: "/products/ptz4.jpg" },
  { id: "ptz5", name: "IPC7622ER-X44-VF 2MP 44X Lighthunter Network Positioning System", brand: "UNIVIEW", price: 273000, status: "instock", image: "/products/ptz5.jpg" },
  { id: "ptz6", name: "SD6AL245U-HNI Dahua 2MP 45X Starlight Laser PTZ Network Camera", brand: "Dahua", oldPrice: 186500, price: 166260, status: "onsale", image: "/products/ptz6.jpg" },
  { id: "ptz7", name: "SD6AW230-HNI Dahua 2MP PTZ Dome Camera", brand: "Dahua", oldPrice: 66000, price: 59600, status: "onsale", image: "/products/ptz7.jpg" },
];

function formatKES(n: number) {
  return `Ksh${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

function Heart({ filled }: { filled?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-5 w-5 ${filled ? "fill-red-500 stroke-red-500" : "fill-transparent stroke-gray-400"} transition`}
    >
      <path strokeWidth="2" d="M16.5 3.75c-1.79 0-3.34.97-4.5 2.44C10.84 4.72 9.29 3.75 7.5 3.75A4.75 4.75 0 0 0 2.75 8.5c0 6.28 8.08 10.33 9.07 10.8a.75.75 0 0 0 .72 0c.99-.47 9.07-4.52 9.07-10.8A4.75 4.75 0 0 0 16.5 3.75Z" />
    </svg>
  );
}

export default function Page() {
  // filters/state
  const [priceMin, setPriceMin] = React.useState(7500);
  const [priceMax, setPriceMax] = React.useState(300000);
  const [brands, setBrands] = React.useState<("Dahua" | "UNIVIEW")[]>([]);
  const [stock, setStock] = React.useState<StockStatus[]>([]);
  const [query, setQuery] = React.useState("");
  const [perPage, setPerPage] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState("default");
  const [wishlist, setWishlist] = React.useState<Record<string, boolean>>({});
  const [quoteIds, setQuoteIds] = React.useState<Record<string, number>>({});

  function clampRange(min: number, max: number) {
    if (min > max) [min, max] = [max, min];
    setPriceMin(min);
    setPriceMax(max);
  }

  function toggleBrand(b: "Dahua" | "UNIVIEW") {
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  function toggleStock(s: StockStatus) {
    setStock((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  const filtered = React.useMemo(() => {
    let out = PRODUCTS.filter((p) => p.price >= priceMin && p.price <= priceMax);
    if (brands.length) out = out.filter((p) => brands.includes(p.brand));
    if (stock.length) out = out.filter((p) => stock.includes(p.status));
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(q));
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
      default:
        break;
    }
    return out;
  }, [priceMin, priceMax, brands, stock, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  React.useEffect(() => {
    setPage(1);
  }, [priceMin, priceMax, brands, stock, query, sort, perPage]);

  function toggleWish(id: string) {
    setWishlist((w) => ({ ...w, [id]: !w[id] }));
  }

  function addToQuote(id: string) {
    setQuoteIds((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  }

  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(filtered.length, page * perPage);
  const quoteCount = Object.values(quoteIds).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="bg-gray-800/90">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">PTZ Cameras</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 space-y-8">
          {/* Price */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Filter By Price</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={7500}
                  max={300000}
                  value={priceMin}
                  onChange={(e) => clampRange(parseInt(e.target.value), priceMax)}
                  className="w-full"
                />
                <input
                  type="range"
                  min={7500}
                  max={300000}
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

          {/* Brand */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Filter By Brand</h3>
            <div className="space-y-2">
              {(["Dahua", "UNIVIEW"] as const).map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={brands.includes(b)}
                    onChange={() => toggleBrand(b)}
                    className="h-4 w-4"
                  />
                  {b}
                </label>
              ))}
            </div>
          </section>

          {/* Stock */}
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Stock Status</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={stock.includes("onsale")}
                  onChange={() => toggleStock("onsale")}
                  className="h-4 w-4"
                />
                On sale
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={stock.includes("instock")}
                  onChange={() => toggleStock("instock")}
                  className="h-4 w-4"
                />
                In stock
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={stock.includes("backorder")}
                  onChange={() => toggleStock("backorder")}
                  className="h-4 w-4"
                />
                On backorder
              </label>
            </div>
          </section>

          {/* Promo */}
          <section className="rounded-2xl border bg-white overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
              alt="Promo"
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h4 className="text-lg font-semibold">High Quality Products</h4>
              <p className="text-sm text-gray-600 mt-1">PTZ solutions for every scenario.</p>
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
                    className={`rounded-md px-2 py-1 ${perPage === n ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-2">
                <div className="grid grid-cols-2 gap-0.5 rounded-md border p-1">
                  <span className="h-4 w-4 bg-gray-900" />
                  <span className="h-4 w-4 bg-gray-300" />
                  <span className="h-4 w-4 bg-gray-300" />
                  <span className="h-4 w-4 bg-gray-300" />
                </div>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border bg-white px-3 py-2 text-sm"
                aria-label="Sorting"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
                <option value="name-asc">Sort by name: A → Z</option>
                <option value="name-desc">Sort by name: Z → A</option>
              </select>

              {/* Search */}
              <div className="flex items-center rounded-lg border bg-white px-3 py-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for PTZ cameras"
                  className="w-52 outline-none"
                />
              </div>

              <div className="ml-1 text-sm">
                <span className="rounded-full bg-gray-800 px-2 py-1 font-semibold text-white">
                  Quote: {quoteCount}
                </span>
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
                const wished = !!wishlist[p.id];
                const onSale = p.status === "onsale" && p.oldPrice && p.oldPrice > p.price;

                return (
                  <div key={p.id} className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md">
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWish(p.id)}
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                      aria-label="Toggle wishlist"
                    >
                      <Heart filled={wished} />
                    </button>

                    {/* Sale badge */}
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
                        {onSale && <span className="text-sm text-gray-400 line-through">{formatKES(p.oldPrice!)}</span>}
                        <span className="text-base font-semibold text-red-600">{formatKES(p.price)}</span>
                      </div>
                      <button
                        onClick={() => addToQuote(p.id)}
                        className="mt-2 w-full rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Add to Quote
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
              className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded-lg border text-sm ${page === n ? "bg-gray-800 font-semibold text-white" : "bg-white hover:bg-gray-50"}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
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
