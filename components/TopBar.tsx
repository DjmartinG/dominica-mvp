"use client";

import { ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-beige border-b border-gris-muyclaro h-10 flex items-center px-6 lg:px-12">
      <div className="w-full flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-gris">
        {/* Endorsement izquierdo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Gerencia y Comercializa</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/cg-logo.png"
              alt="CG Constructora"
              className="h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const sibling = (e.target as HTMLImageElement).nextElementSibling;
                if (sibling) (sibling as HTMLElement).style.display = "inline";
              }}
            />
            <span style={{ display: "none" }} className="font-semibold text-negro">CG CONSTRUCTORA</span>
          </div>

          <span className="hidden md:inline text-gris/40">·</span>

          <div className="hidden md:flex items-center gap-2">
            <span>Construye</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/triple-a-logo.png"
              alt="Triple A Constructora"
              className="h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const sibling = (e.target as HTMLImageElement).nextElementSibling;
                if (sibling) (sibling as HTMLElement).style.display = "inline";
              }}
            />
            <span style={{ display: "none" }} className="font-semibold text-negro">TRIPLE A</span>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1 cursor-pointer hover:text-negro transition-colors">
            ESP <ChevronDown className="w-3 h-3" />
          </span>
          <span className="hidden lg:inline text-gris/50">+57 318 307 5080</span>
        </div>
      </div>
    </div>
  );
}
