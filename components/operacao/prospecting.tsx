"use client";

import { useState } from "react";
import { Building2, Loader2, MapPin, Plus, Search, ShieldCheck } from "lucide-react";
import { operationFetch } from "@/components/operacao/api";
import { EmptyState, OperationPage, PageHeading, StatusPill } from "@/components/operacao/page-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PlaceResult = {
  placeId: string;
  displayName: string;
  formattedAddress?: string;
  primaryType?: string;
  nationalPhoneNumber?: string | null;
  websiteUri?: string | null;
  alreadyLinked?: boolean;
};

type PlacesResponse = { items: PlaceResult[]; attribution?: string };

export function ProspectingPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<PlaceResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const params = new URLSearchParams({ q: query.trim(), location: location.trim() });
      const response = await operationFetch<PlacesResponse>(`/api/operacao/places/search?${params}`);
      setResults(response.items);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "A pesquisa não pôde ser concluída.");
    } finally {
      setLoading(false);
    }
  }

  async function addReference(place: PlaceResult) {
    setAdding(place.placeId);
    setError(null);
    try {
      await operationFetch("/api/operacao/leads", {
        method: "POST",
        body: JSON.stringify({ companyName: place.displayName, placeId: place.placeId, source: "google_places" }),
      });
      setResults((current) => current?.map((item) => item.placeId === place.placeId ? { ...item, alreadyLinked: true } : item) ?? null);
      setNotice(`${place.displayName} foi referenciada no CRM. Complete os dados próprios após o primeiro contato.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível adicionar a oportunidade.");
    } finally {
      setAdding(null);
    }
  }

  return (
    <OperationPage>
      <PageHeading eyebrow="Prospecção" title="Encontre a próxima conversa." description="Pesquise empresas por segmento e região. Os resultados são consultados sob demanda e apenas a referência do local é vinculada ao CRM." />

      <Card className="panel">
        <CardContent className="pt-1">
          <form onSubmit={search} className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <div className="space-y-2"><Label htmlFor="segment">Segmento ou empresa</Label><Input id="segment" name="segment" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} required placeholder="Ex.: clínicas odontológicas…" className="h-11 bg-sunken" /></div>
            <div className="space-y-2"><Label htmlFor="location">Região</Label><Input id="location" name="location" autoComplete="off" value={location} onChange={(event) => setLocation(event.target.value)} required placeholder="Ex.: Pinheiros, São Paulo…" className="h-11 bg-sunken" /></div>
            <Button type="submit" className="h-11 bg-action hover:bg-action-hover" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : <Search />} Pesquisar</Button>
          </form>
          <div className="mt-4 flex gap-2 text-xs leading-5 text-subtle"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-signal" /><p>Detalhes do Google não formam um catálogo permanente. Contatos confirmados durante o relacionamento devem ser registrados com sua origem.</p></div>
        </CardContent>
      </Card>

      {error ? <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger" role="alert">{error}</div> : null}
      {notice ? <div className="rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-soft" role="status">{notice}</div> : null}

      {results === null ? (
        <EmptyState title="Comece por uma busca objetiva" description="Combine um segmento com uma região para encontrar empresas relevantes para a abordagem." />
      ) : results.length === 0 ? (
        <EmptyState title="Nenhum resultado encontrado" description="Tente ampliar a região ou usar outro termo para o segmento." />
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Resultados da busca">
          {results.map((place) => (
            <Card key={place.placeId} className="panel gap-4 py-5">
              <CardContent className="space-y-4 px-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-signal"><Building2 className="size-5" /></div>
                  <StatusPill tone={place.alreadyLinked ? "success" : "neutral"}>{place.alreadyLinked ? "No CRM" : place.primaryType ?? "Resultado"}</StatusPill>
                </div>
                <div><h2 className="font-semibold text-soft">{place.displayName}</h2><p className="mt-2 flex gap-2 text-sm leading-5 text-muted-foreground"><MapPin className="mt-0.5 size-4 shrink-0" />{place.formattedAddress ?? "Endereço não informado"}</p></div>
                <Button variant="outline" className="w-full" disabled={place.alreadyLinked || adding === place.placeId} onClick={() => void addReference(place)}>
                  {adding === place.placeId ? <Loader2 className="animate-spin" /> : <Plus />}{place.alreadyLinked ? "Referência adicionada" : "Adicionar referência"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
      {results ? <p className="text-center font-mono text-[9px] uppercase tracking-widest text-subtle">Dados exibidos com atribuição ao Google</p> : null}
    </OperationPage>
  );
}

