"use client";

import { useEffect, useState } from "react";
import { navigationItems, type NavigationId } from "./navigation";

export function useActiveSection() {
  const [active, setActive] = useState<NavigationId>("beranda");
  useEffect(() => {
    let frame = 0;
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current: NavigationId = "beranda";
        for (const item of navigationItems) {
          const section = document.getElementById(item.id);
          if (section && section.getBoundingClientRect().top <= 150) current = item.id;
        }
        setActive(current);
      });
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.removeEventListener("hashchange", schedule); };
  }, []);
  return active;
}
