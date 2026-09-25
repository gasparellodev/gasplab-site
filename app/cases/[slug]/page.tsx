import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { CaseViewTracker } from "@/components/sections/case-view-tracker";
import { caseDetails, cases, type CaseSlug } from "@/lib/content";

export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  const d = caseDetails[slug as CaseSlug];
  if (!item || !d) notFound();
  return (
    <PageShell>
      <CaseViewTracker slug={slug} />
      <section className="grid-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">{item.kind}</p>
          <h1 className="display mt-8">{item.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">{item.summary}</p>
        </div>
      </section>
      <section className="border-y border-white/10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2">
          <Block n="01" t="Contexto" b={d.context} />
          <Block n="02" t="Problema" b={d.problem} />
          <Block n="03" t="Arquitetura" b={d.architecture} />
          <Block n="04" t="Solução" b={d.solution} />
          <Block n="05" t="Participação da GaspLab" b={d.role} />
          <Block n="06" t="Experiência" b={d.experience} />
          <Block n="07" t="Resultado" b={d.result} />
          <Block n="08" t="Próximo passo" b={d.next} />
        </div>
      </section>
      <section className="px-5 py-24 text-center">
        <h2 className="title mx-auto max-w-4xl">Seu desafio também pode virar um sistema claro.</h2>
        <Link href="/diagnostico" className="mt-9 btn-primary">
          Começar diagnóstico <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </PageShell>
  );
}
function Block({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <article className="bg-sunken p-8 sm:p-12">
      <span className="font-mono text-xs text-signal">{n}</span>
      <h2 className="mt-12 text-3xl font-medium">{t}</h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">{b}</p>
    </article>
  );
}
