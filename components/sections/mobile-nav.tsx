"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

// O Sheet (Radix Dialog) só é baixado quando o menu é aberto pela primeira vez.
const MobileNavSheet = dynamic(
  () => import("@/components/sections/mobile-nav-sheet").then((m) => m.MobileNavSheet),
  { ssr: false },
);

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 text-foreground md:hidden"
      >
        <Menu aria-hidden="true" size={19} />
      </button>
      {loaded && <MobileNavSheet open={open} onOpenChange={setOpen} returnFocusTo={triggerRef} />}
    </>
  );
}
