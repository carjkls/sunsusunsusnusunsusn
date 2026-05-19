import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CompanyContext, Contract, Customer, Installment, Lead, TechnicalRecord } from "@/lib/types";

export interface AppData<T> {
  context: CompanyContext | null;
  rows: T;
  configured: boolean;
}

type SupabaseClient = NonNullable<Awaited<ReturnType<typeof createClient>>>;

async function getUserAndClient() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, userId: null, configured: false };

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");

  return { supabase, userId: data.user.id, configured: true };
}

export async function getCompanyContext(): Promise<{ context: CompanyContext | null; configured: boolean; supabase: SupabaseClient | null }> {
  const { supabase, userId, configured } = await getUserAndClient();
  if (!supabase || !userId) return { context: null, configured, supabase };

  const { data } = await supabase
    .from("company_members")
    .select("role, company_id, companies(name), profiles(full_name, username, email)")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!data) return { context: null, configured, supabase };

  const company = Array.isArray(data.companies) ? data.companies[0] : data.companies;
  const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;

  return {
    configured,
    supabase,
    context: {
      companyId: data.company_id,
      companyName: company?.name ?? "Empresa solar",
      role: data.role,
      userName: profile?.full_name ?? profile?.username ?? profile?.email ?? "Usuario"
    }
  };
}

export async function requireCompany() {
  const data = await getCompanyContext();
  return data;
}

export async function getDashboardData() {
  const { context, configured, supabase } = await requireCompany();
  if (!context || !supabase) return { context, configured, leads: [], customers: [], contracts: [], technicalRecords: [], installments: [] };

  const [leadsResult, customersResult, contractsResult, technicalResult, installmentsResult] = await Promise.all([
    fetchLeads(supabase, context.companyId),
    fetchCustomers(supabase, context.companyId),
    fetchContracts(supabase, context.companyId),
    fetchTechnicalRecords(supabase, context.companyId),
    fetchInstallments(supabase, context.companyId)
  ]);

  return {
    context,
    configured,
    leads: leadsResult,
    customers: customersResult,
    contracts: contractsResult,
    technicalRecords: technicalResult,
    installments: installmentsResult
  };
}

export async function getCrmData(): Promise<AppData<Lead[]>> {
  const { context, configured, supabase } = await requireCompany();
  return { context, configured, rows: context && supabase ? await fetchLeads(supabase, context.companyId) : [] };
}

export async function getCustomersData(): Promise<AppData<{ customers: Customer[]; contracts: Contract[] }>> {
  const { context, configured, supabase } = await requireCompany();
  if (!context || !supabase) return { context, configured, rows: { customers: [], contracts: [] } };
  return {
    context,
    configured,
    rows: {
      customers: await fetchCustomers(supabase, context.companyId),
      contracts: await fetchContracts(supabase, context.companyId)
    }
  };
}

export async function getContractsData(): Promise<AppData<{ contracts: Contract[]; customers: Customer[]; installments: Installment[]; technicalRecords: TechnicalRecord[] }>> {
  const { context, configured, supabase } = await requireCompany();
  if (!context || !supabase) return { context, configured, rows: { contracts: [], customers: [], installments: [], technicalRecords: [] } };
  return {
    context,
    configured,
    rows: {
      contracts: await fetchContracts(supabase, context.companyId),
      customers: await fetchCustomers(supabase, context.companyId),
      installments: await fetchInstallments(supabase, context.companyId),
      technicalRecords: await fetchTechnicalRecords(supabase, context.companyId)
    }
  };
}

export async function getFinanceData(): Promise<AppData<{ contracts: Contract[]; installments: Installment[] }>> {
  const { context, configured, supabase } = await requireCompany();
  if (!context || !supabase) return { context, configured, rows: { contracts: [], installments: [] } };
  return {
    context,
    configured,
    rows: {
      contracts: await fetchContracts(supabase, context.companyId),
      installments: await fetchInstallments(supabase, context.companyId)
    }
  };
}

export async function getTechnicalData(): Promise<AppData<{ technicalRecords: TechnicalRecord[]; contracts: Contract[] }>> {
  const { context, configured, supabase } = await requireCompany();
  if (!context || !supabase) return { context, configured, rows: { technicalRecords: [], contracts: [] } };
  return {
    context,
    configured,
    rows: {
      technicalRecords: await fetchTechnicalRecords(supabase, context.companyId),
      contracts: await fetchContracts(supabase, context.companyId)
    }
  };
}

async function fetchLeads(supabase: SupabaseClient, companyId: string): Promise<Lead[]> {
  const { data } = await supabase.from("leads").select("*").eq("company_id", companyId).is("deleted_at", null).order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    type: row.customer_type,
    phone: row.phone,
    city: row.city,
    state: row.state,
    origin: row.origin,
    averageConsumption: Number(row.average_consumption ?? 0),
    owner: row.owner_name ?? "Sem responsavel",
    stage: row.stage,
    nextTask: row.next_task ?? ""
  }));
}

async function fetchCustomers(supabase: SupabaseClient, companyId: string): Promise<Customer[]> {
  const { data } = await supabase.from("customers").select("*").eq("company_id", companyId).is("deleted_at", null).order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    type: row.customer_type,
    phone: row.phone,
    email: row.email ?? "",
    city: row.city,
    state: row.state,
    owner: row.owner_name ?? "Sem responsavel",
    ltv: row.ltv_potential,
    ltvReason: row.ltv_reason ?? "",
    tags: row.tags ?? [],
    notes: row.notes ?? ""
  }));
}

async function fetchContracts(supabase: SupabaseClient, companyId: string): Promise<Contract[]> {
  const { data } = await supabase
    .from("contracts")
    .select("*, customers(name)")
    .eq("company_id", companyId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => {
    const customer = Array.isArray(row.customers) ? row.customers[0] : row.customers;
    return {
      id: row.id,
      number: row.contract_number,
      customerId: row.customer_id,
      customerName: customer?.name ?? "Cliente",
      commercialOwner: row.commercial_owner_name ?? "Sem responsavel",
      closeDate: row.close_date,
      totalValue: Number(row.total_value ?? 0),
      commercialStatus: row.commercial_status,
      financialStatus: row.financial_status,
      technicalStatus: row.technical_status,
      totalCosts: Number(row.total_costs ?? 0),
      openAmount: Number(row.open_amount ?? 0)
    };
  });
}

async function fetchTechnicalRecords(supabase: SupabaseClient, companyId: string): Promise<TechnicalRecord[]> {
  const { data } = await supabase
    .from("technical_records")
    .select("*, contracts(customers(name))")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => {
    const contract = Array.isArray(row.contracts) ? row.contracts[0] : row.contracts;
    const customer = Array.isArray(contract?.customers) ? contract.customers[0] : contract?.customers;
    return {
      id: row.id,
      contractId: row.contract_id,
      customerName: customer?.name ?? "Cliente",
      inverterBrand: row.inverter_brand ?? "",
      inverterModel: row.inverter_model ?? "",
      systemPowerKwp: Number(row.system_power_kwp ?? 0),
      modulesCount: Number(row.modules_count ?? 0),
      utilityCompany: row.utility_company ?? "",
      averageConsumption: Number(row.average_consumption ?? 0),
      status: row.status,
      needsReview: Boolean(row.needs_review)
    };
  });
}

async function fetchInstallments(supabase: SupabaseClient, companyId: string): Promise<Installment[]> {
  const { data } = await supabase
    .from("contract_installments")
    .select("*")
    .eq("company_id", companyId)
    .order("due_date", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    contractId: row.contract_id,
    dueDate: row.due_date,
    amount: Number(row.amount ?? 0),
    status: row.status
  }));
}
