// Compliance updates shown on the homepage and /updates.
// Every entry must cite an official source. `status: 'pending-verification'` renders a warning label
// instead of presenting the item as current law. Re-verify and bump `verifiedAt` before each release.

export interface ComplianceUpdate {
  id: string;
  headline: string;
  summary: string;
  announced: string; // date of advisory / notification (YYYY-MM or YYYY-MM-DD)
  effective: string;
  impacted: string;
  previous?: string;
  now: string;
  example: string;
  reference: string; // notification / advisory description — never invented numbers
  source: { title: string; url: string };
  verifiedAt: string;
  status: 'verified' | 'pending-verification';
  important?: boolean;
}

export const UPDATES: ComplianceUpdate[] = [
  {
    id: 'gst-rate-rationalisation-2025',
    headline: 'GST rate slabs rationalised: 5% and 18% are now the main rates',
    summary:
      'Following the 56th GST Council meeting, most goods moved to a two-slab structure of 5% and 18%, with a 40% rate for specified goods. Check the rate on your invoices and product master.',
    announced: '2025-09-03',
    effective: '2025-09-22',
    impacted: 'All suppliers, especially those billing goods earlier taxed at 12% or 28%',
    previous: 'Main slabs of 5%, 12%, 18% and 28%',
    now: 'Main slabs of 5% and 18%, plus 40% for specified goods (special rates such as 0.25% and 3% continue)',
    example:
      'Example (illustrative): an item earlier billed at 12% may now fall under 5% or 18%. Update the GST rate in your product list before you raise the next invoice, or the tax and consignment value on the e-way bill will be wrong.',
    reference: 'Recommendations of the 56th GST Council meeting and the rate notifications that followed',
    source: { title: 'CBIC GST', url: 'https://cbic-gst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
    important: true,
  },
  {
    id: 'ewb-180-day-document-limit',
    headline: 'E-way bills cannot be generated for documents older than 180 days',
    summary:
      'The e-way bill system no longer accepts base documents (invoice, bill of supply or challan) dated more than 180 days before the generation date.',
    announced: '2024-11',
    effective: '2025-01-01',
    impacted: 'All taxpayers and transporters generating e-way bills',
    previous: 'No age limit on the base document date',
    now: 'The document date must be within 180 days of the e-way bill generation date',
    example:
      'Example (illustrative): a delivery challan dated 1 March cannot be used to generate an e-way bill on 15 September of the same year.',
    reference: 'GSTN advisory on e-way bill system changes',
    source: { title: 'E-Way Bill System', url: 'https://ewaybillgst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
    important: true,
  },
  {
    id: 'ewb-360-day-extension-cap',
    headline: 'E-way bill extension capped at 360 days from original generation',
    summary: 'An e-way bill can be extended only until 360 days have passed since it was first generated.',
    announced: '2024-11',
    effective: '2025-01-01',
    impacted: 'Taxpayers and transporters who extend e-way bills for long-held or delayed consignments',
    previous: 'Extensions possible without an overall cap',
    now: 'Total life of an e-way bill, including all extensions, is limited to 360 days from generation',
    example:
      'Example (illustrative): goods held at a transporter’s godown for months cannot keep moving on the same e-way bill past the 360-day mark; a fresh document and e-way bill will be needed.',
    reference: 'GSTN advisory on e-way bill system changes',
    source: { title: 'E-Way Bill System', url: 'https://ewaybillgst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
  },
  {
    id: 'ewb-mfa',
    headline: 'Multi-factor authentication on the e-way bill portal',
    summary:
      'Login to the e-way bill and e-invoice systems requires multi-factor authentication (OTP), rolled out in phases by turnover and extended to all taxpayers in 2025.',
    announced: '2024-12',
    effective: '2025-01-01 (phased, all taxpayers from 2025-04-01)',
    impacted: 'Every user who logs in to the e-way bill portal',
    previous: 'Username and password login',
    now: 'Username, password and an OTP on the registered mobile number',
    example:
      'Example (illustrative): if your accountant generates e-way bills, plan how they will receive the OTP sent to the registered mobile number. Never share portal passwords with apps or websites.',
    reference: 'GSTN advisories on MFA for the e-way bill and e-invoice systems',
    source: { title: 'E-Way Bill System', url: 'https://ewaybillgst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
  },
  {
    id: 'einvoice-30-day',
    headline: '30-day e-invoice reporting limit for AATO of ₹10 crore and above',
    summary:
      'Taxpayers with aggregate annual turnover of ₹10 crore or more must report invoices to the IRP within 30 days of the invoice date. This matters for e-way bills generated from IRN.',
    announced: '2024-11',
    effective: '2025-04-01',
    impacted: 'E-invoice-applicable taxpayers with AATO ≥ ₹10 crore',
    previous: 'The 30-day limit applied only to AATO ≥ ₹100 crore',
    now: 'The 30-day limit applies to AATO ≥ ₹10 crore',
    example:
      'Example (illustrative): an invoice dated 1 June must be reported to the IRP by 1 July. After that, no IRN is issued, so the e-way bill cannot be created from that IRN.',
    reference: 'GSTN advisory on time limit for reporting e-invoices',
    source: { title: 'GST portal', url: 'https://www.gst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
  },
  {
    id: 'ewb2-portal',
    headline: 'E-Way Bill 2.0 portal runs alongside the main portal',
    summary:
      'An additional e-way bill portal (E-Way Bill 2.0) works in sync with the main system, so e-way bills can still be generated and updated if one portal is down.',
    announced: '2024',
    effective: '2024',
    impacted: 'All e-way bill users',
    now: 'Both ewaybillgst.gov.in and ewaybill2.gst.gov.in can be used, with data kept in sync',
    example:
      'Example (illustrative): if the main portal is slow during month-end dispatches, log in to the 2.0 portal with the same credentials and the e-way bill will show on both.',
    reference: 'GSTN/NIC announcement of the E-Way Bill 2.0 portal',
    source: { title: 'E-Way Bill 2.0 portal', url: 'https://ewaybill2.gst.gov.in/' },
    verifiedAt: '2026-10-14',
    status: 'verified',
  },
];
