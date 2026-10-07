import type { SVGProps } from "react";

type IconName = "arrow" | "search" | "check" | "book" | "spark" | "menu" | "close" | "file" | "chart" | "quote" | "external";
const paths: Record<IconName, string> = {
  arrow: "M5 12h14m-6-6 6 6-6 6", search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  check: "m5 12 4 4L19 6", book: "M12 5v15M12 5C8 2 4 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-2-1-6-2-10 1",
  spark: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7", menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M18 6 6 18", file: "M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8M8 16h6",
  chart: "M4 3v18h17M8 16V9m5 7V5m5 11v-5", quote: "M3 12h6V5H3v7Zm0 0v4l4 3m8-7h6V5h-6v7Zm0 0v4l4 3",
  external: "M14 3h7v7m0-7L10 14M11 3H3v18h18v-8",
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[name]} /></svg>;
}
