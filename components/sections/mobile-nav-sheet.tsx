"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { TrackedLink } from "@/components/sections/tracked-link";
import { whatsappUrl } from "@/lib/content";

const navLinks = [
  { href: "/#metodo", label: "Método" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
];

/** Conteúdo do menu mobile — carregado só no primeiro toque (ver mobile-nav.tsx). */
export function MobileNavSheet({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const setOpen = onOpenChange;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
        side="right"
        className="border-primary/15 bg-background px-6 py-6"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-lg font-semibold tracking-[-.03em]">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1 text-lg" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-soft hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
          <Link href="/diagnostico" onClick={() => setOpen(false)} className="btn-primary">
            Diagnóstico <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click"
            eventProps={{ origem: "header_mobile" }}
            onClick={() => setOpen(false)}
            className="btn-secondary"
          >
            WhatsApp
          </TrackedLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
