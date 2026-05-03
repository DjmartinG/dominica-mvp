"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import asesores from "@/data/asesores.json";

export interface AsesoraSession {
  codigo: string;
  nombre: string;
  email: string;
  celular: string;
  loginAt: string;
}

export function useAsesora(redirectIfNotLogged = true) {
  const [asesora, setAsesora] = useState<AsesoraSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("dominica_vendedora_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AsesoraSession;
        setAsesora(parsed);
      } catch {
        localStorage.removeItem("dominica_vendedora_session");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !asesora && redirectIfNotLogged) {
      router.push("/vendedora");
    }
  }, [loading, asesora, redirectIfNotLogged, router]);

  const login = (codigo: string): boolean => {
    const a = asesores.find((x) => x.codigo.toUpperCase() === codigo.toUpperCase());
    if (!a) return false;
    const session: AsesoraSession = {
      codigo: a.codigo,
      nombre: a.nombre,
      email: a.email,
      celular: a.celular,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem("dominica_vendedora_session", JSON.stringify(session));
    setAsesora(session);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("dominica_vendedora_session");
    setAsesora(null);
    router.push("/vendedora");
  };

  return { asesora, loading, login, logout };
}
