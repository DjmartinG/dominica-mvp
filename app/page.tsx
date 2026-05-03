import Link from "next/link";
import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { LogoDominica } from "@/components/Logos";
import { brand } from "@/lib/design-tokens";
import { ChevronRight, Home as HomeIcon, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <>
      <BannerCG ghost />

      <main className="flex-1 relative overflow-hidden">
        {/* Hero con render de fondo */}
        <section
          className="relative min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: `url(${brand.assets.banners[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay verde caribe sutil */}
          <div className="absolute inset-0 bg-hero-overlay" />

          {/* Contenido */}
          <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto animate-fade-in-up">
            {/* Logo Dominica */}
            <div className="flex justify-center mb-6">
              <LogoDominica variant="white" size="md" />
            </div>

            {/* H1 — serif Lora elegante */}
            <h1 className="heading-hero text-white mb-6">
              Apartamentos Dominica
            </h1>

            {/* Subtitle */}
            <p className="text-turquesa text-base md:text-lg font-light mb-8 tracking-[0.25em] uppercase">
              Pereira · 5 torres × 6 pisos · NO VIS Premium
            </p>

            {/* Slogan con italics parcial premium */}
            <p className="slogan text-white/95 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed">
              Imagina despertar cada día rodeado de la tranquilidad, el diseño y la frescura de una{" "}
              <em>isla caribeña</em>, sin salir de la ciudad.
            </p>

            {/* Selector de modo — outline ghost premium */}
            <div className="max-w-3xl mx-auto">
              <p className="text-white/70 text-xs uppercase tracking-[0.4em] mb-6 font-light">
                ─── Comencemos ───
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Modo Sala — outline */}
                <Link
                  href="/sala"
                  className="group bg-white/5 hover:bg-white backdrop-blur-md border border-white/30 hover:border-white rounded-2xl p-6 text-left transition-all duration-400 flex items-start gap-4"
                >
                  <div className="border border-white/40 group-hover:border-caribe group-hover:bg-caribe text-white group-hover:text-white p-3 rounded-xl transition-all duration-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-white group-hover:text-caribe text-2xl mb-1 transition-colors duration-400">
                      Modo Sala
                    </h3>
                    <p className="text-white/70 group-hover:text-carbon/70 text-sm mb-3 transition-colors duration-400">
                      Para asesores comerciales. Tour guiado + cotizador.
                    </p>
                    <span className="inline-flex items-center gap-1 text-turquesa group-hover:text-cielo font-semibold text-sm transition-colors duration-400">
                      Ingresar como asesor
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
                    </span>
                  </div>
                </Link>

                {/* Modo Web — outline */}
                <Link
                  href="/brochure"
                  className="group bg-white/5 hover:bg-white backdrop-blur-md border border-white/30 hover:border-white rounded-2xl p-6 text-left transition-all duration-400 flex items-start gap-4"
                >
                  <div className="border border-white/40 group-hover:border-cielo group-hover:bg-cielo text-white group-hover:text-white p-3 rounded-xl transition-all duration-400">
                    <HomeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-white group-hover:text-caribe text-2xl mb-1 transition-colors duration-400">
                      Modo Web
                    </h3>
                    <p className="text-white/70 group-hover:text-carbon/70 text-sm mb-3 transition-colors duration-400">
                      Explora el proyecto y autocotiza tu apartamento.
                    </p>
                    <span className="inline-flex items-center gap-1 text-turquesa group-hover:text-cielo font-semibold text-sm transition-colors duration-400">
                      Ver el proyecto
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400" />
                    </span>
                  </div>
                </Link>
              </div>

              <p className="text-white/60 text-xs mt-8 tracking-widest">
                Desde {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(brand.proyecto.precioDesde)} · Certificación {brand.proyecto.certificacion}
              </p>
            </div>
          </div>

          {/* Hint scroll */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-[0.3em] animate-pulse z-10">
            ↓ Conoce el proyecto
          </div>
        </section>

        {/* Strip stats — números grandes statement */}
        <section className="bg-gradient-to-r from-turquesa-light via-turquesa to-turquesa-light py-16 md:py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <p className="statement-number">5</p>
              <p className="text-xs uppercase text-caribe-dark/70 tracking-[0.25em] font-semibold mt-3">Torres</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <p className="statement-number">6</p>
              <p className="text-xs uppercase text-caribe-dark/70 tracking-[0.25em] font-semibold mt-3">Pisos por torre</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <p className="statement-number">14+</p>
              <p className="text-xs uppercase text-caribe-dark/70 tracking-[0.25em] font-semibold mt-3">Amenidades</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="statement-number">EDGE</p>
              <p className="text-xs uppercase text-caribe-dark/70 tracking-[0.25em] font-semibold mt-3">Certificación</p>
            </div>
          </div>
        </section>
      </main>

      <FooterDominica />
    </>
  );
}
