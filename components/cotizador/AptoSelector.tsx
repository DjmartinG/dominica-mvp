"use client";

import { useState, useMemo } from "react";
import { Building2, Filter, CheckCircle2, ChevronDown, X } from "lucide-react";
import apartamentos from "@/data/apartamentos.json";
import { Apto, formatArea, formatCOP } from "@/lib/cotizador";

interface Props {
  selected: Apto | null;
  onSelect: (apto: Apto) => void;
}

export function AptoSelector({ selected, onSelect }: Props) {
  const [filtroTorre, setFiltroTorre] = useState<number | "all">("all");
  const [filtroTipo, setFiltroTipo] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const aptos = apartamentos as Apto[];
  const disponibles = aptos.filter((a) => a.estado === "Disponible");

  const tipologias = useMemo(
    () => Array.from(new Set(disponibles.map((a) => a.tipologia))).sort(),
    [disponibles]
  );

  const filtrados = useMemo(() => {
    return disponibles.filter((a) => {
      if (filtroTorre !== "all" && a.torre !== filtroTorre) return false;
      if (filtroTipo !== "all" && a.tipologia !== filtroTipo) return false;
      return true;
    });
  }, [disponibles, filtroTorre, filtroTipo]);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-white border-2 border-cielo hover:border-navy p-4 flex items-center gap-4 transition-all text-left group"
      >
        <div className="bg-navy text-white p-3">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          {selected ? (
            <>
              <p className="font-display text-navy text-xl">
                Apto {selected.numero} — {selected.tipologia}
              </p>
              <p className="text-sm text-negro/70">
                {selected.vista} · {formatArea(selected.areaVendible)} · {formatCOP(selected.valorApartamento)}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-navy text-lg">Selecciona tu apartamento</p>
              <p className="text-sm text-negro/60">{disponibles.length} disponibles en T4</p>
            </>
          )}
        </div>
        <ChevronDown className="w-5 h-5 text-navy group-hover:translate-y-1 transition-transform" />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full sm:max-w-3xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-navy text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl">Apartamentos disponibles</h3>
                <p className="text-cielo text-sm">{filtrados.length} unidades coinciden</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="bg-white/10 hover:bg-white/20 p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filtros */}
            <div className="p-4 border-b bg-beige flex flex-wrap gap-3 items-center">
              <Filter className="w-4 h-4 text-navy" />
              <select
                value={filtroTorre}
                onChange={(e) => setFiltroTorre(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="bg-white border border-cielo px-3 py-1.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="all">Todas las torres</option>
                <option value={4}>Torre 4</option>
              </select>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="bg-white border border-cielo px-3 py-1.5 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="all">Todas las tipologías</option>
                {tipologias.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-y-auto p-4 grid sm:grid-cols-2 gap-3">
              {filtrados.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    onSelect(a);
                    setOpen(false);
                  }}
                  className={`text-left p-4 border-2 transition-all ${
                    selected?.id === a.id
                      ? "border-navy bg-beige"
                      : "border-gris-muyclaro bg-white hover:border-navy"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-navy text-lg">Apto {a.numero}</span>
                    {selected?.id === a.id && <CheckCircle2 className="w-5 h-5 text-navy" />}
                  </div>
                  <p className="text-xs text-rojo uppercase tracking-widest font-semibold mb-2">
                    {a.tipologia}
                  </p>
                  <p className="text-sm text-negro mb-2">
                    {a.vista} · Piso {a.piso} · {formatArea(a.areaVendible)}
                  </p>
                  <p className="text-navy font-bold text-base">
                    {formatCOP(a.valorApartamento)}
                  </p>
                </button>
              ))}
              {filtrados.length === 0 && (
                <div className="col-span-full text-center py-12 text-negro/60">
                  No hay apartamentos con esos filtros
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
