import { Bot, Check, MousePointer2, Workflow } from "lucide-react";

/** Mini demos ilustrativas das capacidades — componente de servidor (sem estado). */
export function DemoStrip({ type }: { type: "site" | "automation" | "system" }) {
  if (type === "site")
    return (
      <div className="panel rounded-[1.6rem] p-5">
        <div className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-danger" />
          <i className="h-2 w-2 rounded-full bg-warning" />
          <i className="h-2 w-2 rounded-full bg-primary" />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <span className="eyebrow">Narrativa</span>
            <p className="mt-3 text-2xl font-medium">Clareza que conduz à ação.</p>
            <button type="button" className="mt-8 btn-primary px-4 py-2 text-xs">
              Quero avançar
            </button>
          </div>
          <div
            className="grid-bg min-h-40 rounded-xl border border-white/10 p-4"
            aria-hidden="true"
          >
            <MousePointer2 className="ml-auto text-signal" />
          </div>
        </div>
      </div>
    );
  if (type === "automation")
    return (
      <div className="panel rounded-[1.6rem] p-5">
        <div className="flex items-center gap-2 text-sm">
          <Workflow size={17} className="text-signal" aria-hidden="true" /> Fluxo em execução
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Entrada recebida", "IA classifica", "Time supervisiona"].map((x, i) => (
            <div key={x} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                {i < 2 ? (
                  <Bot size={14} className="text-primary" aria-hidden="true" />
                ) : (
                  <Check size={14} className="text-signal" aria-hidden="true" />
                )}
              </div>
              <p className="mt-8 text-sm">{x}</p>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className="panel rounded-[1.6rem] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm">Painel operacional</p>
        <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[9px] text-signal">
          SINCRONIZADO
        </span>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 p-5">
          <p className="font-mono text-[10px] text-subtle">PROCESSOS</p>
          <p className="mt-4 text-3xl">Mapeados</p>
        </div>
        <div className="rounded-xl border border-white/10 p-5">
          <p className="font-mono text-[10px] text-subtle">STATUS</p>
          <p className="mt-4 text-3xl text-signal">Ativo</p>
        </div>
      </div>
    </div>
  );
}
