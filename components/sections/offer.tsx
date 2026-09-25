import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { offer } from "@/lib/content";

/** Interesse do diagnóstico correspondente a cada degrau, na ordem da escada. */
const interestBySlot = ["diagnostico", "sprint", "diagnostico", "evolucao"] as const;

/** Comprimento do conector entre a Flowline e cada degrau — cria o efeito de escada. */
const connectorHeights = ["lg:h-10", "lg:h-0", "lg:h-14", "lg:h-20"];

function StepBody({ step, i }: { step: (typeof offer.steps)[number]; i: number }) {
  const featured = i === 1;
  return (
    <div
      className={`h-full rounded-[1.75rem] p-7 ${
        featured ? "panel border-2 border-signal/70 bg-primary/10 lg:scale-[1.03]" : "panel"
      }`}
    >
      <span className="font-mono text-xs text-subtle">{step.index}</span>
      <h3 className="mt-8 text-2xl font-medium leading-7">{step.name}</h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{step.summary}</p>
      <ul className="mt-6 space-y-2.5">
        {step.deliverables.map((d) => (
          <li key={d} className="flex gap-2 text-xs leading-5 text-soft">
            <Check size={14} className="mt-0.5 shrink-0 text-signal" aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>
      <Link
        href={`/diagnostico?interesse=${interestBySlot[i]}`}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-signal"
      >
        {step.ctaLabel} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function Offer() {
  return (
    <section id="oferta" className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow">{offer.eyebrow}</p>
        <h2 className="title mt-5 max-w-3xl">{offer.title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{offer.body}</p>

        {/* Desktop: escada conectada pela Flowline (linha em --signal). */}
        <div className="relative mt-20 hidden lg:grid lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-[7px] h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent"
          />
          {offer.steps.map((step, i) => (
            <div key={step.index} className="relative flex flex-col">
              <span
                aria-hidden="true"
                className={`relative z-10 mx-auto h-3.5 w-3.5 rounded-full border-2 border-signal ${
                  i === 1 ? "bg-signal" : "bg-background"
                }`}
              />
              <div
                aria-hidden="true"
                className={`mx-auto w-px flex-none border-l border-dashed border-primary/30 ${connectorHeights[i]}`}
              />
              <StepBody step={step} i={i} />
            </div>
          ))}
        </div>

        {/* Mobile / tablet: lista vertical com linha de conexão à esquerda. */}
        <div className="mt-16 space-y-6 lg:hidden">
          {offer.steps.map((step, i) => (
            <div
              key={step.index}
              className={`border-l-2 pl-6 ${i === 1 ? "border-signal" : "border-primary/30"}`}
            >
              <StepBody step={step} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
