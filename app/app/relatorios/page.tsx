import { Card, EmptyState, Metric, PageHeader, SetupState } from "@/components/ui";
import { getDashboardData } from "@/lib/data/repository";
import { currency, marginValue, overdueInstallment } from "@/lib/utils";

export default async function ReportsPage() {
  const data = await getDashboardData();
  if (!data.configured || !data.context) return <SetupState configured={data.configured} hasCompany={Boolean(data.context)} />;

  if (data.contracts.length === 0 && data.leads.length === 0) {
    return <EmptyState title="Relatorios aguardando dados" description="Os relatorios ficam vazios ate a empresa cadastrar leads, clientes, contratos, financeiro e tecnico reais." />;
  }

  const receita = data.contracts.reduce((sum, item) => sum + item.totalValue, 0);
  const margem = data.contracts.reduce((sum, item) => sum + marginValue(item.totalValue, item.totalCosts), 0);

  return (
    <>
      <PageHeader eyebrow="Relatorios" title="Leitura gerencial" description="Resumo operacional calculado em cima dos registros reais da empresa." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Leads" value={String(data.leads.length)} hint="Total no CRM" />
        <Metric label="Clientes" value={String(data.customers.length)} hint="Carteira ativa" />
        <Metric label="Receita" value={currency(receita)} hint="Contratos cadastrados" />
        <Metric label="Margem" value={currency(margem)} hint="Estimativa operacional" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Leads por etapa", data.leads.reduce<Record<string, number>>((acc, lead) => ({ ...acc, [lead.stage]: (acc[lead.stage] ?? 0) + 1 }), {})],
          ["Clientes por LTV", data.customers.reduce<Record<string, number>>((acc, customer) => ({ ...acc, [customer.ltv]: (acc[customer.ltv] ?? 0) + 1 }), {})],
          ["Status tecnico", data.contracts.reduce<Record<string, number>>((acc, contract) => ({ ...acc, [contract.technicalStatus]: (acc[contract.technicalStatus] ?? 0) + 1 }), {})],
          ["Status financeiro", data.contracts.reduce<Record<string, number>>((acc, contract) => ({ ...acc, [contract.financialStatus]: (acc[contract.financialStatus] ?? 0) + 1 }), {})],
          ["Parcelas vencidas", { Vencidas: data.installments.filter((item) => overdueInstallment(item.dueDate, item.status)).length }]
        ].map(([title, values]) => (
          <Card key={title as string}>
            <h2 className="mb-4 font-bold">{title as string}</h2>
            {Object.entries(values as Record<string, number>).map(([label, count]) => (
              <div key={label} className="mb-2 flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                <span>{label}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </>
  );
}
