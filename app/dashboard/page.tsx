import { MetricsDashboard } from "@/components/MetricsDashboard";
import { PageHeader } from "@/components/PageHeader";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        kicker="Liderança"
        title="Painel"
        lead="Números de todos os ministérios, relatórios dos líderes e o cadastro da casa."
      />
      <MetricsDashboard />
    </div>
  );
}
