---
title: "CGST vs. SGST vs. IGST Explained"
slug: "cgst-sgst-igst-explained"
excerpt: "Which GST applies to your sale — CGST plus SGST, or IGST? A plain-English guide to place of supply, UTGST, credit use and costly mix-ups."
category: "gst-compliance"
tags: ["cgst", "sgst", "igst", "utgst", "place of supply"]
publishedAt: "2026-09-02"
updatedAt: "2026-10-09"
verifiedAt: "2026-10-10"
seoTitle: "CGST vs SGST vs IGST: Differences With Examples"
metaDescription: "Understand CGST, SGST, UTGST and IGST: when each applies, how place of supply decides it, how input credit is used, with worked examples and mistakes."
imageAlt: "Map of India showing an intra-state sale with CGST and SGST and an inter-state sale with IGST"
sources:
  - title: "CBIC GST (Acts and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
  - title: "GST tutorials"
    url: "https://tutorial.gst.gov.in/"
faq:
  - q: "Is IGST higher than CGST plus SGST?"
    a: "No. For the same goods and value, IGST equals CGST plus SGST. An 18% rate is either 9% CGST + 9% SGST or 18% IGST."
  - q: "What is UTGST?"
    a: "Union Territory GST replaces SGST for intra-UT supplies in Union Territories without their own legislature. It is charged along with CGST."
  - q: "Can I use CGST credit to pay SGST?"
    a: "No. CGST credit cannot be used to pay SGST/UTGST, and SGST/UTGST credit cannot be used to pay CGST. IGST credit can be used for all three in the prescribed order."
related: ["how-to-calculate-gst-on-sales-invoice", "eway-bill-interstate-movement-requirements", "eway-bill-intrastate-movement-considerations"]
---
India's GST is a dual tax. The Centre and the States both tax the same transaction, but how that tax is labelled on your invoice depends on one thing: whether the supply is **intra-state** or **inter-state**. Getting the label wrong is not a cosmetic issue — tax paid under the wrong head does not automatically count as tax paid under the right one.

## The four components

| Tax | Levied by | Law | Applies to |
|---|---|---|---|
| **CGST** — Central GST | Centre | CGST Act, 2017 | Intra-state supplies (with SGST or UTGST) |
| **SGST** — State GST | State | Each State's SGST Act | Intra-state supplies within a State |
| **UTGST** — Union Territory GST | Centre for UTs | UTGST Act, 2017 | Intra-UT supplies in UTs without legislature |
| **IGST** — Integrated GST | Centre (shared with destination State) | IGST Act, 2017 | Inter-state supplies, imports, supplies to SEZ |

The rate is the same in total. If a product carries 18%:

- **Intra-state:** 9% CGST + 9% SGST (or UTGST)
- **Inter-state:** 18% IGST

The buyer pays the same total either way.

## How to decide: location of supplier vs. place of supply

The test is not where the buyer's head office is, or where the buyer is registered. It is a comparison of two things:

1. **Location of the supplier**, and
2. **Place of supply**, as determined under the IGST Act.

If both are in the same State or UT → intra-state → CGST + SGST/UTGST.
If they are in different States/UTs → inter-state → IGST.

For goods that move, the place of supply is generally **where the movement terminates for delivery to the recipient**. There are special rules — for example, where goods are delivered to a third party on the direction of the buyer ("bill to – ship to"), or where there is no movement — so complex cases need a closer look at Sections 10 and 11 of the IGST Act.

Supplies to a Special Economic Zone (SEZ) unit or developer are treated as inter-state supplies, even if the SEZ is in the same state as the supplier. Exports and imports are also in the IGST space.

## Example (illustrative): same seller, three buyers

A Vadodara electrical goods manufacturer (sample GSTIN `24ABCDE1234F1Z5`) sells switchgear worth ₹2,00,000 (taxable value, illustrative 18% rate) to three buyers.

| Buyer | Place of supply | Type | Tax on invoice |
|---|---|---|---|
| Distributor in Surat (Gujarat) | Gujarat | Intra-state | CGST ₹18,000 + SGST ₹18,000 |
| Contractor in Jaipur (Rajasthan) | Rajasthan | Inter-state | IGST ₹36,000 |
| Unit in an SEZ in Gujarat | SEZ (treated as inter-state) | Inter-state | Zero-rated: IGST ₹36,000 with refund, or no tax under a Letter of Undertaking |

Now a "bill to – ship to" twist: a Mumbai trading company (Maharashtra) orders the switchgear but asks for delivery directly to its customer's site in Surat. Who is the buyer, and where does the movement end? For goods delivered on the direction of a third person, the IGST Act treats that third person (the Mumbai company) as the recipient and its principal place of business as the place of supply. The supply from Vadodara is therefore treated as inter-state, and IGST is charged — even though the truck never leaves Gujarat. This is exactly the kind of case where a quick check of the IGST Act or advice from your consultant is worthwhile.

The e-way bill for such a delivery captures both the "bill to" and "ship to" details; see [inter-state e-way bill requirements](/blog/eway-bill-interstate-movement-requirements).

## How input tax credit is used

When you pay GST on purchases, you collect credit in three ledgers — IGST, CGST and SGST/UTGST. You use them to pay output tax in a specific order (Section 49 of the CGST Act, read with Rule 88A):

| Credit available | Can be used to pay |
|---|---|
| IGST | First IGST; balance against CGST and SGST/UTGST in any order/proportion |
| CGST | CGST, then IGST — **never SGST/UTGST** |
| SGST/UTGST | SGST/UTGST, then IGST — **never CGST** |

IGST credit has to be used fully before CGST or SGST credit is used.

### Example (illustrative): a monthly set-off

For a month, a trader has:

- Output tax: IGST ₹40,000; CGST ₹25,000; SGST ₹25,000
- Credit available: IGST ₹50,000; CGST ₹10,000; SGST ₹15,000

Set-off:
1. IGST credit ₹50,000 → pays IGST ₹40,000; balance ₹10,000 → pays, say, ₹5,000 of CGST and ₹5,000 of SGST.
2. CGST credit ₹10,000 → pays CGST (remaining ₹20,000 → ₹10,000 left to pay).
3. SGST credit ₹15,000 → pays SGST (remaining ₹20,000 → ₹5,000 left to pay).

Cash payable: CGST ₹10,000 and SGST ₹5,000. The trader could also split the leftover IGST credit differently (for example ₹10,000 all against CGST), which changes the cash split. The portal suggests a set-off, but the outcome is worth reviewing.

## What happens if you charge the wrong tax

Suppose you charged CGST + SGST on a sale that was actually inter-state. The law treats the tax paid under the wrong head as not paid under the correct head. The general position is that you pay the correct tax (IGST) and claim a refund of the wrongly paid CGST and SGST under the provisions for wrong tax heads (Section 77 of the CGST Act and Section 19 of the IGST Act). The buyer's credit is also affected. This takes time and paperwork — far more than checking the state code before invoicing.

## Common mistakes

- **Looking at the buyer's GSTIN state alone** instead of the place of supply, especially in bill-to/ship-to deals.
- **Charging CGST + SGST to an SEZ unit in the same state.**
- **Splitting the rate wrongly** — e.g. 18% CGST + 18% SGST.
- **Using SGST instead of UTGST** for intra-UT supplies in UTs without legislature (or the other way round in Delhi, Puducherry and Jammu & Kashmir, which have their own legislatures and use SGST).
- **Mismatching the e-way bill.** The e-way bill's tax split must match the invoice; an IGST invoice with a CGST/SGST e-way bill invites questions.
- **Assuming credit is interchangeable** between CGST and SGST.

## Practical tip

The first two digits of a GSTIN are the state code. Comparing your state code with the buyer's, and with the delivery state, is a fast first check — though not a substitute for place-of-supply rules in special cases. Learn more in [GSTIN verification: what to check](/blog/gstin-verification-what-to-check).

In the E-Way Easy app, entering the buyer's GSTIN fills their address, state and PIN automatically, which reduces the chance of picking the wrong state. Review the tax type on the invoice preview before saving, especially for bill-to/ship-to orders.

## Official sources

The levy is in the CGST Act, the State GST Acts, the UTGST Act and the IGST Act, 2017; place of supply is in Chapter V of the IGST Act; credit utilisation is in Section 49 of the CGST Act and Rule 88A. Read the current text on [cbic-gst.gov.in](https://cbic-gst.gov.in/) and the tutorials at [tutorial.gst.gov.in](https://tutorial.gst.gov.in/).
