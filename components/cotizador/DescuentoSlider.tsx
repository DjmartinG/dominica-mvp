"use client";

import { Percent, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { formatPct } from "@/lib/cotizador";

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export function DescuentoSlider({ value, onChange }: Props) {
  const min = 0.01;
  const max = 0.05;
  const step = 0.005;
  
  // Si el valor está en 0, lo dejamos en 0 hasta que el usuario interactúe
  const displayValue = value === 0 ? min : value;

  const colorByValue = displayValue <= 0.03 
    ? { color: "text-ok", bg: "bg-ok", icon: CheckCircle2, label: "Sin aprobación" }
    : displayValue <= 0.05 
    ? { color: "text-warn", bg: "bg-warn", icon: AlertTriangle, label: "Requiere Gerente Comercial" }
    : { color: "text-rojo", bg: "bg-rojo", icon: XCircle, label: "Requiere Gerencia General" };
  
  const Icon = colorByValue.icon;
  
  // Calcular posición del thumb en porcentaje
  const percentage = ((displayValue - min) / (max - min)) * 100;

  // Marcas en el slider
  const marks = [
    { val: 0.01, label: "1%" },
    { val: 0.02, label: "2%" },
    { val: 0.03, label: "3%" },
    { val: 0.04, label: "4%" },
    { val: 0.05, label: "5%" },
  ];

  return (
    <div className="bg-beige p-6 lg:p-8">
      {/* Header con valor grande */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-rojo mb-1 flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Descuento aplicado
          </label>
          <p className="text-[11px] text-gris">Mueve el slider entre 1% y 5%</p>
        </div>
        <div className="text-right">
          <p className={`font-display text-5xl ${colorByValue.color} leading-none`}>
            {formatPct(displayValue)}
          </p>
        </div>
      </div>

      {/* Slider mejorado */}
      <div className="relative mb-3 px-2">
        {/* Track de fondo */}
        <div className="relative h-2 bg-white rounded-full">
          {/* Track activo (gradiente verde→amarillo→rojo) */}
          <div
            className="absolute h-full rounded-full transition-all duration-200"
            style={{
              width: `${percentage}%`,
              background: displayValue <= 0.03 
                ? "linear-gradient(90deg, #2E7D32, #2E7D32)" 
                : displayValue <= 0.05
                ? "linear-gradient(90deg, #2E7D32, #F9A825)"
                : "linear-gradient(90deg, #2E7D32, #F9A825, #C62828)",
            }}
          />
          
          {/* Marcas verticales */}
          {marks.map((m) => {
            const pos = ((m.val - min) / (max - min)) * 100;
            return (
              <div
                key={m.val}
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-gris/40"
                style={{ left: `${pos}%` }}
              />
            );
          })}
        </div>

        {/* Input range nativo invisible encima */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={displayValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />

        {/* Thumb visual del slider */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full shadow-lift border-4 border-white ${colorByValue.bg} pointer-events-none transition-all duration-200`}
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Marcas con etiquetas */}
      <div className="relative h-6 px-2">
        {marks.map((m) => {
          const pos = ((m.val - min) / (max - min)) * 100;
          return (
            <button
              key={m.val}
              onClick={() => onChange(m.val)}
              className={`absolute top-0 -translate-x-1/2 text-[11px] font-semibold tracking-wide transition-colors ${
                Math.abs(displayValue - m.val) < 0.0025 ? "text-negro" : "text-gris hover:text-negro"
              }`}
              style={{ left: `${pos}%` }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Indicador de aprobación */}
      <div className={`mt-6 flex items-start gap-3 p-4 ${colorByValue.bg}/10 border-l-4 border-current ${colorByValue.color}`}>
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
            {colorByValue.label}
          </p>
          <p className="text-xs text-negro">
            {displayValue <= 0.03 && "Descuento dentro de política comercial. El asesor puede aplicarlo directamente."}
            {displayValue > 0.03 && displayValue <= 0.05 && "Descuento entre 3% y 5% requiere autorización del Gerente Comercial antes de cerrar la venta."}
            {displayValue > 0.05 && "Descuento mayor a 5% requiere autorización de Gerencia General."}
          </p>
        </div>
      </div>
    </div>
  );
}
