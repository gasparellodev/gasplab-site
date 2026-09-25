import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { MobileNav } from "@/components/sections/mobile-nav";
import { TrackedLink } from "@/components/sections/tracked-link";
import { services, whatsappUrl } from "@/lib/content";

const founderLinkedInUrl = "https://www.linkedin.com/in/vinicius-henrique-5b8a35173/";
const instagramUrl = "https://www.instagram.com/gasplab/";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="GaspLab — início">
      <svg viewBox="0 0 36 36" className="h-8 w-8" aria-hidden="true">
        <path d="M4 4h20v7H11v14h14v-5h-7v-6h14v18H4z" className="fill-primary" />
        <path d="M25 4h7v7h-7z" className="fill-signal" />
      </svg>
      {!compact && <span className="text-lg font-semibold tracking-[-.04em]">GaspLab</span>}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <BrandMark />
        <nav
          className="hidden items-center gap-7 text-sm text-muted-foreground md:flex"
          aria-label="Principal"
        >
          <Link href="/#metodo" className="hover:text-white">
            Método
          </Link>
          <Link href="/#oferta" className="hover:text-white">
            Oferta
          </Link>
          <Link href="/cases" className="hover:text-white">
            Cases
          </Link>
          <Link href="/sobre" className="hover:text-white">
            Sobre
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            eventProps={{ origem: "header" }}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary/25 text-muted-foreground hover:text-white sm:inline-flex"
          >
            <MessageCircle size={17} aria-hidden="true" />
            <span className="sr-only">Falar no WhatsApp</span>
          </TrackedLink>
          <Link href="/diagnostico" className="btn-primary px-4 py-2 text-sm">
            Diagnóstico <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <MobileNav />
        </div>
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
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
            Engenharia de software e inteligência artificial para operações que precisam evoluir.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-4">Capacidades</p>
          {services.map((s) => (
            <Link
              key={s.slug}
              className="block text-muted-foreground hover:text-white"
              href={`/servicos/${s.slug}`}
            >
              {s.title}
            </Link>
          ))}
          <Link className="block text-muted-foreground hover:text-white" href="/cases">
            Cases
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow mb-4">Contato</p>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            eventProps={{ origem: "footer" }}
            className="block text-muted-foreground hover:text-white"
          >
            WhatsApp
          </TrackedLink>
          <a className="block text-muted-foreground hover:text-white" href="mailto:vinicius@gasplab.com">
            vinicius@gasplab.com
          </a>
          <TrackedLink
            href={instagramUrl}
            className="block text-muted-foreground hover:text-white"
          >
            Instagram @gasplab
          </TrackedLink>
          <TrackedLink
            href={founderLinkedInUrl}
            className="block text-muted-foreground hover:text-white"
          >
            LinkedIn do fundador
          </TrackedLink>
          <div className="flex gap-4 pt-4 text-xs text-subtle">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] justify-between border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-subtle">
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
  level = 2,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  /** Nível do heading — use 1 quando esta é a única/principal seção da página. */
  level?: 1 | 2;
}) {
  const Heading: ElementType = level === 1 ? "h1" : "h2";
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <Heading className={level === 1 ? "display mt-5" : "title mt-5"}>{title}</Heading>
      {body && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{body}</p>}
    </div>
  );
}
