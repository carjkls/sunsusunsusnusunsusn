export type Role = "admin" | "comercial" | "financeiro" | "tecnico";
export type Ltv = "Nao classificado" | "Baixo" | "Medio" | "Alto" | "Estrategico";
export type LeadStage =
  | "Novo lead"
  | "Contato feito"
  | "Diagnostico"
  | "Proposta enviada"
  | "Negociacao"
  | "Contrato fechado"
  | "Perdido";

export type FinancialStatus =
  | "Sem financeiro cadastrado"
  | "Em dia"
  | "Parcialmente pago"
  | "Em atraso"
  | "Quitado"
  | "Cancelado";

export type TechnicalStatus =
  | "Nao iniciado"
  | "Em projeto"
  | "Aguardando instalacao"
  | "Instalado"
  | "Homologado"
  | "Ativo"
  | "Precisa revisao";

export type CustomerType = "Residencial" | "Comercial" | "Rural" | "Industrial" | "Condominio";

export interface CompanyContext {
  companyId: string;
  companyName: string;
  role: Role;
  userName: string;
}

export interface Lead {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  city: string;
  state: string;
  origin: string;
  averageConsumption: number;
  owner: string;
  stage: LeadStage;
  nextTask: string;
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  email: string;
  city: string;
  state: string;
  owner: string;
  ltv: Ltv;
  ltvReason: string;
  tags: string[];
  notes: string;
}

export interface Contract {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  commercialOwner: string;
  closeDate: string;
  totalValue: number;
  commercialStatus: "Proposta" | "Fechado" | "Perdido" | "Cancelado";
  financialStatus: FinancialStatus;
  technicalStatus: TechnicalStatus;
  totalCosts: number;
  openAmount: number;
}

export interface TechnicalRecord {
  id: string;
  contractId: string;
  customerName: string;
  inverterBrand: string;
  inverterModel: string;
  systemPowerKwp: number;
  modulesCount: number;
  utilityCompany: string;
  averageConsumption: number;
  status: TechnicalStatus;
  needsReview: boolean;
}

export interface Installment {
  id: string;
  contractId: string;
  dueDate: string;
  amount: number;
  status: "Pendente" | "Paga" | "Vencida" | "Cancelada";
}
