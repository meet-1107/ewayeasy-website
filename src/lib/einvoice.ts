// Preliminary e-invoicing (IRN) applicability check. Pure function, no I/O.
// Encodes only the generally stated position; the governing notifications must be
// checked on the official portals before relying on the result.

import type { Paise } from './money';

export const LAST_VERIFIED = '16 Oct 2026';

/** E-invoicing threshold: AATO exceeding ₹5 crore (in paise). Exactly ₹5 crore does not exceed it. */
export const EINVOICE_THRESHOLD_PAISE: Paise = 5_00_00_000_00;
/** 30-day reporting limit applies at AATO of ₹10 crore and above (in paise). */
export const REPORTING_LIMIT_THRESHOLD_PAISE: Paise = 10_00_00_000_00;
/** Dynamic QR code on B2C invoices: AATO above ₹500 crore (in paise). */
export const DYNAMIC_QR_THRESHOLD_PAISE: Paise = 500_00_00_000_00;

export type EntityType =
  | 'regular' | 'sez-unit' | 'insurer' | 'bank' | 'nbfc' | 'financial-institution' | 'gta'
  | 'passenger-transport' | 'multiplex' | 'government' | 'local-authority';

export const ENTITY_LABEL: Record<EntityType, string> = {
  regular: 'Regular business (including SEZ developer)',
  'sez-unit': 'SEZ unit',
  insurer: 'Insurance company',
  bank: 'Banking company',
  nbfc: 'NBFC',
  'financial-institution': 'Financial institution',
  gta: 'Goods transport agency (GTA)',
  'passenger-transport': 'Passenger transportation service',
  multiplex: 'Admission to exhibition of films in multiplex screens',
  government: 'Government department',
  'local-authority': 'Local authority',
};

const EXEMPT_REASON: Record<Exclude<EntityType, 'regular'>, string> = {
  'sez-unit': 'SEZ units are generally exempt from e-invoicing. Note that this exemption is for SEZ units, not SEZ developers.',
  insurer: 'Insurers are generally exempt from e-invoicing.',
  bank: 'Banking companies are generally exempt from e-invoicing.',
  nbfc: 'NBFCs are generally covered by the exemption for banking companies and financial institutions.',
  'financial-institution': 'Financial institutions, including NBFCs, are generally exempt from e-invoicing.',
  gta: 'Goods transport agencies supplying services of transporting goods by road are generally exempt.',
  'passenger-transport': 'Suppliers of passenger transportation services are generally exempt.',
  multiplex: 'Suppliers of services by way of admission to exhibition of films in multiplex screens are generally exempt.',
  government: 'Government departments are generally excluded from e-invoicing.',
  'local-authority': 'Local authorities are generally excluded from e-invoicing.',
};

export interface EinvoiceInput {
  /** Highest aggregate annual turnover in any FY from 2017-18 onwards, in paise. */
  aatoPaise: Paise;
  entity: EntityType;
  supplies: { b2b: boolean; exports: boolean; b2c: boolean };
}

export type EinvoiceStatus = 'likely-applicable' | 'likely-not-applicable' | 'review';

export const STATUS_LABEL: Record<EinvoiceStatus, string> = {
  'likely-applicable': 'E-invoicing likely applicable',
  'likely-not-applicable': 'E-invoicing likely not applicable',
  review: 'Review needed',
};

export interface EinvoiceResult {
  status: EinvoiceStatus;
  label: string;
  reasons: string[];
  notes: string[];
}

export function isExemptEntity(e: EntityType): boolean {
  return e !== 'regular';
}

export function exceedsThreshold(aatoPaise: Paise): boolean {
  return aatoPaise > EINVOICE_THRESHOLD_PAISE;
}

export function checkEinvoice(input: EinvoiceInput): EinvoiceResult {
  const { aatoPaise, entity, supplies } = input;
  const reasons: string[] = [];
  const notes: string[] = [];
  const anySupply = supplies.b2b || supplies.exports || supplies.b2c;
  const covered = supplies.b2b || supplies.exports;
  const exceeds = exceedsThreshold(aatoPaise);

  let status: EinvoiceStatus;

  if (entity !== 'regular') {
    status = 'likely-not-applicable';
    reasons.push(EXEMPT_REASON[entity]);
    reasons.push('The exemption is based on the type of entity, so it generally applies whatever the turnover.');
    notes.push('Check that your business actually falls within the exempt category as described in the notification. A business that only partly fits a category should take advice.');
  } else if (!anySupply) {
    status = 'review';
    reasons.push('Select at least one type of supply you make (B2B, exports or B2C).');
  } else if (!exceeds) {
    status = 'likely-not-applicable';
    reasons.push(
      aatoPaise === EINVOICE_THRESHOLD_PAISE
        ? 'Your highest turnover is exactly ₹5 crore. E-invoicing applies only where aggregate turnover exceeds ₹5 crore, so it does not cross the threshold.'
        : 'Your highest aggregate turnover in any financial year from 2017-18 does not exceed ₹5 crore, the threshold applicable since 1 August 2023.',
    );
    notes.push('Keep monitoring turnover. Once it exceeds ₹5 crore in a financial year, e-invoicing generally applies from the following financial year. Confirm the start date against the current notification.');
  } else if (!covered) {
    status = 'likely-not-applicable';
    reasons.push('Your turnover exceeds ₹5 crore, but you selected only B2C supplies. E-invoicing (IRN) covers B2B supplies and exports, not invoices to unregistered consumers.');
    reasons.push('If you make even one B2B supply or export (including supplies to SEZ units or developers), e-invoicing applies to those documents.');
  } else {
    status = 'likely-applicable';
    reasons.push('Your highest aggregate turnover in a financial year from 2017-18 exceeds ₹5 crore, the threshold applicable since 1 August 2023.');
    const kinds = [supplies.b2b ? 'B2B supplies' : '', supplies.exports ? 'exports' : ''].filter(Boolean).join(' and ');
    reasons.push(`You make ${kinds}, which are covered by e-invoicing. Tax invoices, credit notes and debit notes for these supplies generally need to be reported to the Invoice Registration Portal (IRP) to get an IRN.`);
    reasons.push('Your entity type is not in the generally exempt list.');
    if (supplies.b2c) reasons.push('Your B2C invoices are not e-invoices and do not need an IRN.');
  }

  if (entity === 'regular' && exceeds && covered) {
    if (aatoPaise >= REPORTING_LIMIT_THRESHOLD_PAISE) {
      notes.push('Your AATO is ₹10 crore or more: from 1 April 2025, invoices are generally required to be reported to the IRP within 30 days of the invoice date. Older invoices may be rejected by the IRP.');
    }
    notes.push('When an e-invoice is generated, the e-way bill can be generated using the IRN, with Part A filled from the e-invoice data. Part B (vehicle details) is still needed for movement.');
    notes.push('An invoice issued without an IRN, where e-invoicing applies, is generally not treated as a valid tax invoice. This can affect your buyer’s input tax credit.');
  }
  if (supplies.b2c && aatoPaise > DYNAMIC_QR_THRESHOLD_PAISE && entity === 'regular') {
    notes.push('Your AATO exceeds ₹500 crore: B2C invoices are generally required to carry a dynamic QR code (this is separate from e-invoicing). Check the conditions and exemptions in the current notification.');
  }
  if (aatoPaise > 0 && aatoPaise <= EINVOICE_THRESHOLD_PAISE && aatoPaise >= 4_00_00_000_00 && entity === 'regular') {
    notes.push('Your turnover is close to the ₹5 crore threshold. Aggregate turnover is computed on an all-India PAN basis, so include all GSTINs under the same PAN.');
  }

  return { status, label: STATUS_LABEL[status], reasons, notes };
}

export const OFFICIAL_LINKS = [
  { title: 'E-Invoice System (IRP)', url: 'https://einvoice1.gst.gov.in/' },
  { title: 'GST portal', url: 'https://www.gst.gov.in/' },
  { title: 'CBIC GST — notifications', url: 'https://cbic-gst.gov.in/' },
];
