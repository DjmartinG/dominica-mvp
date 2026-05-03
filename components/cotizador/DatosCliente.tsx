"use client";

import { User, FileText, Phone, Mail } from "lucide-react";
import { Cliente } from "@/lib/cotizador";

interface Props {
  cliente: Cliente;
  onChange: (c: Cliente) => void;
}

export function DatosCliente({ cliente, onChange }: Props) {
  const update = (k: keyof Cliente, v: string) => onChange({ ...cliente, [k]: v });

  return (
    <div>
      <h3 className="font-display text-caribe text-xl mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Datos del cliente
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-caribe uppercase tracking-widest block mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            value={cliente.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder="Ej: Juan Pérez Rodríguez"
            className="w-full bg-white border-2 border-turquesa-light rounded-xl px-4 py-3 text-carbon focus:outline-none focus:border-caribe transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-caribe uppercase tracking-widest block mb-1 flex items-center gap-1">
            <FileText className="w-3 h-3" /> Documento *
          </label>
          <input
            type="text"
            value={cliente.documento}
            onChange={(e) => update("documento", e.target.value)}
            placeholder="CC 1.234.567.890"
            className="w-full bg-white border-2 border-turquesa-light rounded-xl px-4 py-3 text-carbon focus:outline-none focus:border-caribe transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-caribe uppercase tracking-widest block mb-1 flex items-center gap-1">
            <Phone className="w-3 h-3" /> Celular *
          </label>
          <input
            type="tel"
            value={cliente.celular}
            onChange={(e) => update("celular", e.target.value)}
            placeholder="3001234567"
            className="w-full bg-white border-2 border-turquesa-light rounded-xl px-4 py-3 text-carbon focus:outline-none focus:border-caribe transition-colors"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-caribe uppercase tracking-widest block mb-1 flex items-center gap-1">
            <Mail className="w-3 h-3" /> Correo electrónico
          </label>
          <input
            type="email"
            value={cliente.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="cliente@ejemplo.com"
            className="w-full bg-white border-2 border-turquesa-light rounded-xl px-4 py-3 text-carbon focus:outline-none focus:border-caribe transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
