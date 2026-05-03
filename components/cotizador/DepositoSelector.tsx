"use client";

import { Package } from "lucide-react";
import depositos from "@/data/depositos.json";
import { Deposito, formatArea, formatCOP } from "@/lib/cotizador";

interface Props {
  selected: Deposito;
  onSelect: (d: Deposito) => void;
}

export function DepositoSelector({ selected, onSelect }: Props) {
  const items = (depositos as Deposito[]).filter(
    (d) => d.estado === "Disponible" || d.id === "sin"
  );

  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-navy font-bold mb-2 flex items-center gap-2">
        <Package className="w-4 h-4" />
        Depósito (opcional)
      </label>
      <select
        value={selected.id}
        onChange={(e) => {
          const d = items.find((x) => x.id === e.target.value);
          if (d) onSelect(d);
        }}
        className="w-full bg-white border-2 border-gris-muyclaro px-4 py-3 text-negro font-semibold focus:outline-none focus:border-navy transition-colors"
      >
        {items.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nombre}
            {d.id !== "sin" && ` — ${formatArea(d.area)} · ${formatCOP(d.valor)}`}
          </option>
        ))}
      </select>
    </div>
  );
}
