import Link from "next/link";
import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { LogoDominica } from "@/components/Logos";
import { brand } from "@/lib/design-tokens";
import { ChevronRight, Home as HomeIcon, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <>
      <BannerCG />

      <main className="flex-1 relative overflow-hidden">
        {/* Hero con render de fondo */}
        <section
          className="relative min-h-[calc(100vh-180px)] flex items-center justify-center"
          style={{
            backgroundImage: `url(${brand.assets.banners[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay verde caribe */}
          <div className="absolute inset-0 bg-hero-overlay" />

          {/* Contenido */}
          <div className="relative z-10 text-center px-6 py-12 max-w-5xl mx-auto animate-fade-in-up">
            {/* Logo Dominica */}
            <div className="flex justify-center mb-8">
              <LogoDominica variant="white" size="xl" />
            </div>

            {/* Title */}
            <h1 className="heading-hero text-white mb-4">
              Apartamentos Dominica
            </h1>

            {/* Subtitle */}
            <p className="text-turquesa text-lg md:text-2xl font-light mb-6 tracking-wide">
              {brand.proyecto.estructura} · {brand.proyecto.categoria} · Pereira
            </p>

            {/* Slogan */}
            <p className="slogan text-white/90 text-base md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
              &ldquo;{brand.copy.sloganOficial}&rdquo;
            </p>

            {/* CTA selector de modo */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/20 max-w-3xl mx-auto">
              <p className="text-white text-sm uppercase tracking-widest mb-6 font-semibold">
                Comencemos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Modo Sala */}
                <Link
                  href="/sala"
                  className="group bg-white hover:bg-turquesa transition-all duration-300 rounded-2xl p-6 text-left flex items-start gap-4 shadow-card hover:shadow-caribe"
                >
                  <div className="bg-caribe text-white p-3 rounded-xl group-hover:bg-caribe-dark transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-caribe text-xl mb-1 group-hover:text-caribe-dark">
                      Modo Sala
                    </h3>
                    <p className="text-carbon text-sm mb-3">
                      Para asesores comerciales. Tour guiado completo + cotizador.
                    </p>
                    <span className="inline-flex items-center gap-1 text-cielo font-semibold text-sm">
                      Ingresar como asesor
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>

                {/* Modo Web */}
                <Link
                  href="/brochure"
                  className="group bg-white hover:bg-turquesa transition-all duration-300 rounded-2xl p-6 text-left flex items-start gap-4 shadow-card hover:shadow-caribe"
                >
                  <div className="bg-cielo text-white p-3 rounded-xl group-hover:bg-cielo/90 transition-colors">
                    <HomeIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-caribe text-xl mb-1 group-hover:text-caribe-dark">
                      Modo Web
                    </h3>
                    <p className="text-carbon text-sm mb-3">
                      Explora el proyecto y autocotiza tu apartamento.
                    </p>
                    <span className="inline-flex items-center gap-1 text-cielo font-semibold text-sm">
                      Ver el proyecto
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>

              <p className="text-white/70 text-xs mt-6">
                Desde {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(brand.proyecto.precioDesde)} · Certificación {brand.proyecto.certificacion}
              </p>
            </div>
          </div>
        </section>

        {/* Strip turquesa con datos rápidos */}
        <section className="bg-turquesa py-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-display text-2xl text-caribe-dark">5</p>
              <p className="text-xs uppercase text-carbon tracking-widest">Torres</p>
            </div>
            <div>
              <p className="font-display text-2xl text-caribe-dark">6</p>
              <p className="text-xs uppercase text-carbon tracking-widest">Pisos por torre</p>
            </div>
            <div>
              <p className="font-display text-2xl text-caribe-dark">14+</p>
              <p className="text-xs uppercase text-carbon tracking-widest">Amenidades</p>
            </div>
            <div>
              <p className="font-display text-2xl text-caribe-dark">EDGE</p>
              <p className="text-xs uppercase text-carbon tracking-widest">Certificación</p>
            </div>
          </div>
        </section>
      </main>

      <FooterDominica />
    </>
  );
}
