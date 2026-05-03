"use client";

import { useEffect, useState, useMemo } from "react";
import { useAsesora } from "@/lib/useAsesora";
import apartamentos from "@/data/apartamentos.json";
import { formatCOP, formatArea } from "@/lib/cotizador";
import { Filter, ExternalLink, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";

interface Apto {
  id: string;
  numero: string;
  torre: number;
  piso: number;
  tipologia: string;
  vista: string;
  areaVendible: number;
  valorApartamento: number;
  estado: string;
  parqueadero: { numero: string; tipo: string; valor: number };
}

const ESTADOS = ["Disponible", "Reservado", "Vendido"] as const;
type Estado = typeof ESTADOS[number];

const ESTADO_CONFIG: Record<Estado, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Disponible: { color: "text-ok", bg: "bg-ok/10", icon: CheckCircle2 },
  Reservado: { color: "text-warn", bg: "bg-warn/10", icon: AlertTriangle },
  Vendido: { color: "text-rojo", bg: "bg-rojo/10", icon: XCircle },
};

export default function InventarioPage() {
  const { asesora } = useAsesora();
  const [overrides, setOverrides] = useState<Record<string, Estado>>({});
  const [filtroTipo, setFiltroTipo] = useState<string>("all");
  const [filtroEstado, setFiltroEstado] = useState<string>("all");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dominica_inventario_overrides");
    if (saved) setOverrides(JSON.parse(saved));
  }, []);

  const aptos = useMemo(() => {
    return (apartamentos as Apto[]).map((a) => ({
      ...a,
      estado: overrides[a.id] || a.estado,
    }));
  }, [overrides]);

  const tipologias = useMemo(() => Array.from(new Set(aptos.map((a) => a.tipologia))).sort(), [aptos]);

  const filtrados = useMemo(() => {
    return aptos.filter((a) => {
      if (filtroTipo !== "all" && a.tipologia !== filtroTipo) return false;
      if (filtroEstado !== "all" && a.estado !== filtroEstado) return false;
      return true;
    });
  }, [aptos, filtroTipo, filtroEstado]);

  const cambiarEstado = (id: string, estado: Estado) => {
    const nuevos = { ...overrides, [id]: estado };
    setOverrides(nuevos);
    localStorage.setItem("dominica_inventario_overrides", JSON.stringify(nuevos));
  };

  const resetearOverrides = () => {
    if (!confirm("¿Restaurar inventario al estado original? Se borrarán todos los cambios manuales.")) return;
    setOverrides({});
    localStorage.removeItem("dominica_inventario_overrides");
  };

  const stats = {
    total: aptos.length,
    disponibles: aptos.filter((a) => a.estado === "Disponible").length,
    reservados: aptos.filter((a) => a.estado === "Reservado").length,
    vendidos: aptos.filter((a) => a.estado === "Vendido").length,
  };

  if (!asesora) return null;

  return (
    <div className="p-6 lg:p-12 pt-20 lg:pt-12">
      <div className="mb-8">
        <p className="eyebrow mb-2">Inventario T4</p>
        <h1 className="font-display text-4xl text-negro tracking-wide mb-2">Apartamentos del proyecto</h1>
        <p className="text-gris text-sm tracking-wide">
          {stats.total} unidades · {stats.disponibles} disponibles · {stats.reservados} reservados · {stats.vendidos} vendidos
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gris-muyclaro p-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-gris mb-2">Total inventario</p>
          <p className="font-display text-3xl text-negro">{stats.total}</p>
        </div>
        <div className="bg-white border border-ok/30 border-l-4 border-l-ok p-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-ok mb-2">Disponibles</p>
          <p className="font-display text-3xl text-ok">{stats.disponibles}</p>
        </div>
        <div className="bg-white border border-warn/30 border-l-4 border-l-warn p-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-warn mb-2">Reservados</p>
          <p className="font-display text-3xl text-warn">{stats.reservados}</p>
        </div>
        <div className="bg-white border border-rojo/30 border-l-4 border-l-rojo p-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-rojo mb-2">Vendidos</p>
          <p className="font-display text-3xl text-rojo">{stats.vendidos}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-3 border border-gris-muyclaro">
        <Filter className="w-4 h-4 text-gris ml-2" />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="bg-beige border border-gris-muyclaro px-3 py-2 text-xs tracking-wide font-semibold text-negro focus:outline-none focus:border-navy">
          <option value="all">Todas las tipologías</option>
          {tipologias.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="bg-beige border border-gris-muyclaro px-3 py-2 text-xs tracking-wide font-semibold text-negro focus:outline-none focus:border-navy">
          <option value="all">Todos los estados</option>
          {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <span className="text-xs text-gris ml-auto">{filtrados.length} resultados</span>
        {Object.keys(overrides).length > 0 && (
          <button onClick={resetearOverrides} className="text-[10px] tracking-[0.2em] uppercase text-rojo hover:text-rojo-dark">
            ✕ Resetear cambios manuales ({Object.keys(overrides).length})
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="bg-white border border-gris-muyclaro overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-beige text-[10px] tracking-[0.15em] uppercase text-gris">
            <tr>
              <th className="text-left p-4 font-semibold">Apto</th>
              <th className="text-left p-4 font-semibold hidden sm:table-cell">Tipología</th>
              <th className="text-left p-4 font-semibold hidden md:table-cell">Vista</th>
              <th className="text-right p-4 font-semibold hidden md:table-cell">Área</th>
              <th className="text-right p-4 font-semibold">Valor</th>
              <th className="text-center p-4 font-semibold">Estado</th>
              <th className="text-center p-4 font-semibold">Cambiar</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => {
              const cfg = ESTADO_CONFIG[a.estado as Estado];
              const Icon = cfg.icon;
              return (
                <tr key={a.id} className="border-t border-gris-muyclaro hover:bg-beige/50 transition-colors">
                  <td className="p-4">
                    <p className="font-display text-lg text-negro">{a.numero}</p>
                    <p className="text-[11px] text-gris">Torre {a.torre} · Piso {a.piso}</p>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <p className="font-semibold text-negro text-xs tracking-wide">{a.tipologia}</p>
                    <p className="text-[11px] text-gris">{a.parqueadero.tipo}</p>
                  </td>
                  <td className="p-4 text-gris hidden md:table-cell text-xs">{a.vista}</td>
                  <td className="p-4 text-right text-gris hidden md:table-cell text-xs">{formatArea(a.areaVendible)}</td>
                  <td className="p-4 text-right font-semibold text-rojo text-xs">{formatCOP(a.valorApartamento)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold ${cfg.bg} ${cfg.color} border border-current/30`}>
                      <Icon className="w-3 h-3" />
                      {a.estado}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select
                      value={a.estado}
                      onChange={(e) => cambiarEstado(a.id, e.target.value as Estado)}
                      className="bg-beige border border-gris-muyclaro px-2 py-1 text-[10px] tracking-wide font-semibold focus:outline-none focus:border-navy"
                    >
                      {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtrados.length === 0 && (
          <div className="p-12 text-center text-gris text-sm">
            No hay apartamentos con esos filtros
          </div>
        )}
      </div>

      <p className="text-[10px] tracking-[0.2em] uppercase text-gris/60 mt-6 italic">
        * Los cambios de estado se guardan en este navegador. En producción se sincronizarán con la base de datos.
      </p>

      {/* CTA cotizar */}
      <Link href="/cotizar" target="_blank" className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-rojo hover:text-rojo-dark transition-colors">
        Crear nueva cotización <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}
