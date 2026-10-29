// Help centre articles. Answers are plain text so they can be reused in FAQPage JSON-LD.
// Only describe verified app behaviour (see content/EDITORIAL_BRIEF.md).

export type HelpLink = { label: string; href: string };

export type HelpArticle = {
  id: string;
  category: 'Getting started' | 'Invoice and buyer details' | 'Wallet and generation' | 'After generation';
  q: string;
  /** Paragraphs of plain text. */
  a: string[];
  links?: HelpLink[];
  keywords?: string;
};

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'connect-api-login',
    category: 'Getting started',
    q: 'Connecting your e-way bill API login',
    a: [
      'E-Way Easy files e-way bills on the official NIC e-way bill system through an authorised GST Suvidha Provider (GSP), using your own e-way bill system API login. You connect it once, and the app guides you through the setup step by step.',
      'The API login is stored encrypted and used only for the e-way bills you ask the app to generate or manage. If the connection fails, check the steps in the in-app guide and our setup page, then try again.',
      'Never share your portal password or OTP over phone, WhatsApp or email. No genuine support team will ask for them.',
    ],
    links: [{ label: 'E-way bill API login setup', href: '/eway-bill-api-setup' }],
    keywords: 'api login username password gsp connect setup credentials portal nic',
  },
  {
    id: 'pdf-import-field',
    category: 'Invoice and buyer details',
    q: 'Invoice PDF import didn’t read a field correctly',
    a: [
      'When you import an invoice PDF, the app reads the buyer, GSTIN, items, HSN codes and totals from it. Invoice layouts vary, so always review the extracted details before generating.',
      'If a field was read wrongly or left empty, correct it on the review screen. Pay particular attention to the buyer GSTIN, invoice number and date, HSN codes, taxable value and tax, because these go into Part A and cannot be edited after generation.',
    ],
    links: [{ label: 'Invoice PDF to e-way bill', href: '/invoice-pdf-to-eway-bill' }],
    keywords: 'pdf import upload read extract wrong field missing ocr invoice',
  },
  {
    id: 'gstin-not-filling',
    category: 'Invoice and buyer details',
    q: 'Buyer GSTIN details are not filling automatically',
    a: [
      'Check that the GSTIN has exactly 15 characters, with no spaces, and that letters and numbers are in the right places. A single wrong character means no details are found.',
      'Make sure your phone has a working internet connection, then enter the GSTIN again.',
      'If the buyer is not registered under GST, leave the GSTIN field empty and enter the name, address, state and PIN yourself.',
    ],
    links: [{ label: 'Check a GSTIN format with the free GSTIN validator', href: '/tools/gstin-validator' }],
    keywords: 'gstin buyer name address autofill auto-fill unregistered not found',
  },
  {
    id: 'wrong-distance',
    category: 'Invoice and buyer details',
    q: 'The distance looks wrong',
    a: [
      'The app calculates the distance from the PIN codes of the dispatch and delivery places. You can edit it before you continue.',
      'The official portal allows you to enter an actual distance up to 10% more than its own PIN-to-PIN distance. If your route is longer than that, check the PIN codes first, because a wrong PIN is the usual cause.',
    ],
    links: [
      { label: 'Estimate distance with the free distance calculator', href: '/tools/distance-calculator' },
      { label: 'Read the e-way bill distance rules', href: '/eway-bill-distance-rules' },
    ],
    keywords: 'distance km pin code pincode route 10%',
  },
  {
    id: 'hsn-wrong',
    category: 'Invoice and buyer details',
    q: 'The HSN code is wrong',
    a: [
      'The HSN code fills in from the product you select. If it is wrong, correct the HSN code in the product itself so the right code is used on every future invoice.',
      'You can also edit the HSN on the invoice line before you move to the review step.',
    ],
    links: [{ label: 'Look up an HSN code', href: '/tools/hsn-code-lookup' }],
    keywords: 'hsn code product sac tax rate',
  },
  {
    id: 'invoice-number-used',
    category: 'Invoice and buyer details',
    q: 'The invoice number is already used',
    a: [
      'Each invoice number in a financial year must be unique. The app numbers invoices in your own pre-series, so this usually happens when the same number was already used elsewhere, for example in another billing software or a manual bill book.',
      'Check your invoice series setting in the app, set it to continue after the last number you actually used, and create the invoice again.',
    ],
    links: [{ label: 'Plan a numbering series with the invoice number generator', href: '/tools/invoice-number-generator' }],
    keywords: 'invoice number duplicate series prefix already exists',
  },
  {
    id: 'low-credits',
    category: 'Wallet and generation',
    q: 'My wallet shows low credits',
    a: [
      'Generating an e-way bill needs 5 credits (₹5, as 1 credit = ₹1). Open the Wallet in the app, pick a pack from 50 to 1,000 credits or enter any other amount, and tap Add credits.',
      'Updating Part-B, a consolidated e-way bill, cancelling and extending validity also cost 5 credits each. Credits are taken only when the action succeeds.',
      'If you paid but the credits did not appear, do not pay again. Wait a few minutes and reopen the wallet. If the balance is still unchanged, contact support with the payment reference and a screenshot; we will add the credits or refund that payment. Purchased credits are otherwise not refundable.',
    ],
    links: [
      { label: 'How wallet credits work', href: '/pricing' },
      { label: 'Refund policy', href: '/refund-policy' },
    ],
    keywords: 'wallet credits balance add credits payment recharge top up',
  },
  {
    id: 'generation-failed',
    category: 'Wallet and generation',
    q: 'Generation failed or seems stuck',
    a: [
      'You are not charged for a failed action: credits are taken only when it succeeds, and if the government portal rejects it, the credits go back to your wallet automatically.',
      'Do not retry again and again. A slow response does not always mean the e-way bill was not created, and repeated attempts can create duplicates for the same invoice.',
      'First check your e-way bill list in the app, or the official e-way bill portal, to see whether an e-way bill already exists for that invoice.',
      'If none exists, check your internet connection and the invoice details, then try once more. If it still fails, contact support with the invoice number and a screenshot of the error.',
    ],
    links: [
      { label: 'Compare invoice and e-way bill details', href: '/tools/invoice-vs-eway-bill-checker' },
      { label: 'Common e-way bill errors', href: '/eway-bill-common-errors' },
    ],
    keywords: 'failed stuck loading error timeout duplicate retry',
  },
  {
    id: 'cancel',
    category: 'After generation',
    q: 'I need to cancel an e-way bill',
    a: [
      'An e-way bill can be cancelled within 24 hours of generation if the goods were not transported or were not transported as per the details. It cannot be cancelled once it has been verified in transit.',
      'Within that window you can cancel it from the app; cancelling costs 5 credits. After 24 hours it cannot be cancelled; the recipient may reject it within the time allowed.',
    ],
    links: [{ label: 'E-way bill cancellation guide', href: '/eway-bill-cancellation' }],
    keywords: 'cancel cancellation 24 hours reject',
  },
  {
    id: 'details-wrong-after',
    category: 'After generation',
    q: 'Details are wrong after the e-way bill was generated',
    a: [
      'An e-way bill cannot be edited. Vehicle details (Part B) can be updated during validity, but if Part A details such as the GSTIN, value or HSN are wrong, the usual fix is to cancel within 24 hours and generate a new one.',
    ],
    links: [
      { label: 'How to correct an e-way bill', href: '/eway-bill-correction' },
      { label: 'Check invoice vs e-way bill details', href: '/tools/invoice-vs-eway-bill-checker' },
    ],
    keywords: 'wrong mistake edit correct update vehicle part a part b',
  },
];

export const GETTING_STARTED_FAQ = [
  {
    q: 'How do I get started with E-Way Easy?',
    a: 'Install the app from Google Play, sign in with email or Google, add your business GSTIN and connect your e-way bill API login once (the app guides you). Then create or import your first invoice. The app takes you through three steps: Invoice, Review EWB and Generated.',
  },
];
