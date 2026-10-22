// Renders every template's sample to a real PDF with @react-pdf/renderer (in Node) and checks the
// output: valid PDF header, page size in points, and that long documents paginate.
import fs from 'node:fs';
import path from 'node:path';
import { renderToBuffer } from '@react-pdf/renderer';
import { describe, expect, it } from 'vitest';
import { buildPdfElement } from '@/components/templates/pdf/PdfDocument';
import { registerPdfFonts } from '@/components/templates/pdf/fonts';
import { TEMPLATE_IDS } from './ids';
import { emptyLine, type DocumentData, type PaperSize } from './model';
import { PRESETS, SAMPLE_DATE } from './presets';

registerPdfFonts(path.resolve(__dirname, '../../../public/fonts'));

const PNG_1PX = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Set PDF_DUMP_DIR to keep the generated files for manual inspection.
const DUMP = process.env.PDF_DUMP_DIR;

async function render(d: DocumentData, name?: string): Promise<{ buf: Buffer; pages: number; boxes: number[][] }> {
  const buf = await renderToBuffer(buildPdfElement(d));
  if (DUMP && name) fs.writeFileSync(path.join(DUMP, `${name}.pdf`), buf);
  const text = buf.toString('latin1');
  const pages = (text.match(/\/Type\s*\/Page(?![s\w])/g) ?? []).length;
  const boxes = [...text.matchAll(/\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/g)].map((m) => [Number(m[3]), Number(m[4])]);
  return { buf, pages, boxes };
}

const SIZES: [PaperSize, number, number][] = [
  ['A4', 595.28, 841.89],
  ['A5', 419.53, 595.28],
  ['Letter', 612, 792],
  ['Legal', 612, 1008],
];

describe('PDF output', () => {
  for (const id of TEMPLATE_IDS) {
    it(`${id}: renders the sample on A4, A5, Letter and Legal`, async () => {
      for (const [size, w, h] of SIZES) {
        const d = PRESETS[id].sample(SAMPLE_DATE);
        d.paper.size = size;
        const r = await render(d, `${id}-${size}`);
        if (size === 'A4') expect(r.pages, `${id} sample should fit one A4 page`).toBe(1);
        expect(r.buf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
        expect(r.pages).toBeGreaterThanOrEqual(1);
        expect(r.boxes.length).toBe(r.pages);
        for (const [bw, bh] of r.boxes) {
          expect(bw).toBeCloseTo(w, 1);
          expect(bh).toBeCloseTo(h, 1);
        }
      }
    }, 60000);
  }

  it('all three layouts, serif font, landscape, custom size and a logo', async () => {
    for (const layout of ['classic', 'modern', 'compact'] as const) {
      const d = PRESETS['gst-tax-invoice'].sample(SAMPLE_DATE);
      d.branding = { ...d.branding, layout, font: layout === 'modern' ? 'serif' : 'sans' };
      d.logo = PNG_1PX;
      d.paper.orientation = 'landscape';
      const r = await render(d, `layout-${layout}`);
      expect(r.boxes[0][0]).toBeCloseTo(841.89, 1);
      expect(r.boxes[0][1]).toBeCloseTo(595.28, 1);
    }
    const c = PRESETS['courier-commercial-invoice'].sample(SAMPLE_DATE);
    c.paper = { ...c.paper, size: 'Custom', customWmm: '100', customHmm: '150' };
    const rc = await render(c);
    expect(rc.boxes[0][0]).toBeCloseTo(283.46, 1);
    expect(rc.boxes[0][1]).toBeCloseTo(425.2, 1);
  }, 60000);

  it('150 line items paginate over several pages (A4 and A5)', async () => {
    const make = (n: number, size: PaperSize) => {
      const d = PRESETS['wholesale-invoice'].sample(SAMPLE_DATE);
      d.paper.size = size;
      d.items = Array.from({ length: n }, (_, i) => emptyLine({
        code: `SKU-${i + 1}`, description: `Item number ${i + 1} with a reasonably long description that wraps`, code2: '3401',
        qty: String((i % 9) + 1), unit: 'BOX', unitPrice: `${100 + i}.50`, discountPct: i % 4 ? '' : '2', taxRatePct: i % 2 ? '18' : '5',
      }));
      return d;
    };
    const short = await render(make(3, 'A4'), 'short-3');
    const long = await render(make(150, 'A4'), 'long-150-A4');
    const longA5 = await render(make(150, 'A5'), 'long-150-A5');
    expect(short.pages).toBe(1);
    expect(long.pages).toBeGreaterThan(3);
    expect(longA5.pages).toBeGreaterThan(long.pages);
    // eslint-disable-next-line no-console
    console.log(`150 items: A4 ${long.pages} pages, A5 ${longA5.pages} pages; sample size ${short.buf.length} bytes`);
  }, 120000);
});
