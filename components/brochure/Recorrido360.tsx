import { brand } from "@/lib/design-tokens";
import { Maximize2, RotateCw } from "lucide-react";

export function Recorrido360() {
  return (
    <section id="recorrido" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Recorrido Virtual</p>
          <h2 className="section-title mb-6">Camina por Dominica en 360°</h2>
          <p className="text-gris max-w-2xl mx-auto leading-relaxed">
            Explora cada espacio del proyecto desde donde estés. Arrastra para mirar alrededor, haz zoom y descubre los detalles.
          </p>
        </div>

        <div className="bg-beige p-1 shadow-card">
          <iframe
            src={brand.assets.recorrido360}
            title="Recorrido Virtual 360 Dominica"
            className="w-full aspect-video block"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
          />
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8 max-w-md mx-auto text-center">
          <div className="flex flex-col items-center gap-2">
            <RotateCw className="w-5 h-5 text-rojo" />
            <p className="text-[11px] tracking-[0.2em] uppercase text-gris">Arrastra para girar</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Maximize2 className="w-5 h-5 text-rojo" />
            <p className="text-[11px] tracking-[0.2em] uppercase text-gris">Pantalla completa</p>
          </div>
        </div>

        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-gris/50 mt-8">
          Powered by Kuula · Renders ilustrativos
        </p>
      </div>
    </section>
  );
}
