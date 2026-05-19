import { cn } from "@/lib/utils";

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold transition",
        variant === "primary" && "border-solar bg-solar text-[#11181d] hover:opacity-90",
        variant === "secondary" && "border-border bg-background text-foreground hover:bg-solar/10",
        variant === "ghost" && "border-transparent bg-transparent text-foreground hover:bg-background",
        variant === "danger" && "border-red text-red hover:bg-red/10",
        className
      )}
      {...props}
    />
  );
}

export function Badge({ children, tone = "gray" }: { children: React.ReactNode; tone?: "green" | "red" | "solar" | "blue" | "gray" }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full px-2.5 py-1 text-xs font-bold",
        tone === "green" && "bg-green/12 text-green",
        tone === "red" && "bg-red/12 text-red",
        tone === "solar" && "bg-solar/16 text-solar",
        tone === "blue" && "bg-blue/12 text-blue",
        tone === "gray" && "bg-background text-muted"
      )}
    >
      {children}
    </span>
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border border-border bg-surface p-4 shadow-panel", className)} {...props} />;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <Card className="flex min-h-64 flex-col items-center justify-center text-center">
      <h2 className="text-lg font800 font-bold">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  );
}

export function SetupState({ configured, hasCompany }: { configured: boolean; hasCompany: boolean }) {
  if (!configured) {
    return (
      <EmptyState
        title="Configure o Supabase para iniciar"
        description="Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel/local. A producao nao usa dados de prototipo."
      />
    );
  }

  if (!hasCompany) {
    return (
      <EmptyState
        title="Usuario aguardando vinculo a uma empresa"
        description="Sua conta autenticou, mas ainda nao esta vinculada a uma empresa ativa. Um admin precisa criar ou aceitar o vinculo em company_members."
      />
    );
  }

  return null;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em] text-solar">{eyebrow}</p>
        <h1 className="text-2xl font-bold leading-tight">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <span className="text-xs text-muted">{label}</span>
      <strong className="mt-2 block text-2xl">{value}</strong>
      <small className="mt-2 block text-sm text-muted">{hint}</small>
    </Card>
  );
}

export function toneForStatus(status: string) {
  if (["Quitado", "Paga", "Ativo", "Em dia", "Homologado", "Instalado"].includes(status)) return "green";
  if (["Em atraso", "Vencida", "Precisa revisao"].includes(status)) return "red";
  if (["Parcialmente pago", "Aguardando instalacao", "Em projeto"].includes(status)) return "solar";
  return "gray";
}

export function toneForLtv(ltv: string) {
  if (ltv === "Estrategico") return "solar";
  if (ltv === "Alto") return "green";
  if (ltv === "Medio") return "blue";
  return "gray";
}
