"use client"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] bg-gray-900">
      <Image
        src="/hero1.jpg" // save your hero background into /public
        alt="Hero Banner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Genuine Imax Cameras
        </h1>
      </div>
    </section>
  )
}