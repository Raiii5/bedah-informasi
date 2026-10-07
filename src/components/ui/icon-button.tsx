import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  buttonBaseClasses,
  buttonVariantClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./button";

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "aria-label"
> & {
  "aria-label": string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const sizeClasses = {
  sm: "size-11",
  md: "size-12",
  lg: "size-14",
} satisfies Record<ButtonSize, string>;

export function IconButton({
  "aria-label": label,
  children,
  variant = "ghost",
  size = "md",
  type = "button",
  className = "",
  ...props
}: IconButtonProps) {
  if (!label.trim()) {
    throw new Error("IconButton membutuhkan aria-label yang tidak kosong.");
  }

  return (
    <button
      {...props}
      type={type}
      aria-label={label}
      className={[
        buttonBaseClasses,
        buttonVariantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 items-center justify-center"
      >
        {children}
      </span>
    </button>
  );
}
