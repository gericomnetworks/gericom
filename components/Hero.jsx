"use client"

import * as React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"

const heroImages = [
  { src: "/hero1.jpg", alt: "Hero Banner 1" },
  { src: "/hero2.png", alt: "Hero Banner 2" },
  { src: "/hero1.jpg", alt: "Hero Banner 3" },
]

export default function Hero() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    duration: 1500,
    drag: true,
    slides: { perView: 1 },
  })

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
          Gericom Links Networks
        </h1>
      </div>
    </section>
  )
}
