---
title: "E-Way Bill Limit and the ₹50,000 Threshold: Rules and Exceptions"
slug: "eway-bill-limit-50000-threshold-exceptions"
excerpt: "How the ₹50,000 e-way bill limit is calculated, what counts in consignment value, state thresholds, cases needing an e-way bill regardless of value, and exemptions."
category: "eway-bill"
tags: ["e-way bill", "threshold", "consignment value", "exemptions"]
publishedAt: "2026-10-16"
updatedAt: "2026-11-16"
verifiedAt: "2026-10-16"
seoTitle: "E-Way Bill Limit ₹50,000: GST Included? Exceptions"
metaDescription: "Yes, the ₹50,000 test uses value including GST. How to calculate consignment value, state limits for intra-state moves and cases needing a bill at any value."
imageAlt: "Calculator showing taxable value plus GST equals consignment value, with a ₹50,000 line marked on a scale"
sources:
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Is the ₹50,000 limit on taxable value or invoice value?"
    a: "On consignment value. That is the value in the invoice, bill of supply or challan including GST, but excluding the value of exempt supplies on the same invoice."
  - q: "Is the limit per invoice or per vehicle?"
    a: "The test is generally applied per consignment, based on its document. Where several invoices move in one vehicle, each is assessed on its own. Splitting one real supply into several invoices to stay under the limit is a different matter and invites scrutiny."
  - q: "Can I generate an e-way bill even if value is below ₹50,000?"
    a: "Yes. The rules allow voluntary generation below the threshold. Some businesses do so for loads close to the limit, to avoid arguments in transit."
  - q: "Does a consignment of exactly ₹50,000 need an e-way bill?"
    a: "Not under the general rule. The requirement applies where consignment value exceeds ₹50,000, so exactly ₹50,000 does not cross it. A state limit or a value-independent case can still apply."
related: ["what-is-an-eway-bill", "eway-bill-intrastate-movement-considerations", "eway-bill-rules-for-job-work"]
---
> **Quick answer:** An e-way bill is generally required when consignment value exceeds ₹50,000. That value includes GST and cess but excludes exempt supplies on the same invoice. Some states have notified different intra-state limits, and some movements need one at any value, such as inter-state goods sent to a job worker.

"Above ₹50,000, you need an e-way bill" is the rule everyone remembers. What gets missed is the detail: which value you compare, whether GST counts, and what exempt items do. Then there are the cases where value does not matter at all.

## The rule in one line

The e-way bill limit is the value above which goods in movement generally need an e-way bill: under Rule 138 of the CGST Rules, 2017, a consignment value exceeding ₹50,000. "Exceeds" matters: exactly ₹50,000 does not cross the general threshold. State limits and value-independent cases sit on top of this rule.

Use this order of checks for any load:

1. Is it a case needing an e-way bill at any value? If yes, generate one.
2. Is it covered by the Annexure exemptions? If yes, read the condition, then decide.
3. Is it intra-state? If yes, check your state's limit.
4. Otherwise, compare consignment value with ₹50,000.

## What counts in consignment value

Consignment value is the value of goods under Section 15 of the CGST Act, as declared in the invoice, bill of supply or delivery challan. It includes the taxable value, GST and any cess, but excludes the value of exempt supplies on the same invoice. In short, you test the invoice total with tax, minus exempt lines.

| Included | Excluded |
|---|---|
| Taxable value of goods | Value of exempt supplies in the same invoice |
| CGST + SGST, or IGST | |
| Cess, where applicable | |

Two value points are easy to miss. Charges you bill on the invoice, such as packing, generally form part of the value under Section 15. A discount shown on the invoice itself generally reduces it.

There is also a spreadsheet trap. Many sales registers export a "taxable value" column first, and people run the threshold check on that column. Run it on the total-with-tax column instead.

## Worked calculations

These three worked calculations cover the cases people get wrong most often. In the first, GST pushes a ₹48,000 invoice over the line; in the second, an exempt line pulls the total back under it. In the third, the value lands exactly on ₹50,000, which does not exceed the limit under the general rule.

### Example (illustrative) 1: tax pushes the value over the line

A Ludhiana hosiery unit invoices knitwear:

- Taxable value: ₹48,000
- GST @ 5%: ₹2,400
- **Consignment value: ₹50,400**, which exceeds ₹50,000, so an e-way bill is required.

On taxable value alone (₹48,000), it looks like none is needed. That is the most common error.

### Example (illustrative) 2: exempt items on the same invoice

A Nashik agri-trader's invoice has two lines:

| Line | Value | GST | Total |
|---|---|---|---|
| Fertiliser sprayer (taxable) | ₹38,000 | ₹6,840 (18%) | ₹44,840 |
| Fresh vegetables (exempt) | ₹12,000 | — | ₹12,000 |
| **Invoice total** | | | **₹56,840** |

Consignment value = ₹56,840 − ₹12,000 (exempt) = **₹44,840**. That does not exceed ₹50,000 under the general rule.

### Example (illustrative) 3: exactly at the threshold

Taxable value ₹42,372.88 + 18% GST ₹7,627.12 = ₹50,000.00. This does not exceed ₹50,000, so no e-way bill is required under the general rule. If your loads hover at this line, generating voluntarily avoids arguments at a checkpoint.

(Rates in these examples are illustrative; confirm the correct GST rate for your goods.) If you price tax-inclusive, the [GST inclusive/exclusive calculator](/tools/gst-inclusive-exclusive-calculator) splits the total for you.

## State thresholds for intra-state movement

For movement within a state, some states have notified a different, higher threshold than ₹50,000, and some have set it for particular goods or areas. These limits apply only to movement inside that state. For inter-state movement, the general ₹50,000 rule always applies, whatever your home state allows.

Because these notifications vary and change, this site does not list state numbers. Check your state's commercial tax department notification or the [E-Way Bill System](https://ewaybillgst.gov.in/) for the current limit. The state layer is explained in [intra-state movement considerations](/blog/eway-bill-intrastate-movement-considerations).

The trap is a two-state business. A firm with units in two states may run each on its own local limit, then apply the higher one to a cross-border load by habit.

## When value doesn't matter: e-way bill required anyway

Two movements need an e-way bill irrespective of consignment value. The first is inter-state movement of goods by a principal to a job worker, generated by the principal or a registered job worker. The second is inter-state transport of specified handicraft goods by a person exempt from registration, so both are inter-state cases.

1. **Inter-state movement by a principal to a job worker.** A ₹10,000 lot still needs one. See [e-way bill rules for job work](/blog/eway-bill-rules-for-job-work).
2. **Inter-state transport of specified handicraft goods** by a person exempt from registration.

Neither rule covers intra-state job work or the return leg from the job worker. Those follow the normal threshold, so do not over-apply the "any value" rule either.

## When no e-way bill is required

The Annexure to Rule 138(14) lists goods and situations where no e-way bill is needed. Common examples include goods moved by non-motorised conveyance, goods moved from a port, airport, air cargo complex or land customs station to an ICD or CFS for customs clearance, and certain listed goods. The conditions are specific.

Some commonly referenced cases:

- goods transported by **non-motorised conveyance**;
- goods moved from a **port, airport, air cargo complex or land customs station to an ICD or CFS** for customs clearance;
- certain goods listed in the Annexure, and goods specified as exempt in the relevant notifications;
- goods under customs supervision or customs seal in specified situations.

This list is not complete. An exemption may depend on the goods and the type of movement together, so read the Annexure on [CBIC GST](https://cbic-gst.gov.in/) for your case.

> Note: "No GST on these goods" does not automatically mean "no e-way bill". Check whether your exempt goods are actually listed for e-way bill exemption.

## Per invoice or per vehicle?

The threshold is generally tested per consignment, based on its own invoice or challan, so several invoices in one truck are each assessed separately. That is different from splitting one real supply into several small invoices to dodge the limit, which officers look through. Issue invoices according to the actual supply.

| If the truck carries… | Then… |
|---|---|
| Several invoices to different buyers, each under the limit | Generally no e-way bill for those; carry every invoice |
| Several invoices, some above the limit | E-way bill for each one above; the transporter can make a [consolidated e-way bill](/consolidated-eway-bill) |
| One buyer's order split into several invoices on the same day | Expect questions, possible detention and penalty proceedings |

Carry the invoices for every consignment in the vehicle, including those without an e-way bill. An officer can then check each value on the spot.

## Common mistakes

Most threshold errors come from testing the wrong number. People compare taxable value instead of consignment value, forget that exempt lines come out, or treat tax-exempt goods as e-way bill exempt. Others ignore state notifications, skip small inter-state job work lots, or split invoices on purpose.

- **Comparing taxable value instead of consignment value.**
- **Including exempt items** and generating unnecessarily. This is harmless, but understand why.
- **Ignoring state notifications** for intra-state limits.
- **Skipping e-way bills for inter-state job work** because the value is small.
- **Assuming tax-exempt goods are e-way bill exempt.**
- **Deliberate invoice splitting.**

## Quick action checklist

1. Make sure your threshold check uses the total-with-tax figure, minus exempt lines.
2. Write your state's current intra-state limit and its notification reference in your dispatch SOP.
3. Flag every inter-state job work challan for an e-way bill, whatever the value.
4. Decide a house rule for loads close to ₹50,000, such as always generating voluntarily.
5. Tell drivers to carry invoices for every consignment in the vehicle, with or without an e-way bill.

Have a load you are not sure about? Enter its value and route in the free [e-way bill eligibility checker](/tools/eway-bill-eligibility-checker) for a quick first answer and the exceptions to review.

## Official sources

Consignment value and the threshold are defined in Rule 138 of the CGST Rules; exemptions are in the Annexure to Rule 138(14). Read the current text on [CBIC GST](https://cbic-gst.gov.in/) and check state-specific limits and advisories on the [E-Way Bill System](https://ewaybillgst.gov.in/) and the [GST portal](https://www.gst.gov.in/).
