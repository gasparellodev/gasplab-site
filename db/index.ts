import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Retorna o client Drizzle/Neon, ou `null` quando `DATABASE_URL` não está
 * configurada. Lazy: nunca lança no import, só quando chamada sem a env var.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return drizzle(neon(url), { schema });
}
