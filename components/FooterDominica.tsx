import { brand } from "@/lib/design-tokens";
import { MessageCircle, Instagram, Globe, MapPin } from "lucide-react";

export function FooterDominica() {
  return (
    <footer className="bg-cg-navy text-white border-t-4 border-cg-dorado">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Col 1 — Empresa */}
          <div>
            <h3 className="text-cg-dorado font-display text-lg mb-3 tracking-wide">
              {brand.empresa.razonSocial}
            </h3>
            <p className="text-sm text-white/80 mb-1">NIT {brand.empresa.nit}</p>
            <p className="text-sm text-white/80 mb-1 italic">{brand.empresa.fraseCorporativa}</p>
            <p className="text-xs text-white/60 mt-3">
              Fiduciaria: {brand.fiduciaria}<br/>
              Crédito constructor: {brand.creditoConstructor}<br/>
              Certificación: {brand.proyecto.certificacion}
            </p>
          </div>

          {/* Col 2 — Proyecto */}
          <div>
            <h3 className="text-cg-dorado font-display text-lg mb-3 tracking-wide">
              {brand.proyecto.nombreCompleto}
            </h3>
            <p className="text-sm text-white/80 flex items-start gap-2 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cg-dorado" />
              <span>{brand.proyecto.direccion}</span>
            </p>
            <p className="text-xs text-white/60">
              {brand.proyecto.estructura} · {brand.proyecto.categoria}
            </p>
          </div>

          {/* Col 3 — Contacto */}
          <div>
            <h3 className="text-cg-dorado font-display text-lg mb-3 tracking-wide">Contacto</h3>
            <div className="space-y-2 text-sm text-white/80">
              <a
                href={`https://wa.me/${brand.contacto.whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-turquesa transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-cg-dorado" />
                {brand.contacto.whatsapp}
              </a>
              <a
                href={`https://instagram.com/${brand.contacto.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-turquesa transition-colors"
              >
                <Instagram className="w-4 h-4 text-cg-dorado" />
                {brand.contacto.instagram}
              </a>
              <a
                href={`https://${brand.contacto.web}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-turquesa transition-colors"
              >
                <Globe className="w-4 h-4 text-cg-dorado" />
                {brand.contacto.web}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cg-dorado/30 pt-4 text-center text-xs text-white/50">
          <p>© {new Date().getFullYear()} {brand.empresa.razonSocial}. Todos los derechos reservados.</p>
          <p className="mt-1">
            Las imágenes son representación ilustrativa del proyecto. Sujetas a modificaciones.
            Precios sujetos a cambios sin previo aviso.
          </p>
        </div>
      </div>
    </footer>
  );
}
