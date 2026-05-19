import { TechnicalForm } from "@/components/forms";
import { Badge, Card, EmptyState, PageHeader, SetupState, toneForStatus } from "@/components/ui";
import { getTechnicalData } from "@/lib/data/repository";

export default async function TechnicalPage() {
  const { configured, context, rows } = await getTechnicalData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  return (
    <>
      <PageHeader eyebrow="Tecnico" title="Operacao tecnica" description="Registro manual do sistema solar vendido ou instalado." />
      {rows.contracts.length === 0 ? <EmptyState title="Tecnico aguardando contratos" description="Cadastre contratos para registrar inversor, potencia, modulos e status de instalacao." /> : (
        <div className="grid gap-4 xl:grid-cols-[480px_minmax(0,1fr)]">
          <Card><h2 className="mb-4 text-lg font-bold">Dados tecnicos</h2><TechnicalForm contracts={rows.contracts} /></Card>
          {rows.technicalRecords.length === 0 ? <EmptyState title="Nenhum cadastro tecnico" description="Selecione um contrato e salve os dados do sistema solar." /> : (
            <div className="grid gap-4 md:grid-cols-2">
              {rows.technicalRecords.map((record) => (
                <Card key={record.id}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="font-bold">{record.customerName}</h2>
                    <Badge tone={toneForStatus(record.status)}>{record.status}</Badge>
                  </div>
                  <p className="text-sm text-muted">{record.inverterBrand} {record.inverterModel}</p>
                  <p className="mt-2 text-sm">{record.systemPowerKwp} kWp · {record.modulesCount} modulos</p>
                  <p className="mt-1 text-sm text-muted">{record.averageConsumption} kWh/mes · {record.utilityCompany}</p>
                  {record.needsReview ? <p className="mt-3 text-sm font-bold text-red">Necessita revisao</p> : null}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
