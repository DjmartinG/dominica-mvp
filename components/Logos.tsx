"use client";

import { brand } from "@/lib/design-tokens";

interface LogoDominicaProps {
  variant?: "white" | "color";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-8",
  md: "h-12",
  lg: "h-16",
  xl: "h-24",
};

/**
 * Logo Dominica — usa la versión blanca oficial sobre fondos oscuros
 * y un placeholder elegante sobre fondos claros (esperando logo color).
 */
export function LogoDominica({ variant = "white", size = "md", className = "" }: LogoDominicaProps) {
  if (variant === "white") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={brand.assets.logoDominicaBlanco}
        alt="Apartamentos Dominica"
        className={`${SIZE_MAP[size]} w-auto object-contain ${className}`}
      />
    );
  }
  
  // Variant color — placeholder hasta que tengamos el logo color
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`${SIZE_MAP[size]} aspect-square bg-caribe rounded-full flex items-center justify-center`}>
        <span className="text-white font-display text-xl">D</span>
      </div>
      <span className="font-display text-caribe text-2xl tracking-wide">
        Dominica
      </span>
    </div>
  );
}

/**
 * Logo CG — placeholder elegante.
 */
export function LogoCG({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className={`${SIZE_MAP[size]} aspect-square bg-cg-navy border-2 border-cg-dorado rounded-md flex items-center justify-center`}>
        <span className="text-cg-dorado font-bold text-lg tracking-tighter">CG</span>
      </div>
    </div>
  );
}
