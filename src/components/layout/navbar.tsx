import { Container } from "@/components/ui/container";
import { DesktopNavigation } from "./desktop-navigation";
import { SectionLink } from "./section-link";
import { MobileNavigation } from "./mobile-navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 shrink-0 border-b border-border bg-surface/95 text-surface-foreground backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-3 py-3 lg:min-h-20">
        <SectionLink
          sectionId="beranda"
          aria-label="BEDAH INFORMASI! — Beranda"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg text-button font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
          >
            !
          </span>

          <span className="whitespace-nowrap">BEDAH INFORMASI!</span>
        </SectionLink>

        <div className="hidden items-center gap-5 lg:flex"><DesktopNavigation /></div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
