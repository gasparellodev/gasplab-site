import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { DemoStrip } from "@/components/visuals";
import { serviceDetails, services, type ServiceSlug } from "@/lib/content";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = services.find((s) => s.slug === slug);
  return item ? { title: item.title, description: item.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const d = serviceDetails[slug as ServiceSlug];
  if (!service || !d) notFound();
  return (
    <PageShell>
      <section className="grid-bg border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow">Serviço / {service.index}</p>
          <h1 className="display mt-8 max-w-6xl">{d.promise}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-muted-foreground">{d.intro}</p>
          <Link href={`/diagnostico?interesse=${slug}`} className="mt-10 btn-primary">
            Conversar sobre este desafio <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">A experiência</p>
            <div className="mt-8">
              <DemoStrip type={d.demo} />
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Faz sentido quando</p>
              <ul className="mt-7 space-y-5">
                {d.fits.map((x) => (
                  <li className="flex gap-3 text-soft" key={x}>
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-signal" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">O que conectamos</p>
              <ul className="mt-7 space-y-5">
                {d.deliver.map((x) => (
                  <li className="flex gap-3 text-soft" key={x}>
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 px-5 py-24 text-center sm:px-8">
        <p className="eyebrow">Diagnóstico</p>
        <h2 className="title mx-auto mt-6 max-w-4xl">
          Antes de construir, clareza sobre o que precisa funcionar.
        </h2>
        <Link href={`/diagnostico?interesse=${slug}`} className="mt-9 btn-primary">
          Começar agora <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </PageShell>
  );
}
