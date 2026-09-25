import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { whatsappUrl } from "@/lib/content";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="GaspLab — início">
      <svg viewBox="0 0 36 36" className="h-8 w-8" aria-hidden="true">
        <path d="M4 4h20v7H11v14h14v-5h-7v-6h14v18H4z" fill="#4D7CFF" />
        <path d="M25 4h7v7h-7z" fill="#70E1FF" />
      </svg>
      {!compact && <span className="text-lg font-semibold tracking-[-.04em]">GaspLab</span>}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#4d7cff]/15 bg-[#070a12]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <BrandMark />
        <nav
          className="hidden items-center gap-7 text-sm text-[#b9bdc1] md:flex"
          aria-label="Principal"
        >
          <Link href="/servicos/sites" className="hover:text-white">
            Serviços
          </Link>
          <Link href="/cases" className="hover:text-white">
            Cases
          </Link>
          <Link href="/sobre" className="hover:text-white">
            Sobre
          </Link>
        </nav>
        <Link
          href="/diagnostico"
          className="inline-flex items-center gap-2 rounded-full bg-[#4d7cff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#70e1ff] hover:text-[#070a12]"
        >
          Diagnóstico <ArrowUpRight size={15} />
        </Link>
        <Menu className="hidden" aria-hidden="true" />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#92989f]">
            Engenharia de software e inteligência artificial para operações que precisam evoluir.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-4">Explorar</p>
          <Link className="block text-[#b9bdc1] hover:text-white" href="/servicos/sites">
            Sites
          </Link>
          <Link className="block text-[#b9bdc1] hover:text-white" href="/servicos/automacoes">
            Automações
          </Link>
          <Link className="block text-[#b9bdc1] hover:text-white" href="/servicos/sistemas">
            Sistemas
          </Link>
          <Link className="block text-[#b9bdc1] hover:text-white" href="/cases">
            Cases
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-4">Contato</p>
          <a className="block text-[#b9bdc1] hover:text-white" href={whatsappUrl}>
            WhatsApp
          </a>
          <a className="block text-[#b9bdc1] hover:text-white" href="mailto:vinicius@gasplab.com">
            vinicius@gasplab.com
          </a>
          <div className="flex gap-4 pt-4 text-xs text-[#70757c]">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] justify-between border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-[#70757c]">
        <span>© 2026 GaspLab</span>
        <span>São Paulo · Brasil</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
export function SectionHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="title mt-5">{title}</h2>
      {body && <p className="mt-6 max-w-2xl text-lg leading-8 text-[#a8adb3]">{body}</p>}
    </div>
  );
}
