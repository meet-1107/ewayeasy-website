// Preliminary e-way bill eligibility check. Pure function: no I/O, no dates, easy to test.
// Encodes only the generally accepted position under Section 68 / Rule 138 of the CGST Rules.
// It does NOT encode state-specific intra-state thresholds — those must be checked in the
// relevant state notification.

import type { Paise } from './money';

export const LAST_VERIFIED = '14 Oct 2026';

/** General consignment value threshold under Rule 138(1): ₹50,000 (in paise). */
export const GENERAL_THRESHOLD_PAISE: Paise = 50_000_00;

export type MovementType = 'supply' | 'sales-return' | 'job-work' | 'branch-transfer' | 'exhibition' | 'other';
export type Scope = 'inter' | 'intra';
export type ExemptAnswer = 'yes' | 'no' | 'not-sure';
export type TransportMode = 'road' | 'rail' | 'air' | 'ship' | 'non-motorised';
export type EligibilityStatus = 'likely-required' | 'likely-not-required' | 'review-needed';

export interface EligibilityInput {
  movement: MovementType;
  scope: Scope;
  /** Consignment value in paise (taxable value + GST, excluding exempt supplies on the same document). */
  valuePaise: Paise | null;
  exemptGoods: ExemptAnswer;
  mode: TransportMode;
  /** Specified handicraft goods transported by a person exempt from registration. */
  handicraftUnregistered: boolean;
  /** Approximate distance in km, optional. Used only for the Part B note. */
  distanceKm?: number | null;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  label: string;
  reasons: string[];
  generalRule: string;
  exceptions: string[];
  notes: string[];
}

export const STATUS_LABEL: Record<EligibilityStatus, string> = {
  'likely-required': 'Likely required',
  'likely-not-required': 'Likely not required',
  'review-needed': 'Review needed',
};

export const MOVEMENT_LABEL: Record<MovementType, string> = {
  supply: 'Supply (sale)',
  'sales-return': 'Sales return',
  'job-work': 'Job work',
  'branch-transfer': 'Branch / stock transfer',
  exhibition: 'Exhibition or fair',
  other: 'Other reason',
};

export const MODE_LABEL: Record<TransportMode, string> = {
  road: 'Road',
  rail: 'Rail',
  air: 'Air',
  ship: 'Ship',
  'non-motorised': 'Non-motorised conveyance',
};

export const GENERAL_RULE =
  'Under Rule 138 of the CGST Rules, 2017, an e-way bill is generally required before goods move when the consignment value exceeds ₹50,000 — whether the movement is in relation to a supply, for reasons other than supply (such as job work, stock transfer or exhibition), or due to inward supply from an unregistered person. Consignment value includes GST but excludes the value of exempt supplies on the same document.';

const STATE_THRESHOLD_NOTE =
  'For movement within a state, some states have notified a different (higher) threshold. Check the latest notification of your state before relying on the ₹50,000 figure.';

const BASE_EXCEPTIONS = [
  'Goods listed in the Annexure to Rule 138(14), and certain exempt or nil-rated goods, do not need an e-way bill (conditions apply).',
  'Goods carried by non-motorised conveyance (for example, a hand cart) are exempt.',
  'Goods moving from a port, airport, air cargo complex or land customs station to an ICD or CFS for customs clearance, and certain movements under customs supervision, are exempt.',
  'A registered person may generate an e-way bill voluntarily even when the value is below the threshold.',
];

const MOVEMENT_NOTES: Partial<Record<MovementType, string>> = {
  'sales-return':
    'A sales return is a movement of goods too. The value threshold applies to the goods being returned.',
  'job-work':
    'Goods sent to a job worker usually move on a delivery challan. Inter-state movement by a principal to a job worker needs an e-way bill irrespective of value.',
  'branch-transfer':
    'Stock transfer is a movement for reasons other than supply (or a supply between distinct persons when the branches have different GSTINs). The value threshold still applies.',
  exhibition:
    'Goods sent for an exhibition or fair are moved for reasons other than supply, usually on a delivery challan. The value threshold still applies.',
  other:
    'For other reasons of movement, confirm on the portal which sub-supply type applies and whether any special condition exists.',
};

type Done = (s: EligibilityStatus) => EligibilityResult;

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = [];
  const notes: string[] = [];
  const exceptions = [...BASE_EXCEPTIONS];
  const movementNote = MOVEMENT_NOTES[input.movement];
  if (movementNote) notes.push(movementNote);
  if (input.scope === 'intra') notes.push(STATE_THRESHOLD_NOTE);
  notes.push(...partBNotes(input));

  const done: Done = (status) => ({
    status,
    label: STATUS_LABEL[status],
    reasons,
    generalRule: GENERAL_RULE,
    exceptions,
    notes,
  });

  // 1. Exemptions that apply notwithstanding the rest of Rule 138.
  if (input.mode === 'non-motorised') {
    reasons.push('Goods transported by a non-motorised conveyance are listed as an exemption under Rule 138(14).');
    return done('likely-not-required');
  }
  if (input.exemptGoods === 'yes') {
    reasons.push('You indicated the goods are covered by the Annexure to Rule 138(14) or an exemption notification. Confirm the exact entry and its conditions.');
    return done('likely-not-required');
  }

  // 2. Required irrespective of value.
  if (input.scope === 'inter' && input.movement === 'job-work') {
    reasons.push('Inter-state movement of goods by a principal to a job worker requires an e-way bill irrespective of the consignment value.');
    return withUnsure(input, reasons, done);
  }
  if (input.scope === 'inter' && input.handicraftUnregistered) {
    reasons.push('Inter-state transport of specified handicraft goods by a person exempt from registration requires an e-way bill irrespective of the consignment value.');
    return withUnsure(input, reasons, done);
  }
  if (input.scope === 'intra' && input.handicraftUnregistered) {
    notes.push('The "irrespective of value" handicraft rule applies to inter-state transport. For movement within the state, the normal value test applies.');
  }

  // 3. Value test.
  if (input.valuePaise === null || !Number.isFinite(input.valuePaise) || input.valuePaise < 0) {
    reasons.push('Enter the consignment value to apply the ₹50,000 threshold.');
    return done('review-needed');
  }
  if (input.valuePaise > GENERAL_THRESHOLD_PAISE) {
    reasons.push('The consignment value exceeds the general threshold of ₹50,000.');
    if (input.scope === 'intra') {
      reasons.push('Movement is within one state, so your state may have notified a higher threshold — check before deciding.');
    }
    return withUnsure(input, reasons, done);
  }

  reasons.push('The consignment value does not exceed the general threshold of ₹50,000.');
  if (input.scope === 'inter') reasons.push('For inter-state movement the general threshold applies.');
  return done('likely-not-required');
}

function withUnsure(input: EligibilityInput, reasons: string[], done: Done): EligibilityResult {
  if (input.exemptGoods === 'not-sure') {
    reasons.push('You are not sure whether the goods are exempt. If they are listed in the Annexure to Rule 138(14) or an exemption notification, an e-way bill may not be needed — check before moving the goods.');
    return done('review-needed');
  }
  return done('likely-required');
}

function partBNotes(input: EligibilityInput): string[] {
  const out: string[] = [];
  if (input.mode === 'rail' || input.mode === 'air' || input.mode === 'ship') {
    out.push('For rail, air or ship, the supplier or recipient generates the e-way bill and the transport document number goes in Part B.');
  }
  const d = input.distanceKm;
  if (input.mode === 'road' && input.scope === 'intra' && typeof d === 'number' && d > 0 && d <= 50) {
    out.push("Part B (vehicle details) is not required where goods move within the same state up to 50 km from the consignor's place to the transporter's place for further transport (or from the transporter to the consignee). Part A is still required.");
  }
  return out;
}

export const OFFICIAL_LINKS = [
  { title: 'E-Way Bill System (official portal)', url: 'https://ewaybillgst.gov.in/' },
  { title: 'E-Way Bill user documentation', url: 'https://docs.ewaybillgst.gov.in/' },
  { title: 'CBIC GST — CGST Act and Rules', url: 'https://cbic-gst.gov.in/' },
  { title: 'GST portal', url: 'https://www.gst.gov.in/' },
];
