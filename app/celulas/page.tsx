import { CelulasList } from "@/components/CelulasList";

export default function CelulasPage() {
  return (
    <div>
      <h1 className="text-lg font-extrabold uppercase tracking-wider">Células</h1>
      <p className="mb-3 mt-1.5 text-xs text-muted">
        Comunhão, estudo bíblico e apoio prático em grupos menores, no bairro e na cidade.
      </p>
      <CelulasList />
    </div>
  );
}
