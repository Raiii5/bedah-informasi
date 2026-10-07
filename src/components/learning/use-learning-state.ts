"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { isDemoMode } from "@/lib/demo-mode";

const prefix = "bedah-informasi:v1:";
const changeEvent = "bedah-progress-change";
const memory = new Map<string, string>();
// Document-local state: refreshes and new tabs create a fresh demo session.
const demoMemory = new Map<string, string>();

function read(key: string) {
  if (isDemoMode()) return demoMemory.get(key) ?? null;
  try { return memory.get(key) ?? localStorage.getItem(prefix + key) ?? null; }
  catch { return memory.get(key) ?? null; }
}
function subscribe(listener: () => void) {
  function storageChanged() { memory.clear(); listener(); }
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", storageChanged);
  window.addEventListener("popstate", listener);
  window.addEventListener("hashchange", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", storageChanged);
    window.removeEventListener("popstate", listener);
    window.removeEventListener("hashchange", listener);
  };
}
function serverSnapshot() { return null; }

export function useLearningState<T>(key: string, initial: T, validate: (value: unknown) => value is T) {
  const getSnapshot = useCallback(() => read(key), [key]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const value = useMemo(() => {
    if (!snapshot) return initial;
    try { const parsed: unknown = JSON.parse(snapshot); return validate(parsed) ? parsed : initial; }
    catch { return initial; }
  }, [snapshot, initial, validate]);
  const setValue = useCallback((next: T | ((current: T) => T)) => {
    let current = initial;
    try { const raw = read(key); const parsed: unknown = raw ? JSON.parse(raw) : initial; if (validate(parsed)) current = parsed; } catch { /* Use the initial state for damaged storage. */ }
    const result = typeof next === "function" ? (next as (current: T) => T)(current) : next;
    const json = JSON.stringify(result);
    if (isDemoMode()) {
      demoMemory.set(key, json);
    } else {
      memory.set(key, json);
      try { localStorage.setItem(prefix + key, json); } catch { /* Learning remains usable when storage is unavailable. */ }
    }
    window.dispatchEvent(new Event(changeEvent));
  }, [key, initial, validate]);
  return [value, setValue] as const;
}

export const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === "string");
export const isStringRecord = (value: unknown): value is Record<string, string> => typeof value === "object" && value !== null && !Array.isArray(value) && Object.values(value).every(item => typeof item === "string");
const emptyCompleted: string[] = [];
export function useProgress() {
  const [completed, setCompleted] = useLearningState("completed", emptyCompleted, isStringArray);
  const complete = useCallback((id: string) => setCompleted(current => current.includes(id) ? current : [...current, id]), [setCompleted]);
  return { completed, complete };
}
