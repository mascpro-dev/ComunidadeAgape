"use client";

import { useState, type FormEvent } from "react";
import { FieldSelect } from "@/components/FieldSelect";
type Props = {
  kind: "oracao" | "celula" | "curso" | "quero-ir" | "checkin";
  extra?: string;
  button: string;
  ghost?: boolean;
};

export function ActionForm({ kind, extra, button, ghost }: Props) {
  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || data.get("crianca") || "").trim();
    if (kind === "checkin") {
      const code = "AG-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      setMsg(`Check-in de ${nome} (${data.get("turma")}). Código ${code}`);
    } else if (kind === "oracao") {
      setMsg("Pedido recebido. A gente ora com você.");
      e.currentTarget.reset();
    } else if (kind === "curso") {
      setMsg(`${nome} inscrito(a) em ${extra}.`);
    } else if (kind === "celula") {
      setMsg(`${nome} na lista da ${extra}. O host chama no zap.`);
    } else {
      setMsg(`Fechado, ${nome}. O time de ${extra} te encontra.`);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 grid gap-2">
      {kind === "checkin" ? (
        <>
          <input name="crianca" required placeholder="Nome da criança" className="field" />
          <FieldSelect
            name="turma"
            options={["Berçário", "Kids 2–5", "Kids 6–11"]}
          />
        </>
      ) : kind === "oracao" ? (
        <>
          <input name="nome" placeholder="Seu nome" className="field" />
          <textarea name="pedido" required rows={4} placeholder="Escreva o pedido." className="field" />
        </>
      ) : (
        <input name="nome" required placeholder="Seu nome" className="field" />
      )}
      <button type="submit" className={ghost ? "btn-ghost" : "btn-gold"}>
        {button}
      </button>
      {msg ? <p className="text-sm text-gold">{msg}</p> : null}
    </form>
  );
}
