---
title: "How to Calculate GST on a Sales Invoice"
slug: "how-to-calculate-gst-on-sales-invoice"
excerpt: "A worked, line-by-line method for calculating GST on a sales invoice — with discounts, mixed rates, CGST/SGST vs IGST and rounding."
category: "invoicing"
tags: ["gst calculation", "sales invoice", "cgst", "igst", "discount"]
publishedAt: "2026-10-16"
updatedAt: "2026-11-16"
verifiedAt: "2026-10-16"
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
    a: "After. A discount shown on the invoice at the time of supply is deducted first, so tax is charged on the reduced value. Discounts given after the sale follow separate conditions and usually need a credit note."
  - q: "Is freight charged on the invoice subject to GST?"
    a: "Generally, yes. Incidental charges such as packing or freight that you charge on the invoice form part of the value of supply. The rate that applies to freight on a mixed-rate invoice depends on the facts, so check your case."
  - q: "How do I split GST into CGST and SGST?"
    a: "For an intra-state supply, split the rate equally, so 18% becomes 9% CGST and 9% SGST. Calculate each head on the taxable value separately. For an inter-state supply, charge the full rate as IGST."
related: ["cgst-sgst-igst-explained", "avoid-errors-in-invoice-and-transport-details"]
---
> **Quick answer:** For each line, take quantity × rate, deduct the discount shown on the invoice, and add any freight or packing you charge. Apply the GST rate to that taxable value. Within a state, split it into CGST and SGST; across states, charge IGST, then round the total once.

GST on a single-item bill is easy: price × rate. Real invoices have several products, mixed rates, a discount on one line and freight at the bottom.

Get any of these wrong and the error flows into the e-way bill and your GST return. This guide gives the method, then works one invoice both ways: intra-state and inter-state.

> **Rates used here are for illustration only.** GST rates are notified by the government and have changed over time. Confirm the current rate for your goods on official sources before invoicing.

## The method in five steps

GST on a sales invoice is the GST rate applied to the taxable value of each line. Taxable value is quantity × rate, less any discount shown on the invoice, plus incidental charges you bill. The place of supply then decides whether that tax is charged as CGST + SGST or as IGST.

1. **Compute the gross amount for each line:** quantity × unit rate.
2. **Subtract the discount shown on the invoice** for that line. A discount given at or before supply and recorded on the invoice reduces the value on which GST is charged (Section 15(3) of the CGST Act).
3. **Add incidental charges** you bill (packing, freight, loading) where they form part of the value of supply.
4. **Decide the tax type** from the place of supply:
   - Same state as the supplier → **CGST + SGST** (or UTGST in a Union Territory), each at half the rate.
   - Different state, or supply to an SEZ → **IGST** at the full rate.
5. **Compute tax per line or per rate group, total it, then round** the invoice total once.

If you give one lump-sum discount on a mixed-rate invoice, spread it across the lines in proportion to their value first. A flat deduction from the grand total does not tell anyone which rate the discount reduced.

## Worked example (illustrative): three products, one discount

This example follows one invoice from line items to tax. A Rajkot hardware manufacturer (sample GSTIN `24ABCDE1234F1Z5`) sells three items to a dealer, with two GST rates, a percentage discount on one line, a flat discount on another, and freight. We then charge it as an intra-state sale and as an inter-state sale.

| # | Item | Qty | Rate (₹) | Discount | Illustrative GST rate |
|---|---|---|---|---|---|
| 1 | Brass ball valve 1" | 200 | 310.00 | 5% | 18% |
| 2 | CPVC pipe 3 m | 150 | 245.00 | nil | 18% |
| 3 | Plumbing tool kit | 40 | 875.00 | ₹1,500 flat | 5% |

Freight charged on the invoice: ₹2,400. For illustration, it is taxed at the highest rate on the invoice (18%). The correct treatment of freight on a mixed-rate invoice depends on the facts, so check with your adviser.

### Steps 1–2: Taxable value per line

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

The **total tax is the same** in both cases (₹19,324). Only the split changes, because IGST equals CGST + SGST at the same rate and value.

### What the e-way bill picks up

The consignment value here is ₹1,50,874, above the general ₹50,000 threshold, so an e-way bill is needed. Its Part A carries the taxable value of ₹1,31,550 and the tax split: CGST/SGST for Case A, IGST for Case B. These must match the invoice exactly; see [common e-way bill errors](/eway-bill-common-errors) for what goes wrong when they do not.

## Choosing CGST + SGST or IGST

The tax type depends on the place of supply, not on where the truck goes. If the place of supply is in your state, charge CGST + SGST at half the rate each. If it is in another state, or the buyer is an SEZ unit or developer, charge IGST at the full rate.

The trap is a bill-to-ship-to sale. If a Gujarat buyer asks you to deliver to its customer in Maharashtra, the place of supply for goods is generally the Gujarat buyer's principal place of business (Section 10(1)(b) of the IGST Act). A Gujarat seller would then charge CGST + SGST, even though the goods cross the border.

| If… | Then… |
|---|---|
| Your state = place of supply | CGST + SGST |
| Your state ≠ place of supply | IGST |
| Buyer is an SEZ unit or developer | IGST, even within your state |
| Bill-to and ship-to differ | Use the bill-to buyer's location for goods, and check the facts |

The rules are explained in [CGST, SGST and IGST explained](/blog/cgst-sgst-igst-explained).

## Working backwards from a GST-inclusive price

To find the taxable value inside a GST-inclusive price, divide by (100 + rate) and multiply by 100. Retail prices and some B2B quotes include GST, so you must strip the tax out before you can show it on a tax invoice. The formula works for any single rate.

**Taxable value = Inclusive price × 100 ÷ (100 + rate)**

**Example (illustrative):** A dealer quotes ₹11,800 inclusive of 18% GST.
- Taxable value = 11,800 × 100 ÷ 118 = ₹10,000
- GST = ₹1,800 (CGST ₹900 + SGST ₹900 if intra-state)

Calculate the tax as inclusive price minus taxable value, not as a fresh 18% of a rounded figure. That keeps the invoice total equal to the price you quoted. Our [GST inclusive/exclusive calculator](/tools/gst-inclusive-exclusive-calculator) does this in one step.

## Rounding

Rounding means fixing how paise are handled so the invoice, the e-way bill and the return show the same figures. Work tax to two decimals per line or per rate group. Round only the final invoice total to the nearest rupee if that is your practice, and show the round-off amount as a separate line.

- Calculate CGST and SGST separately at the half rate. Halving a rounded 18% figure can leave the two heads one paisa apart.
- Do not round each line to the rupee and then round the total again. The small differences add up and cause mismatches with the e-way bill and GSTR-1.

## Discounts: what reduces the taxable value

A discount reduces the taxable value on an invoice only when it is known at or before supply and shown on that invoice. Discounts agreed later, such as year-end volume schemes, do not change the original invoice. They are adjusted through a credit note, subject to the conditions in Section 15(3)(b).

| Discount type | Reduces taxable value on this invoice? |
|---|---|
| Trade discount shown on the invoice at the time of supply | Yes |
| Cash discount for early payment, known and recorded on the invoice | Generally yes, if on the invoice |
| Year-end volume discount given later | No; handled through a credit note subject to conditions |
| Free item given as a "discount" | Needs separate analysis; not a simple deduction |

## Common mistakes

Most GST calculation errors come from the order of steps, not from the arithmetic. Tax is charged before the discount, on the wrong head, or at one rate for every line. Each error then repeats on the e-way bill and the return, so check these before you save the invoice.

- **Charging GST before the discount** when the discount is on the invoice.
- **Charging the wrong head.** CGST + SGST on an inter-state sale, or IGST on an intra-state sale, is a problem to correct, not a rounding issue.
- **Using one rate for the whole invoice** when items carry different rates.
- **Leaving freight or packing out of the taxable value** when you charge it on the invoice.
- **Splitting 18% as 18% CGST + 18% SGST.** It is 9% + 9%.
- **Rounding at every line.**
- **Using an outdated rate.** Rates have been revised; keep your product master current.

## Quick action checklist

1. Pull up your last mixed-rate invoice and check that the discount came before the tax.
2. Check the place of supply on any bill-to-ship-to sale from the past month.
3. Confirm that freight and packing charged on invoices sit inside the taxable value.
4. Recalculate CGST and SGST separately at half rate and compare with what you billed.
5. Set one rounding rule (total only) and apply it to every invoice.

If your next invoice has several rates, discounts and freight, try the free [multi-item GST calculator](/tools/multi-item-gst-calculator). It shows line-wise tax and a rate-wise summary you can check against your bill.

## Official sources

Value of supply is defined in Section 15 of the CGST Act, place of supply for goods in Section 10 of the IGST Act, and invoice particulars in Rule 46 of the CGST Rules. Current tax rates are notified by the government; check [cbic-gst.gov.in](https://cbic-gst.gov.in/) and [cbic.gov.in](https://www.cbic.gov.in/), and the [GST portal](https://www.gst.gov.in/) for return guidance.
