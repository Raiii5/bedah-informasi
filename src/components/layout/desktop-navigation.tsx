"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navigationItems } from "./navigation";
import { goToSection, SectionLink } from "./section-link";
import { useActiveSection } from "./use-active-section";
import { isDemoMode } from "@/lib/demo-mode";

export function DesktopNavigation() {
  const router = useRouter();
  const activeId = useActiveSection();

  function startLearning() {
    if (!goToSection("materi")) {
      router.push(isDemoMode() ? "/?demo=1#materi" : "/#materi");
    }
  }

  return (
    <>
      <nav aria-label="Navigasi utama">
        <ul className="flex items-center gap-1 xl:gap-2">
          {navigationItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <SectionLink
                  sectionId={item.id}
                  aria-current={isActive ? "location" : undefined}
                  className={[
                    "inline-flex min-h-11 items-center rounded-lg px-2 xl:px-3",
                    "whitespace-nowrap text-navigation text-foreground",
                    "decoration-2 underline-offset-8",
                    "transition-colors duration-150 motion-reduce:transition-none",
                    "hover:bg-muted active:bg-muted",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                    isActive ? "bg-muted underline" : "no-underline",
                  ].join(" ")}
                >
                  {item.label}
                </SectionLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <Button
        size="sm"
        onClick={startLearning}
        className="whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        Mulai Belajar
      </Button>
    </>
  );
}
