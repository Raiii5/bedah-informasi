import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BEDAH INFORMASI!",
    template: "%s | BEDAH INFORMASI!",
  },
  description:
    "Membedah Fakta, Opini, dan Keabsahan Data dalam Artikel Ilmiah Populer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col">
        <a href="#konten-utama" className="skip-link">Lewati ke konten utama</a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
