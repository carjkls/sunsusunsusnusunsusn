import { Card, EmptyState, PageHeader, SetupState } from "@/components/ui";
import { getCompanyContext } from "@/lib/data/repository";

export default async function UsersSettingsPage() {
  const { configured, context, supabase } = await getCompanyContext();
  if (!configured || !context) return <SetupState configured={configured} hasCompany={Boolean(context)} />;

  const { data } = supabase
    ? await supabase.from("company_members").select("role, status, profiles(full_name, email, username, phone)").eq("company_id", context.companyId).order("created_at", { ascending: false })
    : { data: [] };

  return (
    <>
      <PageHeader eyebrow="Configuracoes" title="Usuarios" description="Membros vinculados a empresa ativa. Convites devem ser feitos pelo fluxo administrativo configurado no Supabase." />
      {(data ?? []).length === 0 ? <EmptyState title="Nenhum usuario listado" description="Quando a empresa tiver membros ativos, eles aparecem aqui com perfil e status." /> : (
        <Card className="overflow-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="text-left text-xs uppercase text-muted"><th className="p-3">Nome</th><th>Email</th><th>Username</th><th>Telefone</th><th>Perfil</th><th>Status</th></tr></thead>
            <tbody>
              {(data ?? []).map((member, index) => {
                const profile = Array.isArray(member.profiles) ? member.profiles[0] : member.profiles;
                return (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3 font-bold">{profile?.full_name ?? "Sem nome"}</td>
                    <td>{profile?.email ?? "-"}</td>
                    <td>{profile?.username ? `@${profile.username}` : "-"}</td>
                    <td>{profile?.phone ?? "-"}</td>
                    <td>{member.role}</td>
                    <td>{member.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
