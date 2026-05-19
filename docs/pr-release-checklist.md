# PR and Release Checklist

## Before Merge

- `npm run typecheck`
- `npm run build`
- revisar migration Supabase;
- confirmar `.env` fora do Git;
- confirmar `.next`, `node_modules` e `.vercel` ignorados;
- confirmar ausencia de seed de negocio;
- revisar PR como draft ate Supabase real estar configurado.

## Supabase Validation

- migration executada sem erro;
- RLS ativo nas tabelas;
- Google OAuth habilitado;
- Email/Password habilitado;
- Phone Auth habilitado;
- callback `/auth/callback` configurado;
- primeiro admin ativo em `company_members`;
- username unico em `profiles.username`.

## User Journey Validation

- Google login;
- username + senha;
- telefone OTP;
- usuario sem empresa ativa bloqueado;
- dashboard vazio;
- cadastro de lead;
- cadastro de cliente;
- cadastro de contrato;
- criacao de parcela;
- registro tecnico;
- relatorios com dados reais.

## Rollback

- Se auth falhar, reverter variaveis de ambiente ou desabilitar provider problematico.
- Se migration falhar antes de dados reais, recriar projeto Supabase limpo e reexecutar.
- Se RLS bloquear fluxo legitimo, corrigir policy em nova migration antes de liberar usuario final.
