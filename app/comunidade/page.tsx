import { CommunityHub } from "@/components/CommunityHub";
import { PageHeader } from "@/components/PageHeader";

export default function ComunidadePage() {
  return (
    <div>
      <PageHeader
        kicker="A comunidade"
        title="Comunidade"
        lead="Feed da igreja, como um instagram da comunidade, e salas por tema: oração, jovens, famílias, missão."
      />
      <CommunityHub />
    </div>
  );
}
