export function Legal({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">Documento legal</p>
        <h1 className="title mt-7">{title}</h1>
        <p className="mt-5 font-mono text-xs text-[#70757c]">Atualizado em {updated}</p>
        <div className="mt-12 space-y-6 text-base leading-8 text-[#a8adb3] [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white">
          {children}
        </div>
      </article>
    </section>
  );
}
