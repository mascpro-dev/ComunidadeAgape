import { ActionForm } from "@/components/ActionForm";
import { PageHeader } from "@/components/PageHeader";

export default function OracaoPage() {
  return (
    <div>
      <PageHeader
        backHref="/mais"
        backLabel="mais"
        kicker="Cuidado"
        title="Pedido de oração"
        lead="A equipe de oração recebe e caminha com você."
      />
      <article className="card md:max-w-xl">
        <ActionForm kind="oracao" button="Enviar pedido" />
      </article>
    </div>
  );
}
