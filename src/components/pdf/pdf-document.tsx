"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy, type RenderTask } from "pdfjs-dist";
import { IconButton } from "@/components/ui/icon-button";

GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

function PdfPage({ pdf, number, width, zoom, root, onError }: {
  pdf: PDFDocumentProxy; number: number; width: number; zoom: number;
  root: RefObject<HTMLDivElement | null>; onError: () => void;
}) {
  const container = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [ratio, setRatio] = useState(1.414);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { root: root.current, rootMargin: "400px" });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, [root]);

  useEffect(() => {
    if (!visible || !width) return;
    let cancelled = false;
    let task: RenderTask | null = null;
    async function render() {
      try {
        const page = await pdf.getPage(number);
        if (cancelled || !canvas.current) return;
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: width * zoom / base.width });
        const density = Math.min(window.devicePixelRatio || 1, 2);
        setRatio(base.height / base.width);
        canvas.current.width = Math.ceil(viewport.width * density);
        canvas.current.height = Math.ceil(viewport.height * density);
        task = page.render({ canvas: canvas.current, viewport, transform: [density, 0, 0, density, 0, 0] });
        await task.promise;
        if (cancelled) return;
        const content = await page.getTextContent();
        if (!cancelled) setText(content.items.map(item => "str" in item ? item.str : "").join(" "));
      } catch (error) {
        if (!cancelled && !(error instanceof Error && error.name === "RenderingCancelledException")) onError();
      }
    }
    void render();
    return () => { cancelled = true; task?.cancel(); };
  }, [pdf, number, width, zoom, visible, onError]);

  return <section ref={container} aria-label={`Halaman ${number} dari ${pdf.numPages}`} className="pdf-page" style={{ width: width * zoom, aspectRatio: `${1 / ratio}` }}>
    <canvas ref={canvas} aria-hidden="true" className="block h-full w-full" />
    <p className="sr-only">{text || `Halaman ${number} sedang dimuat.`}</p>
    <span className="pdf-page-number" aria-hidden="true">{number} / {pdf.numPages}</span>
  </section>;
}

export default function PdfDocument({ url, onError }: { url: string; onError: () => void }) {
  const region = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [width, setWidth] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const loading = getDocument({ url });
    void loading.promise.then(document => { if (!cancelled) setPdf(document); }).catch(() => { if (!cancelled) onError(); });
    return () => { cancelled = true; void loading.destroy().catch(() => {}); };
  }, [url, onError]);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const size = entries[0]?.contentRect.width ?? 0;
      setWidth(Math.max(1, Math.min(size - 24, 900)));
    });
    if (region.current) observer.observe(region.current);
    return () => observer.disconnect();
  }, []);

  return <div className="pdf-document">
    <div className="pdf-toolbar flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-muted px-3 py-2">
      <p className="text-caption" role="status">{pdf ? `${pdf.numPages} halaman · PDF asli` : "Memuat dokumen…"}</p>
      <div className="flex items-center gap-2" aria-label="Zoom dokumen">
        <IconButton aria-label="Perkecil PDF" size="sm" variant="outline" disabled={zoom <= 0.75} onClick={() => setZoom(current => Math.max(0.75, current - 0.25))}>−</IconButton>
        <span className="w-11 text-center text-caption">{Math.round(zoom * 100)}%</span>
        <IconButton aria-label="Perbesar PDF" size="sm" variant="outline" disabled={zoom >= 2} onClick={() => setZoom(current => Math.min(2, current + 0.25))}>+</IconButton>
      </div>
    </div>
    <div ref={region} tabIndex={0} role="region" aria-label="Dokumen PDF modul ajar" className="pdf-scroll" onPointerDown={event => event.currentTarget.focus({ preventScroll: true })}>
      {pdf && width > 0 ? Array.from({ length: pdf.numPages }, (_, index) => <PdfPage key={index} pdf={pdf} number={index + 1} width={width} zoom={zoom} root={region} onError={onError} />) : <p className="p-5 text-caption">Menyiapkan halaman PDF…</p>}
    </div>
  </div>;
}
