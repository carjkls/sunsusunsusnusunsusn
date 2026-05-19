import Link from "next/link";
import { Badge, Card, EmptyState, PageHeader, SetupState, toneForStatus } from "@/components/ui";
import { getContractsData } from "@/lib/data/repository";
import { currency, marginPercent, marginValue } from "@/lib/utils";

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { configured, context, rows } = await getContractsData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  const contract = rows.contracts.find((item) => item.id === id);
  if (!contract) return <EmptyState title="Contrato nao encontrado" description="O contrato nao existe ou nao pertence a empresa ativa." />;

  const installments = rows.installments.filter((item) => item.contractId === contract.id);
  const technical = rows.technicalRecords.find((item) => item.contractId === contract.id);

  return (
    <>
      <PageHeader eyebrow="Contrato" title={contract.number} description={contract.customerName} action={<Link className="rounded-lg border border-border px-4 py-2 text-sm font-bold" href="/app/contratos">Voltar</Link>} />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <h2 className="mb-4 text-lg font-bold">Resumo</h2>
          <p className="text-sm text-muted">Valor total</p><strong className="block text-2xl">{currency(contract.totalValue)}</strong>
          <p className="mt-4 text-sm text-muted">Margem estimada</p><strong className="block">{currency(marginValue(contract.totalValue, contract.totalCosts))} · {marginPercent(contract.totalValue, contract.totalCosts)}%</strong>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone={toneForStatus(contract.financialStatus)}>{contract.financialStatus}</Badge>
            <Badge tone={toneForStatus(contract.technicalStatus)}>{contract.technicalStatus}</Badge>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-bold">Parcelas</h2>
          {installments.length === 0 ? <p className="text-sm text-muted">Nenhuma parcela cadastrada.</p> : installments.map((item) => (
            <div key={item.id} className="mb-2 flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <span>{item.dueDate}</span><strong>{currency(item.amount)}</strong><Badge tone={toneForStatus(item.status)}>{item.status}</Badge>
            </div>
          ))}
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-bold">Tecnico</h2>
          {!technical ? <p className="text-sm text-muted">Dados tecnicos ainda nao cadastrados.</p> : (
            <div className="grid gap-2 text-sm">
              <p>{technical.inverterBrand} {technical.inverterModel}</p>
              <p>{technical.systemPowerKwp} kWp · {technical.modulesCount} modulos</p>
              <p>{technical.utilityCompany} · {technical.averageConsumption} kWh/mes</p>
              <Badge tone={toneForStatus(technical.status)}>{technical.status}</Badge>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
