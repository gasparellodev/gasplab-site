"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Dispara o evento case_view (sem PII) quando a página de um case é aberta. */
export function CaseViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("case_view", { slug });
  }, [slug]);
  return null;
}
