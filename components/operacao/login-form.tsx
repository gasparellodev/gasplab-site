"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, KeyRound, Loader2, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    const supabase = createClient();

    if (mode === "forgot") {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
      });
      if (resetError) setError(resetError.message);
      else setMessage("Enviamos as instruções de recuperação para o seu e-mail.");
      setPending(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("E-mail ou senha inválidos. Confira os dados e tente novamente.");
      setPending(false);
      return;
    }

    const destination = searchParams.get("redirect");
    const safeDestination =
      destination?.startsWith("/") && !destination.startsWith("//")
        ? destination
        : "/operacao";
    router.replace(safeDestination);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="panel w-full max-w-md rounded-2xl p-6 sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <svg viewBox="0 0 36 36" className="size-10" aria-hidden="true">
          <path d="M4 4h20v7H11v14h14v-5h-7v-6h14v18H4z" className="fill-primary" />
          <path d="M25 4h7v7h-7z" className="fill-signal" />
        </svg>
        <div>
          <p className="font-semibold tracking-[-0.04em]">GaspLab</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">Operação comercial</p>
        </div>
      </div>

      <p className="eyebrow">Acesso restrito</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">
        {mode === "login" ? "Entre na operação." : "Recupere seu acesso."}
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {mode === "login"
          ? "Use o acesso enviado pelo administrador da GaspLab."
          : "Informe seu e-mail e enviaremos as próximas instruções."}
      </p>

      <div className="mt-7 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 bg-sunken pl-10"
              placeholder="voce@gasplab.com"
            />
          </div>
        </div>
        {mode === "login" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <button type="button" className="text-xs text-signal hover:underline" onClick={() => setMode("forgot")}>
                Esqueci minha senha
              </button>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 bg-sunken pl-10"
              />
            </div>
          </div>
        ) : null}
      </div>

      <div aria-live="polite">
        {error ? <Alert variant="destructive" className="mt-5"><AlertDescription>{error}</AlertDescription></Alert> : null}
        {message ? <Alert className="mt-5 border-primary/25 bg-primary/10"><AlertDescription>{message}</AlertDescription></Alert> : null}
      </div>

      <Button type="submit" className="mt-6 h-11 w-full bg-action text-action-foreground hover:bg-action-hover" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : null}
        {mode === "login" ? "Entrar" : "Enviar instruções"}
        {!pending ? <ArrowRight /> : null}
      </Button>
      {mode === "forgot" ? (
        <button type="button" className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground" onClick={() => setMode("login")}>
          Voltar para o login
        </button>
      ) : null}
    </form>
  );
}

