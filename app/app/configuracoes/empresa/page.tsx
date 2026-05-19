import { Card, PageHeader, SetupState } from "@/components/ui";
import { getCompanyContext } from "@/lib/data/repository";

export default async function CompanySettingsPage() {
  const { configured, context } = await getCompanyContext();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  return (
    <>
      <PageHeader eyebrow="Configuracoes" title="Empresa" description="Dados da empresa ativa vinculada ao usuario autenticado." />
      <Card className="max-w-2xl">
        <div className="grid gap-3">
          <div className="rounded-lg border border-border p-3"><span className="text-sm text-muted">Nome</span><strong className="block">{context.companyName}</strong></div>
          <div className="rounded-lg border border-border p-3"><span className="text-sm text-muted">Empresa ID</span><strong className="block break-all">{context.companyId}</strong></div>
          <div className="rounded-lg border border-border p-3"><span className="text-sm text-muted">Seu perfil</span><strong className="block">{context.role}</strong></div>
        </div>
      </Card>
    </>
  );
}
