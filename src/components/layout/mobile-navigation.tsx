"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IconButton } from "@/components/ui/icon-button";
import { Icon } from "@/components/ui/icon";
import { navigationItems } from "./navigation";
import { useActiveSection } from "./use-active-section";
import { useDemoMode } from "@/hooks/use-demo-mode";

export function MobileNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const reduced = useReducedMotion();
  const demoMode = useDemoMode();
  function close() { dialog.current?.close(); setOpen(false); }
  return <div className="lg:hidden">
    <IconButton aria-label="Buka menu navigasi" aria-expanded={open} aria-controls="mobile-menu" variant="outline" size="sm" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Icon name="menu" /></IconButton>
    <dialog ref={dialog} id="mobile-menu" aria-labelledby="mobile-menu-title" className="mobile-dialog" onClose={() => setOpen(false)}>
      {open && <motion.div initial={reduced ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} className="flex min-h-full flex-col p-6">
        <div className="mb-8 flex items-center justify-between gap-3"><strong id="mobile-menu-title">BEDAH INFORMASI!</strong><IconButton aria-label="Tutup menu" size="sm" variant="outline" onClick={close}><Icon name="close" /></IconButton></div>
        <nav aria-label="Navigasi mobile"><ul className="space-y-2">{navigationItems.map((item, i) => <li key={item.id}><a href={demoMode ? `/?demo=1#${item.id}` : item.href} onClick={close} aria-current={active === item.id ? "location" : undefined} className={`flex min-h-14 items-center gap-4 rounded-xl px-4 ${active === item.id ? "bg-primary font-semibold" : "bg-muted hover:bg-secondary"}`}><span className="font-mono text-caption">0{i + 1}</span>{item.label}<Icon name="arrow" className="ml-auto" /></a></li>)}</ul></nav>
        <a href="#materi" onClick={close} className="action-link mt-6 bg-primary">Mulai Belajar <Icon name="arrow" /></a>
        <p className="mt-auto pt-10 text-caption text-muted-foreground">Baca. Periksa. Bandingkan. Simpulkan.</p>
      </motion.div>}
    </dialog>
  </div>;
}
