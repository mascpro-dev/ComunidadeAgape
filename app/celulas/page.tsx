import { CelulasList } from "@/components/CelulasList";
import { PageHeader } from "@/components/PageHeader";

export default function CelulasPage() {
  return (
    <div>
      <PageHeader
        kicker="Comunidade"
        title="Células"
        lead="Comunhão, estudo bíblico e apoio prático em grupos menores, no bairro e na cidade."
      />
      <CelulasList />
    </div>
  );
}
