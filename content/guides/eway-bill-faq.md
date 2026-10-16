---
title: "E-Way Bill FAQ: 30 Common Questions Answered"
slug: "eway-bill-faq"
description: "Short, practical answers to 30 common e-way bill questions on applicability, generation, Part A and Part B, distance, validity, cancellation, corrections, penalties and recent changes."
updatedAt: "2026-10-13"
verifiedAt: "2026-10-13"
seoTitle: "E-Way Bill FAQ: 30 Common Questions Answered"
metaDescription: "30 e-way bill questions answered briefly: threshold, who generates, Part A/B, 50 km rule, validity, extension, cancellation, corrections, penalties, 2025 changes."
imageAlt: "Grid of question mark cards each labelled with an e-way bill topic"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Act and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST tutorials"
    url: "https://tutorial.gst.gov.in/"
faq:
  - q: "What is the e-way bill limit in India?"
    a: "Generally Rs 50,000 of consignment value, including GST but excluding exempt supplies on the same invoice. Some states have a different limit for intra-state movement; check your state's notification."
  - q: "Who has to generate the e-way bill?"
    a: "The registered supplier or recipient. If neither has done so and the value exceeds the threshold, the transporter must generate it before movement."
  - q: "Is Part B compulsory?"
    a: "Yes for movement, except when goods move within the same state up to 50 km between the consignor and transporter, or transporter and consignee. Part A is always needed."
  - q: "How is validity calculated?"
    a: "1 day per 200 km or part for normal cargo, 1 day per 20 km or part for over-dimensional cargo. The first day ends at midnight of the next day."
  - q: "Can I cancel an e-way bill?"
    a: "Yes, within 24 hours of generation, if it has not been verified in transit."
  - q: "Can I edit an e-way bill?"
    a: "No. Part B (vehicle) and transporter can be updated, but Part A errors need cancellation within 24 hours and a fresh e-way bill."
  - q: "Can I generate an e-way bill for an old invoice?"
    a: "As reported by GSTN, from 1 January 2025 the base document cannot be more than 180 days old on the date of generation."
  - q: "Is an e-way bill needed for services?"
    a: "No. It applies to movement of goods only."
related: ["eway-bill-guide", "eway-bill-rules", "eway-bill-validity", "eway-bill-common-errors"]
updateHistory:
  - date: "2026-10-13"
    note: "Rechecked all answers, added questions on MFA and the E-Way Bill 2.0 portal."
  - date: "2026-09-20"
    note: "First published."
---
Thirty questions that come up again and again at dispatch desks, with short answers and links to the detailed guides. Answers reflect the generally accepted position; always check the latest notifications on the [official e-way bill portal](https://ewaybillgst.gov.in/).

## Basics and applicability

### 1. What is an e-way bill?

An electronic document generated on the official e-way bill system in Form GST EWB-01 before goods are moved. It records the supplier, recipient, goods, value, route and vehicle. See the [E-Way Bill Guide](/eway-bill-guide).

### 2. Which law requires it?

Section 68 of the CGST Act and Rule 138 of the CGST Rules, 2017, read with Rules 138A to 138E. See [Rule 138 Explained](/eway-bill-rules).

### 3. What is the threshold?

Generally, consignment value above ₹50,000. Consignment value includes GST and cess but excludes the value of exempt supplies on the same invoice.

### 4. Do states have different limits?

Some states have notified a different limit for intra-state movement. Inter-state movement follows the general limit. Check your state's notification before relying on any figure.

### 5. Is it needed when goods are not sold?

Often yes. Stock transfer, job work, supply on approval, exhibition goods and sales returns can all need an e-way bill, usually against a delivery challan.

### 6. When is it required even below ₹50,000?

For inter-state movement of goods from a principal to a job worker, and inter-state transport of specified handicraft goods by a person exempt from registration.

### 7. When is it not required?

For goods and situations in the Annexure to Rule 138(14) — for example, non-motorised conveyance, certain exempt goods, and goods moving from a port, airport, air cargo complex or land customs station to an ICD or CFS for customs clearance. Read the current list before relying on it.

### 8. Is it needed for services?

No. Only goods.

## Who generates and how

### 9. Who must generate it?

The registered supplier or recipient. If neither does and the value is above the threshold, the transporter must generate it before movement.

### 10. Can an unregistered transporter use the system?

Yes. They enrol on the portal and receive a Transporter ID (TRANSIN).

### 11. What are the ways to generate it?

The web portal, SMS, the official mobile app, bulk upload of a JSON file made with the official Bulk Generation Tool, authorised API/GSP integration, and generation using the IRN for e-invoice taxpayers. See [How to Generate](/eway-bill-generation) and [Bulk Generation](/bulk-eway-bill-generation).

### 12. What documents do I need?

A tax invoice, bill of supply, delivery challan or bill of entry, plus transporter and vehicle details or the transport document for rail, air or ship. Full list: [Documents and Data Required](/documents-required-for-eway-bill).

### 13. What goes into Part A and Part B?

Part A: GSTINs, delivery PIN, document number and date, value, HSN, reason for transport, transport document number. Part B: vehicle number or transport document details.

### 14. Is Part B always needed?

For the e-way bill to be valid for movement, yes — except when goods move within the same state up to 50 km from the consignor to the transporter, or from the transporter to the consignee. Part A is still required.

### 15. Is login now protected by OTP?

Yes. As reported by GSTN, multi-factor authentication was phased in from 1 January 2025 for larger taxpayers and extended to all taxpayers from 1 April 2025.

### 16. What is the E-Way Bill 2.0 portal?

An additional official portal at ewaybill2.gst.gov.in, launched by GSTN/NIC in 2024, with data synchronised with the main portal for continuity.

## Distance and validity

### 17. How is distance decided?

The portal calculates PIN-to-PIN distance. You can enter up to 10% more if the actual route is longer. Maximum 4,000 km; up to 100 km for the same PIN code. See [Distance Rules](/eway-bill-distance-rules).

### 18. How long is an e-way bill valid?

1 day for every 200 km or part (normal cargo); 1 day for every 20 km or part (over-dimensional cargo). See [Validity](/eway-bill-validity).

### 19. When does a day end?

At midnight. The first day ends at midnight of the day after generation (or after Part B is first entered).

### 20. Can validity be extended?

Yes, within 8 hours before or after expiry, when goods cannot reach on time due to exceptional circumstances. As reported by GSTN, from 1 January 2025 total extension is capped at 360 days from original generation.

### 21. What if it has expired?

If the 8-hour window has passed, it cannot be extended. A fresh e-way bill is needed before the goods move further.

## Changes, cancellation and acceptance

### 22. Can I edit an e-way bill?

No. You can update Part B, change the transporter and extend validity. Part A errors need cancellation and a new e-way bill. See [Correction](/eway-bill-correction).

### 23. How many times can I change the vehicle?

Any number of times while the e-way bill is valid, through a Part B update.

### 24. When can I cancel?

Within 24 hours of generation, if not verified in transit. See [Cancellation](/eway-bill-cancellation).

### 25. Can the buyer reject an e-way bill?

Yes, within 72 hours of the details being made available or before delivery, whichever is earlier. If they do nothing, it is deemed accepted.

### 26. What is a consolidated e-way bill?

Form GST EWB-02, generated by the transporter to cover several consignments, each with its own e-way bill, travelling in one vehicle.

## Compliance and penalties

### 27. What must the driver carry?

The invoice, bill of supply or delivery challan, and the e-way bill — as a printout, the EWB number, or mapped to an RFID device on the vehicle.

### 28. What is the penalty for moving goods without a valid e-way bill?

Goods and the vehicle can be detained or seized and a penalty imposed under Section 129 of the CGST Act. The amount can be substantial. Section 122 general penalties can also apply.

### 29. Can I be blocked from generating e-way bills?

Yes. Under Rule 138E, generation can be blocked for taxpayers who have not filed returns for the prescribed period. Filing the pending returns is the usual way to get access back, after the system updates. Keep your return filing on time if you dispatch goods regularly, because a block stops every outward consignment, not just one.

## Using E-Way Easy

### 30. How does the E-Way Easy app help?

E-Way Easy is an independent Android app, not a government portal. It follows a three-step workflow — Invoice → Review EWB → Generated — with saved buyers and products, buyer address auto-fill from GSTIN, HSN from your product list, and distance from PIN codes (all editable). The sales invoice is created in the same flow. It handles one invoice at a time; bulk generation is not a claimed feature. See [features](/features) or [download the app](/download).

## Still unsure?

Try the free [eligibility checker](/tools/eway-bill-eligibility-checker) for a quick first answer, read the detailed guides linked above, and check the [official user documentation](https://docs.ewaybillgst.gov.in/). For complex or high-value situations, consult a qualified tax professional.
