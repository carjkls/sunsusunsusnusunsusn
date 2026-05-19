"use client";

import { useActionState, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Chrome, KeyRound, Phone } from "lucide-react";
import { Button } from "@/components/ui";
import { signInWithUsername } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/browser";

const initialState = { error: "" };

export function LoginClient() {
  const [tab, setTab] = useState<"username" | "phone">("username");
  const [state, formAction, pending] = useActionState(signInWithUsername, initialState);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [clientError, setClientError] = useState("");
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();
  const next = params.get("next") ?? "/app/dashboard";

  function signInGoogle() {
    startTransition(async () => {
      setClientError("");
      try {
        const supabase = createClient();
        const origin = window.location.origin;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` }
        });
        if (error) setClientError(error.message);
      } catch {
        setClientError("Supabase nao configurado.");
      }
    });
  }

  function sendOtp() {
    startTransition(async () => {
      setClientError("");
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({ phone });
        if (error) setClientError(error.message);
        else setOtpSent(true);
      } catch {
        setClientError("Supabase nao configurado.");
      }
    });
  }

  function verifyOtp() {
    startTransition(async () => {
      setClientError("");
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
        if (error) setClientError(error.message);
        else window.location.href = next;
      } catch {
        setClientError("Supabase nao configurado.");
      }
    });
  }

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1180px] items-center gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-solar">Sun Neo AI</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight">CRM financeiro e operacional para empresas solares.</h1>
        <p className="mt-4 max-w-xl text-muted">Acesse com Google, username e senha ou telefone por SMS. Os dados da producao nascem vazios e pertencem somente a empresa vinculada ao usuario.</p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5 shadow-panel">
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant={tab === "username" ? "primary" : "secondary"} onClick={() => setTab("username")}>
            <KeyRound size={18} /> Username
          </Button>
          <Button type="button" variant={tab === "phone" ? "primary" : "secondary"} onClick={() => setTab("phone")}>
            <Phone size={18} /> Telefone
          </Button>
        </div>

        <Button type="button" variant="secondary" className="mt-4 w-full" onClick={signInGoogle} disabled={isPending}>
          <Chrome size={18} /> Entrar com Google
        </Button>

        {tab === "username" ? (
          <form action={formAction} className="mt-5 grid gap-4">
            <label className="field">
              <span>Username</span>
              <input name="username" placeholder="@usuario" autoComplete="username" />
            </label>
            <label className="field">
              <span>Senha</span>
              <input name="password" type="password" autoComplete="current-password" />
            </label>
            {state?.error ? <p className="text-sm font-semibold text-red">{state.error}</p> : null}
            <Button type="submit" disabled={pending}>Entrar</Button>
          </form>
        ) : (
          <div className="mt-5 grid gap-4">
            <label className="field">
              <span>Telefone</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+5586999999999" inputMode="tel" />
            </label>
            {otpSent ? (
              <label className="field">
                <span>Codigo SMS</span>
                <input value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" />
              </label>
            ) : null}
            {clientError ? <p className="text-sm font-semibold text-red">{clientError}</p> : null}
            <Button type="button" onClick={otpSent ? verifyOtp : sendOtp} disabled={isPending}>
              {otpSent ? "Validar codigo" : "Enviar codigo"}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
