"use client";

import { useRef, useState } from "react";
import { chapters } from "@/content/module";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useProgress } from "./use-learning-state";

export function MaterialTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { completed, complete } = useProgress();
  const chapter = chapters[active];
  return <div className="overflow-hidden rounded-3xl border border-border bg-surface">
    <div role="tablist" aria-label="Bab materi" className="grid grid-cols-2 gap-2 border-b border-border bg-muted/60 p-3 md:grid-cols-4">{chapters.map((item, index) => <button ref={element => { tabs.current[index] = element; }} key={item.id} id={`tab-${item.id}`} role="tab" type="button" aria-selected={active === index} aria-controls={`panel-${item.id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % chapters.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + chapters.length) % chapters.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = chapters.length - 1;
      else return;
      event.preventDefault(); setActive(next); tabs.current[next]?.focus();
    }} className={`min-h-12 rounded-xl px-3 py-2 text-caption font-semibold ${active === index ? "bg-foreground text-surface shadow-sm" : "hover:bg-secondary"}`}>{item.label}{completed.includes(item.id) && <span className="ml-1" aria-label="selesai"> ✓</span>}</button>)}</div>
    <div role="tabpanel" id={`panel-${chapter.id}`} aria-labelledby={`tab-${chapter.id}`} tabIndex={0} className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-3xl space-y-4"><span className="eyebrow">{chapter.eyebrow}</span><h3 className="text-heading-1">{chapter.title}</h3><p className="text-muted-foreground">{chapter.intro}</p></div>
      {active === 1 && <div className="my-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-secondary p-5"><span className="eyebrow">FAKTA</span><p className="mt-2 font-semibold">“Tercatat 412 titik panas.”</p><p className="text-caption">Bisa ditelusuri ke laporan dan waktunya.</p></div><div className="rounded-2xl bg-accent p-5"><span className="eyebrow">OPINI</span><p className="mt-2 font-semibold">“Pengawasan sangat buruk.”</p><p className="text-caption">Penilaian yang membutuhkan indikator.</p></div></div>}
      <div className="my-6 divide-y divide-border border-y border-border">{chapter.sections.map((item, index) => <details key={item.title} className="group py-4" open={index === 0}><summary className="cursor-pointer text-body font-semibold">{item.title}</summary><p className="mt-3 max-w-3xl text-muted-foreground">{item.body}</p></details>)}</div>
      <div className="flex flex-wrap items-center gap-4"><Button variant={completed.includes(chapter.id) ? "outline" : "primary"} onClick={() => complete(chapter.id)}><Icon name="check" />{completed.includes(chapter.id) ? "Bab sudah dipelajari" : "Tandai bab selesai"}</Button><a href={active === 1 ? "#tantangan" : active === 2 ? "#verifikasi" : "#latihan"} className="inline-flex min-h-11 items-center gap-2 text-caption font-semibold text-link underline">Terapkan pemahamanmu <Icon name="arrow" /></a></div>
    </div>
  </div>;
}
