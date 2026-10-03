export function BibliaDesenho({
  tipo,
  color,
  className = "h-16 w-16",
}: {
  tipo: "fogo" | "estrela" | "pomba" | "escudo" | "rosa" | "casa" | "bussola";
  color: string;
  className?: string;
}) {
  const p = { className, viewBox: "0 0 80 80", fill: "none", stroke: color, strokeWidth: 1.6 };
  if (tipo === "rosa")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M40 70V38" />
        <path d="M40 52c-8 6-16 4-18-2M40 48c8 6 16 4 18-2" />
        <circle cx="40" cy="28" r="10" />
        <path d="M32 26c2-8 8-12 8-12s6 4 8 12" />
        <path d="M28 32c-6 2-10 8-8 12M52 32c6 2 10 8 8 12" />
      </svg>
    );
  if (tipo === "pomba")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M18 48c10-2 16-10 22-22 2 10 10 18 24 20-8 4-18 8-28 8-10 0-16-2-18-6z" />
        <path d="M40 26c4-8 12-12 20-10" />
        <circle cx="36" cy="30" r="1.4" fill={color} />
        <path d="M28 44c6 2 12 2 18 0" />
      </svg>
    );
  if (tipo === "fogo")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M40 14s8 12 8 22a8 8 0 1 1-16 0c0-8 8-22 8-22z" />
        <path d="M40 30s4 6 4 11a4 4 0 1 1-8 0c0-4 4-11 4-11z" />
        <path d="M24 58c4 8 10 12 16 12s12-4 16-12" />
      </svg>
    );
  if (tipo === "estrela")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M40 12 46 32h20L50 44l6 20-16-12-16 12 6-20-16-12h20z" />
      </svg>
    );
  if (tipo === "escudo")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M40 12 64 22v18c0 16-10 26-24 32C26 66 16 56 16 40V22z" />
        <path d="M40 24v36M28 40h24" />
      </svg>
    );
  if (tipo === "casa")
    return (
      <svg {...p} strokeLinejoin="round">
        <path d="M14 38 40 16l26 22" />
        <path d="M22 36v28h36V36" />
        <path d="M34 64V48h12v16" />
        <circle cx="52" cy="28" r="3" />
      </svg>
    );
  return (
    <svg {...p} strokeLinejoin="round">
      <circle cx="40" cy="40" r="22" />
      <circle cx="40" cy="40" r="4" fill={color} />
      <path d="M40 18v8M40 54v8M18 40h8M54 40h8" />
      <path d="M40 40 54 28" />
    </svg>
  );
}
