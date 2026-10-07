"use client";

import { useState } from "react";
import { credibility, verificationQuestions } from "@/content/module";
import { Icon } from "@/components/ui/icon";
import { isStringArray, useLearningState, useProgress } from "./use-learning-state";

const initial: string[] = [];
export function VerificationLab() {
  const [checks, setChecks] = useLearningState("verification", initial, isStringArray);
  const [level, setLevel] = useState(0);
  const { complete } = useProgress();
  const count = verificationQuestions.filter(question => checks.includes(question)).length;
  return <div className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-3xl border border-border bg-surface p-5 sm:p-7"><div className="mb-5 flex items-center justify-between gap-3"><h3>Periksa satu klaim</h3><span className="rounded-lg bg-primary px-3 py-1 font-mono text-caption">{count}/5</span></div><p className="mb-5 text-caption text-muted-foreground">Gunakan checklist ini ketika menelusuri klaim. Tandai pertanyaan yang sudah kamu periksa.</p><div className="space-y-2">{verificationQuestions.map((question, index) => <label key={question} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border p-3 ${checks.includes(question) ? "border-success/30 bg-success-soft" : "border-border"}`}><input type="checkbox" className="size-5 shrink-0 accent-foreground" checked={checks.includes(question)} onChange={event => {
      const next = event.target.checked ? [...checks.filter(value => value !== question), question] : checks.filter(value => value !== question);
      setChecks(next); if (next.length === 5) complete("data");
    }} /><span className="text-body"><span className="text-muted-foreground">0{index + 1}. </span>{question}</span></label>)}</div><div className="mt-5" role="status">{count === 5 ? <p className="rounded-xl bg-primary p-4 text-caption"><strong className="flex items-center gap-2"><Icon name="check" />CLAIM CHECK COMPLETE</strong><span className="mt-1 block">Checklist selesai. Putusan klaim tetap bergantung pada bukti yang kamu temukan.</span></p> : <p className="text-caption text-muted-foreground">{5 - count} pertanyaan lagi untuk pemeriksaan yang utuh.</p>}</div></div>
    <div className="rounded-3xl border border-border bg-surface p-5 sm:p-7"><h3 className="mb-2">Tangga kredibilitas</h3><p className="mb-5 text-caption text-muted-foreground">Pilih tingkat sumber untuk melihat cara memeriksanya.</p><div className="space-y-2">{credibility.map((item, index) => <button type="button" key={item.label} className={`flex min-h-12 w-full items-center gap-3 rounded-xl border p-3 text-left text-caption font-semibold ${level === index ? "border-foreground bg-secondary" : "border-border hover:bg-muted"}`} aria-pressed={level === index} onClick={() => setLevel(index)}><span className="flex size-7 items-center justify-center rounded-lg bg-surface">{4 - index}</span>{item.label}<Icon name="arrow" className="ml-auto" /></button>)}</div><div className="mt-5 rounded-2xl bg-muted p-5" aria-live="polite"><strong>{credibility[level].examples}</strong><p className="mt-3 text-caption text-muted-foreground">{credibility[level].reason}</p></div></div>
  </div>;
}
