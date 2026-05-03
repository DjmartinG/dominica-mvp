import { brand } from "@/lib/design-tokens";
import { CheckCircle2, Clock, Construction, Sparkles, KeyRound } from "lucide-react";

const ETAPAS = [
  { torre: "Torre 1", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada", icon: CheckCircle2 },
  { torre: "Torre 2", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada", icon: CheckCircle2 },
  { torre: "Torre 3", estado: "construccion", fecha: "Entrega 2026", nota: "En obra avanzada", icon: Construction },
  { torre: "Torre 4", estado: "venta", fecha: "Entrega 2028", nota: "En comercialización · 39 disponibles", icon: KeyRound },
  { torre: "Torre 5", estado: "proximamente", fecha: "Próximamente", nota: "Lanzamiento 2027", icon: Sparkles },
];

const ESTADO_CONFIG = {
  vendido: { color: "bg-ok/10 text-ok border-ok/30", label: "Entregada", dotBg: "bg-ok" },
  construccion: { color: "bg-warn/10 text-warn border-warn/30", label: "En obra", dotBg: "bg-warn" },
  venta: { color: "bg-cielo/10 text-cielo border-cielo/30", label: "En venta", dotBg: "bg-cielo" },
  proximamente: { color: "bg-carbon/10 text-carbon/70 border-carbon/30", label: "Próx.", dotBg: "bg-carbon/40" },
};

export function Etapas() {
  return (
    <section id="etapas" className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cg-dorado uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            ─── Etapas del Proyecto ───
          </p>
          <h2 className="font-display text-h1 text-caribe mb-4">
            5 torres pensadas para crecer contigo
          </h2>
          <div className="w-16 h-px bg-cg-dorado mx-auto mb-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Plano urbanismo */}
          <div className="rounded-3xl overflow-hidden shadow-caribe bg-turquesa-light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.plantaUrbanismo}
              alt="Planta de urbanismo Dominica"
              className="w-full h-auto"
            />
          </div>

          {/* Timeline vertical visual */}
          <div className="relative">
            {/* Línea vertical decorativa */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-cg-dorado via-turquesa to-cg-dorado/30" />

            <div className="space-y-5">
              {ETAPAS.map((e, idx) => {
                const cfg = ESTADO_CONFIG[e.estado as keyof typeof ESTADO_CONFIG];
                const Icon = e.icon;
                const isActive = e.estado === "venta";
                return (
                  <div
                    key={e.torre}
                    className="relative pl-16 group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {/* Dot circular en línea */}
                    <div className={`absolute left-0 top-3 w-12 h-12 rounded-full ${cfg.dotBg} flex items-center justify-center shadow-md ring-4 ring-white ${isActive ? "animate-pulse" : ""}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Card */}
                    <div className={`card-dominica !p-5 ${isActive ? "border-2 border-cielo bg-cielo/5" : ""}`}>
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="font-display text-caribe text-2xl">{e.torre}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-carbon">{e.nota}</p>
                      <p className="text-xs text-cg-dorado font-semibold mt-1 tracking-wide">{e.fecha}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-carbon/50 italic mt-12">
          * Estado y fechas referenciales. Sujeto a las condiciones del fideicomiso y avance de obra.
        </p>
      </div>
    </section>
  );
}
