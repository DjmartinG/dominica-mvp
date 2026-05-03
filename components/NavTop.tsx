"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Video } from "lucide-react";

const NAV_LINKS = [
  { href: "/brochure#proyecto", label: "El Proyecto" },
  { href: "/brochure#tipologias", label: "Tipologías" },
  { href: "/brochure#ubicacion", label: "Ubicación" },
  { href: "/brochure#amenidades", label: "Amenidades" },
  { href: "/brochure#recorrido", label: "Recorrido 360°" },
];

export function NavTop() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-10 left-0 right-0 z-50 bg-white border-b border-gris-muyclaro h-20 flex items-center px-6 lg:px-12">
      <div className="w-full flex items-center justify-between">
        {/* Logo Dominica DOMINANTE */}
        <Link href="/" className="block hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/dominica-logo.png"
            alt="Apartamentos Dominica"
            className="h-12 lg:h-14 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const sibling = (e.target as HTMLImageElement).nextElementSibling;
              if (sibling) (sibling as HTMLElement).style.display = "block";
            }}
          />
          <span style={{ display: "none" }} className="font-display text-3xl font-bold text-rojo tracking-[0.15em]">
            DOMINICA
          </span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-negro tracking-[0.15em] uppercase hover:text-rojo transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 lg:gap-5">
          <a
            href="https://kuula.co/share/collection/7bPrg"
            target="_blank"
            rel="noopener noreferrer"
            title="Recorrido 360°"
            className="hidden sm:flex w-10 h-10 items-center justify-center text-negro hover:text-rojo transition-colors"
          >
            <Video className="w-5 h-5" />
          </a>

          <a
            href="https://wa.me/573183075080"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="hidden sm:flex w-10 h-10 items-center justify-center text-negro hover:text-rojo transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
            </svg>
          </a>

          <Link href="/cotizar" className="btn-cta !px-5 !py-3 lg:!px-7 lg:!py-4 text-[10px] lg:text-xs">
            Cotiza ahora
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-negro"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 flex flex-col p-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-negro py-3 border-b border-gris-muyclaro"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
