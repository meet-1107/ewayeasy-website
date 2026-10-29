// Thumbnail-style cover art for every article and guide (rendered by /cover/[slug], captured by
// scripts/capture-covers.mjs into public/images/covers/<slug>.jpg).
import type { ScreenName } from '@/components/AppScreens';

export type CoverVariant = 'person' | 'truck' | 'phone' | 'phones';

export interface CoverSpec {
  l1: string;
  l2: string;
  tag: string;
  variant: CoverVariant;
  screen?: ScreenName;
  flip?: boolean;
  ribbon?: 'red' | 'amber';
}

export const COVERS: Record<string, CoverSpec> = {
  // ---- Blog ----
  'what-is-an-eway-bill': { l1: 'E-WAY BILL', l2: 'EXPLAINED', tag: 'BEGINNER GUIDE', variant: 'phone', screen: 'review' },
  'who-is-responsible-for-generating-eway-bill': { l1: 'WHO MUST', l2: 'GENERATE?', tag: 'SELLER OR TRANSPORTER', variant: 'person', screen: 'review', flip: true },
  'eway-bill-limit-50000-threshold-exceptions': { l1: '₹50,000', l2: 'LIMIT', tag: '+ EXCEPTIONS', variant: 'phone', screen: 'invoice', ribbon: 'amber' },
  'how-distance-affects-eway-bill-validity': { l1: 'DISTANCE', l2: '= VALIDITY', tag: 'KM TO DAYS', variant: 'truck', ribbon: 'amber' },
  'eway-bill-part-a-and-part-b-explained': { l1: 'PART A', l2: 'VS PART B', tag: 'EXPLAINED', variant: 'phone', screen: 'review' },
  'how-to-update-vehicle-details-in-eway-bill': { l1: 'VEHICLE', l2: 'CHANGED?', tag: 'UPDATE PART B', variant: 'truck', ribbon: 'amber' },
  'what-to-do-when-eway-bill-expires': { l1: 'EXPIRED', l2: 'E-WAY BILL?', tag: 'DO THIS NOW', variant: 'person', screen: 'generated', flip: true },
  'delivery-challan-vs-tax-invoice': { l1: 'CHALLAN', l2: 'VS INVOICE', tag: 'WHEN TO USE WHICH', variant: 'phone', screen: 'invoice', ribbon: 'amber' },
  'how-to-calculate-gst-on-sales-invoice': { l1: 'GST', l2: 'CALCULATION', tag: 'WITH EXAMPLE', variant: 'phone', screen: 'invoice' },
  'cgst-sgst-igst-explained': { l1: 'CGST SGST', l2: 'OR IGST?', tag: 'SIMPLE GUIDE', variant: 'person', screen: 'review', flip: true },
  'hsn-codes-practical-guide': { l1: 'HSN CODE', l2: 'MADE EASY', tag: 'PRACTICAL GUIDE', variant: 'phone', screen: 'review', ribbon: 'amber' },
  'gstin-verification-what-to-check': { l1: 'GSTIN', l2: 'VERIFY FIRST', tag: '15-DIGIT CHECK', variant: 'phone', screen: 'invoice' },
  'how-manufacturers-can-simplify-invoice-workflows': { l1: 'FASTER', l2: 'INVOICING', tag: 'FOR MANUFACTURERS', variant: 'phone', screen: 'dashboard' },
  'eway-bills-for-wholesalers-and-distributors': { l1: 'WHOLESALE', l2: 'DISPATCH', tag: 'E-WAY BILL GUIDE', variant: 'truck', ribbon: 'amber' },
  'eway-bill-interstate-movement-requirements': { l1: 'INTERSTATE', l2: 'DISPATCH', tag: 'IGST + E-WAY BILL', variant: 'truck' },
  'eway-bill-intrastate-movement-considerations': { l1: 'WITHIN', l2: 'YOUR STATE', tag: 'CHECK STATE LIMIT', variant: 'truck', ribbon: 'amber' },
  'eway-bill-rules-for-job-work': { l1: 'JOB WORK', l2: 'E-WAY BILL', tag: 'INTERSTATE = ALWAYS', variant: 'person', screen: 'review' },
  'eway-bill-returns-and-special-transactions': { l1: 'SALES', l2: 'RETURNS?', tag: 'SPECIAL CASES', variant: 'person', screen: 'invoice', flip: true },
  'prepare-invoice-data-for-bulk-processing': { l1: 'BULK DATA', l2: 'READY', tag: 'SPREADSHEET TIPS', variant: 'phone', screen: 'dashboard', ribbon: 'amber' },
  'avoid-errors-in-invoice-and-transport-details': { l1: 'STOP', l2: 'MISTAKES', tag: 'PRE-DISPATCH CHECKLIST', variant: 'person', screen: 'invoice' },
  'digital-tools-for-indian-manufacturers': { l1: 'DIGITAL', l2: 'TOOLS', tag: 'FOR MANUFACTURERS', variant: 'phone', screen: 'dashboard' },
  'how-eway-easy-simplifies-eway-bill-workflow': { l1: 'E-WAY BILL', l2: 'IN 3 STEPS', tag: 'E-WAY EASY APP', variant: 'phones', ribbon: 'amber' },
  // ---- Guides ----
  'eway-bill-guide': { l1: 'E-WAY BILL', l2: 'MASTER GUIDE', tag: 'EVERYTHING IN ONE', variant: 'truck' },
  'eway-bill-generation': { l1: 'HOW TO', l2: 'GENERATE', tag: 'COMPLETE PROCESS', variant: 'phones' },
  'documents-required-for-eway-bill': { l1: 'DOCUMENTS', l2: '& DATA', tag: 'CHECKLIST', variant: 'person', screen: 'invoice', flip: true },
  'eway-bill-rules': { l1: 'RULE 138', l2: 'EXPLAINED', tag: 'E-WAY BILL RULES', variant: 'truck', ribbon: 'amber' },
  'eway-bill-validity': { l1: 'VALIDITY', l2: '& EXTENSION', tag: 'CALCULATE EXPIRY', variant: 'truck' },
  'eway-bill-distance-rules': { l1: 'PIN TO PIN', l2: 'DISTANCE', tag: '10% + 50 KM RULES', variant: 'phone', screen: 'review' },
  'eway-bill-cancellation': { l1: '24-HOUR', l2: 'CANCEL RULE', tag: "BEFORE IT'S LATE", variant: 'person', screen: 'generated' },
  'eway-bill-correction': { l1: 'WRONG', l2: 'DETAILS?', tag: 'WHAT YOU CAN FIX', variant: 'person', screen: 'review', flip: true },
  'bulk-eway-bill-generation': { l1: 'BULK', l2: 'GENERATION', tag: 'COMPLETE GUIDE', variant: 'truck', ribbon: 'amber' },
  'eway-bill-common-errors': { l1: 'ERRORS', l2: 'FIXED', tag: 'COMMON PROBLEMS', variant: 'person', screen: 'invoice' },
  'eway-bill-vs-sales-invoice': { l1: 'E-WAY BILL', l2: 'OR INVOICE?', tag: 'SALES INVOICE VS EWB', variant: 'phones' },
  'eway-bill-faq': { l1: '30 FAQs', l2: 'ANSWERED', tag: 'E-WAY BILL Q&A', variant: 'person', screen: 'review', ribbon: 'amber' },
  'consolidated-eway-bill': { l1: 'CONSOLIDATED', l2: 'E-WAY BILL', tag: 'ONE VEHICLE, MANY BILLS', variant: 'truck' },
};

export const coverPath = (slug: string) => `/images/covers/${slug}.jpg`;
