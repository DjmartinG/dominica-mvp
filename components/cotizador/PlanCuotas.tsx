"use client";

import { useState } from "react";
import { Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { Cuota, formatCOP, formatDate } from "@/lib/cotizador";

interface Props {
  cuotas: Cuota[];
  valorNeto: number;
}

export function PlanCuotas({ cuotas, valorNeto }: Props) {
  const [expanded, setExpanded] = useState(false);
  const total = cuotas.reduce((s, c) => s + c.valor, 0);
  const cuadra = Math.abs(total - valorNeto) < 100; // tolerancia $100 por redondeo

  if (cuotas.length === 0) return null;

  return (
    <div className="card-dominica !p-0 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full bg-caribe-dark text-white p-4 flex items-center justify-between hover:bg-caribe transition-colors"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-turquesa" />
          <div className="text-left">
            <p className="font-display text-lg">Cronograma de pagos</p>
            <p className="text-turquesa text-xs">{cuotas.length} pagos programados</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-turquesa-light text-caribe-dark">
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
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-crema"}>
                  <td className="p-3 font-bold text-caribe">{c.numero}</td>
                  <td className="p-3 text-carbon">{formatDate(c.fecha)}</td>
                  <td className="p-3 text-carbon">{c.descripcion}</td>
                  <td className="p-3 text-right font-semibold text-carbon">{formatCOP(c.valor)}</td>
                  <td className="p-3 text-right text-carbon/60 hidden sm:table-cell">
                    {formatCOP(c.saldoPendiente)}
                  </td>
                </tr>
              ))}
              <tr className="bg-caribe text-white font-bold">
                <td colSpan={3} className="p-3 text-right">TOTAL</td>
                <td className="p-3 text-right">{formatCOP(total)}</td>
                <td className="p-3 text-right hidden sm:table-cell">
                  {cuadra && <CheckCircle2 className="inline w-4 h-4 text-turquesa" />}
                </td>
              </tr>
            </tbody>
          </table>
          {!cuadra && (
            <p className="p-3 text-xs text-alert bg-alert/10">
              ⚠ Diferencia de redondeo: {formatCOP(total - valorNeto)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
