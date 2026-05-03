import apartamentos from "@/data/apartamentos.json";
import { Apto } from "./cotizador";

export interface Parqueadero {
  numero: string;
  tipo: string;
  valor: number;
  estado: "Disponible" | "Vendido" | "Reservado";
  aptoAsociado?: string;
}

/** Devuelve TODOS los parqueaderos del proyecto con su estado actual */
export function getParqueaderos(): Parqueadero[] {
  if (typeof window === "undefined") {
    return derivarParqueaderos({});
  }
  const raw = localStorage.getItem("dominica_inventario_overrides");
  const overrides: Record<string, string> = raw ? JSON.parse(raw) : {};
  return derivarParqueaderos(overrides);
}

function derivarParqueaderos(overrides: Record<string, string>): Parqueadero[] {
  const aptos = apartamentos as Apto[];
  return aptos.map((a) => {
    const estadoApto = overrides[a.id] || a.estado;
    return {
      numero: a.parqueadero.numero,
      tipo: a.parqueadero.tipo,
      valor: a.parqueadero.valor,
      estado: estadoApto as "Disponible" | "Vendido" | "Reservado",
      aptoAsociado: a.numero,
    };
  });
}

export function getParqueaderosDisponibles(excluirNumero?: string): Parqueadero[] {
  return getParqueaderos().filter(
    (p) => p.estado === "Disponible" || p.numero === excluirNumero
  );
}
