---
title: "Consolidated E-Way Bill (Form EWB-02): When and How to Use It"
slug: "consolidated-eway-bill"
description: "What a consolidated e-way bill (Form GST EWB-02) is, when transporters use it for several consignments in one vehicle, what each consignment still needs, how it works with Part B updates and trans-shipment, and common mistakes."
publishedAt: "2026-10-28"
updatedAt: "2026-10-28"
verifiedAt: "2026-10-28"
seoTitle: "Consolidated E-Way Bill (EWB-02): Rules and Steps"
metaDescription: "Consolidated e-way bill (Form EWB-02) explained: one document for many consignments in one vehicle, prerequisites, validity, Part B and common mistakes."
imageAlt: "A loaded truck carrying several consignments, each with its own e-way bill, grouped under one consolidated e-way bill"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
faq:
  - q: "What is a consolidated e-way bill?"
    a: "It is a single document, Form GST EWB-02, that lists the e-way bill numbers of several consignments travelling together in one vehicle. It does not replace the individual e-way bills; each consignment still needs its own valid e-way bill."
  - q: "Who generates a consolidated e-way bill?"
    a: "Usually the transporter carrying the consignments. A registered person who moves several consignments in their own vehicle can also generate one, using e-way bills available in their login."
  - q: "Does a consolidated e-way bill have its own validity?"
    a: "No separate validity applies to the goods. Each individual e-way bill keeps the validity calculated for it, so the earliest expiry in the vehicle is the one to watch."
  - q: "Can I include a consignment that has no e-way bill?"
    a: "No. Only consignments that already have an e-way bill can be added. Consignments below the threshold that do not need an e-way bill travel on their invoice or challan, which should be carried in the vehicle."
  - q: "What happens when the goods move to another vehicle?"
    a: "The vehicle details must be updated before the goods move in the new vehicle. The portal provides options to change the vehicle for a consolidated e-way bill or regenerate it; check the current menu and the user documentation."
  - q: "Can the E-Way Easy app create a consolidated e-way bill?"
    a: "Yes. The app can create a consolidated e-way bill for multiple consignments in one vehicle through the official e-way bill system. It costs 5 credits, charged only when the action succeeds."
related: ["eway-bill-validity", "eway-bill-correction", "documents-required-for-eway-bill"]
updateHistory:
  - date: "2026-10-28"
    note: "First published."
---
A transporter's truck often carries goods for many different consignors and consignees on the same trip. Each of those consignments needs its own e-way bill. The **consolidated e-way bill**, filed in **Form GST EWB-02**, lets the transporter group all of them under one reference for that vehicle, so the driver carries one number instead of a pile of separate bills, and the vehicle details are entered once.

This guide explains what the consolidated e-way bill does and does not do, who uses it, and where people commonly go wrong.

## What a consolidated e-way bill is

Rule 138 of the CGST Rules provides that where multiple consignments are to be transported in one conveyance, the transporter may indicate the serial numbers of the e-way bills of each consignment electronically on the common portal and generate a consolidated e-way bill in Form GST EWB-02.

In practical terms:

- It is a **convenience document** that lists existing e-way bill numbers.
- It carries the **vehicle and transport details** for the trip.
- It does **not** carry any invoice, value or HSN details of its own; those stay in each individual e-way bill.
- It does **not** replace the individual e-way bills. If one of them is missing, expired or wrong, the consolidated bill does not cure it.

Think of it as a cover sheet for the vehicle, with every underlying e-way bill still doing its own legal job.

## When transporters use it

The consolidated e-way bill fits situations where goods from several invoices share one vehicle:

| Situation | Is EWB-02 useful? |
|---|---|
| Part-truck-load (LTL) transporter picking up from several suppliers for one route | Yes, the classic case |
| Distributor's own tempo delivering to several retailers on one run | Yes, if each delivery has an e-way bill |
| Single large invoice in one truck | No, one e-way bill is enough |
| Goods transferred from a local pickup vehicle to a long-haul truck at a hub | Yes, often generated at the hub for the long-haul leg |
| Mixed load where some invoices are below the threshold | Only the bills that exist can be added; carry invoices for the rest |

## Prerequisites: what must exist first

Before a consolidated e-way bill can be generated:

1. **Each consignment must have its own e-way bill.** The threshold test is applied per consignment, not per truck. The [eligibility checker](/tools/eway-bill-eligibility-checker) helps decide whether a particular consignment needs one.
2. **Each e-way bill must be active.** A cancelled or expired e-way bill cannot be relied on, and the portal will not accept it for consolidation.
3. **You must have access to those e-way bills in your login.** A transporter normally includes bills that were generated by it or assigned to its Transporter ID by the consignor. If the supplier generated the bill without entering your Transporter ID, ask them to update the transporter first.
4. **Vehicle and transport document details must be ready**: vehicle number, mode of transport, and the transport document number and date where applicable.

## Who can generate it

The rule speaks of the transporter, and in most cases it is the transporter who generates EWB-02. A registered person who moves several of its own consignments in its own vehicle can also generate a consolidated e-way bill from its login. Unregistered transporters first enrol on the portal to get a Transporter ID, which lets them work with e-way bills assigned to them. See [who is responsible for generating an e-way bill](/blog/who-is-responsible-for-generating-eway-bill) for the wider picture.

## How to generate it on the portal

Menu labels can differ slightly between the [main portal](https://ewaybillgst.gov.in/) and the [E-Way Bill 2.0 portal](https://ewaybill2.gst.gov.in/), but the flow is broadly:

1. Log in with your username, password and multi-factor authentication.
2. Open the consolidated e-way bill menu and choose the option to generate a new one.
3. Enter the place and state from where the vehicle starts, the mode of transport, the vehicle number, and the transport document number and date where applicable.
4. Add the e-way bill numbers of the consignments loaded in the vehicle. The portal fetches each bill and shows its basic details.
5. Check the list against the goods actually loaded and the invoices in the driver's file.
6. Submit. The portal generates the consolidated e-way bill with its own number. Print it or share the number with the driver.

The portal also supports consolidated e-way bills through other modes, such as bulk upload or API, for users set up for them. See the [user documentation](https://docs.ewaybillgst.gov.in/) for the current steps and fields.

## How it relates to Part B and trans-shipment

The vehicle details entered in the consolidated e-way bill apply to the consignments listed in it. This is why transporters like it: the vehicle number is entered once for the trip rather than separately on every bill.

When the goods move to another vehicle, for example after a breakdown or at a trans-shipment hub, the rule is the same as for a single e-way bill: **the vehicle details must be updated before the goods move in the new vehicle**. The portal provides options to change the vehicle on a consolidated e-way bill or to regenerate it with the new vehicle. If only some consignments move to the new vehicle, the individual bills for those consignments need their Part B updated, or a fresh consolidated bill generated for the new vehicle's load.

For the individual Part B process, see [how to update vehicle details in an e-way bill](/blog/how-to-update-vehicle-details-in-eway-bill) and [correcting an e-way bill](/eway-bill-correction).

## Validity: each bill keeps its own

A consolidated e-way bill does not extend or reset anyone's validity. Each individual e-way bill keeps the validity calculated for it under Rule 138(10), based on its own distance and the time Part B was first entered.

This matters on a multi-drop route. A bill for the last drop may have plenty of time left, while a bill for an earlier consignment loaded two days ago may expire mid-route. The transporter should look at the **earliest expiry** among the bills in the vehicle, not just the newest one. If a bill is about to expire because of exceptional circumstances, it is extended individually within the window of 8 hours before or after expiry. See [validity and extension](/eway-bill-validity).

## Cancelling a consolidated e-way bill

The position here is less straightforward than for an individual bill, and the portal's options have changed over time. Cancelling or regenerating the consolidated document does not cancel the individual e-way bills inside it, and cancelling an individual bill follows its own 24-hour rule. If a consignment is pulled out of the vehicle or the load changes, check the portal's current options and the [user documentation](https://docs.ewaybillgst.gov.in/) before acting. The [cancellation guide](/eway-bill-cancellation) covers the individual bill rules.

## Example (illustrative): a Rajkot transporter's evening load

A Rajkot transport company loads one truck for Ahmedabad in the evening:

| Consignment | Consignor | Value incl. GST | E-way bill |
|---|---|---|---|
| 1 | A Rajkot pipe manufacturer | ₹2,40,000 | Generated by the supplier, Transporter ID entered |
| 2 | A Shapar brass parts unit | ₹96,000 | Generated by the supplier, Transporter ID entered |
| 3 | A Rajkot hardware wholesaler | ₹1,35,000 | Generated by the transporter on the supplier's request |
| 4 | A small Gondal trader | ₹38,000 | Not required on value; travels on invoice |

What the transporter does:

1. Confirms all three e-way bills appear in its login and are active.
2. Generates one consolidated e-way bill with the truck number and LR details, adding the three e-way bill numbers.
3. Hands the driver the consolidated e-way bill, the three invoices and the fourth trader's invoice.

At a checkpoint, the officer can see the vehicle's consolidated bill, the three e-way bills inside it, and the invoice for the low-value consignment. If the truck breaks down near Chotila and the load moves to another vehicle, the transporter updates the vehicle before the second truck leaves.

## Common mistakes

- **Treating EWB-02 as a substitute.** A consignment without its own valid e-way bill is not covered just because the truck has a consolidated bill.
- **Not getting the Transporter ID entered.** If the supplier did not assign the bill to you, it will not be available to consolidate.
- **Ignoring the oldest bill's expiry.** Consolidation does not extend validity.
- **Leaving the old vehicle number after a transfer.** Update before the goods move, not after.
- **Mismatch between the load and the list.** A bill listed for goods that were not loaded, or goods loaded without their bill being listed, causes trouble at inspection.
- **Forgetting the invoices.** The driver still needs the invoice, bill of supply or delivery challan for each consignment. See [documents required](/documents-required-for-eway-bill).

## Creating a consolidated e-way bill in the E-Way Easy app

The E-Way Easy Android app can create a consolidated e-way bill for multiple consignments in one vehicle, along with Part B updates, extensions, cancellations and PDF sharing. Each of these actions costs 5 credits (₹5), charged only when the action succeeds; if the portal rejects it, the credits return to your wallet. The app files through the official NIC e-way bill system via an authorised GSP using your own API login; it is not a government portal. See [managing e-way bills in the app](/eway-bill-management-app).

## Official sources

The consolidated e-way bill is provided for in Rule 138 of the CGST Rules, available on [CBIC GST](https://cbic-gst.gov.in/). Follow the current screens on the [e-way bill portal](https://ewaybillgst.gov.in/) and the steps in the [user documentation](https://docs.ewaybillgst.gov.in/), as menu options and validations can change.
