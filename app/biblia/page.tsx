import { BibleReader } from "@/components/BibleReader";
import { PageHeader } from "@/components/PageHeader";

export default function BibliaPage() {
  return (
    <div>
      <PageHeader
        kicker="Palavra"
        title="Bíblia"
        lead="Escolha o público — cada geração tem cor, desenho, versículos e trilha de leitura."
      />
      <BibleReader />
    </div>
  );
}
