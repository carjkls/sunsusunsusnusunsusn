import { AppShell } from "@/components/app-shell";
import { getCompanyContext } from "@/lib/data/repository";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { context } = await getCompanyContext();
  return <AppShell context={context}>{children}</AppShell>;
}
