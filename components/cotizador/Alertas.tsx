"use client";

import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { Alerta } from "@/lib/cotizador";

const STYLE_BY_SEVERITY: Record<string, { bg: string; border: string; text: string; icon: typeof CheckCircle2 }> = {
  ok: { bg: "bg-ok/10", border: "border-ok", text: "text-ok", icon: CheckCircle2 },
  warn: { bg: "bg-warn/10", border: "border-warn", text: "text-warn", icon: AlertTriangle },
  alert: { bg: "bg-alert/10", border: "border-alert", text: "text-alert", icon: XCircle },
  info: { bg: "bg-cielo/10", border: "border-cielo", text: "text-cielo", icon: Info },
};

export function Alertas({ alertas }: { alertas: Alerta[] }) {
  if (alertas.length === 0) return null;

  return (
    <div className="space-y-2">
      {alertas.map((a) => {
        const cfg = STYLE_BY_SEVERITY[a.severidad];
        const Icon = cfg.icon;
        return (
          <div
            key={a.id}
            className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${cfg.bg} ${cfg.border}`}
          >
            <Icon className={`w-5 h-5 ${cfg.text} flex-shrink-0 mt-0.5`} />
            <p className={`text-sm font-semibold ${cfg.text}`}>{a.mensaje}</p>
          </div>
        );
      })}
    </div>
  );
}
