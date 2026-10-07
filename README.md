# BEDAH INFORMASI!

Platform pembelajaran interaktif Bahasa Indonesia untuk Fase F / kelas XII. Materi bersumber dari modul Hanunah Rizqi Mumtaz, SMA Muhammadiyah 2 Tangerang, di `content/sources/Materi_Ajar_Digital_Fakta_Opini_Kelas_XII.docx`. Konten terstruktur ada di `src/content/module.ts`.

Homepage mencakup materi, game enam pernyataan, checklist verifikasi, simulasi delapan klaim karhutla, empat level latihan, evaluasi, refleksi, rangkuman, dan glosarium. Angka karhutla merupakan bahan simulasi modul, bukan laporan kondisi terkini. Foundation UI dan demo lama tetap dipertahankan.

Progress dan jawaban disimpan di localStorage tanpa akun/backend. Data tidak berpindah perangkat dan dapat hilang jika data browser dihapus. Ketika storage diblokir, aktivitas tetap berjalan selama halaman terbuka. Jawaban terbuka dinilai dengan rubrik dan diskusi bersama guru; nilai otomatis hanya untuk aktivitas pilihan.

## Pemeriksaan aplikasi

```sh
npm run lint
npm run typecheck
npm run build
```

## Modul PDF

Tambahkan PDF asli hasil ekspor modul ke `public/assets/modul-ajar.pdf`. Viewer menyediakan download dan tab baru ketika file tersedia. Jika belum ada, pesan fallback tampil tanpa membuat PDF pengganti.

## Uji browser

Menggunakan Microsoft Edge terpasang, dengan alat uji diisolasi dari dependency aplikasi:

```sh
npm install --prefix .audit --no-save --package-lock=false playwright @axe-core/playwright
npm run start -- --hostname 127.0.0.1 --port 3210
# Pada terminal lain:
node tests/smoke.mjs
```

Menguji sembilan viewport 320–1440px, interaksi belajar, keyboard/dialog, persistensi dan pemulihan storage, reduced motion, serta accessibility axe. Screenshot berada di `.audit/screenshots/`. Gunakan environment variable `TEST_URL` untuk alamat lain.

## Framework

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
