"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  event?: AnalyticsEvent;
  eventProps?: AnalyticsProps;
};

/**
 * Link com tracking opcional (sem PII) e, para links externos, abertura em
 * nova aba com aviso acessível ("abre em nova aba") lido por leitores de tela.
 */
export function TrackedLink({
  href,
  children,
  event,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
  const isHttp = /^https?:\/\//.test(href);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (event) track(event, eventProps);
    onClick?.(e);
  }

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
        {isHttp && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
