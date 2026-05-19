# Sun Neo AI

SaaS B2B para empresas de energia solar organizarem CRM, clientes, contratos, financeiro, operacao tecnica e relatorios.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth/Postgres/RLS
- Vercel

## Rodar local

```bash
npm install
npm run dev
```

O dev server usa Turbopack por padrao. Para usar webpack:

```bash
npm run dev:webpack
```

## Variaveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase

1. Crie um projeto Supabase.
2. Rode as migrations em `supabase/migrations`.
3. Ative Email/Password, Google OAuth e Phone Auth com SMS.
4. Configure os callbacks:
   - `http://localhost:3000/auth/callback`
   - `https://SEU_DOMINIO/auth/callback`

O banco de producao nasce sem leads, clientes, contratos ou dados de prototipo.

Runbook completo:

- `docs/supabase-launch-runbook.md`

## Deploy na Vercel

- Framework Preset: `Next.js`
- Root Directory: `./` se este repositorio for a raiz do projeto
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: vazio/padrao

Configure as mesmas variaveis de ambiente na Vercel antes do deploy.

## Release e Seguranca

- `SECURITY.md`
- `docs/security-release-review.md`
- `docs/market-stakeholder-context.md`
- `docs/pr-release-checklist.md`
