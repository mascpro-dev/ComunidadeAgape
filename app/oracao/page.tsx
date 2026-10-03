import Link from "next/link";
import { ActionForm } from "@/components/ActionForm";

export default function OracaoPage() {
  return (
    <div>
      <Link href="/mais" className="mb-2.5 inline-block text-sm font-bold text-gold">
        ← mais
      </Link>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Pedido de oração</h1>
      <p className="mb-3.5 mt-1.5 text-xs text-muted">A equipe de oração recebe e caminha com você.</p>
      <article className="card">
        <ActionForm kind="oracao" button="Enviar" />
      </article>
    </div>
  );
}
