import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { fotos } from "@/lib/fotos";

export default function MaisPage() {
  return (
    <div>
      <PageHeader kicker="A comunidade" title="Mais" lead="Tudo o que a comunidade precisa, em um só lugar." />
      <PosterRow
        title="Sua conta"
        items={[
          { href: "/entrar", src: fotos.entrar, title: "Entrar", kicker: "Acesso" },
          { href: "/perfil", src: fotos.perfil, title: "Meu perfil", kicker: "Membro" },
          { href: "/dashboard", src: fotos.painel, title: "Painel", kicker: "Liderança" },
        ]}
      />
      <PosterRow
        title="Palavra"
        items={[
          { href: "/biblia", src: fotos.biblia, title: "Bíblia online", kicker: "Leitura" },
          { href: "/palavra", src: fotos.youtube, title: "Áudios", kicker: "Liderança" },
          { href: "/comunidade", src: fotos.celulas, title: "Comunidade", kicker: "Feed" },
          { href: "/oracao", src: fotos.oracao, title: "Oração", kicker: "Pedido" },
        ]}
      />
      <PosterRow
        title="A comunidade"
        items={[
          { href: "/culto", src: fotos.familia, title: "Culto da família", kicker: "Ao vivo · 10h" },
          { href: "/eventos", src: fotos.familia, title: "Agenda", kicker: "Semana" },
          { href: "/visao", src: fotos.visao, title: "Visão 2033", kicker: "A comunidade" },
          { href: "/lideranca", src: fotos.lideranca, title: "Papel do pastor", kicker: "Liderança" },
        ]}
      />
      <PosterRow
        title="Formação"
        href="/formacao"
        items={[
          { href: "/cursos", src: fotos.familia, title: "Trilhas", kicker: "Família" },
          { href: "/formacao/infantil#checkin", src: fotos.checkinKids, title: "Check-in kids", kicker: "Infantil" },
          { href: "/visao/educacao", src: fotos.educacao, title: "Roda da educação", kicker: "2033" },
          { href: "/visao/social", src: fotos.celulas, title: "Roda social", kicker: "2033" },
          { href: "/visao/economia", src: fotos.economia, title: "Roda da economia", kicker: "2033" },
        ]}
      />
    </div>
  );
}
