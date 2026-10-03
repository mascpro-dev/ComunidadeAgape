import { LoginForm } from "@/components/LoginForm";
import { PageHeader } from "@/components/PageHeader";

export default function EntrarPage() {
  return (
    <div>
      <PageHeader kicker="Acesso" title="Login" lead="Membros entram no perfil. Líderes só usam o que o administrador liberar." />
      <LoginForm />
    </div>
  );
}
