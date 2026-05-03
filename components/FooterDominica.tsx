import { brand } from "@/lib/design-tokens";
import Link from "next/link";

export function FooterDominica() {
  return (
    <footer className="bg-negro text-white pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top: Logo Dominica grande + 3 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/15">
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/dominica-logo.png"
              style={{ filter: "brightness(0) invert(1)" }}
              alt="Apartamentos Dominica"
              className="h-14 w-auto object-contain mb-5"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                const sibling = (e.target as HTMLImageElement).nextElementSibling;
                if (sibling) (sibling as HTMLElement).style.display = "block";
              }}
            />
            <span style={{ display: "none" }} className="font-display text-3xl font-bold text-rojo tracking-[0.15em] block mb-5">
              DOMINICA
            </span>
            <p className="text-xs text-gris-claro leading-relaxed">
              Apartamentos NO VIS Premium<br/>
              {brand.proyecto.direccion}<br/><br/>
              {brand.empresa.razonSocial}<br/>
              NIT {brand.empresa.nit}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">Proyecto</h4>
            <ul className="space-y-3">
              <li><Link href="/brochure#proyecto" className="text-sm text-gris-claro hover:text-rojo transition-colors">El Proyecto</Link></li>
              <li><Link href="/brochure#tipologias" className="text-sm text-gris-claro hover:text-rojo transition-colors">Tipologías</Link></li>
              <li><Link href="/brochure#amenidades" className="text-sm text-gris-claro hover:text-rojo transition-colors">Amenidades</Link></li>
              <li><Link href="/brochure#recorrido" className="text-sm text-gris-claro hover:text-rojo transition-colors">Recorrido 360°</Link></li>
              <li><Link href="/brochure#etapas" className="text-sm text-gris-claro hover:text-rojo transition-colors">Etapas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li><a href={`https://wa.me/${brand.contacto.whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gris-claro hover:text-rojo transition-colors">{brand.contacto.whatsapp}</a></li>
              <li><a href={`https://instagram.com/${brand.contacto.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gris-claro hover:text-rojo transition-colors">{brand.contacto.instagram}</a></li>
              <li><Link href="/cotizar" className="text-sm text-gris-claro hover:text-rojo transition-colors">Cotizar online</Link></li>
              <li><Link href="/sala" className="text-sm text-gris-claro hover:text-rojo transition-colors">Sala de ventas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">Detalles</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gris-claro">{brand.fiduciaria}</li>
              <li className="text-sm text-gris-claro">Crédito {brand.creditoConstructor}</li>
              <li className="text-sm text-gris-claro">Certificación {brand.proyecto.certificacion}</li>
              <li className="text-sm text-gris-claro italic">{brand.empresa.fraseCorporativa}</li>
            </ul>
          </div>
        </div>

        {/* MIDDLE: Bloque aliados con logos CG + Triple A */}
        <div className="py-12 border-b border-white/15">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rojo text-center mb-8">
            ─── Aliados Estratégicos ───
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-20">
            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gris-claro">Gerencia y Comercializa</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/cg-logo.png"
                alt="CG Constructora"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                style={{ filter: "brightness(0) invert(1)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const sibling = (e.target as HTMLImageElement).nextElementSibling;
                  if (sibling) (sibling as HTMLElement).style.display = "block";
                }}
              />
              <span style={{ display: "none" }} className="font-display text-xl text-white">CG CONSTRUCTORA</span>
            </div>

            <div className="hidden sm:block w-px h-12 bg-white/20" />

            <div className="flex flex-col items-center gap-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gris-claro">Construye</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/triple-a-logo.png"
                alt="Triple A — Proyectos y Construcciones"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                style={{ filter: "brightness(0) invert(1)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  const sibling = (e.target as HTMLImageElement).nextElementSibling;
                  if (sibling) (sibling as HTMLElement).style.display = "block";
                }}
              />
              <span style={{ display: "none" }} className="font-display text-xl text-white">TRIPLE A</span>
            </div>
          </div>
        </div>

        {/* Bottom legal */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.15em] uppercase text-gris-claro">
          <p>© {new Date().getFullYear()} CG CONSTRUCTORA · TODOS LOS DERECHOS RESERVADOS</p>
          <p>IMÁGENES ILUSTRATIVAS · SUJETAS A MODIFICACIÓN</p>
        </div>
      </div>
    </footer>
  );
}
