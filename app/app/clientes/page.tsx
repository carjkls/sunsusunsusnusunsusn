import Link from "next/link";
import { CustomerForm } from "@/components/forms";
import { Badge, Card, EmptyState, PageHeader, SetupState, toneForLtv } from "@/components/ui";
import { getCustomersData } from "@/lib/data/repository";

export default async function CustomersPage() {
  const { configured, context, rows } = await getCustomersData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  return (
    <>
      <PageHeader eyebrow="Carteira" title="Clientes e LTV" description="Clientes reais da empresa, com classificacao manual de potencial." />
      <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card><h2 className="mb-4 text-lg font-bold">Novo cliente</h2><CustomerForm /></Card>
        {rows.customers.length === 0 ? <EmptyState title="Nenhum cliente cadastrado" description="Cadastre clientes reais ou converta leads fechados quando o comercial avancar." /> : (
          <Card className="overflow-auto">
            <table className="w-full min-w-[740px] text-sm">
              <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Cliente</th><th>Tipo</th><th>Responsavel</th><th>LTV</th><th>Contratos</th></tr></thead>
              <tbody>
                {rows.customers.map((customer) => (
                  <tr key={customer.id} className="border-t border-border">
                    <td className="p-3"><Link className="font-bold text-foreground" href={`/app/clientes/${customer.id}`}>{customer.name}</Link><br /><span className="text-muted">{customer.city}/{customer.state}</span></td>
                    <td>{customer.type}</td>
                    <td>{customer.owner}</td>
                    <td><Badge tone={toneForLtv(customer.ltv)}>{customer.ltv}</Badge></td>
                    <td>{rows.contracts.filter((contract) => contract.customerId === customer.id).length}</td>
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
