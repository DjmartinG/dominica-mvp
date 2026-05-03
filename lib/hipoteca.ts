/**
 * Cálculos para simulador de capacidad de endeudamiento
 * Basado en parámetros estándar Colombia 2026
 */

export const TASA_HIPOTECARIA_EA = 0.135;        // 13.5% EA
export const TASA_MENSUAL = Math.pow(1 + TASA_HIPOTECARIA_EA, 1 / 12) - 1;  // ≈ 1.061% mensual
export const PLAZO_MESES_ESTANDAR = 240;          // 20 años
export const REGLA_30 = 0.30;                     // Cuota máxima = 30% del ingreso
export const REGLA_40 = 0.40;                     // Cuota máxima = 40% del ingreso (perfil ajustado)
export const PORCENTAJE_GASTOS_NOTARIALES = 0.03; // ~3% del valor del inmueble (Pereira)

/**
 * Cuota mensual de un crédito hipotecario
 * Fórmula: P = C × [i(1+i)^n / ((1+i)^n - 1)]
 */
export function cuotaMensualCredito(monto: number, plazoMeses: number = PLAZO_MESES_ESTANDAR, tasaMensual: number = TASA_MENSUAL): number {
  if (monto <= 0) return 0;
  const factor = Math.pow(1 + tasaMensual, plazoMeses);
  return Math.round(monto * (tasaMensual * factor) / (factor - 1));
}

/**
 * Capacidad máxima de crédito según ingresos
 * Fórmula inversa: C = Cuota × [(1 - (1+i)^-n) / i]
 */
export function capacidadCredito(ingresos: number, regla: number = REGLA_30, plazoMeses: number = PLAZO_MESES_ESTANDAR, tasaMensual: number = TASA_MENSUAL): number {
  const cuotaMaxima = ingresos * regla;
  if (cuotaMaxima <= 0) return 0;
  const factor = Math.pow(1 + tasaMensual, -plazoMeses);
  return Math.round(cuotaMaxima * (1 - factor) / tasaMensual);
}

/**
 * Gastos notariales aproximados (3% del valor del inmueble en Pereira)
 */
export function gastosNotariales(valorInmueble: number): number {
  return Math.round(valorInmueble * PORCENTAJE_GASTOS_NOTARIALES);
}

/**
 * Análisis de viabilidad financiera completo
 */
export interface AnalisisFinanciero {
  ingresoTotal: number;
  cuotaMaximaRegla30: number;
  cuotaMaximaRegla40: number;
  capacidadCreditoMax: number;
  saldoAFinanciar: number;
  cuotaHipotecariaEstimada: number;
  cuotaInicialNecesaria: number;
  gastosNotariales: number;
  totalRecursosPropios: number;
  viabilidad: "verde" | "amarilla" | "roja";
  porcentajeUsoIngreso: number;
  mensaje: string;
}

export function analizarViabilidad(params: {
  ingresoTitular: number;
  ingresoCodeudor: number;
  valorNeto: number;
  cuotaInicial: number;
  esContado: boolean;
}): AnalisisFinanciero {
  const ingresoTotal = params.ingresoTitular + params.ingresoCodeudor;
  const cuotaMaximaRegla30 = ingresoTotal * REGLA_30;
  const cuotaMaximaRegla40 = ingresoTotal * REGLA_40;
  const capacidadCreditoMax = capacidadCredito(ingresoTotal);
  
  const saldoAFinanciar = params.esContado ? 0 : params.valorNeto - params.cuotaInicial;
  const cuotaHipotecariaEstimada = cuotaMensualCredito(saldoAFinanciar);
  const gastosNot = gastosNotariales(params.valorNeto);
  const totalRecursosPropios = params.cuotaInicial + gastosNot;
  
  let viabilidad: "verde" | "amarilla" | "roja" = "verde";
  let mensaje = "";
  let porcentajeUsoIngreso = 0;
  
  if (params.esContado) {
    viabilidad = "verde";
    mensaje = "Pago contado: no requiere análisis de capacidad de crédito.";
    porcentajeUsoIngreso = 0;
  } else if (ingresoTotal === 0) {
    viabilidad = "roja";
    mensaje = "Indica los ingresos para evaluar capacidad.";
  } else {
    porcentajeUsoIngreso = (cuotaHipotecariaEstimada / ingresoTotal) * 100;
    if (cuotaHipotecariaEstimada <= cuotaMaximaRegla30) {
      viabilidad = "verde";
      mensaje = `Capacidad CÓMODA. La cuota hipotecaria representa el ${porcentajeUsoIngreso.toFixed(1)}% de los ingresos (regla del 30%).`;
    } else if (cuotaHipotecariaEstimada <= cuotaMaximaRegla40) {
      viabilidad = "amarilla";
      mensaje = `Capacidad AJUSTADA. Cuota representa ${porcentajeUsoIngreso.toFixed(1)}% del ingreso. Algunos bancos aprueban hasta 40% con buen perfil.`;
    } else {
      viabilidad = "roja";
      mensaje = `Capacidad INSUFICIENTE. Cuota es ${porcentajeUsoIngreso.toFixed(1)}% del ingreso (excede 40% que aprueba la mayoría de bancos). Considera aplicar descuento o sumar codeudor.`;
    }
  }
  
  return {
    ingresoTotal,
    cuotaMaximaRegla30: Math.round(cuotaMaximaRegla30),
    cuotaMaximaRegla40: Math.round(cuotaMaximaRegla40),
    capacidadCreditoMax,
    saldoAFinanciar,
    cuotaHipotecariaEstimada,
    cuotaInicialNecesaria: params.cuotaInicial,
    gastosNotariales: gastosNot,
    totalRecursosPropios,
    viabilidad,
    porcentajeUsoIngreso,
    mensaje,
  };
}
