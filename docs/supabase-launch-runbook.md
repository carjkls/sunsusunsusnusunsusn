# Supabase Launch Runbook

Este runbook prepara o banco e a autenticacao de producao do Sun Neo AI. A producao nasce sem leads, clientes, contratos, parcelas, custos ou dados tecnicos.

## 1. Projeto Supabase

1. Crie um projeto Supabase de producao.
2. Copie:
   - Project URL
   - anon public key
   - service role key
3. Na Vercel, configure:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL=https://SEU_DOMINIO`
4. Rode um redeploy depois de salvar as variaveis.

## 2. Banco

1. Abra Supabase > SQL Editor.
2. Copie todo o arquivo `supabase/migrations/202605190001_initial_schema.sql`.
3. Execute uma vez.
4. Confirme que existem:
   - tabelas de negocio;
   - enums;
   - RLS habilitado;
   - policies;
   - triggers;
   - RPC `resolve_username_login`.

## 3. Auth Providers

Ative no Supabase Auth:

- Email/Password.
- Google OAuth.
- Phone Auth com OTP SMS.

Configure em Auth > URL Configuration:

- Site URL: `https://SEU_DOMINIO`
- Redirect URLs:
  - `https://SEU_DOMINIO/auth/callback`
  - `http://localhost:3000/auth/callback`

## 4. Google OAuth

1. Crie credenciais OAuth no Google Cloud.
2. No Google Cloud, adicione o callback informado pelo painel Supabase para Google Provider.
3. No Supabase, preencha Client ID e Client Secret.
4. Teste `Entrar com Google`.

## 5. Telefone OTP

1. Ative Phone Auth no Supabase.
2. Configure o provedor SMS padrao disponivel na conta Supabase.
3. Teste com telefone em formato E.164, por exemplo `+5586999999999`.
4. Valide que o usuario autenticado sem empresa ativa nao acessa dados.

## 6. Primeiro Admin

Crie primeiro o usuario em Supabase Auth. Depois execute um SQL parecido com este, trocando os valores:

```sql
insert into public.companies (name, document, city, state, plan_key)
values ('Nome da Empresa Solar', null, 'Teresina', 'PI', 'business')
returning id;

update public.profiles
set
  full_name = 'Nome do Admin',
  username = 'adminsolar',
  phone = '+5586999999999'
where email = 'admin@empresa.com';

insert into public.company_members (company_id, user_id, role, status)
select
  'UUID_DA_EMPRESA',
  id,
  'admin',
  'active'
from auth.users
where email = 'admin@empresa.com';
```

Depois disso, o admin deve acessar `/app/dashboard`.

## 7. Smoke Test

Teste em producao:

- login por Google;
- login por `@username + senha`;
- login por telefone OTP;
- acesso bloqueado para usuario sem empresa ativa;
- dashboard vazio para empresa nova;
- cadastro de lead real;
- cadastro de cliente real;
- cadastro de contrato real;
- parcela e margem;
- dados tecnicos.
