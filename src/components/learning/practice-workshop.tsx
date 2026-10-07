"use client";

import { useState } from "react";
import { gameQuestions, hotsQuestions, hotsScenario, practiceReasons } from "@/content/module";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { isStringRecord, useLearningState, useProgress } from "./use-learning-state";
import { LearningPersistenceText } from "./presentation-mode-notice";

const initial: Record<string, string> = {};
const verificationFields = ["Klaim yang dicek", "Kata kunci pencarian", "Sumber yang ditemukan (nama dan tautan)", "Hasil verifikasi", "Kesimpulan"];
export function PracticeWorkshop() {
  const [level, setLevel] = useState(0);
  const [notes, setNotes] = useLearningState("practice", initial, isStringRecord);
  const [gameAnswers] = useLearningState("fact-game", initial, isStringRecord);
  const { completed, complete } = useProgress();
  const levels = ["Identifikasi", "Alasan", "Verifikasi mini", "HOTS"];
  const keys = [...practiceReasons.map((_, i) => `reason-${i}`), ...verificationFields.map((_, i) => `verify-${i}`), ...hotsQuestions.map((_, i) => `hots-${i}`)];
  const identified = gameQuestions.every((_, i) => ["Fakta", "Opini", "Perlu konteks"].includes(gameAnswers[i]));
  const ready = keys.every(key => (notes[key] ?? "").trim().length >= 5) && identified;
  const count = keys.filter(key => (notes[key] ?? "").trim().length >= 5).length;
  function field(key: string, label: string) { return <div key={key} className="space-y-2"><label className="block text-body font-semibold" htmlFor={`practice-${key}`}>{label}</label><textarea id={`practice-${key}`} rows={3} maxLength={3000} className="form-field" value={notes[key] ?? ""} onChange={event => setNotes(current => ({ ...current, [key]: event.target.value }))} placeholder="Tuliskan jawaban dan alasanmu…" /></div>; }
  return <div className="rounded-3xl border border-border bg-surface p-5 sm:p-8">
    <div className="mb-6 grid gap-2 sm:grid-cols-4">{levels.map((label, i) => <button type="button" key={label} aria-pressed={level === i} onClick={() => setLevel(i)} className={`min-h-14 rounded-xl border px-3 py-2 text-caption ${level === i ? "border-foreground bg-primary" : "border-border hover:bg-muted"}`}><span className="block font-mono text-xs">LEVEL 0{i + 1}</span><strong>{label}</strong></button>)}</div>
    <div className="space-y-6">
      {level === 0 && <><h3>Kenali jenis pernyataan</h3><p className="max-w-2xl text-muted-foreground">Enam pernyataan dari Latihan Level 1 ada di game “Temukan Jenis Pernyataan”. Selesaikan semuanya, lalu lanjutkan ke alasan dan verifikasi.</p><a href="#tantangan" className="action-link bg-secondary">{identified ? "Kembali ke game" : "Kerjakan identifikasi"} <Icon name="arrow" /></a></>}
      {level === 1 && practiceReasons.map((item, i) => <div key={item.question}>{field(`reason-${i}`, `${i + 1}. ${item.question}`)}<details className="mt-2 text-caption text-muted-foreground"><summary className="cursor-pointer">Bandingkan dengan panduan konsep</summary><p className="mt-2 rounded-xl bg-muted p-4">{item.guide}</p></details></div>)}
      {level === 2 && <><div className="rounded-xl bg-secondary/40 p-5"><h3>Pilih satu klaim dari artikel simulasi</h3><p className="mt-2 text-caption">Lakukan pencarian sumber digital. Jika bukti tidak ditemukan, catat “belum terkonfirmasi”; jangan mengarang sumber.</p><a href="#editorial" className="text-caption text-link underline">Baca kembali artikel</a></div>{verificationFields.map((label, i) => field(`verify-${i}`, label))}</>}
      {level === 3 && <><blockquote className="rounded-2xl bg-highlight p-5">{hotsScenario}</blockquote>{hotsQuestions.map((label, i) => field(`hots-${i}`, `${i + 1}. ${label}`))}<details className="text-caption"><summary className="cursor-pointer font-semibold">Rubrik pemeriksaan jawaban</summary><p className="mt-3 rounded-xl bg-muted p-4">Klaim belum dapat langsung dianggap fakta valid. Cari penelitian asli, peneliti, tahun, responden, metode, dan bukti kausalitas. Kata kunci harus spesifik. Putusan sementara membutuhkan alasan berdasarkan kekurangan bukti.</p></details></>}
    </div>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><p className="max-w-xl text-caption text-muted-foreground">{count}/{keys.length} jawaban terbuka terisi. <LearningPersistenceText normal="Jawaban tersimpan otomatis" demo="Jawaban hanya berlaku selama presentasi" />; penilaian uraian menggunakan rubrik dan diskusi dengan guru.</p><Button disabled={!ready} onClick={() => complete("practice")}><Icon name="check" />{completed.includes("practice") ? "Latihan sudah selesai" : "Tandai latihan selesai"}</Button></div>{!identified && <p className="mt-2 text-caption text-muted-foreground">Selesaikan game identifikasi dan isi seluruh jawaban (minimal 5 karakter) untuk menandai latihan selesai.</p>}
  </div>;
}
