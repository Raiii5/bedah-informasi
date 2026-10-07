import type { ComponentPropsWithoutRef } from "react";

type SectionSpacing = "sm" | "md" | "lg";
type SectionBackground = "default" | "surface" | "muted";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: SectionSpacing;
  background?: SectionBackground;
};

const spacingClasses = {
  sm: "py-6 md:py-8",
  md: "py-10 md:py-14",
  lg: "py-14 md:py-20",
} satisfies Record<SectionSpacing, string>;

const backgroundClasses = {
  default: "bg-background",
  surface: "bg-surface",
  muted: "bg-muted",
} satisfies Record<SectionBackground, string>;

export function Section({
  spacing = "md",
  background = "default",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={[
        "min-w-0",
        spacingClasses[spacing],
        backgroundClasses[background],
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
