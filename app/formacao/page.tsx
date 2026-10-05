import Link from "next/link";
import { ministeriosNaAgenda, type ItemGeracao, type Ministerio } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { fotoCapa, fotos } from "@/lib/fotos";

function postersDe(m: Ministerio, tipo?: ItemGeracao["tipo"]) {
  const itens = tipo ? m.catalogo.filter((i) => i.tipo === tipo) : m.catalogo;
  return itens.map((i) => ({
    href: i.href || `/formacao/${m.id}`,
    src: fotoCapa(i.capa),
    title: i.titulo,
    kicker: i.kicker,
  }));
}

export default function FormacaoPage() {
  const ministerios = ministeriosNaAgenda();
  return (
    <div>
      <PageHeader
        kicker="Discipulado"
        title="Formação"
        lead="Trilhas, células e mentoria — contínuas e personalizadas para cada geração."
      />
      <PosterRow
        title="Gerações"
        items={ministerios.map((m) => ({
          href: `/formacao/${m.id}`,
          src: fotos[m.id as keyof typeof fotos] || fotos.familia,
          title: m.nome,
          kicker: m.tag,
        }))}
      />
      {ministerios.map((m) => (
        <PosterRow
          key={m.id}
          title={`${m.nome} · cursos e atividades`}
          href={`/formacao/${m.id}`}
          hrefLabel="Abrir geração →"
          items={postersDe(m)}
          size="gen"
        />
      ))}
    </div>
  );
}
