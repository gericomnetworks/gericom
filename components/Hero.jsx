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
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    drag: true,
    renderMode: "performance",
    slides: { perView: 1 },
  })

  // Autoplay
  React.useEffect(() => {
    if (!instanceRef.current) return
    let timeout
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        instanceRef.current?.next()
      }, 3000) // change slide every 3s
    }

    instanceRef.current.on("created", () => {
      instanceRef.current.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      instanceRef.current.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    instanceRef.current.on("dragStarted", clearNextTimeout)
    instanceRef.current.on("animationEnded", nextTimeout)
    instanceRef.current.on("updated", nextTimeout)
  }, [instanceRef])

  return (
    <section ref={sliderRef} className="keen-slider relative w-full h-[400px] md:h-[600px]">
      {heroImages.map((img, idx) => (
        <div key={idx} className="keen-slider__slide relative w-full h-full">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white text-3xl md:text-6xl font-bold text-center">
              Gericom Links Networks
            </h1>
          </div>
        </div>
      ))}
    </section>
  )
}
