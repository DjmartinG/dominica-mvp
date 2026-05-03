"use client";

import { useState } from "react";
import { Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { Cuota, formatCOP, formatDate } from "@/lib/cotizador";

interface Props {
  cuotas: Cuota[];
  valorNeto: number;
}

export function PlanCuotas({ cuotas, valorNeto }: Props) {
  const [expanded, setExpanded] = useState(true);
  const total = cuotas.reduce((s, c) => s + c.valor, 0);
  const cuadra = Math.abs(total - valorNeto) < 100;

  if (cuotas.length === 0) return null;

  return (
    <div className="bg-white border border-gris-muyclaro overflow-hidden">
      {/* Header con fondo claro y texto negro */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-beige border-b border-gris-muyclaro p-5 flex items-center justify-between hover:bg-beige/70 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-rojo" />
          </div>
          <div className="text-left">
            <p className="text-rojo text-[10px] tracking-[0.3em] uppercase font-semibold">Cronograma de pagos</p>
            <p className="font-display text-xl text-negro tracking-wide">{cuotas.length} pagos programados</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-negro transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-beige/50 text-[10px] tracking-[0.15em] uppercase text-gris border-b border-gris-muyclaro">
              <tr>
                <th className="text-left p-3 font-semibold">N°</th>
                <th className="text-left p-3 font-semibold">Fecha</th>
                <th className="text-left p-3 font-semibold">Concepto</th>
                <th className="text-right p-3 font-semibold">Valor</th>
                <th className="text-right p-3 font-semibold hidden sm:table-cell">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {cuotas.map((c, i) => (
                <tr key={i} className={`border-t border-gris-muyclaro ${i % 2 === 0 ? "bg-white" : "bg-beige/20"}`}>
                  <td className="p-3 font-bold text-navy">{c.numero}</td>
                  <td className="p-3 text-negro text-xs">{formatDate(c.fecha)}</td>
                  <td className="p-3 text-negro text-xs">{c.descripcion}</td>
                  <td className="p-3 text-right font-semibold text-negro">{formatCOP(c.valor)}</td>
                  <td className="p-3 text-right text-gris hidden sm:table-cell">{formatCOP(c.saldoPendiente)}</td>
                </tr>
              ))}
              <tr className="bg-navy text-white font-bold">
                <td colSpan={3} className="p-3 text-right text-xs tracking-[0.15em] uppercase">TOTAL</td>
                <td className="p-3 text-right">{formatCOP(total)}</td>
                <td className="p-3 text-right hidden sm:table-cell">
                  {cuadra && <CheckCircle2 className="inline w-4 h-4 text-ok" />}
                </td>
              </tr>
            </tbody>
          </table>
          {!cuadra && (
            <p className="p-3 text-xs text-rojo bg-rojo/10">
              ⚠ Diferencia de redondeo: {formatCOP(total - valorNeto)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
