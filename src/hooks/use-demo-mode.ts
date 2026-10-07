"use client";

import { useSyncExternalStore } from "react";
import { isDemoMode } from "@/lib/demo-mode";

function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("hashchange", listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("hashchange", listener);
  };
}

function serverSnapshot() { return false; }

export function useDemoMode() {
  return useSyncExternalStore(subscribe, isDemoMode, serverSnapshot);
}
