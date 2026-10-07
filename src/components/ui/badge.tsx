import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "highlight"
  | "success"
  | "warning"
  | "error";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantClasses = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  highlight: "bg-highlight text-highlight-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
} satisfies Record<BadgeVariant, string>;

export function Badge({
  variant = "neutral",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        "inline-flex max-w-full items-center gap-1.5",
        "rounded-full px-3 py-1 text-caption font-semibold",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
