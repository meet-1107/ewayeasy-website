// Pricing configuration for the /pricing page — must match what the app wallet shows.
// Verified from the app's Wallet screen (October 2026): 1 credit = ₹1, every e-way bill action costs 5 credits,
// credits are charged only when an action succeeds and are refunded to the wallet automatically if the portal rejects it.
// `pricePaise` is in paise (₹50 = 5000) to avoid rounding errors.

export type CreditPack = {
  name: string;
  credits: number;
  pricePaise: number;
  note?: string;
};

export type ActionCost = { action: string; credits: number };

export const PRICING = {
  published: true,
  currency: 'INR',
  rupeesPerCredit: 1,
  creditPacks: [
    { name: '50 credits', credits: 50, pricePaise: 5000, note: '≈ 10 e-way bills' },
    { name: '100 credits', credits: 100, pricePaise: 10000, note: '≈ 20 e-way bills' },
    { name: '250 credits', credits: 250, pricePaise: 25000, note: '≈ 50 e-way bills' },
    { name: '500 credits', credits: 500, pricePaise: 50000, note: '≈ 100 e-way bills' },
    { name: '1,000 credits', credits: 1000, pricePaise: 100000, note: '≈ 200 e-way bills' },
  ] as CreditPack[],
  /** The wallet also lets you add any other number of credits. */
  customAmount: true,
  creditsPerEwayBill: 5 as number | null,
  actionCosts: [
    { action: 'Generate a new e-way bill', credits: 5 },
    { action: 'Update Part-B (vehicle)', credits: 5 },
    { action: 'Consolidated e-way bill', credits: 5 },
    { action: 'Cancel an e-way bill', credits: 5 },
    { action: 'Extend validity', credits: 5 },
  ] as ActionCost[],
  notes: [
    'Credits are taken only when the action succeeds. If the government portal rejects it, the credits are refunded to your wallet automatically.',
    'Need a different amount? The wallet also lets you add any other number of credits.',
  ] as string[],
};

/** True only when real prices are published and at least one pack exists. */
export function pricesArePublished(): boolean {
  return PRICING.published && PRICING.creditPacks.length > 0;
}

/** Formats a paise amount as Indian rupees, e.g. 49900 -> "₹499". */
export function formatPaise(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: PRICING.currency,
    minimumFractionDigits: paise % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}
