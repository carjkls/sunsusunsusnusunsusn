"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInWithUsername(_: unknown, formData: FormData) {
  const username = String(formData.get("username") ?? "").trim().replace(/^@/, "").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  if (!supabase) return { error: "Supabase nao configurado." };
  if (!username || !password) return { error: "Informe username e senha." };

  const { data: email, error: lookupError } = await supabase.rpc("resolve_username_login", { requested_username: username });
  if (lookupError || !email) return { error: "Credenciais invalidas." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Credenciais invalidas." };

  redirect("/app/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/login");
}
