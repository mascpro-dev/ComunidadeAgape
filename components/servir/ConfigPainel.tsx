"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { patchConfig } from "@/lib/servir";
import { useServir } from "./ServirProvider";

export function ConfigPainel() {
  const { state, commit } = useServir();
  const cfg = state.config;

  return (
    <div>
      <header className="mb-6">
        <Link href="/servir" className="text-sm text-gold">
          ← Servir
        </Link>
        <h1 className="mt-2 font-display text-4xl leading-none">Configuração</h1>
        <p className="page-lead">O que muda o jeito da escala. Idioma, país e fuso ficam em português, Brasil e São Paulo.</p>
      </header>
      <div className="grid gap-3">
        <Bloco titulo="Escala automática" texto="Cada voluntário entra em no máximo um culto por dia.">
          <Toggle ligado={cfg.umaPorDia} onChange={(umaPorDia) => commit((s) => patchConfig(s, { umaPorDia }))} label="Um culto por dia" />
        </Bloco>
        <Bloco titulo="Validação de funções" texto="A pessoa só entra na escala automática depois que a função for validada.">
          <Toggle
            ligado={cfg.validarFuncao}
            onChange={(validarFuncao) => commit((s) => patchConfig(s, { validarFuncao }))}
            label="Validar função antes de escalar"
          />
        </Bloco>
        <Bloco titulo="Saúde da escala" texto="Conta dias, não cultos. Dois eventos no mesmo dia valem um dia.">
          <Toggle ligado={cfg.saudeAtiva} onChange={(saudeAtiva) => commit((s) => patchConfig(s, { saudeAtiva }))} label="Acompanhar o equilíbrio" />
          <label className="mt-3 flex items-center gap-3 text-sm">
            Limite de dias por semana
            <input
              className="field w-24"
              type="number"
              min={1}
              max={7}
              value={cfg.limiteDias}
              onChange={(e) => commit((s) => patchConfig(s, { limiteDias: Math.min(7, Math.max(1, Number(e.target.value) || 1)) }))}
            />
          </label>
          <div className="mt-3">
            <Toggle
              ligado={cfg.bloquearAcima}
              onChange={(bloquearAcima) => commit((s) => patchConfig(s, { bloquearAcima }))}
              label="A automática não passa do limite"
            />
          </div>
        </Bloco>
        <article className="card">
          <p className="font-medium">Onde fica salvo</p>
          <p className="meta">
            Departamentos, pessoas e escalas ficam neste navegador. O WhatsApp abre a mensagem pronta para você enviar. O envio sozinho, sem apertar, fica para quando houver a API da Meta.
          </p>
        </article>
      </div>
    </div>
  );
}

function Bloco({ titulo, texto, children }: { titulo: string; texto: string; children: ReactNode }) {
  return (
    <article className="card">
      <p className="font-medium">{titulo}</p>
      <p className="meta">{texto}</p>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function Toggle({ ligado, onChange, label }: { ligado: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" className="flex items-center gap-3 text-sm" onClick={() => onChange(!ligado)} aria-pressed={ligado}>
      <span className={`relative h-6 w-11 rounded-full ${ligado ? "bg-gold" : "bg-white/15"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-deep transition ${ligado ? "left-5" : "left-0.5"}`} />
      </span>
      {label}
    </button>
  );
}
