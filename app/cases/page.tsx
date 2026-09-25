import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell, SectionHead } from "@/components/site-shell";
import { cases } from "@/lib/content";
export const metadata = {
  title: "Cases",
  description: "Produtos e soluções desenvolvidos pela GaspLab.",
};
export default function Cases() {
  return (
    <PageShell>
      <section className="grid-bg px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <SectionHead
            level={1}
            eyebrow="Cases e produtos"
            title="Tecnologia aplicada a problemas que pedem movimento."
            body="Os resultados publicados aqui respeitam uma regra simples: só entram quando existe evidência verificável."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {cases.map((item, i) => (
              <Link
                key={item.slug}
                href={`/cases/${item.slug}`}
                className="panel group min-h-[480px] rounded-[2rem] p-8"
              >
                <div className="flex justify-between">
                  <span className="eyebrow">{item.kind}</span>
                  <ArrowUpRight className="text-subtle group-hover:text-signal" aria-hidden="true" />
                </div>
                <div className="mt-36">
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  <h2 className="mt-5 text-6xl font-semibold tracking-[-.06em]">{item.title}</h2>
                  <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
