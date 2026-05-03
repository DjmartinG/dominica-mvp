import Link from "next/link";
import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { ArrowLeft, Construction } from "lucide-react";

export default function BrochurePage() {
  return (
    <>
      <BannerCG />

      <main className="flex-1 bg-crema py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-caribe hover:text-caribe-dark mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <div className="card-dominica">
            <Construction className="w-16 h-16 text-cg-dorado mx-auto mb-4" />
            <h1 className="font-display text-3xl text-caribe mb-3">Brochure interactivo</h1>
            <p className="text-carbon mb-2">
              Esta sección se construye en la <strong>Sesión 2</strong>.
            </p>
            <p className="text-sm text-carbon/70 mb-6">
              Incluirá: Hero, El Proyecto, Ubicación, Tipologías, Amenidades (14), Recorrido 360° Kuula y Etapas.
            </p>
            <Link href="/cotizar" className="btn-primary">
              Ir directo al Cotizador (Sesión 3)
            </Link>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
