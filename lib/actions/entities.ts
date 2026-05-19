"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCompany } from "@/lib/data/repository";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function numberValue(formData: FormData, key: string) {
  return Number(value(formData, key) || 0);
}

export async function createLead(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  await supabase.from("leads").insert({
    company_id: context.companyId,
    name: value(formData, "name"),
    customer_type: value(formData, "customer_type"),
    phone: value(formData, "phone"),
    email: value(formData, "email") || null,
    city: value(formData, "city"),
    state: value(formData, "state"),
    origin: value(formData, "origin"),
    average_consumption: numberValue(formData, "average_consumption"),
    owner_name: value(formData, "owner_name"),
    stage: value(formData, "stage"),
    next_task: value(formData, "next_task") || null,
    notes: value(formData, "notes") || null
  });

  revalidatePath("/app/crm");
}

export async function updateLeadStage(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  await supabase.from("leads").update({ stage: value(formData, "stage") }).eq("company_id", context.companyId).eq("id", value(formData, "lead_id"));
  revalidatePath("/app/crm");
}

export async function createCustomer(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  const { data } = await supabase
    .from("customers")
    .insert({
      company_id: context.companyId,
      name: value(formData, "name"),
      customer_type: value(formData, "customer_type"),
      phone: value(formData, "phone"),
      email: value(formData, "email") || null,
      address: value(formData, "address") || null,
      city: value(formData, "city"),
      state: value(formData, "state"),
      owner_name: value(formData, "owner_name"),
      ltv_potential: value(formData, "ltv_potential"),
      ltv_reason: value(formData, "ltv_reason") || null,
      notes: value(formData, "notes") || null
    })
    .select("id")
    .single();

  revalidatePath("/app/clientes");
  if (data?.id) redirect(`/app/clientes/${data.id}`);
}

export async function createContract(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  const { data } = await supabase
    .from("contracts")
    .insert({
      company_id: context.companyId,
      customer_id: value(formData, "customer_id"),
      contract_number: value(formData, "contract_number"),
      commercial_owner_name: value(formData, "commercial_owner_name"),
      close_date: value(formData, "close_date") || null,
      total_value: numberValue(formData, "total_value"),
      commercial_status: value(formData, "commercial_status"),
      financial_status: "Sem financeiro cadastrado",
      technical_status: "Nao iniciado",
      notes: value(formData, "notes") || null
    })
    .select("id")
    .single();

  revalidatePath("/app/contratos");
  if (data?.id) redirect(`/app/contratos/${data.id}`);
}

export async function createInstallment(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  await supabase.from("contract_installments").insert({
    company_id: context.companyId,
    contract_id: value(formData, "contract_id"),
    due_date: value(formData, "due_date"),
    amount: numberValue(formData, "amount"),
    status: value(formData, "status")
  });

  revalidatePath("/app/financeiro");
  revalidatePath("/app/contratos");
}

export async function createCost(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  await supabase.from("contract_costs").insert({
    company_id: context.companyId,
    contract_id: value(formData, "contract_id"),
    category: value(formData, "category"),
    amount: numberValue(formData, "amount"),
    notes: value(formData, "notes") || null
  });

  revalidatePath("/app/financeiro");
  revalidatePath("/app/contratos");
}

export async function upsertTechnicalRecord(formData: FormData) {
  const { context, supabase } = await requireCompany();
  if (!context || !supabase) throw new Error("Empresa ativa obrigatoria.");

  await supabase.from("technical_records").upsert(
    {
      company_id: context.companyId,
      contract_id: value(formData, "contract_id"),
      inverter_brand: value(formData, "inverter_brand"),
      inverter_model: value(formData, "inverter_model"),
      inverter_power_kw: numberValue(formData, "inverter_power_kw"),
      system_power_kwp: numberValue(formData, "system_power_kwp"),
      modules_count: numberValue(formData, "modules_count"),
      module_brand: value(formData, "module_brand") || null,
      utility_company: value(formData, "utility_company"),
      average_consumption: numberValue(formData, "average_consumption"),
      status: value(formData, "status"),
      needs_review: value(formData, "needs_review") === "on",
      technical_notes: value(formData, "technical_notes") || null
    },
    { onConflict: "contract_id" }
  );

  revalidatePath("/app/tecnico");
  revalidatePath("/app/contratos");
}
