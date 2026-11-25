---
title: "E-Way Bill Distance Rules: PIN-to-PIN, 10% Margin and 50 km Part B Exemption"
slug: "eway-bill-distance-rules"
description: "How distance works in an e-way bill: the portal's PIN-to-PIN auto-calculation, the 10% margin, the 4,000 km cap, same-PIN movements, the 50 km Part B exemption, and how distance drives validity."
publishedAt: "2026-10-16"
updatedAt: "2026-11-25"
verifiedAt: "2026-10-16"
seoTitle: "E-Way Bill Distance Rules: PIN-to-PIN and 10% Margin"
metaDescription: "E-way bill distance rules: PIN-to-PIN auto distance, 10% extra margin, 4,000 km limit, same-PIN 100 km, 50 km Part B exemption and validity impact."
imageAlt: "Map with two PIN code markers connected by a route line, with a 10 percent tolerance band around it"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
faq:
  - q: "Can I enter a distance different from what the portal shows?"
    a: "Yes, up to 10% more than the portal's auto-calculated PIN-to-PIN distance. A higher figure is not accepted."
  - q: "What if the source and destination PIN are the same?"
    a: "For movement within the same PIN code, you can enter a distance of up to 100 km."
  - q: "Is the 50 km rule an exemption from the e-way bill?"
    a: "No. It only removes the need for Part B for short same-state movements to or from a transporter. Part A must still be generated."
  - q: "What is the maximum distance I can enter?"
    a: "4,000 km."
  - q: "What if the portal does not know my PIN code?"
    a: "If the PIN-to-PIN distance is not available, you enter the approximate actual distance. Check that the PIN code is valid and current first."
related: ["eway-bill-validity", "eway-bill-generation", "eway-bill-common-errors"]
updateHistory:
  - date: "2026-11-25"
    note: "Merged the distance-and-validity article into this guide: wrong-PIN example, what to do if the distance is wrong, multimodal row, and the new PIN to PIN distance estimate."
  - date: "2026-10-16"
    note: "First published."
---
> **Quick answer:** The portal auto-calculates the PIN-to-PIN distance, and you can enter up to 10% more than that figure, to a maximum of 4,000 km (up to 100 km within the same PIN code). Part B is not needed for same-state movement up to 50 km to or from a transporter, but Part A still is.

Distance in an e-way bill is not just a number you type. It decides how many days the bill is valid, and the portal checks it against the PIN codes you enter. This guide explains the distance rules and the one distance-based relief that people often misread: the 50 km Part B exemption.

## How the portal calculates distance

When you enter the dispatch-from PIN and the ship-to PIN, the official e-way bill system shows an auto-calculated **PIN-to-PIN distance**. This is the reference distance for that pair of PIN codes.

| Rule | What it means |
|---|---|
| Auto-calculated distance | Portal suggests distance between the two PIN codes |
| 10% margin | You can enter up to 10% more than the suggested figure if the actual route is longer |
| Lower distance | You can enter less than the suggestion if the route is genuinely shorter |
| Maximum | 4,000 km per e-way bill |
| Same PIN code | Up to 100 km can be entered |
| PIN not mapped | Enter the approximate actual distance |

The 10% margin exists because roads are not straight lines. A diversion, a toll-free route, or a pickup point slightly off the main road can make the real trip longer.

## Example (illustrative): the 10% margin

A Rajkot pipe manufacturer ships to Ahmedabad. The portal shows 215 km between the two PIN codes.

| Distance entered | Accepted? | Validity |
|---|---|---|
| 205 km | Yes (shorter actual route) | 2 days |
| 215 km | Yes | 2 days |
| 236 km | Yes (215 + 10% = 236.5) | 2 days |
| 250 km | No — above 10% margin | — |

In this case the margin does not change validity, since all accepted figures sit in the 201–400 km band.

## Example (illustrative): when the margin matters

A Jaipur trader ships to a town where the portal shows 190 km. The actual route, due to road work, is 205 km.

- Portal figure 190 km → 1 day validity.
- Entered 205 km (within 10% of 190, max 209) → 2 days validity.

Entering a genuine longer route can rightly add a day. Inflating distance without reason to stretch validity is not the purpose of the margin.

## Distance and validity

| Distance | Normal cargo | ODC |
|---|---|---|
| 20 km | 1 day | 1 day |
| 50 km | 1 day | 3 days |
| 150 km | 1 day | 8 days |
| 300 km | 2 days | 15 days |
| 700 km | 4 days | 35 days |

Normal cargo gets 1 day per 200 km or part; over-dimensional cargo gets 1 day per 20 km or part. Full tables are in [E-Way Bill Validity](/eway-bill-validity).

## The 50 km Part B exemption

Rule 138 allows the e-way bill to be generated **without Part B** (no vehicle details) when:

- goods move **within the same state or union territory**, and
- the movement is **up to 50 km**, and
- it is from the **consignor's place of business to the transporter's place of business** for further transportation, **or** from the **transporter's place of business to the consignee's place of business**.

### What it does not mean

- It does **not** exempt you from generating the e-way bill. Part A is still required.
- It does **not** apply to inter-state movement, even if the distance is short.
- It does **not** cover a direct delivery from seller to buyer — it is specifically about legs to or from a transporter's place.

### Example (illustrative): last-mile and first-mile legs

A Morbi tile trader sends tiles by tempo 18 km to a transporter's godown in Morbi. The transporter loads them with other consignments onto a truck to Indore.

| Leg | Within state? | Distance | Part B needed? |
|---|---|---|---|
| Trader → transporter godown (Morbi) | Yes | 18 km | No (Part A only) |
| Godown (Morbi) → Indore | No | about 620 km | Yes — transporter fills Part B or uses a consolidated e-way bill |

When the truck leaves the godown, Part B must be updated with the truck number.

## Movements across state borders over short distances

A dealer in Vapi (Gujarat) sending goods to Daman or to Silvassa may move only a few kilometres, but crossing into another state or UT means the 50 km Part B relief does not apply. Generate both parts.

## Distance in special movement patterns

| Pattern | Which PIN codes to use |
|---|---|
| Regular sale | Your dispatch place PIN to the buyer's delivery PIN |
| Bill to–ship to | Dispatch PIN to the ship-to (delivery) PIN, not the billing address |
| Bill from–dispatch from | The actual dispatch place (for example, your supplier's warehouse) to the delivery PIN |
| Goods to a transporter's godown first | Overall movement to the final destination; use Part A only for the short first leg if the 50 km rule applies |
| Goods to job worker and back | Each direction is a separate movement with its own distance |
| Rail, air or ship with road legs | The overall movement distance; the road legs before and after still count |

Using the wrong pair of PIN codes is the most common reason for a distance that looks wrong.

## Example (illustrative): bill to–ship to

A Surat fabric trader bills a Mumbai wholesaler but ships directly to the wholesaler's customer in Nashik. The e-way bill distance is Surat PIN to Nashik PIN — the route the goods actually travel — not Surat to Mumbai. The transaction type is set to bill to–ship to so the portal accepts different billing and delivery parties.

## Example (illustrative): wrong PIN, short validity

A Ludhiana bicycle parts supplier ships to a buyer whose registered office is in one city, but the goods are delivered to the buyer’s warehouse in an industrial area further away.

| PIN used | Distance | Validity |
|---|---|---|
| Buyer’s office PIN | 390 km | 2 days |
| Actual warehouse PIN | 425 km | 3 days |

Using the office PIN gives the truck 2 days for a trip that needs 3, and it also misstates the place of delivery in Part A. **The ship-to PIN must be where the goods are actually delivered.** The same applies at your end: if goods leave from a factory or godown, use that PIN, and make sure the place is on your GST registration.

## If the distance turns out to be wrong

A distance cannot be edited on a generated e-way bill. What you can do depends on timing.

- **Before the goods move, within 24 hours:** cancel and generate a fresh e-way bill with the right PIN codes and distance. See [how to cancel an e-way bill](/eway-bill-cancellation).
- **In transit and running late:** if an accident, calamity, law-and-order issue or trans-shipment delay applies, extend validity within 8 hours before or after expiry. The portal asks for the current place and remaining distance.
- **Expired and outside the window:** see [what to do when an e-way bill expires](/blog/what-to-do-when-eway-bill-expires).

## Where to get a reliable distance

- The official portal's PIN-to-PIN figure is the reference.
- The free [PIN to PIN distance calculator](/tools/distance-calculator) shows both places and an estimated road distance from India Post PIN code locations, then the validity days. Use it to check PIN codes and plan; the portal figure is final.
- In the E-Way Easy app, distance is calculated automatically from the PIN codes and can be edited manually — useful, but still check that your entry stays within the official 10% margin.

## Common mistakes

- Using the head office PIN instead of the godown PIN, which changes the auto distance.
- Typing a distance well above the suggestion and getting a rejection.
- Reading the 50 km rule as "no e-way bill under 50 km".
- Using the exemption for inter-state movements.
- Forgetting to add Part B before the long leg begins.

## Limitations

Auto-calculated distances depend on the PIN code database. New or re-mapped PIN codes can show unexpected figures. If the auto distance looks wrong, check the PIN codes first, then refer to the portal's user documentation for how such cases are handled.

## Official sources

Distance validations are applied by the official system and can change with portal releases. Check the [e-way bill portal](https://ewaybillgst.gov.in/) and its [user documentation](https://docs.ewaybillgst.gov.in/). The 50 km relief is in Rule 138, available on [CBIC GST](https://cbic-gst.gov.in/).
