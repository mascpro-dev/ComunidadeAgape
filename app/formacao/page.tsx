import { ministeriosNaAgenda, type ItemGeracao, type Ministerio } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { loadBannerOverrides } from "@/lib/banners";
import { fotoCapa, fotoGeracao } from "@/lib/fotos";

function postersDe(m: Ministerio, extras: Record<string, string>, tipo?: ItemGeracao["tipo"]) {
  const itens = tipo ? m.catalogo.filter((i) => i.tipo === tipo) : m.catalogo;
  return itens.map((i) => ({
    href: i.href || `/formacao/${m.id}`,
    src: fotoCapa(i.capa, extras),
    title: i.titulo,
    kicker: i.kicker,
  }));
}

export default async function FormacaoPage() {
  const extras = await loadBannerOverrides();
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
        size="gen"
        items={ministerios.map((m) => ({
          href: `/formacao/${m.id}`,
          src: fotoGeracao(m.id, extras),
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
          items={postersDe(m, extras)}
          size="gen"
        />
      ))}
    </div>
  );
}
