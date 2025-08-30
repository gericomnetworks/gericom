"use client"

import * as React from "react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[400px]">
      <Image
        src="/hero1.jpg"
        alt="Hero Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Gericom Networks
        </h1>
      </div>
    </section>
  )
}
