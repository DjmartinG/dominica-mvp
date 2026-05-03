import Link from "next/link";
import { brand } from "@/lib/design-tokens";
import { Calculator, MessageCircle, MapPin } from "lucide-react";

export function CierreComercial() {
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-navy text-white overflow-hidden">
      {/* Background con render sutil */}
      <div
        className="absolute inset-0 opacity-15 grayscale"
        style={{
          backgroundImage: `url(${brand.assets.banners[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="eyebrow !text-rojo mb-6">¿Listo para tu nuevo hogar?</p>
        <h2 className="font-display text-4xl lg:text-6xl text-white leading-tight mb-6 tracking-wide">
          Comienza a vivir la <em className="text-rojo italic">esencia del Caribe</em>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-12 text-lg">
          Construye tu cotización personalizada en menos de 5 minutos. Selecciona tu apartamento, plan de pago, y recibe la propuesta directo a tu WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/cotizar"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-rojo hover:bg-rojo-dark text-white font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-300 group"
          >
            <Calculator className="w-5 h-5" />
            Cotizar mi apartamento
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href={`https://wa.me/${brand.contacto.whatsappDigits}?text=${encodeURIComponent("Hola, me interesa Apartamentos Dominica. Quiero información.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/40 hover:bg-white/10 text-white font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Hablar por WhatsApp
          </a>
        </div>

        {/* Sala de ventas info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-white/15">
          <div className="text-center">
            <MapPin className="w-6 h-6 text-rojo mx-auto mb-3" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-2">Sala de Ventas</p>
            <p className="text-sm">{brand.proyecto.direccion}</p>
          </div>
          <div className="text-center">
            <MessageCircle className="w-6 h-6 text-rojo mx-auto mb-3" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-2">WhatsApp</p>
            <p className="text-sm">{brand.contacto.whatsapp}</p>
          </div>
          <div className="text-center">
            <Calculator className="w-6 h-6 text-rojo mx-auto mb-3" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-2">Cotiza Online</p>
            <Link href="/cotizar" className="text-sm hover:text-rojo transition-colors">Construye tu propuesta</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
