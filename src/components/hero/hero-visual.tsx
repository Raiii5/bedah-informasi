"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/icon";

export function HeroVisual() {
  const reduced = useReducedMotion();
  return <motion.div initial={false} animate={{ y: 0 }} whileHover={reduced ? undefined : { y: -6 }} transition={{ duration: reduced ? 0 : 0.3 }} className="hero-visual" aria-hidden="true">
    <div className="absolute inset-5 rounded-full bg-secondary/50" />
    <div className="absolute right-8 top-5 text-foreground"><Icon name="spark" className="size-8" /></div>
    <div className="hero-document"><div className="mb-5 flex items-center justify-between"><span className="rounded-full bg-primary px-3 py-1 text-xs font-bold">ARTIKEL ILMIAH POPULER</span><Icon name="file" /></div><div className="mb-3 h-4 w-4/5 rounded-full bg-foreground" /><div className="mb-6 h-4 w-3/5 rounded-full bg-foreground" /><div className="space-y-3"><div className="h-2.5 rounded-full bg-border" /><div className="h-2.5 w-4/5 rounded-full bg-border" /><div className="h-7 w-5/6 rounded-md bg-secondary" /><div className="h-2.5 rounded-full bg-border" /><div className="h-7 w-2/3 rounded-md bg-accent" /><div className="h-2.5 w-4/5 rounded-full bg-border" /></div><div className="mt-6 flex items-end gap-2 border-b border-border pb-2"><div className="h-8 w-8 rounded-t bg-highlight" /><div className="h-12 w-8 rounded-t bg-secondary" /><div className="h-16 w-8 rounded-t bg-primary" /><span className="ml-auto font-mono text-xs">DATA ≠ BUKTI</span></div></div>
    <div className="hero-sticker -left-1 top-20 -rotate-6 bg-secondary"><Icon name="check" /><div><span className="block text-xs">Bisa diverifikasi</span><strong>FAKTA</strong></div></div>
    <div className="hero-sticker -right-1 bottom-20 rotate-6 bg-accent"><Icon name="quote" /><div><span className="block text-xs">Periksa alasannya</span><strong>OPINI</strong></div></div>
    <div className="absolute bottom-9 left-8 flex size-20 items-center justify-center rounded-full border-[3px] border-foreground bg-primary shadow-[5px_5px_0_var(--foreground)]"><Icon name="search" className="size-10" /></div>
    <div className="absolute bottom-4 right-14 flex items-center gap-2 rounded-full border border-foreground bg-surface px-3 py-2 text-xs font-semibold"><span className="size-2 rounded-full bg-success" />Siap diperiksa, bukan langsung dipercaya.</div>
  </motion.div>;
}
