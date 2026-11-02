---
title: "Common E-Way Bill Errors and How to Fix Them"
slug: "eway-bill-common-errors"
description: "The everyday problems businesses face while generating e-way bills, explained in plain words: GSTIN issues, duplicate documents, distance rejections, tax mismatches, login trouble, expired bills and more, with practical fixes."
updatedAt: "2026-11-02"
verifiedAt: "2026-10-13"
seoTitle: "Common E-Way Bill Errors and How to Fix Them"
metaDescription: "Plain-language fixes for common e-way bill problems: invalid GSTIN, duplicate document, distance rejected, tax mismatch, OTP login, Part B missing, expiry."
imageAlt: "Warning icons next to e-way bill fields like GSTIN, PIN code, HSN and distance, each with a fix tick"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "E-Way Bill API error codes list (official)"
    url: "https://docs.ewaybillgst.gov.in/apidocs/api-error-codes-list.html"
  - title: "E-Way Bill API: Generate E-Way Bill validations (official)"
    url: "https://docs.ewaybillgst.gov.in/apidocs/version1.03/generate-eway-bill.html"
  - title: "E-Way Bill API: Authentication (official)"
    url: "https://docs.ewaybillgst.gov.in/apidocs/version1.03/authentication.html"
  - title: "E-Way Bill API release notes (official)"
    url: "https://docs.ewaybillgst.gov.in/apidocs/release-notes.html"
  - title: "E-way bill error codes for IRN-based generation (e-invoice system)"
    url: "https://einvoice1.gst.gov.in/others/geterrorcodes/EWB"
  - title: "GST portal (search taxpayer)"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Why does the portal say my document is already used?"
    a: "An e-way bill has already been generated for the same supplier GSTIN, document type and document number, either by you, the buyer or the transporter. Find the existing e-way bill instead of creating another."
  - q: "What does e-way bill error code 604 mean?"
    a: "On the official API error list, code 604 means e-way bills are already generated for the same document number, so you cannot generate again on it. Find and use the existing e-way bill."
  - q: "Why is my distance not accepted?"
    a: "The distance entered is more than 10% above the portal's PIN-to-PIN distance, or above 4,000 km. Check the PIN codes and enter a distance within the limit."
  - q: "Why can't I generate an e-way bill for a buyer's GSTIN?"
    a: "The GSTIN may be mistyped, cancelled, suspended, or not match the state you selected. Check it on the GST portal's taxpayer search."
  - q: "Why is my vehicle number being rejected?"
    a: "Usually the format is wrong. Enter the number without spaces or hyphens, starting with the state code, exactly as on the registration plate. The official API documentation gives the format TMXXXXXX for temporarily registered vehicles."
  - q: "How do I extend an e-way bill after the expiry window?"
    a: "You cannot. Extension works only within 8 hours before or after expiry. Once that window has passed, a fresh e-way bill is needed for further movement."
  - q: "My login OTP is not coming. What can I do?"
    a: "Check that the registered mobile number is correct and reachable, wait a few minutes, and try again. If the number has changed, it must be updated through the proper process."
  - q: "Why am I blocked from generating e-way bills?"
    a: "Generation can be blocked for taxpayers who have not filed returns for the prescribed period under Rule 138E. Filing the pending returns is the usual way to restore access."
related: ["eway-bill-correction", "eway-bill-cancellation", "eway-bill-distance-rules", "documents-required-for-eway-bill"]
updateHistory:
  - date: "2026-11-02"
    note: "Rebuilt around the questions people ask when something fails, with a direct fix under each. Added official error codes checked against the e-way bill API error list."
  - date: "2026-10-22"
    note: "Merged our separate article on common e-way bill errors and solutions into this guide"
  - date: "2026-10-03"
    note: "Added login and MFA issues and the 180-day document date problem."
  - date: "2026-09-14"
    note: "First published."
---
> **Quick answer:** Most e-way bill errors come from a mistyped or inactive GSTIN, a duplicate document number, totals that do not add up, a distance more than 10% above the portal's PIN-to-PIN figure, or a wrongly typed vehicle number. Match your exact message to the fixes below.

Most e-way bill problems fall into a few familiar situations. This guide groups them by where you got stuck and phrases each one as the question people ask. Under each question you get the fix first, then the reason.

**About the error codes:** every code shown here was read on the official [API error codes list](https://docs.ewaybillgst.gov.in/apidocs/api-error-codes-list.html) on 2 November 2026. These codes belong to the e-way bill API, which apps and software connected through a GSP use, so on the web portal you may see only a text message. Codes and wording can change with portal updates, so always read the exact message on your screen.

## Quick reference

| What you see (in plain words) | Official API code | Most likely cause | Quick fix |
|---|---|---|---|
| GSTIN not valid / not found | 208, 212, 393 | Typo, cancelled or suspended GSTIN | Verify on the GST portal |
| GSTIN blocked for unfiled returns | 715, 716, 717 | Pending returns | File returns |
| PIN code does not match state | 710, 436, 437 | Wrong PIN or wrong state selected | Correct the address data |
| Document already has an e-way bill | 604 | Duplicate generation | Find and use the existing EWB |
| Tax type mismatch | 623, 624 | IGST used intra-state or CGST/SGST used inter-state | Match tax type to place of supply |
| Values do not add up | 620 | Invoice total is less than value plus tax | Recalculate |
| Invalid HSN | 216, 282, 283 | Wrong or short code | Correct from HSN list |
| Document date not accepted | 207, 820 | Future date, or older than 180 days | Use the right date |
| Vehicle number not accepted | 225, 304 | Wrong format or spaces | Use standard format |
| Transporter ID not accepted | 222 | Mistyped or invalid GSTIN/TRANSIN | Confirm ID with transporter |
| Cannot update Part B | 311, 312, 636 | Bill expired, or you are not the assigned transporter | Check validity and assignment |
| Distance not allowed | 702 | More than 10% above PIN-to-PIN, or above 4,000 km | Use the portal's figure |
| Cannot extend | 382, 821 | Outside the 8-hour window, or at the 360-day cap | Generate a fresh EWB if needed |
| Cannot cancel | 315, 316, 728 | Over 24 hours, or verified in transit | See cancellation options |
| Cannot log in | 101, 102, 108 | Password, OTP or account issue | Reset and check registered mobile |

## Login and access

### Why is my e-way bill login OTP not coming?

**The fix:** check the registered mobile number, the network and DND settings, wait a few minutes, and try again. If the number has changed, update it through the proper process on the GST portal.

As reported by GSTN, multi-factor authentication was extended to all taxpayers from 1 April 2025, so the registered number must be with an available person.

### I forgot my username or password. How do I get back in?

**The fix:** use the portal's recovery options.

For software connected through the API, the official list shows code 101 (Invalid Username), 102 (Invalid Password) and 108 (Invalid login credentials).

### Can my staff share one e-way bill login?

**The fix:** create separate sub-user credentials for each staff member instead of sharing one login.

Never share your password or OTP with anyone offering to "generate for you".

### Why did my session expire in the middle of an entry?

**The fix:** keep your data ready before logging in, because long forms can time out.

### What should I do when the portal is slow at month-end?

**The fix:** generate earlier in the day. The E-Way Bill 2.0 portal is an additional official option with synchronised data.

## GSTIN and party details

### Why does the portal say the GSTIN is invalid?

**The fix:** re-type the GSTIN slowly, then search it on the [GST portal](https://www.gst.gov.in/)'s Search Taxpayer facility to check that it is active and the legal name matches your buyer.

**Official codes:** 208 (Invalid Supplier GSTIN), 212 (Invalid Consignee GSTIN), 393 (Invalid GSTIN). Code 722 means the consignee GSTIN is cancelled and the document date is later than the de-registration date.

**Why:** a typo, a cancelled or suspended registration, or the state code (first two digits) does not match the state you selected.

- The usual typing confusions are 0/O, 1/I, 5/S and 8/B.
- If the registration was cancelled, confirm the buyer's current registration. Treat the buyer as unregistered (URP) only if that genuinely reflects the supply. The tax treatment changes, so take advice.

Our [GSTIN verification checklist](/blog/gstin-verification-what-to-check) covers the full process.

### Why is my GSTIN blocked from generating e-way bills?

**The fix:** check your registration status and return filing status on the GST portal, and file pending returns. Access is usually restored after the system updates. If the block persists after filing, take help from your tax consultant.

**Official codes:** 715 (consignor GSTIN blocked), 716 (consignee GSTIN blocked) and 717 (transporter GSTIN blocked). The official text for all three gives the reason as "Return is not filed for past 2 months".

**Why:** e-way bill generation can be blocked under Rule 138E if returns are pending for the prescribed period. A suspended or cancelled registration also stops generation.

### Why does the portal say my PIN code does not match the state?

**The fix:** use the actual delivery address and PIN. For bill-to/ship-to cases, select the right transaction type so the portal expects different addresses.

**Official codes:** 710 (Invalid state code for the given pincode), 436 and 437 (ship-to or ship-from state code does not fit the pincode).

**Why:** a ship-to PIN from another state, or the state of supply chosen does not match the GSTIN or PIN.

## Invoice, HSN and value checks

### Why does it say an e-way bill already exists for this document?

**The fix:** look up the existing e-way bill. If it is correct, use it. If it is wrong and within 24 hours, cancel it and regenerate.

**Official code:** 604 (e-way bills already generated for the same document number).

**Why:** the same supplier GSTIN, document type and document number already has an e-way bill, perhaps generated by a colleague, the buyer, or the transporter.

**Do not** change the invoice number to get around the check. That creates two e-way bills for one consignment.

### Why is my tax type being rejected?

**The fix:** match the tax to the place of supply. If the invoice itself has the wrong tax, correct the invoice first.

**Official codes:** 623 (IGST value is not applicable for Intra State Transaction), 624 (SGST/CGST value is not applicable for Inter State Transaction).

**Why:** IGST charged on an intra-state sale, or CGST + SGST on an inter-state sale.

### Why do my invoice totals not match?

**The fix:** recompute each line (quantity × rate − discount = taxable value, then tax on that) and apply one rounding rule throughout.

**Official code:** 620 (Total invoice value cannot be less than the sum of total assessible value and tax values). The official release notes record a relaxation of this check from 1 February 2026 for e-way bills with certain RSP-based HSNs under Notification 20/2025–Central Tax, so read the [release notes](https://docs.ewaybillgst.gov.in/apidocs/release-notes.html) if that applies to you.

**Why:** the portal compares the total invoice value with the taxable value plus CGST, SGST/UTGST, IGST and cess. Rounding, discounts applied differently, cess left out or a total typed from memory breaks this. A total above the sum may pass this particular check and still be wrong, so compute it either way.

The free [GST calculator](/tools/gst-calculator) and [inclusive/exclusive calculator](/tools/gst-inclusive-exclusive-calculator) help check figures. For the full method see [how to calculate GST on a sales invoice](/blog/how-to-calculate-gst-on-sales-invoice).

**Example (illustrative):** a Coimbatore pump dealer sells within Tamil Nadu. Taxable value is ₹84,750 at an illustrative 18% rate.

| Field | Correct figure | What was typed |
|---|---|---|
| Taxable value | ₹84,750.00 | ₹84,750.00 |
| CGST (9%) | ₹7,627.50 | ₹7,627.50 |
| SGST (9%) | ₹7,627.50 | ₹7,627.50 |
| Total | ₹1,00,005.00 | ₹1,00,000.00 |

The total was typed as a round figure, ₹5 less than value plus tax, so it fails the check. Compute the total; never remember it.

### Why is my HSN code invalid?

**The fix:** correct the code from an HSN list and update your product master so the same code is used every time. Try the [HSN code lookup](/tools/hsn-code-lookup) and confirm on official sources.

**Official codes:** 216 (Invalid HSN Code), 282 (at least 4 digits for taxpayers with turnover less than ₹5 crore), 283 (at least 6 digits for turnover of ₹5 crore and above), 724 (at least one item's HSN must be of goods).

**Why:** the code does not exist, is outdated, is shorter than required for your turnover, or belongs to a different product. [HSN codes: a practical guide](/blog/hsn-codes-practical-guide) explains how to pick the right code.

### Why is my document date not accepted?

**The fix:** enter the actual document date. If the date itself is wrong in your billing software (for example 2025 typed instead of 2026), correct the invoice first, then generate.

**Official codes:** 207 (Invalid Invoice Date), 820 (You cannot generate e-Waybill with document date earlier than 180 days).

**Why:** the date is in the future, or (as reported by GSTN, from 1 January 2025) the document is more than 180 days old. Very old documents may not be eligible for an e-way bill at all, so take advice if goods are moving against an old invoice.

### Why does it say the e-way bill must be generated with an IRN?

**The fix:** generate the e-way bill using the IRN of the e-invoice, or as part of IRN generation in the e-invoice system.

**Official code:** 720, which applies because the supplier is enabled for e-invoicing. Part A is then filled from the e-invoice data, and you add the transport details.

## Vehicle, Part B and transporter

### Why is my vehicle number being rejected?

**The fix:** enter it in the standard format, without spaces or hyphens, exactly as on the registration plate (e.g. GJ03AB1234).

**Official codes:** 225 (Invalid Vehicle Number Format), 304 (Invalid vehicle format), 303 (Vehicle number is required).

The official API documentation says a vehicle number should begin with the state code, and gives the format `TMXXXXXX` for temporarily registered vehicles. For other unusual formats, check the user documentation for how the portal expects them.

### Why is my Transporter ID not accepted?

**The fix:** ask the transporter to confirm their ID in writing and save it in your records for next time.

**Official code:** 222 (Invalid Transporter Id).

**Why:** the transporter's GSTIN or TRANSIN is mistyped or not valid on the portal.

### Why can't I update Part B?

**The fix:** check the bill's status and validity. If it is assigned to a transporter, ask them to update or reassign.

**Official codes:** 311 (validity period lapsed), 312 (not generated by you, or cancelled), 636 (You are not assigned to update part B), 635 (the current transporter has already entered Part B).

**Why:** the e-way bill has expired, has been cancelled, or you are not the generator or assigned transporter.

### Why can't I change the transporter?

**The fix:** check that the bill is still valid and that you are the party allowed to change it. If the current transporter has already entered Part B, ask them to act.

**Official codes:** 281 (e-way bill already expired), 338 (the current transporter has already entered Part B), 339 (you are not assigned to update the transporter details).

### The truck left without Part B. What do I do?

**The fix:** fill Part B immediately. Unless the 50 km same-state relief applies, the goods are not covered without it.

**Why:** Part A was generated and Part B was forgotten.

## Distance and validity

### Why is my distance being rejected?

**The fix:** use the auto-calculated distance or a figure within 10% above it. If the auto figure seems wrong, the PIN codes are often the problem, so check the dispatch-from and ship-to PINs.

**Official code:** 702 (The distance between the pincodes given is too high).

**Why:** the figure is more than 10% above the portal's PIN-to-PIN distance, or above the 4,000 km cap. For movement within the same PIN code, up to 100 km can be entered.

If your actual route is genuinely longer than the auto distance plus 10%, you still cannot enter more than the limit; plan the trip around the validity that figure gives. Details in [Distance Rules](/eway-bill-distance-rules).

**Example (illustrative):** the portal shows 312 km between a Vapi factory and a Nashik dealer. The maximum that can be entered is 312 × 1.10 = 343.2 km, so 343 km is accepted but 360 km is not. At 343 km, validity is 2 days (343 ÷ 200 = 1.7, rounded up).

**Example (illustrative):** a Jaipur handicraft exporter tries to generate an e-way bill for a Delhi buyer and gets a distance rejection. The team had typed 320 km from memory; the portal's PIN-to-PIN figure was 268 km (maximum allowed about 294 km). They enter 268 km. The bill is generated with 2 days validity.

### Why does it say the distance between my PIN codes is not available?

**The fix:** check that both PIN codes are valid and current, then enter the approximate actual distance.

**Official codes:** 709 (Pin to pin distance is not available for the given pin codes), 721 (the distance is not available in the system, please provide distance).

### How do I extend an e-way bill after the expiry window?

**The fix:** you cannot. If you are outside the window, a fresh e-way bill is needed for further movement. For future consignments, set a reminder a few hours before expiry.

**Official codes:** 382 (extension allowed only 8 hours before or after validity ends), 821 (e-Waybill cannot be extended as the allowed limit is 360 days).

**Why:** you are outside the 8-hour window before or after expiry, or the 360-day overall cap has been reached. See [Validity](/eway-bill-validity) and [what to do when an e-way bill expires](/blog/what-to-do-when-eway-bill-expires).

### Why is the extend option not working inside the window?

**The fix:** check the bill's status and who holds it. Fill Part B first if it is missing, and ask the current transporter to extend if the bill is assigned to them.

**Official codes:** 379 (already cancelled), 380 (not in active state), 381 (no Part B or vehicle entry), 700 (You are not assigned to extend e-waybill).

### Why can't I cancel my e-way bill?

**The fix:** if 24 hours have passed or the bill was verified in transit, it can no longer be cancelled. Ask the recipient to reject it within their 72-hour window if applicable, and keep records.

**Official codes:** 315 (validity period lapsed), 316 (already verified, you cannot cancel it), 728 (You can cancel the ewaybill within 24 hours from Part B entry).

**Why:** more than 24 hours since generation, or the bill was verified in transit. Note that the wording of code 728 counts from Part B entry, while Rule 138(9) speaks of 24 hours from generation, so treat the generation time as your safe deadline. See [Cancellation](/eway-bill-cancellation).

## Generating on mobile

Apps and software that file through a GSP connect to the same official system through the API, so all the checks above still apply. These are the extra problems you can meet on a phone.

### Why does the app say my e-way bill login is invalid?

**The fix:** enter the API username and password created on the e-way bill portal for API integration, and check them for typing errors. The official documentation places this under Main menu > Registration > GSP.

**Official codes:** 101 (Invalid Username), 102 (Invalid Password), 108 (Invalid login credentials).

### Why does it say my GSTIN is not registered to this GSP?

**The fix:** on the e-way bill portal, use Main menu > Registration > GSP to register under the GSP your app uses, then try again.

**Official code:** 111.

### Why does it say to try again later or that I am blocked?

**The fix:** stop retrying, wait, and then try once. If the message tells you how long to wait, wait that long.

**Official codes:** 118 (Try after 5 minutes), 658 (You are blocked for accesing this API as the allowed number of requests has been exceeded for this duration).

### Why are the details wrong after importing an invoice PDF?

**The fix:** review every extracted field against the invoice and correct it before generating. Check the GSTIN, HSN codes and totals in particular.

Part A cannot be edited afterwards, so a wrong value that slips through means cancelling within 24 hours and starting again.

### Are the rules different if I generate from an app?

**The fix:** no. The 24-hour cancellation limit, the 8-hour extension window and the distance and validity rules are the same on every route, so act within them.

In the E-Way Easy app, details are checked before filing, Part-B updates, extensions and cancellations can be done from the phone, and credits are refunded to the wallet if the portal rejects an action.

## When it is not your error

Sometimes the problem is on the other side: a buyer whose registration was cancelled last month, a transporter who mistyped your Transporter ID, or a portal slowdown at the end of the month. In those cases, keep a screenshot of the message with the time, inform the other party, and retry once the cause is fixed. Do not try workarounds such as changing document numbers or entering a different buyer.

## Prevention checklist

Before every generation, confirm:

- Recipient GSTIN is active and the legal name matches (keep saved buyer records with verified GSTINs and PINs).
- Invoice number and date are correct, and the document is not older than 180 days.
- Line totals are recomputed and the tax type is right: CGST + SGST within the state, IGST across states.
- HSN comes from your product list, not typed fresh each time.
- Both PIN codes are correct and belong to the right states; distance is the auto-calculated figure unless the route is genuinely longer.
- Vehicle number is typed from the plate.
- An e-way bill register is checked to avoid duplicates.

Tools that pull buyer details from GSTIN, HSN from saved products and distance from PIN codes remove several of these manual steps — in the E-Way Easy app, the Review EWB step exists for exactly this final check. The responsibility for correct data still stays with you.

## Official sources

Messages and validations are defined by the official system. Check the [e-way bill portal](https://ewaybillgst.gov.in/), its [user documentation](https://docs.ewaybillgst.gov.in/) and the full [API error codes list](https://docs.ewaybillgst.gov.in/apidocs/api-error-codes-list.html) for the latest list and guidance. E-way bills generated through an IRN use a [separate error list](https://einvoice1.gst.gov.in/others/geterrorcodes/EWB) in the e-invoice system.
