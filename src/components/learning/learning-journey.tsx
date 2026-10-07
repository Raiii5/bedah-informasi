"use client";

import { journey } from "@/content/module";
import { Icon } from "@/components/ui/icon";
import { useProgress } from "./use-learning-state";
import { useDemoMode } from "@/hooks/use-demo-mode";
const colors = { secondary: "bg-secondary", accent: "bg-accent", primary: "bg-primary", highlight: "bg-highlight" };

export function LearningJourney() {
  const { completed } = useProgress();
  const demoMode = useDemoMode();
  const count = journey.filter(item => completed.includes(item.id)).length;
  const percent = Math.round(count / journey.length * 100);
  const current = journey.find(item => !completed.includes(item.id));
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><span className="eyebrow">PROGRESS BELAJAR</span><p className="text-caption text-muted-foreground">{count} dari 8 langkah selesai · {demoMode ? "sementara selama presentasi" : "tersimpan di perangkat ini"}</p></div><strong className="text-heading-1">{percent}%</strong></div>
    <div className="h-2.5 overflow-hidden rounded-full bg-border" role="progressbar" aria-label="Progress belajar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-foreground transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div>
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{journey.map((item, i) => {
      const done = completed.includes(item.id);
      return <li key={item.id}><a href={`#${item.target}`} className={`journey-step ${done ? "border-success/40" : current?.id === item.id ? "border-foreground" : "border-border"}`} aria-current={current?.id === item.id ? "step" : undefined}>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${colors[item.color]} text-caption font-bold`}>{done ? <Icon name="check" /> : String(i + 1).padStart(2, "0")}</span><span className="min-w-0"><span className="block text-caption font-semibold">{item.label}</span><span className="block text-xs text-muted-foreground">{done ? "Selesai" : current?.id === item.id ? "Langkah berikutnya" : "Siap dipelajari"}</span></span><Icon name="arrow" className="ml-auto size-4 shrink-0" /></a></li>;
    })}</ol>
  </div>;
}
