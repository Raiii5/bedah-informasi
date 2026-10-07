import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { navigationItems } from "./navigation";

export function NavbarTestSections() {
  return navigationItems
    .filter((item) => item.id !== "beranda")
    .map((item) => (
      <Section
        key={item.id}
        id={item.id}
        tabIndex={-1}
        spacing="lg"
        background="muted"
        aria-labelledby={`${item.id}-test-title`}
        className="border-t border-border"
      >
        <Container width="reading" className="space-y-4">
          <h2 id={`${item.id}-test-title`}>{item.label}</h2>

          <p className="text-caption text-muted-foreground">
            Penanda sementara untuk menguji navigasi {item.label.toLowerCase()}.
            Konten pembelajaran akan dibuat pada tahap berikutnya.
          </p>
        </Container>
      </Section>
    ));
}
