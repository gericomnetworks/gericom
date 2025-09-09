"use client"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, X, Menu, HomeIcon } from "lucide-react"
import CartDrawer from "./CartDrawer";
import { useCart } from "@/app/CartProvider";

const currencies = [
  { code: "USD", symbol: "$", label: "USD, $", flag: "/flags/us.jpeg" },
  { code: "EUR", symbol: "€", label: "EUR, €", flag: "/flags/eu.jpg" },
  { code: "UGX", symbol: "USh", label: "UGX, USh", flag: "/flags/uganda.jpeg" },
  { code: "TZS", symbol: "TSh", label: "TZS, TSh", flag: "/flags/tanzania.jpeg" },
  { code: "KES", symbol: "Ksh", label: "KES, Ksh", flag: "/flags/kenya.jpeg" },
  { code: "ETB", symbol: "Br", label: "ETB, Br", flag: "/flags/ethiopia.jpeg" },
]

type Category = {
  name: string;
  icon?: string;
  href: string;
  image?: string;
  children?: Category[];
};

const categories: Category[] = [
  {
    name: "Surveillance & Security",
    icon: "📹",
    href: "/category/surveillance",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic25-150x150.png",
    children: [
      { name: "Network Cameras (I.P Cameras)", href: "/category/surveillance/network-cameras" },
      { name: "PTZ Cameras", href: "/category/surveillance/ptz-cameras" },
      { name: "Dash Cameras", href: "/category/surveillance/dash-cameras" },
      { name: "Network Recorders (NVR)", href: "/category/surveillance/nvr" },
      { name: "Storage", href: "/category/surveillance/storage" },
      { name: "Access Control", href: "/category/surveillance/access-control" },
      { name: "Monitors", href: "/category/surveillance/monitors" },
      { name: "IVS", href: "/category/surveillance/ivs" },
      { name: "Mobile & Traffic", href: "/category/surveillance/mobile-traffic" },
      { name: "Accessories", href: "/category/surveillance/accessories" },
    ],
  },
  {
    name: "Anti-Theft Systems",
    icon: "🛡",
    href: "/category/anti-theft",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic31-150x150.png",
    children: [
      { name: "Anti-Theft Systems", href: "/category/anti-theft" },
    ],
  },
  {
    name: "Fire",
    icon: "🔥",
    href: "/category/fire",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic28-150x150.png",
    children: [
      { name: "Accessories", href: "/category/fire/accessories" },
      { name: "Break Glass", href: "/category/fire/break-glass" },
      { name: "Control Panels", href: "/category/fire/control-panels" },
      { name: "Detectors", href: "/category/fire/detectors" },
      { name: "Fire Accessories", href: "/category/fire/fire-accessories" },
      { name: "Sounders", href: "/category/fire/sounders" },
    ],
  },
  {
    name: "Network",
    icon: "📡",
    href: "/category/network",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic26-150x150.png",
    children: [
      { name: "Wireless Routers", href: "/category/network/wireless-routers" },
      { name: "Switches", href: "/category/network/switches" },
    ],
  },
  {
    name: "Intercom",
    icon: "🔊",
    href: "/category/intercom",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic27-150x150.png",
    children: [
      { name: "Intercom", href: "/category/intercom" },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[4]) // Default: KES
  const [isOpen, setIsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"categories" | "menu">("categories")
  const { cart, openCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <header className="w-full shadow">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2 px-4 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm font-medium text-center">
        <p className="mb-2 md:mb-0">
          Make secure payments and confirm your purchase online. Always Buy Genuine Quality Products.
        </p>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/contact" className="bg-white text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
            Contact Us
          </Link>
          <div className="relative">
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center border bg-white text-black px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm cursor-pointer"
            >
              {selectedCurrency.label}
              <Image
                src={selectedCurrency.flag}
                alt={selectedCurrency.code}
                width={18}
                height={12}
                className="ml-1 sm:ml-2"
              />
            </div>
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white border shadow-lg rounded-lg w-72 sm:w-80 p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Select Currency:</span>
                    <button onClick={() => setIsOpen(false)}>
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="space-y-2 text-black">
                    {currencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCurrency(currency)
                          setIsOpen(false)
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="currency"
                            checked={selectedCurrency.code === currency.code}
                            readOnly
                          />
                          {currency.label}
                        </span>
                        <Image
                          src={currency.flag}
                          alt={currency.code}
                          width={18}
                          height={12}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block border-b">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 max-w-7xl mx-auto">
          <Link href="/">
            <Image src="/logo.jpg" alt="Gericom Cameras" width={140} height={55} />
          </Link>
          <div className="flex-1 max-w-lg lg:max-w-2xl mx-4 lg:mx-6">
            <form className="flex border border-gray-300 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search for products"
                className="flex-grow px-3 py-2 text-black outline-none text-sm"
              />
              <button className="px-3 lg:px-4 bg-gray-800 text-white text-sm">Search</button>
            </form>
          </div>
          <div className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium">
            <Link href="/" className="flex items-center">
              <HomeIcon className="h-3"/>
            </Link>
            <Link href="/wishlist" className="flex items-center gap-1">♡</Link>
            <Link href="/account" className="flex items-center gap-1">Login / Register</Link>
            <button
              onClick={openCart}
              className="flex items-center gap-1 bg-black text-white px-2 lg:px-3 py-1 rounded-full"
            >
              🛒 Ksh{total.toFixed(2)}
            </button>
            <CartDrawer />
          </div>
        </div>
        <nav className="bg-white border-t border-b px-4 lg:px-6 py-2 lg:py-3 text-xs lg:text-sm font-medium relative z-30">
          <ul className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="relative group"
                onMouseEnter={() => setOpen(cat.name)}
              >
                <button className="flex items-center gap-1 hover:text-red-600 transition">
                  <span>{cat.icon}</span>
                  {cat.name}
                  <ChevronDown size={12} className="hidden lg:inline" />
                </button>
                {open === cat.name && cat.children && (
                  <ul
                    className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg p-2"
                    onMouseLeave={() => {
                      setOpen(null);
                      setSubOpen(null);
                    }}
                  >
                    {cat.children.map((sub) => (
                      <li
                        key={sub.name}
                        className="relative group/sub"
                        onMouseEnter={() =>
                          sub.children ? setSubOpen(sub.name) : setSubOpen(null)
                        }
                      >
                        <Link
                          href={sub.href}
                          className="flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100 hover:text-red-600 transition"
                        >
                          {sub.name}
                          {sub.children && <ChevronDown size={12} />}
                        </Link>
                        {sub.children && subOpen === sub.name && (
                          <ul className="absolute top-0 left-full ml-2 w-52 bg-white rounded-md shadow-lg p-2"
                            onMouseLeave={() => setSubOpen(null)}
                          >
                            {sub.children.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className="block px-3 py-2 rounded hover:bg-gray-100 hover:text-red-600 transition"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

{/* Mobile Header */}
<div className="flex items-center justify-between p-3 md:hidden">
  <Link href="/">
    <Image src="/logo.jpg" alt="Logo" width={110} height={45} />
  </Link>
  <div className="flex items-center gap-3">
    <button
      onClick={openCart}
      className="relative bg-black text-white text-xs px-3 py-1 rounded-full"
    >
      🛒
      <span className="ml-1">Ksh{total.toFixed(2)}</span>
    </button>
    <CartDrawer />
    <button onClick={() => setMobileOpen(true)}>
      <Menu className="w-6 h-6 text-gray-800" />
    </button>
  </div>
</div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute left-0 top-0 w-72 sm:w-80 h-full bg-white shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-3 border-b">
              <input
                type="text"
                placeholder="Search for products"
                className="border rounded px-2 py-2 flex-grow mr-2 text-xs sm:text-sm"
              />
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex border-b text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 p-2 sm:p-3 font-medium ${activeTab === "categories" ? "border-b-2 border-red-600 text-red-600" : ""}`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 p-2 sm:p-3 font-medium ${activeTab === "menu" ? "border-b-2 border-red-600 text-red-600" : ""}`}
              >
                Menu
              </button>
            </div>
            {activeTab === "categories" && (
              <div className="flex-1 overflow-y-auto">
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        className="w-full flex items-center justify-between px-3 py-2 border-b text-left text-gray-800 text-sm"
                        onClick={() => setOpen(open === cat.name ? null : cat.name)}
                      >
                        <span className="flex items-center gap-2">{cat.icon} {cat.name}</span>
                        {cat.children && <ChevronDown className="w-4 h-4" />}
                      </button>
                      {open === cat.name && cat.children && (
                        <ul className="pl-6 bg-gray-50">
                          {cat.children.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                href={sub.href}
                                className="block px-3 py-2 text-xs sm:text-sm text-gray-700 hover:text-red-600"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "menu" && (
              <ul className="flex-1 overflow-y-auto text-sm">
                <li><Link href="/" className="block px-3 py-2 border-b text-gray-800">Home</Link></li>
                <li><Link href="/wishlist" className="block px-3 py-2 border-b text-gray-800">Wishlist</Link></li>
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
