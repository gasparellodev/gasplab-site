import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Braces,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { PageShell, SectionHead } from "@/components/site-shell";
import { ArchitectureFlow, DemoStrip, ProcessLab } from "@/components/visuals";
import { cases, clientBrands, instagramReels, services } from "@/lib/content";

const frictions = [
  "Dados espalhados",
  "Atendimento manual",
  "Retrabalho entre ferramentas",
  "IA sem adoção",
];
const method = ["Entender", "Mapear", "Arquitetar", "Integrar", "Evoluir"];

export default function Home() {
  return (
    <PageShell>
      <section className="grid-bg relative overflow-hidden border-b border-[#4d7cff]/15 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute -left-60 top-0 h-[650px] w-[650px] rounded-full bg-[#2456ff]/12 blur-[140px]" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <p className="eyebrow">Engenharia de software + inteligência artificial</p>
            <h1 className="display mt-7">
              Engenharia para a <span className="text-[#70e1ff]">IA funcionar</span> no seu negócio.
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-9 text-[#a8b3c7]">
              A GaspLab entende sua operação, mapeia processos e desenha a arquitetura antes de
              integrar automação, software e inteligência artificial.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/diagnostico"
                className="inline-flex items-center gap-2 rounded-full bg-[#4d7cff] px-6 py-3 font-semibold text-white transition hover:bg-[#70e1ff] hover:text-[#070a12]"
              >
                Começar diagnóstico <ArrowUpRight size={17} />
              </Link>
              <a
                href="#metodo"
                className="inline-flex items-center gap-2 rounded-full border border-[#4d7cff]/30 px-6 py-3 font-medium hover:border-[#70e1ff]"
              >
                Ver como trabalhamos <ArrowRight size={17} />
              </a>
            </div>
            <p className="mt-7 font-mono text-[10px] uppercase tracking-[.14em] text-[#64708a]">
              Contexto → processo → arquitetura → inteligência aplicada
            </p>
          </div>
          <ArchitectureFlow />
        </div>
      </section>

      <section className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">O problema real</p>
            <h2 className="title mt-6">
              IA sem arquitetura vira mais uma ferramenta desconectada.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#a8b3c7]">
              Antes de automatizar, é preciso entender pessoas, dados, decisões e exceções. É aí que
              a GaspLab começa.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2">
            {frictions.map((x, i) => (
              <div key={x} className="bg-[#090d19] p-7">
                <span className="font-mono text-xs text-[#4d7cff]">0{i + 1}</span>
                <p className="mt-12 text-2xl font-medium">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow="Método GaspLab"
            title="Entendemos o sistema antes de construir a solução."
            body="Cada etapa reduz incerteza, protege a operação e transforma IA em capacidade real — não em experimento isolado."
          />
          <div className="mt-14">
            <ProcessLab />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {method.map((x, i) => (
              <div key={x} className="border-l border-[#4d7cff]/30 pl-4">
                <span className="font-mono text-[10px] text-[#65708a]">0{i + 1}</span>
                <p className="mt-3 text-lg">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#4d7cff]/15 bg-[#090d19] px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow="Capacidades"
            title="A arquitetura é uma. As entregas se conectam."
            body="Sites, automações e sistemas não são produtos isolados. São camadas de uma operação que precisa funcionar em conjunto."
          />
          <div className="mt-16 grid border-y border-white/10 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className={`group py-9 lg:px-8 ${i > 0 ? "border-t border-white/10 lg:border-l lg:border-t-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#65708a]">{s.index}</span>
                  <ArrowUpRight className="text-[#65708a] transition group-hover:text-[#70e1ff]" />
                </div>
                <h3 className="mt-14 text-3xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-5 leading-7 text-[#929db2]">{s.short}</p>
                <p className="mt-9 text-sm text-[#d6dce8]">{s.outcome}</p>
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

      <section className="overflow-hidden border-b border-white/10 py-20">
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <p className="eyebrow">Clientes, projetos e parceiros</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-.04em] sm:text-6xl">
              Experiência aplicada em contextos que exigem confiança.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#8f9ab0]">
              Projetos e atuações conduzidos pela GaspLab e por Vinícius Gasparello como prestador
              de serviço e liderança técnica.
            </p>
          </div>
        </div>
        <div className="mt-14 flex overflow-hidden border-y border-white/10 py-7">
          <div className="marquee-track flex gap-3 pr-3">
            {[...clientBrands, ...clientBrands].map((x, i) => (
              <div
                key={`${x}-${i}`}
                className="flex min-w-48 items-center justify-center rounded-xl border border-[#4d7cff]/20 bg-[#0e1424] px-7 py-5 text-lg font-semibold tracking-tight text-[#dce8ff]"
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow="Cases e produtos"
            title="Arquitetura que sai do diagrama e entra na operação."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {cases.map((item, i) => (
              <Link
                href={`/cases/${item.slug}`}
                key={item.slug}
                className="group panel min-h-[430px] rounded-[2rem] p-7 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{item.kind}</span>
                  <span className="font-mono text-xs text-[#65708a]">0{i + 1}</span>
                </div>
                <div className="mt-24">
                  <h3 className="text-5xl font-semibold tracking-[-.05em]">{item.title}</h3>
                  <p className="mt-5 max-w-lg text-lg leading-7 text-[#929db2]">{item.summary}</p>
                  <div className="mt-9 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#4d7cff]/20 px-3 py-1 font-mono text-[10px] text-[#a8b3c7]"
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

      <section className="border-y border-white/10 bg-[#eaf3ff] px-5 py-20 text-[#070a12] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src="/vinicius-gasparello.jpg"
              width={640}
              height={640}
              alt="Vinícius Gasparello, fundador da GaspLab"
              className="aspect-[4/5] w-full object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071536]/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full bg-[#070a12]/80 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[#70e1ff] backdrop-blur">
              Founder / AI engineer
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#2f6bff]">
              Vinícius Gasparello
            </p>
            <h2 className="title mt-6">Engenharia próxima. Visão de negócio.</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#43516b]">
              Fundador da GaspLab, engenheiro de software e IA com nove anos de experiência em
              arquitetura, produtos digitais, automação e liderança técnica.
            </p>
            <blockquote className="mt-10 border-l-2 border-[#2f6bff] pl-6 text-2xl leading-10">
              “A melhor solução de IA não é a mais impressionante. É a que o time consegue usar e o
              negócio consegue evoluir.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#43516b]">
              <span className="flex items-center gap-2">
                <Braces size={16} /> Software
              </span>
              <span className="flex items-center gap-2">
                <BrainCircuit size={16} /> IA aplicada
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} /> Arquitetura responsável
              </span>
            </div>
            <Link
              href="/sobre"
              className="mt-9 inline-flex items-center gap-2 font-semibold text-[#1f58df]"
            >
              Conheça a trajetória <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            eyebrow="Notas de campo"
            title="IA e automação explicadas por quem constrói."
            body="Vídeos do Instagram da GaspLab sobre ferramentas, processos e decisões de engenharia."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {instagramReels.map((r, i) => (
              <a
                target="_blank"
                rel="noreferrer"
                href={r.href}
                key={r.href}
                className="group panel min-h-72 rounded-[1.6rem] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#70e1ff]">
                    {r.meta}
                  </span>
                  <ArrowUpRight className="text-[#65708a] group-hover:text-[#70e1ff]" />
                </div>
                <div className="mt-28">
                  <span className="font-mono text-[10px] text-[#65708a]">REEL / 0{i + 1}</span>
                  <h3 className="mt-4 text-2xl font-medium leading-8">{r.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-bg px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Diagnóstico de prontidão</p>
          <h2 className="title mt-6">A IA precisa caber no seu negócio — não o contrário.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#a8b3c7]">
            Vamos entender o cenário, localizar os pontos de alavancagem e desenhar o próximo passo
            com clareza.
          </p>
          <Link
            href="/diagnostico"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#4d7cff] px-7 py-3.5 font-semibold text-white hover:bg-[#70e1ff] hover:text-[#070a12]"
          >
            Começar diagnóstico <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
