"use client";

import Link from "next/link";
import { ChevronRight, Home as HomeIcon } from "lucide-react";

interface BreadcrumbsProps {
  items: { href?: string; label: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-gris">
      <Link href="/" className="hover:text-rojo transition-colors flex items-center gap-1.5">
        <HomeIcon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-gris/40" />
          {item.href ? (
            <Link href={item.href} className="hover:text-rojo transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-negro font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
