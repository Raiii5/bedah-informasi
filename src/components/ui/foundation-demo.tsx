"use client";

import { useState } from "react";
import { Badge, type BadgeVariant } from "./badge";
import { Button, type ButtonVariant } from "./button";
import { Card } from "./card";
import { Container } from "./container";
import { IconButton } from "./icon-button";
import { Section } from "./section";
import { NavbarTestSections } from "@/components/layout/navbar-test-sections";

const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
];

const badgeExamples = [
  { variant: "secondary", label: "FAKTA" },
  { variant: "accent", label: "OPINI" },
  { variant: "warning", label: "PERLU KONTEKS" },
  { variant: "primary", label: "LEVEL 1" },
  { variant: "highlight", label: "LEVEL 2" },
  { variant: "success", label: "VERIFIED" },
  { variant: "error", label: "ERROR" },
  { variant: "neutral", label: "DRAFT" },
] satisfies { variant: BadgeVariant; label: string }[];

export function FoundationDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  function registerClick() {
    setClickCount((count) => count + 1);
  }

  return (
    <main id="konten-utama" className="min-w-0">
      <Section spacing="lg" aria-labelledby="demo-title">
        <Container>
          <div className="max-w-[65ch] space-y-4">
            <Badge variant="primary">FOUNDATION UI</Badge>

            <h1 id="demo-title">BEDAH INFORMASI!</h1>

            <p>
              Membedah Fakta, Opini, dan Keabsahan Data dalam Artikel Ilmiah
              Populer
            </p>

            <p className="text-caption text-muted-foreground">
              Halaman sementara untuk menguji komponen dasar.
            </p>
          </div>
        </Container>
      </Section>

      <Section
        id="beranda"
        tabIndex={-1}
        spacing="lg"
        aria-labelledby="demo-title"
      >
        <Container className="space-y-6">
          <h2 id="button-title">Button</h2>

          <div className="flex flex-wrap items-center gap-3">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant} onClick={registerClick}>
                {variant}
              </Button>
            ))}
          </div>

          <h3>Ukuran</h3>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={registerClick}>
              Small
            </Button>
            <Button size="md" onClick={registerClick}>
              Medium
            </Button>
            <Button size="lg" onClick={registerClick}>
              Large
            </Button>
          </div>

          <h3>Disabled dan loading</h3>

          <div className="flex flex-wrap items-center gap-3">
            <Button disabled onClick={registerClick}>
              Disabled
            </Button>

            <Button loading={loading} onClick={registerClick}>
              Contoh proses
            </Button>

            <Button
              variant="outline"
              aria-pressed={loading}
              onClick={() => setLoading((value) => !value)}
            >
              {loading ? "Matikan loading" : "Aktifkan loading"}
            </Button>
          </div>

          <p id="hasil-demo" role="status" className="text-muted-foreground">
            Jumlah aksi tombol: {clickCount}. Loading{" "}
            {loading ? "aktif" : "nonaktif"}.
          </p>
        </Container>
      </Section>

      <Section background="muted" aria-labelledby="icon-title">
        <Container className="space-y-6">
          <h2 id="icon-title">IconButton</h2>

          <div className="flex flex-wrap items-center gap-3">
            <IconButton
              aria-label="Uji aksi menu"
              title="Uji aksi menu"
              variant="outline"
              onClick={registerClick}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </IconButton>

            <IconButton
              aria-label="Uji aksi tutup"
              title="Uji aksi tutup"
              variant="secondary"
              onClick={registerClick}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </IconButton>

            <IconButton
              aria-label="Aksi tidak tersedia"
              variant="outline"
              disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m9 5 7 7-7 7" />
              </svg>
            </IconButton>
          </div>

          <p className="text-caption text-muted-foreground">
            Ikon menu dan tutup hanya menambah penghitung untuk pengujian.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="card-title">
        <Container className="space-y-6">
          <h2 id="card-title">Card dan composition</h2>

          <div className="grid min-w-0 gap-6 md:grid-cols-2">
            <Card className="space-y-4">
              <Badge variant="secondary">DEFAULT</Badge>
              <h3>Kartu konten</h3>
              <p>
                Badge, heading, paragraf, dan Button bisa digabungkan tanpa
                membuat komponen kartu baru.
              </p>
              <Button size="sm" onClick={registerClick}>
                Uji aksi
              </Button>
            </Card>

            <Card variant="elevated" className="space-y-4">
              <Badge variant="highlight">ELEVATED</Badge>
              <h3>Penekanan ringan</h3>
              <p>
                Shadow kecil memberikan lapisan visual tanpa dekorasi
                berlebihan.
              </p>
            </Card>

            <Card variant="outlined" className="space-y-4">
              <Badge variant="accent">OUTLINED</Badge>
              <h3>Batas yang jelas</h3>
              <p>
                Border lebih kuat dapat digunakan untuk konten yang membutuhkan
                pemisahan visual.
              </p>
            </Card>

            <Card
              variant="interactive"
              href="#hasil-demo"
              className="space-y-4"
            >
              <Badge variant="primary">INTERACTIVE</Badge>
              <h3>Lihat hasil pengujian tombol</h3>
              <p>
                Gunakan Tab lalu Enter, atau klik kartu ini untuk menuju
                penghitung aksi.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section background="surface" aria-labelledby="badge-title">
        <Container className="space-y-6">
          <h2 id="badge-title">Badge</h2>

          <div className="flex flex-wrap items-center gap-3">
            {badgeExamples.map(({ variant, label }) => (
              <Badge key={label} variant={variant}>
                {label}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="sm" background="muted" aria-labelledby="reading-title">
        <Container width="reading" className="space-y-4">
          <h2 id="reading-title">Section dan reading container</h2>

          <p>
            Area ini menggunakan lebar baca sekitar 65 karakter. Paragraf
            mengikuti typography body dari STEP D. Pada layar kecil, lebar
            mengikuti viewport dengan padding horizontal yang konsisten.
          </p>

          <p className="text-caption text-muted-foreground">
            Bagian ini memakai spacing small. Bagian sebelumnya memakai spacing
            medium, sedangkan pembuka memakai spacing large.
          </p>
        </Container>
      </Section>
      <NavbarTestSections />
    </main>
  );
}
