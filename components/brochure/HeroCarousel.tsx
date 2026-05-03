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

      {/* Overlay caribe — más sutil para que se vea la fotografía */}
      <div className="absolute inset-0 bg-gradient-to-b from-caribe/15 via-caribe-dark/35 to-caribe-dark/65" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="mb-6 animate-fade-in-up">
          <LogoDominica variant="white" size="md" />
        </div>

        <h1 className="heading-hero text-white max-w-5xl mb-6 animate-fade-in-up">
          Apartamentos Dominica
        </h1>

        <p className="text-turquesa text-sm md:text-base font-light mb-10 tracking-[0.25em] uppercase animate-fade-in-up">
          Pereira · {brand.proyecto.estructura} · {brand.proyecto.categoria}
        </p>

        <p className="slogan text-white/95 text-lg md:text-2xl max-w-3xl mb-14 leading-relaxed animate-fade-in-up">
          Imagina despertar cada día rodeado de la tranquilidad, el diseño y la frescura de una{" "}
          <em>isla caribeña</em>, sin salir de la ciudad.
        </p>

        <div className="flex items-center gap-3">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-400 ${
                i === current ? "w-16 bg-turquesa" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hint scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-xs uppercase tracking-[0.3em] animate-pulse">
          ↓ Desliza para conocer el proyecto
        </div>
      </div>

      {/* Flechas laterales — más sutiles */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-400"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-400"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
