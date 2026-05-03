"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";

export function CTAFlotante() {
  return (
    <Link
      href="/cotizar"
      className="fixed bottom-6 left-6 z-30 btn-cta shadow-2xl !py-3 !px-5 group"
    >
      <Calculator className="w-5 h-5" />
      <span className="hidden sm:inline">Cotizar mi apartamento</span>
      <span className="sm:hidden">Cotizar</span>
    </Link>
  );
}
