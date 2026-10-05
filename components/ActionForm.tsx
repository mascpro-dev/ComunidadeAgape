"use client";

import { useState, type FormEvent } from "react";
import { FieldSelect } from "@/components/FieldSelect";
import { registrarMovimento } from "@/lib/movimento-db";

type Props = {
  kind: "oracao" | "celula" | "curso" | "quero-ir" | "checkin";
  extra?: string;
  button: string;
  ghost?: boolean;
  celulaId?: string;
  cursoId?: string;
};

export function ActionForm({ kind, extra, button, ghost, celulaId, cursoId }: Props) {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || data.get("crianca") || "").trim();
    setBusy(true);
    try {
      if (kind === "checkin") {
        const code = "AG-" + Math.random().toString(36).slice(2, 6).toUpperCase();
        const sala = String(data.get("turma") || "");
        const r = await registrarMovimento({
          tipo: "checkin_kids",
          nome,
          extra: sala,
          sala,
          codigo: code,
        });
        if (r.error) setMsg(r.error);
        else setMsg(`Check-in de ${nome} (${sala}). Código ${code}`);
      } else if (kind === "oracao") {
        const pedido = String(data.get("pedido") || "");
        const r = await registrarMovimento({ tipo: "oracao", nome: nome || "Anônimo", detalhe: pedido, extra: extra || "oração" });
        if (r.error) setMsg(r.error);
        else {
          setMsg("Pedido recebido. A gente ora com você.");
          form.reset();
        }
      } else if (kind === "curso") {
        const r = await registrarMovimento({
          tipo: "curso_inscricao",
          nome,
          extra: extra || "",
          cursoId,
        });
        if (r.error) setMsg(r.error);
        else setMsg(`${nome} inscrito(a) em ${extra}.`);
      } else if (kind === "celula") {
        const r = await registrarMovimento({
          tipo: "celula_pedido",
          nome,
          extra: extra || "",
          celulaId,
        });
        if (r.error) setMsg(r.error);
        else setMsg(`${nome} na lista da ${extra}. O host chama no zap.`);
      } else {
        const r = await registrarMovimento({
          tipo: "quero_ir",
          nome,
          extra: extra || "",
        });
        if (r.error) setMsg(r.error);
        else setMsg(`Fechado, ${nome}. O time de ${extra} te encontra.`);
      }
    } catch {
      setMsg("Não deu para salvar agora. Tente de novo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 grid gap-2">
      {kind === "checkin" ? (
        <>
          <input name="crianca" required placeholder="Nome da criança" className="field" />
          <FieldSelect name="turma" options={["Berçário", "Kids 2–5", "Kids 6–11"]} />
        </>
      ) : kind === "oracao" ? (
        <>
          <input name="nome" placeholder="Seu nome" className="field" />
          <textarea name="pedido" required rows={4} placeholder="Escreva o pedido." className="field" />
        </>
      ) : (
        <input name="nome" required placeholder="Seu nome" className="field" />
      )}
      <button type="submit" disabled={busy} className={ghost ? "btn-ghost" : "btn-gold"}>
        {busy ? "Salvando…" : button}
      </button>
      {msg ? <p className="text-sm text-gold">{msg}</p> : null}
    </form>
  );
}
