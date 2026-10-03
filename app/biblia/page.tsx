import { BibleReader } from "@/components/BibleReader";
import { PageHeader } from "@/components/PageHeader";

export default function BibliaPage() {
  return (
    <div>
      <PageHeader
        kicker="Palavra"
        title="Bíblia"
        lead="Almeida, NAA e NTLH — com devocional para jovens, adolescentes, infantil, homens, mulheres, família e empresários."
      />
      <BibleReader />
    </div>
  );
}
