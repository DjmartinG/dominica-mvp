import reglas from "@/data/reglas-comerciales.json";

export type PlanPago = "Plan 30/70 Estándar" | "Plan Contado";
export type EstadoSeguimiento = "Cotizado" | "Visitó" | "Reservó" | "Vendió" | "Descartó";

export interface Apto {
  id: string;
  numero: string;
  torre: number;
  piso: number;
  tipologia: string;
  vista: string;
  color: string;
  areaConstruida: number;
  areaBalcon: number;
  areaZonaVerde: number;
  areaTerraza: number;
  areaVendible: number;
  lista: string;
  valorM2: number;
  primaAltura: number;
  primaVista: number;
  valorApartamento: number;
  parqueadero: { numero: string; tipo: string; valor: number };
  estado: string;
}

export interface Deposito {
  id: string;
  nombre: string;
  area: number;
  precioM2: number;
  valor: number;
  estado: string;
}

export interface Cliente {
  nombre: string;
  documento: string;
  celular: string;
  email: string;
}

export interface Asesor {
  codigo: string;
  nombre: string;
  email: string;
  celular: string;
}

export interface Cotizacion {
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  cliente: Cliente;
  asesor: Asesor | null;
  apto: Apto;
  conParqueadero: boolean;
  deposito: Deposito;
  plan: PlanPago;
  descuento: number;
  subtotal: number;
  valorDescuento: number;
  valorNeto: number;
  cuotaInicial: number;
  cuotaInicialPct: number;
  saldoSubrogacion: number;
  numCuotas: number;
  cuotaMensual: number;
  separacion: number;
  cronograma: Cuota[];
  estadoSeguimiento: EstadoSeguimiento;
  notasAsesor: string;
  createdAt: string;
}

export interface Cuota {
  numero: number | string;
  fecha: string;
  descripcion: string;
  valor: number;
  acumulado: number;
  saldoPendiente: number;
}

// === CÁLCULOS ===

export function calcularSubtotal(apto: Apto, conParqueadero: boolean, deposito: Deposito): number {
  let total = apto.valorApartamento;
  if (conParqueadero) total += apto.parqueadero.valor;
  total += deposito.valor;
  return total;
}

export function calcularValorNeto(subtotal: number, descuentoPct: number): {
  valorDescuento: number;
  valorNeto: number;
} {
  const valorDescuento = -Math.round(subtotal * descuentoPct);
  return {
    valorDescuento,
    valorNeto: subtotal + valorDescuento,
  };
}

export function calcularCuotaInicial(valorNeto: number, plan: PlanPago): {
  cuotaInicialPct: number;
  cuotaInicial: number;
  saldoSubrogacion: number;
} {
  let pct: number;
  if (plan === "Plan Contado") {
    pct = 1;
  } else {
    pct = reglas.cuotaInicialPctEstandar; // 30%
  }
  const cuotaInicial = Math.round(valorNeto * pct);
  return {
    cuotaInicialPct: pct,
    cuotaInicial,
    saldoSubrogacion: valorNeto - cuotaInicial,
  };
}

export function calcularCronograma(
  valorNeto: number,
  plan: PlanPago,
  numCuotas: number = reglas.numCuotasEstandar
): Cuota[] {
  const cuotas: Cuota[] = [];
  const fechaSep = new Date(reglas.fechaSeparacion);
  const fechaP1 = new Date(reglas.fechaPrimerPago);
  const fechaSubr = new Date(reglas.fechaEntregaProyectada);

  if (plan === "Plan Contado") {
    cuotas.push({
      numero: 0,
      fecha: fechaSep.toISOString(),
      descripcion: "Pago único contado",
      valor: valorNeto,
      acumulado: valorNeto,
      saldoPendiente: 0,
    });
    return cuotas;
  }

  const { cuotaInicial } = calcularCuotaInicial(valorNeto, plan);
  const separacion = reglas.separacionMinima;
  const restanteCuotaInicial = cuotaInicial - separacion;
  const cuotaMensual = Math.round(restanteCuotaInicial / numCuotas);

  // Cuota 0: Separación
  cuotas.push({
    numero: 0,
    fecha: fechaSep.toISOString(),
    descripcion: "Separación / Reserva",
    valor: separacion,
    acumulado: separacion,
    saldoPendiente: valorNeto - separacion,
  });

  // Cuotas mensuales 1..N
  let acum = separacion;
  for (let i = 1; i <= numCuotas; i++) {
    const fecha = new Date(fechaP1);
    fecha.setMonth(fecha.getMonth() + (i - 1));
    acum += cuotaMensual;
    cuotas.push({
      numero: i,
      fecha: fecha.toISOString(),
      descripcion: `Cuota mensual #${i}`,
      valor: cuotaMensual,
      acumulado: acum,
      saldoPendiente: valorNeto - acum,
    });
  }

  // Subrogación final
  const subrogacionFinal = valorNeto - acum;
  cuotas.push({
    numero: "S",
    fecha: fechaSubr.toISOString(),
    descripcion: "Subrogación / Última cuota",
    valor: subrogacionFinal,
    acumulado: valorNeto,
    saldoPendiente: 0,
  });

  return cuotas;
}

// === VALIDACIONES ===

export type SeveridadAlerta = "ok" | "warn" | "alert" | "info";

export interface Alerta {
  id: string;
  severidad: SeveridadAlerta;
  mensaje: string;
}

export function validarDescuento(descuentoPct: number): Alerta {
  if (descuentoPct === 0) {
    return { id: "desc", severidad: "info", mensaje: "Sin descuento aplicado." };
  }
  if (descuentoPct <= reglas.descuentoMaxLibre) {
    return {
      id: "desc",
      severidad: "ok",
      mensaje: `Descuento ${(descuentoPct * 100).toFixed(1)}% dentro de política. Sin aprobación requerida.`,
    };
  }
  if (descuentoPct <= reglas.descuentoMaxConAprobacion) {
    return {
      id: "desc",
      severidad: "warn",
      mensaje: `Descuento ${(descuentoPct * 100).toFixed(1)}% requiere aprobación de Gerente Comercial.`,
    };
  }
  return {
    id: "desc",
    severidad: "alert",
    mensaje: `Descuento ${(descuentoPct * 100).toFixed(1)}% excede política. Requiere Gerencia General.`,
  };
}

export function validarApto(apto: Apto | null): Alerta | null {
  if (!apto) return { id: "apto", severidad: "info", mensaje: "Selecciona un apartamento." };
  if (apto.estado === "Vendido") {
    return { id: "apto", severidad: "alert", mensaje: "Este apartamento está VENDIDO. No cotizable." };
  }
  if (apto.estado === "Reservado") {
    return {
      id: "apto",
      severidad: "warn",
      mensaje: "Apartamento RESERVADO. Verificar disponibilidad antes de cotizar.",
    };
  }
  return { id: "apto", severidad: "ok", mensaje: "Apartamento disponible para cotizar." };
}

export function validarDeposito(deposito: Deposito): Alerta {
  if (deposito.id === "sin") {
    return { id: "dep", severidad: "info", mensaje: "Sin depósito incluido." };
  }
  if (deposito.estado !== "Disponible") {
    return { id: "dep", severidad: "alert", mensaje: `Depósito ${deposito.nombre} está vendido.` };
  }
  return { id: "dep", severidad: "ok", mensaje: `Depósito ${deposito.nombre} disponible.` };
}

// === HELPERS ===

let consecutivo = 1;
export function generarNumeroCotizacion(): string {
  // En MVP: timestamp + counter
  if (typeof window !== "undefined") {
    const stored = parseInt(localStorage.getItem("dominica_cot_counter") || "0");
    consecutivo = stored + 1;
    localStorage.setItem("dominica_cot_counter", String(consecutivo));
  }
  const padded = String(consecutivo).padStart(3, "0");
  const year = new Date().getFullYear();
  return `DOM-T4-${year}-${padded}`;
}

export function calcularFechaVencimiento(): string {
  const f = new Date();
  f.setDate(f.getDate() + reglas.vigenciaDias);
  return f.toISOString();
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(value: number): string {
  return `${value.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
