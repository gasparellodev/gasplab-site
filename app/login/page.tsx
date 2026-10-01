import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/operacao/login-form";

export const metadata: Metadata = { title: "Acesso à operação" };

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-background grid-bg px-4 py-10">
      <div className="blue-glow fixed inset-0 pointer-events-none" aria-hidden="true" />
      <Suspense fallback={<div className="panel h-[520px] w-full max-w-md animate-pulse rounded-2xl" />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

