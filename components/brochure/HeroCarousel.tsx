"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/design-tokens";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const banners = brand.assets.banners;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 7000);
    return () => clearInterval(t);
  }, [banners.length]);

  return (
    <section id="hero" className="relative h-[calc(100vh-120px)] mt-[120px] overflow-hidden">
      {/* Slides */}
      {banners.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Apartamentos Dominica - vista ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${
            i === current ? "opacity-100 animate-zoom-slow" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 hero-overlay-emaar" />

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-400 ${
              i === current ? "w-16 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <p className="absolute bottom-2 right-8 text-white/40 text-[10px] tracking-[0.3em] uppercase">
        Render ilustrativo
      </p>
    </section>
  );
}
