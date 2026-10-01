"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (password.length < 8) { setError("Use uma senha com pelo menos 8 caracteres."); return; }
    if (password !== confirmation) { setError("As senhas não coincidem."); return; }
    setPending(true);
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setPending(false); return; }
    router.replace("/operacao");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="panel w-full max-w-md rounded-2xl p-6 sm:p-8">
      <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-signal"><KeyRound /></div>
      <p className="eyebrow mt-7">Recuperação</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Crie uma nova senha.</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Depois de salvar, você seguirá direto para a operação.</p>
      <div className="mt-7 space-y-4">
        <div className="space-y-2"><Label htmlFor="new-password">Nova senha</Label><Input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="confirm-password">Confirmar senha</Label><Input id="confirm-password" type="password" autoComplete="new-password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></div>
      </div>
      {error ? <Alert variant="destructive" className="mt-5"><AlertDescription>{error}</AlertDescription></Alert> : null}
      <Button type="submit" className="mt-6 h-11 w-full bg-action hover:bg-action-hover" disabled={pending}>{pending ? <Loader2 className="animate-spin" /> : <KeyRound />} Salvar nova senha</Button>
    </form>
  );
}

