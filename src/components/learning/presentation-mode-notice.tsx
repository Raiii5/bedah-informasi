"use client";

import { useDemoMode } from "@/hooks/use-demo-mode";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function LearningPersistenceText({ normal, demo }: { normal: string; demo: string }) {
  const demoMode = useDemoMode();
  return demoMode ? demo : normal;
}

export function PresentationModeNotice() {
  const demoMode = useDemoMode();
  if (!demoMode) return null;

  return <aside aria-label="Mode presentasi" className="border-b border-border bg-highlight">
    <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="primary">MODE PRESENTASI</Badge>
        <p className="text-caption">Progress sementara · kembali ke 0 saat refresh.</p>
      </div>
      <Button variant="outline" size="sm" onClick={() => window.location.assign(new URL("/", window.location.origin).href)}>Keluar dari Mode Presentasi</Button>
    </Container>
  </aside>;
}
