---
title: "E-Way Bill Validity Explained"
slug: "eway-bill-validity-explained"
excerpt: "How e-way bill validity is calculated under Rule 138(10): the 200 km rule, the midnight counting method, over-dimensional cargo, extension and the 360-day cap."
category: "eway-bill"
tags: ["e-way bill", "validity", "Rule 138(10)", "extension"]
publishedAt: "2026-07-21"
updatedAt: "2026-10-01"
verifiedAt: "2026-10-10"
seoTitle: "E-Way Bill Validity Explained: Calculation and Extension"
metaDescription: "How e-way bill validity works: 1 day per 200 km, the midnight rule, ODC at 20 km per day, worked examples, extension within 8 hours and the 360-day cap."
imageAlt: "Calendar with days marked against a road map showing 200 km segments and a clock at midnight"
sources:
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
faq:
  - q: "Is an e-way bill valid for exactly 24 hours per 200 km?"
    a: "No. Each day ends at midnight. The first day runs from the time of generation until midnight of the following day, so the actual hours available depend on when you generate."
  - q: "When does the validity start if I generate Part A today and fill Part B tomorrow?"
    a: "Validity is counted from when Part B is first entered, since that is when the e-way bill becomes valid for movement. Check the 'valid upto' shown on the generated bill."
  - q: "Can an expired e-way bill be extended?"
    a: "Only within 8 hours after expiry (or 8 hours before). After that window, a new e-way bill is generally needed."
related: ["how-distance-affects-eway-bill-validity", "what-to-do-when-eway-bill-expires", "how-to-update-vehicle-details-in-eway-bill"]
---
An e-way bill does not last forever, and it does not last a fixed 24 hours either. Its validity depends on distance and on a counting method that surprises many people the first time: days end at midnight, not 24 hours after generation. Get this wrong and a truck that left on time can be stopped with an expired bill.

## The rule

Rule 138(10) of the CGST Rules sets validity by distance:

| Type of conveyance / cargo | Distance | Validity |
|---|---|---|
| Normal cargo | Up to 200 km | 1 day |
| Normal cargo | Every additional 200 km or part thereof | 1 additional day |
| Over-dimensional cargo (ODC) | Up to 20 km | 1 day |
| Over-dimensional cargo (ODC) | Every additional 20 km or part thereof | 1 additional day |

"Or part thereof" means you always round **up**. 201 km is 2 days, not 1.

Over-dimensional cargo means cargo carried as a single indivisible unit that exceeds the dimensional limits prescribed under the motor vehicle rules — think large machinery, transformers, wind turbine blades.

## How a "day" is counted

The period of validity is counted from the time Part B is entered (that is, when the e-way bill becomes valid for movement). The first day ends at **midnight of the day following** the date of generation. Each subsequent day ends at the next midnight.

### Example (illustrative): same distance, different start times

A Vapi chemical trader moves goods 180 km (1 day of validity).

| Generated at | Valid until | Actual hours available |
|---|---|---|
| 9:00 am, 14 Sept | 11:59 pm, 15 Sept | about 39 hours |
| 10:30 pm, 14 Sept | 11:59 pm, 15 Sept | about 25.5 hours |
| 12:05 am, 15 Sept | 11:59 pm, 16 Sept | about 48 hours |

Generating just after midnight gives the most time; generating late at night gives the least. This matters for long routes and overnight loading.

## Working out validity step by step

1. Take the approximate distance on the e-way bill.
2. Divide by 200 (or 20 for ODC) and round up to get the number of days.
3. The first day ends at midnight after the day of generation; add the remaining days.

### Example (illustrative): normal cargo, 650 km

A Rajkot pipe manufacturer generates an e-way bill at 3:15 pm on 2 October for a 650 km trip to Jaipur.

- 650 ÷ 200 = 3.25 → **4 days**
- Day 1 ends: midnight, 3 October
- Day 2 ends: midnight, 4 October
- Day 3 ends: midnight, 5 October
- Day 4 ends: midnight, 6 October

**Valid until 11:59 pm on 6 October.**

### Example (illustrative): over-dimensional cargo, 70 km

A Pune fabrication unit moves a single large pressure vessel 70 km as ODC, generating at 10:00 am on 5 October.

- 70 ÷ 20 = 3.5 → **4 days**
- Valid until 11:59 pm on **9 October** (day 1 ends midnight of 6 October, then 7, 8, 9).

As normal cargo, the same 70 km would get only 1 day.

The portal shows the "valid upto" date and time on every e-way bill — always check it against your expected arrival.

## Extending validity

If goods cannot reach the destination within validity due to **exceptional circumstances** — natural calamity, law and order issues, trans-shipment delay, accident and the like — the generator or the transporter in charge can extend validity.

Key conditions:

- Extension is allowed only **within 8 hours before or after** the expiry time.
- The reason must be stated, along with details the portal asks for (typically the current location and remaining distance).
- As reported in a GSTN advisory, from 1 January 2025, an e-way bill can be extended only up to a **total of 360 days** from the original generation date.

If the 8-hour window is missed, the expired bill generally cannot be extended. See [What to Do When an E-Way Bill Expires](/blog/what-to-do-when-eway-bill-expires).

## Things that do not change validity

- **Updating the vehicle number.** Changing Part B because of a breakdown or trans-shipment does not reset or extend validity.
- **Changing the transporter.** Same — the clock keeps running.
- **Recipient acceptance.** Acceptance or rejection is a separate step and doesn't affect the validity period.

## Common mistakes

- **Thinking "1 day = 24 hours".** Days end at midnight.
- **Rounding down.** 410 km is 3 days, not 2.
- **Wrong distance entry.** A lower distance means fewer days. Enter the realistic route distance (the portal allows up to 10% above its PIN-to-PIN calculation). More in [How Distance Affects E-Way Bill Validity](/blog/how-distance-affects-eway-bill-validity).
- **Generating hours before loading.** If the truck leaves next evening, generating the night before eats into validity.
- **Missing the extension window.** Set a reminder for long trips.
- **Not using ODC when it applies** — or using it when it doesn't. ODC has a specific definition.

## A quick planning habit

When you prepare the invoice, check the distance and expected travel time together. The E-Way Easy app calculates distance from PIN codes as part of the invoice flow (editable if your route is longer), so the validity implication is visible before the bill is finalised. You can also use the free [distance calculator](/tools/distance-calculator).

## Official sources

The validity rule is in Rule 138(10) of the CGST Rules on [CBIC GST](https://cbic-gst.gov.in/). Extension procedure and recent advisories are on the [E-Way Bill System](https://ewaybillgst.gov.in/) and in its [user documentation](https://docs.ewaybillgst.gov.in/). Verify the current position before planning time-sensitive movements.
