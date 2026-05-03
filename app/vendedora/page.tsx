"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAsesora } from "@/lib/useAsesora";
import asesores from "@/data/asesores.json";
import { ArrowRight, Lock, ArrowLeft } from "lucide-react";

export default function VendedoraLoginPage() {
  const router = useRouter();
  const { login } = useAsesora(false);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) return;
    const ok = login(codigo.trim());
    if (ok) {
      router.push("/vendedora/dashboard");
    } else {
      setError("Código no válido. Verifica e intenta de nuevo.");
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-navy via-navy-dark to-negro">
      <div className="absolute top-6 left-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-rojo text-xs tracking-[0.2em] uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/dominica-logo.png"
              alt="Dominica"
              className="h-12 w-auto object-contain mx-auto mb-6"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-rojo text-[11px] tracking-[0.4em] uppercase font-semibold">
              ─── Panel Asesora ───
            </p>
          </div>

          {/* Card login */}
          <div className="bg-white p-10 shadow-lift">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-navy flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl text-negro tracking-wide">Iniciar sesión</h1>
                <p className="text-[11px] tracking-[0.2em] uppercase text-gris">Acceso para asesores CG</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rojo mb-2 block">
                  Código de asesora
                </label>
                <input
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  placeholder="Ej: BETTY"
                  className="w-full bg-beige border border-gris-muyclaro px-4 py-4 text-negro text-lg font-semibold tracking-[0.15em] uppercase focus:outline-none focus:border-navy transition-colors"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-rojo text-xs tracking-wide">{error}</p>
              )}

              <button
                type="submit"
                disabled={!codigo.trim()}
                className="btn-cta w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ingresar al panel
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="w-full text-[11px] tracking-[0.2em] uppercase text-gris hover:text-rojo transition-colors py-2"
              >
                {showHint ? "Ocultar códigos" : "¿No recuerdas tu código?"}
              </button>

              {showHint && (
                <div className="bg-beige p-4 text-xs space-y-2">
                  <p className="text-gris uppercase tracking-[0.15em] mb-2">Códigos disponibles (demo):</p>
                  {asesores.map((a) => (
                    <button
                      key={a.codigo}
                      type="button"
                      onClick={() => setCodigo(a.codigo)}
                      className="w-full flex justify-between text-left hover:text-rojo transition-colors"
                    >
                      <span className="font-semibold tracking-[0.15em] uppercase">{a.codigo}</span>
                      <span className="text-gris">{a.nombre}</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          <p className="text-center text-white/40 text-[10px] tracking-[0.2em] uppercase mt-8">
            CG Constructora · Apartamentos Dominica
          </p>
        </div>
      </div>
    </div>
  );
}
