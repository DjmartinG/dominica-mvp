"use client";

import { Car } from "lucide-react";
import { Apto, formatCOP } from "@/lib/cotizador";

interface Props {
  apto: Apto | null;
  incluido: boolean;
  onToggle: (v: boolean) => void;
}

export function ParqueaderoToggle({ apto, incluido, onToggle }: Props) {
  if (!apto) return null;

  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-caribe font-bold mb-2 flex items-center gap-2">
        <Car className="w-4 h-4" />
        Parqueadero asignado
      </label>
      <div className="flex gap-3">
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
            incluido
              ? "border-caribe bg-caribe text-white"
              : "border-turquesa-light bg-white text-carbon hover:border-caribe/50"
          }`}
        >
          <p className="font-bold text-sm">Sí, incluir</p>
          <p className={`text-xs mt-1 ${incluido ? "text-turquesa" : "text-carbon/60"}`}>
            N° {apto.parqueadero.numero} · {apto.parqueadero.tipo}
          </p>
          <p className={`text-xs mt-1 font-semibold ${incluido ? "text-white" : "text-caribe"}`}>
            {formatCOP(apto.parqueadero.valor)}
          </p>
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 p-4 rounded-xl border-2 transition-all text-left ${
            !incluido
              ? "border-caribe bg-caribe text-white"
              : "border-turquesa-light bg-white text-carbon hover:border-caribe/50"
          }`}
        >
          <p className="font-bold text-sm">No incluir</p>
          <p className={`text-xs mt-1 ${!incluido ? "text-turquesa" : "text-carbon/60"}`}>
            Sin parqueadero
          </p>
          <p className={`text-xs mt-1 font-semibold ${!incluido ? "text-white" : "text-caribe"}`}>
            $ 0
          </p>
        </button>
      </div>
    </div>
  );
}
