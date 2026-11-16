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
const CORE_FEATURES = ['Editable fields', 'Live totals', 'Your logo', 'Currency choice', 'PDF download', 'Share on WhatsApp', 'Print', 'A4 · A5 · Letter · Legal'];

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
        a: 'These templates download as PDF or print from your browser. If you prefer a spreadsheet, download the free GST or non-GST invoice format in Excel from the invoice format in Excel page; it has the tax formulas built in. Word files are not offered.',
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
      { title: 'GST invoice rules (Rule 46)', href: '/gst-invoice-rules' },
      { title: 'Free invoice generator (with or without GST)', href: '/invoice-generator' },
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
        {
          heading: 'Which purchase order template should you use?',
          paragraphs: [
            'Pick the PO template by who you buy from and what decides whether you accept the goods. For everyday domestic purchases, use the GST purchase order. For raw materials bought to a specification, use the manufacturing purchase order. For suppliers outside India, use the international purchase order, which adds currency, Incoterms and shipping documents.',
          ],
          bullets: [
            'If you buy from an Indian supplier and want GSTINs, HSN codes and the tax split shown, use the GST PO.',
            'If grade, drawing revision, test certificates or lot-wise delivery decide whether you accept the goods, use the manufacturing PO.',
            'If you pay in a foreign currency and need ports, an Incoterm and a document list, use the international PO.',
            'If you buy services such as maintenance or consultancy, the GST PO works: enter the SAC code in the HSN/SAC column.',
          ],
        },
        {
          heading: 'Five things every PO should say in writing',
          paragraphs: [
            'Every purchase order, whatever the template, should leave the supplier nothing to guess. Write down the rate basis, who pays freight, the delivery address with a contact, the required-by date and the payment terms. These five lines settle the questions that otherwise turn into disputes after the goods arrive.',
          ],
          bullets: [
            'Rate basis: “plus GST” or “inclusive of GST”, never just a number.',
            'Freight: who books and pays it, and to which point the price applies.',
            'Delivery: the full address, the receiving contact and their phone number.',
            'Required-by date: a date, not “urgent” or “ASAP”, so a late delivery can be shown.',
            'Payment terms: for example “30 days from receipt of goods and invoice”, so both sides count from the same day.',
          ],
        },
        {
          heading: 'Common purchase order mistakes',
          paragraphs: [
            'PO disputes often trace back to something the PO left unsaid or a change nobody wrote down. The fix is cheap: put every agreed term on the PO, send a revised PO for every change, and ask the supplier to quote your PO number everywhere. These slips cause the most trouble.',
          ],
          bullets: [
            'Agreeing a new price or quantity by phone and never issuing a revised PO.',
            'Sending a revised PO with only the changed line, so nobody has the full current version.',
            'Accepting a supplier’s invoice without a PO number, then matching it to the wrong order.',
            'Leaving old POs open after delivery, which lets a duplicate or late invoice slip through.',
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
      {
        q: 'Do I need a purchase order for every purchase?',
        a: 'GST law does not ask for purchase orders, but a PO makes any purchase easier to approve, track and match to the supplier’s invoice. Many businesses set a value above which a PO is required and handle small cash purchases without one.',
      },
      {
        q: 'Can I cancel a purchase order?',
        a: 'Usually yes, before the supplier ships, by a written cancellation that quotes the PO number. Whether the supplier can charge for work already done depends on the terms you agreed, so add a cancellation clause to large orders.',
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
    features: ['GSTIN and HSN fields', 'CGST/SGST or IGST', 'Thermal print 58/80 mm', ...CORE_FEATURES],
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
      { title: 'GST invoice rules (Rule 46)', href: '/gst-invoice-rules' },
      { title: 'Free invoice generator (with or without GST)', href: '/invoice-generator' },
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
      { title: 'GST invoice rules (Rule 46)', href: '/gst-invoice-rules' },
      { title: 'Free invoice generator (with or without GST)', href: '/invoice-generator' },
      { title: 'E-way bill vs tax invoice', href: '/eway-bill-vs-sales-invoice' },
      { title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' },
    ],
  },

  'simple-sales-invoice': {
    id: 'simple-sales-invoice',
    name: 'Simple sales invoice',
    seoTitle: 'Simple Invoice Format: Free Bill Template to Print or PDF',
    metaDescription:
      'A simple invoice and bill format. Edit the fields, upload your logo, pick a currency, get live totals, then print on A4 or A5 or save a PDF. No sign-up.',
    h1: 'Simple Invoice Format (Bill Format)',
    intro: 'A short, uncluttered bill for small sales: your details, the customer, a few lines and a total.',
    audience: 'Small shops, home businesses and sellers who need a quick bill without GST columns.',
    tags: ['Minimal', 'Goods', 'B2C', 'Non-GST'],
    features: ['Minimal layout', 'Prints well on A5', 'Thermal print 58/80 mm', ...CORE_FEATURES],
    includes: [
      { label: 'Your details', detail: 'Business or trading name, address, phone and logo. Use the name that appears on your bank account or UPI ID, so customers recognise who they paid.' },
      { label: 'Bill details', detail: 'Bill number and date. A short running series such as 001, 002 is fine, as long as no number ever repeats.' },
      { label: 'Customer', detail: 'Customer name, and address or phone if you want to record it. For credit sales always take a phone number; it is your only way to follow up.' },
      { label: 'Items', detail: 'Description, quantity, rate and amount for each line. Use units customers understand: “2 kg”, “1 dozen”, “3 hours”.' },
      { label: 'Totals', detail: 'Subtotal, optional discount or other charges, and the total payable. Show delivery charges on their own line rather than hiding them in the rate.' },
      { label: 'Payment note', detail: 'Payment mode, UPI or bank details, and a thank-you or terms line. Write “Paid” or “Due by” so nobody argues about it later.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A home baker in Pune who is not registered under GST takes a birthday order: one 2 kg cake at ₹1,800 and 24 cupcakes at ₹60 each. The bill shows the two item lines, a delivery charge of ₹100 on its own line, and a total of ₹3,340.',
        'She enters the customer’s name and phone, writes “Advance ₹1,000 by UPI, balance on delivery”, and prints the bill on A5 to hand over with the order. There is no GSTIN, no HSN and no tax line, because she is not registered and cannot collect GST.',
        'Later a Surat textile trader (sample GSTIN 24ABCDE1234F1Z5) orders 40 gift hampers for his staff. He is registered, but she cannot issue him a tax invoice while she is unregistered. Her simple bill records the sale correctly, and he understands there is no GST on it to claim as input tax credit.',
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
        heading: 'Who the simple bill format is for',
        paragraphs: [
          'A simple bill records a sale without any GST columns: who sold, who bought, what, how many and the total. Use it if you are not registered under GST, such as a home business, a tutor or a small stall, or for informal records where no tax is charged.',
          'If you are GST-registered and the sale is taxable, use the GST tax invoice instead. If you bill clients for services against a PO with payment terms, the service invoice fits better. If you ship cartons to dealers with transport details, use the wholesale invoice.',
        ],
      },
      {
        heading: 'When a simple bill is not enough',
        paragraphs: [
          'A simple bill stops being enough once you are registered under GST and make a taxable sale. The law then asks for a tax invoice with your GSTIN, HSN codes, tax rates and tax amounts. Registered sellers under the composition scheme, or selling only exempt goods, generally issue a bill of supply instead.',
          'A bill of supply carries a declaration that no tax is collected. Check the current wording with your adviser before you print it.',
          'If you are not registered, never add GST to your price or print a tax line. A person who is not registered is not allowed to collect tax, even “just to cover costs”.',
        ],
      },
      {
        heading: 'Field by field: what to fill in, and what to leave out',
        paragraphs: [
          'A simple bill should answer three questions anyone can check later: who sold, what was sold, and how much was paid or is still due. Fill every field that answers those and leave the rest out. Empty HSN or tax columns copied from other formats only confuse customers.',
        ],
        bullets: [
          'Bill number: running and unique. Mark cancelled bills as cancelled instead of deleting them, so the series has no unexplained gaps.',
          'Date: the date of the sale, not the day you got round to writing the bill.',
          'Customer: a name is enough for cash sales; add a phone or address when the customer will pay later.',
          'Items: plain words and real units. “Cotton saree, printed, 1 no.” beats “Item 4”.',
          'Amount in words: harder to alter on a printed copy than figures alone.',
          'Payment status: “Paid by UPI”, “Paid cash” or “Due by 10 December”.',
        ],
      },
      {
        heading: 'Common mistakes, and keeping bills useful',
        paragraphs: [
          'Simple bills earn their keep months later, when a customer disputes a payment or you need a month’s sales total for a loan or rent discussion. A numbered, dated bill with a clear payment status settles most arguments in a minute. These slips make bills far less useful.',
        ],
        bullets: [
          'Reusing a bill number, or skipping numbers without noting why.',
          'Overwriting a wrong bill. Cancel it in your records, issue the next number and keep both copies.',
          'Not keeping copies. Save every PDF in a folder per month; that folder becomes your sales register.',
          'Printing someone else’s GSTIN, such as a relative’s firm, on your bill.',
          'Hiding a discount inside a lower rate, which is hard to explain when the customer checks the bill later.',
        ],
      },
      {
        heading: 'Paper size and thermal receipts',
        paragraphs: [
          'Choose A5 for a bill with a handful of lines, A4 when you have many items or want room for terms, and a 58 mm or 80 mm thermal roll for a counter receipt. Match the size to your printer before printing a batch. A bill cut off at the edges looks careless and may lose the total.',
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
      {
        q: 'Can a GST-registered buyer claim input tax credit on my simple bill?',
        a: 'No. Input tax credit needs a tax invoice from a registered supplier that shows the GST charged. A simple bill from an unregistered seller has no GST on it, so there is nothing to claim.',
      },
      {
        q: 'What should I do if I made a mistake on a bill I already handed over?',
        a: 'Do not reuse or overwrite the number. Mark the original as cancelled in your records, issue a fresh bill with the next number, and keep both copies so your series still adds up.',
      },
      {
        q: 'Can I add a delivery charge or a discount?',
        a: 'Yes. Put each on its own line below the items so the customer sees exactly how you reached the total. A discount shown openly is easier to explain than a quietly reduced rate.',
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
      { label: 'Provider details', detail: 'Business name, address, GSTIN (if registered), contact and logo. If you hold registrations in two states, bill from the one that made the supply.' },
      { label: 'Invoice details', detail: 'Invoice number, date, place of supply and due date. Write the due date as a date, such as “Due 15 October 2026”, because that is what the client’s payables team works to.' },
      { label: 'Client', detail: 'Client name, billing address and GSTIN if registered. For many B2B services the client’s registered location decides the place of supply, so copy the address from their GST registration, not an email signature.' },
      { label: 'Service period', detail: 'The dates or month the services relate to. Write a full range such as “1–30 September 2026”, which avoids confusion when a contract runs across March and April.' },
      { label: 'Service lines', detail: 'Description, SAC code, hours or units, rate and amount. Describe the work in words the client understands, such as “Monthly server maintenance, 2 sites”, not an internal job code.' },
      { label: 'Tax and totals', detail: 'Taxable value, CGST/SGST or IGST, total and amount in words. Put recharged costs such as travel on their own line, and ask your adviser whether they form part of the taxable value.' },
      { label: 'Payment', detail: 'Bank account, UPI, payment terms and any reference such as a PO or contract number. Many companies will not process a service bill until their PO number is on it.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Bengaluru IT support firm (sample GSTIN 29ABCDE1234F1Z5) bills a Chennai client (sample GSTIN 33PQRST5678K1Z2) for September: a fixed monthly maintenance fee plus 6 hours of on-site work at an hourly rate. Each line carries the relevant SAC code, the service period reads “1–30 September 2026”, and because the client is registered in Tamil Nadu the invoice charges IGST.',
        'Line 1 is the fixed fee: quantity 1, rate ₹40,000. Line 2 is the on-site work: quantity 6 hours, rate ₹1,500, amount ₹9,000. The taxable value is ₹49,000, and IGST is worked out on it at the rate that applies to each SAC code.',
        'The client’s annual contract PO number goes in the reference field, and the due date reads 30 days from the invoice date, as the contract says. The client’s payables team can now match the bill to the contract without writing back.',
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
        heading: 'Who the service invoice is for',
        paragraphs: [
          'A service invoice is the bill you raise for work, time or expertise rather than goods. Use it if you are a consultant, agency, contractor, trainer, repair firm or freelancer billing hours, a retainer or a fixed fee. It swaps goods quantities and HSN codes for SAC codes, a service period and clear work descriptions.',
          'If you only bill for work, use this template. If you sell goods and also fit them, such as a dealer who supplies and installs an AC, use the GST tax invoice for the goods and ask your adviser how the installation should be billed. If you are not GST-registered and bill small one-off jobs, the simple sales invoice is enough.',
        ],
      },
      {
        heading: 'Field by field: what your client’s accounts team checks',
        paragraphs: [
          'Your client’s accounts team checks four things before it pays a service bill: the GSTIN and place of supply, the service period against the contract, a clear description of the work, and their PO or contract number. Miss one and the invoice can come back unpaid, often weeks later.',
        ],
        bullets: [
          'GSTIN and place of supply: for many B2B services the place of supply is the client’s registered location, which decides CGST + SGST or IGST.',
          'Service period: start and end dates, so the client books the cost in the right month.',
          'Description and SAC: one line per type of service, each with its own SAC code if the services differ.',
          'Hours or units: show quantity and rate, not just a lump sum, when the contract pays by the hour.',
          'Reference: the client’s PO, work order or contract number, exactly as they issued it.',
          'Bank details: check the account number and IFSC twice; one wrong digit can delay the payment for weeks.',
        ],
      },
      {
        heading: 'SAC codes on service invoices',
        paragraphs: [
          'A SAC code is the Services Accounting Code that classifies a service under GST, the way an HSN code classifies goods. SAC codes sit under chapter 99 of the GST classification and link to the rate you charge. Pick the code that matches what you actually supplied, not the one with the lowest rate.',
          'If one invoice covers two different services, such as design and printing, give each its own line and code. Check the rate for each code against the current notification on the CBIC GST site.',
        ],
      },
      {
        heading: 'Service period, place of supply and timing',
        paragraphs: [
          'The service period tells the client which month or contract stage the bill covers. State it on every service invoice as a date range. It matters most for retainers, annual contracts and work that runs across two months or two financial years, where a vague period sends the bill back for correction.',
          'Place of supply for services follows different rules from goods. For many B2B services it is the location of the registered client, but services linked to immovable property, events and some other categories have their own rules. Check before you choose CGST + SGST or IGST.',
          'GST rules also set time limits for issuing service invoices, and an advance received for services generally needs a receipt voucher. Check the current timing rules with your adviser, especially for long contracts billed in stages.',
        ],
      },
      {
        heading: 'Common mistakes on service invoices',
        paragraphs: [
          'Service invoices are often sent back for small, avoidable details rather than the amount. The usual culprits are a missing PO number, a vague description, a wrong tax split and no service period. Run through this list before you send the PDF, especially to large companies with strict payables teams.',
        ],
        bullets: [
          'Writing “Professional charges” with no detail. Say what you did, and for which project.',
          'Choosing CGST + SGST from the client’s site address when their registered address, which often decides the place of supply, is in another state.',
          'Leaving out the SAC code, or copying one from an old invoice without checking it still fits the work.',
          'Folding travel or materials into the fee, so the client cannot see or approve them.',
          'Restarting numbers at 001 for each client. Use one consecutive series for the financial year, or a few planned series, so no number repeats.',
          'Reducing the invoice for TDS. Bill the full amount; the client deducts income-tax TDS where it applies and gives you a certificate.',
        ],
      },
      {
        heading: 'No e-way bill for services',
        paragraphs: [
          'An e-way bill records the movement of goods, so a pure service invoice never needs one. If your job also involves sending parts, equipment or materials by road, that movement may need its own document and, above the threshold, an e-way bill. Check the goods side separately from the service bill.',
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
      {
        q: 'Should a service invoice show hours worked or a fixed fee?',
        a: 'Show whatever your contract pays for. If the client pays by the hour, list hours and the hourly rate so they can check them against timesheets. For a fixed fee or retainer, one line with quantity 1 is clearer.',
      },
      {
        q: 'Do I need a separate invoice every month for a retainer?',
        a: 'Most retainers are billed once per billing period set in the contract, each invoice with its own number and service period. That keeps the client’s monthly books and your GST returns in step. Check the timing rules for continuous services with your adviser.',
      },
      {
        q: 'What if my client deducts TDS from my invoice?',
        a: 'Bill the full amount as usual. The client deducts income-tax TDS where it applies, pays you the balance and issues a TDS certificate, which you use when you file your income tax return.',
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
      { label: 'Seller and buyer', detail: 'Names, addresses, GSTINs, states and state codes, plus a separate ship-to address. The ship-to state and PIN feed the e-way bill, so take them from the buyer’s order, not from memory.' },
      { label: 'Order references', detail: 'Invoice number and date, buyer’s PO number and date. Large dealers often hold payment until the PO number on your bill matches their records.' },
      { label: 'Line items', detail: 'Description, HSN, packing (cases, bags, bundles), quantity, unit, rate, trade discount and taxable value. Where the packing unit and billing unit differ, show both, such as 40 boxes = 57.6 sq m.' },
      { label: 'Tax', detail: 'CGST/SGST or IGST by place of supply, with rate and amount. In a bill-to-ship-to deal the place of supply can follow the party you bill rather than the delivery address, so check before you split.' },
      { label: 'Transport', detail: 'Transporter name, vehicle number, LR/GR number and date, and e-way bill number. Fill these after the truck is booked, because vehicles often change at the last minute.' },
      { label: 'Totals', detail: 'Total packages, taxable value, tax, freight or other charges, grand total and amount in words. Freight you charge the buyer is generally part of the taxable value; confirm with your adviser.' },
      { label: 'Footer', detail: 'Bank details, credit terms, and signature. Write the credit period plainly, such as “Payment within 30 days of invoice date”.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Morbi tiles manufacturer (sample GSTIN 24ABCDE1234F1Z5) dispatches 1,200 boxes of floor tiles to a Jaipur distributor (sample GSTIN 08FGHIJ5678K1Z3) on one truck. The invoice lists three designs by HSN with boxes and square metres, notes 40 pallets in total, and carries the transporter’s LR number and vehicle number.',
        'Because the consignment value is well above the e-way bill threshold and the goods move from Gujarat to Rajasthan, an e-way bill is generated on the official portal from these details, and its number is written on the invoice before the truck leaves.',
        'The following week the distributor asks for a part load to go straight to a builder’s site in Ajmer, still billed to the distributor. The seller keeps “Bill to” as the Jaipur distributor, puts the Ajmer site under “Ship to”, and uses the Ajmer PIN for the e-way bill distance.',
        'That truck arrives with 2 boxes broken. Because the invoice counts boxes per design, the distributor notes the damage on the LR, and the seller issues a credit note against the invoice number instead of arguing over square metres.',
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
        heading: 'Who the wholesale invoice is for',
        paragraphs: [
          'A wholesale invoice is a GST tax invoice built for bulk B2B dispatches. Use it if you are a manufacturer, wholesaler or distributor sending cartons, bags or pallets to dealers by truck, and you need packing counts, the buyer’s PO, a ship-to address and transport details on the same page.',
          'If you sell a few items across the counter or bill without transport, the GST tax invoice is cleaner. If you are not registered and sell small quantities, use the simple sales invoice. If the goods leave India, switch to the export commercial invoice.',
        ],
      },
      {
        heading: 'Field by field: what the buyer’s godown and accounts check',
        paragraphs: [
          'Two teams read your wholesale invoice. The buyer’s godown counts packages against your total and the LR, and their accounts team matches rates, discounts and the PO number before booking input tax credit. Fill every field with both readers in mind, and most errors stop at your desk.',
        ],
        bullets: [
          'Total packages: the first number the godown checks when the truck is unloaded.',
          'Packing and billing units: boxes for counting, square metres or kg for pricing. Show both where they differ.',
          'Trade discount: shown on the invoice line, so the taxable value already reflects it.',
          'PO number and date: copied exactly from the buyer’s order, prefixes included.',
          'Ship-to address and PIN: the delivery point for the truck and for the e-way bill.',
          'Vehicle and LR number: these must match Part B of the e-way bill and the transporter’s papers.',
        ],
      },
      {
        heading: 'Transport details and the e-way bill',
        paragraphs: [
          'An e-way bill is generally needed when a consignment worth more than ₹50,000 moves by road, and wholesale loads usually cross that line. It is generated on the official portal from your invoice number, date, value, HSN codes and GSTINs, so the invoice and the e-way bill must match exactly.',
          'Vehicle details go into Part B. Some states have set different limits for movement within the state, so confirm current rules with the eligibility checker before dispatch.',
          'Validity runs from when Part B is first entered: generally 1 day for every 200 km for normal cargo. If the truck changes on the way, update Part B instead of generating a new e-way bill.',
        ],
        links: [
          { title: 'Documents required for an e-way bill', href: '/documents-required-for-eway-bill' },
          { title: 'E-way bills for wholesalers and distributors', href: '/blog/eway-bills-for-wholesalers-and-distributors' },
          { title: 'E-way bill Part A and Part B explained', href: '/blog/eway-bill-part-a-and-part-b-explained' },
        ],
      },
      {
        heading: 'Copies, discounts and freight',
        paragraphs: [
          'For goods, the GST rules generally ask for an invoice in three copies: the original for the buyer, a duplicate for the transporter and a triplicate for you. Print and mark each copy before the truck is loaded. A driver stopped for checking without the transporter copy loses time for everyone.',
          'Discounts known at the time of sale and shown on the invoice reduce the taxable value. Discounts given later, such as a quarterly target scheme, are usually handled by credit note, subject to conditions; ask your adviser how your scheme should be shown.',
        ],
      },
      {
        heading: 'Common mistakes on wholesale invoices',
        paragraphs: [
          'Wholesale invoices carry more lines and bigger amounts, so a small slip costs more and travels further: into the e-way bill, the buyer’s books and your returns. Most slips fall into four groups: units, discounts, addresses and transport numbers. Check those before the truck leaves, not after.',
        ],
        bullets: [
          'Billing in square metres while the packing list counts boxes, with no conversion shown.',
          'Putting the buyer’s customer under “Bill to” when your contract is with the distributor.',
          'Typing the vehicle number from memory; one wrong letter breaks the match with Part B.',
          'Generating the e-way bill before the invoice is final, then changing the value. An e-way bill cannot be edited, only cancelled within 24 hours and generated again.',
          'Leaving out the total package count, so a short delivery is hard to prove.',
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
      {
        q: 'Should freight go on the wholesale invoice or be billed separately?',
        a: 'If you arrange and charge for delivery, freight is usually shown on the invoice and is generally part of the taxable value. If the buyer books and pays the transporter directly, leave it off. Confirm the treatment for your contracts with your adviser.',
      },
      {
        q: 'How many copies of a wholesale invoice should I print?',
        a: 'For goods, the usual practice under the GST rules is three: the original for the buyer, the duplicate for the transporter and the triplicate for your records. Mark each copy clearly before it leaves.',
      },
      {
        q: 'What if the vehicle changes after I print the invoice?',
        a: 'Update Part B of the e-way bill with the new vehicle number on the portal, and note the change on your copy of the invoice. Part B can be updated any number of times while the e-way bill is valid.',
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
      'GST purchase order format for Indian buyers: both GSTINs, HSN codes, CGST/SGST or IGST, delivery date and approval. Live totals, then print or save a PDF.',
    h1: 'Purchase Order Format with GST',
    intro: 'A domestic PO that shows both GSTINs, HSN codes and the expected CGST/SGST or IGST, so the supplier’s tax invoice can be checked line by line.',
    audience: 'GST-registered Indian buyers: traders, shops, offices and small manufacturers placing domestic orders.',
    tags: ['Domestic', 'GST registered', 'Approval'],
    features: ['Buyer and supplier GSTIN', 'HSN and GST rate per line', 'Approval block', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer details', detail: 'Your company name, billing address, GSTIN, state and state code, and logo. If you hold more than one registration, use the GSTIN of the state where the goods will be received.' },
      { label: 'PO details', detail: 'PO number, PO date, supplier quotation reference and required-by date. The quotation reference shows the approver where the price came from.' },
      { label: 'Supplier', detail: 'Supplier name, address, GSTIN, state and contact person. The supplier’s state, read with the delivery state, tells you whether to expect CGST + SGST or IGST.' },
      { label: 'Deliver to', detail: 'Delivery address and state, if different from your billing address. Add a contact name and phone number for the gate.' },
      { label: 'Items', detail: 'Description, HSN/SAC, quantity, unit, agreed rate, discount and GST rate. Say whether the rate is before GST: “₹250 per ream plus GST” leaves no room for argument.' },
      { label: 'Expected tax', detail: 'CGST and SGST for a supplier in your state, or IGST for a supplier in another state, so the approver sees the full outgo.' },
      { label: 'Terms', detail: 'Delivery date, freight, payment terms and any warranty or return conditions. Name who pays freight, for example “Freight: supplier’s account, delivered at our godown”.' },
      { label: 'Approval', detail: 'Prepared by, approved by and the supplier’s acceptance.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Nagpur stationery distributor (sample GSTIN 27ABCDE1234F1Z5) orders 200 reams of A4 paper from a Pune supplier (sample GSTIN 27KLMNO6789P1Z4) and 50 boxes of files from a Raipur supplier (sample GSTIN 22QRSTU2345V1Z8). It raises two POs: the Pune one shows CGST and SGST, the Raipur one shows IGST, each with the HSN code and rate agreed in the quotation.',
        'PO/2026-27/0118 for the paper reads: 200 reams at ₹250 per ream plus GST, freight included, delivery by 20 November, payment 30 days from receipt of goods and invoice. The value is above the firm’s own approval limit, so a second person signs the approval block.',
        'When the goods arrive, the accounts team checks each supplier’s tax invoice against the PO. A line billed at a different rate or HSN is queried before payment, not after the return is filed.',
        'The paper supplier bills 210 reams, but the goods receipt note says 200. Accounts pays for 200 and asks the supplier for a credit note for the extra 10, quoting the PO number.',
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
        heading: 'Who the GST purchase order is for',
        paragraphs: [
          'A GST purchase order is a domestic PO that shows both GSTINs, HSN codes and the GST you expect to pay. Use it if you are a GST-registered business buying goods or services from Indian suppliers and want to check their tax invoice line by line before you book input tax credit.',
          'If you buy raw material where grade, tolerances, inspection and lot-wise deliveries matter, use the manufacturing purchase order instead. If the supplier is outside India and you need currency, Incoterms and shipping documents, use the international purchase order.',
        ],
      },
      {
        heading: 'Why put GST details on a purchase order',
        paragraphs: [
          'A purchase order is not a tax document, so the GST on it is your expectation, not a charge. Showing it still pays off: the approver sees the full outgo, the supplier sees the HSN and rate you expect, and your accounts team can check the supplier’s tax invoice against it.',
          'The supplier’s tax invoice decides the GST actually charged, and it is the document you claim credit on. If its rate or HSN differs from your PO, raise it with the supplier before payment.',
        ],
        links: [{ title: 'GSTIN verification: what to check', href: '/blog/gstin-verification-what-to-check' }],
      },
      {
        heading: 'Field by field: what accounts checks against the supplier’s invoice',
        paragraphs: [
          'When the supplier’s tax invoice arrives, your accounts team compares it with the PO field by field. GSTIN, HSN, rate, quantity, tax split and total should all agree. Any field you leave vague on the PO is a field they cannot check, so fill each one precisely.',
        ],
        bullets: [
          'Supplier GSTIN: the same registration on the PO, the invoice and the GST portal, and active on the invoice date.',
          'HSN and GST rate: a different HSN on the invoice can mean a different rate, so ask why before you pay.',
          'Rate basis: before GST or including GST, stated in words.',
          'Quantity and unit: compared with the goods receipt note, not just the invoice.',
          'Deliver-to state: this, with the supplier’s state, drives the CGST + SGST or IGST split.',
          'PO number: the supplier should quote it on the invoice and the delivery challan.',
        ],
      },
      {
        heading: 'CGST + SGST or IGST on a PO',
        paragraphs: [
          'The tax split on your PO should mirror what the supplier will charge. For a typical purchase of goods delivered to you, a supplier in your own state charges CGST and SGST, and a supplier in another state charges IGST. The split depends on the supplier’s location and the place of supply.',
          'Bill-to-ship-to deals and deliveries to a third party can change the answer. Check unusual cases with your adviser before you issue the PO.',
        ],
        links: [{ title: 'CGST vs SGST vs IGST explained', href: '/blog/cgst-sgst-igst-explained' }],
      },
      {
        heading: 'PO vs invoice, and a light approval routine',
        paragraphs: [
          'You, the buyer, issue the purchase order; the supplier issues the tax invoice after supplying. Many businesses pay only when three documents agree: the PO, the goods receipt note and the supplier’s invoice. A short approval routine before the PO goes out keeps that match easy.',
        ],
        bullets: [
          'Set a value above which a second person must approve the PO.',
          'Quote the supplier’s quotation so the approver can see where the rate came from.',
          'Issue a revised PO, with the same number and a revision mark, if quantity, rate or dates change.',
        ],
      },
      {
        heading: 'Common mistakes on GST purchase orders',
        paragraphs: [
          'PO problems usually surface weeks later, when the supplier’s invoice does not match and payment stalls. The causes are the same few each time: an unclear rate basis, the wrong GSTIN, no freight terms or a supplier GSTIN nobody checked. Fix them on the PO and the month-end match takes minutes.',
        ],
        bullets: [
          'Writing a rate with no basis, so the supplier adds GST on top of a price you thought included it.',
          'Using your head-office GSTIN when the goods are delivered to a branch registered in another state.',
          'Leaving freight and unloading terms blank, then disputing a transport charge on the invoice.',
          'Changing the quantity by phone without a revised PO, so the invoice and PO never match.',
          'Not checking the supplier’s GSTIN, which can leave you with an invoice you cannot claim credit on.',
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
      {
        q: 'Should the PO rate include GST or exclude it?',
        a: 'Either works, as long as you say which. Many B2B buyers write rates before GST, such as “₹250 per ream plus GST at the applicable rate”, and show the expected tax in its own column.',
      },
      {
        q: 'What if the supplier’s invoice shows a different HSN or GST rate from my PO?',
        a: 'Ask the supplier before you pay or book credit. They may have a valid reason, such as a more accurate classification, but you should understand it. If their invoice is wrong, they can correct it with a credit or debit note.',
      },
      {
        q: 'Which GSTIN goes on the PO if my business is registered in two states?',
        a: 'Use the GSTIN of the state where the goods will be received and used. The supplier then bills that registration, and the input tax credit lands in the right state.',
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
      'Raw material PO format: grade, tolerance, drawing revision, lot-wise delivery and inspection terms. Live totals and taxes, then print or save a PDF.',
    h1: 'Raw Material Purchase Order Format',
    intro: 'A PO for raw materials and components where the specification matters as much as the price: grade, tolerances, inspection and staggered deliveries.',
    audience: 'Manufacturers and fabricators buying raw materials, castings, components and consumables.',
    tags: ['Raw material', 'Specifications', 'Inspection'],
    features: ['Specification columns', 'Delivery schedule', 'Inspection terms', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer and supplier', detail: 'Names, addresses, GSTINs and contact persons on both sides. Add your quality contact, so inspection queries reach the right person.' },
      { label: 'PO details', detail: 'PO number, date, revision number and quotation or rate-contract reference. The revision number tells everyone which version is live.' },
      { label: 'Material lines', detail: 'Item code, description, grade or standard, size and tolerance, drawing number and revision, HSN, quantity, unit and rate. Quote the drawing revision every time; an old drawing is the fastest route to a rejected lot.' },
      { label: 'Delivery schedule', detail: 'Quantities due by date, for orders delivered in lots. Ask for each lot to come with its own invoice quoting the PO and lot number.' },
      { label: 'Quality terms', detail: 'Inspection point, test certificate requirement, rejection and replacement terms. Name the standard or sampling plan you inspect to, if you use one.' },
      { label: 'Commercial terms', detail: 'Freight, packing, payment terms, price basis and GST. For metals and other commodities, say whether the price is fixed or linked to a published index, and how often it is reset.' },
      { label: 'Approval', detail: 'Prepared, checked and approved signatures, and supplier acceptance.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Ludhiana auto-parts maker (sample GSTIN 03ABCDE1234F1Z5) orders 12 tonnes of bright steel bars from a Mandi Gobindgarh mill (sample GSTIN 03VWXYZ6789L1Z2). The PO specifies the steel grade, diameter with tolerance and length, asks for a mill test certificate with every lot, and schedules 4 tonnes in each of the next three months.',
        'It states that material failing incoming inspection will be returned at the supplier’s cost, and that each lot’s invoice must quote the PO number and lot number.',
        'Steel is sold by weight, so the PO allows an agreed plus-or-minus quantity tolerance per lot and says the buyer’s weighbridge reading settles any billing dispute. Both parties are in Punjab, so the expected tax is CGST + SGST.',
        'Before the second lot the mill raises its price. The buyer issues PO revision 1, valid for lots dispatched from the agreed date, and the mill signs it. Lot 1 stays at the old rate, so nobody argues later about which invoice carries which price.',
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
        heading: 'Who the manufacturing purchase order is for',
        paragraphs: [
          'A manufacturing purchase order is a PO for raw materials, castings, components and consumables where the specification matters as much as the price. Use it if you buy to a grade, standard or drawing, need test certificates, inspect material on arrival, or want the quantity delivered in dated lots.',
          'If you buy finished items off the shelf, such as stationery or spares with a catalogue number, the GST purchase order is simpler. If the material comes from a supplier abroad, use the international purchase order and copy your specification lines into it.',
        ],
      },
      {
        heading: 'Specifications that prevent rejections',
        paragraphs: [
          'Rejections usually start with a vague description. “MS plate 10 mm” leaves room for argument; a grade or standard, a thickness tolerance, a size and a finish do not. If a drawing governs the part, quote the drawing number and revision so the supplier cannot work from an old copy.',
          'Use your own item code as well as the supplier’s. When a part has two names, the item code is what stores, quality and accounts all search for.',
        ],
      },
      {
        heading: 'Field by field: what stores and quality check on arrival',
        paragraphs: [
          'When a lot arrives, stores checks quantity and lot number against the PO schedule, and quality checks the material against the specification and the test certificate. Each of those checks needs a field on the PO to compare against. If the PO is silent, nobody can reject the lot with confidence.',
        ],
        bullets: [
          'Item code and description: matched to the supplier’s invoice and the material tag.',
          'Grade, size and tolerance: checked by quality against the drawing and the test certificate.',
          'Drawing number and revision: the revision on the PO must match the one quality has on file.',
          'Lot quantity and due date: stores records early, late and short lots against the schedule.',
          'Test certificate: the heat or batch number on it should match the material supplied.',
          'Price basis: fixed, or linked to an index, with the date of the price used for each lot.',
        ],
      },
      {
        heading: 'Inspection and test certificates',
        paragraphs: [
          'Say on the PO where inspection will happen: at the supplier’s works before dispatch, or at your factory on receipt. If you need a mill test certificate or another test report with each lot, write it on the PO. Asking for certificates after the material lands rarely works.',
          'Also state the rejection terms: whether rejected material is returned or replaced, who pays freight both ways, and how quickly replacements must arrive.',
        ],
      },
      {
        heading: 'Schedules, tolerances and revisions',
        paragraphs: [
          'Large raw material orders rarely arrive in one load, so the PO should say what arrives when. Split the total into dated lots, allow a stated quantity tolerance where material is sold by weight or length, and issue a numbered revision whenever price, quantity or dates change.',
        ],
        bullets: [
          'Write the tolerance as a figure you have agreed with the supplier, per lot.',
          'Say whose weighbridge or count decides the billed quantity.',
          'Keep the PO number on revisions and add “Rev 1”, “Rev 2”.',
          'Close the PO when the last lot is received and billed, so stray invoices are caught.',
        ],
      },
      {
        heading: 'Common mistakes on raw material POs',
        paragraphs: [
          'The costly mistakes on raw material POs are rarely about price. They come from missing specifications, an old drawing revision, no test-certificate clause or a schedule agreed only by phone. Each one turns into a rejected lot, an idle machine or a dispute over who pays the return freight.',
        ],
        bullets: [
          'Copying last year’s PO without updating the drawing revision.',
          'Writing “as per sample” with no sample reference or approval date.',
          'Accepting a lot without the test certificate the PO asked for, then rejecting it later.',
          'Agreeing a rate change by phone and leaving the PO at the old price.',
          'Raising a material PO when the material is actually your own, sent out for processing.',
        ],
      },
      {
        heading: 'Job work and material sent out',
        paragraphs: [
          'If you send your own material to a job worker for processing, that movement is not a purchase. It goes out on a delivery challan and follows separate GST and e-way bill rules for job work. Inter-state movement of goods to a job worker needs an e-way bill whatever the value.',
          'A separate PO for the job work charges can still sit alongside the challan.',
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
      {
        q: 'Can I use one PO for a year of supplies at a fixed rate?',
        a: 'Yes. Many manufacturers issue an open or annual PO against a rate contract and call off quantities with dated schedules. Put a validity date on it, and a review clause if the rate is linked to market prices.',
      },
      {
        q: 'What should happen to rejected raw material?',
        a: 'Whatever your PO says. State whether rejected lots are returned or replaced, who pays freight both ways and how fast a replacement must arrive. Without those terms, every rejection becomes a negotiation.',
      },
      {
        q: 'Should the PO name the test standard or just ask for a certificate?',
        a: 'Name both. A certificate only helps if it reports results against the grade or standard you specified, with a heat or batch number that matches the material supplied.',
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
      'International PO template for overseas suppliers: currency, Incoterms, ports and a document list. Live totals, then print on A4 or Letter or save a PDF.',
    h1: 'International Purchase Order Template',
    intro: 'A PO for buying from overseas suppliers, with currency, Incoterms, ports and the documents you need to clear the goods.',
    audience: 'Indian importers, trading houses and manufacturers buying from suppliers abroad.',
    tags: ['Import', 'Incoterms', 'Foreign currency'],
    features: ['Incoterms field', 'Ports and shipment mode', 'Document checklist', ...CORE_FEATURES],
    includes: [
      { label: 'Buyer', detail: 'Your company name, address, IEC, GSTIN and logo. Customs and your bank use the IEC to identify you as the importer.' },
      { label: 'Supplier', detail: 'Supplier name, full address and country, contact and email. Use the legal name that will appear on the supplier’s invoice and bank documents.' },
      { label: 'PO details', detail: 'PO number, date, supplier’s offer reference and currency. Write the currency code, such as USD or EUR, not just “$”.' },
      { label: 'Items', detail: 'Description, HS code, quantity, unit, unit price and amount in the order currency. Describe goods the way customs will read them: material, function and model.' },
      { label: 'Shipping terms', detail: 'Incoterm with named place, port of loading, port of discharge, mode of shipment and latest shipment date. The named place is what turns “FOB” into a term the supplier can actually perform.' },
      { label: 'Payment terms', detail: 'Advance, letter of credit, documentary collection or open account, with timing. If you pay by letter of credit, keep its terms in line with the PO, or the documents may be refused.' },
      { label: 'Documents required', detail: 'Commercial invoice, packing list, bill of lading or airway bill, certificate of origin and any test or inspection certificates. Say how many originals and copies you need.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Chennai electronics assembler (sample GSTIN 33ABCDE1234F1Z5) orders 20,000 connectors from a supplier in Shenzhen. The PO is in US dollars, uses “FOB Shenzhen, Incoterms 2020”, names Chennai port as the port of discharge, sets the latest shipment date, and asks for 30% advance with the balance against a copy of the bill of lading.',
        'It lists the documents the supplier must send: commercial invoice, packing list, bill of lading and a certificate of origin, so the importer’s customs broker can file the bill of entry without chasing paperwork.',
        'Under FOB the assembler books sea freight and insurance through its own forwarder, and names that forwarder on the PO so the supplier knows who to hand the cargo to. The customs broker adds the freight and insurance to the invoice value when working out the value for duty.',
        'A second, urgent order of 2,000 connectors goes by air. That PO uses FCA Shenzhen airport instead of FOB, because FOB is a sea-only term, and asks for an airway bill instead of a bill of lading.',
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
        heading: 'Who the international purchase order is for',
        paragraphs: [
          'An international purchase order is a PO for buying goods from a supplier outside India. Use it if you are an importer, trading house or manufacturer who must agree currency, Incoterms, ports, payment method and shipping documents before the supplier ships, because those terms decide your costs, risks and clearance.',
          'If the supplier is in India, even for imported goods they already hold here, use the GST purchase order. If quality specifications and lot-wise deliveries matter more than shipping terms, compare the manufacturing purchase order, which has dedicated fields for them.',
        ],
      },
      {
        heading: 'Incoterms in brief',
        paragraphs: [
          'Incoterms are standard trade terms published by the International Chamber of Commerce. They decide who arranges and pays for each leg of transport and insurance, and where risk passes from seller to buyer. They do not decide when ownership passes or when payment is due.',
          'Always write the term with a named place and the edition, such as “FOB Shenzhen, Incoterms 2020”.',
        ],
        bullets: [
          'EXW (Ex Works): you collect from the supplier’s premises and handle almost everything.',
          'FCA (Free Carrier): the supplier hands the goods to your carrier at a named place; it suits air and container cargo better than FOB.',
          'FOB (Free On Board): the supplier delivers onto the vessel at the named port of loading; sea freight only.',
          'CFR / CIF: the supplier pays sea freight to the named destination port; CIF also includes insurance. Risk still passes at loading.',
          'DAP (Delivered At Place): the supplier delivers to a named place, ready for unloading; you handle import clearance and duties.',
          'DDP (Delivered Duty Paid): the supplier also clears import and pays duties, which is uncommon for imports into India.',
        ],
      },
      {
        heading: 'Field by field: what your bank, forwarder and customs broker check',
        paragraphs: [
          'Three outsiders read your import PO and the supplier’s documents against it. Your forwarder needs the Incoterm, ports and shipment date; your bank needs the payment terms and document list; your customs broker needs descriptions, HS codes, values and origin. Write each field for the person who will check it.',
        ],
        bullets: [
          'Incoterm and named place: tells the forwarder where their job starts.',
          'Currency and unit price: must match the supplier’s commercial invoice, or the bank may query the documents.',
          'HS code and description: your broker uses these to classify the goods and estimate duty.',
          'Country of origin: affects duty, and any trade agreement benefit needs a valid certificate of origin.',
          'Latest shipment date: under a letter of credit, late shipment can make the documents non-compliant.',
          'Documents required: the exact list, with originals and copies, that your bank and broker need.',
        ],
      },
      {
        heading: 'Import formalities to plan for',
        paragraphs: [
          'Before you place an import order, check that you can clear it. Importers in India generally need an Importer-Exporter Code (IEC), and customs duty and IGST on imports are assessed when the bill of entry is filed, using the invoice value, classification and origin. Some goods also need licences or certificates.',
          'Customs value in India generally includes freight and insurance up to the port of import, so on an FOB or EXW order your broker adds those costs. Some products, such as certain electronics, need BIS certification or another standards approval before clearance. Check with your customs broker before ordering, not after the goods land.',
        ],
      },
      {
        heading: 'Common mistakes on import purchase orders',
        paragraphs: [
          'Import POs go wrong in the gaps between three parties: your supplier, your bank and Indian customs. A term one of them reads differently, such as an Incoterm with no named place or a currency written as a bare “$”, can delay payment or clearance. Close every gap on the PO.',
        ],
        bullets: [
          'Writing “FOB” with no port, or with your own port instead of the supplier’s port of loading.',
          'Using FOB or CIF for air freight or courier, where FCA or CPT fits the mode.',
          'Leaving the HS code to the supplier, then finding a higher duty or a licence requirement at the port.',
          'Agreeing letter of credit terms that differ from the PO, such as a different shipment date or document list.',
          'Forgetting to ask for a certificate of origin when you planned to claim a trade agreement benefit.',
          'Ordering a product that needs BIS or another approval before checking that the supplier holds it.',
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
      {
        q: 'Is FOB right for air shipments?',
        a: 'No. FOB and CIF are meant for sea and inland waterway transport. For air freight, courier and most container shipments, FCA, CPT or CIP fit better, because the supplier hands the goods to a carrier rather than loading them on board a ship.',
      },
      {
        q: 'Who pays customs duty on an import PO?',
        a: 'Under most Incoterms, including EXW, FOB, CIF and DAP, you as the importer pay customs duty and IGST in India. Only DDP puts duties on the supplier, and that is rare for imports into India.',
      },
      {
        q: 'Can I claim input tax credit on IGST paid on imports?',
        a: 'Generally yes. A registered importer can claim credit of IGST paid on imports, on the basis of the bill of entry rather than a supplier’s tax invoice. Conditions apply, so confirm the details with your adviser.',
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
      { label: 'Exporter', detail: 'Name, address, IEC, GSTIN, state and logo. Use the same legal name as on your IEC and GST registration; a mismatch is an easy query for customs and banks.' },
      { label: 'Invoice details', detail: 'Export invoice number and date, buyer’s order number and date, other references. Never repeat a number already used in your domestic series.' },
      { label: 'Consignee and buyer', detail: 'Consignee name and address, buyer if different, and notify party. In a letter of credit deal, copy these exactly from the LC.' },
      { label: 'Shipment', detail: 'Pre-carriage, place of receipt, vessel or flight, port of loading, port of discharge, final destination, country of origin and country of final destination.' },
      { label: 'Terms', detail: 'Terms of delivery (Incoterm) and terms of payment. The values you show should fit the Incoterm: on CIF show freight and insurance; on FOB, do not add them.' },
      { label: 'Goods', detail: 'Marks and numbers, number and kind of packages, description, HS code, quantity, rate and amount. Marks and numbers must match what is stencilled on the cartons and printed on the packing list.' },
      { label: 'Values', detail: 'Currency, FOB value, freight and insurance where applicable, total, and amount in words.' },
      { label: 'GST status', detail: 'Supply under LUT without payment of IGST, or with payment of IGST, and the LUT reference where used.' },
      { label: 'Declaration', detail: 'Declaration that the invoice shows the actual price and particulars are true, with signature.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Tiruppur garment exporter (sample GSTIN 33ABCDE1234F1Z5) ships 3,000 cotton T-shirts to a buyer in Hamburg on CIF terms, priced in euros. The invoice shows the IEC and GSTIN, the buyer’s order number, port of loading as Tuticorin and port of discharge as Hamburg, and splits the CIF value into FOB, freight and insurance.',
        'The exporter has a valid LUT for the year, so the invoice carries a note that the supply is meant for export under LUT without payment of IGST, along with the LUT reference.',
        'The buyer is paying under a letter of credit, so the exporter copies the buyer’s name, the consignee and the goods description word for word from the LC. The 60 cartons are marked “HMB/01–60”, and the same marks appear on the invoice and the packing list.',
        'A later 20-piece sample run for the same buyer goes by air courier. That parcel goes on the courier commercial invoice, with the AWB number and reason for export, after the exporter checks with the courier how it clears commercial samples.',
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
        heading: 'Who the export invoice format is for',
        paragraphs: [
          'An export invoice is the commercial invoice an Indian business issues when it sells goods to a buyer abroad. Use it if you are a manufacturer, merchant exporter or trading house shipping by sea or air cargo, and you need IEC, GSTIN, LUT or IGST status, ports, Incoterms and contract-currency values on one document.',
          'If you are sending a small parcel, a sample, a gift or a return by international courier, the courier commercial invoice is simpler and asks for what couriers check. If the goods stay in India, use the GST tax invoice or the wholesale invoice instead.',
        ],
      },
      {
        heading: 'IEC, GSTIN and the export invoice',
        paragraphs: [
          'An Importer-Exporter Code (IEC), issued by the DGFT, is generally needed to export goods from India, and customs uses it to identify you on the shipping bill. Your GSTIN on the same invoice links the export to your GST returns. That link matters when you claim a refund.',
        ],
      },
      {
        heading: 'Field by field: what customs, the bank and the buyer check',
        paragraphs: [
          'Your export invoice is read by Indian customs, the buyer’s customs, your bank and the buyer. Customs compares descriptions, HS codes, quantities and values with the shipping bill and packing list. The bank compares names, terms and amounts with the letter of credit or contract.',
        ],
        bullets: [
          'HS code: India uses an 8-digit ITC(HS) code on the shipping bill; the first six digits are shared internationally, so the buyer’s customs reads the same base code.',
          'Marks and numbers: identical on the cartons, the invoice and the packing list.',
          'Consignee, buyer and notify party: copied exactly from the LC or the buyer’s order.',
          'Incoterm and values: on CIF or CFR, show FOB value, freight and insurance separately.',
          'Exchange rate: customs converts values at the rate notified by CBIC for the relevant date, which can differ from your bank’s rate.',
          'Country of origin: India for goods made here; a certificate of origin may be needed for trade agreement benefits.',
        ],
      },
      {
        heading: 'Exporting under LUT or with IGST payment',
        paragraphs: [
          'Exports are zero-rated under GST, which gives you two routes. You can export under a Letter of Undertaking (LUT) without paying IGST and claim a refund of unused input tax credit, or pay IGST on the export and claim that IGST back. Your invoice must show which route you chose.',
          'Exports under LUT commonly carry an endorsement along the lines of “Supply meant for export under LUT without payment of IGST”, with the LUT reference (ARN). An LUT is generally filed for a financial year, so check that yours covers the invoice date.',
          'Confirm eligibility, conditions and the exact wording with your tax adviser or on the GST portal.',
        ],
      },
      {
        heading: 'FOB, CIF and the shipping bill',
        paragraphs: [
          'FOB value covers the goods delivered on board at the port of loading; CIF adds freight and insurance to the destination port. If you sell on CIF or CFR terms, show FOB value, freight and insurance separately, because the export value declared on the shipping bill is generally on an FOB basis.',
          'Your customs broker (CHA) files the shipping bill from this invoice and the packing list, so descriptions, HS codes, quantities and values must match across all three. The buyer clears the goods at destination with the same invoice, so check that country’s customs requirements too.',
        ],
      },
      {
        heading: 'Common mistakes on export invoices',
        paragraphs: [
          'Export invoice errors are expensive because several parties copy from the same document. A value that differs from the shipping bill, a consignee name that differs from the LC, or an Incoterm that does not fit the freight shown can hold the cargo, delay payment or slow a GST refund.',
        ],
        bullets: [
          'Showing CIF terms but no freight and insurance, or adding freight to an FOB sale.',
          'Leaving out the LUT endorsement and ARN when exporting without payment of IGST.',
          'An invoice value that differs from the shipping bill, which can hold up an IGST refund.',
          'Writing “garments” where customs expects “men’s cotton knitted T-shirts”.',
          'Using your bank’s exchange rate where customs applies the CBIC-notified rate.',
          'Reusing a number from your domestic invoice series.',
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
      {
        q: 'Do I need a new LUT for every export invoice?',
        a: 'No. An LUT is generally filed once for a financial year on the GST portal and covers exports in that year, subject to its conditions. Quote its ARN on each invoice issued under it.',
      },
      {
        q: 'Should the export invoice match the letter of credit word for word?',
        a: 'Banks check documents strictly against the LC terms, so names, description, quantities and amounts should match it closely. Small differences can be treated as discrepancies and delay payment, so ask your bank to review a draft before shipment.',
      },
      {
        q: 'What is the difference between consignee, buyer and notify party?',
        a: 'The consignee receives the goods at destination, the buyer pays under the contract, and the notify party is told when the cargo arrives. They can be one company, but in LC and agent deals they often differ, so fill each from the order.',
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
      { label: 'Shipper', detail: 'Name, address, phone, email and your tax or registration number where the courier asks for it. For commercial shipments, couriers in India may ask for your IEC and GSTIN; check when you book.' },
      { label: 'Receiver / importer', detail: 'Name, full address with postcode, phone, email and the importer’s tax ID where the destination asks for it. A missing phone number can leave a parcel waiting at destination customs.' },
      { label: 'Shipment', detail: 'Invoice number and date, courier name, AWB or tracking number, currency and terms of delivery. The terms say who pays destination duties and taxes: the receiver, or you.' },
      { label: 'Reason for export', detail: 'Sale, commercial sample, gift, return, repair or temporary export. Pick one; customs treats each differently.' },
      { label: 'Goods lines', detail: 'Plain-language description, HS code, country of origin, quantity, unit value and total value. “Clothing” is vague; “Women’s cotton kurta, printed” is clear.' },
      { label: 'Packages and weights', detail: 'Number of boxes, net weight and gross weight, matching the courier booking. The gross weight should agree with what the courier weighed.' },
      { label: 'Declaration', detail: 'A statement that the information is true and correct, with name, signature and date.' },
    ],
    example: {
      title: 'Example (illustrative)',
      body: [
        'A Jaipur handicrafts studio sends two cartons of block-printed cushion covers to a prospective buyer in Toronto by international courier. The invoice gives the AWB number from the booking, sets the reason for export as “Commercial sample”, lists each design with its HS code and “Country of origin: India”, shows a realistic unit value rather than zero, and states net and gross weights that match what the courier weighed.',
        'The studio (sample GSTIN 08ABCDE1234F1Z5) lists 12 covers in four designs, priced in Canadian dollars, across two boxes marked “1 of 2” and “2 of 2”. The terms of delivery say the receiver pays any import duties and taxes, so the buyer is not surprised at the door.',
        'Months later the buyer sends three covers back for stitching repairs. That return parcel carries its own invoice with the reason “Return for repair” and the original invoice number, and the studio checks with its courier how returned Indian goods are cleared.',
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
        heading: 'Who the courier commercial invoice is for',
        paragraphs: [
          'A courier commercial invoice is the customs invoice you attach to an international courier parcel. Use it if you are a small exporter, online seller, studio or individual sending samples, small orders, gifts, returns or repairs abroad by courier, where the AWB number, reason for export and declared value matter most.',
          'If you are shipping a full export consignment by sea or air cargo, with a shipping bill, LUT or IGST status and an Incoterm, use the export commercial invoice instead. If the parcel stays inside India, you need a domestic invoice or a delivery challan, not this.',
        ],
      },
      {
        heading: 'Why couriers ask for a commercial invoice',
        paragraphs: [
          'Destination customs needs to know what is inside a parcel, what it is worth and where it was made before releasing it. International couriers clear most parcels on the basis of the commercial invoice you attach. A missing or vague invoice is one of the most common reasons parcels are held.',
        ],
      },
      {
        heading: 'Field by field: what the courier and destination customs check',
        paragraphs: [
          'Courier staff check the invoice against the booking at pickup, and destination customs checks it against the parcel. Both look at the same few fields: AWB number, receiver details, description, HS code, origin, value and weight. If any of those disagree with the booking or the box, the parcel can stop.',
        ],
        bullets: [
          'AWB number: taken from the booking, so the invoice and the parcel can be linked.',
          'Receiver phone and email: customs or the courier may need to reach the receiver to clear the parcel or collect duty.',
          'Description: what it is, what it is made of and what it is for.',
          'HS code: the first six digits are shared worldwide; the destination may want its own longer code.',
          'Unit and total value: realistic, in the currency shown, and adding up across the lines.',
          'Weights and box count: in line with the courier’s weighed figures.',
        ],
      },
      {
        heading: 'Reason for export and declared value',
        paragraphs: [
          'Customs treats a sale, a free sample, a gift and a returned item differently, so state the reason for export clearly. Even when nothing is paid, declare a realistic value. Many customs authorities need one to assess the parcel, and an obviously low or zero value invites questions.',
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
          'The HS code identifies goods for customs worldwide: the first six digits are common internationally, and countries add digits for their own tariffs. Country of origin is where the goods were made, not where they are posted from. The signed declaration confirms the invoice is true, so check every line before signing.',
          'Misdescribing goods or under-declaring value can lead to delays, penalties or seizure. Requirements differ by destination and courier: some countries ask for the importer’s tax number or specific wording, and couriers set their own rules on copies.',
          'Always check the destination country’s customs requirements and your courier’s guidance before you ship.',
        ],
        links: [{ title: 'HSN codes: a practical guide', href: '/blog/hsn-codes-practical-guide' }],
      },
      {
        heading: 'Common mistakes on courier invoices',
        paragraphs: [
          'Courier parcels are usually held for simple reasons, not complex ones. The repeat offenders are vague descriptions, zero or token values, weights that differ from the booking, a missing receiver phone number and an unsigned declaration. Fix those five and you remove the most common causes of a hold.',
        ],
        bullets: [
          'Writing “samples”, “parts” or “gift” as the whole description.',
          'Declaring zero value, or a value plainly below what the goods cost.',
          'Marking a business shipment as a “gift” to avoid duty, which customs can treat as misdeclaration.',
          'Giving the courier hub city as country of origin instead of where the goods were made.',
          'Packing batteries, liquids or other restricted items without checking the courier’s dangerous goods rules.',
          'Attaching one invoice copy when the courier asked for several.',
        ],
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
      {
        q: 'Who pays import duty on a courier parcel?',
        a: 'It depends on the terms you choose at booking. Usually the receiver pays duties and taxes on delivery; with a duties-paid service, the courier bills them to you instead. Write the terms on the invoice so the receiver knows what to expect.',
      },
      {
        q: 'Can I send a commercial order by courier instead of cargo?',
        a: 'Often yes, for small and light consignments. Commercial exports by courier from India have their own customs rules and value limits, and your courier may ask for your IEC and GSTIN, so check with them before you book.',
      },
      {
        q: 'Can I mark a business shipment as a gift to save duty?',
        a: 'No. A gift is something given without payment, and calling a sale or a business sample a gift is a misdeclaration. It can lead to penalties or seizure at destination.',
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
