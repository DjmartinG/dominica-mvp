"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calculator } from "lucide-react";

export function CTAFloat() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece después de scroll de 600px (ya pasó el hero)
      setVisible(window.scrollY > 600);
      
      // Se oculta cerca del footer (últimos 800px)
      const total = document.body.scrollHeight - window.innerHeight;
      setHidden(window.scrollY > total - 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/cotizar"
      className={`fixed bottom-8 right-8 z-40 group transition-all duration-500 ${
        visible && !hidden ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-navy hover:bg-navy-dark text-white px-6 py-4 shadow-lift flex items-center gap-3 transition-all">
        <Calculator className="w-5 h-5" />
        <div className="text-left">
          <p className="text-[10px] tracking-[0.2em] uppercase text-rojo opacity-80 leading-none mb-1">Comienza ahora</p>
          <p className="text-sm font-semibold tracking-wide">Cotiza tu apartamento</p>
        </div>
        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
