import { CelulasList } from "@/components/CelulasList";
import { PageHeader } from "@/components/PageHeader";

export default function CelulasPage() {
  return (
    <div>
      <PageHeader
        kicker="Comunidade"
        title="Células"
        lead="A célula grande no topo é a mais perto do seu endereço. As outras ficam na faixa abaixo."
      />
      <CelulasList />
    </div>
  );
}
