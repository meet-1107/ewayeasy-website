// SEO and page copy for the business document template library.
// One entry per category landing page and one per template page. Every string here is rendered on a
// public page, so keep it accurate, general and in plain Indian English (see content/EDITORIAL_BRIEF.md).
// Only claim editor features that exist: editable fields, logo, currency, live totals, PDF download, print,
// A4 / A5 / Letter / Legal paper sizes, all in the browser with nothing uploaded.

import type { DocumentKind, TemplateId } from './ids';

export type Faq = { q: string; a: string };
export type GuideLink = { title: string; href: string };

/** Tool slugs that exist in src/lib/tools.ts. invoice-generator and sales-invoice-generator are retired. */
export type RelatedToolSlug =
  | 'gst-calculator'
  | 'gst-inclusive-exclusive-calculator'
  | 'quantity-and-tax-calculator'
  | 'multi-item-gst-calculator'
  | 'eway-bill-eligibility-checker'
  | 'distance-calculator'
  | 'hsn-code-lookup'
  | 'gstin-validator'
  | 'gst-state-code-list'
  | 'invoice-vs-eway-bill-checker'
  | 'einvoice-applicability-checker'
  | 'delivery-challan-generator'
  | 'quotation-generator'
  | 'invoice-number-generator'
  | 'amount-in-words-converter';

/** A block of guidance text: a heading, paragraphs and optional bullets / internal links. */
export interface GuidanceBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: GuideLink[];
}

/** One row of a "which document do I need" comparison table on a category page. */
export interface ComparisonRow {
  document: string;
  issuedBy: string;
  purpose: string;
  vs: string; // how it differs from this category's document
}

export interface CategoryContent {
  kind: DocumentKind;
  /** Short plural label used in navigation and cards, e.g. "Sales invoice templates". */
  name: string;
  /** Singular document name, e.g. "sales invoice". */
  documentName: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  /** One-line description used when this category is linked from another page. */
  blurb: string;
  /** Show the client-side tag filter (only where the category has 3+ templates). */
  showFilter: boolean;
  /** Category-specific sentence added to the shared "How editing, PDF and printing work" section. */
  editingNote: string;
  whenToUse: {
    heading: string;
    intro: string;
    blocks: GuidanceBlock[];
    comparison: ComparisonRow[];
  };
  faq: Faq[];
  relatedTools: RelatedToolSlug[];
  relatedGuides: GuideLink[];
}

export interface TemplateContent {
  id: TemplateId;
  /** Card / link name, e.g. "GST tax invoice". */
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Who it is for, shown on cards. */
  audience: string;
  /** Use-case / style tags for filters and card chips. */
  tags: string[];
  /** Short feature chips in the page header. */
  features: string[];
  /** Fields included in the template. */
  includes: { label: string; detail: string }[];
  /** Illustrative example, made-up business. */
  example: { title: string; body: string[] };
  /** "How to fill it in" steps (also used for HowTo JSON-LD). */
  steps: { name: string; text: string }[];
  guidance: GuidanceBlock[];
  faq: Faq[];
  relatedTools: RelatedToolSlug[];
  relatedGuides: GuideLink[];
}

// Features every template shares. Kept here so cards, chips and copy stay consistent.
const CORE_FEATURES = ['Editable fields', 'Live totals', 'Your logo', 'Currency choice', 'PDF download', 'Print', 'A4 · A5 · Letter · Legal'];

// ---------------------------------------------------------------------------------------------------------
// Category landing pages
// ---------------------------------------------------------------------------------------------------------

export const CATEGORY_CONTENT: Record<DocumentKind, CategoryContent> = {
  'sales-invoice': {
    kind: 'sales-invoice',
    name: 'Sales invoice templates',
    documentName: 'sales invoice',
    seoTitle: 'Sales Invoice Format & Templates: Free, Editable, PDF',
    metaDescription:
      'Free sales invoice formats for GST, simple, service and wholesale bills. Edit every field, add your logo, see live totals and taxes, then print or save as PDF.',
    h1: 'Sales Invoice Format & Templates',
    eyebrow: 'Free templates',
    intro:
      'Pick the sales invoice format that fits how you sell, fill it in on this page and download a PDF or print it. Four layouts: GST tax invoice, simple bill, service invoice and wholesale invoice.',
    blurb: 'GST tax invoice, simple bill, service and wholesale invoice formats.',
    showFilter: true,
    editingNote:
      'If you sell to a GST-registered buyer, type their GSTIN carefully. The template prints what you enter, so a wrong digit on the invoice will also be wrong on the e-way bill and in the buyer’s records.',
    whenToUse: {
      heading: 'When to use a sales invoice',
      intro:
        'A sales invoice is the seller’s record of a completed sale: what was supplied, to whom, at what price and with what tax. It is the document the buyer pays against and the one most other documents refer back to.',
      blocks: [
        {
          heading: 'Sales invoice or tax invoice?',
          paragraphs: [
            '“Sales invoice” is the everyday business name. Under GST, a registered person making a taxable supply issues a tax invoice, which is a sales invoice that carries the particulars the GST rules ask for. So for most GST-registered sellers the sales invoice and the tax invoice are the same piece of paper.',
            'Sellers who are not registered, or who supply only exempt goods, or who are under the composition scheme, generally issue a bill of supply instead and do not charge GST on it. Check which applies to you before choosing a format.',
          ],
        },
        {
          heading: 'Documents that come before or alongside the invoice',
          paragraphs: [
            'A quotation is an offer of prices and terms made before the sale; it creates no GST liability. A delivery challan moves goods when there is no sale yet, such as job work or goods sent on approval. An e-way bill is not an invoice at all: it is an electronic record of the movement of goods, generated on the official portal with details taken from the invoice or challan.',
          ],
          links: [
            { title: 'E-way bill vs sales invoice', href: '/eway-bill-vs-sales-invoice' },
            { title: 'Delivery challan vs tax invoice', href: '/blog/delivery-challan-vs-tax-invoice' },
          ],
        },
      ],
      comparison: [
        { document: 'Quotation', issuedBy: 'Seller', purpose: 'Offers prices and terms before the buyer agrees', vs: 'No sale has happened; not used to move goods or claim credit' },
        { document: 'Sales / tax invoice', issuedBy: 'Seller', purpose: 'Records the completed sale and the tax charged', vs: '—' },
        { document: 'Bill of supply', issuedBy: 'Seller not charging GST', purpose: 'Records exempt or composition-scheme sales', vs: 'No GST is charged on it' },
        { document: 'Delivery challan', issuedBy: 'Consignor', purpose: 'Moves goods where there is no sale yet', vs: 'Not a demand for payment' },
        { document: 'E-way bill', issuedBy: 'Generated on the official portal', purpose: 'Records the movement of goods', vs: 'Built from invoice or challan details; it does not replace them' },
      ],
    },
    faq: [
      {
        q: 'Which sales invoice template should I use?',
        a: 'If you are GST-registered and charge GST, start with the GST tax invoice. For a short bill to walk-in or small customers, use the simple sales invoice. Use the service invoice when you bill for work or time rather than goods, and the wholesale invoice when you ship bulk quantities with transport details.',
      },
      {
        q: 'Are these templates free?',
        a: 'Yes. You can edit, download as PDF and print any template on this page without signing up.',
      },
      {
        q: 'Is my invoice data uploaded anywhere?',
        a: 'No. The template is filled in and turned into a PDF inside your browser. Nothing you type is sent to a server.',
      },
      {
        q: 'Can I add my own logo and change the currency?',
        a: 'Yes. Every template lets you add a logo and choose the currency shown on the invoice. Rupees is the usual choice for domestic sales.',
      },
      {
        q: 'Which paper sizes are supported?',
        a: 'A4, A5, Letter and Legal. A4 suits most GST invoices; A5 works for short bills with a few lines.',
      },
      {
        q: 'Can I download the sales invoice format in Excel or Word?',
        a: 'No. The templates download as PDF or print straight from your browser. Instead of an Excel sheet with formulas to maintain, totals and taxes update as you type, there is nothing to install, and nothing you enter is uploaded.',
      },
      {
        q: 'Does a template make my invoice GST-compliant?',
        a: 'No template can guarantee that. The layouts include the fields businesses commonly need, but you are responsible for the details, tax rates and any e-invoicing requirement that applies to you. Check the current rules on the GST portal or with your tax adviser.',
      },
    ],
    relatedTools: ['gst-calculator', 'multi-item-gst-calculator', 'gstin-validator', 'hsn-code-lookup', 'invoice-number-generator', 'quotation-generator', 'delivery-challan-generator', 'invoice-vs-eway-bill-checker'],
    relatedGuides: [
      { title: 'E-way bill vs sales invoice', href: '/eway-bill-vs-sales-invoice' },
      { title: 'How to calculate GST on a sales invoice', href: '/blog/how-to-calculate-gst-on-sales-invoice' },
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
      { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
    ],
  },

  'purchase-order': {
    kind: 'purchase-order',
    name: 'Purchase order templates',
    documentName: 'purchase order',
    seoTitle: 'Purchase Order Format & Templates: Free, Editable, PDF',
    metaDescription:
      'Free purchase order formats: GST, raw material and international. Edit every field, add your logo, get live totals and taxes, then print or download a PDF.',
    h1: 'Purchase Order Format & Templates',
    eyebrow: 'Free templates',
    intro:
      'A purchase order tells your supplier exactly what you are buying, at what price and on what terms, before anything is delivered. Choose a GST, raw material or international PO, fill it in here and send it as a PDF.',
    blurb: 'GST, raw material and international purchase order formats.',
    showFilter: false,
    editingNote:
      'Give every PO its own number and keep using it. Your supplier should quote it on their invoice and delivery documents, which is what lets your stores and accounts teams match the bill to the order.',
    whenToUse: {
      heading: 'When to use a purchase order',
      intro:
        'Raise a purchase order once you have chosen a supplier and agreed the price, and before the goods or services are delivered. It is written by the buyer, and once the supplier accepts it, it becomes the reference both sides work from.',
      blocks: [
        {
          heading: 'Purchase order vs invoice',
          paragraphs: [
            'The purchase order comes from the buyer and says “please supply this”. The invoice comes from the supplier and says “we supplied this, please pay”. A PO is not a tax document: it does not create a GST liability and it cannot be used to claim input tax credit or to move goods.',
            'Many businesses match three documents before paying: the PO (what was ordered), the goods receipt note (what actually arrived) and the supplier’s invoice (what is being billed). Differences in quantity or rate show up quickly when all three carry the same PO number.',
          ],
        },
        {
          heading: 'Where a PO fits in the buying process',
          paragraphs: [
            'Inside a company, a purchase requisition usually comes first: a department asks for something to be bought. Purchasing then collects quotations, picks a supplier and issues the PO. The supplier may reply with an order acknowledgement or sales order, then ships the goods with its tax invoice and, where required, an e-way bill.',
          ],
          bullets: [
            'Use a PO for any purchase you want approved and tracked, not just large ones.',
            'Change the PO formally (a revised PO or amendment) if quantity, price or dates change.',
            'Close the PO once everything ordered has been received and billed.',
          ],
        },
      ],
      comparison: [
        { document: 'Purchase requisition', issuedBy: 'Internal department', purpose: 'Asks purchasing to buy something', vs: 'Internal only; the supplier never sees it' },
        { document: 'Quotation', issuedBy: 'Supplier', purpose: 'Offers prices before you order', vs: 'An offer to you; the PO is your acceptance or order' },
        { document: 'Purchase order', issuedBy: 'Buyer', purpose: 'Places the order with agreed price and terms', vs: '—' },
        { document: 'Sales order / acknowledgement', issuedBy: 'Supplier', purpose: 'Confirms the supplier accepts the PO', vs: 'The supplier’s mirror of your PO' },
        { document: 'Goods receipt note', issuedBy: 'Buyer’s stores', purpose: 'Records what actually arrived', vs: 'Confirms delivery against the PO' },
        { document: 'Tax invoice', issuedBy: 'Supplier', purpose: 'Bills for what was supplied', vs: 'The tax document; should quote your PO number' },
      ],
    },
    faq: [
      {
        q: 'Is a purchase order a legal document?',
        a: 'A purchase order sets out the commercial terms of an order, and once the supplier accepts it, it is generally treated as part of the agreement between you. How binding it is depends on your terms and the law that applies, so take legal advice for high-value or unusual contracts.',
      },
      {
        q: 'Should a purchase order show GST?',
        a: 'Many buyers show the expected GST rate and amount so the total cost is clear and approvals cover the full outgo. The GST that is actually charged is decided by the supplier’s tax invoice, not by the PO.',
      },
      {
        q: 'What is the difference between the three PO templates?',
        a: 'The GST PO suits everyday domestic purchases where you want GSTINs, HSN codes and the CGST/SGST or IGST split shown. The manufacturing PO adds specifications, drawing references, inspection and delivery schedule fields for raw materials and components. The international PO adds currency, Incoterms, ports and shipping documents for imports.',
      },
      {
        q: 'Can I number purchase orders in my own series?',
        a: 'Yes. The PO number is a free text field, so you can use any series such as PO/2026-27/0042. The Invoice Number Series Generator can help you plan a consistent format.',
      },
      {
        q: 'Is my PO data stored online?',
        a: 'No. Everything you type stays in your browser. The PDF is created on your device and nothing is uploaded.',
      },
      {
        q: 'Is there a purchase order format in Excel?',
        a: 'Not here. These purchase order formats are filled in on the page and saved as PDF or printed. Totals and taxes calculate as you type, so there are no spreadsheet formulas to break.',
      },
    ],
    relatedTools: ['gst-calculator', 'multi-item-gst-calculator', 'gstin-validator', 'hsn-code-lookup', 'quotation-generator', 'invoice-number-generator', 'amount-in-words-converter'],
    relatedGuides: [
      { title: 'How manufacturers can simplify invoice workflows', href: '/blog/how-manufacturers-can-simplify-invoice-workflows' },
      { title: 'GSTIN verification: what to check', href: '/blog/gstin-verification-what-to-check' },
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
      { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
    ],
  },

  'commercial-invoice': {
    kind: 'commercial-invoice',
    name: 'Commercial invoice templates',
    documentName: 'commercial invoice',
    seoTitle: 'Commercial Invoice Template & Format: Free, Printable PDF',
    metaDescription:
      'Free commercial invoice template for shipping goods. Edit fields, add your logo, choose currency, see live totals, then print on A4 or Letter or download a PDF.',
    h1: 'Commercial Invoice Template',
    eyebrow: 'Free templates',
    intro:
      'A commercial invoice describes goods crossing a border: what they are, what they are worth, where they come from and the terms of sale. Use the export format for shipments from India, or the courier format for parcels, samples and small consignments.',
    blurb: 'Export invoice and courier commercial invoice formats.',
    showFilter: false,
    editingNote:
      'Use the same descriptions, quantities and values that appear on your packing list and shipping documents. Customs officers compare them, and a mismatch is a common reason for queries and delays.',
    whenToUse: {
      heading: 'When to use a commercial invoice',
      intro:
        'You need a commercial invoice whenever goods are sold or sent to another country. Customs authorities in both countries use it to identify the goods, check their value and work out duties, and the buyer and banks rely on it for payment.',
      blocks: [
        {
          heading: 'What customs looks for on a commercial invoice',
          paragraphs: [
            'Customs officers read the commercial invoice to answer four questions: what the goods are (description and HS code), what they are worth (value, currency and Incoterm), where they were made (country of origin) and who is sending and receiving them. Weights and package counts let them tie the invoice to the physical shipment. Issue it when the goods are actually shipped, with final quantities and values.',
          ],
        },
        {
          heading: 'Commercial invoice vs sales invoice',
          paragraphs: [
            'A domestic GST tax invoice records a sale inside India and the GST charged on it. An export commercial invoice records a sale to a buyer abroad. Indian exporters often issue one export invoice that carries both the GST particulars and the details customs and the foreign buyer need. Your CHA or tax adviser can confirm the format your shipment needs.',
          ],
        },
        {
          heading: 'The documents that travel with it',
          paragraphs: [
            'The commercial invoice is the core of a shipping document set, not the whole set. The others depend on the shipment and the destination.',
          ],
          bullets: [
            'Packing list: package-by-package contents, weights and dimensions.',
            'Shipping bill (exports from India): filed with Indian customs for clearance.',
            'Bill of lading or airway bill: issued by the carrier.',
            'Certificate of origin: where the buyer wants a trade agreement benefit or the destination requires it.',
          ],
        },
      ],
      comparison: [
        { document: 'Commercial invoice', issuedBy: 'Seller / exporter', purpose: 'States the goods, value and terms of the shipment', vs: '—' },
        { document: 'Packing list', issuedBy: 'Seller / exporter', purpose: 'Details packages, weights and marks', vs: 'No prices; supports the invoice' },
        { document: 'Shipping bill', issuedBy: 'Exporter or CHA, filed with Indian customs', purpose: 'Export declaration in India', vs: 'A customs filing, built from invoice data' },
        { document: 'Bill of lading / airway bill', issuedBy: 'Carrier', purpose: 'Receipt and contract of carriage', vs: 'Proves shipment; not a sale document' },
      ],
    },
    faq: [
      {
        q: 'Which commercial invoice template should I use?',
        a: 'Use the export commercial invoice if you are an Indian business shipping goods abroad and need IEC, GST and LUT details on the invoice. Use the courier commercial invoice for parcels sent by courier, such as samples, small orders, gifts and returns, where the AWB number, reason for export, HS codes and a customs declaration matter most.',
      },
      {
        q: 'Can I show values in US dollars or euros?',
        a: 'Yes. Choose the currency in the editor. Export invoices are often in the currency of the contract; some exporters also note the rupee value and exchange rate used.',
      },
      {
        q: 'Does this template guarantee customs clearance?',
        a: 'No. Customs requirements differ by country and by product, and they change. The templates give you the common fields; always check the destination country’s customs requirements and confirm with your freight forwarder or customs broker.',
      },
      {
        q: 'Is a commercial invoice needed for samples or gifts?',
        a: 'Usually yes. Couriers and customs generally expect an invoice that states the reason for export and a value, even when nothing is being sold. Mark the purpose clearly instead of writing a zero value.',
      },
      {
        q: 'Is my shipment data uploaded?',
        a: 'No. The template runs entirely in your browser and the PDF is created on your device.',
      },
      {
        q: 'What is the difference between a commercial invoice template and a commercial invoice format?',
        a: 'Nothing in practice. “Format” is the more common word in India and “template” elsewhere. Both mean a ready layout with the fields a commercial invoice needs, which you fill in for each shipment.',
      },
    ],
    relatedTools: ['hsn-code-lookup', 'gstin-validator', 'gst-calculator', 'amount-in-words-converter', 'invoice-number-generator'],
    relatedGuides: [
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
      { title: 'E-way bill rules in India (Rule 138)', href: '/eway-bill-rules' },
      { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
    ],
  },
};

// ---------------------------------------------------------------------------------------------------------
// Template pages
// ---------------------------------------------------------------------------------------------------------

export const TEMPLATE_CONTENT: Record<TemplateId, TemplateContent> = {
  // ---------------- Sales invoices ----------------
  'gst-tax-invoice': {
    id: 'gst-tax-invoice',
    name: 'GST tax invoice',
    seoTitle: 'GST Invoice Format: Free Tax Invoice Template, Print or PDF',
    metaDescription:
      'Editable GST tax invoice format. Fill in GSTIN, items and rates, watch totals and taxes update live, add your logo, then download a PDF. No sign-up needed.',
    h1: 'GST Tax Invoice Format',
    intro: 'A tax invoice layout for GST-registered sellers, with GSTIN, HSN, place of supply and tax columns ready to fill.',
    audience: 'GST-registered traders and manufacturers billing B2B or B2C sales of goods.',
    tags: ['GST registered', 'Goods', 'B2B'],
    features: ['GSTIN and HSN fields', 'CGST/SGST or IGST', ...CORE_FEATURES],
    includes: [
      { label: 'Seller details', detail: 'Business name, address, GSTIN, state and state code, contact details and logo.' },
      { label: 'Invoice details', detail: 'Invoice number, invoice date, place of supply and a reverse charge (yes/no) line.' },
      { label: 'Buyer (bill to)', detail: 'Name, address, GSTIN if registered, state and state code.' },
      { label: 'Ship to', detail: 'Delivery address when it differs from the billing address.' },
      { label: 'Line items', detail: 'Description, HSN code, quantity, unit, rate, discount and taxable value.' },
      { label: 'Tax columns', detail: 'CGST and SGST/UTGST for intra-state sales, or IGST for inter-state sales.' },
      { label: 'Totals', detail: 'Taxable value, tax amounts, invoice total and amount in words.' },
      { label: 'Footer', detail: 'Bank details, terms, and a signature block for the authorised signatory.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Rajkot brass fittings maker (sample GSTIN 24ABCDE1234F1Z5) sells 500 elbow fittings to a hardware dealer in Ahmedabad. Both are in Gujarat, so the invoice shows CGST and SGST at half the applicable rate each, with place of supply “Gujarat (24)”.',
        'The next order goes to a dealer in Indore. Now the place of supply is Madhya Pradesh, so the same items are billed with IGST at the full rate instead of the CGST/SGST split.',
      ],
    },
    steps: [
      { name: 'Enter your business details', text: 'Add your legal name, address, GSTIN and state, and upload your logo.' },
      { name: 'Set the invoice number and date', text: 'Use the next number in your series for this financial year, and the date of issue.' },
      { name: 'Add the buyer and place of supply', text: 'Enter the buyer’s name, address and GSTIN, and choose the place of supply state.' },
      { name: 'List the items', text: 'For each line add the description, HSN code, quantity, unit, rate, any discount and the GST rate.' },
      { name: 'Check the tax split', text: 'Use CGST + SGST if your state and the place of supply are the same, and IGST if they differ.' },
      { name: 'Review and download', text: 'Check totals and amount in words, pick the paper size, then download the PDF or print.' },
    ],
    guidance: [
      {
        heading: 'What a GST tax invoice usually needs to show',
        paragraphs: [
          'Rule 46 of the CGST Rules lists the particulars of a tax invoice. In general terms they cover who is supplying, who is receiving, what is supplied and what tax is charged. The list below is a summary, not the full rule, so check the current text before relying on it.',
        ],
        bullets: [
          'Supplier’s name, address and GSTIN.',
          'A consecutive invoice number, unique for the financial year, and the date of issue.',
          'Recipient’s name, address and GSTIN where registered; for unregistered buyers the rule specifies when address and state details are needed.',
          'HSN code of the goods (the number of digits depends on your turnover; check the current notification).',
          'Description, quantity and unit, total value, and taxable value after discounts.',
          'Tax rate and amount for each tax (CGST, SGST/UTGST, IGST, cess where applicable).',
          'Place of supply with state name for inter-state supplies, and delivery address if different.',
          'Whether tax is payable on reverse charge, and the signature of the supplier or authorised representative.',
        ],
      },
      {
        heading: 'CGST + SGST or IGST?',
        paragraphs: [
          'It depends on where the supply takes place compared with where you are registered. When the supplier’s location and the place of supply are in the same state, the tax is split equally between CGST and SGST (or UTGST in a union territory without a legislature). When they are in different states, the full rate is charged as IGST.',
          'The place of supply for goods is usually where the movement of goods ends for delivery to the buyer, but there are special cases, such as bill-to-ship-to deals. When in doubt, check with your tax adviser before issuing the invoice.',
        ],
        links: [{ title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' }],
      },
      {
        heading: 'E-invoicing and e-way bills',
        paragraphs: [
          'If your business falls under e-invoicing, the invoice must also be reported to the Invoice Registration Portal to get an IRN and QR code. This template does not generate an IRN. Check whether e-invoicing applies to you before using a self-prepared PDF.',
          'If the goods are being moved and the consignment value crosses the e-way bill threshold, the e-way bill is generated on the official portal using details from this invoice.',
        ],
        links: [
          { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
          { title: 'How to calculate GST on a sales invoice', href: '/blog/how-to-calculate-gst-on-sales-invoice' },
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between a GST invoice and a tax invoice?',
        a: 'They usually mean the same thing. “Tax invoice” is the term used in the GST law for the invoice a registered person issues for a taxable supply; “GST invoice” is the everyday name for it.',
      },
      {
        q: 'How long can a GST invoice number be?',
        a: 'Rule 46 allows a consecutive serial number of up to 16 characters, using letters, numerals, hyphens or slashes, unique for each financial year. Plan your series so it stays within that length.',
      },
      {
        q: 'Do I need the buyer’s GSTIN on the invoice?',
        a: 'If the buyer is registered, yes: they need it on the invoice to claim input tax credit. Check the format with the GSTIN Validator before you issue the invoice.',
      },
      {
        q: 'Can this template create an e-invoice with an IRN?',
        a: 'No. It creates a PDF tax invoice layout only. If e-invoicing applies to your business, the invoice has to be reported to the Invoice Registration Portal to obtain the IRN and QR code.',
      },
      {
        q: 'Should I show both CGST/SGST and IGST columns?',
        a: 'Only the taxes that apply to the sale should carry amounts. An intra-state sale shows CGST and SGST; an inter-state sale shows IGST.',
      },
    ],
    relatedTools: ['gst-calculator', 'multi-item-gst-calculator', 'gstin-validator', 'hsn-code-lookup', 'gst-state-code-list', 'einvoice-applicability-checker', 'invoice-number-generator'],
    relatedGuides: [
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
      { title: 'How to calculate GST on a sales invoice', href: '/blog/how-to-calculate-gst-on-sales-invoice' },
      { title: 'E-way bill vs tax invoice', href: '/blog/eway-bill-vs-tax-invoice' },
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
    ],
  },

  'simple-sales-invoice': {
    id: 'simple-sales-invoice',
    name: 'Simple sales invoice',
    seoTitle: 'Simple Invoice Format: Free Bill Template to Print or PDF',
    metaDescription:
      'A clean, simple invoice and bill format. Edit the fields, upload your logo, pick a currency, get live totals, then print on A4 or A5 or save a PDF. No sign-up.',
    h1: 'Simple Invoice Format (Bill Format)',
    intro: 'A short, uncluttered bill for small sales: your details, the customer, a few lines and a total.',
    audience: 'Small shops, home businesses and sellers who need a quick bill without GST columns.',
    tags: ['Minimal', 'Goods', 'B2C', 'Non-GST'],
    features: ['Minimal layout', 'Prints well on A5', ...CORE_FEATURES],
    includes: [
      { label: 'Your details', detail: 'Business or trading name, address, phone and logo.' },
      { label: 'Bill details', detail: 'Bill number and date.' },
      { label: 'Customer', detail: 'Customer name, and address or phone if you want to record it.' },
      { label: 'Items', detail: 'Description, quantity, rate and amount for each line.' },
      { label: 'Totals', detail: 'Subtotal, optional discount or other charges, and the total payable.' },
      { label: 'Payment note', detail: 'Payment mode, UPI or bank details, and a thank-you or terms line.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A home baker in Pune who is not registered under GST takes a birthday order: one 2 kg cake and 24 cupcakes. She fills in the customer’s name and phone number, adds the two lines, notes “Paid by UPI” and prints the bill on A5 to hand over with the order.',
      ],
    },
    steps: [
      { name: 'Add your name and logo', text: 'Enter the name customers know you by, your address and phone number.' },
      { name: 'Number the bill', text: 'Use a simple running series such as 001, 002 so you can trace every bill later.' },
      { name: 'Enter the customer', text: 'A name is enough for walk-in sales; add a phone number or address for credit sales.' },
      { name: 'Add the items', text: 'Keep descriptions short and clear, with quantity and rate.' },
      { name: 'Print or save', text: 'Choose A5 for short bills or A4 for longer ones, then print or download the PDF.' },
    ],
    guidance: [
      {
        heading: 'When a simple bill is enough, and when it is not',
        paragraphs: [
          'A simple bill works when you are not registered under GST, or for informal records where no tax is charged. It keeps a clean record of what was sold and what the customer paid.',
          'If you are GST-registered and making a taxable sale, a plain bill is not enough: you need a tax invoice with the particulars the GST rules require, such as your GSTIN, HSN codes and tax amounts. Use the GST tax invoice template instead. Composition-scheme businesses and sellers of exempt goods generally issue a bill of supply, which carries a declaration that no tax is collected; check the current wording with your adviser.',
        ],
      },
      {
        heading: 'Keeping simple bills useful',
        paragraphs: ['Even a short bill becomes valuable when a customer disputes a payment or you need to total up the month’s sales.'],
        bullets: [
          'Never reuse a bill number, and do not skip numbers without noting why.',
          'Write the amount in words for larger bills to avoid alterations.',
          'Keep a copy of every PDF you issue, organised by month.',
          'Do not show any tax on the bill if you are not allowed to collect it.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I use this bill format if I am not registered under GST?',
        a: 'Yes. This layout has no GST columns, so it suits sellers who are not registered and do not charge GST. Do not add GST to the total if you are not registered to collect it.',
      },
      {
        q: 'Is a simple bill the same as a cash memo?',
        a: 'In everyday use, yes: both are short bills for a sale, often paid on the spot. A GST-registered seller still needs to meet the GST invoice rules for taxable sales.',
      },
      {
        q: 'Which paper size should I use?',
        a: 'A5 suits bills with a handful of lines and saves paper. Use A4 if you have more items or want space for terms.',
      },
      {
        q: 'Can I switch to the GST format later?',
        a: 'Yes. If you register under GST, open the GST tax invoice template and enter your GSTIN, HSN codes and tax rates there.',
      },
    ],
    relatedTools: ['amount-in-words-converter', 'invoice-number-generator', 'gst-inclusive-exclusive-calculator', 'quotation-generator'],
    relatedGuides: [
      { title: 'Delivery challan vs tax invoice', href: '/blog/delivery-challan-vs-tax-invoice' },
      { title: 'How to avoid errors in invoice and transport details', href: '/blog/avoid-errors-in-invoice-and-transport-details' },
    ],
  },

  'service-invoice': {
    id: 'service-invoice',
    name: 'Service invoice',
    seoTitle: 'Service Invoice Format: Free Editable Template with PDF',
    metaDescription:
      'Free service invoice format for consultants, agencies and contractors. Editable fields, logo upload, live totals and taxes, browser print or PDF download.',
    h1: 'Service Invoice Format',
    intro: 'An invoice built for billing work rather than goods, with SAC codes, a service period and description lines that explain what was done.',
    audience: 'Consultants, agencies, contractors, repair and maintenance firms and other service providers.',
    tags: ['Services', 'GST registered', 'B2B'],
    features: ['SAC code field', 'Service period', ...CORE_FEATURES],
    includes: [
      { label: 'Provider details', detail: 'Business name, address, GSTIN (if registered), contact and logo.' },
      { label: 'Invoice details', detail: 'Invoice number, date, place of supply and due date.' },
      { label: 'Client', detail: 'Client name, billing address and GSTIN if registered.' },
      { label: 'Service period', detail: 'The dates or month the services relate to.' },
      { label: 'Service lines', detail: 'Description, SAC code, hours or units, rate and amount.' },
      { label: 'Tax and totals', detail: 'Taxable value, CGST/SGST or IGST, total and amount in words.' },
      { label: 'Payment', detail: 'Bank account, UPI, payment terms and any reference such as a PO or contract number.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Bengaluru IT support firm bills a client in Chennai for September: a fixed monthly maintenance fee plus 6 hours of on-site work at an hourly rate. Each line carries the relevant SAC code, the service period reads “1–30 September 2026”, and because the client is in Tamil Nadu the invoice charges IGST.',
      ],
    },
    steps: [
      { name: 'Enter your details', text: 'Add your business name, address, GSTIN if registered, and logo.' },
      { name: 'Add the client and any reference', text: 'Enter the client’s details and their PO or contract number if they need it for approval.' },
      { name: 'State the service period', text: 'Give the dates or month the work covers so the client can match it to their records.' },
      { name: 'Describe each service', text: 'Write what was done, add the SAC code, and enter hours or units with the rate, or a fixed fee.' },
      { name: 'Apply tax and terms', text: 'Choose CGST + SGST or IGST based on place of supply, add payment terms, then download or print.' },
    ],
    guidance: [
      {
        heading: 'SAC codes on service invoices',
        paragraphs: [
          'Services are classified under the Services Accounting Code (SAC) scheme, which sits under chapter 99 of the GST classification. A SAC code works for services the way an HSN code works for goods: it identifies the type of service and is linked to the GST rate. Pick the code that matches what you actually supplied, and check the rate against the current notification.',
        ],
      },
      {
        heading: 'Service period, place of supply and timing',
        paragraphs: [
          'Clients, especially larger companies, often reject service invoices that do not say what period they cover. Stating the period also helps you when work spans two months or two financial years.',
          'For services, the place of supply follows different rules from goods. For many B2B services it is the location of the registered recipient, but there are exceptions, for example services related to immovable property or events. Check the place of supply before choosing CGST/SGST or IGST.',
        ],
      },
      {
        heading: 'No e-way bill for services',
        paragraphs: [
          'An e-way bill is needed only for the movement of goods. A pure service invoice does not need one. If you also supply parts or materials that are transported, the goods portion may need its own invoice and e-way bill.',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between a service invoice and a sales invoice?',
        a: 'A sales invoice usually bills goods, with HSN codes and quantities. A service invoice bills work, time or a fixed fee, uses SAC codes, and normally states the period the services relate to.',
      },
      {
        q: 'Where do I find the right SAC code?',
        a: 'SAC codes are listed in the GST rate schedules for services on the official GST and CBIC websites. Choose the code that describes the service you actually provided, and confirm the rate with your tax adviser if unsure.',
      },
      {
        q: 'Can I bill by the hour?',
        a: 'Yes. Use the quantity column for hours and the rate column for your hourly rate. For fixed fees, enter quantity 1 and the fee as the rate.',
      },
      {
        q: 'Can I invoice a client outside India?',
        a: 'Yes, you can choose a foreign currency. Whether the service counts as an export of services, and how GST applies, depends on conditions in the law, so check with your adviser before issuing the invoice.',
      },
    ],
    relatedTools: ['gst-calculator', 'gst-inclusive-exclusive-calculator', 'gstin-validator', 'gst-state-code-list', 'invoice-number-generator', 'amount-in-words-converter'],
    relatedGuides: [
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
      { title: 'GSTIN verification: what to check', href: '/blog/gstin-verification-what-to-check' },
    ],
  },

  'wholesale-invoice': {
    id: 'wholesale-invoice',
    name: 'Wholesale invoice',
    seoTitle: 'Wholesale Invoice Format: Free B2B Bill Template (PDF)',
    metaDescription:
      'Wholesale invoice format for distributors and traders. Add many line items, see totals and taxes update live, add your logo and print on A4 or save a PDF.',
    h1: 'Wholesale Invoice Format',
    intro: 'A B2B invoice for bulk dispatches, with room for packing details, transport and e-way bill references alongside the GST columns.',
    audience: 'Manufacturers, wholesalers and distributors shipping bulk quantities to dealers and retailers.',
    tags: ['Goods', 'B2B', 'GST registered', 'Transport details'],
    features: ['Transport and e-way bill fields', 'Packing / cases column', ...CORE_FEATURES],
    includes: [
      { label: 'Seller and buyer', detail: 'Names, addresses, GSTINs, states and state codes, plus a separate ship-to address.' },
      { label: 'Order references', detail: 'Invoice number and date, buyer’s PO number and date.' },
      { label: 'Line items', detail: 'Description, HSN, packing (cases, bags, bundles), quantity, unit, rate, trade discount and taxable value.' },
      { label: 'Tax', detail: 'CGST/SGST or IGST by place of supply, with rate and amount.' },
      { label: 'Transport', detail: 'Transporter name, vehicle number, LR/GR number and date, and e-way bill number.' },
      { label: 'Totals', detail: 'Total packages, taxable value, tax, freight or other charges, grand total and amount in words.' },
      { label: 'Footer', detail: 'Bank details, credit terms, and signature.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Morbi tiles manufacturer dispatches 1,200 boxes of floor tiles to a distributor in Jaipur on one truck. The invoice lists three designs by HSN with boxes and square metres, notes 40 pallets in total, and carries the transporter’s LR number and vehicle number.',
        'Because the consignment value is well above the e-way bill threshold and the goods move from Gujarat to Rajasthan, an e-way bill is generated on the official portal from these details, and its number is written on the invoice before the truck leaves.',
      ],
    },
    steps: [
      { name: 'Enter seller, buyer and ship-to', text: 'Add both GSTINs and states, and the delivery address if it differs from the billing address.' },
      { name: 'Quote the buyer’s PO', text: 'Add the buyer’s purchase order number and date so their accounts team can match the bill.' },
      { name: 'List items with packing', text: 'For each line give the HSN, number of cases or bags, quantity, rate and any trade discount.' },
      { name: 'Add transport details', text: 'Fill in the transporter, vehicle number and LR number once the dispatch is booked.' },
      { name: 'Add the e-way bill number', text: 'Generate the e-way bill on the official portal if required, then enter its number on the invoice.' },
      { name: 'Check and print copies', text: 'Check totals, then print enough copies for the buyer, the transporter and your records.' },
    ],
    guidance: [
      {
        heading: 'Transport details and the e-way bill',
        paragraphs: [
          'Wholesale consignments usually move by road and often cross the e-way bill threshold. The e-way bill is generated on the official portal using the invoice number, date, value, HSN codes and GSTINs, so these must match the invoice exactly. Vehicle details go into Part B of the e-way bill.',
          'Generally, an e-way bill is needed where the consignment value exceeds ₹50,000, though some states have set different limits for movement within the state. Use the eligibility checker and confirm against current rules.',
        ],
        links: [
          { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
          { title: 'E-way bills for wholesalers and distributors', href: '/blog/eway-bills-for-wholesalers-and-distributors' },
          { title: 'E-way bill Part A and Part B explained', href: '/blog/eway-bill-part-a-and-part-b-explained' },
        ],
      },
      {
        heading: 'Getting bulk lines right',
        paragraphs: ['Wholesale invoices carry more lines and larger amounts, so small errors cost more.'],
        bullets: [
          'Use the same unit on the invoice as on the packing list (boxes vs square metres, bags vs kg).',
          'Show trade discounts on the invoice itself so the taxable value is correct.',
          'Use “bill to” and “ship to” correctly when goods go to the buyer’s customer or godown.',
          'Write the total number of packages so the receiver can check the delivery at a glance.',
        ],
      },
    ],
    faq: [
      {
        q: 'What makes a wholesale invoice different from a normal GST invoice?',
        a: 'It is still a tax invoice, but it adds what bulk B2B dispatches need: packing and package counts, the buyer’s PO reference, ship-to address, transporter, vehicle, LR number and e-way bill number.',
      },
      {
        q: 'Does this template generate the e-way bill?',
        a: 'No. E-way bills are generated on the official e-way bill portal, or through an app or system connected to it. This template has a field to record the e-way bill number once you have it.',
      },
      {
        q: 'Can I use it as a manufacturer invoice?',
        a: 'Yes. Manufacturers selling to dealers and distributors use the same layout. Add your factory address as the dispatch point if it differs from your registered address.',
      },
      {
        q: 'How do I check the invoice matches the e-way bill?',
        a: 'Compare invoice number, date, GSTINs, value and HSN codes with the e-way bill details. The Invoice vs E-Way Bill Checker can help you spot differences.',
      },
    ],
    relatedTools: ['eway-bill-eligibility-checker', 'invoice-vs-eway-bill-checker', 'distance-calculator', 'quantity-and-tax-calculator', 'multi-item-gst-calculator', 'hsn-code-lookup'],
    relatedGuides: [
      { title: 'E-way bills for wholesalers and distributors', href: '/blog/eway-bills-for-wholesalers-and-distributors' },
      { title: 'E-way bill vs sales invoice', href: '/eway-bill-vs-sales-invoice' },
      { title: 'How to generate an e-way bill', href: '/eway-bill-generation' },
      { title: 'E-way bill validity', href: '/eway-bill-validity' },
    ],
  },

  // ---------------- Purchase orders ----------------
  'gst-purchase-order': {
    id: 'gst-purchase-order',
    name: 'GST purchase order',
    seoTitle: 'GST Purchase Order Format: HSN, GSTIN & Tax Split (PDF)',
    metaDescription:
      'GST purchase order format for Indian buyers: both GSTINs, HSN codes, CGST/SGST or IGST, delivery date and approval. Live totals, then print or download a PDF.',
    h1: 'Purchase Order Format with GST',
    intro: 'A domestic PO that shows both GSTINs, HSN codes and the expected CGST/SGST or IGST, so the supplier’s tax invoice can be checked line by line.',
    audience: 'GST-registered Indian buyers: traders, shops, offices and small manufacturers placing domestic orders.',
    tags: ['Domestic', 'GST registered', 'Approval'],
    features: ['Buyer and supplier GSTIN', 'HSN and GST rate per line', 'Approval block', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer details', detail: 'Your company name, billing address, GSTIN, state and state code, and logo.' },
      { label: 'PO details', detail: 'PO number, PO date, supplier quotation reference and required-by date.' },
      { label: 'Supplier', detail: 'Supplier name, address, GSTIN, state and contact person.' },
      { label: 'Deliver to', detail: 'Delivery address and state, if different from your billing address.' },
      { label: 'Items', detail: 'Description, HSN/SAC, quantity, unit, agreed rate, discount and GST rate.' },
      { label: 'Expected tax', detail: 'CGST and SGST for a supplier in your state, or IGST for a supplier in another state.' },
      { label: 'Terms', detail: 'Delivery date, freight, payment terms and any warranty or return conditions.' },
      { label: 'Approval', detail: 'Prepared by, approved by and the supplier’s acceptance.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Nagpur stationery distributor (sample GSTIN 27ABCDE1234F1Z5) orders 200 reams of A4 paper from a supplier in the same state and 50 boxes of files from a supplier in Chhattisgarh. It raises two POs: the first shows CGST and SGST, the second shows IGST, each with the HSN code and rate agreed in the supplier’s quotation.',
        'When the goods arrive, the accounts team checks each supplier’s tax invoice against the PO. A line billed at a different rate or HSN is queried before payment, not after the return is filed.',
      ],
    },
    steps: [
      { name: 'Add your details and PO number', text: 'Enter your business name, GSTIN and state, a unique PO number and the PO date.' },
      { name: 'Enter the supplier and check the GSTIN', text: 'Add the supplier’s name, address, state and GSTIN, and confirm the GSTIN format before issuing.' },
      { name: 'List items with HSN and rate', text: 'Describe each item, add the HSN code, quantity, unit, agreed rate and the expected GST rate.' },
      { name: 'Check the tax split', text: 'Use CGST + SGST if the supplier is in your state and the goods are delivered there; use IGST if the supplier is in another state.' },
      { name: 'Set delivery, payment and approval', text: 'Give the delivery date and address, payment terms and approver, then download the PDF and send it.' },
    ],
    guidance: [
      {
        heading: 'Why put GST details on a purchase order',
        paragraphs: [
          'A PO is not a tax document, so GST on it is your expectation, not a charge. Showing it is still worth the effort: the approver sees the full outgo including tax, the supplier knows the HSN and rate you expect, and your accounts team can check the supplier’s tax invoice against it before booking input tax credit.',
          'The supplier’s tax invoice is what decides the GST actually charged, and it is the document you use to claim credit. If the rate or HSN on the invoice differs from the PO, raise it with the supplier before payment.',
        ],
        links: [{ title: 'GSTIN verification: what to check', href: '/blog/gstin-verification-what-to-check' }],
      },
      {
        heading: 'CGST + SGST or IGST on a PO',
        paragraphs: [
          'The split follows the supplier’s invoice, which depends on the supplier’s location and the place of supply. For a typical purchase of goods delivered to you, a supplier in your own state charges CGST and SGST, and a supplier in another state charges IGST. Bill-to-ship-to deals and deliveries to a third party can change the answer, so check unusual cases with your adviser.',
        ],
        links: [{ title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' }],
      },
      {
        heading: 'PO vs invoice, and a light approval routine',
        paragraphs: [
          'You, the buyer, issue the purchase order; the supplier issues the tax invoice after supplying. Many businesses pay only when three documents agree: the PO, the goods receipt and the supplier’s invoice.',
        ],
        bullets: [
          'Set a value above which a second person must approve the PO.',
          'Quote the supplier’s quotation so the approver can see where the rate came from.',
          'Issue a revised PO, with the same number and a revision mark, if quantity, rate or dates change.',
        ],
      },
    ],
    faq: [
      {
        q: 'Should a purchase order include GST?',
        a: 'It does not have to, but showing the HSN code, GST rate and expected tax makes approvals cover the full cost and helps you check the supplier’s invoice. The GST actually charged is decided by the supplier’s tax invoice.',
      },
      {
        q: 'Can I claim input tax credit on a purchase order?',
        a: 'No. Input tax credit is claimed on the supplier’s tax invoice, subject to the conditions in the GST law. A PO is only your order.',
      },
      {
        q: 'Why should the supplier’s GSTIN be on the PO?',
        a: 'It confirms which registration you are buying from, and lets you check that the GSTIN on their invoice is the same one. Check the format with the GSTIN Validator before issuing the PO.',
      },
      {
        q: 'Who prepares a purchase order, the buyer or the supplier?',
        a: 'The buyer. The supplier usually replies with an acknowledgement, then supplies the goods or services with a tax invoice that quotes your PO number.',
      },
    ],
    relatedTools: ['gstin-validator', 'gst-calculator', 'multi-item-gst-calculator', 'hsn-code-lookup', 'gst-state-code-list', 'amount-in-words-converter'],
    relatedGuides: [
      { title: 'GSTIN verification: what to check', href: '/blog/gstin-verification-what-to-check' },
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
    ],
  },

  'manufacturing-purchase-order': {
    id: 'manufacturing-purchase-order',
    name: 'Manufacturing purchase order',
    seoTitle: 'Raw Material Purchase Order Format for Manufacturers',
    metaDescription:
      'Purchase order format for raw materials and components. Editable item lines, live totals and taxes, logo upload, then print or save a PDF. Works in your browser.',
    h1: 'Raw Material Purchase Order Format',
    intro: 'A PO for raw materials and components where the specification matters as much as the price: grade, tolerances, inspection and staggered deliveries.',
    audience: 'Manufacturers and fabricators buying raw materials, castings, components and consumables.',
    tags: ['Raw material', 'Specifications', 'Inspection'],
    features: ['Specification columns', 'Delivery schedule', 'Inspection terms', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer and supplier', detail: 'Names, addresses, GSTINs and contact persons on both sides.' },
      { label: 'PO details', detail: 'PO number, date, revision number and quotation or rate-contract reference.' },
      { label: 'Material lines', detail: 'Item code, description, grade or standard, size and tolerance, drawing number and revision, HSN, quantity, unit and rate.' },
      { label: 'Delivery schedule', detail: 'Quantities due by date, for orders delivered in lots.' },
      { label: 'Quality terms', detail: 'Inspection point, test certificate requirement, rejection and replacement terms.' },
      { label: 'Commercial terms', detail: 'Freight, packing, payment terms, price basis and GST.' },
      { label: 'Approval', detail: 'Prepared, checked and approved signatures, and supplier acceptance.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Ludhiana auto-parts maker orders 12 tonnes of bright steel bars from a mill. The PO specifies the steel grade, diameter with tolerance and length, asks for a mill test certificate with every lot, and schedules 4 tonnes in each of the next three months.',
        'It states that material failing incoming inspection will be returned at the supplier’s cost, and that each lot’s invoice must quote the PO number and lot number.',
      ],
    },
    steps: [
      { name: 'Reference the agreed rate', text: 'Enter the PO number and the quotation or rate contract the prices come from.' },
      { name: 'Specify each material precisely', text: 'Give the grade or standard, dimensions, tolerances and drawing number with revision.' },
      { name: 'Set the delivery schedule', text: 'Break the total quantity into lots with dates if you do not want everything at once.' },
      { name: 'Write the quality terms', text: 'State where inspection happens, which certificates you need and what happens to rejected material.' },
      { name: 'Approve and issue', text: 'Get the PO checked and approved, then send the PDF and ask the supplier to confirm acceptance.' },
    ],
    guidance: [
      {
        heading: 'Specifications that prevent rejections',
        paragraphs: [
          'Most disputes on raw material orders come from vague descriptions. “MS plate 10 mm” leaves room for argument; a grade or standard, a thickness tolerance, a size and a finish do not. If a drawing governs the part, quote the drawing number and revision so the supplier cannot work from an old version.',
        ],
      },
      {
        heading: 'Inspection and test certificates',
        paragraphs: [
          'Say where inspection will happen: at the supplier’s works before dispatch, or at your factory on receipt. If you need a mill test certificate or another test report with each lot, say so on the PO; it is much harder to ask afterwards.',
          'Also state the rejection terms: whether rejected material is returned or replaced, who pays freight both ways, and how quickly replacements must arrive.',
        ],
      },
      {
        heading: 'Job work and material sent out',
        paragraphs: [
          'If you send your own material to a job worker for processing instead of buying finished material, that outward movement is not a purchase and follows separate GST and e-way bill rules for job work. A purchase order for the job work charges can still sit alongside.',
        ],
        links: [{ title: 'E-way bill rules for job work', href: '/blog/eway-bill-rules-for-job-work' }],
      },
    ],
    faq: [
      {
        q: 'What should a purchase order for raw material include?',
        a: 'At minimum: a precise specification (grade, size, tolerance), quantity and unit, agreed rate, delivery schedule, inspection and certificate requirements, rejection terms, freight and payment terms.',
      },
      {
        q: 'Can one PO cover deliveries over several months?',
        a: 'Yes. Use the delivery schedule to split the total quantity into dated lots. Ask the supplier to quote the PO number and lot on each invoice.',
      },
      {
        q: 'How do I handle a rate change mid-order?',
        a: 'Issue a revised PO with a revision number and the date the new rate applies from, and get the supplier’s acceptance. Avoid agreeing changes only by phone.',
      },
      {
        q: 'Does the supplier need an e-way bill for my raw material?',
        a: 'The e-way bill depends on the movement of goods and the consignment value, not on the PO. Where it is required, the supplier or transporter usually generates it using the supplier’s invoice details.',
      },
    ],
    relatedTools: ['quantity-and-tax-calculator', 'multi-item-gst-calculator', 'hsn-code-lookup', 'gstin-validator', 'delivery-challan-generator', 'eway-bill-eligibility-checker'],
    relatedGuides: [
      { title: 'Digital tools for Indian manufacturers', href: '/blog/digital-tools-for-indian-manufacturers' },
      { title: 'How manufacturers can simplify invoice workflows', href: '/blog/how-manufacturers-can-simplify-invoice-workflows' },
      { title: 'E-way bill rules for job work', href: '/blog/eway-bill-rules-for-job-work' },
    ],
  },

  'international-purchase-order': {
    id: 'international-purchase-order',
    name: 'International purchase order',
    seoTitle: 'International Purchase Order Template: Any Currency, PDF',
    metaDescription:
      'International purchase order template for overseas suppliers. Choose the currency, edit every field, get live totals, print on A4 or Letter, or download a PDF.',
    h1: 'International Purchase Order Template',
    intro: 'A PO for buying from overseas suppliers, with currency, Incoterms, ports and the documents you need to clear the goods.',
    audience: 'Indian importers, trading houses and manufacturers buying from suppliers abroad.',
    tags: ['Import', 'Incoterms', 'Foreign currency'],
    features: ['Incoterms field', 'Ports and shipment mode', 'Document checklist', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer', detail: 'Your company name, address, IEC, GSTIN and logo.' },
      { label: 'Supplier', detail: 'Supplier name, full address and country, contact and email.' },
      { label: 'PO details', detail: 'PO number, date, supplier’s offer reference and currency.' },
      { label: 'Items', detail: 'Description, HS code, quantity, unit, unit price and amount in the order currency.' },
      { label: 'Shipping terms', detail: 'Incoterm with named place, port of loading, port of discharge, mode of shipment and latest shipment date.' },
      { label: 'Payment terms', detail: 'Advance, letter of credit, documentary collection or open account, with timing.' },
      { label: 'Documents required', detail: 'Commercial invoice, packing list, bill of lading or airway bill, certificate of origin and any test or inspection certificates.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Chennai electronics assembler orders 20,000 connectors from a supplier in Shenzhen. The PO is in US dollars, uses FOB Shenzhen, names Chennai port as the port of discharge, sets the latest shipment date, and asks for 30% advance with the balance against a copy of the bill of lading.',
        'It lists the documents the supplier must send: commercial invoice, packing list, bill of lading and a certificate of origin, so the importer’s customs broker can file the bill of entry without chasing paperwork.',
      ],
    },
    steps: [
      { name: 'Set the currency and references', text: 'Choose the order currency and quote the supplier’s offer or quotation reference.' },
      { name: 'Describe goods with HS codes', text: 'Give clear descriptions and HS codes so classification is agreed upfront.' },
      { name: 'Choose the Incoterm', text: 'Enter the Incoterm with its named place and edition, for example “FOB Shenzhen, Incoterms 2020”.' },
      { name: 'Add shipment and payment terms', text: 'Name the ports, mode, latest shipment date and how and when you will pay.' },
      { name: 'List required documents', text: 'Tell the supplier exactly which documents must accompany or follow the shipment, then send the PDF.' },
    ],
    guidance: [
      {
        heading: 'Incoterms in brief',
        paragraphs: [
          'Incoterms are standard trade terms published by the International Chamber of Commerce. They set out who arranges and pays for each leg of transport and insurance, and at what point risk passes from seller to buyer. They do not deal with when ownership passes or when payment is due. Always write the term with a named place and the edition, as the current edition is Incoterms 2020.',
        ],
        bullets: [
          'EXW (Ex Works): you collect from the supplier’s premises and handle almost everything.',
          'FOB (Free On Board): the supplier delivers onto the vessel at the named port of loading; sea freight only.',
          'CFR / CIF: the supplier pays sea freight to the named destination port; CIF also includes insurance. Risk still passes at loading.',
          'DAP (Delivered At Place): the supplier delivers to a named place, ready for unloading; you handle import clearance and duties.',
          'DDP (Delivered Duty Paid): the supplier also clears import and pays duties, which is uncommon for imports into India.',
        ],
      },
      {
        heading: 'Import formalities to plan for',
        paragraphs: [
          'Importers in India generally need an Importer-Exporter Code (IEC). Customs duty and IGST on imports are assessed when the bill of entry is filed, using the invoice value, classification and origin. Some goods need licences, certificates or standards approvals before they can be cleared. Check the current requirements for your product with your customs broker before you place the order, not after the goods land.',
        ],
      },
    ],
    faq: [
      {
        q: 'Which Incoterm should I use on an import PO?',
        a: 'It depends on how much of the shipping you want to control. FOB and EXW give you control of freight; CIF and DAP put more on the supplier. Discuss it with your freight forwarder and make sure the term suits your mode of transport.',
      },
      {
        q: 'Should the PO be in rupees or the supplier’s currency?',
        a: 'Most import orders are placed in the currency agreed with the supplier, often US dollars or euros. Choose that currency in the editor so the PO matches the supplier’s offer.',
      },
      {
        q: 'Why list documents on the purchase order?',
        a: 'Your bank and customs broker need specific documents to release payment and clear goods. Listing them on the PO makes it part of the order, so the supplier knows what to send before shipping.',
      },
      {
        q: 'Do I need HS codes on an import PO?',
        a: 'It is strongly advisable. Agreeing the HS code early helps you estimate duty, check whether any licence is needed and avoid classification surprises at customs.',
      },
    ],
    relatedTools: ['hsn-code-lookup', 'gst-calculator', 'gstin-validator', 'amount-in-words-converter'],
    relatedGuides: [
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
      { title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' },
    ],
  },

  // ---------------- Commercial invoices ----------------
  'export-commercial-invoice': {
    id: 'export-commercial-invoice',
    name: 'Export commercial invoice',
    seoTitle: 'Export Invoice Format (India): Commercial Invoice in PDF',
    metaDescription:
      'Export commercial invoice format for Indian exporters. Edit fields, pick a foreign currency, see live totals, add your logo and download a PDF. No sign-up.',
    h1: 'Export Invoice Format for Indian Exporters',
    intro: 'A commercial invoice for goods exported from India, with IEC, GSTIN, LUT or IGST status, shipment details and values in the contract currency.',
    audience: 'Indian manufacturers, merchant exporters and trading houses shipping goods abroad.',
    tags: ['Export from India', 'LUT / IGST', 'Sea or air'],
    features: ['IEC and GSTIN fields', 'LUT / IGST declaration', 'FOB / CIF values', ...CORE_FEATURES],
    includes: [
      { label: 'Exporter', detail: 'Name, address, IEC, GSTIN, state and logo.' },
      { label: 'Invoice details', detail: 'Export invoice number and date, buyer’s order number and date, other references.' },
      { label: 'Consignee and buyer', detail: 'Consignee name and address, buyer if different, and notify party.' },
      { label: 'Shipment', detail: 'Pre-carriage, place of receipt, vessel or flight, port of loading, port of discharge, final destination, country of origin and country of final destination.' },
      { label: 'Terms', detail: 'Terms of delivery (Incoterm) and terms of payment.' },
      { label: 'Goods', detail: 'Marks and numbers, number and kind of packages, description, HS code, quantity, rate and amount.' },
      { label: 'Values', detail: 'Currency, FOB value, freight and insurance where applicable, total, and amount in words.' },
      { label: 'GST status', detail: 'Supply under LUT without payment of IGST, or with payment of IGST, and the LUT reference where used.' },
      { label: 'Declaration', detail: 'Declaration that the invoice shows the actual price and particulars are true, with signature.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Tiruppur garment exporter ships 3,000 cotton T-shirts to a buyer in Hamburg on CIF terms, priced in euros. The invoice shows the IEC and GSTIN, the buyer’s order number, port of loading as Tuticorin and port of discharge as Hamburg, and splits the CIF value into FOB, freight and insurance.',
        'The exporter has a valid LUT for the year, so the invoice carries a note that the supply is meant for export under LUT without payment of IGST, along with the LUT reference.',
      ],
    },
    steps: [
      { name: 'Enter exporter details', text: 'Add your name, address, IEC and GSTIN, and your logo.' },
      { name: 'Add consignee, buyer and notify party', text: 'Fill in who receives the goods, who is paying (if different) and who should be notified on arrival.' },
      { name: 'Fill shipment details', text: 'Enter ports of loading and discharge, final destination, vessel or flight and country of origin.' },
      { name: 'Choose terms and currency', text: 'Set the Incoterm, payment terms and the invoice currency.' },
      { name: 'List the goods', text: 'Add marks and numbers, packages, description, HS code, quantity, rate and amount for each line.' },
      { name: 'Set GST status and sign', text: 'Mark the supply as under LUT or with IGST payment, check the declaration, then download the PDF.' },
    ],
    guidance: [
      {
        heading: 'IEC, GSTIN and the export invoice',
        paragraphs: [
          'An Importer-Exporter Code (IEC), issued by the DGFT, is generally needed to export goods from India, and customs uses it to identify you on the shipping bill. Your GSTIN on the same invoice links the export to your GST returns, which matters when you claim refunds.',
        ],
      },
      {
        heading: 'Exporting under LUT or with IGST payment',
        paragraphs: [
          'Exports are treated as zero-rated supplies under GST. In general an exporter can either export under a Letter of Undertaking (LUT) without paying IGST and claim a refund of unused input tax credit, or pay IGST on the export and claim a refund of that IGST. The invoice should make clear which route applies: exports under LUT commonly carry an endorsement along the lines of “Supply meant for export under LUT without payment of IGST”, with the LUT reference (ARN). Eligibility, conditions and the exact endorsement wording should be confirmed with your tax adviser or on the GST portal.',
        ],
      },
      {
        heading: 'FOB, CIF and the shipping bill',
        paragraphs: [
          'FOB value covers the goods delivered on board at the port of loading; CIF adds freight and insurance to the destination port. If you sell on CIF or CFR terms, showing the FOB value, freight and insurance separately helps, because the export value declared on the shipping bill is generally on an FOB basis.',
          'Your customs broker (CHA) files the shipping bill using this invoice and the packing list, so the descriptions, HS codes, quantities and values must match across all three. Check the destination country’s customs requirements too, since the buyer will clear the goods there using the same invoice.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is an export invoice the same as a commercial invoice?',
        a: 'For goods leaving India, the export invoice is the commercial invoice for the shipment. Many exporters also include GST particulars on it so one document serves customs, the buyer and GST records.',
      },
      {
        q: 'What is the difference between exporting under LUT and paying IGST?',
        a: 'Under LUT you do not pay IGST on the export and can claim a refund of accumulated input tax credit. With IGST payment you pay the tax and then claim it back as a refund. Conditions apply to each route, so confirm which suits you with your adviser.',
      },
      {
        q: 'Which currency should an export invoice be in?',
        a: 'Usually the currency agreed in the contract with the buyer. You can choose any currency in the editor; some exporters also note the exchange rate used for customs or GST purposes.',
      },
      {
        q: 'Does this template file the shipping bill?',
        a: 'No. It prepares the invoice document only. The shipping bill is filed with Indian customs, usually by your customs broker, using the invoice and packing list.',
      },
      {
        q: 'Do I need an e-way bill for goods going to the port?',
        a: 'Goods moving by road from your factory to the port or airport may need an e-way bill depending on the value and the movement. Check the current e-way bill rules for exports before dispatch.',
      },
    ],
    relatedTools: ['hsn-code-lookup', 'gstin-validator', 'amount-in-words-converter', 'eway-bill-eligibility-checker', 'distance-calculator'],
    relatedGuides: [
      { title: 'E-way bill rules in India (Rule 138)', href: '/eway-bill-rules' },
      { title: 'E-way bill rules for returns and special transactions', href: '/blog/eway-bill-returns-and-special-transactions' },
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
    ],
  },

  'courier-commercial-invoice': {
    id: 'courier-commercial-invoice',
    name: 'Courier commercial invoice',
    seoTitle: 'Commercial Invoice for Courier Shipments: Free PDF Template',
    metaDescription:
      'Commercial invoice for courier parcels abroad: AWB number, reason for export, HS code, origin, weights and declared value. Edit, then print or save a PDF.',
    h1: 'Commercial Invoice for Courier Shipments',
    intro: 'A customs invoice for international courier parcels such as samples, small orders, gifts and returns, with AWB number, reason for export, HS codes, weights and a signed declaration.',
    audience: 'Small exporters, online sellers and anyone sending goods abroad by international courier.',
    tags: ['Courier', 'Samples and small parcels', 'Customs declaration'],
    features: ['AWB / tracking number', 'Reason for export', 'HS code and origin per line', ...CORE_FEATURES],
    includes: [
      { label: 'Shipper', detail: 'Name, address, phone, email and your tax or registration number where the courier asks for it.' },
      { label: 'Receiver / importer', detail: 'Name, full address with postcode, phone, email and the importer’s tax ID where the destination asks for it.' },
      { label: 'Shipment', detail: 'Invoice number and date, courier name, AWB or tracking number, currency and terms of delivery.' },
      { label: 'Reason for export', detail: 'Sale, commercial sample, gift, return, repair or temporary export.' },
      { label: 'Goods lines', detail: 'Plain-language description, HS code, country of origin, quantity, unit value and total value.' },
      { label: 'Packages and weights', detail: 'Number of boxes, net weight and gross weight, matching the courier booking.' },
      { label: 'Declaration', detail: 'A statement that the information is true and correct, with name, signature and date.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Jaipur handicrafts studio sends two cartons of block-printed cushion covers to a prospective buyer in Toronto by international courier. The invoice gives the AWB number from the booking, sets the reason for export as “Commercial sample”, lists each design with its HS code and “Country of origin: India”, shows a realistic unit value rather than zero, and states net and gross weights that match what the courier weighed.',
      ],
    },
    steps: [
      { name: 'Book the shipment first', text: 'Get the AWB or tracking number and confirmed weights from the courier booking.' },
      { name: 'Enter shipper and receiver', text: 'Add full names, addresses, phone numbers and any tax ID the destination asks for.' },
      { name: 'Choose the reason for export', text: 'Sale, sample, gift, return or repair; customs treats each differently.' },
      { name: 'Describe each item precisely', text: 'Say what it is, what it is made of and what it is for, then add the HS code and country of origin.' },
      { name: 'Enter values and weights', text: 'Use realistic values in the chosen currency and weights that match the booking.' },
      { name: 'Sign and attach', text: 'Sign and date the declaration, print the copies the courier asks for and attach them to the parcel.' },
    ],
    guidance: [
      {
        heading: 'Why couriers ask for a commercial invoice',
        paragraphs: [
          'When a parcel crosses a border, destination customs needs to know what is inside, what it is worth and where it was made before releasing it. International couriers clear most parcels on the basis of the commercial invoice you attach, so a missing or vague invoice is one of the most common reasons parcels are held.',
        ],
      },
      {
        heading: 'Reason for export and declared value',
        paragraphs: [
          'Customs treats a sale, a free sample, a gift and a returned item differently, so the reason for export should be stated clearly. Even when nothing is being paid, declare a realistic value: many customs authorities need one to assess the parcel, and an obviously low or zero value invites questions.',
        ],
        bullets: [
          'Sale: use the price the buyer is paying.',
          'Sample or gift: use a fair value for the goods and mark the reason.',
          'Return or repair: reference the original shipment or invoice if you have it.',
        ],
      },
      {
        heading: 'HS codes, country of origin and the declaration',
        paragraphs: [
          'The HS code identifies goods for customs worldwide. The first six digits are common internationally, and countries add further digits for their own tariffs. Country of origin is where the goods were made, not where they are posted from. The signed declaration confirms the invoice is true; misdescribing goods or under-declaring value can lead to delays, penalties or seizure.',
          'Requirements differ by destination and by courier. Some countries ask for the importer’s tax number or specific wording, and couriers set their own rules on copies. Always check the destination country’s customs requirements and your courier’s guidance before you ship. For a formal export from India that needs IEC, GSTIN and LUT details, use the export invoice format instead.',
        ],
        links: [{ title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' }],
      },
    ],
    faq: [
      {
        q: 'Do I need a commercial invoice for an international courier parcel?',
        a: 'For goods, usually yes. Couriers and destination customs generally need one to clear the parcel. Documents-only shipments are often treated differently; check with your courier.',
      },
      {
        q: 'Can I write “no commercial value” for samples or gifts?',
        a: 'It is safer to declare a realistic value and mark the reason as sample or gift. Many customs authorities need a value to assess the parcel even when nothing is being paid.',
      },
      {
        q: 'Where do I find the AWB number?',
        a: 'The courier gives you the air waybill (AWB) or tracking number when you book the shipment. Book first, then add it to the invoice so the two documents can be matched.',
      },
      {
        q: 'How many copies should I attach to the parcel?',
        a: 'Couriers set their own rules, and several copies are commonly requested. Check your courier’s current guidance when you book.',
      },
      {
        q: 'Is this the right template for a formal export from India?',
        a: 'For a commercial export that needs IEC, GSTIN and LUT or IGST details, use the export invoice format. This template focuses on what couriers and destination customs ask for on parcel shipments.',
      },
    ],
    relatedTools: ['hsn-code-lookup', 'amount-in-words-converter', 'gstin-validator'],
    relatedGuides: [
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
      { title: 'E-way bill rules for returns and special transactions', href: '/blog/eway-bill-returns-and-special-transactions' },
    ],
  },
};

export function categoryContent(kind: DocumentKind): CategoryContent {
  return CATEGORY_CONTENT[kind];
}

export function templateContent(id: TemplateId): TemplateContent {
  return TEMPLATE_CONTENT[id];
}
