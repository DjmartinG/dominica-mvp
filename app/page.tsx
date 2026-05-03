import Link from "next/link";
import { NavTop } from "@/components/NavTop";
import { FooterDominica } from "@/components/FooterDominica";
import { brand } from "@/lib/design-tokens";
import { ChevronDown } from "lucide-react";
import apartamentos from "@/data/apartamentos.json";

interface Apto {
  numero: string;
  tipologia: string;
  areaVendible: number;
  estado: string;
  valorApartamento: number;
}

function formatCOP(v: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);
}
function formatM(v: number) {
  if (v >= 1000000000) return `$${(v / 1000000000).toFixed(2).replace(/\.?0+$/, "")}MM`;
  if (v >= 1000000) return `$${Math.round(v / 1000000)}M`;
  return formatCOP(v);
}

const TIPOLOGIAS_HERO = [
  { tipo: "FLAT HOUSE", tag: "Más buscado", area: 92, img: "https://cgconstructora.com/wp-content/uploads/2024/09/tipo1.jpg" },
  { tipo: "BALCONY", tag: "Vista panorámica", area: 75, img: "https://cgconstructora.com/wp-content/uploads/2024/09/tipo2.jpg" },
  { tipo: "PRESTIGE 117", tag: "Edición Limitada", area: 130, img: "https://cgconstructora.com/wp-content/uploads/2025/05/PH-TP6-SALA-V3.jpg" },
];

export default function Home() {
  const aptos = apartamentos as Apto[];
  
  return (
    <>
      <NavTop />

      {/* ============ HERO sin marca de agua ============ */}
      <section className="relative h-[calc(100vh-80px)] mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-slow"
          style={{ backgroundImage: `url(${brand.assets.banners[0]})` }}
        />
        <div className="absolute inset-0 hero-overlay-emaar" />

        {/* Search bar pill flotante */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-5xl bg-white rounded-full p-2 pl-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-lift animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Link href="/brochure#tipologias" className="flex-1 px-4 py-3 sm:py-2 text-xs font-medium uppercase tracking-[0.05em] text-negro hover:text-rojo transition-colors flex items-center justify-between gap-3 sm:border-r border-b sm:border-b-0 border-gris-muyclaro">
            Tipología <ChevronDown className="w-3 h-3 text-gris" />
          </Link>
          <button className="flex-1 px-4 py-3 sm:py-2 text-xs font-medium uppercase tracking-[0.05em] text-negro hover:text-rojo transition-colors flex items-center justify-between gap-3 sm:border-r border-b sm:border-b-0 border-gris-muyclaro">
            Torre <ChevronDown className="w-3 h-3 text-gris" />
          </button>
          <button className="flex-1 px-4 py-3 sm:py-2 text-xs font-medium uppercase tracking-[0.05em] text-negro hover:text-rojo transition-colors flex items-center justify-between gap-3 sm:border-r border-b sm:border-b-0 border-gris-muyclaro">
            Rango precio <ChevronDown className="w-3 h-3 text-gris" />
          </button>
          <button className="flex-1 px-4 py-3 sm:py-2 text-xs font-medium uppercase tracking-[0.05em] text-negro hover:text-rojo transition-colors flex items-center justify-between gap-3">
            Disponibilidad <ChevronDown className="w-3 h-3 text-gris" />
          </button>
          <Link href="/cotizar" className="btn-pill">Buscar Apartamentos</Link>
        </div>
      </section>

      {/* ============ PROPERTIES GRID ============ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-title mb-6">
              Apartamentos Premium en Pereira
            </h2>
            <p className="text-gris max-w-2xl mx-auto leading-relaxed">
              Descubre las distribuciones únicas de Dominica. Cada apartamento de 2 alcobas + espacio multifuncional, diseñado para quienes buscan calidad de vida con identidad caribeña.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TIPOLOGIAS_HERO.map((t) => {
              const matches = aptos.filter((a) => a.tipologia === t.tipo && a.estado === "Disponible");
              const minPrecio = matches.length > 0 ? Math.min(...matches.map((a) => a.valorApartamento)) : 0;
              return (
                <Link key={t.tipo} href={`/cotizar?tipo=${t.tipo}`} className="card-emaar">
                  <div
                    className="w-full aspect-[4/3] bg-cover bg-center mb-6"
                    style={{ backgroundImage: `url(${t.img})` }}
                  />
                  <p className="eyebrow mb-2">{t.tag}</p>
                  <h3 className="font-display text-3xl text-negro mb-2 tracking-wide">{t.tipo}</h3>
                  <p className="text-sm text-gris mb-4 tracking-wide">Torre 4 · 2 alcobas + multifuncional</p>
                  <div className="flex gap-6 pt-4 border-t border-gris-muyclaro text-xs">
                    <div>
                      <strong className="font-display text-rojo text-lg block">{matches.length}</strong>
                      <span className="text-negro">Disponibles</span>
                    </div>
                    <div>
                      <strong className="font-display text-rojo text-lg block">{t.area}m²</strong>
                      <span className="text-negro">Área típica</span>
                    </div>
                    <div>
                      <strong className="font-display text-rojo text-lg block">{formatM(minPrecio)}</strong>
                      <span className="text-negro">Desde</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/brochure#tipologias" className="btn-link">Ver todas las tipologías</Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED — El Proyecto ============ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-beige">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            className="aspect-[4/5] bg-cover bg-center shadow-card"
            style={{ backgroundImage: `url(${brand.assets.renders[0]})` }}
          />
          <div>
            <p className="eyebrow mb-6">El Proyecto</p>
            <h2 className="font-display text-display text-negro mb-8 leading-tight">
              Vive la esencia del Caribe en el corazón de Pereira
            </h2>
            <p className="text-base text-gris leading-relaxed mb-6">
              <strong className="text-negro">Apartamentos Dominica</strong> es un proyecto inspirado en el encanto tropical, donde la arquitectura y la naturaleza se fusionan para ofrecerte un hogar que respira bienestar y sofisticación.
            </p>
            <p className="text-base text-gris leading-relaxed mb-6">
              Con certificación <strong className="text-negro">EDGE</strong>, eficiencia energética y sostenibilidad como pilares del diseño que fluye con el entorno.
            </p>
            <Link href="/brochure" className="btn-link mt-4">Conocer el proyecto</Link>
          </div>
        </div>
      </section>

      {/* ============ STATS BAND NAVY ============ */}
      <section className="py-20 px-6 lg:px-12 bg-navy text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="text-center px-6 lg:border-r border-white/15">
            <p className="stat-number-serif text-white mb-3">5</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/70">Torres</p>
          </div>
          <div className="text-center px-6 lg:border-r border-white/15">
            <p className="stat-number-serif text-white mb-3">6</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/70">Pisos por torre</p>
          </div>
          <div className="text-center px-6 lg:border-r border-white/15">
            <p className="stat-number-serif text-white mb-3">14<span className="text-[0.5em]">+</span></p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/70">Amenidades</p>
          </div>
          <div className="text-center px-6">
            <p className="stat-number-serif text-white mb-3" style={{fontSize: "clamp(2rem, 3.5vw, 3rem)", paddingTop: "0.5rem"}}>EDGE</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/70">Certificación</p>
          </div>
        </div>
      </section>

      <FooterDominica />
    </>
  );
}
