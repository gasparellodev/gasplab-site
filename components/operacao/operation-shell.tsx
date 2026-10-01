"use client";

import { createContext, use, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  ChartNoAxesCombined,
  CheckSquare2,
  ChevronsUpDown,
  Compass,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  UsersRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { operationFetch } from "@/components/operacao/api";
import { ErrorState } from "@/components/operacao/page-ui";
import type { SessionData } from "@/components/operacao/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const SessionContext = createContext<SessionData | null>(null);

export function useOperationSession() {
  return use(SessionContext);
}

const primaryNavigation = [
  { href: "/operacao", label: "Meu dia", icon: LayoutDashboard },
  { href: "/operacao/prospeccao", label: "Prospecção", icon: Compass },
  { href: "/operacao/crm", label: "CRM", icon: UsersRound },
  { href: "/operacao/conversas", label: "Conversas", icon: MessageCircle },
  { href: "/operacao/tarefas", label: "Tarefas e previews", icon: CheckSquare2 },
  { href: "/operacao/gaspar", label: "Gaspar", icon: Bot },
  { href: "/operacao/gestao", label: "Gestão", icon: ChartNoAxesCombined },
] as const;

function Brand() {
  return (
    <Link href="/operacao" className="flex items-center gap-3 rounded-md p-2 focus-visible:ring-2 focus-visible:ring-ring">
      <svg viewBox="0 0 36 36" className="size-8 shrink-0" aria-hidden="true">
        <path d="M4 4h20v7H11v14h14v-5h-7v-6h14v18H4z" className="fill-primary" />
        <path d="M25 4h7v7h-7z" className="fill-signal" />
      </svg>
      <span className="min-w-0 group-data-[collapsible=icon]:hidden">
        <span className="block font-semibold tracking-[-0.04em]">GaspLab</span>
        <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-subtle">Operação comercial</span>
      </span>
    </Link>
  );
}

function ShellLoading() {
  return (
    <div className="flex min-h-svh bg-background">
      <aside className="hidden w-64 border-r border-primary/15 bg-sunken p-4 md:block">
        <Skeleton className="h-12 w-40" />
        <div className="mt-10 space-y-3">
          {Array.from({ length: 7 }, (_, index) => <Skeleton key={index} className="h-9 w-full" />)}
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} className="h-36" />)}
        </div>
      </main>
    </div>
  );
}

export function OperationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    operationFetch<SessionData>("/api/operacao/session", { cache: "no-store" })
      .then((value) => {
        if (active) setSession(value);
      })
      .catch((cause) => {
        if (!active) return;
        if (cause instanceof Error && /autentic|sessão|session/i.test(cause.message)) {
          router.replace("/login?redirect=/operacao");
          return;
        }
        setError(cause instanceof Error ? cause.message : "Não foi possível validar sua sessão.");
      });
    return () => {
      active = false;
    };
  }, [router]);

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  if (error) {
    return (
      <main className="grid min-h-svh place-items-center p-6">
        <div className="w-full max-w-xl">
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </main>
    );
  }

  if (!session) return <ShellLoading />;

  const navigation = session.member.role === "admin"
    ? [...primaryNavigation, { href: "/operacao/configuracoes", label: "Configurações", icon: Settings }]
    : primaryNavigation;

  return (
    <SessionContext value={session}>
      <a href="#conteudo-principal" className="sr-only z-50 rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:ring-2 focus-visible:ring-ring">
        Pular para o conteúdo
      </a>
      <SidebarProvider>
        <Sidebar collapsible="icon" variant="inset" className="border-primary/15">
          <SidebarHeader className="p-3">
            <Brand />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest">Navegação</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const active = item.href === "/operacao"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={active} tooltip={item.label} size="lg">
                          <Link href={item.href}>
                            <Icon aria-hidden="true" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-3">
            <div className="rounded-lg border border-primary/15 bg-raised/50 p-2 group-data-[collapsible=icon]:p-0">
              <div className="flex items-center gap-2">
                <div className="grid size-8 shrink-0 place-items-center rounded-md bg-action font-mono text-xs font-semibold text-action-foreground">
                  {session.member.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-xs font-medium">{session.member.fullName}</p>
                  <p className="truncate text-[10px] text-subtle">{session.member.role === "admin" ? "Administrador" : "Comercial"}</p>
                </div>
                <ChevronsUpDown className="size-3 text-subtle group-data-[collapsible=icon]:hidden" aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={signOut}
                className="mt-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground group-data-[collapsible=icon]:mt-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <LogOut className="size-3.5" aria-hidden="true" />
                <span className="group-data-[collapsible=icon]:hidden">Sair</span>
              </button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-h-svh overflow-x-hidden">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-primary/15 bg-background/90 px-4 backdrop-blur-xl md:px-6">
            <SidebarTrigger className="size-9" />
            <div className="h-4 w-px bg-primary/20" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
              {session.member.role === "admin" ? "Visão da operação" : "Minha operação"}
            </p>
            {!session.integrations.whatsapp ? (
              <span className="ml-auto rounded-full border border-warning/30 bg-warning/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-warning">
                WhatsApp não sincronizado
              </span>
            ) : null}
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SessionContext>
  );
}

