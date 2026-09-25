import { clients } from "@/lib/content";

/**
 * Lista compacta e discreta da trajetória pessoal do fundador — nunca em
 * grade de "logos de clientes" (ver docs/CONTEXTO.md: nunca chamar de
 * clientes da GaspLab).
 */
export function Trajectory() {
  const { eyebrow, title, body, items } = clients.trajectory;
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-subtle">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-medium leading-8 text-soft">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-subtle">{body}</p>
        <ul className="mt-8 flex max-w-3xl flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {items.map((item) => (
            <li key={item.name} className="text-sm text-subtle">
              <span className="text-soft">{item.name}</span>
              <span aria-hidden="true"> · </span>
              <span className="sr-only"> — </span>
              {item.relation}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
