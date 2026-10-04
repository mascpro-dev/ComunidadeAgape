export function Logo({
  className = "h-8 w-auto",
  variant = "mark",
}: {
  className?: string;
  variant?: "mark" | "full";
}) {
  const src = variant === "full" ? "/logo-horizontal.png" : "/logo-marca.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Comunidade Cristã Ágape" className={className} />
  );
}
