"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  items: PosterItem[];
  className?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(true);
  const looping = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const measure = () => {
      looping.current = el.scrollWidth > el.clientWidth + 24;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    paused.current = false;
    let frame = 0;
    const tick = () => {
      if (looping.current && !paused.current) {
        el.scrollLeft += 0.38;
        const resetAt = el.scrollWidth / 2;
        if (resetAt > 0 && el.scrollLeft >= resetAt) {
          el.scrollLeft -= resetAt;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [items]);

  function snapAndPause() {
    const el = scroller.current;
    paused.current = true;
    if (!el) return;
    const card = el.querySelector(".poster") as HTMLElement | null;
    if (!card) return;
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "12") || 12;
    const step = card.getBoundingClientRect().width + gap;
    if (step <= 0) return;
    const next = Math.round(el.scrollLeft / step) * step;
    el.scrollTo({ left: next, behavior: "smooth" });
  }

  function resume() {
    paused.current = false;
  }

  const loopItems = items.length > 3 ? [...items, ...items] : items;

  return (
    <section className={`mt-6 md:mt-10 ${className}`.trim()}>
      <div className="mb-3 flex items-end justify-between gap-3">
        <h3 className="section-label mb-0">{title}</h3>
        {href ? (
          <Link href={href} className="text-[12px] text-[#9fd4ea]">
            {hrefLabel}
          </Link>
        ) : null}
      </div>
      <div
        ref={scroller}
        className="poster-row"
        onMouseEnter={snapAndPause}
        onMouseLeave={resume}
        onPointerDown={snapAndPause}
        onPointerUp={resume}
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
