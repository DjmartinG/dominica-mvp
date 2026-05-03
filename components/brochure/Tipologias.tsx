"use client";

import { useState } from "react";
import { X } from "lucide-react";
import apartamentos from "@/data/apartamentos.json";
import Link from "next/link";

interface Apto {
  numero: string;
  tipologia: string;
  vista: string;
  areaConstruida: number;
  areaBalcon: number;
  areaVendible: number;
  estado: string;
  valorApartamento: number;
}

const TIPOLOGIAS_DESTACADAS = [
  { tipo: "FLAT HOUSE", desc: "Tipología base con balcón amplio", img: "https://cgconstructora.com/wp-content/uploads/2025/05/DUP-SALA-DUPLEX-1.jpg", area: 92, tag: "Más buscado" },
  { tipo: "BALCONY", desc: "Énfasis en balcón panorámico exterior", img: "https://cgconstructora.com/wp-content/uploads/2025/05/TER-TERRAZA-SOLARIUM.jpg", area: 75, tag: "Vista panorámica" },
  { tipo: "VIEW", desc: "Optimizado para vista exterior", img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-HABITACION-V2.jpg", area: 74, tag: "Vista privilegiada" },
  { tipo: "SKY", desc: "Tipología de pisos altos con vista privilegiada", img: "https://cgconstructora.com/wp-content/uploads/2025/05/TER-TERRAZA-PH-T6-V2.jpg", area: 71, tag: "Pisos altos" },
  { tipo: "PRESTIGE 117", desc: "Penthouse con terraza 14m². Solo piso 5", img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-SALA-V3.jpg", area: 130, tag: "Edición Limitada" },
  { tipo: "PRESTIGE 80", desc: "Premium con terraza de 28m²", img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP11-COCINA.jpg", area: 108, tag: "Premium" },
  { tipo: "DUPLEX", desc: "Duplex con estudio en planta superior", img: "https://cgconstructora.com/wp-content/uploads/2025/05/DUP-SALA-DUPLEX-1.jpg", area: 130, tag: "Doble altura" },
  { tipo: "PRESTIGE 110", desc: "Penthouse 110m² con doble parqueadero", img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-HABITACION-V2.jpg", area: 110, tag: "Doble parqueadero" },
];

function formatM(v: number) {
  if (v >= 1000000000) return `$${(v / 1000000000).toFixed(2).replace(/\.?0+$/, "")}MM`;
  if (v >= 1000000) return `$${Math.round(v / 1000000)}M`;
  return `$${v.toLocaleString()}`;
}

export function Tipologias() {
  const [lightbox, setLightbox] = useState<{ src: string; tipo: string } | null>(null);
  const aptos = apartamentos as Apto[];

  return (
    <section id="tipologias" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Tipologías</p>
          <h2 className="section-title mb-6">Distribuciones únicas para ti</h2>
          <p className="text-gris max-w-2xl mx-auto leading-relaxed">
            Cada apartamento de Dominica tiene 2 alcobas + espacio multifuncional, con variantes que se adaptan a tu estilo de vida.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TIPOLOGIAS_DESTACADAS.map((t) => {
            const matches = aptos.filter((a) => a.tipologia === t.tipo && a.estado === "Disponible");
            const minPrecio = matches.length > 0 ? Math.min(...matches.map((a) => a.valorApartamento)) : 0;
            return (
              <div key={t.tipo} className="card-emaar">
                <div
                  className="relative aspect-[4/3] bg-cover bg-center mb-6 cursor-pointer overflow-hidden bg-beige"
                  style={{ backgroundImage: `url(${t.img})` }}
                  onClick={() => setLightbox({ src: t.img, tipo: t.tipo })}
                />
                <p className="eyebrow mb-2">{t.tag}</p>
                <h3 className="font-display text-2xl text-negro mb-2 tracking-wide">{t.tipo}</h3>
                <p className="text-xs text-gris mb-4 tracking-wide leading-relaxed">{t.desc}</p>
                <div className="flex gap-4 pt-3 border-t border-gris-muyclaro text-[11px]">
                  <div>
                    <strong className="font-display text-rojo text-base block">{matches.length}</strong>
                    <span className="text-negro tracking-wider uppercase">Disp.</span>
                  </div>
                  <div>
                    <strong className="font-display text-rojo text-base block">{t.area}m²</strong>
                    <span className="text-negro tracking-wider uppercase">Área</span>
                  </div>
                  {minPrecio > 0 && (
                    <div>
                      <strong className="font-display text-rojo text-base block">{formatM(minPrecio)}</strong>
                      <span className="text-negro tracking-wider uppercase">Desde</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/cotizar" className="btn-link">Cotizar mi apartamento</Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-rojo transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="text-center max-w-5xl">
            <p className="font-display text-white text-3xl tracking-wide mb-6">{lightbox.tipo}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.tipo}
              className="max-h-[80vh] max-w-full mx-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
