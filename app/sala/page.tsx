"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavTop } from "@/components/NavTop";
import { FooterDominica } from "@/components/FooterDominica";
import asesores from "@/data/asesores.json";
import { brand } from "@/lib/design-tokens";
import { ArrowLeft, ChevronRight, User } from "lucide-react";

export default function SalaPage() {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string>("");

  const handleStart = () => {
    if (!selectedCode) return;
    if (typeof window !== "undefined") {
      const asesor = asesores.find((a) => a.codigo === selectedCode);
      if (asesor) {
        sessionStorage.setItem("dominica_asesor", JSON.stringify(asesor));
        sessionStorage.setItem("dominica_modo", "sala");
      }
    }
    router.push("/brochure");
  };

  return (
    <>
      <NavTop />

      <main className="bg-beige min-h-screen pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-negro hover:text-rojo mb-8 uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          <div className="bg-white shadow-card p-8 lg:p-12">
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">Modo Sala</p>
              <h1 className="font-display text-3xl lg:text-4xl text-negro tracking-wide mb-3">
                Bienvenido, asesor
              </h1>
              <p className="text-gris text-sm leading-relaxed">
                Selecciona tu nombre para iniciar el tour con el cliente. Tu información quedará asociada a la cotización al final del proceso.
              </p>
            </div>

            <div className="mb-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rojo mb-4">
                Asesor comercial
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {asesores.map((a) => (
                  <button
                    key={a.codigo}
                    onClick={() => setSelectedCode(a.codigo)}
                    className={`flex items-center gap-3 p-4 border transition-all duration-300 text-left ${
                      selectedCode === a.codigo
                        ? "border-navy bg-navy text-white"
                        : "border-gris-muyclaro bg-white hover:border-navy"
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center ${selectedCode === a.codigo ? "bg-white/15" : "bg-beige"}`}>
                      <User className={`w-5 h-5 ${selectedCode === a.codigo ? "text-white" : "text-rojo"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate text-sm ${selectedCode === a.codigo ? "text-white" : "text-negro"}`}>
                        {a.nombre}
                      </p>
                      <p className={`text-[11px] truncate tracking-wider uppercase ${selectedCode === a.codigo ? "text-white/70" : "text-gris"}`}>
                        {a.email}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedCode}
              className="btn-cta w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Iniciar tour con cliente
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] tracking-[0.2em] uppercase text-gris/70 text-center mt-6">
              {brand.proyecto.direccion} · {brand.proyecto.estructura}
            </p>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
