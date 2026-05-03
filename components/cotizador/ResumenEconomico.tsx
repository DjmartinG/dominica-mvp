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
      <div className="card-dominica text-center py-16">
        <Calculator className="w-12 h-12 text-turquesa mx-auto mb-3" />
        <p className="text-carbon/60">Selecciona un apartamento para ver el resumen económico</p>
      </div>
    );
  }

  const subtotal = calcularSubtotal(apto, conParqueadero, deposito);
  const { valorDescuento, valorNeto } = calcularValorNeto(subtotal, descuento);
  const { cuotaInicial, cuotaInicialPct, saldoSubrogacion } = calcularCuotaInicial(valorNeto, plan);
  const numCuotas = plan === "Plan Contado" ? 0 : reglas.numCuotasEstandar;
  const cuotaMensual = plan === "Plan Contado" ? 0 : Math.round((cuotaInicial - reglas.separacionMinima) / numCuotas);

  return (
    <div className="card-dominica !p-0 overflow-hidden sticky top-24">
      <div className="bg-caribe text-white p-5">
        <p className="text-turquesa text-xs uppercase tracking-[0.3em] font-semibold mb-1">
          Resumen económico
        </p>
        <h3 className="font-display text-2xl">Tu inversión</h3>
      </div>

      <div className="p-5 space-y-4">
        {/* Detalle */}
        <div className="space-y-2 pb-4 border-b border-turquesa-light">
          <div className="flex justify-between text-sm">
            <span className="text-carbon/70">Apto {apto.numero} ({apto.tipologia})</span>
            <span className="font-semibold text-carbon">{formatCOP(apto.valorApartamento)}</span>
          </div>
          {conParqueadero && (
            <div className="flex justify-between text-sm">
              <span className="text-carbon/70">Parqueadero {apto.parqueadero.numero}</span>
              <span className="font-semibold text-carbon">{formatCOP(apto.parqueadero.valor)}</span>
            </div>
          )}
          {deposito.id !== "sin" && (
            <div className="flex justify-between text-sm">
              <span className="text-carbon/70">Depósito {deposito.nombre}</span>
              <span className="font-semibold text-carbon">{formatCOP(deposito.valor)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm pt-2 border-t border-turquesa-light/50">
            <span className="font-semibold text-carbon">Subtotal listado</span>
            <span className="font-bold text-carbon">{formatCOP(subtotal)}</span>
          </div>
          {descuento > 0 && (
            <div className="flex justify-between text-sm text-alert">
              <span className="font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Descuento ({formatPct(descuento)})
              </span>
              <span className="font-bold">{formatCOP(valorDescuento)}</span>
            </div>
          )}
        </div>

        {/* TOTAL — number statement premium */}
        <div className="bg-gradient-to-br from-caribe to-caribe-dark rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-cg-dorado/15 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-cg-dorado text-xs uppercase tracking-[0.3em] mb-2 font-semibold">
              Valor total negocio
            </p>
            <p className="font-display text-4xl md:text-5xl leading-none mb-2 tracking-tight">
              {formatCOP(valorNeto)}
            </p>
            <p className="text-turquesa text-xs tracking-widest">
              ≈ {formatCOP(Math.round(valorNeto / apto.areaVendible))} / m²
            </p>
          </div>
        </div>

        {/* Plan elegido */}
        <div className="bg-turquesa-light rounded-2xl p-5 space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-caribe font-bold flex items-center gap-1 mb-2">
            <Wallet className="w-3 h-3" />
            {plan}
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-carbon">Cuota inicial ({formatPct(cuotaInicialPct)})</span>
            <span className="font-bold text-caribe text-base">{formatCOP(cuotaInicial)}</span>
          </div>
          {plan !== "Plan Contado" && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-carbon">{numCuotas} cuotas mensuales de</span>
                <span className="font-bold text-caribe text-base">{formatCOP(cuotaMensual)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-caribe/20">
                <span className="text-carbon font-semibold">Subrogación final</span>
                <span className="font-bold text-caribe text-base">{formatCOP(saldoSubrogacion)}</span>
              </div>
            </>
          )}
        </div>

        {/* Fechas clave */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-crema rounded-lg p-3">
            <p className="text-carbon/60 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Separación
            </p>
            <p className="font-semibold text-caribe">31 May 2026</p>
          </div>
          <div className="bg-crema rounded-lg p-3">
            <p className="text-carbon/60 mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Entrega
            </p>
            <p className="font-semibold text-caribe">30 Jul 2028</p>
          </div>
        </div>
      </div>
    </div>
  );
}
