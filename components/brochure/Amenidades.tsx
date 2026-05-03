"use client";

import { useState } from "react";
import { X, Waves, Sun, Dumbbell, Wine, Building2, Mountain, Trees, Briefcase, Flame, Trophy, Film, Dices, Bath, ImageOff } from "lucide-react";
import amenidades from "@/data/amenidades.json";

interface Amenidad {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  icono: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves, Sun, Dumbbell, Wine, Building2, Mountain, Trees, Briefcase, Flame, Trophy, Film, Dices, Bath, ImageOff,
};

function AmenidadCard({ a, onClick }: { a: Amenidad; onClick: () => void }) {
  const Icon = ICON_MAP[a.icono] || ImageOff;

  return (
    <button
      onClick={onClick}
      className="group relative aspect-square rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-400 hover:-translate-y-2"
    >
      {a.imagen ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.imagen}
            alt={a.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-caribe-dark/90 via-caribe/30 to-transparent group-hover:from-caribe-dark/70 transition-all duration-400" />
          {/* Overlay dorado en hover (premium accent) */}
          <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-cg-dorado/0 group-hover:ring-cg-dorado/60 transition-all duration-400 rounded-2xl" />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-caribe to-caribe-dark p-4 group-hover:from-caribe-dark group-hover:to-caribe transition-all duration-700">
          <Icon className="w-14 h-14 text-turquesa mb-3 group-hover:scale-110 transition-transform duration-400" />
          <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Render próximo</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
        <p className="font-display text-white text-base md:text-lg leading-tight transition-transform duration-400 group-hover:translate-x-1">
          {a.nombre}
        </p>
      </div>
    </button>
  );
}

export function Amenidades() {
  const [selected, setSelected] = useState<Amenidad | null>(null);
  const items = amenidades as Amenidad[];

  return (
    <section id="amenidades" className="py-32 px-6 bg-gradient-to-b from-crema to-turquesa-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cg-dorado uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            ─── Amenidades ───
          </p>
          <h2 className="font-display text-h1 text-caribe mb-4">
            Diseñadas para desconectarte
          </h2>
          <div className="w-16 h-px bg-cg-dorado mx-auto mb-6" />
          <p className="text-carbon/70 max-w-2xl mx-auto leading-relaxed">
            Sus exclusivas amenidades te permitirán disfrutar del lujo de desconectarte sin alejarte
            de lo que más importa.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((a) => (
            <AmenidadCard key={a.id} a={a} onClick={() => setSelected(a)} />
          ))}
        </div>

        {/* Modal detalle */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6 animate-fade-in"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video relative bg-caribe">
                {selected.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.imagen} alt={selected.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-caribe to-caribe-dark p-6">
                    {(() => {
                      const Icon = ICON_MAP[selected.icono] || ImageOff;
                      return <Icon className="w-24 h-24 text-turquesa mb-4" />;
                    })()}
                    <p className="text-white/70 text-sm uppercase tracking-[0.25em]">Render próximamente</p>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-display text-caribe text-3xl mb-3">{selected.nombre}</h3>
                <p className="text-carbon leading-relaxed">{selected.descripcion}</p>
                <p className="text-xs text-carbon/50 italic mt-6">
                  Amenidad ilustrativa. Sujeta a modificación según el proyecto final.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
