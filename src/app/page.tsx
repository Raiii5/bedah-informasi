import { moduleInfo, summary } from "@/content/module";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { HeroVisual } from "@/components/hero/hero-visual";
import { LearningJourney } from "@/components/learning/learning-journey";
import { SectionHeading } from "@/components/learning/section-heading";
import { Aperception } from "@/components/learning/aperception";
import { MaterialTabs } from "@/components/learning/material-tabs";
import { VerificationLab } from "@/components/learning/verification-lab";
import { FactGame } from "@/components/quiz/fact-game";
import { EditorialBoard } from "@/components/editorial/editorial-board";
import { PracticeWorkshop } from "@/components/learning/practice-workshop";
import { EvaluationQuiz } from "@/components/evaluation/evaluation-quiz";
import { ReflectionChecklist } from "@/components/reflection/reflection-checklist";
import { SearchableGlossary } from "@/components/glossary/searchable-glossary";
import { LearningPersistenceText, PresentationModeNotice } from "@/components/learning/presentation-mode-notice";

export default function Home() {
  return <>
    <main id="konten-utama" tabIndex={-1} className="min-w-0 flex-1">
      <PresentationModeNotice />
      <Section id="beranda" tabIndex={-1} aria-labelledby="hero-title" className="hero-section relative overflow-hidden" spacing="lg">
        <Container className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2"><Badge variant="secondary"><span className="size-2 rounded-full bg-link" />BAHASA INDONESIA</Badge><span className="text-caption text-muted-foreground">Fase F · Kelas XII</span></div>
            <h1 id="hero-title" className="hero-headline"><span className="block">BEDAH</span><span className="block">INFORMASI<span className="hero-exclamation">!</span></span></h1>
            <p className="max-w-xl text-body text-muted-foreground">{moduleInfo.subtitle}</p>
            <p className="font-semibold">Baca. Periksa. Bandingkan. Simpulkan.</p>
            <div className="flex"><a href="#materi" className="action-link w-full justify-center bg-primary sm:w-auto">Mulai Belajar <Icon name="arrow" /></a></div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-caption text-muted-foreground"><span className="inline-flex items-center gap-2"><Icon name="book" className="size-4" />6 bab pembelajaran</span><span className="inline-flex items-center gap-2"><Icon name="chart" className="size-4" />{moduleInfo.duration}</span><span className="inline-flex items-center gap-2"><Icon name="check" className="size-4" />Belajar tanpa login</span></div>
          </div>
          <HeroVisual />
        </Container>
      </Section>

      <Section aria-labelledby="journey-title" spacing="sm" className="border-y border-border bg-surface">
        <Container><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><span className="eyebrow">PETA PERJALANANMU</span><h2 id="journey-title" className="mt-2">Dari pembaca jadi pemeriksa.</h2></div><p className="text-caption text-muted-foreground">Satu langkah kecil. Cara berpikir yang lebih kritis.</p></div><LearningJourney /></Container>
      </Section>

      <Section aria-labelledby="goals-title">
        <Container><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><Badge variant="primary">TUJUAN PEMBELAJARAN</Badge><h2 id="goals-title" className="mt-4 text-heading-1">Bukan sekadar tahu.<br />Bisa memberi alasan.</h2><p className="mt-4 text-muted-foreground">Di akhir perjalanan, kamu bisa membaca artikel dengan lebih teliti dan mengambil putusan berdasarkan bukti.</p></div><div className="grid gap-4 sm:grid-cols-2">{moduleInfo.goals.map((goal, i) => <div key={goal} className={`rounded-3xl p-6 ${i === 0 ? "bg-secondary" : "bg-highlight"}`}><span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-surface font-mono font-bold">0{i + 1}</span><h3 className="mb-3">{i === 0 ? "Analisis dengan kritis" : "Evaluasi dengan logis"}</h3><p className="text-body">{goal}</p></div>)}</div></div>
          <details className="mt-8 rounded-2xl border border-border bg-surface p-5"><summary className="cursor-pointer text-body font-semibold">Peta konsep · bagaimana semuanya terhubung?</summary><ol className="mt-5 flex flex-wrap items-center gap-3 text-caption">{["Artikel ilmiah populer", "Struktur & bahasa", "Fakta vs. opini", "Keabsahan data", "Verifikasi digital", "Putusan kelayakan"].map((item, i) => <li key={item} className="inline-flex items-center gap-3"><span className="rounded-lg bg-muted px-3 py-2">{item}</span>{i < 5 && <Icon name="arrow" className="size-4" />}</li>)}</ol></details>
        </Container>
      </Section>

      <Section id="apersepsi" aria-labelledby="aperception-title" background="surface" className="border-y border-border">
        <Container><Badge variant="accent">APERSEPSI · JANGAN TERTIPU JUDUL</Badge><h2 id="aperception-title" className="mt-4 max-w-3xl text-heading-1">“Benarkah 80% Remaja Mengalami Insomnia karena TikTok?”</h2><p className="mb-8 mt-4 max-w-2xl text-muted-foreground">Judul latihan dari modul. Sebelum percaya atau membagikan, ajukan tiga pertanyaan ini.</p><Aperception /></Container>
      </Section>

      <Section id="materi" tabIndex={-1} aria-label="Materi pembelajaran">
        <Container><SectionHeading label="BELAJAR DULU, BEDAH KEMUDIAN" title="Bekal untuk membaca lebih dalam." description="Empat bab, satu kebiasaan baru: selalu memeriksa bukti. Pilih bab, buka penjelasannya, lalu tandai setelah dipelajari." /><MaterialTabs /></Container>
      </Section>

      <Section id="tantangan" aria-label="Game fakta dan opini" background="muted">
        <Container><div className="grid items-start gap-8 lg:grid-cols-[0.65fr_1.35fr]"><div><SectionHeading label="MINI CHALLENGE" color="accent" title="Temukan Jenis Pernyataan" description="Fakta, opini, atau perlu konteks? Uji insting membacamu dengan enam pernyataan dari modul." /><div className="hidden rounded-2xl bg-highlight p-5 lg:block"><Icon name="quote" className="mb-3 size-7" /><p className="text-caption">Opini tidak selalu salah. Fakta pun tetap perlu diverifikasi.</p></div></div><FactGame /></div></Container>
      </Section>

      <Section id="verifikasi" aria-label="Laboratorium verifikasi">
        <Container><SectionHeading label="CLAIM CHECK LAB" color="primary" title="Jangan berhenti di ‘katanya’." description="Uji sumber, waktu, konteks, metode, dan konfirmasi. Kenali juga seberapa kuat sumber yang kamu gunakan." /><VerificationLab /></Container>
      </Section>

      <Section id="editorial" aria-label="Simulasi Editorial Board" className="editorial-section border-y border-border" background="surface">
        <Container><div className="mb-8 flex flex-wrap items-start justify-between gap-5"><SectionHeading label="BAB 05 · EDITORIAL BOARD" color="accent" title="Sekarang, kamu yang jadi editor." description="Satu artikel. Delapan klaim. Baca naskah, tentukan kategori dan tindakan, lalu berikan putusan redaksi disertai alasan." /><span className="rounded-full border border-foreground bg-primary px-4 py-2 text-caption font-semibold">Bukan asal setuju. Harus ada bukti.</span></div><EditorialBoard /></Container>
      </Section>

      <Section id="latihan" tabIndex={-1} aria-label="Latihan bertahap">
        <Container><SectionHeading label="BAB 06 · LATIHAN BERTAHAP" title="Naik level, satu alasan setiap kali." description={<>Mulai dari identifikasi, jelaskan alasan, lakukan verifikasi mini, lalu pecahkan kasus HOTS. <LearningPersistenceText normal="Jawabanmu tersimpan otomatis." demo="Jawabanmu hanya berlaku selama presentasi." /></>} /><PracticeWorkshop /></Container>
      </Section>

      <Section id="evaluasi" tabIndex={-1} aria-label="Evaluasi sumatif" background="muted">
        <Container><div className="grid items-start gap-8 lg:grid-cols-[0.65fr_1.35fr]"><div><SectionHeading label="CHECKPOINT" color="primary" title="Seberapa tajam cara bacamu?" description="Lima soal evaluasi sumatif dari modul. Kerjakan mandiri, lihat pembahasan, dan coba kembali bila perlu." /><ul className="space-y-3 text-caption text-muted-foreground">{["Tidak ada timer. Pikirkan alasanmu.", "Setiap jawaban benar bernilai 20."].map(item => <li key={item} className="flex items-start gap-2"><Icon name="check" className="mt-0.5 size-4 shrink-0" />{item}</li>)}<li className="flex items-start gap-2"><Icon name="check" className="mt-0.5 size-4 shrink-0" /><LearningPersistenceText normal="Hasil tersimpan di perangkat ini." demo="Hasil hanya berlaku selama presentasi." /></li></ul></div><EvaluationQuiz /></div></Container>
      </Section>

      <Section id="refleksi" tabIndex={-1} aria-label="Refleksi peserta didik">
        <Container><SectionHeading label="BERHENTI SEJENAK, LIHAT KEMAJUANMU" color="highlight" title="Apa yang sudah kamu kuasai?" description="Tidak harus langsung sempurna. Kenali kemampuanmu dan tentukan bagian yang masih perlu dilatih." /><ReflectionChecklist /></Container>
      </Section>

      <Section aria-labelledby="summary-title" background="surface" className="border-y border-border">
        <Container><div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><Badge variant="secondary">RANGKUMAN</Badge><h2 id="summary-title" className="mt-4 text-heading-1">Bawa pulang<br />lima kebiasaan ini.</h2></div><ol className="space-y-4">{summary.map((item, i) => <li key={item} className="flex items-start gap-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-caption font-bold">0{i + 1}</span><p className="text-body">{item}</p></li>)}</ol></div></Container>
      </Section>

      <Section id="glosarium" aria-label="Glosarium">
        <Container><SectionHeading label="KAMUS KECIL PEMBACA KRITIS" color="secondary" title="Istilah baru? Cari di sini." description="Sepuluh istilah penting dari modul untuk menemani proses membacamu." /><SearchableGlossary /></Container>
      </Section>

      <Section spacing="sm"><Container><div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-6 sm:p-9 md:flex-row md:items-center"><div><h2>Judul boleh menarik.<br />Buktinya harus lebih menarik.</h2><p className="mt-3 text-body">Baca kritis bukan berarti selalu curiga — tetapi selalu siap memeriksa bukti.</p></div><a href="#materi" className="action-link shrink-0 bg-foreground text-surface">Kembali belajar <Icon name="arrow" /></a></div></Container></Section>
    </main>
    <footer className="mt-8 border-t border-border bg-surface py-8"><Container><div className="flex flex-col justify-between gap-6 md:flex-row"><div><a href="#beranda" className="inline-flex min-h-11 items-center gap-2 font-bold"><span className="flex size-8 items-center justify-center rounded-lg bg-primary">!</span>BEDAH INFORMASI!</a><p className="mt-2 text-caption text-muted-foreground">Baca. Periksa. Bandingkan. Simpulkan.</p></div><div className="max-w-xl text-caption text-muted-foreground"><p>Materi ajar: {moduleInfo.author}</p><p>{moduleInfo.school} · Bahasa Indonesia · Fase F / Kelas XII</p><p className="mt-2">Isi pembelajaran bersumber dari modul ajar digital. <LearningPersistenceText normal="Progress dan jawaban disimpan pada browser perangkat ini, tanpa akun." demo="Progress dan jawaban hanya berlaku selama presentasi, tanpa mengubah data belajar normal." /></p></div></div></Container></footer>
  </>;
}
