export function CardPhoto({
  src,
  alt,
  className = "h-44",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06153a] via-[#06153a]/35 to-transparent" />
    </div>
  );
}
