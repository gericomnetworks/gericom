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
  price: number; // KES
  oldPrice?: number; // for sale badge/strike-through
  status: StockStatus;
  image: string; // use external placeholder so it works without local assets
};

const ALL_PRODUCTS: Product[] = [
  { id: "p1", name: "Akuvox A05C commercial-grade access control terminal, access control via AI-powered face recognition", brand: "Akuvox", price: 21000, status: "instock", image: "/products/inter1.jpg" },
  { id: "p2", name: "Akuvox C319 10” Android indoor monitor with built-in voice assistant", brand: "Akuvox", price: 33450, status: "instock", image: "/products/inter2.jpg" },
  { id: "p3", name: "Akuvox E12 single-button SIP video door phone, mobile access and wireless communication", brand: "Akuvox", price: 9900, status: "onsale", image: "/products/inter3.jpg" },
  { id: "p4", name: "Akuvox E16C Face recognition, mobile access, temperature measurement, and mask detection in one device.", brand: "Akuvox", price: 41250, status: "instock", image: "/products/inter4.jpg" },
  { id: "p5", name: "Akuvox E18C 7″ with face recognition featuring touchless building access and wireless communication", brand: "Akuvox", price: 56550, status: "instock", image: "/products/inter5.jpg" },
  { id: "p6", name: "Akuvox IP Video Intercom Kit ,Wi-Fi video door phone ,a touchscreen monitor", brand: "Akuvox", price: 21450, status: "onsale", image: "/products/inter6.jpg" },
  { id: "p7", name: "Akuvox R20A SIP door intercom with 120 degree Wide-angle Video camera, Flush-mount casing", brand: "Akuvox", price: 21378, status: "instock", image: "/products/inter7.jpg" },
  { id: "p8", name: "Akuvox R20BX5 IP Video Intercom with 5 keys and RFID", brand: "Akuvox", price: 22485, status: "instock", image: "/products/inter8.jpg" },
  { id: "p9", name: "Akuvox R20K SIP Video Door Phone with Numeric Keypad", brand: "Akuvox", price: 29294, status: "backorder", image: "/products/inter9.jpg" },
  { id: "p10", name: "Akuvox R27A IP video intercom with keypad (RFID card reader)", brand: "Akuvox", price: 39585, status: "instock", image: "/products/inter10.jpg" },
  { id: "p11", name: "Akuvox R28A IP Video Intercom (2MP camera, H.265 & H.264 decoding, 4.3 inch color display, RFID card reader, keypad)", brand: "Akuvox", price: 52500, status: "instock", image: "/products/inter11.jpg" },
  { id: "p12", name: "Akuvox R29CT IP video door phone, touch display, dual camera, Facial Recognition, Finger Print, RFID card reader, pin code & Bluetooth", brand: "Akuvox", price: 120000, status: "instock", image: "/products/inter12.jpg" },
  { id: "p13", name: "Akuvox S562 7″ Linux indoor monitor with compact body and stylish design", brand: "Akuvox", price: 9300, status: "backorder", image: "/products/inter13.jpg" },
  // fill out to mimic a full catalog grid
  { id: "p14", name: "Akuvox SP-R50P advanced telephony", brand: "Akuvox", price: 5550, status: "instock", image: "/products/inter14.jpg" },
  { id: "p15", name: "ARA10-W Dahua Technology Dhi- WIReless SIRen", brand: "Dahua", price: 3603, oldPrice: 5146, status: "instock", image: "/products/inter15.jpg" },
  { id: "p16", name: "ARC5408B-CW Dahua Network Video Alarm Controller", brand: "Dahua", price: 17292, oldPrice: 24702, status: "instock", image: "/products/inter16.jpg" },
  { id: "p17", name: "ARC5808C-C Dahua Intelligent Building Security Alarm Controller", brand: "Dahua", price: 31500, status: "onsale", image: "/products/inter17.jpg" },
  { id: "p18", name: "ARD1231-W Dahua WIReless PIR Motion Detector Bi-DIRectional Dahua AIRfly", brand: "Dahua", price: 3169, status: "instock", image: "/products/inter18.jpg" },
  { id: "p19", name: "ARD311-W Dahua WIReless Door/Window Contact", brand: "Dahua", price: 2161, status: "instock", image: "/products/inter19.jpg" },
  { id: "p20", name: "ARK20C-MW Dahua 1Km Transmit Distance WIReless Alarm Keypad", brand: "Dahua", price: 3603, status: "instock", image: "/products/inter20.jpg" },
  { id: "p21", name: "DS-KAB10-D Hikvision Video Intercom Housing", brand: "Hikvision", price: 8560, status: "instock", image: "/products/inter21.jpg" },
  { id: "p22", name: "E21A VANDAL RESISTANT EMERGENCY INTERCOM", brand: "Akuvox", price: 27710, status: "instock", image: "/products/inter22.jpg" },
  { id: "p23", name: "HAP200 Dahua Technology High-Fidelity Pickup Microphone", brand: "Dahua", price: 3603, status: "instock", image: "/products/inter23.jpg" },
  { id: "p24", name: "HAT200-N2 Dahua Window Intercom", brand: "Dahua", price: 21615, status: "backorder", image: "/products/inter24.jpg" },
];

const ALL_BRANDS = [

  "Hikvision",
  "Dahua",
  "UNIVIEW",
  "Akuvox",

] as const;

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
  const [sort, setSort] = React.useState("default"); // default|price-asc|price-desc|name-asc|name-desc

  // Derived products after filters
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
        // keep insertion order to mimic "Default sorting"
        break;
    }
    return out;
  }, [priceMin, priceMax, brands, stock, sort, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  React.useEffect(() => {
    // reset to first page when filters change
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

  const { wishlist, toggleWish } = useWishlist();

  const { addToCart } = useCart();
  // small helpers
  const showingFrom = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const showingTo = Math.min(filtered.length, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[url('https://images.unsplash.com/photo-1569235182173-379ecd0bba77?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="bg-gray-800/85">
          <div className="mx-auto max-w-7xl px-4 py-10 text-white">
            <h1 className="text-4xl font-extrabold">Intercom</h1>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 space-y-8">
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

              {/* Grid/List icons (visual only for parity with screenshot) */}
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
                  <div key={p.id} className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md">
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
                      className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                      aria-label="Toggle wishlist"
                    ><HeartIcon
                        className="w-5 h-5"
                        strokeWidth={1.5}
                        fill={wishlist[p.id] ? "red" : "transparent"}
                        stroke={wishlist[p.id] ? "red" : "gray"}
                      /></button>
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
                        onClick={() => addToCart({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                        })}
                        className="mt-2 w-full rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Add to Cart
                      </button>                    </div>
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
