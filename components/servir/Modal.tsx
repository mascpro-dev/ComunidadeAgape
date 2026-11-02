"use client";

import type { ReactNode } from "react";

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-black/60 p-3 sm:place-items-center" onClick={onClose}>
      <div
        className={`card max-h-[92dvh] w-full overflow-y-auto ${wide ? "max-w-3xl" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl leading-tight">{title}</h2>
          <button type="button" onClick={onClose} className="px-2 text-muted" aria-label="Fechar">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
