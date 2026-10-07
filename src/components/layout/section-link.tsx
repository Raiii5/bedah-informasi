"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { navigationItems, type NavigationId } from "./navigation";
import { useDemoMode } from "@/hooks/use-demo-mode";

export function goToSection(id: NavigationId): boolean {
  const target = document.getElementById(id);

  if (window.location.pathname !== "/" || !target) {
    return false;
  }

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}#${id}`);
    window.dispatchEvent(new Event("hashchange"));
  }
  target.focus({ preventScroll: true });
  target.scrollIntoView({
    block: "start",
    behavior: "auto",
  });

  return true;
}

type SectionLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "onClick"
> & {
  sectionId: NavigationId;
};

export function SectionLink({
  sectionId,
  children,
  ...props
}: SectionLinkProps) {
  const demoMode = useDemoMode();
  return (
    <Link
      {...props}
      href={demoMode ? `/?demo=1#${sectionId}` : navigationItems.find(item => item.id === sectionId)!.href}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.currentTarget.hasAttribute("download") ||
          (event.currentTarget.target && event.currentTarget.target !== "_self")
        ) {
          return;
        }

        if (goToSection(sectionId)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </Link>
  );
}
