"use client";

import { ChevronDown, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Asesor {
  codigo: string;
  nombre: string;
  email: string;
}

export function TopBar() {
  const [asesor, setAsesor] = useState<Asesor | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("dominica_asesor");
    if (saved) {
      try { setAsesor(JSON.parse(saved)); } catch {}
    }
  }, []);

  const cerrarSala = () => {
    sessionStorage.removeItem("dominica_asesor");
    sessionStorage.removeItem("dominica_modo");
    setAsesor(null);
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-beige border-b border-gris-muyclaro h-10 flex items-center px-6 lg:px-12">
      <div className="w-full flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-gris">
        {/* Endorsement izquierdo o badge sala */}
        {asesor ? (
          <div className="flex items-center gap-3 bg-navy text-white px-3 py-1 -ml-2">
            <User className="w-3 h-3 text-rojo" />
            <span className="text-[10px] tracking-[0.2em] font-semibold">
              MODO SALA · ASESOR: <span className="text-rojo">{asesor.nombre}</span>
            </span>
            <button
              onClick={cerrarSala}
              className="ml-1 hover:bg-white/10 p-1 transition-colors"
              title="Cerrar sesión Modo Sala"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">Gerencia y Comercializa</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/cg-logo.png"
                alt="CG Constructora"
                className="h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>

            <span className="hidden md:inline text-gris/40">·</span>

            <div className="hidden md:flex items-center gap-2">
              <span>Construye</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/triple-a-logo.png"
                alt="Triple A Constructora"
                className="h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        )}

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
