import { Badge, type BadgeVariant } from "@/components/ui/badge";
import type { ReactNode } from "react";

export function SectionHeading({ label, title, description, color = "secondary" }: { label: string; title: string; description: ReactNode; color?: BadgeVariant }) {
  return <div className="mb-8 max-w-2xl space-y-3"><Badge variant={color}>{label}</Badge><h2 className="text-heading-1">{title}</h2><p className="text-muted-foreground">{description}</p></div>;
}
