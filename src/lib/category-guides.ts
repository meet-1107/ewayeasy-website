// Page-specific content for blog category hubs, so each hub answers its topic instead of only listing posts.
// Facts must stay within content/EDITORIAL_BRIEF.md. Slugs must exist in content/blog (checked by a test).
import { getAllPosts } from './content';

export type CategoryGuide = {
  /** 40–60 word direct answer shown at the top of the hub. */
  answer: string;
  /** Recommended reading order: post slug plus why to read it. */
  startHere: { slug: string; why: string }[];
  rules: { when: string; then: string }[];
  mistakes: string[];
  tools: { href: string; label: string }[];
  faq: { q: string; a: string }[];
};

/** Hubs with fewer posts than this are kept out of the index (they would be near-empty listing pages). */
export const MIN_POSTS_TO_INDEX = 3;

/** A hub is indexable only when it has enough posts and its own guide content. */
export function categoryIndexable(slug: string) {
  return Boolean(CATEGORY_GUIDES[slug]) && getAllPosts().filter((p) => p.category === slug).length >= MIN_POSTS_TO_INDEX;
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  'eway-bill': {
    answer:
      'An e-way bill is the electronic document from the official e-way bill system that must travel with goods when the consignment value is above ₹50,000, with some exceptions. These articles cover who generates it, Part A and Part B, validity by distance, vehicle changes, job work, returns and what to do when it expires.',
    startHere: [
      { slug: 'what-is-an-eway-bill', why: 'What an e-way bill is, when you need one and how the parts fit together.' },
      { slug: 'eway-bill-limit-50000-threshold-exceptions', why: 'The ₹50,000 value test, how to calculate it and the cases that need no e-way bill.' },
      { slug: 'who-is-responsible-for-generating-eway-bill', why: 'Supplier, recipient or transporter: who must generate, and who is at risk if nobody does.' },
      { slug: 'eway-bill-part-a-and-part-b-explained', why: 'What goes in each part, and why Part A alone does not let the truck move.' },
      { slug: 'how-to-update-vehicle-details-in-eway-bill', why: 'Changing the vehicle or transporter on the way without a new e-way bill.' },
      { slug: 'what-to-do-when-eway-bill-expires', why: 'The 8-hour extension window and what to do if you miss it.' },
    ],
    rules: [
      { when: 'Consignment value (taxable value + GST) is above ₹50,000', then: 'Generate an e-way bill before the goods move, unless an exception in Rule 138(14) applies.' },
      { when: 'You send goods inter-state to a job worker', then: 'An e-way bill is needed whatever the value.' },
      { when: 'Part A has a wrong GSTIN, value or invoice number', then: 'Cancel within 24 hours and generate a new one. An e-way bill cannot be edited.' },
      { when: 'The vehicle changes on the way', then: 'Update Part B. You do not need a new e-way bill.' },
      { when: 'The goods will not arrive before validity ends', then: 'Extend within 8 hours before or after expiry, up to 360 days in total.' },
    ],
    mistakes: [
      'Testing the ₹50,000 limit on taxable value alone. The consignment value includes GST.',
      'Filling Part A and forgetting Part B. Without Part B the e-way bill is not valid for movement, except the short within-state leg to or from a transporter (up to 50 km).',
      'Typing a distance more than 10% above the portal’s PIN-to-PIN figure. The portal rejects it.',
      'Generating against an invoice dated more than 180 days ago. The portal has blocked this since 1 January 2025.',
    ],
    tools: [
      { href: '/tools/eway-bill-eligibility-checker', label: 'E-way bill eligibility checker' },
      { href: '/tools/distance-calculator', label: 'Distance and validity calculator' },
      { href: '/eway-bill-guide', label: 'The complete e-way bill guide' },
    ],
    faq: [
      {
        q: 'Where should I start if I am new to e-way bills?',
        a: 'Read “What is an e-way bill?” first, then the ₹50,000 limit article. Together they tell you whether you need one and who must generate it. Part A and Part B comes next.',
      },
      {
        q: 'Are these articles official guidance?',
        a: 'No. E-Way Easy is independent and not affiliated with GSTN or NIC. Each compliance article lists its official sources and a last-verified date, so check the e-way bill portal before you act.',
      },
      {
        q: 'Does the e-way bill number change in 2027?',
        a: 'Yes, as reported from a GSTN advisory: from 1 January 2027 the number grows from 12 to 14 digits and the consolidated number from 10 to 11. The rules themselves stay the same.',
      },
    ],
  },
  invoicing: {
    answer:
      'A GST tax invoice records a taxable sale. A bill of supply, a delivery challan and a receipt each do a different job. These articles explain which document to issue, how to calculate GST on it, how to make one on your phone, and how to keep invoice and transport details matching your e-way bill.',
    startHere: [
      { slug: 'invoice-with-gst-vs-without-gst', why: 'Tax invoice or bill of supply: which one your business and this sale need.' },
      { slug: 'invoice-vs-bill-vs-receipt', why: 'The everyday words, what each document proves and when to issue it.' },
      { slug: 'how-to-calculate-gst-on-sales-invoice', why: 'Line-by-line GST, discounts, round-off and the CGST/SGST or IGST split.' },
      { slug: 'delivery-challan-vs-tax-invoice', why: 'Moving goods without a sale: job work, approval, branch transfer.' },
      { slug: 'how-to-make-gst-invoice-on-mobile', why: 'Making, saving and sharing a GST invoice from your phone, step by step.' },
      { slug: 'avoid-errors-in-invoice-and-transport-details', why: 'The small mismatches between invoice and e-way bill that cause trouble at checks.' },
    ],
    rules: [
      { when: 'You are GST-registered and the supply is taxable', then: 'Issue a tax invoice with GST shown.' },
      { when: 'You are a composition taxpayer or the supply is exempt', then: 'Issue a bill of supply and charge no GST on it.' },
      { when: 'Goods move without a sale (job work, approval, branch transfer)', then: 'Use a delivery challan, plus an e-way bill where the rules need one.' },
      { when: 'Your location and the place of supply are in the same state', then: 'Charge CGST + SGST. Otherwise charge IGST.' },
    ],
    mistakes: [
      'Charging GST on a bill of supply. A bill of supply carries no tax.',
      'An invoice number or date on the e-way bill that differs from the printed invoice, even by one character.',
      'Rounding each line and the total differently, so the amount in words no longer matches the figure.',
    ],
    tools: [
      { href: '/invoice-generator', label: 'Free invoice generator (GST and non-GST)' },
      { href: '/tools/gst-calculator', label: 'GST calculator' },
      { href: '/tools/amount-in-words-converter', label: 'Amount in words converter' },
    ],
    faq: [
      {
        q: 'Can I make GST invoices for free?',
        a: 'Yes. The online invoice generator on this site is free, and creating invoices in the E-Way Easy app is free too. You pay only for e-way bill actions, ₹5 each, charged when the action succeeds.',
      },
      {
        q: 'Which article should I read first?',
        a: 'Start with “Invoice with GST or without GST?”. It decides which document you issue. Then read the GST calculation article to get the numbers right.',
      },
    ],
  },
  'gst-compliance': {
    answer:
      'GST compliance on a sales document comes down to three checks: the right tax head (CGST and SGST, or IGST), the right HSN code, and a valid buyer GSTIN. These articles explain each check in plain words, with worked examples and the mistakes that cause mismatches in returns and e-way bills.',
    startHere: [
      { slug: 'cgst-sgst-igst-explained', why: 'How place of supply decides the tax head, and why the wrong head costs you twice.' },
      { slug: 'hsn-codes-practical-guide', why: 'How many digits you need, how to pick the code and how to keep it consistent.' },
      { slug: 'gstin-verification-what-to-check', why: 'Format, checksum, status and name: what to check before you invoice a new buyer.' },
    ],
    rules: [
      { when: 'Your location and the place of supply are in the same state', then: 'Charge CGST + SGST (UTGST in Union Territories without a legislature).' },
      { when: 'They are in different states, or you supply to an SEZ', then: 'Charge IGST.' },
      { when: 'A buyer’s GSTIN fails the format or check-digit test', then: 'Stop and confirm it with the buyer before you raise the invoice.' },
      { when: 'You are unsure of a product’s HSN code', then: 'Check the tariff description itself, not another seller’s old invoice.' },
    ],
    mistakes: [
      'Paying IGST where CGST + SGST was due. Tax paid under the wrong head is not automatically counted under the right one.',
      'Copying a GSTIN from an old email or purchase order without checking its status.',
      'Using different HSN codes for the same product on different invoices.',
    ],
    tools: [
      { href: '/tools/gstin-validator', label: 'GSTIN validator' },
      { href: '/tools/hsn-code-lookup', label: 'HSN code lookup' },
      { href: '/tools/gst-state-code-list', label: 'GST state code list' },
    ],
    faq: [
      {
        q: 'Do these checks matter for e-way bills too?',
        a: 'Yes. The e-way bill takes the GSTINs, HSN codes and values from your invoice. A wrong tax head or GSTIN on the invoice goes straight into Part A.',
      },
      {
        q: 'Can a GSTIN pass the format check and still be wrong?',
        a: 'Yes. A valid format and check digit only show the number is well-formed. It can still belong to another business or be cancelled, so confirm the name and status on the GST portal.',
      },
    ],
  },
  'business-guides': {
    answer:
      'Business guides cover the workflow around compliance: how invoices, dispatch data and e-way bills move through a manufacturing or wholesale business, and where time and errors creep in. Read them when the rules are clear but the daily process is slow, messy or depends on one person who knows the portal.',
    startHere: [
      { slug: 'how-manufacturers-can-simplify-invoice-workflows', why: 'Where invoice-to-dispatch time goes in a factory, and what to fix first.' },
      { slug: 'prepare-invoice-data-for-bulk-processing', why: 'Cleaning spreadsheet data before a bulk upload on the portal.' },
      { slug: 'digital-tools-for-indian-manufacturers', why: 'Which kinds of tools solve which problems, without buying more than you need.' },
    ],
    rules: [
      { when: 'You raise a handful of e-way bills a day from invoices', then: 'Generating straight from the invoice on mobile saves retyping.' },
      { when: 'You raise many a day from an ERP', then: 'The portal’s bulk upload or an API integration through your ERP fits better.' },
      { when: 'Dispatch data lives in spreadsheets', then: 'Check and clean the file before uploading, with the bulk data checker.' },
    ],
    mistakes: [
      'Keeping buyer details in several places, so GSTINs and PIN codes drift apart.',
      'Relying on one person’s portal login and know-how, with nothing written down.',
      'Fixing the e-way bill step while the invoice data feeding it stays messy.',
    ],
    tools: [
      { href: '/tools/bulk-eway-bill-data-checker', label: 'Bulk e-way bill data checker' },
      { href: '/bulk-eway-bill-generation', label: 'Bulk e-way bill generation on the portal' },
      { href: '/solutions', label: 'Solutions by business type' },
    ],
    faq: [
      {
        q: 'Does E-Way Easy generate e-way bills in bulk?',
        a: 'No. The app works one invoice at a time. For bulk generation use the official portal’s bulk upload; the free bulk data checker helps you prepare the file.',
      },
      {
        q: 'Who are these guides for?',
        a: 'Owners, accounts staff and dispatch desks at manufacturers, wholesalers and distributors. They assume you know the basic rules and want a smoother daily process.',
      },
    ],
  },
};
