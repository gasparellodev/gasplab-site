"use client";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { whatsappUrl } from "@/lib/content";
const options = [
  ["site", "Site"],
  ["automacoes", "Automação"],
  ["sistemas", "Sistema"],
  ["integrado", "Solução integrada"],
  ["nao-sei", "Ainda não sei"],
];
export function DiagnosticForm() {
  const search = useSearchParams();
  const initial = search.get("interesse") || "";
  const [interest, setInterest] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL;
  const utms = useMemo(
    () => ({
      utmSource: search.get("utm_source") || "",
      utmMedium: search.get("utm_medium") || "",
      utmCampaign: search.get("utm_campaign") || "",
    }),
    [search],
  );
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd);
    try {
      const res = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, interest, consent, ...utms }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }
  if (state === "success")
    return (
      <div className="panel rounded-[2rem] p-8 sm:p-12" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-signal" />
        <h2 className="mt-8 text-4xl font-semibold tracking-tight">Contexto recebido.</h2>
        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
          Obrigado. Seu diagnóstico entrou na fila inicial da GaspLab. Escolha o próximo passo:
        </p>
        {calUrl ? (
          <>
            <a
              onClick={() => {}}
              target="_blank"
              rel="noreferrer"
              href={calUrl}
              className="mt-8 btn-primary"
            >
              <CalendarDays size={17} /> Abrir agenda
            </a>
            <iframe
              title="Agenda GaspLab"
              src={calUrl}
              className="mt-8 min-h-[650px] w-full rounded-2xl border border-white/10"
            />
          </>
        ) : (
          <a
            href={whatsappUrl}
            className="mt-8 btn-primary"
          >
            Continuar no WhatsApp <ArrowRight size={17} />
          </a>
        )}
      </div>
    );
  return (
    <form onSubmit={submit} className="panel rounded-[2rem] p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            required
            name="name"
            autoComplete="name"
            maxLength={100}
            className="h-12 bg-black/10"
          />
        </Field>
        <Field label="Empresa">
          <Input required name="company" maxLength={120} className="h-12 bg-black/10" />
        </Field>
        <Field label="Contato (e-mail ou WhatsApp)">
          <Input required name="contact" maxLength={160} className="h-12 bg-black/10" />
        </Field>
        <Field label="Segmento">
          <Input required name="segment" maxLength={100} className="h-12 bg-black/10" />
        </Field>
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm text-soft">Interesse</label>
        <Select value={interest} onValueChange={setInterest} required>
          <SelectTrigger className="h-12 w-full bg-black/10">
            <SelectValue placeholder="Selecione uma frente" />
          </SelectTrigger>
          <SelectContent>
            {options.map(([v, l]) => (
              <SelectItem key={v} value={v}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <Field label="Qual é o principal gargalo hoje?">
          <Textarea
            required
            name="challenge"
            maxLength={2000}
            className="min-h-36 bg-black/10"
            placeholder="Conte o que está travando, consumindo tempo ou limitando crescimento."
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="URL atual (opcional)">
          <Input
            name="url"
            type="url"
            maxLength={300}
            className="h-12 bg-black/10"
            placeholder="https://"
          />
        </Field>
      </div>
      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />
      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <Checkbox
          required
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          className="mt-1"
        />
        <span>
          Concordo com o uso destes dados para contato sobre o diagnóstico, conforme a política de
          privacidade.
        </span>
      </label>
      {state === "error" && (
        <p role="alert" className="mt-5 text-sm text-danger">
          Não foi possível enviar agora. Tente novamente ou use o WhatsApp.
        </p>
      )}
      <button
        disabled={state === "sending" || !consent || !interest}
        className="mt-8 btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Enviar diagnóstico"} <ArrowRight size={17} />
      </button>
    </form>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-soft">{label}</span>
      {children}
    </label>
  );
}
