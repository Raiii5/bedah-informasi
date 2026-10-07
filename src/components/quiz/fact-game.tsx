"use client";

import { useState } from "react";
import { gameQuestions } from "@/content/module";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { isStringRecord, useLearningState, useProgress } from "@/components/learning/use-learning-state";

const initial: Record<string, string> = {};
const options = ["Fakta", "Opini", "Perlu konteks"];
export function FactGame() {
  const [answers, setAnswers] = useLearningState("fact-game", initial, isStringRecord);
  const [index, setIndex] = useState(0);
  const { complete } = useProgress();
  const item = gameQuestions[index];
  const selected = options.includes(answers[index]) ? answers[index] : undefined;
  const count = gameQuestions.filter((_, i) => options.includes(answers[i])).length;
  const score = gameQuestions.filter((question, i) => answers[i] === question.answer).length;
  const finished = count === gameQuestions.length;
  function choose(option: string) {
    if (selected) return;
    setAnswers(current => ({ ...current, [index]: option }));
    if (count + 1 === gameQuestions.length) complete("facts");
  }
  return <div className="rounded-3xl border border-foreground bg-surface p-5 shadow-[5px_5px_0_var(--primary)] sm:p-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><Badge variant="highlight">LEVEL 1 · IDENTIFIKASI</Badge><span className="font-mono text-caption">SKOR {score}/{gameQuestions.length}</span></div>
    {finished ? <div className="space-y-5" role="status"><div className="flex size-14 items-center justify-center rounded-2xl bg-primary"><Icon name="check" className="size-8" /></div><h3>Enam klaim sudah dibedah!</h3><p>{score} dari {gameQuestions.length} jawaban tepat. {score === gameQuestions.length ? "Kamu sudah bisa membedakan data dan penilaian." : "Baca pembahasan di bawah, lalu coba lagi untuk menguatkan pemahaman."}</p><details className="rounded-xl bg-muted p-4"><summary className="cursor-pointer font-semibold">Lihat semua pembahasan</summary><ol className="mt-4 space-y-4">{gameQuestions.map((question, i) => <li key={question.text}><strong>{i + 1}. {question.answer}</strong><p className="text-caption">{question.text}</p><p className="text-caption text-muted-foreground">{question.explanation}</p></li>)}</ol></details><Button variant="outline" onClick={() => { setAnswers({}); setIndex(0); }}>Main lagi</Button><a href="#editorial" className="action-link ml-0 bg-primary sm:ml-3">Jadi editor <Icon name="arrow" /></a></div> : <>
      <p className="mb-3 text-caption text-muted-foreground">Pernyataan {index + 1} dari {gameQuestions.length} · {count} sudah dijawab</p><h3 className="mb-6 max-w-3xl text-heading-2">“{item.text}”</h3>
      <div className="grid gap-3 sm:grid-cols-3">{options.map(option => <button type="button" key={option} className={`answer-option justify-center font-semibold ${selected === option ? "border-foreground bg-primary" : ""}`} aria-pressed={selected === option} disabled={!!selected} onClick={() => choose(option)}>{option}</button>)}</div>
      {selected && <div role="status" className={`mt-5 rounded-2xl p-5 ${selected === item.answer ? "bg-success-soft text-success" : "bg-warning-soft text-warning"}`}><strong>{selected === item.answer ? "Tepat!" : `Belum tepat. Kategori: ${item.answer}.`}</strong><p className="mt-2 text-caption">{item.explanation}</p></div>}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><span className="text-caption text-muted-foreground">Baca konteks, baru tentukan kategorinya.</span><Button disabled={!selected} onClick={() => setIndex(current => (current + 1) % gameQuestions.length)}>Berikutnya <Icon name="arrow" /></Button></div>
    </>}
  </div>;
}
