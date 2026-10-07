"use client";

import { useState } from "react";
import { aperception } from "@/content/module";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export function Aperception() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return <div className="grid gap-4 lg:grid-cols-3">{aperception.map((item, index) => <Card key={item.question} className="flex flex-col gap-4">
    <span className="font-mono text-caption text-muted-foreground">PERTANYAAN 0{index + 1}</span><h3 className="text-body font-semibold">{item.question}</h3>
    <div className="mt-auto space-y-2">{item.options.map((option, optionIndex) => <button key={option} type="button" className={`answer-option ${answers[index] === optionIndex ? "border-foreground bg-primary/30" : ""}`} aria-pressed={answers[index] === optionIndex} onClick={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}>{option}</button>)}</div>
    {answers[index] !== undefined && <div className={`rounded-xl p-4 text-caption ${answers[index] === item.answer ? "bg-success-soft text-success" : "bg-warning-soft text-warning"}`} role="status"><strong className="flex items-center gap-2"><Icon name={answers[index] === item.answer ? "check" : "search"} />{answers[index] === item.answer ? "Cara berpikir yang tepat!" : "Mari periksa lagi."}</strong><p className="mt-2">{item.explanation}</p></div>}
  </Card>)}</div>;
}
