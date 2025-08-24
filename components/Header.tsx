"use client"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full shadow">
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-4 px-4 flex flex-col md:flex-row items-center justify-between text-sm font-medium">
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
          <div className="flex items-center border bg-white text-black px-3 py-1 rounded-md text-sm">
            KES, Ksh
            <Image src="/kenya-flag.jpeg" alt="KES" width={20} height={14} className="ml-2" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Imax Cameras" width={150} height={60} />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-6">
          <form className="flex border border-gray-300 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products"
              className="flex-grow px-4 py-2 text-black outline-none"
            />
            <button className="px-4 bg-red-600 text-white">Search</button>
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
          <Link href="/login" className="flex items-center gap-1">
            Login / Register
          </Link>
          <Link href="/cart" className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full">
            🛒 Ksh0.00
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-t border-b py-3 px-6 flex flex-wrap justify-center gap-6 text-gray-800 text-sm font-semibold">
        <Link href="/category/surveillance" className="flex items-center gap-2">
          <span>📹</span> Surveillance & Security
        </Link>
        <Link href="/category/anti-theft" className="flex items-center gap-2">
          <span>🛡</span> Anti-Theft Systems
        </Link>
        <Link href="/category/fire" className="flex items-center gap-2">
          <span>🔥</span> Fire
        </Link>
        <Link href="/category/network" className="flex items-center gap-2 border-b-2 border-red-600 pb-1">
          <span>📡</span> Network
        </Link>
        <Link href="/category/power-backup" className="flex items-center gap-2">
          <span>🔋</span> Power Backup
        </Link>
        <Link href="/category/public-address" className="flex items-center gap-2">
          <span>🔊</span> Public Address (P.A)
        </Link>
        <Link href="/category/intercom" className="flex items-center gap-2">
          <span>📞</span> Intercom
        </Link>
      </nav>
    </header>
  )
}