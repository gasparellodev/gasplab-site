import type { ReactNode } from "react";
import { AlertCircle, Inbox, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function OperationPage({ children }: { children: ReactNode }) {
  return <main id="conteudo-principal" className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">{children}</main>;
}

export function PageHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 border-b border-primary/15 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function MetricCard({ label, value, hint }: { label: string; value: string | number; hint: string }) {
  return (
    <Card className="panel gap-3 py-5">
      <CardHeader className="px-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{label}</p>
      </CardHeader>
      <CardContent className="px-5">
        <p className="text-3xl font-semibold tracking-[-0.04em] text-soft tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

export function LoadingGrid({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Carregando dados">
      {Array.from({ length: cards }, (_, index) => (
        <Card key={index} className="panel gap-4 p-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-full" />
        </Card>
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="panel flex min-h-56 flex-col items-center justify-center rounded-xl p-8 text-center" role="alert">
      <AlertCircle className="size-7 text-danger" aria-hidden="true" />
      <h2 className="mt-4 text-lg font-semibold">Não conseguimos carregar esta área</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button className="mt-5" variant="outline" onClick={onRetry}>
          <RotateCw /> Tentar novamente
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-card/40 p-8 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-raised text-signal">
        <Inbox className="size-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 font-semibold text-soft">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
        tone === "neutral" && "border-primary/20 bg-raised text-muted-foreground",
        tone === "info" && "border-signal/25 bg-signal/10 text-signal",
        tone === "success" && "border-primary/30 bg-primary/10 text-soft",
        tone === "warning" && "border-warning/30 bg-warning/10 text-warning",
        tone === "danger" && "border-danger/30 bg-danger/10 text-danger",
      )}
    >
      {children}
    </span>
  );
}

export function formatDate(value?: string | null) {
  if (!value) return "Sem data definida";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

export function formatMoney(value?: number | null) {
  if (value === null || value === undefined) return "Não informado";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
