// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  Menu,
  HomeIcon,
  Shield,
  Flame,
  Radio,
  Mic,
  Camera,
  ShoppingCart,
  Heart,
  LogOut,
  User,
  Search,
} from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/app/CartProvider";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useAdmin } from "@/app/AdminProvider";

const currencies = [
  { code: "USD", symbol: "$", label: "USD, $", flag: "/flags/us.jpeg" },
  { code: "EUR", symbol: "€", label: "EUR, €", flag: "/flags/eu.jpg" },
  { code: "UGX", symbol: "USh", label: "UGX, USh", flag: "/flags/uganda.jpeg" },
  { code: "TZS", symbol: "TSh", label: "TZS, TSh", flag: "/flags/tanzania.jpeg" },
  { code: "KES", symbol: "Ksh", label: "KES, Ksh", flag: "/flags/kenya.jpeg" },
  { code: "ETB", symbol: "Br", label: "ETB, Br", flag: "/flags/ethiopia.jpeg" },
];

type Category = {
  name: string;
  icon?: React.ReactNode;
  href: string;
  image?: string;
  children?: Category[];
};

const categories: Category[] = [
  {
    name: "Surveillance & Security",
    icon: <Camera className="w-4 h-4" />,
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
    icon: <Shield className="w-4 h-4" />,
    href: "/category/anti-theft",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic31-150x150.png",
    children: [{ name: "Anti-Theft Systems", href: "/category/anti-theft" }],
  },
  {
    name: "Fire",
    icon: <Flame className="w-4 h-4" />,
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
    icon: <Radio className="w-4 h-4" />,
    href: "/category/network",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic26-150x150.png",
    children: [
      { name: "Wireless Routers", href: "/category/network/wireless-routers" },
      { name: "Switches", href: "/category/network/switches" },
    ],
  },
  {
    name: "Intercom",
    icon: <Mic className="w-4 h-4" />,
    href: "/category/intercom",
    image: "https://imaxcameras.com/wp-content/uploads/2024/01/ic27-150x150.png",
    children: [{ name: "Intercom", href: "/category/intercom" }],
  },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[4]);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"categories" | "menu">("categories");
  const { cart, openCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const { isSignedIn, user } = useUser();
  const { isAdmin } = useAdmin();

  const username =
    user?.firstName ||
    user?.fullName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <header className="w-full shadow">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2 px-4 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm font-medium text-center">
        <p className="mb-2 md:mb-0">
          Make secure payments and confirm your purchase online. Always Buy Genuine Quality Products.
        </p>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/contact"
            className="bg-white text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold hover:scale-105 transition"
          >
            Contact Us
          </Link>
          <div className="relative">
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center border bg-white text-black px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm cursor-pointer hover:scale-105 transition"
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
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white border shadow-lg rounded-lg w-72 sm:w-80 p-4 relative"
                >
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
                          setSelectedCurrency(currency);
                          setIsOpen(false);
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
                        <Image src={currency.flag} alt={currency.code} width={18} height={12} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={130} height={50} />
        </Link>
        <nav className="flex gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setOpen(category.name)}
              onMouseLeave={() => setOpen(null)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                {category.icon} {category.name}
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {open === category.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 bg-white border shadow-lg rounded-lg w-56 z-20"
                  >
                    <ul className="p-2">
                      {category.children?.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-gray-900">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={openCart} className="relative text-gray-700 hover:text-gray-900">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded">
              {cart.length}
            </span>
          </button>
          <CartDrawer />
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">{username}</span>
              <SignOutButton>
                <LogOut className="w-5 h-5 text-red-600 cursor-pointer" />
              </SignOutButton>
              {isAdmin && (
                <Link href="/admin" className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <Link href="/sign-in" className="text-sm font-medium">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between p-3 md:hidden">
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={110} height={45} />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-800 hover:scale-110 transition">
            <HomeIcon className="w-6 h-6" />
          </Link>
          <button
            onClick={openCart}
            className="relative bg-black text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:scale-105 transition"
          >
            <ShoppingCart className="w-4 h-4" /> <span>Ksh{total.toFixed(2)}</span>
          </button>
          <CartDrawer />
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-6 h-6 text-gray-800 hover:scale-110 transition" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute left-0 top-0 w-72 sm:w-80 h-full bg-white shadow-lg flex flex-col"
            >
              <div className="flex justify-between items-center p-3 border-b">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="border rounded px-2 py-2 flex-grow mr-2 text-xs sm:text-sm"
                />
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-gray-600 hover:rotate-90 transition" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setActiveTab("categories")}
                    className={`flex-1 py-2 text-center font-medium rounded ${
                      activeTab === "categories" ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    Categories
                  </button>
                  <button
                    onClick={() => setActiveTab("menu")}
                    className={`flex-1 py-2 text-center font-medium rounded ${
                      activeTab === "menu" ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    Menu
                  </button>
                </div>

                {activeTab === "categories" ? (
                  <ul>
                    {categories.map((cat) => (
                      <li key={cat.name} className="border-b">
                        <button
                          className="flex items-center justify-between w-full py-2"
                          onClick={() => setSubOpen(subOpen === cat.name ? null : cat.name)}
                        >
                          <span className="flex items-center gap-2">
                            {cat.icon} {cat.name}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              subOpen === cat.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {subOpen === cat.name && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-6 space-y-1"
                            >
                              {cat.children?.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className="block py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="flex items-center gap-2 py-2" onClick={() => setMobileOpen(false)}>
                        <HomeIcon className="w-4 h-4" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="flex items-center gap-2 py-2" onClick={() => setMobileOpen(false)}>
                        <Shield className="w-4 h-4" /> About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="flex items-center gap-2 py-2" onClick={() => setMobileOpen(false)}>
                        <Camera className="w-4 h-4" /> Contact
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
