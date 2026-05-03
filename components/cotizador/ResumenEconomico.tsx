"use client";

import { Calculator, TrendingDown, Wallet, Calendar } from "lucide-react";
import { Apto, Deposito, PlanPago, formatCOP, formatPct, calcularSubtotal, calcularValorNeto, calcularCuotaInicial } from "@/lib/cotizador";
import reglas from "@/data/reglas-comerciales.json";

interface Props {
  apto: Apto | null;
  conParqueadero: boolean;
  deposito: Deposito;
  plan: PlanPago;
  descuento: number;
}

export function ResumenEconomico({ apto, conParqueadero, deposito, plan, descuento }: Props) {
  if (!apto) {
    return (
      <div className="bg-beige p-12 text-center">
        <Calculator className="w-12 h-12 text-rojo mx-auto mb-3" />
        <p className="text-gris text-sm tracking-wide">Selecciona un apartamento para ver el resumen económico</p>
      </div>
    );
  }

  const subtotal = calcularSubtotal(apto, conParqueadero, deposito);
  const { valorDescuento, valorNeto } = calcularValorNeto(subtotal, descuento);
  const { cuotaInicial, cuotaInicialPct, saldoSubrogacion } = calcularCuotaInicial(valorNeto, plan);
  const numCuotas = plan === "Plan Contado" ? 0 : reglas.numCuotasEstandar;
  const cuotaMensual = plan === "Plan Contado" ? 0 : Math.round((cuotaInicial - reglas.separacionMinima) / numCuotas);

  return (
    <div className="bg-white shadow-card sticky top-24">
      <div className="bg-navy text-white p-6">
        <p className="eyebrow !text-white/70 mb-2">Resumen económico</p>
        <h3 className="font-display text-2xl tracking-wide">Tu inversión</h3>
      </div>

      <div className="p-6 space-y-5">
        {/* Detalle */}
        <div className="space-y-2 pb-4 border-b border-gris-muyclaro">
          <div className="flex justify-between text-sm">
            <span className="text-gris">Apto {apto.numero} ({apto.tipologia})</span>
            <span className="font-semibold text-negro">{formatCOP(apto.valorApartamento)}</span>
          </div>
          {conParqueadero && (
            <div className="flex justify-between text-sm">
              <span className="text-gris">Parqueadero {apto.parqueadero.numero}</span>
              <span className="font-semibold text-negro">{formatCOP(apto.parqueadero.valor)}</span>
            </div>
          )}
          {deposito.id !== "sin" && (
            <div className="flex justify-between text-sm">
              <span className="text-gris">Depósito {deposito.nombre}</span>
              <span className="font-semibold text-negro">{formatCOP(deposito.valor)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-3 border-t border-gris-muyclaro">
            <span className="font-semibold text-negro">Subtotal listado</span>
            <span className="font-bold text-negro">{formatCOP(subtotal)}</span>
          </div>
          {descuento > 0 && (
            <div className="flex justify-between text-sm text-rojo">
              <span className="font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Descuento ({formatPct(descuento)})
              </span>
              <span className="font-bold">{formatCOP(valorDescuento)}</span>
            </div>
          )}
        </div>

        {/* TOTAL — Number statement Emaar */}
        <div className="bg-navy p-6 text-white">
          <p className="text-rojo text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">
            Valor total negocio
          </p>
          <p className="font-display text-4xl lg:text-5xl leading-none mb-2 tracking-wide">
            {formatCOP(valorNeto)}
          </p>
          <p className="text-white/60 text-[11px] tracking-[0.15em] uppercase">
            ≈ {formatCOP(Math.round(valorNeto / apto.areaVendible))} / m²
          </p>
        </div>

        {/* Plan elegido */}
        <div className="bg-beige p-5 space-y-2">
          <p className="text-[11px] tracking-[0.2em] uppercase text-rojo font-semibold flex items-center gap-2 mb-3">
            <Wallet className="w-3 h-3" />
            {plan}
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-negro">Cuota inicial ({formatPct(cuotaInicialPct)})</span>
            <span className="font-bold text-negro">{formatCOP(cuotaInicial)}</span>
          </div>
          {plan !== "Plan Contado" && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-negro">{numCuotas} cuotas mensuales de</span>
                <span className="font-bold text-negro">{formatCOP(cuotaMensual)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-negro/15">
                <span className="text-negro font-semibold">Subrogación final</span>
                <span className="font-bold text-negro">{formatCOP(saldoSubrogacion)}</span>
              </div>
            </>
          )}
        </div>

        {/* Fechas clave */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-beige p-3">
            <p className="text-gris mb-1 flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase">
              <Calendar className="w-3 h-3" /> Separación
            </p>
            <p className="font-semibold text-negro">31 May 2026</p>
          </div>
          <div className="bg-beige p-3">
            <p className="text-gris mb-1 flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase">
              <Calendar className="w-3 h-3" /> Entrega
            </p>
            <p className="font-semibold text-negro">30 Jul 2028</p>
          </div>
        </div>
      </div>
    </div>
  );
}
