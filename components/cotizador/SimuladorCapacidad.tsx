"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, AlertTriangle, XCircle, Wallet, Building2 } from "lucide-react";
import { Apto, PlanPago, formatCOP } from "@/lib/cotizador";
import { analizarViabilidad, TASA_HIPOTECARIA_EA, PLAZO_MESES_ESTANDAR, gastosNotariales } from "@/lib/hipoteca";

interface Props {
  apto: Apto | null;
  valorNeto: number;
  cuotaInicial: number;
  plan: PlanPago;
  onCompletar: (completado: boolean, ingresoTotal: number) => void;
}

const VIABILIDAD_CONFIG = {
  verde: { color: "text-ok", bg: "bg-ok/10", border: "border-ok", icon: CheckCircle2, label: "Capacidad cómoda" },
  amarilla: { color: "text-warn", bg: "bg-warn/10", border: "border-warn", icon: AlertTriangle, label: "Capacidad ajustada" },
  roja: { color: "text-rojo", bg: "bg-rojo/10", border: "border-rojo", icon: XCircle, label: "Capacidad insuficiente" },
};

export function SimuladorCapacidad({ apto, valorNeto, cuotaInicial, plan, onCompletar }: Props) {
  const [ingresoTitular, setIngresoTitular] = useState<number>(0);
  const [ingresoCodeudor, setIngresoCodeudor] = useState<number>(0);
  const [showCodeudor, setShowCodeudor] = useState(false);

  const esContado = plan === "Plan Contado";
  const ingresoTotal = ingresoTitular + ingresoCodeudor;
  const completado = esContado || ingresoTitular >= 1000000; // mínimo $1M para considerar válido

  const analisis = useMemo(() => {
    if (!apto) return null;
    return analizarViabilidad({
      ingresoTitular,
      ingresoCodeudor: showCodeudor ? ingresoCodeudor : 0,
      valorNeto,
      cuotaInicial,
      esContado,
    });
  }, [apto, ingresoTitular, ingresoCodeudor, showCodeudor, valorNeto, cuotaInicial, esContado]);

  // Notificar al padre cuando se completa
  useMemo(() => {
    onCompletar(completado, ingresoTotal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completado, ingresoTotal]);

  if (!apto) return null;

  const viabConfig = analisis ? VIABILIDAD_CONFIG[analisis.viabilidad] : null;
  const ViabIcon = viabConfig?.icon || CheckCircle2;

  return (
    <div className="bg-white p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-rojo" />
        <h2 className="font-display text-2xl text-negro tracking-wide">5 · Simulador de capacidad</h2>
      </div>

      {esContado ? (
        // Modo Contado: omite simulador
        <div className="bg-ok/10 border-l-4 border-ok p-5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-ok flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-ok mb-1">Pago contado seleccionado</p>
            <p className="text-sm text-negro">No requiere análisis de capacidad de crédito hipotecario. Continúa con el resumen económico.</p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gris text-sm mb-6 leading-relaxed">
            Confirma que los ingresos del comprador permiten asumir la cuota hipotecaria del 70% restante después de la entrega del proyecto.
          </p>

          {/* Inputs ingresos */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-rojo mb-2 block">
                Ingresos mensuales del titular
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gris font-semibold">$</span>
                <input
                  type="number"
                  value={ingresoTitular || ""}
                  onChange={(e) => setIngresoTitular(Number(e.target.value) || 0)}
                  placeholder="3.500.000"
                  className="w-full bg-beige border-2 border-gris-muyclaro pl-8 pr-4 py-4 text-negro text-lg font-semibold focus:outline-none focus:border-navy transition-colors"
                />
              </div>
              {ingresoTitular > 0 && (
                <p className="text-[11px] text-gris mt-1">{formatCOP(ingresoTitular)}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-rojo">
                  Cónyuge / Codeudor (opcional)
                </label>
                {!showCodeudor && (
                  <button
                    type="button"
                    onClick={() => setShowCodeudor(true)}
                    className="text-[10px] tracking-[0.15em] uppercase text-cielo hover:text-cielo/80"
                  >
                    + Agregar
                  </button>
                )}
              </div>
              {showCodeudor ? (
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gris font-semibold">$</span>
                  <input
                    type="number"
                    value={ingresoCodeudor || ""}
                    onChange={(e) => setIngresoCodeudor(Number(e.target.value) || 0)}
                    placeholder="2.500.000"
                    className="w-full bg-beige border-2 border-gris-muyclaro pl-8 pr-4 py-4 text-negro text-lg font-semibold focus:outline-none focus:border-navy transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => { setShowCodeudor(false); setIngresoCodeudor(0); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase text-gris hover:text-rojo"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="bg-beige/50 border-2 border-dashed border-gris-muyclaro p-4 text-xs text-gris text-center">
                  Suma capacidad si aplican juntos al crédito
                </div>
              )}
              {showCodeudor && ingresoCodeudor > 0 && (
                <p className="text-[11px] text-gris mt-1">{formatCOP(ingresoCodeudor)}</p>
              )}
            </div>
          </div>

          {ingresoTotal > 0 && analisis && viabConfig && (
            <>
              {/* Indicador de viabilidad */}
              <div className={`${viabConfig.bg} border-l-4 ${viabConfig.border} p-5 mb-6`}>
                <div className="flex items-start gap-3">
                  <ViabIcon className={`w-6 h-6 ${viabConfig.color} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className={`font-bold text-sm tracking-[0.15em] uppercase ${viabConfig.color} mb-2`}>
                      {viabConfig.label}
                    </p>
                    <p className="text-sm text-negro leading-relaxed">{analisis.mensaje}</p>
                  </div>
                </div>
              </div>

              {/* Detalles del análisis */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-beige p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gris flex items-center gap-1 mb-2">
                    <Wallet className="w-3 h-3" />
                    Cuota máxima recomendada (30%)
                  </p>
                  <p className="font-display text-xl text-negro">{formatCOP(analisis.cuotaMaximaRegla30)}</p>
                  <p className="text-[10px] tracking-wider text-gris mt-1">/ mes</p>
                </div>
                <div className="bg-beige p-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gris flex items-center gap-1 mb-2">
                    <TrendingUp className="w-3 h-3" />
                    Capacidad de crédito máxima
                  </p>
                  <p className="font-display text-xl text-negro">{formatCOP(analisis.capacidadCreditoMax)}</p>
                  <p className="text-[10px] tracking-wider text-gris mt-1">A 20 años, 13.5% EA</p>
                </div>
              </div>

              {/* Cuota hipotecaria del proyecto vs capacidad */}
              <div className="bg-navy text-white p-5 mb-6">
                <p className="text-rojo text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                  Cuota hipotecaria estimada para este apto
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <p className="font-display text-2xl text-white mb-1">{formatCOP(analisis.saldoAFinanciar)}</p>
                    <p className="text-[10px] tracking-wider uppercase text-white/60">Saldo a financiar (70%)</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-white mb-1">{formatCOP(analisis.cuotaHipotecariaEstimada)}</p>
                    <p className="text-[10px] tracking-wider uppercase text-white/60">Cuota mensual estimada</p>
                  </div>
                  <div>
                    <p className={`font-display text-2xl mb-1 ${
                      analisis.viabilidad === "verde" ? "text-ok" :
                      analisis.viabilidad === "amarilla" ? "text-warn" : "text-rojo"
                    }`}>
                      {analisis.porcentajeUsoIngreso.toFixed(1)}%
                    </p>
                    <p className="text-[10px] tracking-wider uppercase text-white/60">Del ingreso total</p>
                  </div>
                </div>
              </div>

              {/* Recursos propios necesarios */}
              <div className="bg-beige p-5">
                <p className="eyebrow mb-3 flex items-center gap-2">
                  <Building2 className="w-3 h-3" />
                  Recursos propios necesarios al inicio
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-negro">Cuota inicial (30%)</span>
                    <span className="font-semibold text-negro">{formatCOP(analisis.cuotaInicialNecesaria)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-negro">Gastos notariales y escrituración (~3%)</span>
                    <span className="font-semibold text-negro">{formatCOP(analisis.gastosNotariales)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-negro/10">
                    <span className="font-bold text-negro tracking-wide">Total recursos propios</span>
                    <span className="font-bold text-rojo text-lg">{formatCOP(analisis.totalRecursosPropios)}</span>
                  </div>
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-gris/70 mt-4 italic">
                  * Gastos notariales aproximados para Pereira. Incluyen registro, beneficencia, notaría y estudio de títulos.
                </p>
              </div>
            </>
          )}

          {!completado && (
            <div className="mt-6 bg-cielo/10 border-l-4 border-cielo p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cielo flex-shrink-0 mt-0.5" />
              <p className="text-sm text-negro">
                Indica los ingresos del comprador para desbloquear el análisis y la opción de descuento.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
