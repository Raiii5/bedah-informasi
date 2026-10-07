import type { ComponentPropsWithoutRef } from "react";

type StaticCardVariant = "default" | "elevated" | "outlined";

type StaticCardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: StaticCardVariant;
};

type InteractiveCardProps = ComponentPropsWithoutRef<"a"> & {
  variant: "interactive";
  href: string;
};

export type CardProps = StaticCardProps | InteractiveCardProps;

const baseClasses =
  "min-w-0 rounded-2xl border bg-surface p-5 text-surface-foreground sm:p-6";

const variantClasses = {
  default: "border-border",
  elevated: "border-border shadow-sm",
  outlined: "border-border-strong",
  interactive: [
    "block border-border-strong",
    "transition-[background-color,box-shadow] duration-150",
    "hover:bg-muted hover:shadow-sm",
    "motion-reduce:transition-none",
  ].join(" "),
} satisfies Record<StaticCardVariant | "interactive", string>;

export function Card(props: CardProps) {
  if (props.variant === "interactive") {
    const { variant, className = "", children, href, ...anchorProps } = props;

    return (
      <a
        {...anchorProps}
        href={href}
        className={[baseClasses, variantClasses[variant], className].join(" ")}
      >
        {children}
      </a>
    );
  }

  const { variant = "default", className = "", children, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={[baseClasses, variantClasses[variant], className].join(" ")}
    >
      {children}
    </div>
  );
}
