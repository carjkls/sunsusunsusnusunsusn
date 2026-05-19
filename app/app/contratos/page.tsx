import Link from "next/link";
import { ContractForm } from "@/components/forms";
import { Badge, Card, EmptyState, PageHeader, SetupState, toneForStatus } from "@/components/ui";
import { getContractsData } from "@/lib/data/repository";
import { currency, marginPercent, marginValue } from "@/lib/utils";

export default async function ContractsPage() {
  const { configured, context, rows } = await getContractsData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  return (
    <>
      <PageHeader eyebrow="Contratos" title="Contratos" description="Venda fechada conectada ao cliente, financeiro e tecnico." />
      <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card><h2 className="mb-4 text-lg font-bold">Novo contrato</h2><ContractForm customers={rows.customers} /></Card>
        {rows.contracts.length === 0 ? <EmptyState title="Nenhum contrato cadastrado" description="Crie clientes reais primeiro, depois vincule contratos fechados a eles." /> : (
          <Card className="overflow-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Contrato</th><th>Cliente</th><th>Valor</th><th>Financeiro</th><th>Tecnico</th><th>Margem</th></tr></thead>
              <tbody>
                {rows.contracts.map((contract) => (
                  <tr key={contract.id} className="border-t border-border">
                    <td className="p-3"><Link className="font-bold text-foreground" href={`/app/contratos/${contract.id}`}>{contract.number}</Link></td>
                    <td>{contract.customerName}</td>
                    <td>{currency(contract.totalValue)}</td>
                    <td><Badge tone={toneForStatus(contract.financialStatus)}>{contract.financialStatus}</Badge></td>
                    <td><Badge tone={toneForStatus(contract.technicalStatus)}>{contract.technicalStatus}</Badge></td>
                    <td>{currency(marginValue(contract.totalValue, contract.totalCosts))} · {marginPercent(contract.totalValue, contract.totalCosts)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
}
