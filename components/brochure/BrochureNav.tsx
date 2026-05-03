"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "proyecto", label: "El Proyecto" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "tipologias", label: "Tipologías" },
  { id: "amenidades", label: "Amenidades" },
  { id: "recorrido", label: "Recorrido 360°" },
  { id: "etapas", label: "Etapas" },
];

export function BrochureNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:block">
      <ul className="space-y-3">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => scrollTo(s.id)}
              className="group flex items-center gap-3 justify-end"
              aria-label={`Ir a ${s.label}`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-caribe text-white px-3 py-1 rounded-full whitespace-nowrap ${
                  active === s.id ? "!opacity-100" : ""
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block rounded-full transition-all border-2 ${
                  active === s.id
                    ? "w-4 h-4 bg-turquesa border-caribe"
                    : "w-3 h-3 bg-white/70 border-caribe/40 hover:border-caribe"
                }`}
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
