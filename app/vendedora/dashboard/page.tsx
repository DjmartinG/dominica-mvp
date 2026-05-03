"use client";

import Link from "next/link";
import { useAsesora } from "@/lib/useAsesora";
import { useEffect, useState } from "react";
import { Cotizacion, formatCOP } from "@/lib/cotizador";
import { FileText, TrendingUp, Calculator, Users, ArrowRight, Plus } from "lucide-react";

interface Metricas {
  total: number;
  visitas: number;
  reservas: number;
  ventas: number;
  valorPipeline: number;
  ultimas: Cotizacion[];
}

const ESTADO_COLOR: Record<string, string> = {
  Cotizado: "bg-cielo/10 text-cielo border-cielo/30",
  Visitó: "bg-warn/10 text-warn border-warn/30",
  Reservó: "bg-rojo/10 text-rojo border-rojo/30",
  Vendió: "bg-ok/10 text-ok border-ok/30",
  Descartó: "bg-gris/10 text-gris border-gris/30",
};

export default function DashboardPage() {
  const { asesora } = useAsesora();
  const [metricas, setMetricas] = useState<Metricas | null>(null);

  useEffect(() => {
    if (!asesora) return;
    const all: Cotizacion[] = JSON.parse(localStorage.getItem("dominica_cotizaciones") || "[]");
    const mias = all.filter((c) => c.asesor?.codigo === asesora.codigo);
    
    setMetricas({
      total: mias.length,
      visitas: mias.filter((c) => c.estadoSeguimiento === "Visitó").length,
      reservas: mias.filter((c) => c.estadoSeguimiento === "Reservó").length,
      ventas: mias.filter((c) => c.estadoSeguimiento === "Vendió").length,
      valorPipeline: mias.reduce((s, c) => s + c.valorNeto, 0),
      ultimas: mias.slice(-5).reverse(),
    });
  }, [asesora]);

  if (!asesora || !metricas) return null;

  return (
    <div className="p-6 lg:p-12 pt-20 lg:pt-12">
      {/* Header */}
      <div className="mb-12">
        <p className="eyebrow mb-2">Bienvenida</p>
        <h1 className="font-display text-4xl lg:text-5xl text-negro tracking-wide mb-2">
          Hola, {asesora.nombre.split(" ")[0]}
        </h1>
        <p className="text-gris text-sm tracking-wide">
          Aquí está el resumen de tus cotizaciones y actividad reciente.
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <MetricCard label="Cotizaciones" value={metricas.total} icon={FileText} accent="text-cielo" />
        <MetricCard label="Visitas" value={metricas.visitas} icon={Users} accent="text-warn" />
        <MetricCard label="Reservas" value={metricas.reservas} icon={TrendingUp} accent="text-rojo" />
        <MetricCard label="Ventas cerradas" value={metricas.ventas} icon={Calculator} accent="text-ok" />
      </div>

      {/* Pipeline value */}
      <div className="bg-navy text-white p-8 mb-12">
        <p className="text-rojo text-[11px] tracking-[0.3em] uppercase font-semibold mb-2">
          Valor pipeline activo
        </p>
        <p className="font-display text-4xl lg:text-6xl tracking-tight">
          {formatCOP(metricas.valorPipeline)}
        </p>
        <p className="text-white/60 text-xs tracking-wide mt-2">
          Suma del valor neto de todas tus cotizaciones generadas
        </p>
      </div>

      {/* Últimas cotizaciones + Acciones rápidas */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Últimas 5 cotizaciones */}
        <div className="lg:col-span-2 bg-white">
          <div className="p-6 border-b border-gris-muyclaro flex items-center justify-between">
            <div>
              <p className="eyebrow mb-1">Última actividad</p>
              <h2 className="font-display text-2xl text-negro tracking-wide">Mis cotizaciones recientes</h2>
            </div>
            <Link href="/vendedora/cotizaciones" className="text-xs tracking-[0.2em] uppercase text-rojo hover:text-rojo-dark transition-colors flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          {metricas.ultimas.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gris-claro mx-auto mb-4" />
              <p className="text-gris text-sm mb-2">Aún no has generado cotizaciones</p>
              <Link href="/cotizar" target="_blank" className="text-xs tracking-[0.2em] uppercase text-rojo hover:text-rojo-dark transition-colors">
                Crear primera cotización →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-beige text-[10px] tracking-[0.15em] uppercase text-gris">
                <tr>
                  <th className="text-left p-4 font-semibold">Cotización</th>
                  <th className="text-left p-4 font-semibold">Cliente</th>
                  <th className="text-left p-4 font-semibold hidden md:table-cell">Apto</th>
                  <th className="text-right p-4 font-semibold">Valor</th>
                  <th className="text-center p-4 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {metricas.ultimas.map((c, i) => (
                  <tr key={i} className="border-t border-gris-muyclaro hover:bg-beige/50 transition-colors">
                    <td className="p-4 font-semibold text-negro">{c.numero}</td>
                    <td className="p-4 text-negro">{c.cliente.nombre}</td>
                    <td className="p-4 text-gris hidden md:table-cell">{c.apto.numero} · {c.apto.tipologia}</td>
                    <td className="p-4 text-right font-semibold text-rojo">{formatCOP(c.valorNeto)}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold border ${ESTADO_COLOR[c.estadoSeguimiento]}`}>
                        {c.estadoSeguimiento}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Acciones rápidas */}
        <div className="space-y-4">
          <p className="eyebrow mb-4">Acciones rápidas</p>
          <Link
            href="/cotizar"
            target="_blank"
            className="block bg-rojo hover:bg-rojo-dark text-white p-6 transition-colors"
          >
            <Plus className="w-6 h-6 mb-3" />
            <p className="font-display text-xl tracking-wide mb-1">Nueva cotización</p>
            <p className="text-white/80 text-xs tracking-wide">Construye una propuesta</p>
          </Link>
          
          <Link
            href="/vendedora/inventario"
            className="block bg-white hover:bg-beige p-6 transition-colors border border-gris-muyclaro"
          >
            <Calculator className="w-6 h-6 mb-3 text-navy" />
            <p className="font-display text-xl text-negro tracking-wide mb-1">Ver inventario</p>
            <p className="text-gris text-xs tracking-wide">39 aptos disponibles T4</p>
          </Link>

          <Link
            href="/brochure"
            target="_blank"
            className="block bg-white hover:bg-beige p-6 transition-colors border border-gris-muyclaro"
          >
            <FileText className="w-6 h-6 mb-3 text-navy" />
            <p className="font-display text-xl text-negro tracking-wide mb-1">Tour cliente</p>
            <p className="text-gris text-xs tracking-wide">Abre brochure inmersivo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, accent }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; accent: string }) {
  return (
    <div className="bg-white p-5 border border-gris-muyclaro">
      <Icon className={`w-5 h-5 ${accent} mb-3`} />
      <p className="font-display text-3xl lg:text-4xl text-negro mb-1">{value}</p>
      <p className="text-[10px] tracking-[0.25em] uppercase text-gris">{label}</p>
    </div>
  );
}
