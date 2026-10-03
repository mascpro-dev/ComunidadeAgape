import Link from "next/link";

export function PageHeader({
  backHref,
  backLabel = "voltar",
  kicker,
  title,
  lead,
}: {
  backHref?: string;
  backLabel?: string;
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-6 md:mb-10">
      {backHref ? (
        <Link href={backHref} className="mb-3 inline-flex text-[13px] font-medium text-gold md:hidden">
          ← {backLabel}
        </Link>
      ) : null}
      {kicker ? <p className="page-kicker">{kicker}</p> : null}
      <h1 className="page-title">{title}</h1>
      {lead ? <p className="page-lead">{lead}</p> : null}
    </header>
  );
}
