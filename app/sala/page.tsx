"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { LogoDominica } from "@/components/Logos";
import asesores from "@/data/asesores.json";
import { brand } from "@/lib/design-tokens";
import { ArrowLeft, ChevronRight, User } from "lucide-react";

export default function SalaPage() {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState<string>("");

  const handleStart = () => {
    if (!selectedCode) return;
    // En MVP guardamos el asesor en sessionStorage
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
      <BannerCG />

      <main className="flex-1 bg-gradient-to-br from-crema to-turquesa-light py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-caribe hover:text-caribe-dark mb-6 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          <div className="card-dominica">
            <div className="flex items-center gap-4 mb-6">
              <LogoDominica variant="color" size="md" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-cg-dorado font-semibold">
                  Modo Sala
                </p>
                <h1 className="font-display text-3xl text-caribe">
                  Bienvenido, asesor
                </h1>
              </div>
            </div>

            <p className="text-carbon mb-6">
              Selecciona tu nombre para iniciar el tour con el cliente. Tu información quedará asociada
              automáticamente a la cotización al final del proceso.
            </p>

            {/* Lista de asesores */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold uppercase tracking-widest text-caribe">
                Asesor comercial
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {asesores.map((a) => (
                  <button
                    key={a.codigo}
                    onClick={() => setSelectedCode(a.codigo)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedCode === a.codigo
                        ? "border-caribe bg-caribe text-white shadow-caribe"
                        : "border-turquesa-light bg-white hover:border-caribe/50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedCode === a.codigo ? "bg-white/20" : "bg-turquesa-light"}`}>
                      <User className={`w-5 h-5 ${selectedCode === a.codigo ? "text-white" : "text-caribe"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${selectedCode === a.codigo ? "text-white" : "text-carbon"}`}>
                        {a.nombre}
                      </p>
                      <p className={`text-xs truncate ${selectedCode === a.codigo ? "text-white/80" : "text-carbon/60"}`}>
                        {a.email}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleStart}
              disabled={!selectedCode}
              className="btn-cta w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Iniciar tour con cliente
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Info pie */}
            <p className="text-xs text-carbon/60 text-center mt-4 italic">
              Datos del proyecto: {brand.proyecto.direccion} · {brand.proyecto.estructura}
            </p>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
