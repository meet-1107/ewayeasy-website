---
title: "CGST vs. SGST vs. IGST Explained"
slug: "cgst-sgst-igst-explained"
excerpt: "Which GST applies to your sale — CGST plus SGST, or IGST? A plain-English guide to place of supply, UTGST, credit use and costly mix-ups."
category: "gst-compliance"
tags: ["cgst", "sgst", "igst", "utgst", "place of supply"]
publishedAt: "2026-10-16"
updatedAt: "2026-11-16"
verifiedAt: "2026-10-16"
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
    a: "No. For the same goods and value, IGST equals CGST plus SGST. An 18% rate is either 9% CGST + 9% SGST or 18% IGST, so the buyer pays the same total."
  - q: "What is UTGST?"
    a: "Union Territory GST replaces SGST for supplies within a Union Territory that has no legislature of its own. It is charged along with CGST, in the same split as SGST would be."
  - q: "Can I use CGST credit to pay SGST?"
    a: "No. CGST credit cannot pay SGST or UTGST, and SGST or UTGST credit cannot pay CGST. IGST credit can pay all three, and it must be used up first."
  - q: "My buyer has a GSTIN from another state but takes delivery in my state. Which tax applies?"
    a: "It depends on the place of supply, not only the buyer's GSTIN or the delivery address. In a bill-to-ship-to deal on a third party's direction, the place of supply can be the third party's state. Check Section 10 of the IGST Act or ask your consultant for such orders."
related: ["how-to-calculate-gst-on-sales-invoice", "eway-bill-interstate-movement-requirements", "gstin-verification-what-to-check"]
---
> **Quick answer:** Charge CGST plus SGST (or UTGST) on an intra-state supply and IGST on an inter-state supply. The total is the same either way: 18% is 9% CGST + 9% SGST, or 18% IGST. The place of supply, compared with your location, decides which applies.

India's GST is a dual tax: the Centre and the States both tax the same sale. What changes is the label on your invoice, and that depends on whether the supply is intra-state or inter-state. A wrong label is not cosmetic, because tax paid under the wrong head does not count as tax paid under the right one.

## What CGST, SGST, UTGST and IGST mean

CGST is the Centre's share and SGST is the State's share of GST on a supply within one State. UTGST replaces SGST inside Union Territories without a legislature. IGST is a single tax the Centre collects on inter-state supplies, imports and SEZ supplies, and shares with the destination State, and the total rate stays the same.

| Tax | Levied by | Law | Applies to |
|---|---|---|---|
| **CGST**, Central GST | Centre | CGST Act, 2017 | Intra-state supplies (with SGST or UTGST) |
| **SGST**, State GST | State | Each State's SGST Act | Intra-state supplies within a State |
| **UTGST**, Union Territory GST | Centre for UTs | UTGST Act, 2017 | Intra-UT supplies in UTs without legislature |
| **IGST**, Integrated GST | Centre (shared with destination State) | IGST Act, 2017 | Inter-state supplies, imports, supplies to SEZ |

If a product carries 18%:

- **Intra-state:** 9% CGST + 9% SGST (or UTGST)
- **Inter-state:** 18% IGST

The UTGST trap catches businesses near UT borders. Delhi, Puducherry and Jammu & Kashmir have their own legislatures, so they use SGST, not UTGST. Check which group a UT falls in before you set up your invoice template.

## How to decide: your location vs the place of supply

You decide the tax type by comparing two things: the location of the supplier and the place of supply under the IGST Act. If both are in the same State or UT, charge CGST + SGST or UTGST; if they differ, charge IGST. The buyer's head office or GSTIN state is not the test.

For goods that move, the place of supply is generally where the movement ends for delivery to the recipient. Special rules apply in some cases, so complex deals need a look at Sections 10 and 11 of the IGST Act.

Quick decision rules:

| If… | Then… |
|---|---|
| You and the delivery point are in the same State, normal sale | CGST + SGST |
| The delivery point is in another State | IGST |
| The buyer is an SEZ unit or developer, even in your own State | IGST (zero-rated supply) |
| Goods are delivered to a third party on the buyer's direction | Check Section 10(1)(b): place of supply can be the buyer's State |
| Export or import | IGST space |

The common slip is reading the tax type off the buyer's GSTIN alone. A buyer registered in Maharashtra can take delivery in Gujarat, and the answer depends on who directed the delivery and to whom. Many billing tools pick the tax type from the GSTIN state alone, so check it by hand for these orders.

## Example (illustrative): same seller, three buyers

This worked example shows one seller charging three different ways on the same goods. A Gujarat buyer gets CGST + SGST, a Rajasthan buyer gets IGST, and an SEZ unit in Gujarat gets zero-rated IGST treatment. A fourth, bill-to-ship-to order shows why the truck's route alone does not settle the tax type.

A Vadodara electrical goods manufacturer (sample GSTIN `24ABCDE1234F1Z5`) sells switchgear worth ₹2,00,000 (taxable value, illustrative 18% rate) to three buyers.

| Buyer | Place of supply | Type | Tax on invoice |
|---|---|---|---|
| Distributor in Surat (Gujarat) | Gujarat | Intra-state | CGST ₹18,000 + SGST ₹18,000 |
| Contractor in Jaipur (Rajasthan) | Rajasthan | Inter-state | IGST ₹36,000 |
| Unit in an SEZ in Gujarat | SEZ (treated as inter-state) | Inter-state | Zero-rated: IGST ₹36,000 with refund, or no tax under a Letter of Undertaking |

Now the bill-to-ship-to twist. A Mumbai trading company orders the switchgear but asks for delivery straight to its customer's site in Surat. For goods delivered on a third person's direction, the IGST Act treats the Mumbai company as the recipient and its principal place of business as the place of supply.

So the supply from Vadodara is inter-state and IGST applies, even though the truck never leaves Gujarat. Cases like this deserve a quick check of the IGST Act or a word with your consultant. The e-way bill captures both the bill-to and ship-to details; see [inter-state e-way bill requirements](/blog/eway-bill-interstate-movement-requirements).

## How input tax credit is used

Input tax credit sits in three ledgers (IGST, CGST and SGST/UTGST), and Section 49 of the CGST Act with Rule 88A sets the order of use. IGST credit is used first and can pay any head. CGST credit pays CGST and then IGST but never SGST, while SGST credit pays SGST and then IGST but never CGST.

| Credit available | Can be used to pay |
|---|---|
| IGST | First IGST; balance against CGST and SGST/UTGST in any order or proportion |
| CGST | CGST, then IGST. **Never SGST/UTGST** |
| SGST/UTGST | SGST/UTGST, then IGST. **Never CGST** |

### Example (illustrative): a monthly set-off

For a month, a trader has:

- Output tax: IGST ₹40,000; CGST ₹25,000; SGST ₹25,000
- Credit available: IGST ₹50,000; CGST ₹10,000; SGST ₹15,000

Set-off:
1. IGST credit ₹50,000 pays IGST ₹40,000. The ₹10,000 balance pays, say, ₹5,000 of CGST and ₹5,000 of SGST.
2. CGST credit ₹10,000 pays CGST. Of the remaining ₹20,000, ₹10,000 is left to pay.
3. SGST credit ₹15,000 pays SGST. Of the remaining ₹20,000, ₹5,000 is left to pay.

Cash payable: CGST ₹10,000 and SGST ₹5,000. Splitting the leftover IGST credit differently changes the cash split. For example, putting all ₹10,000 against CGST leaves no CGST cash and ₹10,000 SGST cash.

The portal suggests a set-off, but you can change it. Review it before you file, because an unhelpful split can leave you paying cash under one head while credit sits idle under another.

## What happens if you charge the wrong tax

If you charge CGST + SGST on a supply that was really inter-state, or the reverse, tax paid under the wrong head is not treated as paid under the right one. Generally, you pay the correct tax and claim a refund of the wrong tax under Section 77 of the CGST Act and Section 19 of the IGST Act.

That means two steps, not one. You pay the correct tax first, then wait for the refund of the wrong one, so cash gets tied up. The buyer's credit is also affected, because their records show the wrong head.

The same error usually flows into the e-way bill. An IGST invoice with a CGST/SGST e-way bill, or the reverse, invites questions at a checkpoint. Checking the state code before invoicing takes seconds; fixing it later takes paperwork.

## Common mistakes

Most tax-head mistakes come from shortcuts: reading the buyer's GSTIN state instead of the place of supply, treating an SEZ buyer like a local one, or splitting the rate wrongly. Credit mistakes follow from assuming CGST and SGST credit are interchangeable. Each one is easy to prevent with a short check.

- **Looking at the buyer's GSTIN state alone** instead of the place of supply, especially in bill-to-ship-to deals.
- **Charging CGST + SGST to an SEZ unit in the same state.**
- **Splitting the rate wrongly**, such as 18% CGST + 18% SGST instead of 9% + 9%.
- **Using SGST instead of UTGST** for intra-UT supplies in UTs without legislature, or the reverse in Delhi, Puducherry and Jammu & Kashmir.
- **Mismatching the e-way bill.** The tax split must match the invoice.
- **Assuming credit is interchangeable** between CGST and SGST.

The first two digits of a GSTIN are the state code. Comparing your code with the buyer's and the delivery state is a fast first check, though not a substitute for place-of-supply rules. Learn more in [GSTIN verification: what to check](/blog/gstin-verification-what-to-check), and see [how to calculate GST on a sales invoice](/blog/how-to-calculate-gst-on-sales-invoice) for the arithmetic.

## Quick action checklist

1. Write down which group your State or UT is in: SGST or UTGST.
2. Flag bill-to-ship-to and SEZ orders in your order book, so the tax type gets a manual check.
3. For flagged orders, check the tax type on the invoice preview instead of trusting the auto-pick.
4. Before filing, review the portal's suggested credit set-off instead of accepting it as is.
5. Check that every e-way bill shows the same tax split as its invoice.

Not sure which state a GSTIN belongs to? The free [GST state code list](/tools/gst-state-code-list) decodes the first two digits and shows whether a supply is intra-state or inter-state.

## Official sources

The levy is in the CGST Act, the State GST Acts, the UTGST Act and the IGST Act, 2017. Place of supply is in Chapter V of the IGST Act, and credit use is in Section 49 of the CGST Act and Rule 88A. Read the current text on [cbic-gst.gov.in](https://cbic-gst.gov.in/) and the tutorials at [tutorial.gst.gov.in](https://tutorial.gst.gov.in/).
