export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 108" fill="none" className={className} aria-hidden>
      <path d="M60 6 L114 102 H6 Z" stroke="currentColor" strokeWidth="9" strokeLinejoin="miter" />
      <path d="M60 34 L92 90 H28 Z" stroke="currentColor" strokeWidth="9" strokeLinejoin="miter" />
    </svg>
  );
}
