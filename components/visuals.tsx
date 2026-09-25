"use client";

import { useEffect, useState } from "react";
import { Bot, Check, MousePointer2, Sparkles, Workflow } from "lucide-react";

export function OperationsCanvas() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = setInterval(() => setActive((v) => (v + 1) % 3), 1800); return () => clearInterval(id); }, []);
  const items = ["Presença", "Processos", "Produto"];
  return <div className="panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
    <div className="mb-12 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.14em] text-[#70757c]"><span>GaspLab / Operating system</span><span className="flex items-center gap-2"><i className="pulse-dot h-2 w-2 rounded-full bg-[#b8ff3d]"/>Online</span></div>
    <div className="relative grid gap-3 sm:grid-cols-3">
      {items.map((item, i) => <button key={item} onClick={() => setActive(i)} className={`relative rounded-2xl border p-5 text-left transition-all ${active === i ? "border-[#b8ff3d]/60 bg-[#b8ff3d]/8" : "border-white/10 bg-black/15"}`}>
        <span className="font-mono text-[10px] text-[#70757c]">0{i + 1}</span><p className="mt-7 text-lg font-medium">{item}</p><div className={`mt-4 h-1 rounded-full ${active === i ? "bg-[#b8ff3d]" : "bg-white/10"}`}/>
      </button>)}
    </div>
    <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0b0d] p-4"><div className="h-2 rounded bg-white/10"/><Sparkles size={15} className="text-[#6c8cff]"/><div className="h-2 rounded bg-[#b8ff3d]/60"/></div>
  </div>;
}

export function DemoStrip({ type }: { type: "site" | "automation" | "system" }) {
  if (type === "site") return <div className="panel rounded-[1.6rem] p-5"><div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ff665c]"/><i className="h-2 w-2 rounded-full bg-[#eacb5a]"/><i className="h-2 w-2 rounded-full bg-[#67d88f]"/></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><div><span className="eyebrow">Narrativa</span><p className="mt-3 text-2xl font-medium">Clareza que conduz à ação.</p><button className="mt-8 rounded-full bg-[#b8ff3d] px-4 py-2 text-xs font-semibold text-black">Quero avançar</button></div><div className="grid-bg min-h-40 rounded-xl border border-white/10 p-4"><MousePointer2 className="ml-auto text-[#b8ff3d]"/></div></div></div>;
  if (type === "automation") return <div className="panel rounded-[1.6rem] p-5"><div className="flex items-center gap-2 text-sm"><Workflow size={17} className="text-[#b8ff3d]"/> Fluxo em execução</div><div className="mt-7 grid gap-3 sm:grid-cols-3">{["Entrada recebida", "IA classifica", "Time acionado"].map((x,i)=><div key={x} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[#70757c]">0{i+1}</span>{i<2?<Bot size={14} className="text-[#6c8cff]"/>:<Check size={14} className="text-[#b8ff3d]"/>}</div><p className="mt-8 text-sm">{x}</p></div>)}</div></div>;
  return <div className="panel rounded-[1.6rem] p-5"><div className="flex items-center justify-between"><p className="text-sm">Painel operacional</p><span className="rounded-full bg-[#b8ff3d]/10 px-3 py-1 font-mono text-[9px] text-[#b8ff3d]">SINCRONIZADO</span></div><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 p-5"><p className="font-mono text-[10px] text-[#70757c]">PROCESSOS</p><p className="mt-4 text-3xl">24</p></div><div className="rounded-xl border border-white/10 p-5"><p className="font-mono text-[10px] text-[#70757c]">STATUS</p><p className="mt-4 text-3xl text-[#b8ff3d]">Ativo</p></div></div></div>;
}
