// Server-render checks for the template UI (static export renders these at build time),
// plus the legacy-data import used when the old invoice tools are retired.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import DocumentPreview from '@/components/templates/DocumentPreview';
import TemplateEditor from '@/components/templates/TemplateEditor';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { computeDocument } from './calc';
import { TEMPLATE_IDS } from './ids';
import { fromLegacyInvoice, quotationToTaxInvoice } from './legacy';
import { PRESETS, SAMPLE_DATE } from './presets';

describe('server rendering', () => {
  it('DocumentPreview renders every sample in every layout without HTML injection', () => {
    for (const id of TEMPLATE_IDS) {
      for (const layout of ['classic', 'modern', 'compact'] as const) {
        const d = PRESETS[id].sample(SAMPLE_DATE);
        d.branding.layout = layout;
        d.items[0].description = '<script>alert(1)</script> & <b>bold</b>';
        const html = renderToStaticMarkup(createElement(DocumentPreview, { data: d }));
        expect(html).toContain(PRESETS[id].title);
        expect(html).not.toContain('<script>');
        expect(html).toContain('&lt;script&gt;');
        expect(html).toContain('<thead');
      }
    }
  });
  it('TemplateThumbnail is an accessible image', () => {
    for (const id of TEMPLATE_IDS) {
      const html = renderToStaticMarkup(createElement(TemplateThumbnail, { templateId: id, className: 'w-full' }));
      expect(html).toMatch(/^<svg[^>]*role="img"[^>]*aria-label="Preview of the /);
      expect(html).toContain('<foreignObject');
    }
  });
  it('TemplateEditor server-renders for every template', () => {
    for (const id of TEMPLATE_IDS) {
      const html = renderToStaticMarkup(createElement(TemplateEditor, { templateId: id }));
      expect(html).toContain('Everything stays in your browser; nothing is uploaded.');
      expect(html).toContain('Download PDF');
    }
  });
});

describe('legacy import', () => {
  const legacy = {
    seller: { name: 'Old Seller', address: 'Rajkot', gstin: '24aaqfs4821k1zu', stateCode: '24' },
    buyer: { name: 'Old Buyer', address: 'Pune', gstin: '', stateCode: '27' },
    shipTo: { name: '', address: '', gstin: '', stateCode: '' },
    shipSame: true, invoiceNo: 'INV-9', invoiceDate: '2026-05-01', dueDate: '', placeOfSupply: '27',
    items: [{ id: 'x', description: 'Pipe', hsn: '3917', qty: '2', unit: 'PCS', rate: '100', discount: '', gst: '18' }],
    roundOff: true, showBank: true, bank: { accountName: 'A', bankName: 'B', accountNo: '1', ifsc: 'X', branch: '' },
    paymentTerms: '30 days', notes: 'n', declaration: 'd', transport: { mode: 'road', vehicleNo: 'GJ01AA1111', transporter: '', distanceKm: '' },
    deliveryTerms: '7 days', warranty: '', freight: '',
  };
  it('maps the old invoice generator draft', () => {
    const d = fromLegacyInvoice(legacy, 'gst-tax-invoice', SAMPLE_DATE)!;
    expect(d.seller.taxId).toBe('24AAQFS4821K1ZU');
    expect(d.meta.number).toBe('INV-9');
    expect(d.sections.bank).toBe(true);
    expect(d.sections.transport).toBe(true);
    const t = computeDocument(d);
    expect(t.supply).toBe('inter');
    expect(t.total).toBe(23600);
  });
  it('wholesale import puts HSN in the HSN column', () => {
    const d = fromLegacyInvoice(legacy, 'wholesale-invoice', SAMPLE_DATE)!;
    expect(d.items[0].code2).toBe('3917');
    expect(d.items[0].code).toBe('');
  });
  it('quotation → tax invoice references the quotation', () => {
    const d = quotationToTaxInvoice({ ...legacy, invoiceNo: 'QT/26-27/0004' }, SAMPLE_DATE, 'INV/26-27/0001')!;
    expect(d.templateId).toBe('gst-tax-invoice');
    expect(d.meta.number).toBe('INV/26-27/0001');
    expect(d.text.notes).toMatch(/^Against quotation QT\/26-27\/0004 dated 01-05-2026\./);
    expect(d.text.notes).toContain('Delivery: 7 days');
  });
  it('ignores junk', () => {
    expect(fromLegacyInvoice('nope', 'gst-tax-invoice', SAMPLE_DATE)).toBeNull();
    expect(fromLegacyInvoice({ foo: 1 }, 'gst-tax-invoice', SAMPLE_DATE)).toBeNull();
  });
});
