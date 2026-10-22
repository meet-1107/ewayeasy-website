'use client';
/** @jsxRuntime automatic */
// On-screen preview at true paper width scaled to fit its pane, plus the print-only copy of the
// document that is mounted straight under <body> while the browser prints.
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { DocumentData } from '@/lib/templates/model';
import { paperDims } from '@/lib/templates/render';
import DocumentPreview from './DocumentPreview';

const PX_PER_MM = 96 / 25.4;
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function ScaledPreview({ data }: { data: DocumentData }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, height: 0 });
  const dims = paperDims(data.paper);
  const sheetW = dims.widthMm * PX_PER_MM;

  useIsoLayoutEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const scale = Math.min(1, o.clientWidth / sheetW) || 1;
      setBox((b) => {
        const height = Math.ceil(i.offsetHeight * scale);
        return b.scale === scale && b.height === height ? b : { scale, height };
      });
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [sheetW]);

  return (
    <div ref={outer} className="w-full overflow-hidden rounded-xl border border-brand-900/10 bg-white shadow-card" style={{ height: box.height || undefined }}>
      <div ref={inner} style={{ width: `${sheetW}px`, transform: `scale(${box.scale})`, transformOrigin: 'top left' }}>
        <DocumentPreview data={data} mode="screen" />
      </div>
    </div>
  );
}

/** Print stylesheet for the chosen paper: only #ee-print-root is printed, at 1:1. */
export function printCss(data: DocumentData): string {
  const d = paperDims(data.paper);
  return `
@media screen { #ee-print-root { display: none !important; } }
@media print {
  @page { size: ${d.cssSize}; margin: ${d.marginMm}mm; }
  html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; }
  body > *:not(#ee-print-root) { display: none !important; }
  #ee-print-root { display: block !important; width: 100%; }
  #ee-print-root tr, #ee-print-root img { break-inside: avoid; page-break-inside: avoid; }
  #ee-print-root thead { display: table-header-group; }
}`;
}

export function PrintPortal({ data }: { data: DocumentData }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div id="ee-print-root">
      <style>{printCss(data)}</style>
      <DocumentPreview data={data} mode="print" />
    </div>,
    document.body,
  );
}
