import { BannerCG } from "@/components/BannerCG";
import { FooterDominica } from "@/components/FooterDominica";
import { HeroCarousel } from "@/components/brochure/HeroCarousel";
import { ElProyecto } from "@/components/brochure/ElProyecto";
import { Ubicacion } from "@/components/brochure/Ubicacion";
import { Tipologias } from "@/components/brochure/Tipologias";
import { Amenidades } from "@/components/brochure/Amenidades";
import { Recorrido360 } from "@/components/brochure/Recorrido360";
import { Etapas } from "@/components/brochure/Etapas";
import { BrochureNav } from "@/components/brochure/BrochureNav";
import { CTAFlotante } from "@/components/brochure/CTAFlotante";
import { Divider } from "@/components/brochure/Divider";

export default function BrochurePage() {
  return (
    <>
      <BannerCG variant="compact" ghost />

      <main className="relative">
        <div id="hero">
          <HeroCarousel />
        </div>
        <ElProyecto />
        <Divider />
        <Ubicacion />
        <Divider />
        <Tipologias />
        <Amenidades />
        <Recorrido360 />
        <Etapas />
      </main>

      <BrochureNav />
      <CTAFlotante />

      <FooterDominica />
    </>
  );
}
