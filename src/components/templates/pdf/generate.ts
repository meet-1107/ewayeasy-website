// Browser-only PDF generation. Loaded with `await import('./pdf/generate')` when the user clicks
// "Download PDF", so @react-pdf/renderer (~500 KB) is a separate chunk.
import { pdf } from '@react-pdf/renderer';
import type { DocumentData } from '@/lib/templates/model';
import { fileBaseName } from '@/lib/templates/render';
import { registerPdfFonts } from './fonts';
import { buildPdfElement } from './PdfDocument';

/** react-pdf embeds PNG and JPEG only; convert SVG/WebP logos to PNG through a canvas. */
async function pdfSafeLogo(dataUrl: string): Promise<string> {
  if (!dataUrl || /^data:image\/(png|jpe?g);/i.test(dataUrl)) return dataUrl;
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = dataUrl;
    await img.decode();
    const w = img.naturalWidth || 600, h = img.naturalHeight || 300;
    const scale = Math.min(1, 1200 / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  } catch {
    return '';
  }
}

export async function makePdfBlob(data: DocumentData): Promise<Blob> {
  registerPdfFonts('/fonts');
  const logo = await pdfSafeLogo(data.logo);
  return pdf(buildPdfElement({ ...data, logo })).toBlob();
}

export async function downloadPdf(data: DocumentData): Promise<string> {
  const blob = await makePdfBlob(data);
  const name = `${fileBaseName(data)}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return name;
}
