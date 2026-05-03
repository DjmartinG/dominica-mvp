import { brand } from "@/lib/design-tokens";
import Link from "next/link";

export function ElProyecto() {
  return (
    <section id="proyecto" className="py-24 lg:py-32 px-6 lg:px-12 bg-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="eyebrow mb-6">El Proyecto</p>
          <h2 className="section-title">
            Vive la esencia del Caribe<br />en el corazón de Pereira
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
          <div
            className="aspect-[4/5] bg-cover bg-center shadow-card"
            style={{ backgroundImage: `url(${brand.assets.renders[0]})` }}
          />
          <div>
            <h3 className="font-display text-3xl lg:text-4xl text-negro mb-6 leading-tight">
              Un hogar inspirado en el encanto tropical
            </h3>
            <p className="text-base text-gris leading-relaxed mb-6">
              <strong className="text-negro">Apartamentos Dominica</strong> es un proyecto donde la arquitectura y la naturaleza se fusionan para ofrecerte un hogar que respira bienestar y sofisticación.
            </p>
            <p className="text-base text-gris leading-relaxed mb-6">
              Desde sus terrazas amplias hasta sus espacios llenos de luz y ventilación natural, Dominica redefine la experiencia de habitar.
            </p>
            <blockquote className="border-l-2 border-rojo pl-6 my-8 font-display italic text-2xl text-negro leading-relaxed">
              &ldquo;Imagina despertar cada día rodeado de la tranquilidad y la frescura de una <em className="text-rojo">isla caribeña</em>, sin salir de la ciudad.&rdquo;
            </blockquote>
            <p className="text-base text-gris leading-relaxed mb-8">
              Con certificación <strong className="text-negro">EDGE</strong>, eficiencia energética y sostenibilidad como pilares del diseño que fluye con el entorno.
            </p>
            <Link href="/cotizar" className="btn-link">Cotizar mi apartamento</Link>
          </div>
        </div>

        {/* Stats inline minimalistas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-negro/10">
          <div className="text-center">
            <p className="font-display text-4xl text-rojo mb-2">{brand.proyecto.estructura.split(" ")[0]}</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-negro">Torres</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-rojo mb-2">6</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-negro">Pisos</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-rojo mb-2">14<span className="text-2xl">+</span></p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-negro">Amenidades</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl text-rojo mb-2 mt-1.5">EDGE</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-negro">Certificación</p>
          </div>
        </div>
      </div>
    </section>
  );
}
