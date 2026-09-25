"use client";
import { FormEvent, useMemo, useRef, useState } from "react";
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
import { TrackedLink } from "@/components/sections/tracked-link";
import { track } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/content";
import { diagnosticInterests, normalizeInterest } from "@/lib/diagnostic";

const DEFAULT_ERROR_MESSAGE = "Não foi possível enviar agora. Tente novamente ou use o WhatsApp.";
const RATE_LIMITED_MESSAGE =
  "Muitas tentativas em pouco tempo. Aguarde alguns minutos ou fale com a gente pelo WhatsApp.";
const UNAVAILABLE_MESSAGE =
  "Não foi possível registrar agora. Fale com a gente pelo WhatsApp enquanto resolvemos.";

export function DiagnosticForm() {
  const search = useSearchParams();
  const initial = normalizeInterest(search.get("interesse"));
  const [interest, setInterest] = useState<string>(initial);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);
  const [startedAt] = useState(() => Date.now());
  const hasTrackedStart = useRef(false);
  function handleFirstFocus() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    track("diagnostic_start");
  }
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
        body: JSON.stringify({ ...payload, interest, consent, startedAt, ...utms }),
      });
      if (!res.ok) {
        if (res.status === 429) setErrorMessage(RATE_LIMITED_MESSAGE);
        else if (res.status === 503) setErrorMessage(UNAVAILABLE_MESSAGE);
        else setErrorMessage(DEFAULT_ERROR_MESSAGE);
        setState("error");
        return;
      }
      track("diagnostic_submit", { interest });
      setState("success");
    } catch {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
      setState("error");
    }
  }
  if (state === "success")
    return (
      <div className="panel rounded-[2rem] p-8 sm:p-12" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-signal" aria-hidden="true" />
        <h2 className="mt-8 text-4xl font-semibold tracking-tight">Contexto recebido.</h2>
        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
          Obrigado. Seu diagnóstico entrou na fila inicial da GaspLab. Escolha o próximo passo:
        </p>
        {calUrl ? (
          <>
            <TrackedLink href={calUrl} event="schedule_click" className="mt-8 btn-primary">
              <CalendarDays size={17} aria-hidden="true" /> Abrir agenda
            </TrackedLink>
            <iframe
              title="Agenda GaspLab"
              src={calUrl}
              className="mt-8 min-h-[650px] w-full rounded-2xl border border-white/10"
            />
          </>
        ) : (
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            eventProps={{ origem: "diagnostico_sucesso" }}
            className="mt-8 btn-primary"
          >
            Continuar no WhatsApp <ArrowRight size={17} aria-hidden="true" />
          </TrackedLink>
        )}
      </div>
    );
  return (
    <form onSubmit={submit} onFocus={handleFirstFocus} className="panel rounded-[2rem] p-6 sm:p-10">
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
        <label htmlFor="interest" className="mb-2 block text-sm text-soft">
          Interesse
        </label>
        <Select value={interest} onValueChange={setInterest} required>
          <SelectTrigger id="interest" className="h-12 w-full bg-black/10">
            <SelectValue placeholder="Selecione uma frente" />
          </SelectTrigger>
          <SelectContent>
            {diagnosticInterests.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
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
        <div role="alert" className="mt-5 text-sm text-danger">
          <p>{errorMessage}</p>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            eventProps={{ origem: "diagnostico_erro" }}
            className="mt-2 inline-flex items-center gap-1.5 text-primary underline underline-offset-4"
          >
            Falar no WhatsApp <ArrowRight size={14} aria-hidden="true" />
          </TrackedLink>
        </div>
      )}
      <button
        type="submit"
        disabled={state === "sending" || !consent || !interest}
        className="mt-8 btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Enviar diagnóstico"}{" "}
        <ArrowRight size={17} aria-hidden="true" />
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
