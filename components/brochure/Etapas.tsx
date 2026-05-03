import { brand } from "@/lib/design-tokens";
import { CheckCircle2, Clock, Construction, Sparkles, KeyRound } from "lucide-react";

const ETAPAS = [
  { torre: "Torre 1", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada", icon: CheckCircle2 },
  { torre: "Torre 2", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada", icon: CheckCircle2 },
  { torre: "Torre 3", estado: "construccion", fecha: "Entrega 2026", nota: "En obra avanzada", icon: Construction },
  { torre: "Torre 4", estado: "venta", fecha: "Entrega 2028", nota: "En comercialización · 39 disponibles", icon: KeyRound },
  { torre: "Torre 5", estado: "proximamente", fecha: "Próximamente", nota: "Lanzamiento 2027", icon: Sparkles },
];

const ESTADO_LABEL: Record<string, string> = {
  vendido: "Entregada",
  construccion: "En obra",
  venta: "En venta",
  proximamente: "Próx.",
};

const ESTADO_COLOR: Record<string, string> = {
  vendido: "bg-ok",
  construccion: "bg-warn",
  venta: "bg-rojo",
  proximamente: "bg-gris-claro",
};

export function Etapas() {
  return (
    <section id="etapas" className="py-24 lg:py-32 px-6 lg:px-12 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Etapas del Proyecto</p>
          <h2 className="section-title mb-6">5 torres pensadas para crecer contigo</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Plano */}
          <div className="overflow-hidden shadow-card bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.assets.plantaUrbanismo} alt="Planta de urbanismo Dominica" className="w-full h-auto" />
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-negro/15" />

            <div className="space-y-4">
              {ETAPAS.map((e) => {
                const Icon = e.icon;
                const isActive = e.estado === "venta";
                return (
                  <div key={e.torre} className="relative pl-16">
                    <div className={`absolute left-0 top-3 w-12 h-12 rounded-full ${ESTADO_COLOR[e.estado]} flex items-center justify-center shadow-md ring-4 ring-beige ${isActive ? "animate-pulse" : ""}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className={`bg-white p-5 ${isActive ? "border-l-2 border-rojo" : ""}`}>
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="font-display text-2xl text-negro tracking-wide">{e.torre}</h3>
                        <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${e.estado === "venta" ? "text-rojo" : "text-gris"}`}>
                          {ESTADO_LABEL[e.estado]}
                        </span>
                      </div>
                      <p className="text-sm text-gris">{e.nota}</p>
                      <p className="text-[11px] tracking-[0.15em] uppercase text-rojo font-semibold mt-2">{e.fecha}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-gris/60 mt-12">
          * Estado y fechas referenciales · Sujeto a condiciones del fideicomiso y avance de obra
        </p>
      </div>
    </section>
  );
}
