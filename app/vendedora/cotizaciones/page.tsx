"use client";

import { useEffect, useState } from "react";
import { useAsesora } from "@/lib/useAsesora";
import { Cotizacion, EstadoSeguimiento, formatCOP, formatDate } from "@/lib/cotizador";
import { brand } from "@/lib/design-tokens";
import { Filter, X, MessageCircle, ExternalLink, Edit3, Calendar, Trash2 } from "lucide-react";

const ESTADOS: EstadoSeguimiento[] = ["Cotizado", "Visitó", "Reservó", "Vendió", "Descartó"];

const ESTADO_COLOR: Record<EstadoSeguimiento, string> = {
  Cotizado: "bg-cielo/10 text-cielo border-cielo/30",
  "Visitó": "bg-warn/10 text-warn border-warn/30",
  "Reservó": "bg-rojo/10 text-rojo border-rojo/30",
  "Vendió": "bg-ok/10 text-ok border-ok/30",
  "Descartó": "bg-gris/10 text-gris border-gris/30",
};

export default function CotizacionesPage() {
  const { asesora } = useAsesora();
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<EstadoSeguimiento | "all">("all");
  const [selected, setSelected] = useState<Cotizacion | null>(null);

  const reload = () => {
    if (!asesora) return;
    const all: Cotizacion[] = JSON.parse(localStorage.getItem("dominica_cotizaciones") || "[]");
    const mias = all.filter((c) => c.asesor?.codigo === asesora.codigo);
    setCotizaciones(mias.reverse());
  };

  useEffect(() => { reload(); }, [asesora]);

  const filtradas = filtroEstado === "all"
    ? cotizaciones
    : cotizaciones.filter((c) => c.estadoSeguimiento === filtroEstado);

  const updateCotizacion = (numero: string, updates: Partial<Cotizacion>) => {
    const all: Cotizacion[] = JSON.parse(localStorage.getItem("dominica_cotizaciones") || "[]");
    const nuevas = all.map((c) => c.numero === numero ? { ...c, ...updates } : c);
    localStorage.setItem("dominica_cotizaciones", JSON.stringify(nuevas));
    reload();
    if (selected?.numero === numero) {
      setSelected({ ...selected, ...updates });
    }
  };

  const eliminarCotizacion = (numero: string) => {
    if (!confirm(`¿Eliminar cotización ${numero}? Esta acción no se puede deshacer.`)) return;
    const all: Cotizacion[] = JSON.parse(localStorage.getItem("dominica_cotizaciones") || "[]");
    const filtradas = all.filter((c) => c.numero !== numero);
    localStorage.setItem("dominica_cotizaciones", JSON.stringify(filtradas));
    reload();
    setSelected(null);
  };

  const reenviarWA = (c: Cotizacion) => {
    const num = c.cliente.celular.replace(/\D/g, "");
    const numWA = num.startsWith("57") ? num : `57${num}`;
    const msg = `¡Hola ${c.cliente.nombre}! 👋

Te recuerdo tu cotización del Apartamento ${c.apto.numero} (${c.apto.tipologia}) del proyecto Apartamentos Dominica:

🏠 ${c.apto.tipologia} · ${c.apto.areaVendible} m²
💰 Valor total: ${formatCOP(c.valorNeto)}
📊 Plan: ${c.plan}

Cotización N° ${c.numero}

¿Tienes alguna duda? Estoy a tu disposición.

${c.asesor?.nombre || ""}
CG Constructora · Apartamentos Dominica`;
    window.open(`https://wa.me/${numWA}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const totalPipeline = cotizaciones.reduce((s, c) => s + c.valorNeto, 0);
  const totalVendido = cotizaciones.filter((c) => c.estadoSeguimiento === "Vendió").reduce((s, c) => s + c.valorNeto, 0);

  return (
    <div className="p-6 lg:p-12 pt-20 lg:pt-12">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow mb-2">CRM</p>
        <h1 className="font-display text-4xl text-negro tracking-wide mb-2">Mis Cotizaciones</h1>
        <p className="text-gris text-sm tracking-wide">
          {cotizaciones.length} cotizaciones generadas · Pipeline {formatCOP(totalPipeline)} · Vendido {formatCOP(totalVendido)}
        </p>
      </div>

      {/* Filtros pipeline */}
      <div className="mb-6 flex flex-wrap items-center gap-2 bg-white p-3 border border-gris-muyclaro">
        <Filter className="w-4 h-4 text-gris ml-2" />
        <button
          onClick={() => setFiltroEstado("all")}
          className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
            filtroEstado === "all" ? "bg-navy text-white" : "text-negro hover:bg-beige"
          }`}
        >
          Todas ({cotizaciones.length})
        </button>
        {ESTADOS.map((e) => {
          const count = cotizaciones.filter((c) => c.estadoSeguimiento === e).length;
          return (
            <button
              key={e}
              onClick={() => setFiltroEstado(e)}
              className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                filtroEstado === e ? "bg-navy text-white" : "text-negro hover:bg-beige"
              }`}
            >
              {e} ({count})
            </button>
          );
        })}
      </div>

      {/* Tabla */}
      {filtradas.length === 0 ? (
        <div className="bg-white p-16 text-center">
          <p className="text-gris text-sm mb-4">
            {filtroEstado === "all" ? "Aún no has generado cotizaciones" : `Sin cotizaciones en estado "${filtroEstado}"`}
          </p>
          <a href="/cotizar" target="_blank" className="text-xs tracking-[0.2em] uppercase text-rojo hover:text-rojo-dark transition-colors">
            Crear nueva cotización →
          </a>
        </div>
      ) : (
        <div className="bg-white border border-gris-muyclaro overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-beige text-[10px] tracking-[0.15em] uppercase text-gris">
              <tr>
                <th className="text-left p-4 font-semibold">N°</th>
                <th className="text-left p-4 font-semibold">Cliente</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Apto</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Plan</th>
                <th className="text-right p-4 font-semibold">Valor</th>
                <th className="text-center p-4 font-semibold">Estado</th>
                <th className="text-center p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((c) => (
                <tr key={c.numero} className="border-t border-gris-muyclaro hover:bg-beige/50 transition-colors">
                  <td className="p-4 font-semibold text-negro">{c.numero}</td>
                  <td className="p-4">
                    <p className="text-negro font-semibold">{c.cliente.nombre}</p>
                    <p className="text-[11px] text-gris">{c.cliente.celular}</p>
                  </td>
                  <td className="p-4 text-gris hidden md:table-cell">
                    <p className="font-semibold text-negro">{c.apto.numero}</p>
                    <p className="text-[11px]">{c.apto.tipologia}</p>
                  </td>
                  <td className="p-4 text-gris hidden lg:table-cell text-[12px]">{c.plan}</td>
                  <td className="p-4 text-right font-semibold text-rojo">{formatCOP(c.valorNeto)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold border ${ESTADO_COLOR[c.estadoSeguimiento]}`}>
                      {c.estadoSeguimiento}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelected(c)}
                        className="p-2 hover:bg-beige transition-colors"
                        title="Ver detalle"
                      >
                        <Edit3 className="w-4 h-4 text-navy" />
                      </button>
                      <button
                        onClick={() => reenviarWA(c)}
                        className="p-2 hover:bg-beige transition-colors"
                        title="Reenviar por WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 text-ok" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal detalle */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-navy text-white p-6 flex items-start justify-between">
              <div>
                <p className="eyebrow !text-rojo mb-2">Cotización</p>
                <h3 className="font-display text-3xl tracking-wide">{selected.numero}</h3>
                <p className="text-white/70 text-xs tracking-[0.2em] uppercase mt-1">
                  Emitida {formatDate(selected.fechaEmision)}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="hover:text-rojo transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Cliente */}
              <div>
                <p className="eyebrow mb-3">Cliente</p>
                <p className="text-negro font-semibold text-lg">{selected.cliente.nombre}</p>
                <p className="text-gris text-sm">CC {selected.cliente.documento}</p>
                <p className="text-gris text-sm">{selected.cliente.celular} {selected.cliente.email && ` · ${selected.cliente.email}`}</p>
              </div>

              {/* Apto */}
              <div className="bg-beige p-4">
                <p className="eyebrow mb-3">Apartamento</p>
                <p className="font-display text-2xl text-negro tracking-wide">{selected.apto.numero} · {selected.apto.tipologia}</p>
                <p className="text-sm text-gris mt-1">{selected.apto.vista} · {selected.apto.areaVendible} m²</p>
              </div>

              {/* Valores */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-beige p-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gris">Valor neto</p>
                  <p className="font-display text-xl text-rojo">{formatCOP(selected.valorNeto)}</p>
                </div>
                <div className="bg-beige p-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gris">Cuota inicial</p>
                  <p className="font-display text-xl text-negro">{formatCOP(selected.cuotaInicial)}</p>
                </div>
              </div>

              <p className="text-sm text-gris"><strong className="text-negro">Plan:</strong> {selected.plan}</p>

              {/* Cambio de estado */}
              <div>
                <p className="eyebrow mb-3">Estado del seguimiento</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {ESTADOS.map((e) => (
                    <button
                      key={e}
                      onClick={() => updateCotizacion(selected.numero, { estadoSeguimiento: e })}
                      className={`p-3 text-[10px] tracking-[0.15em] uppercase font-semibold border transition-all ${
                        selected.estadoSeguimiento === e
                          ? ESTADO_COLOR[e].replace("bg-", "bg-").replace("/10", "")
                          : "border-gris-muyclaro text-gris hover:border-navy"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notas */}
              <div>
                <p className="eyebrow mb-3">Notas</p>
                <textarea
                  value={selected.notasAsesor || ""}
                  onChange={(e) => updateCotizacion(selected.numero, { notasAsesor: e.target.value })}
                  placeholder="Anota observaciones, próximos pasos, condiciones especiales..."
                  rows={3}
                  className="w-full bg-beige border border-gris-muyclaro p-3 text-sm focus:outline-none focus:border-navy"
                />
              </div>

              {/* Acciones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-gris-muyclaro">
                <button onClick={() => reenviarWA(selected)} className="bg-ok text-white px-4 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ok/90 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                <a href={`tel:${selected.cliente.celular}`} className="bg-navy text-white px-4 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-navy-dark transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Llamar
                </a>
                <button onClick={() => eliminarCotizacion(selected.numero)} className="border border-rojo text-rojo px-4 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-rojo hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
