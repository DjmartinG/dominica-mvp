import { brand } from "@/lib/design-tokens";
import { CheckCircle2, Clock, Construction } from "lucide-react";

const ETAPAS = [
  { torre: "Torre 1", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada" },
  { torre: "Torre 2", estado: "vendido", fecha: "Entregada", nota: "100% vendida y entregada" },
  { torre: "Torre 3", estado: "construccion", fecha: "Entrega 2026", nota: "En obra avanzada" },
  { torre: "Torre 4", estado: "venta", fecha: "Entrega 2028", nota: "En comercialización · 39 disponibles" },
  { torre: "Torre 5", estado: "proximamente", fecha: "Próximamente", nota: "Lanzamiento 2027" },
];

const ESTADO_CONFIG = {
  vendido: { color: "bg-ok/10 text-ok border-ok/30", icon: CheckCircle2, label: "Entregada" },
  construccion: { color: "bg-warn/10 text-warn border-warn/30", icon: Construction, label: "En obra" },
  venta: { color: "bg-cielo/10 text-cielo border-cielo/30", icon: Construction, label: "En venta" },
  proximamente: { color: "bg-carbon/10 text-carbon border-carbon/30", icon: Clock, label: "Próx." },
};

export function Etapas() {
  return (
    <section id="etapas" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cg-dorado uppercase tracking-widest text-sm font-semibold mb-3">
            Etapas del Proyecto
          </p>
          <h2 className="font-display text-h1 text-caribe mb-3">
            5 torres pensadas para crecer contigo
          </h2>
          <div className="w-24 h-1 bg-turquesa mx-auto mb-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Plano urbanismo */}
          <div className="rounded-3xl overflow-hidden shadow-caribe bg-turquesa-light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.plantaUrbanismo}
              alt="Planta de urbanismo Dominica"
              className="w-full h-auto"
            />
          </div>

          {/* Lista torres */}
          <div className="space-y-3">
            {ETAPAS.map((e) => {
              const cfg = ESTADO_CONFIG[e.estado as keyof typeof ESTADO_CONFIG];
              const Icon = cfg.icon;
              return (
                <div
                  key={e.torre}
                  className={`card-dominica !p-4 flex items-center gap-4 border-l-4 ${
                    e.estado === "venta" ? "border-cielo bg-cielo/5" : "border-transparent"
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${cfg.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="font-display text-caribe text-lg">{e.torre}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-carbon">{e.nota}</p>
                    <p className="text-xs text-carbon/60">{e.fecha}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-carbon/50 italic mt-8">
          * Estado y fechas referenciales. Sujeto a las condiciones del fideicomiso y avance de
          obra.
        </p>
      </div>
    </section>
  );
}
