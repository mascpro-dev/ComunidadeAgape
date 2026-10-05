import { PageHeader } from "@/components/PageHeader";
import { PosterRow } from "@/components/PosterRow";
import { loadBannerOverrides } from "@/lib/banners";
import { fotoCapa } from "@/lib/fotos";

export default async function MaisPage() {
  const F = await loadBannerOverrides();
  return (
    <div>
      <PageHeader kicker="A comunidade" title="Mais" lead="Tudo o que a comunidade precisa, em um só lugar." />
      <PosterRow
        title="Sua conta"
        items={[
          { href: "/entrar", src: fotoCapa("entrar", F), title: "Entrar", kicker: "Acesso" },
          { href: "/perfil", src: fotoCapa("perfil", F), title: "Meu perfil", kicker: "Membro" },
          { href: "/dashboard", src: fotoCapa("painel", F), title: "Painel", kicker: "Liderança" },
        ]}
      />
      <PosterRow
        title="Palavra"
        items={[
          { href: "/biblia", src: fotoCapa("biblia", F), title: "Bíblia online", kicker: "Leitura" },
          { href: "/palavra", src: fotoCapa("youtube", F), title: "Áudios", kicker: "Liderança" },
          { href: "/comunidade", src: fotoCapa("celulas", F), title: "Comunidade", kicker: "Feed" },
          { href: "/oracao", src: fotoCapa("oracao", F), title: "Oração", kicker: "Pedido" },
        ]}
      />
      <PosterRow
        title="A comunidade"
        items={[
          { href: "/culto", src: fotoCapa("cultoFamilia", F), title: "Culto da família", kicker: "Dom 10h · templo e ao vivo" },
          { href: "/eventos", src: fotoCapa("familia", F), title: "Agenda", kicker: "Semana" },
          { href: "/visao", src: fotoCapa("visao", F), title: "Visão 2033", kicker: "A comunidade" },
          { href: "/lideranca", src: fotoCapa("lideranca", F), title: "Papel do pastor", kicker: "Liderança" },
        ]}
      />
      <PosterRow
        title="Formação"
        href="/formacao"
        items={[
          { href: "/cursos", src: fotoCapa("familia", F), title: "Trilhas", kicker: "Família" },
          { href: "/formacao/infantil#checkin", src: fotoCapa("checkinKids", F), title: "Check-in kids", kicker: "Infantil" },
          { href: "/visao/educacao", src: fotoCapa("educacao", F), title: "Roda da educação", kicker: "2033" },
          { href: "/visao/social", src: fotoCapa("celulas", F), title: "Roda social", kicker: "2033" },
          { href: "/visao/economia", src: fotoCapa("economia", F), title: "Roda da economia", kicker: "2033" },
        ]}
      />
    </div>
  );
}
