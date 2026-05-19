# Sun Neo AI - Software Specification Document

Versao: 1.0
Data: 2026-05-17
Status: Especificacao inicial do MVP

## 1. Objetivo do Documento

Este documento define o que o Sun Neo AI deve fazer na primeira versao do produto, quais regras de negocio devem ser respeitadas, como o sistema deve ser arquitetado e como o trabalho deve ser quebrado em tarefas usando Scrum.

Ele deve ser usado antes da programacao como acordo formal de produto, design, arquitetura e escopo. Qualquer funcionalidade fora deste documento deve ser tratada como mudanca de escopo e entrar no backlog para avaliacao.

## 2. Resumo do Produto

Sun Neo AI e um SaaS B2B para empresas de energia solar organizarem CRM, contratos, financeiro, segmentacao de clientes por LTV potencial e dados tecnicos basicos das instalacoes.

O sistema sera usado por donos, equipe comercial, equipe financeira e equipe tecnica de instaladoras ou integradoras solares. Nao existe portal ou aplicativo para cliente final no MVP.

Proposta central:

> O CRM financeiro e operacional da empresa solar.

## 3. Escopo do MVP

### 3.1 Dentro do escopo

- Cadastro de empresas solares e usuarios internos.
- Login e controle de acesso por perfil.
- CRM com leads, clientes, pipeline e follow-ups.
- Cadastro de contratos fechados.
- Gestor financeiro simples por contrato.
- Parcelas, recebimentos, custos, margem e inadimplencia.
- Segmentacao de clientes por LTV potencial.
- Cadastro tecnico basico do sistema solar.
- Registro de inversor, conta de luz, consumo e status da instalacao.
- Relatorios basicos para gestao.
- Tema claro e tema escuro com as mesmas funcionalidades.

### 3.2 Fora do escopo do MVP

- Portal para cliente final.
- Aplicativo para cliente final.
- Marketplace de equipamentos.
- Modelagem 3D de telhado.
- Projeto tecnico automatico.
- Integracao obrigatoria com APIs de inversores.
- Open Finance.
- IA preditiva avancada.
- Automacao completa de WhatsApp.
- Integracao com distribuidoras.
- ERP completo.

## 4. Personas e Perfis de Acesso

### 4.1 Dono ou Admin

Responsavel por configurar a empresa, visualizar tudo, acompanhar indicadores e gerenciar usuarios.

Permissoes:

- Criar, editar e desativar usuarios.
- Ver todos os leads, clientes, contratos e relatorios.
- Alterar status de contratos.
- Ver dados financeiros completos.
- Configurar preferencias da empresa.

### 4.2 Comercial

Responsavel por leads, pipeline, propostas, follow-ups e conversao.

Permissoes:

- Criar e editar leads.
- Avancar oportunidades no pipeline.
- Registrar interacoes.
- Criar tarefas de follow-up.
- Converter lead em cliente e contrato.
- Ver contratos vinculados aos clientes que atende, sem editar custos internos se a empresa restringir acesso.

### 4.3 Financeiro

Responsavel por valores, parcelas, recebimentos, custos, margem e inadimplencia.

Permissoes:

- Ver contratos fechados.
- Criar e editar parcelas.
- Registrar pagamentos.
- Registrar custos.
- Ver margem estimada.
- Marcar parcelas como pagas, vencidas, pendentes ou canceladas.

### 4.4 Tecnico

Responsavel por dados da instalacao, inversor, conta de luz, potencia, modulos, status tecnico e manutencoes.

Permissoes:

- Ver contratos atribuidos ou liberados para a equipe tecnica.
- Editar dados tecnicos.
- Atualizar status da instalacao.
- Registrar observacoes tecnicas.
- Registrar necessidade de revisao ou manutencao.

## 5. Modulos do Sistema

### 5.1 Dashboard

Tela inicial para donos e gestores acompanharem a operacao.

Deve mostrar:

- Total de leads ativos.
- Contratos fechados no periodo.
- Receita prevista.
- Valor em aberto.
- Parcelas vencidas.
- Margem estimada total.
- Clientes por LTV potencial.
- Contratos por status tecnico.

### 5.2 CRM e Pipeline

Modulo para capturar, organizar e acompanhar oportunidades.

Etapas padrao do pipeline:

1. Novo lead.
2. Contato feito.
3. Diagnostico.
4. Proposta enviada.
5. Negociacao.
6. Contrato fechado.
7. Perdido.

Campos minimos de lead:

- Nome ou razao social.
- Tipo de cliente: residencial, comercial, rural, industrial ou condominio.
- Telefone.
- Email opcional.
- Cidade e estado.
- Origem do lead.
- Consumo medio informado.
- Responsavel comercial.
- Status no pipeline.
- Proxima tarefa.
- Observacoes.

### 5.3 Clientes e Segmentacao por LTV

Modulo para organizar a carteira depois que o lead vira cliente.

Campos minimos de cliente:

- Nome ou razao social.
- CPF ou CNPJ opcional no MVP.
- Tipo de cliente.
- Telefone.
- Email.
- Endereco.
- Cidade e estado.
- Responsavel interno.
- LTV potencial: baixo, medio, alto ou estrategico.
- Motivo do LTV.
- Tags internas.
- Observacoes.

Regras de LTV:

- Baixo: sistema pequeno, contrato unico e baixa chance de expansao.
- Medio: consumo relevante, possibilidade de manutencao anual ou indicacao.
- Alto: empresa, comercio, rural ou cliente com mais de uma unidade consumidora.
- Estrategico: alto consumo, varias unidades, potencial de recorrencia, expansao ou indicacoes qualificadas.

No MVP, o LTV e definido manualmente pelo usuario. O sistema deve apenas orientar a classificacao.

### 5.4 Contratos

Modulo central que liga cliente, financeiro e tecnico.

Campos minimos de contrato:

- Cliente vinculado.
- Responsavel comercial.
- Numero ou identificador interno.
- Data de fechamento.
- Valor total.
- Status comercial.
- Status financeiro.
- Status tecnico.
- Observacoes.

Status comercial:

- Proposta.
- Fechado.
- Perdido.
- Cancelado.

Status financeiro:

- Sem financeiro cadastrado.
- Em dia.
- Parcialmente pago.
- Em atraso.
- Quitado.
- Cancelado.

Status tecnico:

- Nao iniciado.
- Em projeto.
- Aguardando instalacao.
- Instalado.
- Homologado.
- Ativo.
- Precisa revisao.

### 5.5 Financeiro

Modulo para controlar dinheiro por contrato, sem substituir ERP ou banco.

Campos financeiros:

- Valor total do contrato.
- Entrada.
- Numero de parcelas.
- Vencimento de cada parcela.
- Valor de cada parcela.
- Status de cada parcela.
- Custos de equipamento.
- Custos de mao de obra.
- Custos de deslocamento.
- Taxas.
- Comissao.
- Outros custos.
- Margem estimada.

Formula da margem estimada:

```text
margem_estimada = valor_total_contrato - soma_de_custos
percentual_margem = margem_estimada / valor_total_contrato * 100
```

Status de parcela:

- Pendente.
- Paga.
- Vencida.
- Cancelada.

### 5.6 Operacao Tecnica

Modulo para guardar os dados basicos do sistema solar vendido ou instalado.

Campos tecnicos:

- Contrato vinculado.
- Marca do inversor.
- Modelo do inversor.
- Potencia do inversor.
- Potencia total do sistema.
- Quantidade de modulos.
- Marca dos modulos, se informada.
- Consumo medio mensal da conta de luz.
- Concessionaria.
- Modalidade: residencial, comercial, rural, industrial, condominio ou autoconsumo remoto.
- Data prevista de instalacao.
- Data real de instalacao.
- Status tecnico.
- Observacoes tecnicas.
- Necessita revisao: sim ou nao.

No MVP, os dados de inversor sao cadastrados manualmente pela equipe. Integracoes com fabricantes ficam para roadmap futuro.

### 5.7 Relatorios

Relatorios minimos:

- Leads por etapa do pipeline.
- Contratos fechados por periodo.
- Receita prevista por mes.
- Parcelas vencidas.
- Margem estimada por contrato.
- Clientes por LTV potencial.
- Contratos por status tecnico.

## 6. Fluxos por Usuario

### 6.1 Fluxo do Comercial

1. Comercial cria um lead.
2. Preenche nome, telefone, tipo de cliente, origem e consumo medio quando disponivel.
3. Move o lead no pipeline conforme contato evolui.
4. Registra interacoes e proximas tarefas.
5. Quando a venda fecha, converte o lead em cliente.
6. Cria contrato vinculado ao cliente.
7. Define valor total, data de fechamento e responsavel.
8. Encaminha contrato para financeiro e tecnico completarem seus dados.

Criterio de sucesso:

- Um lead pode virar cliente e contrato sem duplicar informacoes essenciais.

### 6.2 Fluxo do Dono ou Admin

1. Admin acessa o dashboard.
2. Verifica leads ativos, contratos fechados, receita prevista e inadimplencia.
3. Filtra clientes por LTV potencial.
4. Identifica clientes estrategicos sem follow-up.
5. Acompanha contratos com margem baixa ou status tecnico atrasado.
6. Ajusta usuarios e permissoes quando necessario.

Criterio de sucesso:

- O dono consegue entender a situacao da empresa sem abrir planilhas externas.

### 6.3 Fluxo do Financeiro

1. Financeiro acessa contratos fechados.
2. Abre contrato sem financeiro cadastrado.
3. Registra entrada, parcelas e vencimentos.
4. Registra custos principais.
5. Sistema calcula margem estimada.
6. Financeiro marca parcelas como pagas quando recebe.
7. Sistema destaca parcelas vencidas.

Criterio de sucesso:

- Cada contrato fechado pode ter receita, custos, margem e status de pagamento visiveis.

### 6.4 Fluxo do Tecnico

1. Tecnico acessa contratos aguardando dados tecnicos.
2. Registra inversor, potencia, modulos, concessionaria e consumo medio.
3. Atualiza status tecnico conforme a operacao avanca.
4. Registra data de instalacao.
5. Marca necessidade de revisao ou manutencao quando aplicavel.

Criterio de sucesso:

- A empresa consegue consultar rapidamente qual sistema foi vendido ou instalado para cada cliente.

### 6.5 Fluxo de Segmentacao por LTV

1. Usuario abre cadastro do cliente.
2. Analisa tipo de cliente, consumo, tamanho do sistema, contrato e potencial futuro.
3. Seleciona LTV baixo, medio, alto ou estrategico.
4. Registra motivo da classificacao.
5. Cliente aparece em relatorios e listas de priorizacao.

Criterio de sucesso:

- A carteira pode ser filtrada por prioridade comercial e potencial futuro.

## 7. Regras de Negocio

### 7.1 Empresas e usuarios

- Todo usuario pertence a uma empresa solar.
- Um usuario nao pode acessar dados de outra empresa.
- Toda consulta de dados deve respeitar isolamento por empresa.
- Admin pode convidar, editar ou desativar usuarios da propria empresa.
- Usuario desativado nao pode acessar o sistema.

### 7.2 Leads e clientes

- Lead nao precisa ter contrato.
- Cliente pode existir sem contrato, mas contrato nao pode existir sem cliente.
- Lead convertido deve gerar ou vincular um cliente.
- Pipeline deve aceitar apenas uma etapa ativa por lead.
- Lead perdido deve ter motivo opcional de perda.

### 7.3 Contratos

- Todo contrato deve estar vinculado a um cliente.
- Contrato fechado deve ter valor total maior que zero.
- Contrato pode existir antes dos dados financeiros completos.
- Contrato pode existir antes dos dados tecnicos completos.
- Status financeiro e tecnico devem ser independentes.
- Cancelar contrato nao deve apagar historico financeiro ou tecnico.

### 7.4 Financeiro

- Soma de custos nunca deve alterar automaticamente o valor total do contrato.
- Margem estimada deve ser recalculada quando valor total ou custos mudarem.
- Parcela vencida e parcela pendente com data anterior ao dia atual.
- Parcela paga nao deve ser marcada como vencida.
- Parcela cancelada nao entra em inadimplencia.
- Contrato quitado e contrato em que todas as parcelas validas estao pagas.

### 7.5 LTV potencial

- LTV potencial e obrigatorio para cliente com contrato fechado.
- Valor padrao ao criar cliente: nao classificado.
- O sistema deve permitir alterar LTV manualmente.
- Toda classificacao de LTV deve permitir uma justificativa textual.
- LTV nao deve ser calculado por IA no MVP.

### 7.6 Tecnico

- Dados tecnicos pertencem a um contrato.
- Um contrato pode ter no maximo um cadastro tecnico principal no MVP.
- Marca e modelo do inversor sao campos livres no MVP.
- Consumo medio pode ser informado manualmente a partir da conta de luz.
- Conta de luz pode ser registrada como dados digitados e, futuramente, como anexo.
- Integracao com API de inversor nao e requisito do MVP.

## 8. Arquitetura Tecnica

### 8.1 Stack

- Frontend e backend de aplicacao: Next.js.
- Banco de dados: Supabase Postgres.
- Autenticacao: Supabase Auth.
- Autorizacao: Supabase Row Level Security.
- Storage: Supabase Storage para anexos simples em evolucao posterior.
- Deploy sugerido: Vercel para Next.js e Supabase Cloud para banco/auth.

### 8.2 Estrutura de rotas sugerida

```text
/login
/app/dashboard
/app/crm
/app/clientes
/app/clientes/[id]
/app/contratos
/app/contratos/[id]
/app/financeiro
/app/tecnico
/app/relatorios
/app/configuracoes/usuarios
/app/configuracoes/empresa
```

### 8.3 Entidades principais

```text
companies
users
leads
customers
contracts
contract_installments
contract_costs
technical_records
tasks
interactions
attachments
```

Campos comuns recomendados:

- id.
- company_id.
- created_at.
- updated_at.
- created_by.
- updated_by.
- deleted_at opcional para soft delete em entidades de negocio.

### 8.4 Relacionamentos principais

- company tem muitos users.
- company tem muitos leads.
- company tem muitos customers.
- lead pode gerar customer.
- customer tem muitos contracts.
- contract tem muitas installments.
- contract tem muitos costs.
- contract tem um technical_record principal.
- lead, customer ou contract podem ter tasks.
- lead, customer ou contract podem ter interactions.

### 8.5 Segurança e isolamento

- Todas as tabelas de negocio devem ter `company_id`.
- RLS deve bloquear acesso entre empresas.
- Usuarios autenticados so consultam registros da propria empresa.
- Admin gerencia somente usuarios da propria empresa.
- Financeiro completo deve ficar restrito a Admin e Financeiro.
- Tecnico pode editar apenas dados tecnicos e status operacional.

### 8.6 Camadas da aplicacao

- UI components: componentes visuais reutilizaveis.
- Feature modules: CRM, clientes, contratos, financeiro, tecnico e relatorios.
- Data access: funcoes de leitura e escrita no Supabase.
- Validation: validacao de formularios e regras basicas.
- Auth/session: protecao de rotas e contexto da empresa.
- Theme provider: alternancia entre modo claro e escuro.

## 9. Design System e Experiencia

### 9.1 Skills de design consideradas

O desenvolvimento visual deve usar o `DESIGN_SKILLS.md` como referencia de capacidades do projeto, principalmente:

- `creative-design/frontend-design`
- `creative-design/ui-ux-pro-max`
- `creative-design/ui-design-system`
- `web-development/react-best-practices`
- `web-development/webapp-testing`
- `web-development/web-performance-optimization`
- `database/supabase-postgres-best-practices`

### 9.2 Direcao de interface

- O sistema deve parecer uma ferramenta de gestao operacional, nao uma landing page.
- Telas devem priorizar leitura rapida, tabelas, filtros, status e acoes claras.
- Evitar componentes decorativos sem funcao.
- Usar cards apenas para indicadores, listas repetidas ou agrupamentos realmente uteis.
- Tabelas devem ter filtros por status, responsavel, periodo e LTV quando aplicavel.
- Formularios devem ser divididos por secoes claras.

### 9.3 Tema claro

- Fundo principal: branco ou cinza muito claro.
- Superficies: branco.
- Texto principal: cinza muito escuro.
- Bordas: cinza claro.
- Destaque: amarelo solar ou verde moderado para acoes positivas.
- Alertas financeiros: vermelho para vencido, amarelo para atencao, verde para pago.

### 9.4 Tema escuro

- Fundo principal: cinza-escuro.
- Superficies: cinza escuro levemente mais claro que o fundo.
- Texto principal: branco ou cinza muito claro.
- Bordas: cinza medio escuro.
- Destaque: mesmos tons de acao do tema claro, ajustados para contraste.
- Alertas financeiros mantem semantica de cor.

### 9.5 Regra de paridade entre temas

Modo claro e modo escuro devem ter as mesmas telas, funcoes, etapas e permissoes. A troca de tema altera somente tokens de cor, contraste e superficies. Nenhum fluxo de negocio deve mudar por causa do tema.

## 10. Scrum

### 10.1 Papeis

- Product Owner: prioriza backlog e valida escopo do MVP.
- Scrum Master: remove impedimentos e protege o processo.
- Dev Team: implementa frontend, backend, banco, testes e design system.

### 10.2 Cerimonias

- Sprint Planning: definir tarefas da sprint e criterios de aceite.
- Daily: alinhar progresso, bloqueios e proximas acoes.
- Sprint Review: demonstrar o que ficou pronto.
- Retrospective: ajustar processo e qualidade.
- Backlog Refinement: detalhar proximas historias antes da sprint.

### 10.3 Cadencia

Sprints de 1 semana para fase inicial. Se o time for pequeno ou parcial, usar sprints de 2 semanas.

### 10.4 Definition of Ready

Uma tarefa esta pronta para entrar na sprint quando:

- Tem objetivo claro.
- Tem criterio de aceite.
- Tem dados ou telas envolvidas definidos.
- Tem dependencias conhecidas.
- Pode ser estimada pelo time.

### 10.5 Definition of Done

Uma tarefa esta pronta quando:

- Implementacao concluida.
- Regras de negocio aplicadas.
- Estados de loading, vazio e erro tratados quando houver UI.
- Testes relevantes executados.
- Tema claro e escuro verificados quando houver UI.
- Acesso por perfil respeitado.
- Sem regressao conhecida no fluxo principal.

## 11. Product Backlog e Tasks

### Epico 1: Fundacao do projeto

Task 1.1: Criar projeto Next.js

- Objetivo: iniciar base da aplicacao.
- Aceite: projeto roda localmente e possui estrutura inicial de rotas.
- Done: build inicial funciona sem erro.

Task 1.2: Configurar Supabase

- Objetivo: conectar aplicacao ao Supabase.
- Aceite: variaveis de ambiente e client Supabase configurados.
- Done: app consegue consultar sessao autenticada.

Task 1.3: Criar estrutura base de layout

- Objetivo: criar layout autenticado com sidebar, topo e area principal.
- Aceite: rotas internas compartilham navegacao.
- Done: layout funciona em desktop e telas menores.

### Epico 2: Autenticacao e multiempresa

Task 2.1: Implementar login

- Objetivo: permitir acesso com Supabase Auth.
- Aceite: usuario autenticado entra no app; usuario nao autenticado volta ao login.
- Done: fluxo testado com sucesso e falha.

Task 2.2: Criar tabelas de empresa e usuarios

- Objetivo: guardar empresa, perfil e vinculo do usuario.
- Aceite: usuario pertence a uma empresa.
- Done: RLS impede acesso entre empresas.

Task 2.3: Implementar permissoes por perfil

- Objetivo: restringir areas por Admin, Comercial, Financeiro e Tecnico.
- Aceite: usuario ve apenas o que seu perfil permite.
- Done: rotas e acoes sensiveis protegidas.

### Epico 3: CRM e pipeline

Task 3.1: Criar modelagem de leads

- Objetivo: guardar leads e etapas do pipeline.
- Aceite: lead tem dados minimos e status.
- Done: CRUD basico funcionando com RLS.

Task 3.2: Criar tela de pipeline

- Objetivo: visualizar leads por etapa.
- Aceite: usuario move lead entre etapas.
- Done: mudanca persiste no banco.

Task 3.3: Criar historico e tarefas

- Objetivo: registrar interacoes e proximas acoes.
- Aceite: lead exibe historico e tarefa futura.
- Done: tarefas aparecem para responsavel.

### Epico 4: Clientes e LTV

Task 4.1: Criar cadastro de clientes

- Objetivo: manter carteira de clientes.
- Aceite: usuario cria, edita e lista clientes.
- Done: filtros por tipo e responsavel funcionam.

Task 4.2: Implementar segmentacao por LTV

- Objetivo: classificar cliente por potencial.
- Aceite: cliente aceita LTV baixo, medio, alto, estrategico ou nao classificado.
- Done: justificativa pode ser registrada.

Task 4.3: Converter lead em cliente

- Objetivo: evitar retrabalho entre CRM e carteira.
- Aceite: lead fechado gera cliente vinculado.
- Done: dados principais sao reaproveitados.

### Epico 5: Contratos

Task 5.1: Criar contratos vinculados a clientes

- Objetivo: centralizar venda fechada.
- Aceite: contrato nao existe sem cliente.
- Done: contrato aparece no cliente e na lista geral.

Task 5.2: Implementar status comercial, financeiro e tecnico

- Objetivo: acompanhar estados independentes.
- Aceite: cada status pode mudar sem afetar os outros indevidamente.
- Done: filtros por status funcionam.

### Epico 6: Financeiro

Task 6.1: Criar parcelas do contrato

- Objetivo: controlar recebimentos.
- Aceite: parcelas possuem valor, vencimento e status.
- Done: parcelas vencidas sao destacadas.

Task 6.2: Criar custos do contrato

- Objetivo: registrar custos principais.
- Aceite: custos por categoria podem ser adicionados.
- Done: soma de custos aparece no contrato.

Task 6.3: Calcular margem estimada

- Objetivo: mostrar lucro estimado.
- Aceite: margem atualiza quando valor ou custos mudam.
- Done: margem em valor e percentual aparece no contrato.

Task 6.4: Criar tela financeira

- Objetivo: mostrar contas a receber e atrasos.
- Aceite: financeiro ve vencidas, pendentes e pagas.
- Done: filtros por periodo e status funcionam.

### Epico 7: Operacao tecnica

Task 7.1: Criar cadastro tecnico por contrato

- Objetivo: registrar sistema solar vendido ou instalado.
- Aceite: contrato tem inversor, potencia, modulos e consumo.
- Done: dados tecnicos aparecem no contrato.

Task 7.2: Atualizar status tecnico

- Objetivo: acompanhar instalacao.
- Aceite: tecnico muda status conforme fluxo.
- Done: dashboard reflete status tecnico.

Task 7.3: Registrar revisao ou manutencao

- Objetivo: sinalizar necessidade futura.
- Aceite: contrato pode ser marcado como precisa revisao.
- Done: filtro de revisao funciona.

### Epico 8: Relatorios e dashboard

Task 8.1: Criar dashboard inicial

- Objetivo: resumir gestao da empresa.
- Aceite: cards exibem indicadores basicos.
- Done: dados respeitam empresa do usuario.

Task 8.2: Criar relatorios basicos

- Objetivo: permitir leitura operacional.
- Aceite: relatorios de pipeline, contratos, financeiro, LTV e tecnico existem.
- Done: filtros principais funcionam.

### Epico 9: Design system e temas

Task 9.1: Criar tokens de design

- Objetivo: padronizar cores, espacos, tipografia e estados.
- Aceite: tokens existem para claro e escuro.
- Done: componentes usam tokens, nao cores soltas.

Task 9.2: Criar componentes base

- Objetivo: acelerar UI consistente.
- Aceite: botao, input, select, tabela, card, badge e modal existem.
- Done: componentes funcionam nos dois temas.

Task 9.3: Implementar alternancia de tema

- Objetivo: permitir modo claro e escuro.
- Aceite: usuario alterna tema sem mudar fluxo.
- Done: preferencia persiste.

### Epico 10: Qualidade e testes

Task 10.1: Testar regras de negocio criticas

- Objetivo: evitar erros de margem, parcelas e permissoes.
- Aceite: testes cobrem calculos e status.
- Done: suite passa.

Task 10.2: Testar fluxos principais

- Objetivo: validar jornada de uso.
- Aceite: login, lead, cliente, contrato, financeiro e tecnico sao testados.
- Done: fluxo principal passa ponta a ponta.

Task 10.3: Testar acessibilidade basica

- Objetivo: garantir uso profissional.
- Aceite: contraste, foco e labels principais funcionam.
- Done: telas principais sao navegaveis por teclado.

## 12. Tarefas Paralelas Recomendadas

Podem rodar em paralelo apos alinhamento inicial:

- Design system e tokens.
- Modelagem do banco e RLS.
- Layout autenticado.
- Especificacao visual das telas principais.

Devem ser sequenciais:

- Autenticacao antes das rotas internas protegidas.
- Empresa e usuarios antes de RLS completa.
- Clientes antes de contratos.
- Contratos antes de financeiro e tecnico.
- Dados reais antes de relatorios.

## 13. Testes de Aceitacao do MVP

### 13.1 Login e isolamento

- Dado um usuario de uma empresa, quando ele acessa o sistema, entao deve ver apenas dados da propria empresa.
- Dado um usuario desativado, quando tenta acessar, entao o sistema deve bloquear entrada.

### 13.2 CRM

- Dado um lead novo, quando o comercial move para proposta enviada, entao a nova etapa deve persistir.
- Dado um lead fechado, quando convertido, entao deve gerar cliente e contrato vinculados.

### 13.3 Clientes e LTV

- Dado um cliente com contrato fechado, quando o usuario classifica LTV como alto, entao essa classificacao deve aparecer nos relatorios.
- Dado um cliente sem classificacao, quando listado, entao deve aparecer como nao classificado.

### 13.4 Contratos e financeiro

- Dado um contrato de R$ 50.000 com R$ 35.000 de custos, quando salvo, entao a margem deve ser R$ 15.000.
- Dado uma parcela pendente vencida, quando a data atual passa do vencimento, entao ela deve aparecer como vencida.
- Dado todas as parcelas pagas, quando o contrato e consultado, entao o status financeiro pode ser quitado.

### 13.5 Tecnico

- Dado um contrato fechado, quando o tecnico registra inversor e potencia, entao os dados devem aparecer no cadastro tecnico do contrato.
- Dado um contrato marcado como precisa revisao, quando filtrado no modulo tecnico, entao ele deve aparecer na lista de revisao.

### 13.6 Temas

- Dado o usuario no modo claro, quando muda para modo escuro, entao todas as funcoes permanecem iguais.
- Dado uma tela com tabela e formulario, quando troca o tema, entao contraste e legibilidade devem continuar aceitaveis.

## 14. Criterios de Aceite do Produto

O MVP pode ser considerado pronto para piloto quando:

- Admin consegue cadastrar empresa e usuarios.
- Comercial consegue criar lead, mover pipeline e fechar contrato.
- Financeiro consegue registrar parcelas, custos e margem.
- Tecnico consegue registrar dados do sistema solar.
- Dono consegue ver dashboard e relatorios basicos.
- LTV potencial aparece em clientes e relatorios.
- Dados ficam isolados por empresa.
- Tema claro e escuro funcionam sem alterar etapas.
- Principais fluxos foram testados.

## 15. Roadmap Pos-MVP

Itens futuros, fora da primeira entrega:

- Importacao de planilhas.
- Templates de proposta.
- Anexos de conta de luz e documentos.
- Integracao seletiva com WhatsApp.
- Integracao seletiva com inversores mais usados.
- Sugestoes automaticas de upsell.
- Relatorios avancados de carteira.
- Modulo de manutencao recorrente mais completo.

