"use client";

import { useState } from "react";
import { glossary } from "@/content/module";
import { Icon } from "@/components/ui/icon";

export function SearchableGlossary() {
  const [query, setQuery] = useState("");
  const items = glossary.filter(item => `${item.term} ${item.definition}`.toLocaleLowerCase("id").includes(query.trim().toLocaleLowerCase("id")));
  return <div><label htmlFor="glossary-search" className="mb-2 block text-caption font-semibold">Cari istilah atau makna</label><div className="relative mb-3 max-w-xl"><Icon name="search" className="absolute left-4 top-4" /><input id="glossary-search" type="search" value={query} onChange={event => setQuery(event.target.value)} className="form-field pl-12" placeholder="Coba ‘korelasi’ atau ‘sumber’…" autoComplete="off" /></div><p role="status" className="mb-6 text-caption text-muted-foreground">{items.length} istilah ditemukan</p><dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <div className="rounded-2xl border border-border bg-surface p-5" key={item.term}><dt className="mb-2 font-semibold">{item.term}</dt><dd className="text-caption text-muted-foreground">{item.definition}</dd></div>)}</dl>{items.length === 0 && <p className="rounded-2xl bg-muted p-6">Belum ada istilah yang cocok. Coba kata kunci lain.</p>}</div>;
}
