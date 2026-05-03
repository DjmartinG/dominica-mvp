"use client";

import { CreditCard, Banknote, Layers } from "lucide-react";
import { PlanPago } from "@/lib/cotizador";

interface Props {
  selected: PlanPago;
  onSelect: (p: PlanPago) => void;
}

const PLANES: { id: PlanPago; label: string; desc: string; icon: typeof CreditCard }[] = [
  {
    id: "Plan 30/70 Estándar",
    label: "Plan 30/70",
    desc: "30% cuota inicial diferida + 70% subrogación",
    icon: CreditCard,
  },
  {
    id: "Plan Contado",
    label: "Contado",
    desc: "Pago 100% en menos de 60 días con descuento",
    icon: Banknote,
  },
  {
    id: "Plan Variable",
    label: "Variable",
    desc: "Cuotas flexibles + extras (primas, cesantías)",
    icon: Layers,
  },
];

export function PlanPagoSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-caribe font-bold mb-3 block">
        Plan de pago
      </label>
      <div className="grid sm:grid-cols-3 gap-3">
        {PLANES.map((p) => {
          const Icon = p.icon;
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                active
                  ? "border-caribe bg-caribe text-white shadow-caribe"
                  : "border-turquesa-light bg-white text-carbon hover:border-caribe/50"
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${active ? "text-turquesa" : "text-caribe"}`} />
              <p className="font-bold mb-1">{p.label}</p>
              <p className={`text-xs ${active ? "text-white/80" : "text-carbon/60"}`}>{p.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
