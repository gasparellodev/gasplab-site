import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { cases } from "@/lib/content";
const details = {
  gaspbio: {
    problem: "Links genéricos organizam destinos, mas raramente criam uma jornada de decisão.",
    solution:
      "A GaspLab concebeu uma experiência de link na bio com narrativa, blocos modulares e caminhos orientados à conversão.",
    role: "Estratégia de produto, arquitetura de conteúdo, UX/UI e desenvolvimento.",
    result:
      "Produto inicial estruturado e disponível para evolução. Métricas comerciais serão publicadas quando houver uma base verificável.",
  },
  contaflow: {
    problem: "Rotinas contábeis acumulam mensagens, documentos e tarefas em canais desconectados.",
    solution:
      "O Contaflow organiza a proposta de uma operação conectada, combinando automação, inteligência artificial e uma interface orientada ao fluxo de trabalho.",
    role: "Descoberta, posicionamento, desenho do produto e implementação da experiência inicial.",
    result:
      "Frente de produto em validação. Indicadores de eficiência serão publicados apenas após medição e autorização.",
  },
};
export function generateStaticParams() {
  return cases.map(({ slug }) => ({ slug }));
}
export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases.find((c) => c.slug === slug);
  const d = details[slug as keyof typeof details];
  if (!item || !d) notFound();
  return (
    <PageShell>
      <section className="grid-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">{item.kind}</p>
          <h1 className="display mt-8">{item.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">{item.summary}</p>
        </div>
      </section>
      <section className="border-y border-white/10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-2">
          <Block n="01" t="Problema" b={d.problem} />
          <Block n="02" t="Arquitetura e solução" b={d.solution} />
          <Block n="03" t="Participação da GaspLab" b={d.role} />
          <Block n="04" t="Resultado comprovado" b={d.result} />
        </div>
      </section>
      <section className="px-5 py-24 text-center">
        <h2 className="title mx-auto max-w-4xl">Seu desafio também pode virar um sistema claro.</h2>
        <Link
          href="/diagnostico"
          className="mt-9 btn-primary"
        >
          Começar diagnóstico <ArrowRight size={17} />
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
