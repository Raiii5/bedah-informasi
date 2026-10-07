import type { ComponentPropsWithoutRef } from "react";

type ContainerWidth = "default" | "reading";

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: ContainerWidth;
};

const widthClasses = {
  default: "max-w-6xl",
  reading: "max-w-[65ch]",
} satisfies Record<ContainerWidth, string>;

export function Container({
  width = "default",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={[
        "mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8",
        widthClasses[width],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
