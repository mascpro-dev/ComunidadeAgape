export function Avatar({
  nome,
  foto,
  size = 36,
}: {
  nome?: string;
  foto?: string;
  size?: number;
}) {
  const letra = (nome || "M").trim().charAt(0).toUpperCase() || "M";
  if (foto) {
    return (
      <img
        src={foto}
        alt={nome || "Foto do perfil"}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid place-items-center rounded-full border border-gold/40 text-[11px] font-semibold text-gold"
      style={{ width: size, height: size }}
    >
      {letra}
    </span>
  );
}
