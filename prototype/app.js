const icons = {
  layout: '<svg viewBox="0 0 24 24"><path d="M4 5h16M4 12h7M4 19h16M15 9h5v6h-5z"/></svg>',
  pipeline: '<svg viewBox="0 0 24 24"><path d="M4 6h6v6H4zM14 12h6v6h-6zM10 9h2a4 4 0 0 1 4 4v1"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'user-plus': '<svg viewBox="0 0 24 24"><path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M3 7a3 3 0 0 1 3-3h13v16H6a3 3 0 0 1-3-3z"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4zM3 7v10"/></svg>',
  solar: '<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/><circle cx="12" cy="12" r="4"/></svg>',
  chart: '<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h17M8 16V9M13 16V6M18 16v-4"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .92V20a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1-.92 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.92-1H4a2 2 0 1 1 0-4h.08a1.7 1.7 0 0 0 .92-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.92V4a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1 .92 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.34.47.7.92 1H20a2 2 0 1 1 0 4h-.08a1.7 1.7 0 0 0-.92 1z"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M21 12.6A8.5 8.5 0 1 1 11.4 3 6.5 6.5 0 0 0 21 12.6z"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>'
};

const state = {
  route: 'dashboard',
  selectedClient: 0,
  ltvFilter: 'Todos',
  step: 1,
  form: {
    nome: 'Fazenda Lago Azul',
    tipo: 'Rural',
    telefone: '(86) 99921-4430',
    email: 'contato@lagoazul.com',
    cidade: 'Teresina',
    estado: 'PI',
    consumo: '8200',
    origem: 'Indicação',
    responsavel: 'Marina Costa',
    ltv: 'Estratégico',
    motivo: 'Alto consumo, mais de uma unidade e potencial de expansão em irrigação.',
    valor: '184000',
    financeiro: 'Sem financeiro cadastrado',
    comercial: 'Proposta',
    observacoes: 'Cliente indicado por parceiro regional. Avaliar possibilidade de contrato de manutenção.',
    inversor: 'Deye SUN-75K',
    potencia: '92.4',
    statusTecnico: 'Em projeto'
  }
};

const customers = [
  { id: 1, nome: 'Padaria Sol Nascente', tipo: 'Comercial', cidade: 'Teresina', estado: 'PI', ltv: 'Alto', responsavel: 'Marina Costa', telefone: '(86) 99944-1200', email: 'financeiro@solnascente.com', contrato: 'SN-2026-041', valor: 78500, margem: 24400, financeiro: 'Em dia', tecnico: 'Ativo', consumo: 3800, inversor: 'Growatt MID 30KTL3-X', potencia: '42.0 kWp', observacao: 'Possui segunda unidade em estudo para expansão.' },
  { id: 2, nome: 'Condomínio Vila Clara', tipo: 'Condomínio', cidade: 'Timon', estado: 'MA', ltv: 'Estratégico', responsavel: 'João Moitinho', telefone: '(99) 98820-7120', email: 'sindico@vilaclara.com', contrato: 'SN-2026-038', valor: 242000, margem: 68100, financeiro: 'Parcialmente pago', tecnico: 'Homologado', consumo: 11200, inversor: 'Fronius Tauro 100-3-D', potencia: '126.5 kWp', observacao: 'Cliente com potencial para manutenção recorrente.' },
  { id: 3, nome: 'Clínica São Lucas', tipo: 'Comercial', cidade: 'Parnaíba', estado: 'PI', ltv: 'Alto', responsavel: 'Rafaela Dias', telefone: '(86) 98831-9090', email: 'admin@saolucas.med', contrato: 'SN-2026-033', valor: 113900, margem: 31800, financeiro: 'Em atraso', tecnico: 'Aguardando instalação', consumo: 5100, inversor: 'SolarEdge SE50K', potencia: '58.8 kWp', observacao: 'Atraso por pendência de aprovação interna.' },
  { id: 4, nome: 'Residencial Ana Beatriz', tipo: 'Residencial', cidade: 'Altos', estado: 'PI', ltv: 'Médio', responsavel: 'Carlos Lima', telefone: '(86) 99918-3321', email: 'ana@email.com', contrato: 'SN-2026-029', valor: 31900, margem: 9200, financeiro: 'Quitado', tecnico: 'Ativo', consumo: 760, inversor: 'Deye SUN-8K', potencia: '9.9 kWp', observacao: 'Boa chance de indicação para vizinhos.' },
  { id: 5, nome: 'Agro Serra Verde', tipo: 'Rural', cidade: 'Campo Maior', estado: 'PI', ltv: 'Estratégico', responsavel: 'Marina Costa', telefone: '(86) 98877-1300', email: 'operacao@serraverde.ag', contrato: 'SN-2026-022', valor: 326000, margem: 93200, financeiro: 'Em dia', tecnico: 'Instalado', consumo: 18600, inversor: 'Deye SUN-110K', potencia: '154.0 kWp', observacao: 'Possui áreas adicionais para expansão futura.' },
  { id: 6, nome: 'Mercado União', tipo: 'Comercial', cidade: 'Teresina', estado: 'PI', ltv: 'Médio', responsavel: 'Rafaela Dias', telefone: '(86) 98841-0020', email: 'mercadouniao@email.com', contrato: 'SN-2026-019', valor: 54800, margem: 15100, financeiro: 'Em dia', tecnico: 'Ativo', consumo: 2400, inversor: 'Growatt MOD 20KTL3-X', potencia: '27.5 kWp', observacao: 'Cliente quer acompanhar economia trimestralmente.' },
  { id: 7, nome: 'Casa Pedro Alves', tipo: 'Residencial', cidade: 'Piripiri', estado: 'PI', ltv: 'Baixo', responsavel: 'Carlos Lima', telefone: '(86) 99942-8876', email: 'pedro@email.com', contrato: 'SN-2026-017', valor: 22400, margem: 6100, financeiro: 'Quitado', tecnico: 'Ativo', consumo: 520, inversor: 'Sungrow SG5.0RS', potencia: '6.6 kWp', observacao: 'Contrato único, baixa chance de expansão.' },
  { id: 8, nome: 'Hotel Rio Poti', tipo: 'Comercial', cidade: 'Teresina', estado: 'PI', ltv: 'Estratégico', responsavel: 'João Moitinho', telefone: '(86) 98891-1313', email: 'diretoria@riopoti.com', contrato: 'SN-2026-011', valor: 418000, margem: 121000, financeiro: 'Parcialmente pago', tecnico: 'Em projeto', consumo: 25100, inversor: 'Huawei SUN2000-100KTL', potencia: '198.0 kWp', observacao: 'Conta com três unidades consumidoras.' }
];

const leads = [
  { nome: 'Academia BioForma', etapa: 'Novo lead', tipo: 'Comercial', consumo: 4200, tarefa: 'Ligar hoje às 15h' },
  { nome: 'Sítio Boa Vista', etapa: 'Contato feito', tipo: 'Rural', consumo: 6100, tarefa: 'Solicitar conta de luz' },
  { nome: 'Farmácia Central', etapa: 'Diagnóstico', tipo: 'Comercial', consumo: 3300, tarefa: 'Enviar simulação' },
  { nome: 'Indústria Metal Forte', etapa: 'Proposta enviada', tipo: 'Industrial', consumo: 17400, tarefa: 'Follow-up sexta' },
  { nome: 'Residência Carla Rocha', etapa: 'Negociação', tipo: 'Residencial', consumo: 890, tarefa: 'Ajustar entrada' },
  { nome: 'Posto BR Norte', etapa: 'Contrato fechado', tipo: 'Comercial', consumo: 9300, tarefa: 'Criar contrato' },
  { nome: 'Chácara Primavera', etapa: 'Perdido', tipo: 'Rural', consumo: 1200, tarefa: 'Registrar motivo' }
];

const contracts = customers.map((c, index) => ({
  ...c,
  fechamento: ['10/05/2026', '04/05/2026', '28/04/2026', '19/04/2026', '02/04/2026', '23/03/2026', '18/03/2026', '04/03/2026'][index],
  aberto: Math.max(0, Math.round(c.valor * (c.financeiro === 'Quitado' ? 0 : c.financeiro === 'Parcialmente pago' ? 0.48 : c.financeiro === 'Em atraso' ? 0.62 : 0.28))),
  custos: c.valor - c.margem
}));

const view = document.querySelector('#view');
const pageTitle = document.querySelector('#page-title');

document.querySelectorAll('.icon').forEach((node) => {
  node.innerHTML = icons[node.dataset.icon] || '';
});

document.querySelectorAll('[data-route]').forEach((node) => {
  node.addEventListener('click', (event) => {
    event.preventDefault();
    navigate(node.dataset.route);
  });
});

document.querySelector('#theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  document.querySelector('#theme-toggle .icon').innerHTML = dark ? icons.moon : icons.sun;
});

window.addEventListener('hashchange', () => navigate(location.hash.replace('#', '') || 'dashboard', false));

function navigate(route, updateHash = true) {
  state.route = route || 'dashboard';
  if (updateHash) location.hash = state.route;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.route === state.route));
  const titles = {
    dashboard: 'Dashboard',
    crm: 'CRM e Pipeline',
    clientes: 'Clientes',
    'novo-cliente': 'Cadastrar novo cliente',
    contratos: 'Contratos',
    financeiro: 'Financeiro',
    tecnico: 'Operação técnica',
    relatorios: 'Relatórios',
    configuracoes: 'Configurações'
  };
  pageTitle.textContent = titles[state.route] || 'Dashboard';
  render();
}

function currency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function badge(label, tone = 'gray') {
  return `<span class="badge ${tone}">${label}</span>`;
}

function toneForStatus(status) {
  if (['Quitado', 'Pago', 'Ativo', 'Em dia', 'Homologado', 'Instalado'].includes(status)) return 'green';
  if (['Em atraso', 'Vencida', 'Precisa revisão'].includes(status)) return 'red';
  if (['Parcialmente pago', 'Aguardando instalação', 'Em projeto'].includes(status)) return 'solar';
  return 'gray';
}

function toneForLtv(ltv) {
  return { Baixo: 'gray', Médio: 'blue', Alto: 'green', Estratégico: 'solar' }[ltv] || 'gray';
}

function render() {
  const routes = {
    dashboard: renderDashboard,
    crm: renderCrm,
    clientes: renderClientes,
    'novo-cliente': renderNovoCliente,
    contratos: renderContratos,
    financeiro: renderFinanceiro,
    tecnico: renderTecnico,
    relatorios: renderRelatorios,
    configuracoes: renderConfiguracoes
  };
  view.innerHTML = (routes[state.route] || renderDashboard)();
  attachRouteEvents();
}

function renderDashboard() {
  const receita = contracts.reduce((sum, item) => sum + item.valor, 0);
  const aberto = contracts.reduce((sum, item) => sum + item.aberto, 0);
  const margem = contracts.reduce((sum, item) => sum + item.margem, 0);
  const vencidas = contracts.filter((item) => item.financeiro === 'Em atraso').length;
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Visão geral</p>
        <h2>Controle comercial, financeiro e técnico da carteira solar</h2>
        <p>Dados fictícios para validar a estrutura completa do MVP.</p>
      </div>
      <button class="primary-button" data-action="go-new">${icons.plus} Cadastrar novo cliente</button>
    </div>

    <div class="grid metrics-grid">
      ${metric('Leads ativos', '23', '7 oportunidades em negociação')}
      ${metric('Contratos fechados', String(contracts.length), 'Últimos 90 dias')}
      ${metric('Receita prevista', currency(receita), 'Carteira demonstrativa')}
      ${metric('Valor em aberto', currency(aberto), `${vencidas} contrato em atraso`)}
    </div>

    <div class="grid two-col" style="margin-top:14px">
      <section class="panel">
        <div class="section-head">
          <div>
            <h3>Contratos prioritários</h3>
            <p>Clientes com maior valor, pendência ou potencial de LTV.</p>
          </div>
          ${badge('LTV orientado manualmente', 'solar')}
        </div>
        ${renderContractTable(contracts.slice(0, 5))}
      </section>
      <section class="panel">
        <h3>Distribuição de LTV</h3>
        ${renderLtvBars()}
        <h3 style="margin-top:22px">Status técnico</h3>
        ${renderStatusSummary()}
      </section>
    </div>

    <div class="grid three-col" style="margin-top:14px">
      ${actionCard('Clientes estratégicos sem follow-up', '3 clientes precisam de contato nos próximos 7 dias.', 'clientes')}
      ${actionCard('Parcelas vencidas', 'Revisar contratos da Clínica São Lucas e Fazenda Modelo.', 'financeiro')}
      ${actionCard('Técnico aguardando instalação', '2 contratos dependem de agenda técnica.', 'tecnico')}
    </div>
  `;
}

function metric(label, value, hint) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong><small>${hint}</small></article>`;
}

function actionCard(title, text, route) {
  return `<article class="card"><h3>${title}</h3><p class="muted">${text}</p><button class="secondary-button" data-route-inline="${route}">Abrir módulo ${icons.arrow}</button></article>`;
}

function renderLtvBars() {
  const labels = ['Baixo', 'Médio', 'Alto', 'Estratégico'];
  return labels.map((label) => {
    const count = customers.filter((customer) => customer.ltv === label).length;
    const percent = Math.round((count / customers.length) * 100);
    return `<div style="margin-bottom:12px"><div class="section-head" style="margin-bottom:6px"><strong>${label}</strong>${badge(`${count} clientes`, toneForLtv(label))}</div><div class="progress"><span style="width:${percent}%"></span></div></div>`;
  }).join('');
}

function renderStatusSummary() {
  const labels = ['Ativo', 'Homologado', 'Instalado', 'Aguardando instalação', 'Em projeto'];
  return labels.map((label) => {
    const count = customers.filter((customer) => customer.tecnico === label).length;
    return `<div class="detail-item" style="margin-bottom:8px"><span>${label}</span><strong>${count} contrato(s)</strong></div>`;
  }).join('');
}

function renderCrm() {
  const steps = ['Novo lead', 'Contato feito', 'Diagnóstico', 'Proposta enviada', 'Negociação', 'Contrato fechado', 'Perdido'];
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Comercial</p>
        <h2>Pipeline de oportunidades</h2>
        <p>Arranjo visual para acompanhar etapas, responsáveis e próximas tarefas.</p>
      </div>
      <button class="primary-button" data-action="go-new">${icons.plus} Novo cliente</button>
    </div>
    <div class="pipeline-board">
      ${steps.map((step) => `
        <section class="pipeline-column">
          <h3>${step} ${badge(leads.filter((lead) => lead.etapa === step).length, 'gray')}</h3>
          ${leads.filter((lead) => lead.etapa === step).map((lead) => `
            <article class="lead-card">
              <strong>${lead.nome}</strong>
              <p>${lead.tipo} · ${lead.consumo} kWh/mês</p>
              <p>${lead.tarefa}</p>
            </article>
          `).join('') || '<div class="empty-state">Sem oportunidades nesta etapa.</div>'}
        </section>
      `).join('')}
    </div>
  `;
}

function renderClientes() {
  const filtered = state.ltvFilter === 'Todos' ? customers : customers.filter((customer) => customer.ltv === state.ltvFilter);
  const selected = filtered[state.selectedClient] || filtered[0] || customers[0];
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">Carteira</p>
        <h2>Clientes e segmentação por LTV</h2>
        <p>Lista com animação, navegação por teclado e detalhe contextual.</p>
      </div>
      <button class="primary-button" data-action="go-new">${icons.plus} Cadastrar novo cliente</button>
    </div>
    <div class="filters">
      ${['Todos', 'Baixo', 'Médio', 'Alto', 'Estratégico'].map((filter) => `<button class="filter-chip ${state.ltvFilter === filter ? 'active' : ''}" data-ltv-filter="${filter}">${filter}</button>`).join('')}
    </div>
    <div class="client-layout">
      <section class="animated-list">
        <div class="list-gradient top"></div>
        <div class="client-list" tabindex="0" aria-label="Lista de clientes">
          ${filtered.map((customer, index) => `
            <button class="client-item ${selected.id === customer.id ? 'selected' : ''}" data-client-index="${index}">
              <strong>${customer.nome}</strong>
              <p>${customer.tipo} · ${customer.cidade}/${customer.estado}</p>
              <p>${badge(customer.ltv, toneForLtv(customer.ltv))} ${badge(customer.financeiro, toneForStatus(customer.financeiro))}</p>
            </button>
          `).join('')}
        </div>
        <div class="list-gradient bottom"></div>
      </section>
      <section class="panel">
        <div class="section-head">
          <div>
            <h3>${selected.nome}</h3>
            <p>${selected.tipo} · ${selected.cidade}/${selected.estado}</p>
          </div>
          ${badge(selected.ltv, toneForLtv(selected.ltv))}
        </div>
        <div class="detail-grid">
          ${detail('Contrato', selected.contrato)}
          ${detail('Responsável', selected.responsavel)}
          ${detail('Valor total', currency(selected.valor))}
          ${detail('Margem estimada', currency(selected.margem))}
          ${detail('Financeiro', badge(selected.financeiro, toneForStatus(selected.financeiro)))}
          ${detail('Técnico', badge(selected.tecnico, toneForStatus(selected.tecnico)))}
          ${detail('Consumo médio', `${selected.consumo} kWh/mês`)}
          ${detail('Sistema', `${selected.potencia} · ${selected.inversor}`)}
        </div>
        <article class="detail-item" style="margin-top:12px">
          <span>Motivo e observações</span>
          <strong>${selected.observacao}</strong>
        </article>
      </section>
    </div>
  `;
}

function detail(label, value) {
  return `<div class="detail-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderNovoCliente() {
  return `
    <div class="stepper-shell">
      <div class="page-head">
        <div>
          <p class="eyebrow">Cadastro guiado</p>
          <h2>Novo cliente solar</h2>
          <p>Fluxo dividido por etapas para reduzir retrabalho entre CRM, contrato, financeiro e técnico.</p>
        </div>
      </div>
      <section class="stepper">
        <div class="step-indicators">
          ${[1, 2, 3, 4, 5].map((step) => `
            <button class="step-indicator ${state.step === step ? 'active' : ''} ${state.step > step ? 'complete' : ''}" data-step="${step}">${state.step > step ? icons.check : step}</button>
            ${step < 5 ? `<span class="step-line ${state.step > step ? 'complete' : ''}"></span>` : ''}
          `).join('')}
        </div>
        <div class="step-content" id="step-content">${renderStep()}</div>
        <footer class="step-footer">
          <button class="secondary-button" data-step-back ${state.step === 1 ? 'disabled' : ''}>Voltar</button>
          <div>
            <button class="ghost-button" data-route-inline="clientes">Cancelar</button>
            <button class="primary-button" data-step-next>${state.step === 5 ? 'Concluir cadastro' : 'Continuar'}</button>
          </div>
        </footer>
      </section>
    </div>
  `;
}

function field(name, label, type = 'text', options = null, full = false) {
  const value = state.form[name] || '';
  if (options) {
    return `<label class="field ${full ? 'full' : ''}" data-field-wrap="${name}"><span>${label}</span><select data-form="${name}">${options.map((option) => `<option ${option === value ? 'selected' : ''}>${option}</option>`).join('')}</select></label>`;
  }
  if (type === 'textarea') {
    return `<label class="field ${full ? 'full' : ''}" data-field-wrap="${name}"><span>${label}</span><textarea data-form="${name}">${value}</textarea></label>`;
  }
  return `<label class="field ${full ? 'full' : ''}" data-field-wrap="${name}"><span>${label}</span><input type="${type}" value="${value}" data-form="${name}"></label>`;
}

function renderStep() {
  if (state.step === 1) {
    return `<h3>Dados básicos</h3><div class="form-grid">${field('nome', 'Nome ou razão social')}${field('tipo', 'Tipo de cliente', 'text', ['Residencial', 'Comercial', 'Rural', 'Industrial', 'Condomínio'])}${field('telefone', 'Telefone')}${field('email', 'Email')}${field('cidade', 'Cidade')}${field('estado', 'Estado')}</div>`;
  }
  if (state.step === 2) {
    return `<h3>Perfil solar</h3><div class="form-grid">${field('consumo', 'Consumo médio mensal em kWh', 'number')}${field('origem', 'Origem do lead', 'text', ['Indicação', 'Instagram', 'Google', 'Prospecção ativa', 'Parceiro'])}${field('responsavel', 'Responsável interno', 'text', ['João Moitinho', 'Marina Costa', 'Rafaela Dias', 'Carlos Lima'])}${field('inversor', 'Inversor previsto')}${field('potencia', 'Potência do sistema em kWp')}${field('statusTecnico', 'Status técnico inicial', 'text', ['Não iniciado', 'Em projeto', 'Aguardando instalação', 'Instalado', 'Homologado', 'Ativo'])}</div>`;
  }
  if (state.step === 3) {
    return `<h3>LTV potencial</h3><div class="form-grid">${field('ltv', 'Classificação de LTV', 'text', ['Baixo', 'Médio', 'Alto', 'Estratégico'])}${field('motivo', 'Motivo da classificação', 'textarea', null, true)}<div class="detail-item full"><span>Orientação</span><strong>Estratégico: alto consumo, várias unidades, potencial de recorrência, expansão ou indicações qualificadas.</strong></div></div>`;
  }
  if (state.step === 4) {
    return `<h3>Contrato inicial</h3><div class="form-grid">${field('valor', 'Valor total estimado', 'number')}${field('financeiro', 'Status financeiro inicial', 'text', ['Sem financeiro cadastrado', 'Em dia', 'Parcialmente pago'])}${field('comercial', 'Status comercial', 'text', ['Proposta', 'Fechado'])}${field('observacoes', 'Observações comerciais', 'textarea', null, true)}</div>`;
  }
  return `<h3>Revisão</h3><div class="review-box">${Object.entries({ Cliente: state.form.nome, Tipo: state.form.tipo, Localização: `${state.form.cidade}/${state.form.estado}`, Consumo: `${state.form.consumo} kWh/mês`, LTV: state.form.ltv, Contrato: currency(Number(state.form.valor || 0)), Sistema: `${state.form.potencia} kWp`, Inversor: state.form.inversor }).map(([key, value]) => detail(key, value)).join('')}</div>`;
}

function renderContratos() {
  return `
    <div class="page-head"><div><p class="eyebrow">Contratos</p><h2>Vínculo entre cliente, financeiro e técnico</h2><p>Status comercial, financeiro e técnico são independentes.</p></div></div>
    <section class="panel">${renderContractTable(contracts)}</section>
  `;
}

function renderContractTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Contrato</th><th>Cliente</th><th>Valor</th><th>Financeiro</th><th>Técnico</th><th>Margem</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${row.contrato}</td><td><strong>${row.nome}</strong><br><span class="muted">${row.tipo}</span></td><td>${currency(row.valor)}</td><td>${badge(row.financeiro, toneForStatus(row.financeiro))}</td><td>${badge(row.tecnico, toneForStatus(row.tecnico))}</td><td>${currency(row.margem)}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderFinanceiro() {
  const rows = contracts.map((item) => ({ ...item, margemPct: Math.round((item.margem / item.valor) * 100) }));
  return `
    <div class="page-head"><div><p class="eyebrow">Financeiro</p><h2>Recebimentos, custos e margem por contrato</h2><p>Visão simples para gestão sem substituir ERP ou banco.</p></div></div>
    <div class="grid metrics-grid">
      ${metric('Receita total', currency(rows.reduce((s, i) => s + i.valor, 0)), 'Contratos cadastrados')}
      ${metric('Em aberto', currency(rows.reduce((s, i) => s + i.aberto, 0)), 'Parcelas pendentes')}
      ${metric('Custos estimados', currency(rows.reduce((s, i) => s + i.custos, 0)), 'Equipamento, mão de obra e taxas')}
      ${metric('Margem média', `${Math.round(rows.reduce((s, i) => s + i.margemPct, 0) / rows.length)}%`, 'Estimativa operacional')}
    </div>
    <section class="panel" style="margin-top:14px">
      <div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Valor</th><th>Custos</th><th>Margem</th><th>Aberto</th><th>Status</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${row.nome}</td><td>${currency(row.valor)}</td><td>${currency(row.custos)}</td><td>${currency(row.margem)} · ${row.margemPct}%</td><td>${currency(row.aberto)}</td><td>${badge(row.financeiro, toneForStatus(row.financeiro))}</td></tr>`).join('')}</tbody></table></div>
    </section>
  `;
}

function renderTecnico() {
  return `
    <div class="page-head"><div><p class="eyebrow">Técnico</p><h2>Dados do sistema solar por contrato</h2><p>Cadastro manual de inversor, potência, consumo, concessionária e status da instalação.</p></div></div>
    <div class="grid three-col">
      ${customers.map((customer) => `
        <article class="technical-card">
          <div class="section-head"><h3>${customer.nome}</h3>${badge(customer.tecnico, toneForStatus(customer.tecnico))}</div>
          <p><strong>${customer.potencia}</strong></p>
          <p>${customer.inversor}</p>
          <p>${customer.consumo} kWh/mês · Equatorial Energia</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderRelatorios() {
  return `
    <div class="page-head"><div><p class="eyebrow">Relatórios</p><h2>Leitura gerencial do MVP</h2><p>Blocos de relatório para pipeline, contratos, financeiro, LTV e técnico.</p></div></div>
    <div class="grid three-col">
      ${['Leads por etapa do pipeline', 'Contratos fechados por período', 'Receita prevista por mês', 'Parcelas vencidas', 'Margem estimada por contrato', 'Clientes por LTV potencial', 'Contratos por status técnico'].map((title, index) => `
        <article class="report-card">
          <h3>${title}</h3>
          <p>${['23 registros analisados', '8 contratos recentes', currency(290000), '2 alertas financeiros', '31% média estimada', '4 níveis de priorização', '5 status em uso'][index]}</p>
          <div class="progress" style="margin-top:12px"><span style="width:${[76, 62, 54, 24, 71, 88, 66][index]}%"></span></div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderConfiguracoes() {
  return `
    <div class="page-head"><div><p class="eyebrow">Configurações</p><h2>Empresa, usuários e preferências</h2><p>Representação visual das áreas administrativas do MVP.</p></div></div>
    <div class="grid two-col">
      <section class="panel"><h3>Empresa</h3>${detail('Nome', 'Team Moitinho Solar')}${detail('Plano', 'Business piloto')}${detail('Cidade', 'Teresina/PI')}</section>
      <section class="panel"><h3>Perfis</h3>${['Admin', 'Comercial', 'Financeiro', 'Técnico'].map((role) => `<div class="detail-item" style="margin-bottom:8px"><span>${role}</span><strong>Permissões configuradas para o MVP</strong></div>`).join('')}</section>
    </div>
  `;
}

function attachRouteEvents() {
  document.querySelectorAll('[data-route-inline]').forEach((button) => button.addEventListener('click', () => navigate(button.dataset.routeInline)));
  document.querySelectorAll('[data-action="go-new"]').forEach((button) => button.addEventListener('click', () => navigate('novo-cliente')));
  document.querySelectorAll('[data-ltv-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.ltvFilter = button.dataset.ltvFilter;
      state.selectedClient = 0;
      render();
    });
  });
  attachClientList();
  attachStepper();
  document.querySelectorAll('[data-form]').forEach((input) => {
    const updateField = () => {
      state.form[input.dataset.form] = input.value;
    };
    input.addEventListener('input', updateField);
    input.addEventListener('change', updateField);
  });
}

function attachClientList() {
  const list = document.querySelector('.client-list');
  if (!list) return;
  const items = [...document.querySelectorAll('.client-item')];
  const topGradient = document.querySelector('.list-gradient.top');
  const bottomGradient = document.querySelector('.list-gradient.bottom');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('in-view', entry.isIntersecting));
  }, { root: list, threshold: 0.45 });
  items.forEach((item) => {
    observer.observe(item);
    item.addEventListener('mouseenter', () => selectClient(Number(item.dataset.clientIndex), false));
    item.addEventListener('click', () => selectClient(Number(item.dataset.clientIndex), true));
  });
  const updateGradients = () => {
    topGradient.style.opacity = Math.min(list.scrollTop / 48, 1);
    const bottomDistance = list.scrollHeight - list.scrollTop - list.clientHeight;
    bottomGradient.style.opacity = list.scrollHeight <= list.clientHeight ? 0 : Math.min(bottomDistance / 64, 1);
  };
  list.addEventListener('scroll', updateGradients);
  list.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') return;
    event.preventDefault();
    if (event.key === 'ArrowDown') state.selectedClient = Math.min(state.selectedClient + 1, items.length - 1);
    if (event.key === 'ArrowUp') state.selectedClient = Math.max(state.selectedClient - 1, 0);
    if (event.key === 'Enter') showToast('Cliente selecionado para análise.');
    const target = items[state.selectedClient];
    target?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    renderClientesOnly();
  });
  updateGradients();
}

function selectClient(index, toast) {
  state.selectedClient = index;
  renderClientesOnly();
  if (toast) showToast('Cliente selecionado na carteira.');
}

function renderClientesOnly() {
  if (state.route === 'clientes') render();
}

function attachStepper() {
  if (!document.querySelector('.stepper')) return;
  document.querySelectorAll('[data-step]').forEach((button) => button.addEventListener('click', () => {
    state.step = Number(button.dataset.step);
    render();
  }));
  document.querySelector('[data-step-back]')?.addEventListener('click', () => {
    state.step = Math.max(1, state.step - 1);
    render();
  });
  document.querySelector('[data-step-next]')?.addEventListener('click', () => {
    if (!validateStep()) return;
    if (state.step < 5) {
      state.step += 1;
      render();
    } else {
      const valor = Number(state.form.valor || 0);
      const margem = Math.round(valor * 0.29);
      const createdCustomer = {
        id: Date.now(),
        nome: state.form.nome,
        tipo: state.form.tipo,
        cidade: state.form.cidade,
        estado: state.form.estado,
        ltv: state.form.ltv,
        responsavel: state.form.responsavel,
        telefone: state.form.telefone,
        email: state.form.email,
        contrato: 'SN-2026-NEW',
        valor,
        margem,
        financeiro: state.form.financeiro || 'Sem financeiro cadastrado',
        tecnico: state.form.statusTecnico,
        consumo: Number(state.form.consumo || 0),
        inversor: state.form.inversor,
        potencia: `${state.form.potencia} kWp`,
        observacao: state.form.motivo
      };
      customers.unshift(createdCustomer);
      contracts.unshift({
        ...createdCustomer,
        fechamento: '17/05/2026',
        aberto: Math.round(valor * 0.28),
        custos: valor - margem
      });
      state.selectedClient = 0;
      state.ltvFilter = 'Todos';
      state.step = 1;
      showToast('Cliente fictício cadastrado no protótipo.');
      navigate('clientes');
    }
  });
}

function validateStep() {
  const requiredByStep = {
    1: ['nome', 'tipo', 'telefone', 'cidade', 'estado'],
    2: ['consumo', 'responsavel', 'inversor', 'potencia'],
    3: ['ltv', 'motivo'],
    4: ['valor']
  };
  const fields = requiredByStep[state.step] || [];
  let valid = true;
  fields.forEach((name) => {
    const hasValue = String(state.form[name] || '').trim().length > 0;
    const wrapper = document.querySelector(`[data-field-wrap="${name}"]`);
    wrapper?.classList.toggle('invalid', !hasValue);
    if (!hasValue) valid = false;
  });
  if (!valid) showToast('Preencha os campos essenciais desta etapa.');
  return valid;
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

navigate(location.hash.replace('#', '') || 'dashboard', false);
