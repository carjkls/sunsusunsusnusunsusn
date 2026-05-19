import { LeadForm } from "@/components/forms";
import { Badge, Card, EmptyState, PageHeader, SetupState } from "@/components/ui";
import { getCrmData } from "@/lib/data/repository";
import { updateLeadStage } from "@/lib/actions/entities";

const stages = ["Novo lead", "Contato feito", "Diagnostico", "Proposta enviada", "Negociacao", "Contrato fechado", "Perdido"];

export default async function CrmPage() {
  const { configured, context, rows } = await getCrmData();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  return (
    <>
      <PageHeader eyebrow="Comercial" title="CRM e Pipeline" description="Cadastre leads reais e acompanhe cada oportunidade por etapa." />
      <div className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Card><h2 className="mb-4 text-lg font-bold">Novo lead</h2><LeadForm /></Card>
        <div className="overflow-x-auto">
          {rows.length === 0 ? <EmptyState title="Nenhum lead cadastrado" description="A carteira comercial comeca vazia. Cadastre o primeiro lead real da empresa." /> : (
            <div className="grid min-w-[980px] grid-cols-4 gap-3">
              {stages.map((stage) => (
                <section key={stage} className="rounded-lg border border-border bg-surface p-3">
                  <h2 className="mb-3 flex items-center justify-between text-sm font-bold">{stage}<Badge>{rows.filter((lead) => lead.stage === stage).length}</Badge></h2>
                  {rows.filter((lead) => lead.stage === stage).map((lead) => (
                    <article key={lead.id} className="mb-3 rounded-lg border border-border bg-background p-3">
                      <strong>{lead.name}</strong>
                      <p className="mt-1 text-sm text-muted">{lead.type} · {lead.city}/{lead.state}</p>
                      <p className="mt-1 text-sm text-muted">{lead.nextTask || "Sem proxima tarefa"}</p>
                      <form action={updateLeadStage} className="mt-3">
                        <input type="hidden" name="lead_id" value={lead.id} />
                        <select name="stage" defaultValue={lead.stage} className="w-full rounded-lg border border-border bg-surface p-2 text-sm" onChange={(event) => event.currentTarget.form?.requestSubmit()}>
                          {stages.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      </form>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
