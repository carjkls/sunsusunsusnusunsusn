import Link from "next/link";
import type { Route } from "next";
import { BarChart3, BriefcaseBusiness, Building2, FileText, LayoutDashboard, Settings, Users, Wallet, Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { CompanyContext } from "@/lib/types";

const nav: { href: Route; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/crm", label: "CRM e Pipeline", icon: BriefcaseBusiness },
  { href: "/app/clientes", label: "Clientes", icon: Users },
  { href: "/app/contratos", label: "Contratos", icon: FileText },
  { href: "/app/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/app/tecnico", label: "Tecnico", icon: Wrench },
  { href: "/app/relatorios", label: "Relatorios", icon: BarChart3 },
  { href: "/app/configuracoes/usuarios", label: "Usuarios", icon: Settings },
  { href: "/app/configuracoes/empresa", label: "Empresa", icon: Building2 }
];

export function AppShell({ context, children }: { context: CompanyContext | null; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background text-foreground lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-surface p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <Link href="/app/dashboard" className="mb-6 flex min-h-11 items-center gap-3 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-solar text-sm font-extrabold text-[#11181d]">SN</span>
          <span>
            <strong className="block leading-tight">Sun Neo AI</strong>
            <small className="text-xs text-muted">CRM solar</small>
          </span>
        </Link>

        <nav className="grid gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-muted transition hover:bg-solar/12 hover:text-foreground">
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface/95 px-5 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-solar">{context?.companyName ?? "Setup"}</p>
            <p className="text-sm text-muted">{context ? `${context.userName} · ${context.role}` : "Sem empresa ativa"}</p>
          </div>
          <ThemeToggle />
        </header>
        <div className="mx-auto w-full max-w-[1440px] p-5 lg:p-7">{children}</div>
      </main>
    </div>
  );
}
