# Market and Stakeholder Context

Sun Neo AI e um SaaS B2B para integradoras e instaladoras solares que precisam sair de WhatsApp, planilhas e controles dispersos.

## Mercado Solar

- A EIA projeta crescimento forte de geracao solar, com solar utility-scale como uma das fontes de crescimento mais rapido nos EUA.
- A IEA trata renovaveis e solar como eixo central das previsoes ate 2030.
- A NREL mantem pesquisa de mercado e ferramentas para adocao solar distribuida.
- No Brasil, integradoras enfrentam pressao operacional por custo de capital, conexao a rede, acompanhamento de contrato, carteira tecnica e follow-up comercial.

## Implicacao Para Produto

O MVP deve priorizar operacao diaria:

- lead e pipeline;
- cliente e LTV manual;
- contrato;
- parcelas, custos e margem;
- status tecnico;
- relatorios simples;
- multiempresa seguro.

Nao prometer no lancamento:

- integracao obrigatoria com inversores;
- open finance;
- ERP completo;
- automacao total de WhatsApp;
- IA preditiva avancada.

## Stakeholders

Admin/dono:

- precisa enxergar receita, margem, inadimplencia e operacao tecnica.

Comercial:

- precisa criar leads, mover pipeline e converter oportunidades em clientes/contratos.

Financeiro:

- precisa controlar parcelas, custos, em aberto, atraso e margem.

Tecnico:

- precisa registrar inversor, potencia, modulos, concessionaria e status de instalacao.

DevOps:

- precisa configurar Vercel, Supabase, env vars, callbacks e migrations.

Seguranca:

- precisa validar RLS, perfis, isolamento por empresa, secrets e logs.

Cliente comprador:

- quer previsibilidade operacional, menos perda de follow-up e melhor controle da carteira.

## Acceptance Signals

- Empresa nova entra vazia, sem dados ficticios.
- Primeiro admin consegue acessar dashboard.
- Cada perfil opera apenas seu escopo.
- Dono consegue entender a situacao sem planilha externa.
- Financeiro confere margem por contrato.
- Tecnico encontra rapidamente os dados do sistema solar.
