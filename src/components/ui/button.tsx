import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
};

/*
 * Dibagikan dengan IconButton agar state dan warna konsisten.
 */
export const buttonBaseClasses = [
  "inline-flex shrink-0 items-center justify-center gap-2",
  "rounded-xl border text-button",
  "transition-colors duration-150",
  "motion-safe:active:scale-[0.98]",
  "motion-reduce:transition-none",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export const buttonVariantClasses = {
  primary:
    "border-transparent bg-primary text-primary-foreground enabled:hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground enabled:hover:bg-secondary/80",
  outline:
    "border-border-strong bg-surface text-surface-foreground enabled:hover:bg-muted",
  ghost:
    "border-transparent bg-transparent text-foreground enabled:hover:bg-muted",
  destructive:
    "border-error bg-error-soft text-error enabled:hover:bg-error-soft/70",
} satisfies Record<ButtonVariant, string>;

const sizeClasses = {
  sm: "min-h-11 px-3 py-2",
  md: "min-h-12 px-5 py-2.5",
  lg: "min-h-14 px-6 py-3",
} satisfies Record<ButtonSize, string>;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || props["aria-busy"]}
      className={[
        buttonBaseClasses,
        buttonVariantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
        />
      )}

      {children}

      {loading && <span className="sr-only">, sedang diproses</span>}
    </button>
  );
}
