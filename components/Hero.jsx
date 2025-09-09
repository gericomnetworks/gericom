"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[600px]">
      <Image
        src="/hero1.jpg" // pick your default hero image
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h1 className="text-white text-3xl md:text-6xl font-bold text-center">
          Gericom Links Networks
        </h1>
      </div>
    </section>
  )
}
