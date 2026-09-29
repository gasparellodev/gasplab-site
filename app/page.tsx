import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Braces, BrainCircuit, ShieldCheck } from "lucide-react";
import { PageShell, SectionHead } from "@/components/site-shell";
import { ArchitectureFlow, ProcessLab } from "@/components/visuals";
import { DemoStrip } from "@/components/demo-strip";
import { Pillars } from "@/components/sections/pillars";
import { Offer } from "@/components/sections/offer";
import { Governance } from "@/components/sections/governance";
import { GaspLabClients } from "@/components/sections/gasplab-clients";
import { Trajectory } from "@/components/sections/trajectory";
import {
  capabilities,
  cases,
  finalCta,
  founder,
  fieldNotes,
  hero,
  instagramReels,
  method,
  problem,
  services,
} from "@/lib/content";

const founderHighlightIcons = [Braces, BrainCircuit, ShieldCheck];

export default function Home() {
  return (
    <PageShell>
      <section className="grid-bg relative overflow-hidden border-b border-primary/15 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div
          aria-hidden="true"
          className="blue-glow pointer-events-none absolute -left-60 top-0 h-[650px] w-[650px]"
        />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="display mt-7">
              {hero.titleBefore} <span className="text-signal">{hero.titleHighlight}</span>{" "}
              {hero.titleAfter}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-muted-foreground">{hero.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={hero.primaryCta.href} className="btn-primary">
                {hero.primaryCta.label} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a href={hero.secondaryCta.href} className="btn-secondary">
                {hero.secondaryCta.label} <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[.14em] text-subtle">
              {hero.trail}
            </p>
          </div>
          <ArchitectureFlow />
        </div>
      </section>

      <section className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2 className="title mt-6">{problem.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{problem.body}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2">
            {problem.frictions.map((x, i) => (
              <div key={x} className="bg-sunken p-7">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <p className="mt-12 text-2xl font-medium">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pillars />

      <section id="metodo" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead eyebrow={method.eyebrow} title={method.title} body={method.body} />
          <div className="mt-14">
            <ProcessLab />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {method.steps.map((step, i) => (
              <div key={step.name} className="border-l border-primary/30 pl-4">
                <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                <p className="mt-3 text-lg font-medium">{step.name}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Offer />

      <section className="border-y border-primary/15 bg-sunken px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow={capabilities.eyebrow}
            title={capabilities.title}
            body={capabilities.body}
          />
          <div className="mt-16 grid border-y border-white/10 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className={`group py-9 lg:px-8 ${i > 0 ? "border-t border-white/10 lg:border-l lg:border-t-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-subtle">{s.index}</span>
                  <ArrowUpRight
                    className="text-subtle transition group-hover:text-signal"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-14 text-3xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-5 leading-7 text-muted-foreground">{s.short}</p>
                <p className="mt-9 text-sm text-soft">{s.outcome}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <DemoStrip type="site" />
            <DemoStrip type="automation" />
            <DemoStrip type="system" />
          </div>
        </div>
      </section>

      <Governance />

      <GaspLabClients />

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="eyebrow">Cases e produtos</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {cases.map((item, i) => (
              <Link
                href={`/cases/${item.slug}`}
                key={item.slug}
                className="group panel min-h-[430px] rounded-[2rem] p-7 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{item.kind}</span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <div className="mt-24">
                  <h3 className="text-5xl font-semibold tracking-[-.05em]">{item.title}</h3>
                  <p className="mt-5 max-w-lg text-lg leading-7 text-muted-foreground">
                    {item.summary}
                  </p>
                  <div className="mt-9 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/20 px-3 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-paper px-5 py-20 text-background sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/vinicius-gasparello-hd.jpg"
              width={1920}
              height={2560}
              sizes="(min-width: 1024px) 40vw, 90vw"
              alt="Retrato de Vinícius Gasparello, fundador da GaspLab"
              quality={90}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full bg-background/80 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-signal backdrop-blur">
              Fundador · Engenheiro de IA
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper-accent">
              {founder.name}
            </p>
            <h2 className="title mt-6">{founder.role}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-paper-muted">{founder.shortBio}</p>
            <blockquote className="mt-10 border-l-2 border-paper-accent pl-6 text-2xl leading-10">
              “{founder.quote}”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-paper-muted">
              {founder.highlights.map((highlight, i) => {
                const Icon = founderHighlightIcons[i];
                return (
                  <span key={highlight} className="flex items-center gap-2">
                    <Icon size={16} aria-hidden="true" /> {highlight}
                  </span>
                );
              })}
            </div>
            <Link
              href="/sobre"
              className="mt-9 inline-flex items-center gap-2 font-semibold text-paper-accent"
            >
              Conheça a trajetória <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Trajectory />

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow={fieldNotes.eyebrow}
            title={fieldNotes.title}
            body={fieldNotes.body}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {instagramReels.map((r, i) => (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={r.href}
                key={r.href}
                className="group panel min-h-72 rounded-[1.6rem] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                    {r.meta}
                  </span>
                  <ArrowUpRight
                    className="text-subtle group-hover:text-signal"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-28">
                  <span className="font-mono text-[10px] text-subtle">REEL / 0{i + 1}</span>
                  <h3 className="mt-4 text-2xl font-medium leading-8">
                    {r.title}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-bg px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">{finalCta.eyebrow}</p>
          <h2 className="title mt-6">{finalCta.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {finalCta.body}
          </p>
          <Link href="/diagnostico" className="mt-10 btn-primary">
            {finalCta.ctaLabel} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
