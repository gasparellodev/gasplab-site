"use client";

import { useCallback, useEffect, useState } from "react";
import type { ApiError } from "@/components/operacao/types";

type ApiEnvelope<T> = { data: T } | { error: ApiError };

export class OperationApiError extends Error {
  code?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "OperationApiError";
    this.code = error.code;
  }
}

export async function operationFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const payload = (await response.json().catch(() => ({
    error: { message: "A resposta do servidor não pôde ser lida." },
  }))) as ApiEnvelope<T>;

  if (!response.ok || "error" in payload) {
    const fallback = { message: "Não foi possível concluir esta ação." };
    throw new OperationApiError("error" in payload ? payload.error : fallback);
  }

  return payload.data;
}

export function useOperationQuery<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await operationFetch<T>(path, { cache: "no-store" }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    let active = true;
    operationFetch<T>(path, { cache: "no-store" })
      .then((value) => {
        if (active) setData(value);
      })
      .catch((cause) => {
        if (active) setError(cause instanceof Error ? cause.message : "Não foi possível carregar os dados.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [path]);

  return { data, error, loading, refresh, setData };
}

