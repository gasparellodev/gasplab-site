import { Layers, Network, RefreshCw, ScanSearch } from "lucide-react";
import { pillars } from "@/lib/content";

const icons = [ScanSearch, Network, Layers, RefreshCw];

export function Pillars() {
  return (
    <section className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="eyebrow">Os 4 argumentos</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = icons[i];
            return (
              <div key={pillar.title} className="panel rounded-[1.75rem] p-7">
                <Icon className="text-signal" aria-hidden="true" size={22} />
                <span className="mt-8 block font-mono text-[10px] text-subtle">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-medium leading-7">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
