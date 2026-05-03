"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavTop } from "@/components/NavTop";
import { TopBar } from "@/components/TopBar";
import { FooterDominica } from "@/components/FooterDominica";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import asesores from "@/data/asesores.json";
import { brand } from "@/lib/design-tokens";
import { ChevronRight, User } from "lucide-react";

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
      <TopBar />
      <NavTop />

      <main className="bg-beige min-h-screen pt-[140px] pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: "Modo Sala" }]} />
          </div>

          <div className="bg-white shadow-card p-8 lg:p-12">
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">Modo Sala</p>
              <h1 className="font-display text-3xl lg:text-4xl text-negro tracking-wide mb-3">
                Bienvenido, asesor
              </h1>
              <p className="text-gris text-sm leading-relaxed max-w-md mx-auto">
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-[10px] tracking-[0.2em] uppercase text-gris/70">
              <span>{brand.proyecto.direccion}</span>
              <span className="hidden sm:inline">·</span>
              <span>{brand.proyecto.estructura}</span>
            </div>
          </div>

          {/* Info adicional para asesores */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 border border-gris-muyclaro">
              <p className="font-display text-2xl text-rojo">39</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gris mt-1">Disponibles T4</p>
            </div>
            <div className="bg-white p-4 border border-gris-muyclaro">
              <p className="font-display text-2xl text-rojo">10</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gris mt-1">Tipologías</p>
            </div>
            <div className="bg-white p-4 border border-gris-muyclaro">
              <p className="font-display text-2xl text-rojo">3</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gris mt-1">Planes pago</p>
            </div>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
