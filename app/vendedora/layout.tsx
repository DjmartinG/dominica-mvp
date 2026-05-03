"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAsesora } from "@/lib/useAsesora";
import { LayoutDashboard, FileText, Building2, LogOut, Menu, X, ExternalLink } from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/vendedora/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendedora/cotizaciones", label: "Mis Cotizaciones", icon: FileText },
  { href: "/vendedora/inventario", label: "Inventario", icon: Building2 },
];

export default function VendedoraLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { asesora, loading, logout } = useAsesora(false);
  const [open, setOpen] = useState(false);
  
  const isLogin = pathname === "/vendedora";

  if (isLogin) return <>{children}</>;
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <p className="text-gris text-sm tracking-widest uppercase">Cargando...</p>
      </div>
    );
  }
  
  if (!asesora) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <Link href="/vendedora" className="text-gris hover:text-rojo text-sm tracking-widest uppercase">
          Sesión expirada · Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-beige">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-navy text-white flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo top */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/dominica-logo.png"
              alt="Dominica"
              className="h-10 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <p className="text-[10px] tracking-[0.3em] uppercase text-rojo font-semibold mt-3">
            Panel Asesora
          </p>
        </div>

        {/* Asesora info */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rojo flex items-center justify-center font-display text-xl font-semibold">
              {asesora.nombre.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{asesora.nombre}</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 truncate">{asesora.codigo}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-white border-l-2 border-rojo"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="tracking-wide">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/cotizar"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-rojo transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="tracking-wide">Crear cotización</span>
          </Link>
          <Link
            href="/brochure"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-rojo transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="tracking-wide">Ver brochure</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-rojo transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="tracking-wide">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} className="lg:hidden fixed inset-0 bg-black/50 z-30" />}

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-navy text-white p-2 shadow-lift"
        aria-label="Menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
