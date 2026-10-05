"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

export type PosterItem = {
  href?: string;
  src: string;
  title: string;
  kicker?: string;
  external?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  reel?: boolean;
};

export function PosterRow({
  title,
  href,
  hrefLabel = "Ver todos →",
  items,
  className = "",
  fill = false,
  size = "md",
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  items: PosterItem[];
  className?: string;
  fill?: boolean;
  size?: "md" | "lg" | "gen" | "week";
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const offset = useRef(0);
  const [marquee, setMarquee] = useState(false);
  const [swipe, setSwipe] = useState(false);
  const signature = items.map((i) => `${i.title}:${i.href || ""}:${i.src}`).join("|");
  const shown = useMemo(
    () => (marquee && items.length > 1 ? [...items, ...items] : items),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [marquee, signature],
  );
  const speed = size === "lg" ? 0.42 : size === "gen" || size === "week" ? 0.28 : 0.7;
  const railSize = size === "gen" || size === "week";

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => setSwipe(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const view = viewport.current;
    const rail = track.current;
    if (!view || !rail) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const contentWidth = () => {
      if (marquee && items.length > 1) return rail.scrollWidth / 2;
      return rail.scrollWidth;
    };

    const measure = () => {
      if (swipe || reduce || items.length < 2) {
        setMarquee(false);
        offset.current = 0;
        rail.style.transform = "translate3d(0,0,0)";
        return;
      }
      const need = contentWidth() > view.clientWidth + 2;
      setMarquee((prev) => (prev === need ? prev : need));
      if (!need) {
        offset.current = 0;
        rail.style.transform = "translate3d(0,0,0)";
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(view);
    ro.observe(rail);

    let frame = 0;
    const tick = () => {
      if (marquee && !paused.current && !swipe) {
        offset.current += speed;
        const half = rail.scrollWidth / 2;
        if (half > 0 && offset.current >= half) offset.current -= half;
        rail.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [items.length, signature, marquee, title, size, speed, swipe]);

  function pause() {
    if (swipe) return;
    paused.current = true;
  }
  function resume() {
    paused.current = false;
  }

  return (
    <section
      className={`min-w-0 max-w-full overflow-x-clip ${fill ? "mt-0 flex min-h-0 flex-1 flex-col" : "mt-6 md:mt-10"} ${className}`.trim()}
    >
      <div className="mb-3 flex shrink-0 items-end justify-between gap-3">
        <h3 className="section-label mb-0">{title}</h3>
        {href ? (
          <Link href={href} className="text-[12px] text-[#9fd4ea]">
            {hrefLabel}
          </Link>
        ) : null}
      </div>
      <div
        ref={viewport}
        className={`${fill ? "poster-row poster-row-fill" : "poster-row"} ${size === "lg" ? "poster-row-lg" : ""} ${railSize ? "poster-row-gen" : ""} ${size === "week" ? "poster-row-week" : ""} ${marquee ? "is-marquee" : ""}`.trim()}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
      >
        <div ref={track} className="poster-track">
          {shown.map((item, i) => (
            <PosterCard key={`${item.title}-${item.href || ""}-${i}`} item={item} size={size} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PosterCard({ item, size = "md" }: { item: PosterItem; size?: "md" | "lg" | "gen" | "week" }) {
  const className = `${item.selected ? "poster group ring-2 ring-gold" : "poster group"} ${item.reel ? "reel" : ""}`.trim();
  const lift = size === "gen" || size === "week";
  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.title} className={lift ? "" : "transition duration-500 group-hover:scale-110"} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      {item.reel ? (
        <div className="absolute left-1/2 top-[42%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-sm">
          <span className="ml-0.5 text-lg">▶</span>
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        {item.kicker ? (
          <p className={`font-semibold uppercase tracking-[0.14em] text-gold ${size === "lg" ? "text-[11px] md:text-xs" : "text-[10px]"}`}>{item.kicker}</p>
        ) : null}
        <p className={`font-display leading-tight text-white drop-shadow ${item.reel ? "text-[15px] md:text-xl" : size === "lg" ? "text-lg md:text-2xl" : size === "week" ? "text-base md:text-xl" : "text-[15px] md:text-xl"}`}>{item.title}</p>
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
