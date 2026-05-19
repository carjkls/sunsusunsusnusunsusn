# Security Release Review

Esta revisao cobre o lancamento inicial do Sun Neo AI usando uma postura defensiva e testes ofensivos autorizados. Nao executar varredura intrusiva contra terceiros.

## Blue Team

- RLS deve permanecer ativo em todas as tabelas de negocio.
- Toda tabela operacional deve filtrar por `company_id`.
- Usuario autenticado sem `company_members.status = active` nao deve operar dados.
- `SUPABASE_SERVICE_ROLE_KEY` deve existir apenas em ambiente server/Vercel, nunca no client.
- Vercel deve marcar variaveis sensiveis como protegidas quando disponivel.
- Google OAuth deve aceitar apenas redirect URLs controladas.
- Phone Auth deve usar OTP com limite de tentativas do provedor.
- Mensagens de erro de login nao devem revelar se username/email existe.
- Dados financeiros devem ficar restritos a `admin` e `financeiro`.
- Dados tecnicos devem ser escritos por `admin` e `tecnico`.

## Red Team Autorizado

Executar apenas contra o proprio ambiente:

- Acessar `/app/dashboard` sem sessao e confirmar redirect para `/login`.
- Autenticar usuario sem empresa ativa e confirmar bloqueio operacional.
- Tentar inserir lead com `company_id` de outra empresa.
- Tentar listar clientes de outra empresa.
- Tentar alterar custos com perfil `comercial`.
- Tentar editar tecnico com perfil `financeiro`.
- Tentar login com username inexistente e verificar erro generico.
- Tentar OTP com telefone invalido e verificar falha controlada.
- Inspecionar bundle client para confirmar ausencia de `SUPABASE_SERVICE_ROLE_KEY`.
- Conferir que `.env`, `.vercel`, `.next` e `node_modules` nao estao versionados.

## OWASP Focus

- A01 Broken Access Control: principal risco do SaaS multiempresa; mitigacao via RLS, middleware e policies por perfil.
- A03 Injection: app usa Supabase client/query builder e Server Actions; SQL dinamico nao deve ser introduzido sem parametros.
- A07 Identification and Authentication Failures: Google OAuth, senha e SMS devem usar provedores Supabase; erros permanecem genericos.
- A09 Security Logging and Monitoring Failures: acompanhar logs Supabase Auth, Vercel Functions e erros RLS.

## Operational Monitoring

Monitorar:

- picos de falha de login;
- OTP excessivo por telefone/IP;
- erros `permission denied` por RLS;
- excecoes em Server Actions;
- inserts/updates negados em financeiro e tecnico;
- alteracoes em `company_members`.

## Secrets Checklist

- `NEXT_PUBLIC_SUPABASE_URL`: publico.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: publico, protegido por RLS.
- `SUPABASE_SERVICE_ROLE_KEY`: secreto, nunca usado em Client Components.
- Google Client Secret: armazenado no Supabase/Google, nao no repo.
- SMS provider credentials: armazenadas no Supabase/provedor, nao no repo.
