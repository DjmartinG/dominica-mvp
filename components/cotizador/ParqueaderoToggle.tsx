"use client";

import { useEffect, useState } from "react";
import { Car, AlertCircle } from "lucide-react";
import { Apto, formatCOP } from "@/lib/cotizador";
import { getParqueaderosDisponibles, Parqueadero } from "@/lib/parqueaderos";

interface Props {
  apto: Apto | null;
  parqueaderoSeleccionado: Parqueadero | null;
  onSelect: (p: Parqueadero) => void;
}

export function ParqueaderoToggle({ apto, parqueaderoSeleccionado, onSelect }: Props) {
  const [disponibles, setDisponibles] = useState<Parqueadero[]>([]);

  useEffect(() => {
    if (!apto) return;
    // Incluye el parqueadero asignado al apto + todos los demás disponibles
    const lista = getParqueaderosDisponibles(apto.parqueadero.numero);
    setDisponibles(lista);
    
    // Si no hay parqueadero seleccionado, asignar el del apto por defecto
    if (!parqueaderoSeleccionado) {
      const asignado: Parqueadero = {
        numero: apto.parqueadero.numero,
        tipo: apto.parqueadero.tipo,
        valor: apto.parqueadero.valor,
        estado: "Disponible",
        aptoAsociado: apto.numero,
      };
      onSelect(asignado);
    }
  }, [apto, parqueaderoSeleccionado, onSelect]);

  if (!apto) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-rojo flex items-center gap-2">
          <Car className="w-4 h-4" />
          Parqueadero asignado
        </label>
        <span className="text-[10px] tracking-[0.2em] uppercase text-rojo bg-rojo/10 px-2 py-1 font-semibold">
          Obligatorio
        </span>
      </div>

      <div className="bg-beige p-4 mb-3 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-rojo flex-shrink-0 mt-0.5" />
        <p className="text-xs text-negro leading-relaxed">
          La normativa exige que cada apartamento incluya parqueadero. Por defecto se asigna el parqueadero del apto, pero puedes cambiarlo a otro número disponible.
        </p>
      </div>

      <select
        value={parqueaderoSeleccionado?.numero || apto.parqueadero.numero}
        onChange={(e) => {
          const p = disponibles.find((x) => x.numero === e.target.value);
          if (p) onSelect(p);
        }}
        className="w-full bg-white border-2 border-gris-muyclaro hover:border-navy px-4 py-3 text-negro font-semibold focus:outline-none focus:border-navy transition-colors text-sm tracking-wide"
      >
        {disponibles.map((p) => (
          <option key={p.numero} value={p.numero}>
            N° {p.numero} · {p.tipo} · {formatCOP(p.valor)}
            {p.numero === apto.parqueadero.numero && " (asignado al apto)"}
          </option>
        ))}
      </select>

      <p className="text-[10px] tracking-[0.15em] uppercase text-gris mt-2 italic">
        {disponibles.length} parqueaderos disponibles en el proyecto
      </p>
    </div>
  );
}
