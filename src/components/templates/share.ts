// "Share on WhatsApp" for the invoice editor.
// Phones: the Web Share API sends the PDF file itself, so WhatsApp receives the invoice as an attachment.
// Desktops (no file sharing): the PDF is downloaded and WhatsApp opens with a ready message to attach it to.
import type { DocumentData } from '@/lib/templates/model';
import type { DocumentTotals } from '@/lib/templates/calc';
import { formatMoney } from '@/lib/templates/currencies';

/** Short message sent with the invoice. */
export function waMessage(data: DocumentData, totals: DocumentTotals): string {
  const title = data.meta.title || 'Invoice';
  const lines = [
    `${title}${data.meta.number ? ` ${data.meta.number}` : ''}${data.seller.name ? ` from ${data.seller.name}` : ''}`,
    data.meta.issueDate ? `Date: ${data.meta.issueDate.split('-').reverse().join('-')}` : '',
    `Total: ${formatMoney(totals.total, totals.currency)}`,
    data.bank.upi ? `Pay by UPI: ${data.bank.upi}` : '',
  ];
  return lines.filter(Boolean).join('\n');
}

/** WhatsApp number for wa.me: digits only; a 10-digit Indian mobile gets the 91 country code. */
export function waNumber(phone: string): string | null {
  const d = phone.replace(/\D/g, '').replace(/^0+/, '');
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`;
  if (d.length >= 11 && d.length <= 15) return d;
  return null;
}

export type ShareResult = 'shared' | 'cancelled' | 'needs-tap' | 'unsupported';

/** Tries the native share sheet with the PDF. 'needs-tap' means the browser wants a fresh tap (PDF took long). */
export async function sharePdf(file: File, text: string): Promise<ShareResult> {
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (!nav.share || !nav.canShare?.({ files: [file] })) return 'unsupported';
  try {
    await nav.share({ files: [file], title: file.name, text });
    return 'shared';
  } catch (err) {
    const name = (err as DOMException)?.name;
    if (name === 'AbortError') return 'cancelled';
    if (name === 'NotAllowedError') return 'needs-tap';
    throw err;
  }
}

/** Desktop fallback: save the PDF, then open WhatsApp (to the buyer's number if known) with the message. */
export function downloadAndOpenWhatsApp(file: File, text: string, phone: string): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  const n = waNumber(phone);
  const msg = `${text}\n\n(The invoice PDF is attached.)`;
  window.open(`https://wa.me/${n ?? ''}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}
