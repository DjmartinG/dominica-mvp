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
    <section id="ubicacion" className="py-24 px-6 bg-crema">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cg-dorado uppercase tracking-widest text-sm font-semibold mb-3">
            Ubicación Privilegiada
          </p>
          <h2 className="font-display text-h1 text-caribe mb-3">
            En el corazón de Pereira
          </h2>
          <div className="w-24 h-1 bg-turquesa mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-card">
            <MapPin className="w-5 h-5 text-cielo" />
            <span className="text-carbon font-semibold">{brand.proyecto.direccion}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mapa */}
          <div className="lg:col-span-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-caribe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.ubicacion}
              alt="Ubicación Apartamentos Dominica - Pereira"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-caribe-dark/85 to-transparent p-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.proyecto.direccion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-turquesa transition-colors text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Abrir en Google Maps
              </a>
            </div>
          </div>

          {/* Puntos de interés */}
          <div className="space-y-3">
            <h3 className="font-display text-caribe text-lg mb-4">Cerca de todo</h3>
            {PUNTOS_INTERES.map((p) => (
              <div
                key={p.nombre}
                className="card-dominica !p-4 flex items-center gap-3"
              >
                <div className="bg-turquesa-light p-2 rounded-lg">
                  <p.icon className="w-5 h-5 text-caribe" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-carbon text-sm truncate">{p.nombre}</p>
                  <p className="text-xs text-carbon/60">{p.distancia} en auto</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-carbon/50 italic mt-2">
              * Tiempos aproximados sujetos a tráfico
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
