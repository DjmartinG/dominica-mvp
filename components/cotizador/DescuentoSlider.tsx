"use client";

import { Percent } from "lucide-react";
import { formatPct } from "@/lib/cotizador";

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function DescuentoSlider({ value, onChange }: Props) {
  const max = 0.05;
  const step = 0.005;

  const colorByValue = value === 0 ? "carbon" : value <= 0.03 ? "ok" : value <= 0.05 ? "warn" : "alert";
  const colorClass = {
    carbon: "text-carbon",
    ok: "text-ok",
    warn: "text-warn",
    alert: "text-alert",
  }[colorByValue];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs uppercase tracking-widest text-caribe font-bold flex items-center gap-2">
          <Percent className="w-4 h-4" />
          Descuento aplicado
        </label>
        <span className={`font-display text-2xl ${colorClass}`}>{formatPct(value)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-turquesa-light rounded-lg appearance-none cursor-pointer accent-caribe"
      />
      <div className="flex justify-between text-xs text-carbon/60 mt-1">
        <span>0%</span>
        <span className="text-ok">3% libre</span>
        <span className="text-warn">5% requiere aprobación</span>
      </div>
    </div>
  );
}
