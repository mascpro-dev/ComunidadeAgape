"use client";

import { useEffect, useRef, useState } from "react";

type Opt = { value: string; label: string };

type Props = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<string | Opt>;
  required?: boolean;
};

function normalizar(options: Props["options"]): Opt[] {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

export function FieldSelect({ name, value, defaultValue, onChange, options, required }: Props) {
  const opts = normalizar(options);
  const [interno, setInterno] = useState(defaultValue || opts[0]?.value || "");
  const atual = value ?? interno;
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const rotulo = opts.find((o) => o.value === atual)?.label ?? atual;

  useEffect(() => {
    function fechar(e: MouseEvent) {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    }
    document.addEventListener("mousedown", fechar);
    return () => document.removeEventListener("mousedown", fechar);
  }, []);

  function escolher(v: string) {
    if (value === undefined) setInterno(v);
    onChange?.(v);
    setAberto(false);
  }

  return (
    <div ref={caixa} className="relative">
      {name ? <input type="hidden" name={name} value={atual} required={required} /> : null}
      <button
        type="button"
        className="field flex items-center justify-between gap-2 text-left text-ink"
        aria-expanded={aberto}
        onClick={() => setAberto((a) => !a)}
      >
        <span>{rotulo}</span>
        <span className="text-gold" aria-hidden>
          {aberto ? "▴" : "▾"}
        </span>
      </button>
      {aberto ? (
        <ul className="absolute bottom-full z-[60] mb-1 max-h-56 w-full overflow-auto rounded-xl border border-gold/40 bg-deep py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          {opts.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                className={`w-full px-3.5 py-2.5 text-left text-sm ${
                  o.value === atual ? "bg-gold/15 font-semibold text-gold" : "text-gold hover:bg-white/10"
                }`}
                onClick={() => escolher(o.value)}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
