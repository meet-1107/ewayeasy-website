---
title: "E-Way Bill Number Becomes 14 Digits from 1 January 2027: What Changes"
slug: "eway-bill-number-14-digits-2027"
excerpt: "GSTN has announced that e-way bill numbers grow from 12 to 14 digits and consolidated e-way bill numbers from 10 to 11 digits from 1 January 2027. What changes, what doesn't, and what to check."
category: "eway-bill"
tags: ["e-way bill number", "14 digit e-way bill", "consolidated e-way bill", "gstn advisory", "2027"]
publishedAt: "2026-11-16"
updatedAt: "2026-11-16"
seoTitle: "E-Way Bill Number 14 Digits from 1 Jan 2027: What Changes"
metaDescription: "From 1 January 2027 the e-way bill number goes from 12 to 14 digits and the consolidated number from 10 to 11. What changes, what doesn't and what to check."
imageAlt: "An e-way bill number shown growing from 12 digits to 14 digits, with a calendar marked 1 January 2027"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "GST portal: news and updates"
    url: "https://www.gst.gov.in/newsandupdates"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
faq:
  - q: "When does the e-way bill number become 14 digits?"
    a: "From 1 January 2027, according to the GSTN advisory dated 4 November 2026. E-way bills generated from that date carry a 14-digit number instead of 12 digits."
  - q: "Does the consolidated e-way bill number change too?"
    a: "Yes. The consolidated e-way bill number grows from 10 digits to 11 digits from the same date."
  - q: "Do the ₹50,000 limit or validity rules change?"
    a: "No. This is a change to the length of the number only. Who must generate an e-way bill, the value threshold, validity, Part A and Part B and the other rules stay the same."
  - q: "What happens to e-way bills generated before 1 January 2027?"
    a: "Numbers already issued are not renumbered, as reported. Your systems and records need to handle both the old 12-digit numbers and the new 14-digit numbers side by side."
  - q: "I generate e-way bills on the portal by hand. Do I need to do anything?"
    a: "Usually very little. Check anything where you type or store the number yourself: spreadsheets, dispatch registers, printed formats and any software that has a fixed 12-character field."
related: ["what-is-an-eway-bill", "eway-bill-part-a-and-part-b-explained", "prepare-invoice-data-for-bulk-processing"]
---
> **Quick answer:** According to a GSTN advisory dated 4 November 2026, from 1 January 2027 the e-way bill number grows from 12 digits to 14 digits and the consolidated e-way bill number from 10 digits to 11 digits, because the existing number range is running out. The rules themselves do not change. What you need to check is anywhere the number is stored, typed, validated or printed: ERP and billing software, spreadsheets and transport documents.

## What is changing

| Number | Until 31 December 2026 | From 1 January 2027 |
|---|---|---|
| E-way bill number (EBN) | 12 digits | 14 digits |
| Consolidated e-way bill number | 10 digits | 11 digits |

The reason given is capacity: so many e-way bills are generated every day that the 12-digit range is expected to be used up. A longer number simply creates room for more.

This article is based on the GSTN advisory as reported by several tax publications. We could not open the advisory itself on the official portals at the time of writing, so confirm the final technical details on the [e-way bill portal](https://ewaybillgst.gov.in/) before you change your systems.

## What does not change

- Whether you need an e-way bill: the ₹50,000 consignment value test and the exceptions stay as they are. See [the ₹50,000 limit and its exceptions](/blog/eway-bill-limit-50000-threshold-exceptions).
- Who generates it: supplier, recipient or transporter, as before.
- Part A and Part B, validity, extension, cancellation and rejection rules.
- E-way bills already generated: they keep their existing numbers. Expect to see both lengths in your records for a while.

## Who needs to act

**Businesses whose software talks to the e-way bill system.** If your ERP, billing software or a GST Suvidha Provider (GSP) generates e-way bills through the API, the software has to accept, store and display a 14-digit number. A common failure is a database column or validation rule that allows exactly 12 characters: the e-way bill is generated on the portal, but your system rejects or cuts the number it gets back. GSTN has said test changes will be available in its sandbox; ask your software provider when they have tested them.

**Anyone who keeps e-way bill numbers in Excel.** Excel shows long numbers in scientific notation (for example 1.23457E+13) and drops leading zeros. Format the e-way bill number column as **Text** before you paste numbers in, and check any lookup formulas that match on the number.

**Transporters and dispatch desks.** Check printed lorry receipts, dispatch registers, gate passes and any form with a fixed number of boxes for the e-way bill number. Drivers who read the number out at checkpoints should know it is longer.

**People who generate on the portal by hand.** The portal shows whatever number it issues, so generation itself needs no change. Only your own records and formats need checking.

## A short checklist before 1 January 2027

1. List every place the e-way bill number is stored or typed: ERP, billing software, spreadsheets, transport documents, reports.
2. Ask your ERP or GSP provider to confirm their 14-digit and 11-digit changes are tested.
3. Change fixed-length fields and validation rules to accept the new lengths, while still accepting the old ones.
4. Format spreadsheet columns that hold e-way bill numbers as Text.
5. Update printed formats and registers that have room for only 12 digits.
6. After 1 January 2027, check your first few e-way bills end to end: generation, Part B update, cancellation and consolidation.

## Example (illustrative)

A Rajkot pipe manufacturer keeps a dispatch register in Excel and generates e-way bills from its billing software through a GSP. In December 2026 it formats the register's e-way bill column as Text and asks the GSP for confirmation that its integration accepts 14-digit numbers. On 2 January 2027 it generates its first e-way bill of the year, checks that the full 14-digit number appears in the billing software, on the printed invoice and in the register, and only then continues normal dispatch.

## Where E-Way Easy fits

If you prepare dispatch data in spreadsheets, the free [bulk e-way bill data checker](/tools/bulk-eway-bill-data-checker) helps you clean the file before uploading it on the portal, and our guides on [Part A and Part B](/blog/eway-bill-part-a-and-part-b-explained) and [e-way bill validity](/eway-bill-validity) still apply unchanged.

## Official sources

Rules and technical specifications are published on the [e-way bill portal](https://ewaybillgst.gov.in/), its [user documentation](https://docs.ewaybillgst.gov.in/) and the [GST portal news and updates](https://www.gst.gov.in/newsandupdates). This article will be updated once the advisory text and final specifications are confirmed there.
