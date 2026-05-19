# Sun Neo AI - Brainstorming e Contexto de Produto

> Documento vivo para orientar o MVP do Sun Neo AI: um software simples, B2B, feito para empresas de energia solar organizarem clientes, contratos, financeiro e operacao.

---

## Visao Geral do Produto

**Sun Neo AI** e um SaaS para empresas de energia solar que ainda operam com WhatsApp, planilhas e controles soltos. A primeira versao deve ser simples: um CRM financeiro e operacional para o dono, equipe comercial, financeiro e equipe tecnica acompanharem a carteira de clientes e os contratos fechados.

**Proposta de valor central:**

> "CRM, financeiro e carteira tecnica para empresas solares acompanharem cada cliente, contrato e instalacao em um so lugar."

O produto nao nasce como portal para cliente final, marketplace, sistema tecnico completo ou plataforma de IA avancada. O foco inicial e ajudar a empresa solar a responder perguntas basicas de gestao:

- Quem sao meus leads, clientes e contratos ativos?
- Em qual etapa cada oportunidade ou contrato esta?
- Quanto cada contrato gerou de receita, custo e margem?
- Quais clientes tem maior potencial de LTV?
- Qual inversor, sistema e conta de luz estao associados a cada cliente?
- Quais clientes podem virar manutencao, expansao ou novo contrato no futuro?

---

## Cliente do Produto

O usuario do Sun Neo AI e a **empresa de energia solar**, nao o consumidor final.

### ICP inicial

- Instaladoras e integradoras solares pequenas e medias.
- Empresas com 3 a 30 funcionarios.
- Operacao comercial, tecnica e financeira ainda muito dependente de WhatsApp e planilha.
- Empresas que fecham contratos residenciais, comerciais, rurais ou industriais, mas precisam de uma visao interna melhor da carteira.
- Donos que querem saber quais clientes valem mais atencao, quais contratos deram lucro e onde o dinheiro esta travando.

### Fora do escopo inicial

- Portal ou aplicativo para cliente final.
- Marketplace de equipamentos.
- Projeto eletrico automatico.
- Modelagem 3D de telhado.
- Integracoes bancarias complexas.
- Integracao obrigatoria com APIs de inversores no MVP.
- IA preditiva sofisticada para churn, falha ou upsell automatico.

---

## Dores Principais do Mercado

### 1. CRM e historico comercial

| Dor | Impacto |
|-----|---------|
| Leads ficam espalhados no WhatsApp | Vendedor esquece follow-up e perde venda |
| Cliente passa por varias pessoas sem historico claro | Atendimento depende da memoria da equipe |
| Pipeline nao e padronizado | Dono nao sabe previsao real de fechamento |
| Propostas e contratos nao ficam centralizados | Dificulta gestao e pos-venda |

**Solucao MVP:**

- Cadastro de lead, cliente e empresa.
- Pipeline simples: novo lead, contato feito, proposta enviada, negociacao, contrato fechado, perdido.
- Historico de interacoes, observacoes e proximas tarefas.
- Vinculo entre cliente, proposta, contrato e dados tecnicos basicos.

---

### 2. Gestao de clientes e segmentacao por LTV

| Dor | Impacto |
|-----|---------|
| Todos os clientes recebem a mesma atencao | Clientes com maior potencial ficam esquecidos |
| Empresa nao sabe quem pode comprar manutencao ou expansao | Receita recorrente e upsell nao acontecem |
| Contrato fechado vira arquivo morto | LTV fica limitado ao ticket inicial |
| Nao existe classificacao por perfil e necessidade | Comercial nao prioriza bem a carteira |

**Solucao MVP:**

- Classificacao de clientes por tipo: residencial, comercial, rural, industrial ou condominio.
- Segmentacao por LTV potencial: baixo, medio, alto ou estrategico.
- Campos simples para justificar o potencial: consumo mensal, tamanho do sistema, perfil do contrato, chance de expansao, necessidade de manutencao, quantidade de unidades ou recorrencia possivel.
- Lista de clientes prioritarios para follow-up comercial ou tecnico.

**Exemplo de regra simples de LTV potencial:**

- **Baixo:** sistema pequeno, contrato unico, baixa chance de expansao.
- **Medio:** cliente com consumo relevante, possibilidade de manutencao anual ou indicacao.
- **Alto:** empresa, comercio, rural ou cliente com mais de uma unidade consumidora.
- **Estrategico:** cliente com alto consumo, varias unidades, potencial de recorrencia, expansao ou indicacoes qualificadas.

---

### 3. Financeiro simples por contrato

| Dor | Impacto |
|-----|---------|
| Receita, custo e margem ficam em planilhas separadas | Dono nao sabe lucro real por contrato |
| Parcelas e recebimentos sao acompanhados manualmente | Risco de atraso e inadimplencia |
| Equipamento e mao de obra nao entram no calculo certo | Margem parece maior do que realmente e |
| Fluxo de caixa nao conversa com pipeline | Empresa vende, mas nao sabe quando o dinheiro entra |

**Solucao MVP:**

- Cadastro financeiro por contrato fechado.
- Campos de valor total, entrada, parcelas, vencimentos, recebido, em aberto e atrasado.
- Custos basicos: equipamento, mao de obra, deslocamento, taxas, comissao e outros.
- Margem estimada por contrato.
- Visao mensal de contas a receber e contratos em atraso.

O financeiro inicial deve ser pragmatico. Nao precisa substituir ERP ou banco. Ele precisa dar clareza para a empresa solar saber se cada contrato esta pagando, quanto custa e qual margem deixa.

---

### 4. Operacao tecnica e conectividade solar

| Dor | Impacto |
|-----|---------|
| Dados tecnicos do sistema ficam em PDF, conversa ou memoria da equipe | Dificulta suporte e manutencao futura |
| Empresa nao sabe rapidamente qual inversor foi usado | Atendimento tecnico fica lento |
| Conta de luz e consumo do cliente nao ficam ligados ao contrato | Fica dificil avaliar economia, expansao e LTV |
| Monitoramento de inversores e complexo para comecar | Integrar varias APIs no inicio pode travar o MVP |

**Solucao MVP:**

- Cadastro tecnico simples por contrato:
  - inversor usado;
  - marca e modelo;
  - potencia do sistema;
  - quantidade de modulos;
  - consumo medio informado na conta de luz;
  - concessionaria;
  - modalidade do cliente;
  - data de instalacao;
  - status: em projeto, instalado, homologado, ativo ou precisa revisao.
- Upload ou registro dos principais dados da conta de luz.
- Campo de observacao tecnica para equipe interna.
- Alertas manuais ou semi-automaticos para revisao, manutencao ou follow-up.

**Direcao futura:**

A conectividade com inversores continua sendo parte da visao do produto, mas nao deve ser promessa obrigatoria do MVP. No inicio, o sistema pode registrar manualmente o inversor e os dados essenciais. Depois, quando houver validacao comercial, o produto pode integrar com marcas especificas como Growatt, Deye, Fronius, SolarEdge ou outras usadas pelos clientes.

---

## Arquitetura Simples de Modulos

```text
SUN NEO AI - MVP B2B

1. Comercial
   - Leads
   - Pipeline
   - Propostas
   - Tarefas e follow-ups

2. Clientes e Contratos
   - Cadastro de cliente
   - Contratos fechados
   - Segmentacao por LTV potencial
   - Historico interno

3. Financeiro
   - Receita por contrato
   - Custos basicos
   - Parcelas e vencimentos
   - Margem estimada
   - Inadimplencia simples

4. Operacao Tecnica
   - Dados do sistema solar
   - Inversor usado
   - Conta de luz e consumo
   - Status da instalacao
   - Revisoes e manutencoes

5. Relatorios
   - Pipeline comercial
   - Contratos fechados
   - Receita prevista
   - Margem por contrato
   - Clientes por LTV potencial
```

---

## Roadmap Enxuto

### Fase 1 - MVP de validacao

- CRM com leads, clientes e pipeline.
- Cadastro de contratos fechados.
- Financeiro simples por contrato.
- Cadastro tecnico do sistema solar instalado ou vendido.
- Segmentacao de clientes por LTV potencial.
- Relatorios basicos para o dono da empresa.

### Fase 2 - Produto utilizavel no dia a dia

- Tarefas e lembretes de follow-up.
- Visao de contratos com parcelas vencidas ou proximas do vencimento.
- Lista de clientes com potencial de manutencao, expansao ou recorrencia.
- Modelos simples de proposta e contrato.
- Controle basico de manutencoes e visitas tecnicas.

### Fase 3 - Automacoes e integracoes futuras

- Integracao com WhatsApp ou email para lembretes.
- Importacao de dados de planilhas.
- Integracao seletiva com inversores mais usados pelos clientes.
- Relatorios de performance da carteira.
- Sugestoes automaticas de oportunidades de upsell.

---

## Modelo de Precificacao Inicial

| Plano | Perfil | Funcionalidades | Preco estimado |
|-------|--------|-----------------|----------------|
| Starter | Empresa pequena organizando CRM e contratos | CRM, clientes, contratos e pipeline | R$ 197/mes |
| Pro | Empresa com mais contratos e controle financeiro | Starter + financeiro + LTV + relatorios | R$ 397/mes |
| Business | Empresa com equipe comercial e tecnica | Pro + operacao tecnica + manutencoes + permissoes | R$ 697/mes |

**Estrategia de entrada:** teste gratuito ou piloto acompanhado com poucas empresas solares locais. O objetivo inicial nao e vender uma plataforma completa; e provar que a empresa paga para organizar carteira, contratos e financeiro em um sistema feito para o setor solar.

---

## Diferenciais Competitivos

| Criterio | Planilha/WhatsApp | CRM generico | Sun Neo AI MVP |
|----------|-------------------|--------------|----------------|
| Feito para empresas solares | Nao | Nao | Sim |
| Une cliente, contrato e dados tecnicos | Nao | Parcial | Sim |
| Mostra margem por contrato | Manual | Parcial | Sim |
| Segmenta clientes por LTV potencial | Nao | Manual | Sim |
| Guarda inversor e dados da conta de luz | Nao | Nao nativo | Sim |
| Simples para PME solar | Sim, mas desorganizado | Nem sempre | Sim |

O diferencial inicial nao precisa ser IA avancada. O diferencial e ser simples, especifico e util para a rotina de uma instaladora solar.

---

## Referencia Aurora Solar - O Que Fica e O Que Sai

Aurora Solar e uma referencia global forte, mas a primeira versao do Sun Neo AI nao deve tentar copiar modelagem 3D, design tecnico automatico, APIs avancadas ou simulacoes financeiras complexas.

### O que aproveitar como inspiracao

- Proposta visual clara para ajudar o comercial.
- Organizacao do fluxo solar em uma jornada unica.
- Uso futuro de dados tecnicos para melhorar decisao comercial e operacional.

### O que deixar para depois

- Modelagem de telhado por satelite.
- Dimensionamento automatico por IA.
- Projeto tecnico automatico.
- Integracoes com financeiras.
- Ecossistema de APIs.

O caminho inicial e mais simples: resolver o basico que as empresas solares ainda fazem mal hoje.

---

## Estrategia Local: Teresina/PI e Nordeste

Teresina/PI, Timon/MA e outras regioes do Nordeste continuam sendo bons pontos de entrada, mas a tese inicial deve ser de validacao operacional, nao de plataforma completa.

### Tese de entrada

- Muitas empresas solares locais ainda estao em planilha e WhatsApp.
- O dono sente a dor de perder historico, margem e follow-up.
- O mercado tem muitos contratos com dados tecnicos importantes, mas esses dados nao viram inteligencia de carteira.
- Um software simples, com suporte proximo e linguagem do setor, pode ser adotado mais rapido que CRMs genericos.

### Meta inicial

- Validar com 5 a 10 empresas solares.
- Confirmar se CRM + financeiro + carteira tecnica resolve uma dor real.
- Aprender quais campos financeiros e tecnicos sao indispensaveis.
- Identificar quais marcas de inversores aparecem mais antes de construir integracoes.

---

## Metricas de Sucesso do MVP

```text
North Star Metric:
Contratos solares ativos gerenciados por empresas dentro da plataforma.

Metricas de suporte:
- Empresas que cadastram pelo menos 20 clientes ou leads.
- Empresas que registram pelo menos 5 contratos fechados.
- Percentual de contratos com valor, custo e margem preenchidos.
- Percentual de contratos com inversor e conta de luz registrados.
- Quantidade de clientes classificados por LTV potencial.
- Frequencia semanal de uso pelo dono, comercial ou financeiro.
```

---

## Hipoteses a Validar

1. Empresas solares pagam para organizar CRM, contratos e financeiro em uma ferramenta vertical simples.
2. A segmentacao por LTV potencial ajuda o dono a priorizar carteira e oportunidades.
3. O cadastro tecnico basico do sistema solar ja gera valor antes de qualquer API de inversor.
4. O financeiro por contrato e mais importante no MVP do que automacoes avancadas.
5. Empresas pequenas preferem uma ferramenta simples e guiada a um CRM generico cheio de configuracoes.

---

## Posicionamento Final

**Sun Neo AI nao nasce como "o sistema completo com IA para todo o mercado solar".**

Ele nasce como:

> "O CRM financeiro e operacional da empresa solar."

Primeiro, organiza clientes, contratos, dinheiro e dados tecnicos. Depois, com uso real e dados reais, pode evoluir para automacoes, manutencao recorrente, conectividade com inversores e inteligencia mais avancada.

---

*Ultima atualizacao: 2026-05-17 | Sun Neo AI Brainstorming simplificado*
