"use client";

import { CreditCard, Banknote } from "lucide-react";
import { PlanPago } from "@/lib/cotizador";

interface Props {
  selected: PlanPago;
  onSelect: (p: PlanPago) => void;
}

const PLANES: { id: PlanPago; label: string; desc: string; icon: typeof CreditCard; tag?: string }[] = [
  {
    id: "Plan 30/70 Estándar",
    label: "Plan 30/70",
    desc: "30% cuota inicial diferida en cuotas mensuales + 70% subrogación con crédito hipotecario.",
    icon: CreditCard,
    tag: "Más común",
  },
  {
    id: "Plan Contado",
    label: "Contado",
    desc: "Pago 100% en menos de 60 días. Aplica descuento preferencial por pago contado.",
    icon: Banknote,
    tag: "Con descuento",
  },
];

export function PlanPagoSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-rojo mb-4 block">
        Plan de pago
      </label>
      <div className="grid sm:grid-cols-2 gap-3">
        {PLANES.map((p) => {
          const Icon = p.icon;
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`relative p-5 border-2 transition-all text-left ${
                active
                  ? "border-navy bg-navy text-white"
                  : "border-gris-muyclaro bg-white text-negro hover:border-navy/50"
              }`}
            >
              {p.tag && (
                <span className={`absolute -top-2 left-3 text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 ${
                  active ? "bg-rojo text-white" : "bg-rojo text-white"
                }`}>
                  {p.tag}
                </span>
              )}
              <Icon className={`w-7 h-7 mb-3 ${active ? "text-rojo" : "text-navy"}`} />
              <p className="font-display text-xl mb-2 tracking-wide">{p.label}</p>
              <p className={`text-xs leading-relaxed ${active ? "text-white/80" : "text-gris"}`}>{p.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
