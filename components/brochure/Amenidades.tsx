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

export function Amenidades() {
  const [selected, setSelected] = useState<Amenidad | null>(null);
  const items = amenidades as Amenidad[];

  return (
    <section id="amenidades" className="py-24 lg:py-32 px-6 lg:px-12 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Amenidades</p>
          <h2 className="section-title mb-6">Diseñadas para desconectarte</h2>
          <p className="text-gris max-w-2xl mx-auto leading-relaxed">
            Sus exclusivas amenidades te permitirán disfrutar del lujo de desconectarte sin alejarte de lo que más importa.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((a) => {
            const Icon = ICON_MAP[a.icono] || ImageOff;
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="group relative aspect-square overflow-hidden bg-negro transition-all duration-400 hover:-translate-y-1"
              >
                {a.imagen ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.imagen}
                      alt={a.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-400" />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-navy p-4">
                    <Icon className="w-10 h-10 text-white/70 mb-3" />
                    <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Render próximo</p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <p className="font-display text-white text-base lg:text-lg leading-tight tracking-wide">
                    {a.nombre}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
            <button className="absolute top-6 right-6 text-white hover:text-rojo transition-colors" onClick={() => setSelected(null)}>
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white max-w-3xl w-full overflow-hidden shadow-lift" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video relative bg-navy">
                {selected.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.imagen} alt={selected.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-navy p-6">
                    {(() => {
                      const Icon = ICON_MAP[selected.icono] || ImageOff;
                      return <Icon className="w-24 h-24 text-white/60 mb-4" />;
                    })()}
                    <p className="text-white/50 text-sm tracking-[0.3em] uppercase">Render próximamente</p>
                  </div>
                )}
              </div>
              <div className="p-8">
                <p className="eyebrow mb-3">Amenidad</p>
                <h3 className="font-display text-3xl text-negro mb-4 tracking-wide">{selected.nombre}</h3>
                <p className="text-gris leading-relaxed">{selected.descripcion}</p>
                <p className="text-xs text-gris/60 italic mt-6 tracking-wide">
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
