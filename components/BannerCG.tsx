"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/design-tokens";

interface BannerCGProps {
  variant?: "full" | "compact";
  /** Si true, el banner es transparente al inicio y aparece sólido al hacer scroll */
  ghost?: boolean;
}

export function BannerCG({ variant = "full", ghost = true }: BannerCGProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!ghost) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ghost]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        scrolled
          ? "bg-cg-navy/95 backdrop-blur-md shadow-md border-b border-cg-dorado/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo CG */}
        <div className="flex items-center gap-3">
          <div
            className={`border rounded-md px-3 py-1.5 transition-all duration-400 ${
              scrolled
                ? "bg-cg-dorado/10 border-cg-dorado/40"
                : "bg-white/10 backdrop-blur-md border-white/30"
            }`}
          >
            <span
              className={`text-xs italic font-light transition-colors duration-400 ${
                scrolled ? "text-cg-dorado" : "text-white"
              }`}
            >
              [ Logo CG Constructora ]
            </span>
          </div>
          {variant === "full" && scrolled && (
            <div className="hidden sm:block animate-fade-in">
              <p className="text-white text-sm font-semibold tracking-wide">
                {brand.empresa.razonSocial}
              </p>
              <p className="text-cg-dorado text-xs italic">
                {brand.empresa.fraseCorporativa}
              </p>
            </div>
          )}
        </div>

        {/* Co-firma proyecto */}
        <div className="text-right">
          <p
            className={`text-xs font-semibold tracking-[0.25em] uppercase transition-colors duration-400 ${
              scrolled ? "text-cg-dorado" : "text-white/80"
            }`}
          >
            Proyecto
          </p>
          <p
            className={`font-display tracking-wide transition-all duration-400 ${
              scrolled ? "text-white text-base" : "text-white text-lg"
            }`}
          >
            {brand.proyecto.nombreCompleto}
          </p>
        </div>
      </div>
    </header>
  );
}
