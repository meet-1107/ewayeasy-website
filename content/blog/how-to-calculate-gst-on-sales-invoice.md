---
title: "How to Calculate GST on a Sales Invoice"
slug: "how-to-calculate-gst-on-sales-invoice"
excerpt: "A worked, line-by-line method for calculating GST on a sales invoice — with discounts, mixed rates, CGST/SGST vs IGST and rounding."
category: "invoicing"
tags: ["gst calculation", "sales invoice", "cgst", "igst", "discount"]
publishedAt: "2026-08-12"
updatedAt: "2026-10-08"
verifiedAt: "2026-10-10"
seoTitle: "How to Calculate GST on a Sales Invoice (Worked Example)"
metaDescription: "Calculate GST on a multi-line sales invoice step by step: discounts, taxable value, CGST+SGST vs IGST, mixed rates, rounding and common mistakes."
imageAlt: "Sales invoice with three line items, a discount column and CGST, SGST and IGST totals"
sources:
  - title: "CBIC GST (Acts and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
  - title: "CBIC"
    url: "https://www.cbic.gov.in/"
faq:
  - q: "Is GST calculated before or after discount?"
    a: "A discount shown on the invoice at the time of supply is deducted before calculating GST, so tax is charged on the reduced value. Post-sale discounts follow separate conditions."
  - q: "Is freight charged on the invoice subject to GST?"
    a: "Generally, incidental charges such as packing or freight charged by the supplier in the invoice are included in the value of supply. Check the treatment for your situation."
  - q: "How do I split GST into CGST and SGST?"
    a: "For an intra-state supply, the rate is split equally — for example an 18% rate becomes 9% CGST and 9% SGST. For inter-state supply, the full rate is charged as IGST."
related: ["cgst-sgst-igst-explained", "avoid-errors-in-invoice-and-transport-details"]
---
GST on a single-item bill is easy: price × rate. Real invoices are rarely that simple. There are several products, different tax rates, a trade discount on one line, freight added at the bottom, and the question of whether the buyer is in your state or another. Get any of these wrong and the invoice, the e-way bill and your GST return all carry the error.

This guide walks through the method line by line, then works a full example both ways — intra-state and inter-state.

> **Rates used here are for illustration only.** GST rates are notified by the government and have changed over time. Always confirm the current rate for your goods on official sources before invoicing.

## The method in five steps

1. **Compute the gross amount for each line:** quantity × unit rate.
2. **Subtract the discount shown on the invoice** for that line to get the **taxable value**. A discount given at or before supply and recorded on the invoice reduces the value on which GST is charged (Section 15(3) of the CGST Act).
3. **Add incidental charges** charged by you (packing, freight, loading) to the value of supply where they form part of it, and tax them at the applicable rate.
4. **Decide the tax type** from the place of supply:
   - Supplier and place of supply in the **same state** → **CGST + SGST** (or UTGST in a Union Territory), each at half the rate.
   - **Different states**, or supply to an SEZ → **IGST** at the full rate.
5. **Compute tax per line, total it, then round** the invoice total in one consistent way.

## Worked example (illustrative): three products, one discount

A Rajkot hardware manufacturer (sample GSTIN `24ABCDE1234F1Z5`) sells to a dealer. The invoice has:

| # | Item | Qty | Rate (₹) | Discount | Illustrative GST rate |
|---|---|---|---|---|---|
| 1 | Brass ball valve 1" | 200 | 310.00 | 5% | 18% |
| 2 | CPVC pipe 3 m | 150 | 245.00 | nil | 18% |
| 3 | Plumbing tool kit | 40 | 875.00 | ₹1,500 flat | 5% |

Freight charged on the invoice: ₹2,400 (treated here as part of the value of supply; for illustration, it is taxed at the highest rate on the invoice — 18%. The correct treatment of freight in a mixed-rate invoice depends on facts; check with your adviser).

### Step 1–2: Taxable value per line

| # | Gross (Qty × Rate) | Discount | Taxable value |
|---|---|---|---|
| 1 | 200 × 310 = 62,000.00 | 5% = 3,100.00 | **58,900.00** |
| 2 | 150 × 245 = 36,750.00 | 0.00 | **36,750.00** |
| 3 | 40 × 875 = 35,000.00 | 1,500.00 | **33,500.00** |
| Freight | — | — | **2,400.00** |
| **Total** | | | **1,31,550.00** |

### Step 3: Group by rate

| Rate | Taxable value |
|---|---|
| 18% (lines 1, 2 and freight) | 58,900 + 36,750 + 2,400 = **98,050.00** |
| 5% (line 3) | **33,500.00** |

### Case A: Buyer in Ahmedabad (intra-state, Gujarat → Gujarat)

| Rate | Taxable value | CGST | SGST |
|---|---|---|---|
| 18% (9% + 9%) | 98,050.00 | 8,824.50 | 8,824.50 |
| 5% (2.5% + 2.5%) | 33,500.00 | 837.50 | 837.50 |
| **Total** | **1,31,550.00** | **9,662.00** | **9,662.00** |

Invoice total = 1,31,550.00 + 9,662.00 + 9,662.00 = **₹1,50,874.00**

### Case B: Buyer in Indore (inter-state, Gujarat → Madhya Pradesh)

| Rate | Taxable value | IGST |
|---|---|---|
| 18% | 98,050.00 | 17,649.00 |
| 5% | 33,500.00 | 1,675.00 |
| **Total** | **1,31,550.00** | **19,324.00** |

Invoice total = 1,31,550.00 + 19,324.00 = **₹1,50,874.00**

Notice that the **total tax is the same** in both cases (₹19,324). Only the split changes. IGST = CGST + SGST for the same rate and value.

### What the e-way bill picks up

Since the consignment value is ₹1,50,874 (above the general ₹50,000 threshold), an e-way bill is needed. Its Part A will carry the taxable value of ₹1,31,550 and the tax split — CGST/SGST for Case A, IGST for Case B. These must match the invoice exactly. See [common e-way bill errors](/eway-bill-common-errors) for what happens when they do not.

## Working backwards from a GST-inclusive price

Retail and some B2B quotes are given inclusive of GST. To find the taxable value:

**Taxable value = Inclusive price × 100 ÷ (100 + rate)**

**Example (illustrative):** A dealer quotes ₹11,800 inclusive of 18% GST.
- Taxable value = 11,800 × 100 ÷ 118 = ₹10,000
- GST = ₹1,800 (CGST ₹900 + SGST ₹900 if intra-state)

Our [GST inclusive/exclusive calculator](/tools/gst-inclusive-exclusive-calculator) does this instantly.

## Rounding

- Compute tax per line or per rate group to two decimals.
- Round the final invoice total to the nearest rupee if that is your practice, and show the round-off amount separately.
- Do not round each line to the rupee and then also round the total — the small differences add up and cause mismatches with the e-way bill and returns.

## Discounts: what reduces the taxable value and what does not

| Discount type | Reduces taxable value on this invoice? |
|---|---|
| Trade discount shown on the invoice at the time of supply | Yes |
| Cash discount for early payment, known and recorded on the invoice | Generally yes, if on the invoice |
| Year-end volume discount given later | Not on the original invoice; handled through a credit note subject to Section 15(3)(b) conditions |
| Free item given as a "discount" | Needs separate analysis; not a simple deduction |

## Common mistakes

- **Charging GST before discount.** Tax should be on the discounted value when the discount is on the invoice.
- **Charging CGST + SGST on an inter-state sale** (or IGST on an intra-state sale). The tax paid under the wrong head is a problem to fix, not a rounding issue. Read [CGST vs SGST vs IGST explained](/blog/cgst-sgst-igst-explained).
- **Using one rate for the whole invoice** when items carry different rates.
- **Leaving freight or packing out of the taxable value** when you are charging it on the invoice.
- **Splitting 18% as 18% CGST + 18% SGST.** It is 9% + 9%.
- **Rounding at every line.**
- **Using an outdated rate.** Rates have been revised; keep your product master current.

## Making this automatic

If you keep products with their HSN and rate in a master list, and buyers with their GSTIN and state, the calculation becomes mechanical. In the E-Way Easy app, products and buyers are saved, HSN fills from the product and the buyer's state comes from their GSTIN, which drives the tax type. You still review everything on the invoice preview before saving. For quick checks, try our [GST calculator](/tools/gst-calculator) and [quantity and tax calculator](/tools/quantity-and-tax-calculator).

## Official sources

Value of supply is defined in Section 15 of the CGST Act, and the invoice particulars in Rule 46 of the CGST Rules. Current tax rates are notified by the government — check [cbic-gst.gov.in](https://cbic-gst.gov.in/) and [cbic.gov.in](https://www.cbic.gov.in/), and the [GST portal](https://www.gst.gov.in/) for return-related guidance.
