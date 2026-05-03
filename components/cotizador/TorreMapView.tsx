"use client";

import { useState, useMemo, useEffect } from "react";
import { Apto, formatCOP, formatArea } from "@/lib/cotizador";
import apartamentos from "@/data/apartamentos.json";
import { Building2, Info, X, CheckCircle2 } from "lucide-react";

interface Props {
  selected: Apto | null;
  onSelect: (apto: Apto) => void;
}

// Configuración de colores por estado
const ESTADO_STYLE: Record<string, { bg: string; bgHover: string; text: string; border: string; label: string }> = {
  Disponible: {
    bg: "bg-ok",
    bgHover: "hover:bg-ok/80",
    text: "text-white",
    border: "border-ok",
    label: "Disponible",
  },
  Reservado: {
    bg: "bg-warn",
    bgHover: "hover:bg-warn/80",
    text: "text-white",
    border: "border-warn",
    label: "Reservado",
  },
  Vendido: {
    bg: "bg-rojo",
    bgHover: "hover:bg-rojo/90",
    text: "text-white",
    border: "border-rojo",
    label: "Vendido",
  },
};

// Tipologías abreviadas para mostrar dentro del cuadrito
const TIPO_ABREV: Record<string, string> = {
  "FLAT HOUSE": "FH",
  "FLAT HOUSE PRADERA": "FHP",
  "BALCONY": "BAL",
  "VIEW": "VW",
  "SKY": "SKY",
  "PRESTIGE 80": "P80",
  "PRESTIGE 110": "P110",
  "PRESTIGE 116": "P116",
  "PRESTIGE 117": "P117",
  "PRESTIGE 118": "P118",
};

export function TorreMapView({ selected, onSelect }: Props) {
  const [hoveredApto, setHoveredApto] = useState<Apto | null>(null);
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  // Cargar overrides del inventario hechos por la asesora desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dominica_inventario_overrides");
    if (saved) {
      try {
        setOverrides(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Aplicar overrides a los apartamentos
  const aptos = useMemo(() => {
    return (apartamentos as Apto[]).map((a) => ({
      ...a,
      estado: overrides[a.id] || a.estado,
    }));
  }, [overrides]);

  // Agrupar por piso
  const aptosPorPiso = useMemo(() => {
    const grupos: Record<number, Apto[]> = {};
    aptos.forEach((a) => {
      if (!grupos[a.piso]) grupos[a.piso] = [];
      grupos[a.piso].push(a);
    });
    // Ordenar cada piso por número
    Object.keys(grupos).forEach((piso) => {
      grupos[Number(piso)].sort((a, b) => a.numero.localeCompare(b.numero));
    });
    return grupos;
  }, [aptos]);

  const pisosOrdenados = useMemo(() => {
    return Object.keys(aptosPorPiso).map(Number).sort((a, b) => b - a); // de mayor a menor (Piso 6 arriba, Sótano abajo)
  }, [aptosPorPiso]);

  // Stats
  const stats = useMemo(() => ({
    total: aptos.length,
    disponibles: aptos.filter((a) => a.estado === "Disponible").length,
    reservados: aptos.filter((a) => a.estado === "Reservado").length,
    vendidos: aptos.filter((a) => a.estado === "Vendido").length,
  }), [aptos]);

  const handleClick = (apto: Apto) => {
    if (apto.estado !== "Disponible") return;
    onSelect(apto);
  };

  return (
    <div className="bg-white border border-gris-muyclaro">
      {/* Header */}
      <div className="bg-navy text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-rojo" />
          <div>
            <p className="text-rojo text-[10px] tracking-[0.3em] uppercase font-semibold">Inventario</p>
            <h3 className="font-display text-2xl tracking-wide">Torre 4 · 49 apartamentos</h3>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-ok"></span>
            <span className="text-white/80 tracking-wide">{stats.disponibles} disponibles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-warn"></span>
            <span className="text-white/80 tracking-wide">{stats.reservados} reservados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-rojo"></span>
            <span className="text-white/80 tracking-wide">{stats.vendidos} vendidos</span>
          </div>
        </div>
      </div>

      {/* Leyenda mobile */}
      <div className="md:hidden bg-beige px-4 py-3 flex flex-wrap items-center gap-3 text-[11px] tracking-wide border-b border-gris-muyclaro">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-ok"></span>
          <span className="text-negro font-semibold">{stats.disponibles} disp.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-warn"></span>
          <span className="text-negro font-semibold">{stats.reservados} res.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-rojo"></span>
          <span className="text-negro font-semibold">{stats.vendidos} vend.</span>
        </div>
      </div>

      {/* Mapa de la torre */}
      <div className="p-4 lg:p-6 bg-gradient-to-b from-beige to-white">
        <div className="space-y-3">
          {pisosOrdenados.map((piso) => {
            const aptos = aptosPorPiso[piso];
            const pisoLabel = piso === 0 ? "SÓTANO" : `PISO ${piso}`;
            return (
              <div key={piso} className="flex items-stretch gap-3">
                {/* Etiqueta del piso */}
                <div className="flex-shrink-0 w-20 lg:w-24 bg-navy text-white flex flex-col items-center justify-center px-2 py-1">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-rojo font-semibold leading-none">
                    {piso === 0 ? "Nivel" : "Piso"}
                  </p>
                  <p className="font-display text-lg lg:text-xl leading-tight">
                    {piso === 0 ? "0" : piso}
                  </p>
                  <p className="text-[8px] tracking-wider text-white/50 leading-none">
                    {aptos.length} apto{aptos.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Aptos del piso */}
                <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
                  {aptos.map((a) => {
                    const cfg = ESTADO_STYLE[a.estado];
                    const isSelected = selected?.id === a.id;
                    const isDisponible = a.estado === "Disponible";
                    return (
                      <button
                        key={a.id}
                        onClick={() => handleClick(a)}
                        onMouseEnter={() => setHoveredApto(a)}
                        onMouseLeave={() => setHoveredApto(null)}
                        disabled={!isDisponible}
                        className={`relative aspect-[4/3] flex flex-col items-center justify-center text-center transition-all ${
                          cfg.bg
                        } ${isDisponible ? cfg.bgHover + " cursor-pointer hover:scale-105 hover:shadow-lift hover:z-10" : "cursor-not-allowed opacity-90"} ${
                          isSelected ? "ring-4 ring-cielo ring-offset-2" : ""
                        }`}
                        title={`Apto ${a.numero} · ${a.tipologia} · ${a.estado}`}
                      >
                        <span className="font-display text-base lg:text-lg text-white leading-none font-semibold">
                          {a.numero}
                        </span>
                        <span className="text-[8px] lg:text-[9px] tracking-wider text-white/80 mt-0.5 leading-none">
                          {TIPO_ABREV[a.tipologia] || a.tipologia.substring(0, 3)}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="absolute -top-1.5 -right-1.5 w-4 h-4 text-cielo bg-white rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tooltip flotante con info al hacer hover */}
        {hoveredApto && (
          <div className="hidden lg:block fixed top-1/2 right-12 -translate-y-1/2 z-50 bg-white shadow-lift border border-gris-muyclaro p-4 max-w-xs pointer-events-none animate-fade-in">
            <p className="eyebrow mb-2">Apartamento</p>
            <p className="font-display text-2xl text-negro tracking-wide mb-1">{hoveredApto.numero}</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-rojo font-semibold mb-3">
              {hoveredApto.tipologia}
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gris">Vista</span>
                <span className="text-negro font-semibold">{hoveredApto.vista}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gris">Área</span>
                <span className="text-negro font-semibold">{formatArea(hoveredApto.areaVendible)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gris-muyclaro mt-2">
                <span className="text-gris">Valor</span>
                <span className="text-rojo font-bold">{formatCOP(hoveredApto.valorApartamento)}</span>
              </div>
              <div className="pt-2 border-t border-gris-muyclaro mt-2 text-center">
                <span className={`inline-block px-2 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold ${
                  hoveredApto.estado === "Disponible" ? "bg-ok/10 text-ok" :
                  hoveredApto.estado === "Vendido" ? "bg-rojo/10 text-rojo" :
                  "bg-warn/10 text-warn"
                }`}>
                  {hoveredApto.estado}
                </span>
              </div>
              {hoveredApto.estado === "Disponible" && (
                <p className="text-cielo text-[10px] text-center pt-2 italic">Click para seleccionar</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="bg-beige p-4 border-t border-gris-muyclaro flex flex-wrap items-center justify-between gap-3 text-xs">
        <p className="text-gris flex items-center gap-2">
          <Info className="w-3 h-3" />
          <span className="tracking-wide">Solo los apartamentos disponibles (verde) son seleccionables</span>
        </p>
        {selected && (
          <p className="text-cielo font-semibold tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Seleccionado: <strong>Apto {selected.numero}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
