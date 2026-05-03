import Link from "next/link";
import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { ArrowLeft, Calculator } from "lucide-react";

export default function CotizarPage() {
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
            <Calculator className="w-16 h-16 text-caribe mx-auto mb-4" />
            <h1 className="font-display text-3xl text-caribe mb-3">Cotizador</h1>
            <p className="text-carbon mb-2">
              Esta sección se construye en la <strong>Sesión 3</strong>.
            </p>
            <p className="text-sm text-carbon/70">
              Incluirá: selector apto disponible, parqueadero, depósito, plan de pago, validaciones de descuento, y resumen económico en tiempo real.
            </p>
          </div>
        </div>
      </main>

      <FooterDominica />
    </>
  );
}
