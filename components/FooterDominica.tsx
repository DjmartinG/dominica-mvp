import { brand } from "@/lib/design-tokens";
import Link from "next/link";

export function FooterDominica() {
  return (
    <footer className="bg-negro text-white pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-white/15">
          {/* Brand: logo blanco oficial */}
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.assets.logoDominicaBlanco}
              alt="Apartamentos Dominica"
              className="h-12 w-auto object-contain mb-5"
            />
            <p className="text-xs text-gris-claro leading-relaxed">
              Apartamentos NO VIS Premium<br/>
              {brand.proyecto.direccion}<br/><br/>
              {brand.empresa.razonSocial}<br/>
              NIT {brand.empresa.nit}<br/><br/>
              <em className="text-rojo italic">{brand.empresa.fraseCorporativa}</em>
            </p>
          </div>

          {/* Proyecto */}
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

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">Contacto</h4>
            <ul className="space-y-3">
              <li><a href={`https://wa.me/${brand.contacto.whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gris-claro hover:text-rojo transition-colors">{brand.contacto.whatsapp}</a></li>
              <li><a href={`https://instagram.com/${brand.contacto.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gris-claro hover:text-rojo transition-colors">{brand.contacto.instagram}</a></li>
              <li><Link href="/cotizar" className="text-sm text-gris-claro hover:text-rojo transition-colors">Cotizar online</Link></li>
              <li><Link href="/sala" className="text-sm text-gris-claro hover:text-rojo transition-colors">Sala de ventas</Link></li>
            </ul>
          </div>

          {/* Aliados */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">Aliados</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gris-claro">{brand.fiduciaria}</li>
              <li className="text-sm text-gris-claro">Crédito {brand.creditoConstructor}</li>
              <li className="text-sm text-gris-claro">Certificación {brand.proyecto.certificacion}</li>
              <li className="text-sm text-gris-claro">Socio comercial {brand.socio}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.15em] uppercase text-gris-claro">
          <p>© {new Date().getFullYear()} CG CONSTRUCTORA · TODOS LOS DERECHOS RESERVADOS</p>
          <p>IMÁGENES ILUSTRATIVAS · SUJETAS A MODIFICACIÓN</p>
        </div>
      </div>
    </footer>
  );
}
