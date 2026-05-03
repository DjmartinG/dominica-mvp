"use client";

import { MessageCircle, Download, Printer, Save } from "lucide-react";
import { Cotizacion, formatCOP } from "@/lib/cotizador";
import { brand } from "@/lib/design-tokens";

interface Props {
  cotizacion: Cotizacion | null;
  disabled: boolean;
  onGuardar: () => void;
}

export function AccionesFinales({ cotizacion, disabled, onGuardar }: Props) {
  const handleWhatsApp = () => {
    if (!cotizacion) return;
    const num = cotizacion.cliente.celular.replace(/\D/g, "");
    const numWA = num.startsWith("57") ? num : `57${num}`;
    
    const mensaje = `¡Hola ${cotizacion.cliente.nombre}! 👋

Te comparto la cotización del Apartamento ${cotizacion.apto.numero} (${cotizacion.apto.tipologia}) del proyecto Apartamentos Dominica:

📍 ${brand.proyecto.direccion}
🏠 ${cotizacion.apto.tipologia} · ${cotizacion.apto.areaVendible} m²
💰 Valor total: ${formatCOP(cotizacion.valorNeto)}
📊 Plan: ${cotizacion.plan}
💵 Cuota inicial: ${formatCOP(cotizacion.cuotaInicial)}

Cotización N° ${cotizacion.numero}
Vigente hasta ${new Date(cotizacion.fechaVencimiento).toLocaleDateString("es-CO")}

${cotizacion.asesor ? `Tu asesor: ${cotizacion.asesor.nombre}` : ""}
CG Constructora · Apartamentos Dominica
📞 ${brand.contacto.whatsapp}`;

    const url = num
      ? `https://wa.me/${numWA}?text=${encodeURIComponent(mensaje)}`
      : `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, "_blank");
  };

  const handlePrint = () => {
    if (!cotizacion) return;
    window.print();
  };

  return (
    <div className="card-dominica !p-5 bg-gradient-to-br from-caribe to-caribe-dark text-white">
      <h3 className="font-display text-xl mb-4">¡Lista la cotización!</h3>
      <p className="text-turquesa text-sm mb-5">
        Comparte con el cliente o guárdala para seguimiento.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <button
          onClick={handleWhatsApp}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-caribe-dark font-bold hover:bg-turquesa transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle className="w-5 h-5" />
          Enviar por WhatsApp
        </button>
        <button
          onClick={onGuardar}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cielo text-white font-bold hover:bg-cielo/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          Guardar cotización
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handlePrint}
          disabled={disabled}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all disabled:opacity-50 text-sm"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </button>
        <button
          disabled
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white/50 font-semibold text-sm"
          title="Descargar PDF — Sesión 4"
        >
          <Download className="w-4 h-4" />
          PDF (próx.)
        </button>
      </div>

      {disabled && (
        <p className="text-xs text-turquesa mt-3 italic">
          Completa los datos del cliente y selecciona un apartamento para enviar.
        </p>
      )}
    </div>
  );
}
