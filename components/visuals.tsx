"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Bot, Database, Network, ScanSearch } from "lucide-react";
import { method } from "@/lib/content";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/** true quando o usuário pediu menos movimento — desliga intervalos e parallax. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function ArchitectureFlow() {
  const [stage, setStage] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setStage((v) => (v + 1) % 5), 1800);
    return () => clearInterval(id);
  }, [reducedMotion]);
  useEffect(() => {
    const el = wrap.current;
    if (!el || reducedMotion) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 14}px`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [reducedMotion]);
  const steps = method.steps.map((s) => s.name);
  return (
    <div
      ref={wrap}
      className="blue-glow panel relative min-h-[510px] overflow-hidden rounded-[2rem] p-5 sm:p-7"
    >
      <div className="absolute inset-x-0 top-1/2 h-px overflow-hidden">
        <div className="scanline h-px w-1/2" />
      </div>
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.14em] text-subtle">
        <span>Arquitetura / ao vivo</span>
        <span className="flex items-center gap-2">
          <i aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-primary" />
          Sinal ativo
        </span>
      </div>
      <div
        className="relative z-10 mt-12 grid grid-cols-[1fr_auto_1fr] items-center gap-3"
        style={{
          transform: "translate3d(var(--mx,0),var(--my,0),0)",
          transition: "transform .3s ease-out",
        }}
      >
        <div className="space-y-3">
          {["Dados dispersos", "Processo manual", "Ferramentas isoladas"].map((x, i) => (
            <div
              key={x}
              className={`rounded-xl border p-3 text-xs transition-all ${stage >= i ? "border-primary/50 bg-primary/10 text-white" : "border-white/10 text-subtle"}`}
            >
              {x}
            </div>
          ))}
        </div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/40 bg-deep shadow-[0_0_70px_color-mix(in_srgb,var(--glow)_20%,transparent)]">
          <div
            aria-hidden="true"
            className="absolute inset-3 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-signal/35"
          />
          <Network className="h-8 w-8 text-signal" aria-hidden="true" />
          <span className="absolute -bottom-7 font-mono text-[9px] uppercase tracking-wider text-signal">
            Arquitetura GaspLab
          </span>
        </div>
        <div className="space-y-3">
          {["IA aplicada", "Fluxo conectado", "Decisão visível"].map((x, i) => (
            <div
              key={x}
              className={`rounded-xl border p-3 text-xs transition-all ${stage >= i + 2 ? "border-signal/50 bg-signal/10 text-white" : "border-white/10 text-subtle"}`}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-20 grid grid-cols-5 gap-1">
        {steps.map((x, i) => (
          <button
            key={x}
            type="button"
            onClick={() => setStage(i)}
            aria-pressed={i === stage}
            aria-label={`Ver etapa ${x}`}
            className="text-left"
          >
            <span
              aria-hidden="true"
              className={`block h-1 rounded-full transition-all ${i <= stage ? "bg-primary" : "bg-white/10"}`}
            />
            <span
              className={`mt-2 hidden font-mono text-[8px] uppercase sm:block ${i === stage ? "text-signal" : "text-subtle"}`}
            >
              {x}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProcessLab() {
  const [mode, setMode] = useState(0);
  const modes = [
    { label: "Entrada", icon: ScanSearch, text: "Mapeamos o cenário real" },
    { label: "Arquitetura", icon: Database, text: "Organizamos dados e decisões" },
    { label: "Operação", icon: Bot, text: "Integramos IA com supervisão" },
  ];
  return (
    <div className="panel overflow-hidden rounded-[2rem]">
      <div className="grid sm:grid-cols-3">
        {modes.map((m, i) => {
          const Icon = m.icon;
          return (
            <button
              type="button"
              onClick={() => setMode(i)}
              key={m.label}
              aria-pressed={mode === i}
              className={`border-b border-white/10 p-6 text-left transition sm:border-b-0 ${i > 0 ? "sm:border-l" : ""} ${mode === i ? "bg-primary/10" : ""}`}
            >
              <Icon className={mode === i ? "text-signal" : "text-subtle"} aria-hidden="true" />
              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-subtle">
                0{i + 1} / {m.label}
              </p>
              <p className="mt-3 text-lg">{m.text}</p>
            </button>
          );
        })}
      </div>
      <div className="grid-bg relative min-h-56 border-t border-white/10 p-7" aria-hidden="true">
        <div className="absolute inset-y-0 left-[20%] w-px bg-primary/30" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-primary/30" />
        <div className="absolute inset-y-0 left-[80%] w-px bg-primary/30" />
        <div className="relative flex h-full items-center justify-center">
          <div className="rounded-full border border-signal/50 bg-deep px-6 py-3 font-mono text-xs text-signal">
            {modes[mode].label.toUpperCase()}&nbsp;· ATIVO
          </div>
        </div>
      </div>
    </div>
  );
}
