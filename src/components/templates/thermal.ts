// Thermal receipt printing (58 mm / 80 mm rolls). Builds a narrow, receipt-style version of the invoice and
// prints it from a hidden iframe, so the A4 layout and the page itself are untouched. Works with any thermal
// printer that has a system print driver (USB, Bluetooth or network, including Android print services).
import type { DocumentData } from '@/lib/templates/model';
import type { DocumentTotals } from '@/lib/templates/calc';
import { formatMoney, formatNumberMinor } from '@/lib/templates/currencies';

export type RollWidth = 58 | 80;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const dmy = (iso: string) => (/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso.split('-').reverse().join('-') : iso);

const pct = (bp: number) => `${(bp / 100).toFixed(2).replace(/\.?0+$/, '')}%`;

export function thermalHtml(data: DocumentData, t: DocumentTotals, width: RollWidth): string {
  const cur = t.currency;
  const money = (m: number) => formatMoney(m, cur);
  const num = (m: number) => formatNumberMinor(m, cur);
  const gst = t.cgst + t.sgst + t.igst > 0;
  const s = data.seller, b = data.buyer;
  const row = (l: string, r: string, cls = '') => `<div class="row ${cls}"><span>${l}</span><span>${r}</span></div>`;

  const items = t.lines.map((ln) => {
    const it = data.items[ln.index];
    if (!it || !it.description.trim()) return '';
    const qty = `${esc(it.qty || '1')}${it.unit ? ' ' + esc(it.unit) : ''}`;
    const meta = [it.code ? `HSN ${esc(it.code)}` : '', gst && ln.rateBp ? `GST ${pct(ln.rateBp)}` : '', ln.discount ? `Disc ${num(ln.discount)}` : '']
      .filter(Boolean).join(' · ');
    return `<div class="item">
      <div class="desc">${esc(it.description)}</div>
      ${row(`${qty} × ${num(ln.price)}`, num(gst ? ln.taxable : ln.total))}
      ${meta ? `<div class="meta">${meta}</div>` : ''}
    </div>`;
  }).join('');

  const totals = [
    row('Subtotal', num(t.subtotal)),
    t.charges ? row('Charges', num(t.charges)) : '',
    t.cgst ? row('CGST', num(t.cgst)) : '',
    t.sgst ? row('SGST/UTGST', num(t.sgst)) : '',
    t.igst ? row('IGST', num(t.igst)) : '',
    !gst && t.tax ? row(t.taxLabel || 'Tax', num(t.tax)) : '',
    t.roundOff ? row('Round off', num(t.roundOff)) : '',
  ].join('');

  const title = data.meta.title || (gst ? 'Tax Invoice' : 'Bill');
  const upi = data.bank.upi?.trim();
  const note = (data.text.notes || data.text.terms || '').trim();
  const body = width === 58 ? 48 : 72; // printable width in mm
  const font = width === 58 ? 10 : 11.5;

  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)} ${esc(data.meta.number)}</title>
<style>
  @page { size: ${width}mm auto; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #fff; color: #000; }
  body { width: ${body}mm; margin: 0 auto; padding: 3mm 0 6mm; font: ${font}px/1.35 "Courier New", ui-monospace, monospace; }
  .c { text-align: center; } .b { font-weight: 700; } .big { font-size: 1.25em; }
  .hr { border-top: 1px dashed #000; margin: 2mm 0; }
  .row { display: flex; justify-content: space-between; gap: 2mm; }
  .row span:last-child { text-align: right; white-space: nowrap; }
  .item { margin: 1.2mm 0; } .desc { font-weight: 700; word-break: break-word; }
  .meta, .small { font-size: 0.85em; }
  .total { font-weight: 700; font-size: 1.2em; margin-top: 1mm; }
  p { margin: 0.6mm 0; word-break: break-word; }
</style></head><body>
  <p class="c b big">${esc(s.name || 'Your business')}</p>
  ${s.address ? `<p class="c small">${esc(s.address).replace(/\n/g, '<br>')}</p>` : ''}
  ${s.taxId ? `<p class="c small">GSTIN: ${esc(s.taxId)}</p>` : ''}
  ${s.phone ? `<p class="c small">Ph: ${esc(s.phone)}</p>` : ''}
  <div class="hr"></div>
  <p class="c b">${esc(title.toUpperCase())}</p>
  ${row(`No: ${esc(data.meta.number || '-')}`, dmy(data.meta.issueDate || ''))}
  ${b.name ? `<p>To: ${esc(b.name)}</p>` : ''}
  ${b.taxId ? `<p class="small">GSTIN: ${esc(b.taxId)}</p>` : ''}
  ${gst && t.supply ? `<p class="small">${t.supply === 'inter' ? 'Inter-state: IGST' : 'Intra-state: CGST + SGST'}</p>` : ''}
  <div class="hr"></div>
  ${items || '<p class="small">No items</p>'}
  <div class="hr"></div>
  ${totals}
  ${row('TOTAL', money(t.total), 'total')}
  ${t.words ? `<p class="small">${esc(t.words)}</p>` : ''}
  <div class="hr"></div>
  ${upi ? `<p class="c small">Pay by UPI: ${esc(upi)}</p>` : ''}
  ${note ? `<p class="c small">${esc(note.slice(0, 240))}</p>` : ''}
  <p class="c">Thank you!</p>
</body></html>`;
}

/** Prints the receipt through the system print dialog; pick the thermal printer there. */
export function printThermal(data: DocumentData, totals: DocumentTotals, width: RollWidth): void {
  const frame = document.createElement('iframe');
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  if (!doc || !frame.contentWindow) { frame.remove(); return; }
  doc.open();
  doc.write(thermalHtml(data, totals, width));
  doc.close();
  const win = frame.contentWindow;
  const cleanup = () => setTimeout(() => frame.remove(), 500);
  win.addEventListener('afterprint', cleanup);
  // Give the document a moment to lay out before opening the dialog.
  setTimeout(() => { win.focus(); win.print(); setTimeout(cleanup, 60000); }, 150);
}
