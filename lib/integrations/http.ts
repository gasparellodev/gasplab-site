import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "UNAVAILABLE"
  | "INTERNAL_ERROR";

export function dataResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: unknown,
) {
  return NextResponse.json(
    { error: { code, message, ...(details === undefined ? {} : { details }) } },
    { status },
  );
}

export function routeError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.code, error.message, error.status, error.details);
  }

  if (error instanceof ZodError) {
    return errorResponse(
      "BAD_REQUEST",
      "Os dados enviados são inválidos.",
      400,
      error.flatten(),
    );
  }

  console.error("[operacao-api]", error);
  return errorResponse(
    "INTERNAL_ERROR",
    "Não foi possível concluir a solicitação.",
    500,
  );
}

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError("BAD_REQUEST", "O corpo deve ser um JSON válido.", 400);
  }
}
