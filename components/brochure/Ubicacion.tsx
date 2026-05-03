import { brand } from "@/lib/design-tokens";
import { MapPin, Navigation, ShoppingBag, GraduationCap, Hospital, TreePine, Coffee } from "lucide-react";

const PUNTOS_INTERES = [
  { icon: ShoppingBag, nombre: "Centro Comercial Victoria", distancia: "5 min" },
  { icon: GraduationCap, nombre: "Universidad Tecnológica", distancia: "10 min" },
  { icon: Hospital, nombre: "Clínica Comfamiliar", distancia: "8 min" },
  { icon: TreePine, nombre: "Parque Olaya Herrera", distancia: "7 min" },
  { icon: Coffee, nombre: "Zona Rosa de Pereira", distancia: "12 min" },
  { icon: Navigation, nombre: "Aeropuerto Matecaña", distancia: "15 min" },
];

export function Ubicacion() {
  return (
    <section id="ubicacion" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Ubicación Privilegiada</p>
          <h2 className="section-title mb-6">
            En el corazón de Pereira
          </h2>
          <div className="inline-flex items-center gap-3 mt-4 px-6 py-3 border border-negro/15">
            <MapPin className="w-4 h-4 text-rojo" />
            <span className="text-sm text-negro tracking-wide">{brand.proyecto.direccion}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative aspect-[4/3] overflow-hidden shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.ubicacion}
              alt="Ubicación Apartamentos Dominica - Pereira"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.proyecto.direccion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs font-semibold tracking-[0.2em] uppercase hover:text-rojo transition-colors inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Abrir en Google Maps
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-display text-2xl text-negro mb-6">Cerca de todo</h3>
            {PUNTOS_INTERES.map((p) => (
              <div key={p.nombre} className="flex items-center gap-4 py-4 border-b border-gris-muyclaro">
                <div className="w-10 h-10 flex items-center justify-center bg-beige">
                  <p.icon className="w-4 h-4 text-rojo" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-negro truncate">{p.nombre}</p>
                  <p className="text-[11px] text-gris tracking-wider uppercase">{p.distancia} en auto</p>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gris/70 italic mt-4 tracking-wider">
              * Tiempos aproximados sujetos a tráfico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
