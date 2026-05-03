import { brand } from "@/lib/design-tokens";

interface BannerCGProps {
  variant?: "full" | "compact";
}

export function BannerCG({ variant = "full" }: BannerCGProps) {
  return (
    <header className="banner-cg w-full">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo CG placeholder */}
        <div className="flex items-center gap-3">
          <div className="bg-cg-dorado/10 border border-cg-dorado/40 rounded-lg px-4 py-2">
            <span className="text-cg-dorado text-xs italic font-light">
              [ Logo CG Constructora ]
            </span>
          </div>
          {variant === "full" && (
            <div className="hidden sm:block">
              <p className="text-white text-sm font-semibold tracking-wide">
                {brand.empresa.razonSocial}
              </p>
              <p className="text-cg-dorado text-xs italic">
                {brand.empresa.fraseCorporativa}
              </p>
            </div>
          )}
        </div>

        {/* Co-firma proyecto */}
        <div className="text-right">
          <p className="text-cg-dorado text-xs font-semibold tracking-widest uppercase">
            Proyecto
          </p>
          <p className="text-white font-bold text-sm sm:text-base tracking-wide">
            {brand.proyecto.nombreCompleto}
          </p>
        </div>
      </div>
    </header>
  );
}
