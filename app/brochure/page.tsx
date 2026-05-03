import { NavTop } from "@/components/NavTop";
import { TopBar } from "@/components/TopBar";
import { FooterDominica } from "@/components/FooterDominica";
import { HeroCarousel } from "@/components/brochure/HeroCarousel";
import { ElProyecto } from "@/components/brochure/ElProyecto";
import { Ubicacion } from "@/components/brochure/Ubicacion";
import { Tipologias } from "@/components/brochure/Tipologias";
import { Amenidades } from "@/components/brochure/Amenidades";
import { Recorrido360 } from "@/components/brochure/Recorrido360";
import { Etapas } from "@/components/brochure/Etapas";
import { CierreComercial } from "@/components/brochure/CierreComercial";
import { CTAFloat } from "@/components/brochure/CTAFloat";

export default function BrochurePage() {
  return (
    <>
      <TopBar />
      <NavTop />

      <main>
        <HeroCarousel />
        <ElProyecto />
        <Ubicacion />
        <Tipologias />
        <Amenidades />
        <Recorrido360 />
        <Etapas />
        <CierreComercial />
      </main>

      <CTAFloat />

      <FooterDominica />
    </>
  );
}
