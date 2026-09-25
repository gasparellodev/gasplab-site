import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { GaspLabClients } from "@/components/sections/gasplab-clients";
import { Trajectory } from "@/components/sections/trajectory";
import { founder } from "@/lib/content";

export const metadata = {
  title: "Sobre",
  description: "A visão, o método e a liderança técnica por trás da GaspLab.",
};

export default function About() {
  return (
    <PageShell>
      <section className="grid-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">Sobre a GaspLab</p>
            <h1 className="display mt-8">Fazer a inteligência caber na realidade do negócio.</h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-muted-foreground">
              A GaspLab é uma empresa de engenharia de software e inteligência artificial aplicada.
              Entendemos o cenário, mapeamos o processo e construímos a arquitetura para a
              tecnologia fluir com a operação.
            </p>
          </div>
          <div className="panel self-end rounded-[2rem] p-8">
            <p className="eyebrow">Princípio</p>
            <p className="mt-7 text-2xl leading-10">
              Contexto antes da tecnologia. Arquitetura antes da automação. Adoção antes do
              espetáculo.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-primary/15 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src="/vinicius-gasparello.jpg"
                width={640}
                height={640}
                sizes="(min-width: 1024px) 32vw, 90vw"
                alt="Retrato de Vinícius Gasparello"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="eyebrow mt-8">Fundador e liderança técnica</p>
          </div>
          <div>
            <h2 className="title">{founder.name}</h2>
            <p className="mt-4 text-lg leading-7 text-soft">{founder.role}</p>
            {founder.longBio.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <blockquote className="mt-8 max-w-3xl border-l-2 border-primary/40 pl-6 text-xl leading-9 text-soft">
              “{founder.quote}”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              {founder.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-primary/20 px-4 py-1.5 font-mono text-xs text-soft"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <div className="mt-12 border-l border-primary/35 pl-7">
              {founder.timeline.map((entry, i) => (
                <div
                  key={entry.company}
                  className={`py-4 ${i < founder.timeline.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                    {entry.period}
                  </p>
                  <p className="mt-1 text-soft">
                    <span className="font-medium text-white">{entry.company}</span> — {entry.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GaspLabClients />
      <Trajectory />

      <section className="px-5 py-24 text-center sm:px-8 lg:px-12">
        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-2 font-semibold text-signal"
        >
          Levar essa experiência para seu desafio <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </PageShell>
  );
}
