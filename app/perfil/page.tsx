import { MemberProfile } from "@/components/MemberProfile";
import { PageHeader } from "@/components/PageHeader";

export default function PerfilPage() {
  return (
    <div>
      <PageHeader
        kicker="Membro"
        title="Meu perfil"
        lead="Cadastre seus dados. A liderança usa isso para cuidado, célula, família e formação."
      />
      <MemberProfile />
    </div>
  );
}
