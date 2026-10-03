import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

const items = [
  { href: "/perfil", t: "Meu perfil", d: "Nome, CPF, célula, família e cursos" },
  { href: "/dashboard", t: "Painel e relatórios", d: "Métricas da casa — só liderança" },
  { href: "/biblia", t: "Bíblia online", d: "Leitura por livro e capítulo" },
  { href: "/palavra", t: "Áudios da liderança", d: "Pastor e líderes enviam a Palavra" },
  { href: "/comunidade", t: "Comunidade", d: "Feed da casa e salas por tema" },
  { href: "/visao", t: "Visão 2033", d: "Protótipo, a casa, indicadores e as seis frentes" },
  { href: "/lideranca", t: "Papel do pastor", d: "De fazer tudo, para formar pessoas que fazem juntas" },
  { href: "/visao/educacao", t: "Roda da educação", d: "Novas formas de aprender" },
  { href: "/visao/social", t: "Roda social", d: "Famílias e relações entre gerações" },
  { href: "/visao/economia", t: "Roda da economia", d: "Educação financeira e empreendedora" },
  { href: "/oracao", t: "Pedido de oração", d: "Acompanhamento pastoral" },
  { href: "/eventos", t: "Agenda", d: "Cultos, células e Ágape Serve" },
  { href: "/cursos", t: "Trilhas de formação", d: "Família, fé e finanças" },
  { href: "/formacao/infantil", t: "Check-in infantil", d: "Segurança no Kids Hall" },
  { href: "/culto", t: "Culto online", d: "Presencial e transmissão" },
];

export default function MaisPage() {
  return (
    <div>
      <PageHeader kicker="A casa" title="Mais" lead="Tudo o que a comunidade precisa, em um só lugar." />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="card">
            <h3 className="font-display text-2xl">{i.t}</h3>
            <p className="meta">{i.d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
