"use client"
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCart } from "@/app/CartProvider";
import { useWishlist } from "@/app/WishlistProvider";

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

const newArrivals = [
  {
    id: "new1",
    name: "BDCOM S1200-24P2G1S-370 24-Port Unmanaged PoE Switch with SFP and 370W PoE Budget",
    price: 13702.5,
    image: "/products/switch.jpg",
  },
  {
    id: "new2",
    name: "Reolink TrackMix Series G770 Smart WiFi Battery Camera with Auto-Zoom Tracking",
    price: 26547.5,
    image: "/products/reolink-camera.jpg",
  },
  {
    id: "new3",
    name: "Reolink NVS12W 12-Channel Wi-Fi 6 NVR Recorder",
    price: 2610000.0,
    image: "/products/reolink-nvr.jpg",
  },
  {
    id: "new4",
    name: "BDCOM WAP2100-T630B Wi-Fi Broadcast",
    price: 8221.5,
    image: "/products/wap2100.jpg",
  },
  {
    id: "new5",
    name: "BDCOM GSFP-LX-20-D 1.25G SFP Optical Module",
    price: 913.5,
    image: "/products/sfp-module.jpg",
  },
  {
    id: "new6",
    name: "BDCOM S1508D Switch unmanaged 8 ports 1000M TX",
    price: 2479.5,
    image: "/products/s1508d.jpg",
  },
];

const qualityProducts = [
  {
    id: "1",
    name: "4MP Fixed IR Bullet Camera",
    price: 3900,
    image: "/products/quality1.jpg",
  },
  {
    id: "2",
    name: "4MP Fixed Turret Camera",
    price: 3900.0,
    image: "/products/quality2.jpg",
  },
  {
    id: "3",
    name: "4MP Motorized IR Bullet Camera",
    price: 7800.0,
    image: "/products/quality3.jpg",
  },
  {
    id: "4",
    name: "Project：2MP Motorized Starlight IR Bullet Camera",
    price: 9300.0,
    image: "/products/quality4.jpg",
  },
  {
    id: "5",
    name: "4MP Fixed IR Dome Camera",
    price: 4350.0,
    image: "/products/quality5.jpg",
  },
  {
    id: "6",
    name: "5MP Super Starlight Motorized IR Bullet Camera",
    price: 22500.0,
    image: "/products/quality6.jpg",
  },
];


function AutoplayPlugin(interval = 3000) {
  return (slider: KeenSliderInstance) => {
    let timeout: ReturnType<typeof setTimeout>
    let mouseOver = false   

    function clearNextTimeout() {
      clearTimeout(timeout)
    }
    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, interval)
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }
}


export default function ProductGrid() {
const [newSliderRef, newInstance] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 4, spacing: 16 },
      breakpoints: {
        "(max-width: 1280px)": { slides: { perView: 3, spacing: 12 } },
        "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
        "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
      },
    },
    [AutoplayPlugin(3000)]
  )

  const [qualitySliderRef, qualityInstance] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 4, spacing: 16 },
      breakpoints: {
        "(max-width: 1280px)": { slides: { perView: 3, spacing: 12 } },
        "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
        "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
      },
    },
    [AutoplayPlugin(4000)]
  )

  const { addToCart } = useCart();
  const { wishlist, toggleWish } = useWishlist();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl p-4">
        <Card className="relative h-48 sm:h-64 lg:h-80">
          <Image
            src="/hero/security.jpg"
            alt="Stand Alone Security"
            fill
            className="object-cover rounded-2xl"
          />
        </Card>
        <Card className="relative h-48 sm:h-64 lg:h-80">
          <Image
            src="/hero/mobile.jpg"
            alt="Tech-forward Mobile Access"
            fill
            className="object-cover rounded-2xl"
          />
        </Card>
      </div>

{/* New Arrivals */}
<section className="w-full py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">New Arrivals</h2>
    </div>

    {/* Slider container (relative for arrows) */}
    <div className="relative">
      <div ref={newSliderRef} className="keen-slider">
        {newArrivals.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <Card className="relative rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col">
              {/* Wishlist */}
              <button
                onClick={() => toggleWish(product)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  fill={wishlist[product.id] ? "red" : "transparent"}
                  stroke={wishlist[product.id] ? "red" : "gray"}
                />
              </button>

              <CardContent className="p-4 flex flex-col items-center flex-grow">
                <div className="relative w-40 h-28 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  KES {product.price.toLocaleString()}
                </p>
              </CardContent>

              <CardFooter className="p-4">
                <Button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => newInstance.current?.prev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
       <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => newInstance.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
       <ChevronRight className="w-5 h-5 text-gray-700" />

      </button>
    </div>
  </div>
</section>

      {/* Video Section */}
      <section className="relative w-full h-64 sm:h-80 md:h-[500px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/showcase.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>

      {/* High Quality Products */}
<section className="w-full py-12">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">High Quality Products</h2>
    </div>

    {/* Slider container (relative for arrows) */}
    <div className="relative">
      <div ref={qualitySliderRef} className="keen-slider">
        {qualityProducts.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <Card className="relative rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col">
              {/* Wishlist */}
              <button
                onClick={() => toggleWish(product)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                aria-label="Toggle wishlist"
              >
                <Heart
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  fill={wishlist[product.id] ? "red" : "transparent"}
                  stroke={wishlist[product.id] ? "red" : "gray"}
                />
              </button>

              <CardContent className="p-4 flex flex-col items-center flex-grow">
                <div className="relative w-40 h-28 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-center line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-semibold mt-2 text-sm sm:text-base">
                  KES {product.price.toLocaleString()}
                </p>
              </CardContent>

              <CardFooter className="p-4">
                <Button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => qualityInstance.current?.prev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
       <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => qualityInstance.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
       <ChevronRight className="w-5 h-5 text-gray-700" />

      </button>
    </div>
  </div>
</section>

      {/* Brands */}
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center">
                Shopping by brands
              </h2>
              <p className="text-gray-500 text-center mt-2">
                Discover lots of products from popular brands
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 sm:gap-10 mt-10 items-center">
                {mockBrands.map((brand, idx) => (
                  <div key={idx} className="flex justify-center">
                    <Image
                      src={brand}
                      alt="Brand Logo"
                      width={100}
                      height={50}
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
