"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/design-tokens";
import { LogoDominica } from "@/components/Logos";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const banners = brand.assets.banners;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % banners.length), 6000);
    return () => clearInterval(t);
  }, [banners.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {banners.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Apartamentos Dominica - vista ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay caribe */}
      <div className="absolute inset-0 bg-gradient-to-b from-caribe/50 via-caribe-dark/50 to-caribe-dark/85" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="mb-8 animate-fade-in-up">
          <LogoDominica variant="white" size="xl" />
        </div>

        <h1 className="heading-hero text-white max-w-5xl mb-4 animate-fade-in-up">
          Apartamentos Dominica
        </h1>

        <p className="text-turquesa text-xl md:text-2xl font-light mb-8 tracking-wide animate-fade-in-up">
          Pereira · {brand.proyecto.estructura} · {brand.proyecto.categoria}
        </p>

        <p className="slogan text-white/90 text-lg md:text-2xl max-w-3xl mb-12 leading-relaxed italic animate-fade-in-up">
          &ldquo;{brand.copy.sloganOficial}&rdquo;
        </p>

        <div className="flex items-center gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-12 bg-turquesa" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hint scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm uppercase tracking-widest animate-pulse">
          ↓ Desliza para conocer el proyecto
        </div>
      </div>

      {/* Flechas laterales */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur p-3 rounded-full text-white transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur p-3 rounded-full text-white transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
