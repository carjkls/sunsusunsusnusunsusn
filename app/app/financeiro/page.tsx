import { InstallmentForm } from "@/components/forms";
import { Badge, Card, EmptyState, Metric, PageHeader, SetupState, toneForStatus } from "@/components/ui";
import { getFinanceData } from "@/lib/data/repository";
import { currency, marginPercent, marginValue, overdueInstallment } from "@/lib/utils";

export default async function FinancePage() {
  const { configured, context, rows } = await getFinanceData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  const receita = rows.contracts.reduce((sum, item) => sum + item.totalValue, 0);
  const aberto = rows.contracts.reduce((sum, item) => sum + item.openAmount, 0);
  const vencidas = rows.installments.filter((item) => overdueInstallment(item.dueDate, item.status));

  return (
    <>
      <PageHeader eyebrow="Financeiro" title="Recebimentos, custos e margem" description="Controle simples por contrato, sem substituir ERP ou banco." />
      {rows.contracts.length === 0 ? <EmptyState title="Financeiro aguardando contratos" description="Cadastre contratos reais para registrar parcelas, custos e margem." /> : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Metric label="Receita total" value={currency(receita)} hint="Contratos cadastrados" />
            <Metric label="Em aberto" value={currency(aberto)} hint="Valor pendente" />
            <Metric label="Parcelas vencidas" value={String(vencidas.length)} hint="Pendentes com data anterior a hoje" />
          </div>
          <div className="mt-4 grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
            <Card><h2 className="mb-4 text-lg font-bold">Nova parcela</h2><InstallmentForm contracts={rows.contracts} /></Card>
            <Card className="overflow-auto">
              <table className="w-full min-w-[780px] text-sm">
                <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Contrato</th><th>Valor</th><th>Custos</th><th>Margem</th><th>Aberto</th><th>Status</th></tr></thead>
                <tbody>
                  {rows.contracts.map((contract) => (
                    <tr key={contract.id} className="border-t border-border">
                      <td className="p-3 font-bold">{contract.number}<br /><span className="font-normal text-muted">{contract.customerName}</span></td>
                      <td>{currency(contract.totalValue)}</td>
                      <td>{currency(contract.totalCosts)}</td>
                      <td>{currency(marginValue(contract.totalValue, contract.totalCosts))} · {marginPercent(contract.totalValue, contract.totalCosts)}%</td>
                      <td>{currency(contract.openAmount)}</td>
                      <td><Badge tone={toneForStatus(contract.financialStatus)}>{contract.financialStatus}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
