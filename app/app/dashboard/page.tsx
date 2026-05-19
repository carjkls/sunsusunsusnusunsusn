import { Badge, Card, EmptyState, Metric, PageHeader, SetupState, toneForLtv, toneForStatus } from "@/components/ui";
import { getDashboardData } from "@/lib/data/repository";
import { currency, marginPercent, marginValue, overdueInstallment } from "@/lib/utils";

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data.configured || !data.context) return <SetupState configured={data.configured} hasCompany={Boolean(data.context)} />;

  const receita = data.contracts.reduce((sum, item) => sum + item.totalValue, 0);
  const aberto = data.contracts.reduce((sum, item) => sum + item.openAmount, 0);
  const margem = data.contracts.reduce((sum, item) => sum + marginValue(item.totalValue, item.totalCosts), 0);
  const vencidas = data.installments.filter((item) => overdueInstallment(item.dueDate, item.status)).length;

  return (
    <>
      <PageHeader eyebrow="Visao geral" title="Dashboard operacional" description="Indicadores calculados a partir dos dados reais da empresa ativa." />
      {data.contracts.length === 0 && data.leads.length === 0 ? (
        <EmptyState title="Sua operacao ainda esta vazia" description="Cadastre leads, clientes e contratos reais para o dashboard comecar a refletir a empresa." />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Metric label="Leads ativos" value={String(data.leads.filter((lead) => lead.stage !== "Perdido").length)} hint="Pipeline comercial" />
            <Metric label="Contratos" value={String(data.contracts.length)} hint="Carteira cadastrada" />
            <Metric label="Receita prevista" value={currency(receita)} hint="Soma dos contratos" />
            <Metric label="Valor em aberto" value={currency(aberto)} hint={`${vencidas} parcela(s) vencidas`} />
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
            <Card>
              <h2 className="mb-4 text-lg font-bold">Contratos prioritarios</h2>
              <div className="overflow-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Contrato</th><th>Cliente</th><th>Valor</th><th>Financeiro</th><th>Tecnico</th><th>Margem</th></tr></thead>
                  <tbody>
                    {data.contracts.slice(0, 8).map((contract) => (
                      <tr key={contract.id} className="border-t border-border">
                        <td className="p-3 font-bold">{contract.number}</td>
                        <td>{contract.customerName}</td>
                        <td>{currency(contract.totalValue)}</td>
                        <td><Badge tone={toneForStatus(contract.financialStatus)}>{contract.financialStatus}</Badge></td>
                        <td><Badge tone={toneForStatus(contract.technicalStatus)}>{contract.technicalStatus}</Badge></td>
                        <td>{currency(marginValue(contract.totalValue, contract.totalCosts))} · {marginPercent(contract.totalValue, contract.totalCosts)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <Card>
              <h2 className="mb-4 text-lg font-bold">LTV da carteira</h2>
              {["Nao classificado", "Baixo", "Medio", "Alto", "Estrategico"].map((ltv) => (
                <div key={ltv} className="mb-3 flex items-center justify-between rounded-lg border border-border p-3">
                  <span>{ltv}</span>
                  <Badge tone={toneForLtv(ltv)}>{data.customers.filter((customer) => customer.ltv === ltv).length}</Badge>
                </div>
              ))}
              <div className="mt-5 rounded-lg border border-border p-3">
                <span className="text-sm text-muted">Margem estimada total</span>
                <strong className="mt-1 block text-xl">{currency(margem)}</strong>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
