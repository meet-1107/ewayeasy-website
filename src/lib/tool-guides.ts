// Guides and app features linked from each free tool page (tools ↔ guides ↔ app features).
type L = { href: string; label: string };

const G = {
  calcGst: { href: '/blog/how-to-calculate-gst-on-sales-invoice', label: 'How to calculate GST on a sales invoice' },
  cgst: { href: '/blog/cgst-sgst-igst-explained', label: 'CGST, SGST or IGST? Explained' },
  invoiceRules: { href: '/gst-invoice-rules', label: 'GST invoice rules (Rule 46)' },
  threshold: { href: '/blog/eway-bill-limit-50000-threshold-exceptions', label: 'The ₹50,000 e-way bill limit and exceptions' },
  ewbRules: { href: '/eway-bill-rules', label: 'E-way bill rules (Rule 138)' },
  validity: { href: '/eway-bill-validity', label: 'E-way bill validity explained' },
  distance: { href: '/eway-bill-distance-rules', label: 'E-way bill distance rules' },
  hsn: { href: '/blog/hsn-codes-practical-guide', label: 'HSN codes: a practical guide' },
  gstin: { href: '/blog/gstin-verification-what-to-check', label: 'GSTIN verification: what to check' },
  bulk: { href: '/bulk-eway-bill-generation', label: 'Bulk e-way bill generation on the portal' },
  bulkData: { href: '/blog/prepare-invoice-data-for-bulk-processing', label: 'Prepare invoice data for bulk upload' },
  ewbVsInvoice: { href: '/eway-bill-vs-sales-invoice', label: 'E-way bill vs sales invoice' },
  errors: { href: '/blog/avoid-errors-in-invoice-and-transport-details', label: 'Avoid errors in invoice and transport details' },
  challan: { href: '/blog/delivery-challan-vs-tax-invoice', label: 'Delivery challan vs tax invoice' },
  jobWork: { href: '/blog/eway-bill-rules-for-job-work', label: 'E-way bill rules for job work' },
  billReceipt: { href: '/blog/invoice-vs-bill-vs-receipt', label: 'Invoice vs bill vs receipt' },
  guides: { href: '/guides', label: 'All GST and e-way bill guides' },
} satisfies Record<string, L>;

const A = {
  invoice: { href: '/invoice-generator', label: 'Free invoice generator (GST and non-GST)' },
  generate: { href: '/eway-bill-generation', label: 'Generate the e-way bill in the app' },
  pdf: { href: '/invoice-pdf-to-eway-bill', label: 'Invoice PDF to e-way bill in the app' },
  manage: { href: '/eway-bill-management-app', label: 'Update Part B, extend or cancel in the app' },
} satisfies Record<string, L>;

export const TOOL_GUIDES: Record<string, { guides: L[]; app?: L }> = {
  'gst-calculator': { guides: [G.calcGst, G.cgst], app: A.invoice },
  'gst-inclusive-exclusive-calculator': { guides: [G.calcGst, G.cgst], app: A.invoice },
  'quantity-and-tax-calculator': { guides: [G.calcGst, G.invoiceRules], app: A.invoice },
  'multi-item-gst-calculator': { guides: [G.calcGst, G.cgst], app: A.invoice },
  'eway-bill-eligibility-checker': { guides: [G.threshold, G.ewbRules], app: A.generate },
  'distance-calculator': { guides: [G.validity, G.distance], app: A.manage },
  'hsn-code-lookup': { guides: [G.hsn, G.invoiceRules], app: A.invoice },
  'gstin-validator': { guides: [G.gstin, G.invoiceRules], app: A.invoice },
  'gst-state-code-list': { guides: [G.cgst, G.invoiceRules], app: A.invoice },
  'bulk-eway-bill-data-checker': { guides: [G.bulk, G.bulkData] },
  'invoice-vs-eway-bill-checker': { guides: [G.ewbVsInvoice, G.errors], app: A.pdf },
  'einvoice-applicability-checker': { guides: [G.invoiceRules, G.ewbVsInvoice] },
  'delivery-challan-generator': { guides: [G.challan, G.jobWork] },
  'quotation-generator': { guides: [G.billReceipt, G.invoiceRules], app: A.invoice },
  'invoice-number-generator': { guides: [G.invoiceRules, G.billReceipt], app: A.invoice },
  'amount-in-words-converter': { guides: [G.invoiceRules, G.calcGst], app: A.invoice },
};

/** Falls back to the guides hub for tools without a specific mapping (for example the return tools). */
export function toolGuides(slug: string) {
  return TOOL_GUIDES[slug] ?? { guides: [G.guides] };
}
