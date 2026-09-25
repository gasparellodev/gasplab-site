import { Suspense } from "react";
import { PageShell } from "@/components/site-shell";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { diagnosticPage } from "@/lib/content";
export const metadata = {
  title: "Diagnóstico",
  description:
    "Organize seu cenário e encontre o próximo movimento para presença, processos e tecnologia.",
};
export default function Diagnostic() {
  return (
    <PageShell>
      <section className="grid-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow">{diagnosticPage.eyebrow}</p>
            <h1 className="title mt-7">{diagnosticPage.title}</h1>
            <p className="mt-7 text-lg leading-8 text-muted-foreground">{diagnosticPage.body}</p>
            <div className="mt-10 space-y-4 font-mono text-xs uppercase tracking-widest text-subtle">
              {diagnosticPage.nextSteps.map((step, i) => (
                <p key={step}>
                  0{i + 1} · {step}
                </p>
              ))}
            </div>
          </div>
          <Suspense fallback={<div className="panel min-h-[700px] animate-pulse rounded-[2rem]" />}>
            <DiagnosticForm />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
