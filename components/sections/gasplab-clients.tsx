import { clients } from "@/lib/content";

export function GaspLabClients() {
  const { eyebrow, title, body, brands } = clients.gasplab;
  return (
    <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-.04em] sm:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{body}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex min-w-48 items-center justify-center rounded-xl border border-primary/20 bg-card px-7 py-5 text-lg font-semibold tracking-tight text-soft"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
