import { brand } from "@/lib/design-tokens";
import { Maximize2, RotateCw } from "lucide-react";

export function Recorrido360() {
  return (
    <section id="recorrido" className="py-32 px-6 bg-caribe-dark relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-turquesa/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cg-dorado/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-cg-dorado uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            ─── Recorrido Virtual ───
          </p>
          <h2 className="font-display text-h1 text-white mb-4">
            Camina por Dominica en 360°
          </h2>
          <div className="w-16 h-px bg-cg-dorado mx-auto mb-6" />
          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explora cada espacio del proyecto desde donde estés. Arrastra para mirar alrededor, haz
            zoom y descubre los detalles.
          </p>
        </div>

        {/* Marco premium con borde dorado */}
        <div className="relative p-1 bg-gradient-to-br from-cg-dorado via-cg-dorado/50 to-cg-dorado rounded-3xl shadow-caribe">
          <div className="rounded-3xl overflow-hidden bg-white">
            <iframe
              src={brand.assets.recorrido360}
              title="Recorrido Virtual 360 Dominica"
              className="w-full aspect-video"
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <RotateCw className="w-4 h-4 text-cg-dorado" />
            Arrastra para girar
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Maximize2 className="w-4 h-4 text-cg-dorado" />
            Pantalla completa
          </div>
        </div>

        <p className="text-center text-white/40 text-xs italic mt-8 tracking-widest">
          ─── Powered by Kuula · Renders ilustrativos ───
        </p>
      </div>
    </section>
  );
}
