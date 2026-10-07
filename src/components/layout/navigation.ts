export const navigationItems = [
  { id: "beranda", label: "Beranda", href: "/#beranda" },
  { id: "materi", label: "Materi", href: "/#materi" },
  { id: "latihan", label: "Latihan", href: "/#latihan" },
  { id: "evaluasi", label: "Evaluasi", href: "/#evaluasi" },
  { id: "refleksi", label: "Refleksi", href: "/#refleksi" },
] as const satisfies readonly {
  id: string;
  label: string;
  href: `/#${string}`;
}[];

export type NavigationId = (typeof navigationItems)[number]["id"];

export function getActiveNavigationId(
  pathname: string,
  hash: string,
): NavigationId | null {
  if (pathname !== "/") return null;
  if (!hash || hash === "#") return "beranda";

  return navigationItems.find((item) => `#${item.id}` === hash)?.id ?? null;
}
