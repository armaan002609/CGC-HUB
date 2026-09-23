"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type HeroBanner = {
  id: string
  title: string | null
  url: string
}

export function HeroSlider({ banners }: { banners: HeroBanner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) {
    return null // Or a fallback placeholder
  }

  return (
    <section className="container mx-auto max-w-[1450px] mt-2 relative overflow-hidden rounded-[2.5rem] bg-black text-white h-[400px] sm:h-[500px]">
      {banners.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image 
            src={img.url} 
            alt={img.title || "Campus Portal"} 
            fill 
            priority={index === 0}
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          {img.title && (
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <h1 className="text-3xl sm:text-5xl font-display font-black leading-tight drop-shadow-xl text-white">
                {img.title}
              </h1>
            </div>
          )}
        </div>
      ))}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
