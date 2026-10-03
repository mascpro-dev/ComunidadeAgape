import Link from "next/link";

const items = [
  { href: "/visao", t: "Visão 2033", d: "Protótipo, gerações, educação e missão na cidade" },
  { href: "/oracao", t: "Pedido de oração", d: "Acompanhamento pastoral" },
  { href: "/eventos", t: "Agenda", d: "Cultos, células e Ágape Serve" },
  { href: "/cursos", t: "Trilhas de formação", d: "Família, fé e finanças" },
  { href: "/lideranca", t: "Liderança", d: "Formar pessoas que fazem juntas" },
  { href: "/formacao/infantil", t: "Check-in infantil", d: "Segurança no Kids Hall" },
  { href: "/culto", t: "Culto online", d: "Presencial e transmissão" },
];

export default function MaisPage() {
  return (
    <div>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Mais</h1>
      <div className="mt-3 grid gap-2.5">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="card">
            <h3 className="font-semibold">{i.t}</h3>
            <p className="meta">{i.d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
