import { BibleReader } from "@/components/BibleReader";
import { PageHeader } from "@/components/PageHeader";

export default function BibliaPage() {
  return (
    <div>
      <PageHeader kicker="Palavra" title="Bíblia" lead="Leitura online para a casa — Almeida, livro e capítulo." />
      <BibleReader />
    </div>
  );
}
