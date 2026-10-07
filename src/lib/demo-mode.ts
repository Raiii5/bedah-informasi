/** Only demo=1 enables presentation mode; missing or other values stay normal. */
export function isDemoMode(search = typeof window === "undefined" ? "" : window.location.search): boolean {
  return new URLSearchParams(search).get("demo") === "1";
}
