// Shared identifiers for the business document template library.
// One template per distinct search intent — variants such as "printable", "editable" or "custom-branded"
// are features of every template, not separate pages.

export type DocumentKind = 'sales-invoice' | 'purchase-order' | 'commercial-invoice';

export const CATEGORY_SLUGS: Record<DocumentKind, string> = {
  'sales-invoice': 'sales-invoice-templates',
  'purchase-order': 'purchase-order-templates',
  'commercial-invoice': 'commercial-invoice-templates',
};

export const TEMPLATE_IDS = [
  // Sales invoices
  'gst-tax-invoice',
  'simple-sales-invoice',
  'service-invoice',
  'wholesale-invoice',
  // Purchase orders
  'gst-purchase-order',
  'manufacturing-purchase-order',
  'international-purchase-order',
  // Commercial invoices
  'export-commercial-invoice',
  'courier-commercial-invoice',
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const TEMPLATE_KIND: Record<TemplateId, DocumentKind> = {
  'gst-tax-invoice': 'sales-invoice',
  'simple-sales-invoice': 'sales-invoice',
  'service-invoice': 'sales-invoice',
  'wholesale-invoice': 'sales-invoice',
  'gst-purchase-order': 'purchase-order',
  'manufacturing-purchase-order': 'purchase-order',
  'international-purchase-order': 'purchase-order',
  'export-commercial-invoice': 'commercial-invoice',
  'courier-commercial-invoice': 'commercial-invoice',
};

/** Public URL of a template page, e.g. /sales-invoice-templates/gst-tax-invoice */
export function templateHref(id: TemplateId): string {
  return `/${CATEGORY_SLUGS[TEMPLATE_KIND[id]]}/${id}`;
}

export function categoryHref(kind: DocumentKind): string {
  return `/${CATEGORY_SLUGS[kind]}`;
}

export function templatesOf(kind: DocumentKind): TemplateId[] {
  return TEMPLATE_IDS.filter((id) => TEMPLATE_KIND[id] === kind);
}
