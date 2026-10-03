import { AudioFeed } from "@/components/AudioFeed";
import { PageHeader } from "@/components/PageHeader";

export default function PalavraPage() {
  return (
    <div>
      <PageHeader
        kicker="Liderança"
        title="Áudios"
        lead="O pastor e os líderes enviam a Palavra, avisos e devocionais para a igreja ouvir no tempo dela."
      />
      <AudioFeed />
    </div>
  );
}
