import { Activity, Lock, RotateCcw, UserCheck } from "lucide-react";
import { SectionHead } from "@/components/site-shell";
import { governance } from "@/lib/content";

const icons = [UserCheck, RotateCcw, Lock, Activity];

export function Governance() {
  return (
    <section className="border-y border-primary/15 bg-sunken px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <SectionHead eyebrow={governance.eyebrow} title={governance.title} body={governance.body} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {governance.points.map((point, i) => {
            const Icon = icons[i];
            return (
              <div key={point.title} className="bg-background p-7">
                <Icon className="text-primary" aria-hidden="true" size={20} />
                <h3 className="mt-8 text-lg font-medium leading-6">{point.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{point.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
