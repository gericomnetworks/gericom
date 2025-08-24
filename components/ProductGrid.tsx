"use client"
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { Heart } from "lucide-react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { useEffect, useState } from "react"

const mockProducts = [
  {
    id: 1,
    name: "BDCOM S1500 Switch Unmanaged 8 ports 1000M TX",
    price: "Ksh.7,875.00",
    image: "/products/switch1.png",
  },
  {
    id: 2,
    name: "BDCOM S1500-24PS 370-24 Port Unmanaged PoE Switch",
    price: "Ksh.71,250.00",
    image: "/products/switch2.png",
  },
  // Add more...
];

const mockBrands = [
  "/brands/honeywell.png",
  "/brands/scottpower.jpeg",
  "/brands/westerndigital.jpg",
  "/brands/ezviz.jpg",
  "/brands/unv.jpg",
  "/brands/bosch.jpg",
  "/brands/hikvision.jpg",
  "/brands/itc.png",
  "/brands/akuvox.jpg",
  "/brands/tiandy.jpg",
  "/brands/longse.jpg",
  "/brands/himax.jpg",
  "/brands/akubela.jpg",
  "/brands/botslab.jpg",
  "/brands/bdcom.jpg",
  "/brands/reolink.jpg",
  "/brands/dahua.jpg",
];

const categoryOffers = [
  "/offers/surveillance.jpg",
  "Intercom",
  "Public Address (P.A)",
  "Fire",
  "Power Backup",
]
const newArrivals = [
  {
    id: 1,
    name: "BDCOM S1200-24P2G1S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    price: "Ksh13,702.50",
    image: "/products/switch.jpg",
  },
  {
    id: 2,
    name: "Reolink TrackMix Series G770 Smart WiFi Battery Camera with Auto-Zoom Tracking",
    price: "Ksh26,547.50",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 3,
    name: "Reolink NVS12W 12-Channel Wi-Fi 6 NVR Recorder",
    price: "Ksh26,100.00",
    image: "/products/reolink-nvr.jpg",
  },
  {
    id: 4,
    name: "BDCOM WAP2100-T630B Wi-Fi Broadcast",
    price: "Ksh8,221.50",
    image: "/products/wap2100.jpg",
  },
  {
    id: 5,
    name: "BDCOM GSFP-LX-20-D 1.25G SFP Optical Module",
    price: "Ksh913.50",
    image: "/products/sfp-module.jpg",
  },
  {
    id: 6,
    name: "BDCOM S1508D Switch unmanaged 8 ports 1000M TX",
    price: "Ksh2,479.50",
    image: "/products/s1508d.jpg",
  },
]

const qualityProducts = [
  {
    id: 1,
    name: "Hikvision DS-2CD2043G0-I 4MP IR Fixed Dome Network Camera",
    price: "Ksh15,000.00",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 2,
    name: "Dahua N52A Series 5MP Starlight HDCVI Bullet Camera",
    price: "Ksh12,500.00",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 3,
    name: "Bosch NBN-73023BA 1080p Indoor Dome Camera",
    price: "Ksh25,000.00",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 4,
    name: "Hikvision DS-2CE16D0T-IT3F 5MP Turbo HD Bullet Camera",
    price: "Ksh8,500.00",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 5,
    name: "Dahua N52A Series 5MP Starlight HDCVI Turret Camera",
    price: "Ksh11,000.00",
    image: "/products/reolink-camera.jpg",
  },
  {
    id: 6,
    name: "Bosch NBN-73023BA 1080p Indoor Dome Camera",
    price: "Ksh25,000.00",
    image: "/products/reolink-camera.jpg",
  },
]
export default function ProductGrid() {
   const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
    },
  })

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl p-4">
        <Card className="relative h-64">
          <Image src="/hero/security.jpg" alt="Stand Alone Security" fill className="object-cover rounded-2xl" />
        </Card>
        <Card className="relative h-64">
          <Image src="/hero/mobile.jpg" alt="Tech-forward Mobile Access" fill className="object-cover rounded-2xl" />
        </Card>
      </div>

      {/* New Arrivals */}
<section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <a href="/products" className="text-red-600 text-sm font-medium underline">
            Explore
          </a>
        </div>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider">
          {newArrivals.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <Card className="relative rounded-xl shadow-sm hover:shadow-md transition h-full">
                {/* Wishlist Icon */}
                <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                </button>

                <CardContent className="p-4 flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={120}
                    className="object-contain mb-4"
                  />
                  <h3 className="text-sm font-medium text-center line-clamp-2">{product.name}</h3>
                  <p className="text-red-600 font-semibold mt-2">{product.price}</p>
                </CardContent>

                <CardFooter className="p-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 rounded-full">
                    Add to Quote
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Video Section */}
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/showcase.mp4" // <-- put your video file in /public/videos/
        autoPlay
        loop
        muted
        playsInline
      />

    </section>
      {/* Category Offers */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl p-4">
        <Card className="p-6 bg-red-100 text-center rounded-2xl">
          <h3 className="text-lg font-semibold">Power Backup</h3>
          <Button variant="secondary" className="mt-3 rounded-xl">Explore</Button>
        </Card>
        <Card className="p-6 bg-red-100 text-center rounded-2xl">
          <h3 className="text-lg font-semibold">Surveillance & Security</h3>
          <Button variant="secondary" className="mt-3 rounded-xl">Explore</Button>
        </Card>
        <Card className="p-6 bg-red-100 text-center rounded-2xl">
          <h3 className="text-lg font-semibold">Intercom</h3>
          <Button variant="secondary" className="mt-3 rounded-xl">Explore</Button>
        </Card>
      </section>

      {/* High Quality Products */}
<section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">High Quality Products</h2>
          <a href="/products" className="text-red-600 text-sm font-medium underline">
            Explore
          </a>
        </div>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider">
          {qualityProducts.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <Card className="relative rounded-xl shadow-sm hover:shadow-md transition h-full">
                {/* Wishlist Icon */}
                <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                </button>

                <CardContent className="p-4 flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={120}
                    className="object-contain mb-4"
                  />
                  <h3 className="text-sm font-medium text-center line-clamp-2">{product.name}</h3>
                  <p className="text-red-600 font-semibold mt-2">{product.price}</p>
                </CardContent>

                <CardFooter className="p-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700 rounded-full">
                    Add to Quote
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>

{/* Brands Section */}

<section className="w-full py-12">
  <div className="max-w-7xl mx-auto px-4">
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-center">Shopping by brands</h2>
        <p className="text-gray-500 text-center mt-2">
          Discover lots products from popular brands
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-10 mt-10 items-center justify-center">
          {mockBrands.map((brand, idx) => (
            <div key={idx} className="flex justify-center">
              <Image
                src={brand}
                alt="Brand Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
</section>
    </div>
  );
}
