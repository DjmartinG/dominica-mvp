import { brand } from "@/lib/design-tokens";
import { Maximize2, RotateCw } from "lucide-react";

export function Recorrido360() {
  return (
    <section id="recorrido" className="py-24 px-6 bg-caribe-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-cg-dorado uppercase tracking-widest text-sm font-semibold mb-3">
            Recorrido Virtual
          </p>
          <h2 className="font-display text-h1 text-white mb-3">
            Camina por Dominica en 360°
          </h2>
          <div className="w-24 h-1 bg-turquesa mx-auto mb-6" />
          <p className="text-white/80 max-w-2xl mx-auto">
            Explora cada espacio del proyecto desde donde estés. Arrastra para mirar alrededor, haz
            zoom y descubre los detalles.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-caribe relative bg-white">
          <iframe
            src={brand.assets.recorrido360}
            title="Recorrido Virtual 360 Dominica"
            className="w-full aspect-video"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <RotateCw className="w-4 h-4 text-turquesa" />
            Arrastra para girar
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Maximize2 className="w-4 h-4 text-turquesa" />
            Pantalla completa disponible
          </div>
        </div>

        <p className="text-center text-white/50 text-xs italic mt-6">
          Powered by Kuula · Renders ilustrativos del proyecto
        </p>
      </div>
    </section>
  );
}
