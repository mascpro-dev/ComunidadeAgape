import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="page-kicker">404</p>
      <h1 className="page-title">Página não encontrada</h1>
      <p className="page-lead mx-auto">Essa rota não existe neste app. Volte para o início da comunidade.</p>
      <Link href="/" className="btn-gold mt-6">
        Ir ao início
      </Link>
    </div>
  );
}
