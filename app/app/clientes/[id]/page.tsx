import Link from "next/link";
import { Badge, Card, EmptyState, PageHeader, SetupState, toneForLtv, toneForStatus } from "@/components/ui";
import { getCustomersData } from "@/lib/data/repository";
import { currency } from "@/lib/utils";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { configured, context, rows } = await getCustomersData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  const customer = rows.customers.find((item) => item.id === id);
  if (!customer) return <EmptyState title="Cliente nao encontrado" description="O cliente nao existe ou nao pertence a empresa ativa." />;

  const contracts = rows.contracts.filter((contract) => contract.customerId === customer.id);

  return (
    <>
      <PageHeader eyebrow="Cliente" title={customer.name} description={`${customer.type} · ${customer.city}/${customer.state}`} action={<Link className="rounded-lg border border-border px-4 py-2 text-sm font-bold" href="/app/clientes">Voltar</Link>} />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="mb-4 text-lg font-bold">Perfil</h2>
          <div className="grid gap-3 text-sm">
            <p><span className="text-muted">Telefone:</span> {customer.phone}</p>
            <p><span className="text-muted">Email:</span> {customer.email || "-"}</p>
            <p><span className="text-muted">Responsavel:</span> {customer.owner}</p>
            <p><span className="text-muted">LTV:</span> <Badge tone={toneForLtv(customer.ltv)}>{customer.ltv}</Badge></p>
            <p><span className="text-muted">Motivo:</span> {customer.ltvReason || "-"}</p>
            <p><span className="text-muted">Observacoes:</span> {customer.notes || "-"}</p>
          </div>
        </Card>
        <Card className="overflow-auto">
          <h2 className="mb-4 text-lg font-bold">Contratos</h2>
          {contracts.length === 0 ? <p className="text-sm text-muted">Cliente sem contrato cadastrado.</p> : (
            <table className="w-full min-w-[640px] text-sm">
              <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Contrato</th><th>Valor</th><th>Financeiro</th><th>Tecnico</th></tr></thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id} className="border-t border-border">
                    <td className="p-3"><Link className="font-bold" href={`/app/contratos/${contract.id}`}>{contract.number}</Link></td>
                    <td>{currency(contract.totalValue)}</td>
                    <td><Badge tone={toneForStatus(contract.financialStatus)}>{contract.financialStatus}</Badge></td>
                    <td><Badge tone={toneForStatus(contract.technicalStatus)}>{contract.technicalStatus}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  );
}
