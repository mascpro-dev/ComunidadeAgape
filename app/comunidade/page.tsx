import { CommunityHub } from "@/components/CommunityHub";
import { PageHeader } from "@/components/PageHeader";

export default function ComunidadePage() {
  return (
    <div>
      <PageHeader
        kicker="A casa"
        title="Comunidade"
        lead="Feed da igreja, como um instagram da casa, e salas por tema: oração, jovens, famílias, missão."
      />
      <CommunityHub />
    </div>
  );
}
