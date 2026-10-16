// Directory of free tools shown on /tools and in "related tools" lists.

export type ToolCategory = 'gst' | 'eway-bill' | 'invoicing' | 'returns' | 'reference';

export const TOOL_CATEGORIES: { slug: ToolCategory; name: string }[] = [
  { slug: 'gst', name: 'GST calculators' },
  { slug: 'eway-bill', name: 'E-way bill' },
  { slug: 'invoicing', name: 'Invoicing' },
  { slug: 'returns', name: 'GST returns & reconciliation' },
  { slug: 'reference', name: 'Reference' },
];

export type ToolIcon =
  | 'calculator' | 'swap' | 'boxes' | 'check' | 'route' | 'search' | 'invoice' | 'receipt'
  | 'shield' | 'table' | 'compare' | 'hash' | 'clock' | 'percent' | 'map' | 'text' | 'truck' | 'quote' | 'chip';

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: ToolIcon;
  category: ToolCategory;
  keywords: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Add or remove GST at any rate, with discount, CGST/SGST or IGST split and a printable summary.',
    icon: 'calculator',
    category: 'gst',
    keywords: ['gst', 'cgst', 'sgst', 'igst', 'tax', 'rate', '18%', '5%'],
  },
  {
    slug: 'gst-inclusive-exclusive-calculator',
    name: 'GST Inclusive / Exclusive Calculator',
    description: 'Convert a GST-inclusive price to the taxable value, and a taxable value to the inclusive price, side by side.',
    icon: 'swap',
    category: 'gst',
    keywords: ['inclusive', 'exclusive', 'mrp', 'reverse gst', 'back calculation'],
  },
  {
    slug: 'quantity-and-tax-calculator',
    name: 'Quantity and Tax Calculator',
    description: 'Quantity × rate, discount and GST for a line item, plus taxable value and discount-and-tax breakdowns.',
    icon: 'boxes',
    category: 'gst',
    keywords: ['quantity', 'rate', 'discount', 'taxable value', 'line item'],
  },
  {
    slug: 'eway-bill-eligibility-checker',
    name: 'E-Way Bill Eligibility Checker',
    description: 'Answer a few questions to get a preliminary view of whether an e-way bill is likely required for a movement.',
    icon: 'check',
    category: 'eway-bill',
    keywords: ['e-way bill required', '50000', 'threshold', 'job work', 'exemption', 'rule 138'],
  },
  {
    slug: 'distance-calculator',
    name: 'E-Way Bill Validity & Distance Calculator',
    description: 'Work out e-way bill validity days, expiry time and extension window from distance, plus the 10% distance allowance.',
    icon: 'route',
    category: 'eway-bill',
    keywords: ['validity', 'distance', 'expiry', 'odc', 'pin code', 'extension', 'km'],
  },
  {
    slug: 'hsn-code-lookup',
    name: 'HSN Chapter Lookup',
    description: 'Search all HSN chapters (01–98) and SAC chapter 99 by number or keyword to find the right starting point.',
    icon: 'search',
    category: 'reference',
    keywords: ['hsn', 'sac', 'chapter', 'code', 'classification'],
  },
  {
    slug: 'invoice-generator',
    name: 'GST Invoice Generator',
    description: 'Create a GST tax invoice in your browser with automatic CGST/SGST or IGST, and print or save it as PDF.',
    icon: 'invoice',
    category: 'invoicing',
    keywords: ['invoice', 'tax invoice', 'bill', 'pdf', 'gstin', 'print'],
  },
  {
    slug: 'sales-invoice-generator',
    name: 'Sales Invoice Generator',
    description: 'Sales invoice with your own number series, saved product list, shipping address, transport details and drafts.',
    icon: 'receipt',
    category: 'invoicing',
    keywords: ['sales invoice', 'invoice series', 'product catalogue', 'transport', 'vehicle'],
  },
  // ---- Wider GST, invoice and e-way bill toolkit ----
  {
    slug: "gstin-validator",
    name: "GSTIN Validator",
    description: "Check a GSTIN's format and check digit, and decode its state code, PAN and entity number. Single or bulk.",
    icon: "shield",
    category: "reference",
    keywords: ["gstin","gst number","verify","check digit","pan","validation","search taxpayer"],
  },
  {
    slug: "gst-state-code-list",
    name: "GST State Code List",
    description: "All Indian states and union territories with their 2-digit GST state codes, searchable by name or number.",
    icon: "map",
    category: "reference",
    keywords: ["state code","gst state code","place of supply","24 gujarat","27 maharashtra"],
  },
  {
    slug: "multi-item-gst-calculator",
    name: "Multi-Item GST Calculator",
    description: "Several products at different GST rates in one go, with rate-wise tax summary and grand total.",
    icon: "table",
    category: "gst",
    keywords: ["multiple items","mixed rates","bill total","rate wise summary","many products"],
  },
  {
    slug: "gst-interest-calculator",
    name: "GST Interest Calculator",
    description: "Interest on late GST payment under Section 50, day by day, at 18% or 24% per annum.",
    icon: "clock",
    category: "returns",
    keywords: ["interest","late payment","section 50","18%","delay","gstr-3b"],
  },
  {
    slug: "gst-late-fee-calculator",
    name: "GST Late Fee Calculator",
    description: "Late fee for filing GSTR-3B or GSTR-1 after the due date, with nil-return and turnover-based caps.",
    icon: "percent",
    category: "returns",
    keywords: ["late fee","gstr-3b","gstr-1","nil return","penalty","due date"],
  },
  {
    slug: "gstr-1-checker",
    name: "GSTR-1 Preparation Checker",
    description: "Paste your sales register to check GSTINs, duplicates and tax maths, and see B2B / B2CL / B2CS and HSN-wise totals.",
    icon: "check",
    category: "returns",
    keywords: ["gstr-1","gstr1","sales register","b2b","b2cs","hsn summary","outward supplies"],
  },
  {
    slug: "gstr-1-vs-gstr-3b-reconciliation",
    name: "GSTR-1 vs GSTR-3B Reconciliation",
    description: "Compare month-wise taxable value and tax reported in GSTR-1 and GSTR-3B and spot the gaps.",
    icon: "compare",
    category: "returns",
    keywords: ["gstr-1 vs 3b","reconciliation","mismatch","gstr-3b","liability","difference"],
  },
  {
    slug: "gstr-2b-reconciliation",
    name: "Purchase Register vs GSTR-2B Reconciliation",
    description: "Match your purchase register with GSTR-2B by supplier GSTIN and invoice number: matched, mismatched and missing.",
    icon: "compare",
    category: "returns",
    keywords: ["gstr-2b","2b reconciliation","purchase register","itc","input tax credit","gstr2b"],
  },
  {
    slug: "bulk-eway-bill-data-checker",
    name: "Bulk E-Way Bill Data Checker",
    description: "Check invoice rows before bulk e-way bill upload: GSTIN, document age, duplicates, HSN, PIN, distance, vehicle and values.",
    icon: "truck",
    category: "eway-bill",
    keywords: ["bulk e-way bill","excel","csv","json","validation","upload errors","bulk generation"],
  },
  {
    slug: "invoice-vs-eway-bill-checker",
    name: "Invoice vs E-Way Bill Checker",
    description: "Compare invoice details with e-way bill details field by field and catch mismatches before goods move.",
    icon: "compare",
    category: "eway-bill",
    keywords: ["mismatch","invoice vs e-way bill","compare","verification","detention","part a"],
  },
  {
    slug: "einvoice-applicability-checker",
    name: "E-Invoice Applicability Checker",
    description: "Check whether e-invoicing (IRN) applies to your business based on turnover and entity type.",
    icon: "chip",
    category: "invoicing",
    keywords: ["e-invoice","einvoice","irn","5 crore","aato","applicability","irp"],
  },
  {
    slug: "delivery-challan-generator",
    name: "Delivery Challan Generator",
    description: "Create a delivery challan for job work, branch transfer, supply on approval and other non-sale movements. Print or save as PDF.",
    icon: "truck",
    category: "invoicing",
    keywords: ["delivery challan","dc","job work challan","rule 55","challan format","pdf"],
  },
  {
    slug: "quotation-generator",
    name: "Quotation Generator",
    description: "Make a GST quotation with validity date, terms and line-item totals, then print or save it as PDF.",
    icon: "quote",
    category: "invoicing",
    keywords: ["quotation","quote","estimate","proforma","price quote","pdf"],
  },
  {
    slug: "invoice-number-generator",
    name: "Invoice Number Series Generator",
    description: "Build a GST-compliant invoice number series by financial year and check an existing list for duplicates and gaps.",
    icon: "hash",
    category: "invoicing",
    keywords: ["invoice number","invoice series","rule 46","16 characters","financial year","serial number"],
  },
  {
    slug: "amount-in-words-converter",
    name: "Amount in Words Converter",
    description: "Write any rupee amount in words in the Indian system (lakh, crore) for invoices and cheques.",
    icon: "text",
    category: "reference",
    keywords: ["amount in words","number to words","rupees in words","lakh","crore","cheque"],
  },
];

export function getTool(slug: string): Tool {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool: ${slug}`);
  return t;
}

export function toolHref(slug: string) {
  return `/tools/${slug}`;
}

/** Case-insensitive search across name, description and keywords. */
export function filterTools(tools: Tool[], query: string, category: ToolCategory | 'all' = 'all'): Tool[] {
  const q = query.trim().toLowerCase();
  return tools.filter((t) => {
    if (category !== 'all' && t.category !== category) return false;
    if (!q) return true;
    const hay = [t.name, t.description, ...t.keywords].join(' ').toLowerCase();
    return q.split(/\s+/).every((w) => hay.includes(w));
  });
}
