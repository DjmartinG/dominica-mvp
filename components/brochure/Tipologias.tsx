"use client";

import { useState } from "react";
import { X, Maximize2 } from "lucide-react";
import apartamentos from "@/data/apartamentos.json";

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

// Tipologías destacadas con URLs REALES verificadas
const TIPOLOGIAS_DESTACADAS = [
  {
    tipo: "FLAT HOUSE",
    desc: "Tipología base con balcón amplio. 2 alcobas + multifuncional.",
    img: "https://cgconstructora.com/wp-content/uploads/2024/09/tipo1.jpg",
  },
  {
    tipo: "BALCONY",
    desc: "Énfasis en balcón panorámico para disfrutar la vista exterior.",
    img: "https://cgconstructora.com/wp-content/uploads/2024/09/tipo2.jpg",
  },
  {
    tipo: "VIEW",
    desc: "Optimizado para máxima vista exterior y luz natural.",
    img: "https://cgconstructora.com/wp-content/uploads/2024/09/tipo3.jpg",
  },
  {
    tipo: "SKY",
    desc: "Tipología de pisos altos con vista privilegiada al horizonte.",
    img: "https://cgconstructora.com/wp-content/uploads/2024/09/plantatipo3.jpg",
  },
  {
    tipo: "PRESTIGE 117",
    desc: "Penthouse 117 m² + terraza 14 m². Solo piso 5.",
    img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-SALA-V3.jpg",
  },
  {
    tipo: "PRESTIGE 80",
    desc: "Premium con terraza de 28 m². Solo pisos 5-6.",
    img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP11-COCINA.jpg",
  },
  {
    tipo: "DUPLEX",
    desc: "Duplex con estudio en planta superior.",
    img: "https://cgconstructora.com/wp-content/uploads/2025/05/DUP-SALA-DUPLEX-1.jpg",
  },
  {
    tipo: "PRESTIGE 110",
    desc: "Penthouse 110 m² con doble parqueadero. Solo piso 6.",
    img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-HABITACION-V2.jpg",
  },
];

function formatCOP(v: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);
}

export function Tipologias() {
  const [lightbox, setLightbox] = useState<{ src: string; tipo: string } | null>(null);
  const aptos = apartamentos as Apto[];

  const disponiblesPorTipo = TIPOLOGIAS_DESTACADAS.map((t) => {
    const matches = aptos.filter((a) => a.tipologia === t.tipo && a.estado === "Disponible");
    const minPrecio = matches.length > 0 ? Math.min(...matches.map((a) => a.valorApartamento)) : 0;
    return { ...t, disponibles: matches.length, desde: minPrecio };
  });

  return (
    <section id="tipologias" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cg-dorado uppercase tracking-widest text-sm font-semibold mb-3">
            Tipologías
          </p>
          <h2 className="font-display text-h1 text-caribe mb-3">
            Distribuciones únicas para ti
          </h2>
          <div className="w-24 h-1 bg-turquesa mx-auto mb-6" />
          <p className="text-carbon/70 max-w-2xl mx-auto">
            Cada apartamento de Dominica tiene 2 alcobas + espacio multifuncional, con variantes
            que se adaptan a tu estilo de vida.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disponiblesPorTipo.map((t) => (
            <div key={t.tipo} className="card-dominica overflow-hidden !p-0 flex flex-col group">
              <div
                className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-turquesa-light"
                onClick={() => setLightbox({ src: t.img, tipo: t.tipo })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={`Tipología ${t.tipo}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-caribe/0 group-hover:bg-caribe/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-display text-caribe text-lg mb-2">{t.tipo}</h3>
                <p className="text-xs text-carbon/70 mb-3 flex-1">{t.desc}</p>
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className={`px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
                    t.disponibles > 0
                      ? "bg-turquesa-light text-caribe-dark"
                      : "bg-alert/10 text-alert"
                  }`}>
                    {t.disponibles > 0 ? `${t.disponibles} disponibles` : "Agotada"}
                  </span>
                  {t.desde > 0 && (
                    <span className="font-semibold text-caribe whitespace-nowrap">
                      Desde {formatCOP(t.desde)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-carbon/50 italic mt-8">
          Renders y planos ilustrativos. Áreas según ficha técnica. Precios sujetos a cambios.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center max-w-5xl">
            <p className="text-turquesa font-display text-2xl mb-4">{lightbox.tipo}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.tipo}
              className="max-h-[80vh] max-w-full mx-auto object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white/60 text-xs mt-4 italic">
              Click fuera de la imagen para cerrar
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
