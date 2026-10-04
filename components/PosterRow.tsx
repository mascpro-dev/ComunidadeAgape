"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

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
  className = "",
  fill = false,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  items: PosterItem[];
  className?: string;
  fill?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const looping = useRef(false);
  const loopItems = useMemo(() => (items.length > 1 ? [...items, ...items] : items), [items]);
  const itemCount = items.length;

  useEffect(() => {
    const el = scroller.current;
    if (!el || itemCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const measure = () => {
      looping.current = el.scrollWidth / 2 > el.clientWidth + 8;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    let frame = 0;
    const tick = () => {
      if (looping.current && !paused.current) {
        el.scrollLeft += 0.7;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [itemCount, title]);

  function snapAndPause() {
    paused.current = true;
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector(".poster") as HTMLElement | null;
    if (!card) return;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "12") || 12;
    const step = card.getBoundingClientRect().width + gap;
    if (step <= 0) return;
    el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
  }

  function resume() {
    paused.current = false;
  }

  return (
    <section className={`${fill ? "mt-0 flex min-h-0 flex-1 flex-col" : "mt-6 md:mt-10"} ${className}`.trim()}>
      <div className="mb-3 flex shrink-0 items-end justify-between gap-3">
        <h3 className="section-label mb-0">{title}</h3>
        {href ? (
          <Link href={href} className="text-[12px] text-[#9fd4ea]">
            {hrefLabel}
          </Link>
        ) : null}
      </div>
      <div
        ref={scroller}
        className={fill ? "poster-row poster-row-fill" : "poster-row"}
        onMouseEnter={snapAndPause}
        onMouseLeave={resume}
        onPointerDown={snapAndPause}
      >
        {loopItems.map((item, i) => (
          <PosterCard key={`${item.title}-${item.href || ""}-${i}`} item={item} />
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
