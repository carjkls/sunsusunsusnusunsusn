import { Button } from "@/components/ui";
import { createContract, createCustomer, createInstallment, createLead, upsertTechnicalRecord } from "@/lib/actions/entities";
import type { Contract, Customer } from "@/lib/types";

const customerTypes = ["Residencial", "Comercial", "Rural", "Industrial", "Condominio"];
const ltvOptions = ["Nao classificado", "Baixo", "Medio", "Alto", "Estrategico"];
const leadStages = ["Novo lead", "Contato feito", "Diagnostico", "Proposta enviada", "Negociacao", "Contrato fechado", "Perdido"];
const commercialStatuses = ["Proposta", "Fechado", "Perdido", "Cancelado"];
const installmentStatuses = ["Pendente", "Paga", "Vencida", "Cancelada"];
const technicalStatuses = ["Nao iniciado", "Em projeto", "Aguardando instalacao", "Instalado", "Homologado", "Ativo", "Precisa revisao"];

function Select({ name, options, defaultValue }: { name: string; options: string[]; defaultValue?: string }) {
  return (
    <select name={name} defaultValue={defaultValue ?? options[0]}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

export function LeadForm() {
  return (
    <form action={createLead} className="grid gap-3 md:grid-cols-2">
      <label className="field"><span>Nome ou razao social</span><input name="name" required /></label>
      <label className="field"><span>Tipo</span><Select name="customer_type" options={customerTypes} /></label>
      <label className="field"><span>Telefone</span><input name="phone" required /></label>
      <label className="field"><span>Email</span><input name="email" type="email" /></label>
      <label className="field"><span>Cidade</span><input name="city" required /></label>
      <label className="field"><span>Estado</span><input name="state" maxLength={2} required /></label>
      <label className="field"><span>Origem</span><input name="origin" required /></label>
      <label className="field"><span>Consumo medio kWh</span><input name="average_consumption" type="number" min="0" /></label>
      <label className="field"><span>Responsavel</span><input name="owner_name" required /></label>
      <label className="field"><span>Etapa</span><Select name="stage" options={leadStages} /></label>
      <label className="field md:col-span-2"><span>Proxima tarefa</span><input name="next_task" /></label>
      <label className="field md:col-span-2"><span>Observacoes</span><textarea name="notes" /></label>
      <Button type="submit" className="md:col-span-2">Cadastrar lead</Button>
    </form>
  );
}

export function CustomerForm() {
  return (
    <form action={createCustomer} className="grid gap-3 md:grid-cols-2">
      <label className="field"><span>Nome ou razao social</span><input name="name" required /></label>
      <label className="field"><span>Tipo</span><Select name="customer_type" options={customerTypes} /></label>
      <label className="field"><span>Telefone</span><input name="phone" required /></label>
      <label className="field"><span>Email</span><input name="email" type="email" /></label>
      <label className="field md:col-span-2"><span>Endereco</span><input name="address" /></label>
      <label className="field"><span>Cidade</span><input name="city" required /></label>
      <label className="field"><span>Estado</span><input name="state" maxLength={2} required /></label>
      <label className="field"><span>Responsavel interno</span><input name="owner_name" required /></label>
      <label className="field"><span>LTV potencial</span><Select name="ltv_potential" options={ltvOptions} /></label>
      <label className="field md:col-span-2"><span>Motivo do LTV</span><textarea name="ltv_reason" /></label>
      <label className="field md:col-span-2"><span>Observacoes</span><textarea name="notes" /></label>
      <Button type="submit" className="md:col-span-2">Cadastrar cliente</Button>
    </form>
  );
}

export function ContractForm({ customers }: { customers: Customer[] }) {
  return (
    <form action={createContract} className="grid gap-3 md:grid-cols-2">
      <label className="field md:col-span-2">
        <span>Cliente</span>
        <select name="customer_id" required>
          <option value="">Selecione um cliente</option>
          {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
        </select>
      </label>
      <label className="field"><span>Numero interno</span><input name="contract_number" required /></label>
      <label className="field"><span>Responsavel comercial</span><input name="commercial_owner_name" required /></label>
      <label className="field"><span>Data de fechamento</span><input name="close_date" type="date" /></label>
      <label className="field"><span>Valor total</span><input name="total_value" type="number" min="0" step="0.01" required /></label>
      <label className="field"><span>Status comercial</span><Select name="commercial_status" options={commercialStatuses} defaultValue="Fechado" /></label>
      <label className="field md:col-span-2"><span>Observacoes</span><textarea name="notes" /></label>
      <Button type="submit" className="md:col-span-2" disabled={customers.length === 0}>Cadastrar contrato</Button>
    </form>
  );
}

export function InstallmentForm({ contracts }: { contracts: Contract[] }) {
  return (
    <form action={createInstallment} className="grid gap-3 md:grid-cols-4">
      <label className="field md:col-span-2">
        <span>Contrato</span>
        <select name="contract_id" required>
          <option value="">Selecione</option>
          {contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.number} · {contract.customerName}</option>)}
        </select>
      </label>
      <label className="field"><span>Vencimento</span><input name="due_date" type="date" required /></label>
      <label className="field"><span>Valor</span><input name="amount" type="number" min="0" step="0.01" required /></label>
      <label className="field"><span>Status</span><Select name="status" options={installmentStatuses} /></label>
      <Button type="submit" className="md:col-span-3" disabled={contracts.length === 0}>Adicionar parcela</Button>
    </form>
  );
}

export function TechnicalForm({ contracts }: { contracts: Contract[] }) {
  return (
    <form action={upsertTechnicalRecord} className="grid gap-3 md:grid-cols-3">
      <label className="field md:col-span-3">
        <span>Contrato</span>
        <select name="contract_id" required>
          <option value="">Selecione</option>
          {contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.number} · {contract.customerName}</option>)}
        </select>
      </label>
      <label className="field"><span>Marca do inversor</span><input name="inverter_brand" /></label>
      <label className="field"><span>Modelo do inversor</span><input name="inverter_model" /></label>
      <label className="field"><span>Potencia inversor kW</span><input name="inverter_power_kw" type="number" step="0.01" /></label>
      <label className="field"><span>Potencia sistema kWp</span><input name="system_power_kwp" type="number" step="0.01" /></label>
      <label className="field"><span>Qtd. modulos</span><input name="modules_count" type="number" min="0" /></label>
      <label className="field"><span>Marca modulos</span><input name="module_brand" /></label>
      <label className="field"><span>Concessionaria</span><input name="utility_company" /></label>
      <label className="field"><span>Consumo medio kWh</span><input name="average_consumption" type="number" /></label>
      <label className="field"><span>Status tecnico</span><Select name="status" options={technicalStatuses} /></label>
      <label className="flex items-center gap-2 text-sm font-semibold md:col-span-3"><input name="needs_review" type="checkbox" /> Necessita revisao</label>
      <label className="field md:col-span-3"><span>Observacoes tecnicas</span><textarea name="technical_notes" /></label>
      <Button type="submit" className="md:col-span-3" disabled={contracts.length === 0}>Salvar dados tecnicos</Button>
    </form>
  );
}
