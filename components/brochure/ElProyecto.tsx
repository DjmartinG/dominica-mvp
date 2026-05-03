import { brand } from "@/lib/design-tokens";
import { Building2, Award, Calendar, MapPin } from "lucide-react";

export function ElProyecto() {
  const stats = [
    { icon: Building2, label: "Estructura", value: brand.proyecto.estructura },
    { icon: MapPin, label: "Ubicación", value: brand.proyecto.ciudad },
    { icon: Award, label: "Certificación", value: brand.proyecto.certificacion },
    { icon: Calendar, label: "Categoría", value: brand.proyecto.categoria },
  ];

  return (
    <section id="proyecto" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cg-dorado uppercase tracking-widest text-sm font-semibold mb-3">
            El Proyecto
          </p>
          <h2 className="font-display text-h1 text-caribe mb-6">
            Vive la esencia del Caribe en tu hogar
          </h2>
          <div className="w-24 h-1 bg-turquesa mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-caribe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.renders[0]}
              alt="Render Apartamentos Dominica"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-caribe-dark/80 to-transparent p-6">
              <p className="text-white text-xs italic">
                Render arquitectónico — Ilustración de proyecto.
              </p>
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-5 text-carbon leading-relaxed">
            <p className="text-lg italic text-caribe slogan">
              &ldquo;Imagina despertar cada día rodeado de la tranquilidad, el diseño y la frescura
              de una isla caribeña, sin salir de la ciudad.&rdquo;
            </p>
            <p>
              <strong className="text-caribe">Apartamentos Dominica</strong> en Pereira es un
              proyecto inspirado en el encanto tropical, donde la arquitectura y la naturaleza se
              fusionan para ofrecerte un hogar que respira bienestar y sofisticación.
            </p>
            <p>
              Desde sus terrazas amplias hasta sus espacios llenos de luz y ventilación natural,
              Dominica redefine la experiencia de habitar. Cada detalle ha sido diseñado para que
              vivas con la armonía y la serenidad de un destino paradisíaco, pero con la comodidad
              de la vida moderna.
            </p>
            <p>
              Con certificación <strong className="text-caribe">EDGE</strong>, Dominica te ofrece
              eficiencia energética, sostenibilidad y un diseño que fluye con el entorno.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((s) => (
            <div key={s.label} className="card-amenidad text-center">
              <s.icon className="w-8 h-8 text-caribe mx-auto mb-2" />
              <p className="text-xs uppercase tracking-widest text-carbon/60 mb-1">{s.label}</p>
              <p className="font-display text-caribe-dark text-lg">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
