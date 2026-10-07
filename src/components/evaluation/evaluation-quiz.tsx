"use client";

import { useRef, useState } from "react";
import { evaluationQuestions, essayQuestions } from "@/content/module";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { isStringRecord, useLearningState, useProgress } from "@/components/learning/use-learning-state";

type QuizState = { answers: number[]; submitted: boolean };
const initial: QuizState = { answers: [-1, -1, -1, -1, -1], submitted: false };
const initialEssays: Record<string, string> = {};
function isQuizState(value: unknown): value is QuizState {
  if (typeof value !== "object" || !value) return false;
  const state = value as Partial<QuizState>;
  return typeof state.submitted === "boolean" && Array.isArray(state.answers) && state.answers.length === 5 && state.answers.every(answer => Number.isInteger(answer) && answer >= -1 && answer <= 3);
}
export function EvaluationQuiz() {
  const [state, setState] = useLearningState("evaluation", initial, isQuizState);
  const [essays, setEssays] = useLearningState("essays", initialEssays, isStringRecord);
  const [index, setIndex] = useState(0);
  const result = useRef<HTMLDivElement>(null);
  const { complete } = useProgress();
  const question = evaluationQuestions[index];
  const answered = state.answers.filter(answer => answer >= 0).length;
  const score = evaluationQuestions.reduce((total, item, i) => total + Number(item.answer === state.answers[i]) * 20, 0);
  function submit() { if (answered !== 5) return; setState(current => ({ ...current, submitted: true })); complete("evaluation"); requestAnimationFrame(() => result.current?.focus()); }
  return <div className="min-w-0 rounded-3xl border border-foreground bg-surface p-5 shadow-[5px_5px_0_var(--secondary)] sm:p-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">EVALUASI SUMATIF</span><span className="text-caption text-muted-foreground">5 soal pilihan ganda · tanpa batas waktu</span></div>
    {state.submitted ? <div ref={result} tabIndex={-1} className="space-y-5"><div className="flex flex-wrap items-center gap-5 rounded-2xl bg-secondary p-6"><div className="flex size-16 items-center justify-center rounded-2xl bg-surface"><Icon name="check" className="size-9" /></div><div><span className="eyebrow">NILAI PILIHAN GANDA</span><p className="text-4xl font-bold">{score}<span className="text-body">/100</span></p></div></div><h3>{score >= 80 ? "Pemahamanmu semakin kuat!" : "Terus latih cara membaca kritismu."}</h3><p className="text-muted-foreground">{score / 20} dari 5 jawaban tepat. Baca pembahasan setiap soal sebelum mencoba lagi.</p><ol className="space-y-3">{evaluationQuestions.map((item, i) => <li className="rounded-xl border border-border p-4" key={item.question}><p className="text-caption font-semibold">{i + 1}. {item.question}</p><p className="mt-2 text-caption"><span className={state.answers[i] === item.answer ? "text-success" : "text-error"}>{state.answers[i] === item.answer ? "✓ Tepat" : "Perlu diperbaiki"}</span> · Jawabanmu: {String.fromCharCode(65 + state.answers[i])}. Jawaban benar: {String.fromCharCode(65 + item.answer)}.</p><p className="mt-2 text-caption text-muted-foreground">{item.explanation}</p></li>)}</ol><div className="flex flex-wrap gap-3"><Button variant="outline" onClick={() => { setState(initial); setIndex(0); }}>Coba lagi</Button><a href="#refleksi" className="action-link bg-primary">Lanjut refleksi <Icon name="arrow" /></a></div></div> : <>
      <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="Navigasi soal">{evaluationQuestions.map((_, i) => <button key={i} type="button" aria-label={`Buka soal evaluasi ${i + 1}${state.answers[i] >= 0 ? ", sudah dijawab" : ""}`} aria-current={index === i ? "step" : undefined} onClick={() => setIndex(i)} className={`flex size-11 items-center justify-center rounded-xl border font-semibold ${index === i ? "border-foreground bg-primary" : state.answers[i] >= 0 ? "border-success bg-success-soft" : "border-border"}`}>{i + 1}</button>)}<span className="ml-auto text-caption">{answered}/5</span></div>
      <fieldset className="min-w-0"><legend className="mb-5 text-heading-2">{index + 1}. {question.question}</legend><div className="space-y-3">{question.options.map((option, i) => <label key={option} className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 ${state.answers[index] === i ? "border-foreground bg-primary/30" : "border-border hover:bg-muted"}`}><input type="radio" name={`evaluation-${index}`} value={i} checked={state.answers[index] === i} onChange={() => setState(current => ({ ...current, answers: current.answers.map((answer, j) => j === index ? i : answer) }))} className="mt-1 size-5 shrink-0 accent-foreground" /><span className="min-w-0 text-body"><strong className="mr-2">{String.fromCharCode(65 + i)}.</strong>{option}</span></label>)}</div></fieldset>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><Button variant="outline" disabled={index === 0} onClick={() => setIndex(current => current - 1)}>Sebelumnya</Button>{index < 4 ? <Button onClick={() => setIndex(current => current + 1)}>Berikutnya <Icon name="arrow" /></Button> : <Button disabled={answered !== 5} onClick={submit}>Kumpulkan jawaban <Icon name="check" /></Button>}</div><p className="mt-4 text-caption text-muted-foreground">Jawaban boleh diubah sebelum dikumpulkan. Semua soal harus dijawab.</p>
    </>}
    <details className="mt-8 border-t border-border pt-5"><summary className="cursor-pointer font-semibold">Bagian B · Uraian</summary><p className="my-4 text-caption text-muted-foreground">Dinilai bersama guru berdasarkan ketepatan konsep, alasan logis, dan hubungan klaim dengan kebutuhan verifikasi. Nilai pilihan ganda di atas tidak mencakup uraian.</p><div className="space-y-4">{essayQuestions.map((item, i) => <div key={item}><label htmlFor={`essay-${i}`} className="mb-2 block text-body font-semibold">{i + 1}. {item}</label><textarea id={`essay-${i}`} rows={3} maxLength={3000} className="form-field" value={essays[i] ?? ""} onChange={event => setEssays(current => ({ ...current, [i]: event.target.value }))} /></div>)}</div></details>
  </div>;
}
