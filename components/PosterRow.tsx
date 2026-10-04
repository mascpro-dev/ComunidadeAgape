import Link from "next/link";

export type PosterItem = {
  href?: string;
  src: string;
  title: string;
  kicker?: string;
  external?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

export function PosterRow({
  title,
  href,
  hrefLabel = "Ver todos →",
  items,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  items: PosterItem[];
}) {
  return (
    <section className="mt-6 md:mt-10">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h3 className="section-label mb-0">{title}</h3>
        {href ? (
          <Link href={href} className="text-[12px] text-[#9fd4ea]">
            {hrefLabel}
          </Link>
        ) : null}
      </div>
      <div className="poster-row">
        {items.map((item) => (
          <PosterCard key={(item.href || item.title) + item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

export function PosterCard({ item }: { item: PosterItem }) {
  const className = item.selected ? "poster group ring-2 ring-gold" : "poster group";
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        {item.kicker ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">{item.kicker}</p>
        ) : null}
        <p className="font-display text-[15px] leading-tight text-white drop-shadow md:text-xl">{item.title}</p>
      </div>
    </>
  );
  if (item.onSelect) {
    return (
      <button type="button" onClick={item.onSelect} className={`${className} border-0 bg-transparent p-0 text-left`}>
        {inner}
      </button>
    );
  }
  if (item.external && item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href || "/"} className={className}>
      {inner}
    </Link>
  );
}
