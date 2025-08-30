"use client"

import * as React from "react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[400px]">
<<<<<<< HEAD
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
=======
      <div ref={sliderRef} className="keen-slider h-full">
        {heroImages.map((image, idx) => (
          <div key={idx} className="keen-slider__slide relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <h1 className="text-white text-4xl md:text-6xl font-bold">
                Genuine Gericom Cameras
              </h1>
            </div>
          </div>
        ))}
>>>>>>> 1ac56724e10cb04962cfe469b342da1732b0646c
      </div>
    </section>
  )
}
