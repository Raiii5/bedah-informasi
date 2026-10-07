"use client";

import { reflectionItems } from "@/content/module";
import { Icon } from "@/components/ui/icon";
import { isStringRecord, useLearningState, useProgress } from "@/components/learning/use-learning-state";
import { LearningPersistenceText } from "@/components/learning/presentation-mode-notice";

const initial: Record<string, string> = {};
export function ReflectionChecklist() {
  const [state, setState] = useLearningState("reflection", initial, isStringRecord);
  const { complete } = useProgress();
  const count = reflectionItems.filter((_, i) => ["Sudah", "Perlu latihan"].includes(state[i])).length;
  function update(index: number, value: string) {
    const next: Record<string, string> = { ...state, [index]: value };
    setState(next);
    if (reflectionItems.every((_, i) => ["Sudah", "Perlu latihan"].includes(next[i]))) complete("reflection");
  }
  return <div className="space-y-4">{reflectionItems.map((item, index) => <div key={item} className="rounded-2xl border border-border bg-surface p-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><p className="max-w-xl text-body font-semibold">{item}</p><div className="flex flex-wrap gap-2">{["Sudah", "Perlu latihan"].map(option => <button key={option} type="button" aria-label={`${option}: ${item}`} aria-pressed={state[index] === option} onClick={() => update(index, option)} className={`min-h-11 rounded-xl border px-4 py-2 text-caption font-semibold ${state[index] === option ? option === "Sudah" ? "border-success bg-success-soft text-success" : "border-warning bg-warning-soft text-warning" : "border-border hover:bg-muted"}`}>{option}</button>)}</div></div><label className="sr-only" htmlFor={`reflection-note-${index}`}>Catatan refleksi: {item}</label><input id={`reflection-note-${index}`} className="form-field mt-4 text-caption" placeholder="Catatan untuk dirimu (opsional)" value={state[`note-${index}`] ?? ""} maxLength={1000} onChange={event => setState(current => ({ ...current, [`note-${index}`]: event.target.value }))} /></div>)}<div role="status" className="flex items-start gap-3 rounded-2xl bg-highlight p-5"><Icon name="check" className="mt-1 shrink-0" /><p className="text-caption">{count === 5 ? `Refleksi selesai. ${reflectionItems.filter((_, i) => state[i] === "Perlu latihan").length} kemampuan perlu latihan lagi. Kembali ke materi atau game untuk menguatkannya.` : `${count}/5 kemampuan sudah direfleksikan. Jawab dengan jujur; ini bukan penilaian benar atau salah.`} <LearningPersistenceText normal="Catatanmu tersimpan di perangkat ini." demo="Catatanmu hanya berlaku selama presentasi." /></p></div></div>;
}
