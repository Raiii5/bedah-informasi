"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const pdfPath = "/assets/modul-ajar.pdf";
const PdfDocument = dynamic(() => import("./pdf-document"), { ssr: false, loading: () => <p role="status" className="p-5 text-caption">Memuat viewer PDF…</p> });
type PdfStatus = "closed" | "checking" | "ready" | "missing" | "error";

export function PdfViewer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const request = useRef<AbortController | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<PdfStatus>("closed");
  const renderError = useCallback(() => setStatus("error"), []);

  useEffect(() => () => {
    request.current?.abort();
    if (previousOverflow.current !== null) {
      document.documentElement.style.overflow = previousOverflow.current;
    }
  }, []);

  async function loadPdf() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus("checking");
    try {
      const response = await fetch(pdfPath, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const isPdf = response.headers.get("content-type")?.toLowerCase().includes("application/pdf");
      setStatus(response.ok && isPdf ? "ready" : response.status === 404 ? "missing" : "error");
    } catch {
      if (!controller.signal.aborted) setStatus("error");
    }
  }

  function open(opener: HTMLButtonElement) {
    if (dialog.current?.open) return;
    trigger.current = opener;
    dialog.current?.showModal();
    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    void loadPdf();
  }

  function closed() {
    request.current?.abort();
    if (previousOverflow.current !== null) {
      document.documentElement.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    setStatus("closed");
    if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
  }

  return (
    <>
      <Button variant="outline" onClick={event => open(event.currentTarget)} aria-haspopup="dialog" aria-controls="pdf-viewer">
        <Icon name="file" />Buka Modul PDF
      </Button>
      <dialog ref={dialog} id="pdf-viewer" aria-labelledby="pdf-title" aria-describedby="pdf-help" className="pdf-dialog" onClose={closed}>
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-4 sm:px-6">
          <div className="min-w-0">
            <span className="eyebrow uppercase">Bahan Belajar</span>
            <h2 id="pdf-title">Modul ajar</h2>
          </div>
          <Button variant="outline" size="sm" aria-label="Tutup viewer PDF" onClick={() => dialog.current?.close()}>
            <Icon name="close" />Tutup
          </Button>
        </header>
        <div className="pdf-body" aria-busy={status === "checking"}>
          {status === "checking" && <p role="status" className="p-6">Memeriksa berkas PDF…</p>}
          {(status === "missing" || status === "error") && (
            <div className="space-y-4 p-5 sm:p-8" role="status">
              <Icon name="file" className="size-10" />
              <h3>{status === "missing" ? "PDF belum tersedia" : "PDF belum dapat dibuka"}</h3>
              <p>{status === "missing" ? "Berkas modul PDF belum tersedia pada website. Kamu tetap bisa mempelajari materi dan mengerjakan aktivitas di halaman ini." : "Berkas PDF belum berhasil dimuat. Periksa koneksimu, lalu coba kembali."}</p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => void loadPdf()}>Coba lagi</Button>
                <Button variant="outline" onClick={() => dialog.current?.close()}>Lanjut belajar <Icon name="arrow" /></Button>
              </div>
            </div>
          )}
          {status === "ready" && (
            <>
              <div className="pdf-actions shrink-0 space-y-2 border-b border-border p-3 sm:px-6">
                <div className="grid gap-2 sm:flex sm:flex-wrap">
                  <a className="action-link bg-primary text-caption" href={pdfPath} download="modul-ajar.pdf">Download PDF <Icon name="file" /></a>
                  <a className="action-link border border-border-strong text-caption" href={pdfPath} target="_blank" rel="noopener noreferrer">Buka di Tab Baru <Icon name="external" /></a>
                </div>
                <p id="pdf-help" className="text-caption text-muted-foreground">Scroll di dalam dokumen. Jika browser tidak menampilkannya, gunakan tab baru atau download.</p>
              </div>
              <PdfDocument url={pdfPath} onError={renderError} />
            </>
          )}
          {status !== "ready" && <p id="pdf-help" className="sr-only">Viewer modul ajar. Gunakan tombol Tutup atau Escape untuk kembali belajar.</p>}
        </div>
      </dialog>
    </>
  );
}
