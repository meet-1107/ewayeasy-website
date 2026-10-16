---
title: "E-Way Bill Requirements for Interstate Movement"
slug: "eway-bill-interstate-movement-requirements"
excerpt: "What changes when goods cross a state border: the ₹50,000 threshold, cases needing an e-way bill at any value, IGST, distance, validity and documents to carry."
category: "eway-bill"
tags: ["e-way bill", "interstate", "IGST", "transport"]
publishedAt: "2026-05-14"
updatedAt: "2026-09-26"
verifiedAt: "2026-10-10"
seoTitle: "E-Way Bill for Interstate Movement: Requirements (2026)"
metaDescription: "Interstate e-way bill rules: threshold, value-independent cases, IGST on the invoice, distance and validity, and what the driver must carry."
imageAlt: "Truck crossing a state border checkpoint with an e-way bill and tax invoice shown as overlay cards"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
  - title: "CBIC GST"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Do state-specific higher thresholds apply to interstate movement?"
    a: "No. Higher thresholds notified by some states apply only to movement within that state. For interstate movement, the general threshold under Rule 138 applies."
  - q: "Can an unregistered buyer in another state receive goods under an e-way bill?"
    a: "Yes. The supplier generates the e-way bill and enters URP (unregistered person) in place of the recipient GSTIN, with the correct state and delivery PIN."
  - q: "Does the e-way bill need to be regenerated at the state border?"
    a: "No. One valid e-way bill covers the whole journey. Only Part B needs updating if the vehicle changes."
related: ["eway-bill-intrastate-movement-considerations", "cgst-sgst-igst-explained", "eway-bill-validity-explained"]
---
When goods leave your state, the e-way bill becomes non-negotiable in more situations, and the margin for error shrinks. The truck may pass through several states, officers in any of them can verify the consignment, and state-specific relaxations no longer help you. This article sets out what an interstate consignment needs, in the order you would actually prepare it.

## Quick answers

**When is an e-way bill required for interstate movement?**
Generally, when the consignment value exceeds ₹50,000. Consignment value is the invoice value including GST, excluding the value of exempt goods in the same document.

**When is it required regardless of value?**
Rule 138 requires an e-way bill irrespective of consignment value in two interstate cases:

1. Goods sent by a principal in one state to a job worker in another state.
2. Interstate transport of specified handicraft goods by a person who is exempt from registration.

**Which tax applies?**
Interstate supplies attract IGST, not CGST + SGST. Your invoice — and therefore Part A of the e-way bill — must show IGST.

**Do state-level relaxations help?**
No. Higher thresholds or local exemptions some states have notified apply only to movement within that state.

## Step-by-step: preparing an interstate consignment

### 1. Confirm the place of supply

Check the buyer's GSTIN state code (the first two digits) and the actual delivery address. If the supplier's location and the place of supply are in different states, it is an interstate supply. If the goods are billed to a buyer in one state but shipped to another location, work out the place of supply carefully; see [CGST, SGST and IGST explained](/blog/cgst-sgst-igst-explained).

### 2. Prepare the invoice with IGST

Make sure the invoice shows:

- Your GSTIN and the buyer's GSTIN (or URP for an unregistered buyer)
- Place of supply (state name and code)
- HSN code and IGST rate for each line
- Taxable value and IGST amount

### 3. Fill Part A

Part A of Form GST EWB-01 takes the supplier and recipient GSTIN, the PIN code of the place of delivery, document number and date, value of goods, HSN code, reason for transportation and the transport document number if available. Most of this is copied from the invoice, so a clean invoice means a clean Part A. More detail is in [Part A and Part B explained](/blog/eway-bill-part-a-and-part-b-explained).

### 4. Check the distance

The portal auto-calculates the distance between the dispatch PIN and the delivery PIN. You can enter the actual distance up to 10% more than the auto-calculated figure, up to a maximum of 4,000 km. Interstate routes are longer, so this directly affects validity.

### 5. Fill Part B

Enter the vehicle number (for road) or the transport document number for rail, air or ship. The e-way bill is valid for movement only after Part B is filled. The short-distance Part B exemption (up to 50 km to or from a transporter's place) applies only within the same state, so it rarely helps in interstate cases except for the first leg to a transporter's godown in your own state.

### 6. Hand over the documents

The driver should carry the invoice (or bill of supply / delivery challan as applicable) and the e-way bill — a printout, the e-way bill number, or an RFID mapping where available.

## Validity on long routes

Validity is one day for every 200 km or part of 200 km for normal cargo, and one day for every 20 km for over-dimensional cargo. The first day ends at midnight of the day following generation.

| Distance | Normal cargo validity |
|---|---|
| Up to 200 km | 1 day |
| 201–400 km | 2 days |
| 401–600 km | 3 days |
| 1,000 km | 5 days |
| 1,850 km | 10 days |

If goods cannot reach in time due to exceptional circumstances — an accident, a natural calamity, a law-and-order problem, trans-shipment delay — the generator or transporter can extend validity within 8 hours before or after expiry. As reported by GSTN, from 1 January 2025 total extension is capped at 360 days from the original generation date. See [what to do when an e-way bill expires](/blog/what-to-do-when-eway-bill-expires).

## Example (illustrative)

A Ludhiana hosiery manufacturer (GSTIN `03ABCDE1234F1Z5`) sells knitwear worth ₹2,40,000 plus 5% IGST to a wholesaler in Kolkata (GSTIN `19ABCDE1234F1Z5`). The goods first go by tempo to a transporter's godown in Ludhiana, 12 km away, and then by truck to Kolkata.

- **Invoice:** taxable value ₹2,40,000, IGST ₹12,000, total ₹2,52,000; place of supply West Bengal (19).
- **Part A:** both GSTINs, Kolkata delivery PIN, invoice number and date, ₹2,52,000, HSN for the knitwear, reason "Supply".
- **First leg:** the tempo trip to the transporter's godown is within Punjab and under 50 km, so the supplier can generate the e-way bill with Part A only for this leg.
- **Main leg:** the transporter fills Part B with the truck number before it leaves for Kolkata.
- **Distance:** the portal calculates roughly 1,700 km (illustrative); validity is 9 days.

Halfway, the truck is replaced after a breakdown. The transporter updates Part B with the new vehicle number before the goods move on. No new e-way bill is needed.

## Common mistakes in interstate e-way bills

- **CGST + SGST on an interstate invoice.** The e-way bill will carry the wrong tax heads and the invoice itself is incorrect.
- **Wrong state code for the recipient.** This usually comes from typing a GSTIN by hand. Verify GSTINs before use; see [GSTIN verification](/blog/gstin-verification-what-to-check).
- **Assuming your home state's higher limit applies.** It does not for interstate movement.
- **Forgetting job work.** Sending goods to a job worker in another state needs an e-way bill even for low-value lots. See [e-way bill rules for job work](/blog/eway-bill-rules-for-job-work).
- **Underestimating distance.** Too short a distance gives too little validity on a long route.
- **Generating with an old invoice.** As reported by GSTN, from 1 January 2025 an e-way bill cannot be generated for a document dated more than 180 days before generation.

## Exceptions and limits

The Annexure to Rule 138(14) lists goods and situations where an e-way bill is not required — for example, goods moved by non-motorised conveyance and certain specified goods. Some exemptions are narrow and conditional. Do not rely on them without reading the current rule text.

Also note that moving goods without a valid e-way bill can lead to detention and penalty under Section 129 of the CGST Act. For interstate loads the stakes are higher because the goods may be stopped far from your office.

## Practical tools

Use the [e-way bill eligibility checker](/tools/eway-bill-eligibility-checker) to confirm whether a consignment needs an e-way bill, and the [distance calculator](/tools/distance-calculator) to estimate validity before dispatch. The E-Way Easy app also calculates distance from PIN codes and fills buyer state from the GSTIN, which helps avoid the most common state-code errors.

## Official sources

Confirm current rules on the [E-Way Bill System](https://ewaybillgst.gov.in/) (or the [E-Way Bill 2.0 portal](https://ewaybill2.gst.gov.in/)), the [GST portal](https://www.gst.gov.in/) and [CBIC GST](https://cbic-gst.gov.in/). Rules and portal features change, so check before relying on any figure here.
