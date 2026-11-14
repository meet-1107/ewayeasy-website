import { describe, expect, it } from 'vitest';
import { computeDocument } from '@/lib/templates/calc';
import { emptyDocument } from '@/lib/templates/model';
import { thermalHtml } from './thermal';
import { waMessage, waNumber } from './share';

function sampleInvoice() {
  const d = emptyDocument('gst-tax-invoice');
  d.tax = { ...d.tax, mode: 'india-gst' };
  d.seller = { ...d.seller, name: 'Sample Pipes', taxId: '24ABCDE1234F1Z6', stateCode: '24' };
  d.buyer = { ...d.buyer, name: 'Sample Traders', taxId: '24PQRSX5678K1Z4', stateCode: '24', phone: '98765 43210' };
  d.meta = { ...d.meta, number: 'INV-1', issueDate: '2026-11-14', placeOfSupply: '24' };
  d.items = [{ ...d.items[0], description: 'PVC pipe <110 mm>', code: '3917', qty: '2', unit: 'PCS', unitPrice: '500', taxRatePct: '18' }];
  return d;
}

describe('thermal receipt', () => {
  it('builds an 80 mm receipt with GST split and escaped text', () => {
    const d = sampleInvoice();
    const html = thermalHtml(d, computeDocument(d), 80);
    expect(html).toContain('size: 80mm auto');
    expect(html).toContain('Sample Pipes');
    expect(html).toContain('PVC pipe &lt;110 mm&gt;');
    expect(html).toContain('CGST');
    expect(html).toContain('SGST/UTGST');
    expect(html).not.toContain('IGST</span>');
    expect(html).toContain('14-11-2026');
  });

  it('narrows the body for 58 mm rolls', () => {
    const d = sampleInvoice();
    expect(thermalHtml(d, computeDocument(d), 58)).toContain('width: 48mm');
  });
});

describe('WhatsApp share helpers', () => {
  it('adds the India code to 10-digit mobiles and rejects junk', () => {
    expect(waNumber('98765 43210')).toBe('919876543210');
    expect(waNumber('+91 98765-43210')).toBe('919876543210');
    expect(waNumber('012345')).toBeNull();
  });

  it('writes a short message with number and total', () => {
    const d = sampleInvoice();
    const msg = waMessage(d, computeDocument(d));
    expect(msg).toContain('INV-1');
    expect(msg).toContain('Sample Pipes');
    expect(msg).toMatch(/Total: ₹1,180/);
  });
});
