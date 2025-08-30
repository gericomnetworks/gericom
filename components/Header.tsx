"use client"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, X, Menu } from "lucide-react"

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
  children?: Category[]; // 👈 optional recursive children
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

  return (
    <header className="w-full shadow">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-4 px-4 flex flex-col md:flex-row items-center justify-between text-sm font-medium">
        <p className="text-center">
          You can now register or check your warranty online. Always Buy Genuine Quality Products
        </p>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <Link href="/register-warranty" className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
            Register Warranty
          </Link>
          <Link href="/check-warranty" className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
            Check Warranty
          </Link>
          <div className="relative">
            {/* Current currency */}
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center border bg-white text-black px-3 py-1 rounded-md text-sm cursor-pointer"
            >
              {selectedCurrency.label}
              <Image
                src={selectedCurrency.flag}
                alt={selectedCurrency.code}
                width={20}
                height={14}
                className="ml-2"
              />
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/40">
                <div className="bg-white border shadow-lg rounded-lg w-80 p-4 relative">
                  {/* Close button */}
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
                          width={20}
                          height={14}
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
      { /* Desktop Header */}
      <div className="hidden md:block border-b">
        {/* Main Header */}
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto ">
          {/* Logo */}
          <Link href="/">
<<<<<<< HEAD
            <Image src="/gericom.jpeg" alt="Imax Cameras" width={150} height={60} />
=======
            <Image src="/logo.jpg" alt="Gericom Cameras" width={150} height={60} />
>>>>>>> 1ac56724e10cb04962cfe469b342da1732b0646c
          </Link>
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <form className="flex border border-gray-300 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search for products"
                className="flex-grow px-4 py-2 text-black outline-none"
              />
              <button className="px-4 bg-gray-800 text-white">Search</button>
            </form>
          </div>
          {/* Right Icons */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/compare" className="flex items-center gap-1">
              <span>⇄</span> {/* Replace with an icon */}
            </Link>
            <Link href="/wishlist" className="flex items-center gap-1">
              <span>♡</span>
            </Link>
            <Link href="/account" className="flex items-center gap-1">
              Login / Register
            </Link>
            <Link href="/cart" className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full">
              🛒 Ksh0.00
            </Link>
          </div>
        </div>

        <nav className="bg-white border-b px-6 py-3 text-sm font-medium relative z-50 border-t border-b py-3 px-6 flex flex-wrap justify-center gap-6 text-gray-800 text-sm font-semibold ">
          <ul className="flex gap-8">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="relative group"
                onMouseEnter={() => setOpen(cat.name)}
              >
                <button className="flex items-center gap-1 hover:text-red-600 transition">
                  <span>{cat.icon}</span>
                  {cat.name}
                  <ChevronDown size={14} />
                </button>
                {/* First level dropdown */}
                {open === cat.name && cat.children && (
                  <ul className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg p-2"
                    onMouseLeave={() => {
                      setOpen(null);
                      setSubOpen(null);
                    }}>
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
                        {/* Second level dropdown */}
                        {sub.children && subOpen === sub.name && (
                          <ul className="absolute top-0 left-full ml-2 w-56 bg-white rounded-md shadow-lg p-2"
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
      <div className="flex items-center justify-between p-4 md:hidden">
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={120} height={50} />
        </Link>

        {/* Hamburger */}
        <button onClick={() => setMobileOpen(true)}>
          <Menu className="w-7 h-7 text-gray-800" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="absolute left-0 top-0 w-80 h-full bg-white shadow-lg flex flex-col">
            {/* Header inside drawer */}
            <div className="flex justify-between items-center p-4 border-b">
              <input
                type="text"
                placeholder="Search for products"
                className="border rounded px-3 py-2 flex-grow mr-2 text-sm"
              />
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 p-3 text-sm font-medium ${activeTab === "categories" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 p-3 text-sm font-medium ${activeTab === "menu" ? "border-b-2 border-red-600 text-red-600" : ""
                  }`}
              >
                Menu
              </button>
            </div>

            {/* Categories List */}
            {activeTab === "categories" && (
              <div className="flex-1 overflow-y-auto">
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 border-b text-left text-gray-800"
                        onClick={() => setOpen(open === cat.name ? null : cat.name)}
                      >
                        <span className="flex items-center gap-2">
                          {cat.icon} {cat.name}
                        </span>
                        {cat.children && <ChevronDown className="w-4 h-4" />}
                      </button>
                      {open === cat.name && cat.children && (
                        <ul className="pl-8 bg-gray-50">
                          {cat.children.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:text-red-600"
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

            {/* Menu List */}
            {activeTab === "menu" && (
              <ul className="flex-1 overflow-y-auto">
                <li>
                  <Link href="/" className="block px-4 py-3 border-b text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/check-warranty" className="block px-4 py-3 border-b text-gray-800">
                    Check Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/register-warranty" className="block px-4 py-3 border-b text-gray-800">
                    Register Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="block px-4 py-3 border-b text-gray-800">
                    Shop
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

    </header>
  )
}