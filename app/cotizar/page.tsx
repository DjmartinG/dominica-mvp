"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { NavTop } from "@/components/NavTop";
import { TopBar } from "@/components/TopBar";
import { FooterDominica } from "@/components/FooterDominica";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TorreMapView } from "@/components/cotizador/TorreMapView";
import { AptoSelector } from "@/components/cotizador/AptoSelector";
import { ParqueaderoToggle } from "@/components/cotizador/ParqueaderoToggle";
import { DepositoSelector } from "@/components/cotizador/DepositoSelector";
import { PlanPagoSelector } from "@/components/cotizador/PlanPagoSelector";
import { DescuentoSlider } from "@/components/cotizador/DescuentoSlider";
import { DatosCliente } from "@/components/cotizador/DatosCliente";
import { ResumenEconomico } from "@/components/cotizador/ResumenEconomico";
import { PlanCuotas } from "@/components/cotizador/PlanCuotas";
import { Alertas } from "@/components/cotizador/Alertas";
import { AccionesFinales } from "@/components/cotizador/AccionesFinales";
import depositos from "@/data/depositos.json";
import {
  Apto, Deposito, Cliente, PlanPago, Asesor, Cotizacion,
  calcularSubtotal, calcularValorNeto, calcularCuotaInicial, calcularCronograma,
  validarApto, validarDescuento, validarDeposito,
  generarNumeroCotizacion, calcularFechaVencimiento,
} from "@/lib/cotizador";
import { ArrowLeft, BookOpen, List, LayoutGrid } from "lucide-react";

const SIN_DEPOSITO = (depositos as Deposito[]).find((d) => d.id === "sin")!;
const CLIENTE_VACIO: Cliente = { nombre: "", documento: "", celular: "", email: "" };

export default function CotizarPage() {
  const [apto, setApto] = useState<Apto | null>(null);
  const [conParqueadero, setConParqueadero] = useState(true);
  const [deposito, setDeposito] = useState<Deposito>(SIN_DEPOSITO);
  const [plan, setPlan] = useState<PlanPago>("Plan 30/70 Estándar");
  const [descuento, setDescuento] = useState(0);
  const [cliente, setCliente] = useState<Cliente>(CLIENTE_VACIO);
  const [asesor, setAsesor] = useState<Asesor | null>(null);
  const [guardada, setGuardada] = useState(false);
  const [vistaSeleccion, setVistaSeleccion] = useState<"mapa" | "lista">("mapa");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("dominica_asesor");
      if (saved) setAsesor(JSON.parse(saved));
    }
  }, []);

  const calculos = useMemo(() => {
    if (!apto) return null;
    const subtotal = calcularSubtotal(apto, conParqueadero, deposito);
    const { valorDescuento, valorNeto } = calcularValorNeto(subtotal, descuento);
    const { cuotaInicial, cuotaInicialPct, saldoSubrogacion } = calcularCuotaInicial(valorNeto, plan);
    const cronograma = calcularCronograma(valorNeto, plan);
    return { subtotal, valorDescuento, valorNeto, cuotaInicial, cuotaInicialPct, saldoSubrogacion, cronograma };
  }, [apto, conParqueadero, deposito, plan, descuento]);

  const alertas = useMemo(() => {
    const lst = [];
    const a = validarApto(apto);
    if (a) lst.push(a);
    lst.push(validarDescuento(descuento));
    lst.push(validarDeposito(deposito));
    return lst;
  }, [apto, descuento, deposito]);

  const completo = !!(apto && apto.estado === "Disponible" && cliente.nombre.length > 2 && cliente.celular.length >= 7);

  const cotizacion: Cotizacion | null = useMemo(() => {
    if (!apto || !calculos || !completo) return null;
    return {
      numero: "PREV-XXX",
      fechaEmision: new Date().toISOString(),
      fechaVencimiento: calcularFechaVencimiento(),
      cliente, asesor, apto, conParqueadero, deposito, plan, descuento,
      subtotal: calculos.subtotal,
      valorDescuento: calculos.valorDescuento,
      valorNeto: calculos.valorNeto,
      cuotaInicial: calculos.cuotaInicial,
      cuotaInicialPct: calculos.cuotaInicialPct,
      saldoSubrogacion: calculos.saldoSubrogacion,
      numCuotas: 26,
      cuotaMensual: plan === "Plan Contado" ? 0 : Math.round((calculos.cuotaInicial - 9000000) / 26),
      separacion: 9000000,
      cronograma: calculos.cronograma,
      estadoSeguimiento: "Cotizado",
      notasAsesor: "",
      createdAt: new Date().toISOString(),
    };
  }, [apto, calculos, completo, cliente, asesor, conParqueadero, deposito, plan, descuento]);

  const handleGuardar = () => {
    if (!cotizacion) return;
    const num = generarNumeroCotizacion();
    const final = { ...cotizacion, numero: num };
    const stored = JSON.parse(localStorage.getItem("dominica_cotizaciones") || "[]");
    stored.push(final);
    localStorage.setItem("dominica_cotizaciones", JSON.stringify(stored));
    setGuardada(true);
    setTimeout(() => setGuardada(false), 4000);
  };

  return (
    <>
      <TopBar />
      <NavTop />

      <main className="bg-beige min-h-screen pt-[140px] pb-16 px-4 sm:px-6 lg:px-12 print:bg-white print:py-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 no-print">
            <Breadcrumbs items={[{ label: "Cotizador" }]} />
            <Link
              href="/brochure"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-gris hover:text-rojo transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Volver al brochure
            </Link>
          </div>

          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Cotizador Dominica</p>
            <h1 className="section-title mb-3">Construye tu cotización</h1>
            <p className="text-gris text-sm tracking-wide max-w-xl mx-auto">
              Selecciona apartamento, parqueadero, depósito, plan de pago y cliente. Calculamos en tiempo real.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* SECCIÓN 1 — TU APARTAMENTO con vista mapa o lista */}
              <div className="bg-white p-6 lg:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="font-display text-2xl text-negro tracking-wide">1 · Tu apartamento</h2>
                  
                  {/* Toggle vista mapa/lista */}
                  <div className="inline-flex bg-beige border border-gris-muyclaro p-1">
                    <button
                      onClick={() => setVistaSeleccion("mapa")}
                      className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors ${
                        vistaSeleccion === "mapa" ? "bg-navy text-white" : "text-negro hover:bg-white"
                      }`}
                    >
                      <LayoutGrid className="w-3 h-3" />
                      Mapa Torre
                    </button>
                    <button
                      onClick={() => setVistaSeleccion("lista")}
                      className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors ${
                        vistaSeleccion === "lista" ? "bg-navy text-white" : "text-negro hover:bg-white"
                      }`}
                    >
                      <List className="w-3 h-3" />
                      Lista
                    </button>
                  </div>
                </div>

                {vistaSeleccion === "mapa" ? (
                  <TorreMapView selected={apto} onSelect={setApto} />
                ) : (
                  <AptoSelector selected={apto} onSelect={setApto} />
                )}

                {apto && (
                  <div className="mt-6 pt-6 border-t border-gris-muyclaro space-y-4">
                    <ParqueaderoToggle apto={apto} incluido={conParqueadero} onToggle={setConParqueadero} />
                    <DepositoSelector selected={deposito} onSelect={setDeposito} />
                  </div>
                )}
              </div>

              {apto && (
                <div className="bg-white p-8 space-y-5">
                  <h2 className="font-display text-2xl text-negro tracking-wide">2 · Plan de pago</h2>
                  <PlanPagoSelector selected={plan} onSelect={setPlan} />
                  <DescuentoSlider value={descuento} onChange={setDescuento} />
                </div>
              )}

              {apto && (
                <div className="bg-white p-8">
                  <DatosCliente cliente={cliente} onChange={setCliente} />
                </div>
              )}

              {alertas.length > 0 && (
                <div className="bg-white p-6">
                  <h3 className="font-display text-lg text-negro tracking-wide mb-3">Alertas y validaciones</h3>
                  <Alertas alertas={alertas} />
                </div>
              )}

              {calculos && (
                <PlanCuotas cuotas={calculos.cronograma} valorNeto={calculos.valorNeto} />
              )}
            </div>

            <div className="lg:col-span-1 space-y-4">
              <ResumenEconomico
                apto={apto}
                conParqueadero={conParqueadero}
                deposito={deposito}
                plan={plan}
                descuento={descuento}
              />
              {apto && (
                <AccionesFinales cotizacion={cotizacion} disabled={!completo} onGuardar={handleGuardar} />
              )}
              {guardada && (
                <div className="bg-ok/10 border border-ok p-4 text-center">
                  <p className="text-ok font-semibold text-sm tracking-wide mb-3">✓ Cotización guardada</p>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs">
                    <button
                      onClick={() => {
                        setApto(null);
                        setCliente(CLIENTE_VACIO);
                        setDescuento(0);
                      }}
                      className="flex-1 px-3 py-2 bg-navy text-white tracking-[0.15em] uppercase hover:bg-navy-dark transition-colors"
                    >
                      Cotizar otro
                    </button>
                    <Link
                      href="/brochure"
                      className="flex-1 px-3 py-2 border border-negro text-negro tracking-[0.15em] uppercase hover:bg-negro hover:text-white transition-colors"
                    >
                      Volver al brochure
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
