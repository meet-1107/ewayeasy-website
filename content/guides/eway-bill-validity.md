---
title: "E-Way Bill Validity: Calculation, Extension and Expiry"
slug: "eway-bill-validity"
description: "How e-way bill validity is calculated for normal and over-dimensional cargo, when the clock starts and ends, how to extend an expiring bill, and what to do if it expires, with timestamped examples."
updatedAt: "2026-10-22"
verifiedAt: "2026-10-12"
seoTitle: "E-Way Bill Validity: Calculation, Extension, Expiry"
metaDescription: "E-way bill validity explained: 1 day per 200 km, ODC 1 day per 20 km, midnight rule, 8-hour extension window, 360-day cap, with timestamped examples."
imageAlt: "Calendar and clock beside a distance scale showing 200 km bands mapped to validity days"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules, Rule 138(10))"
    url: "https://cbic-gst.gov.in/"
faq:
  - q: "Is an e-way bill valid for exactly 24 hours per 200 km?"
    a: "No. Each day ends at midnight. The first day runs until midnight of the day following the start date, so the actual hours available depend on when the bill becomes valid for movement."
  - q: "How many days is an e-way bill valid for 300 km?"
    a: "2 days for normal cargo, because 300 km falls in the 201 to 400 km band."
  - q: "When does day one end?"
    a: "At midnight of the day following the date of generation. A bill generated at 10 am on 14 October with 1 day validity is valid till 11:59 pm on 15 October."
  - q: "Can an expired e-way bill be extended?"
    a: "Only within 8 hours after expiry. Beyond that, extension is not possible and a fresh e-way bill is needed, subject to the rules."
  - q: "Is there a limit on how many times I can extend?"
    a: "As reported by GSTN, from 1 January 2025 an e-way bill can be extended only up to a total of 360 days from its original generation date."
  - q: "Does validity start when Part A is generated or when Part B is filled?"
    a: "Validity is counted from when the e-way bill becomes valid for movement, which is when Part B is first entered. If Part B is filled at generation, both are the same time."
related: ["eway-bill-distance-rules", "eway-bill-rules", "eway-bill-correction"]
updateHistory:
  - date: "2026-10-22"
    note: "Merged our separate article on e-way bill validity into this guide"
  - date: "2026-10-06"
    note: "Added the 360-day extension cap and more timestamped examples."
  - date: "2026-09-05"
    note: "First published."
---
An e-way bill does not last forever. Its validity depends on the distance and the type of cargo, and it expires at midnight, not at the hour it was generated. Getting this wrong means a truck on the road with an expired bill, which is treated much like having no bill at all.

## The basic rule (Rule 138(10))

| Cargo type | Validity |
|---|---|
| Normal cargo | 1 day for every 200 km or part thereof |
| Over-dimensional cargo (ODC) | 1 day for every 20 km or part thereof |

"Part thereof" means any fraction counts as a full block. 201 km is two blocks of 200 km, so 2 days.

Over-dimensional cargo is cargo carried as a single unit that exceeds the dimensional limits under the Motor Vehicles rules — large machinery, transformers, wind turbine blades and the like. You select ODC as the vehicle type in Part B.

## Validity table for normal cargo

| Distance | Validity |
|---|---|
| Up to 200 km | 1 day |
| 201–400 km | 2 days |
| 401–600 km | 3 days |
| 601–800 km | 4 days |
| 801–1,000 km | 5 days |
| 1,001–1,200 km | 6 days |
| 1,201–1,400 km | 7 days |
| 1,401–1,600 km | 8 days |
| 1,601–1,800 km | 9 days |
| 1,801–2,000 km | 10 days |
| Every additional 200 km | +1 day |

The maximum distance accepted in an e-way bill is 4,000 km, which gives 20 days.

## Validity table for ODC

| Distance | Validity |
|---|---|
| Up to 20 km | 1 day |
| 21–40 km | 2 days |
| 41–60 km | 3 days |
| 81–100 km | 5 days |
| 181–200 km | 10 days |
| Every additional 20 km | +1 day |

## When the clock starts and ends

- **Start:** the time the e-way bill becomes valid for movement — that is, when Part B is first filled. If you fill Part A today and the transporter fills Part B tomorrow, validity counts from tomorrow's Part B entry.
- **End of day one:** midnight of the day following that start date.
- **Each further day:** another 24 hours, ending at midnight.

So the clock effectively gives you the rest of the start day for free — and "1 day" is not a fixed 24 hours. The hours you actually get depend on when you start.

**Example (illustrative):** a Vapi chemical trader moves goods 180 km (1 day of validity).

| Valid for movement from | Valid until | Actual hours available |
|---|---|---|
| 9:00 am, 14 Sept | 11:59 pm, 15 Sept | about 39 hours |
| 10:30 pm, 14 Sept | 11:59 pm, 15 Sept | about 25.5 hours |
| 12:05 am, 15 Sept | 11:59 pm, 16 Sept | about 48 hours |

### Working it out in three steps

1. Take the approximate distance on the e-way bill.
2. Divide by 200 (or 20 for ODC) and round up to get the number of days.
3. Day one ends at midnight after the start date; add the remaining days, each ending at the next midnight.

The portal shows the "valid upto" date and time on every e-way bill — always check it against your expected arrival.

## Worked examples with timestamps

### Example (illustrative) 1: short distance

A Rajkot pipe manufacturer generates an e-way bill with Part B on **14-10-2026 at 10:15** for 180 km.

- Validity: 1 day
- Valid till: **15-10-2026, 23:59**

### Example (illustrative) 2: late-night generation

Same route, but generated on **14-10-2026 at 23:40**.

- Validity: 1 day
- Valid till: **15-10-2026, 23:59** — about 24 hours, not 48.

Generating just before midnight shortens the effective window. If dispatch is in the morning, generating after midnight gives an extra day.

### Example (illustrative) 3: medium distance

A Morbi tile trader enters Part B on **13-10-2026 at 16:30** for 620 km.

- Validity: 4 days (601–800 km band)
- Valid till: **17-10-2026, 23:59**

### Example (illustrative) 4: Part B filled later

Part A generated **13-10-2026 at 18:00** with Transporter ID; transporter fills Part B **14-10-2026 at 07:45**. Distance 350 km.

- Validity: 2 days, counted from Part B
- Valid till: **16-10-2026, 23:59**

### Example (illustrative) 5: ODC

A Vadodara fabricator moves a pressure vessel as ODC, Part B on **14-10-2026 at 09:00**, distance 95 km.

- Validity: 5 days (81–100 km band)
- Valid till: **19-10-2026, 23:59**

As normal cargo, the same 95 km would get only 1 day — which is why the vehicle type must be selected correctly.

## Extending validity

When goods cannot reach the destination in time because of exceptional circumstances — an accident, a natural calamity, law and order trouble, trans-shipment delay, or another genuine reason you record on the portal — the validity can be extended.

| Point | Rule |
|---|---|
| Who can extend | The generator of the e-way bill, or the transporter assigned to it (the one in charge of Part B) |
| When | Within 8 hours before expiry or 8 hours after expiry |
| What you enter | Reason, current place (location and PIN), remaining distance, vehicle details |
| How much extra time | Calculated on the remaining distance using the same 200 km / 20 km rule |
| Overall cap | As reported by GSTN, total validity with extensions cannot exceed 360 days from original generation (from 1 January 2025) |

### Example (illustrative) 6: extension window

Bill valid till **16-10-2026, 23:59**. The truck breaks down near Udaipur with 260 km to go.

- Extension window: **16-10-2026, about 16:00** to **17-10-2026, about 08:00**.
- Remaining distance 260 km gives 2 more days, calculated from the time of extension.

If the window is missed, the extension option closes. Check the portal for the exact behaviour on your screen, and see [What to Do When an E-Way Bill Expires](/blog/what-to-do-when-eway-bill-expires) for the next steps.

## What happens when it expires

- An expired e-way bill cannot be used for movement.
- You cannot extend it once the 8-hour post-expiry window has passed.
- The goods in transit need a fresh e-way bill before moving further. The old one cannot be cancelled after 24 hours from generation, so keep records explaining why a second bill was generated.
- Goods moving on an expired bill can be detained and a penalty levied under Section 129.

## Validity for different modes and situations

| Situation | How validity works |
|---|---|
| Road, single vehicle | Distance-based, from Part B entry |
| Part B updated to a new vehicle mid-route (breakdown, trans-shipment) | Validity does not restart; original expiry continues |
| Transporter changed | Validity does not change; the clock keeps running |
| Recipient accepts or rejects | A separate step; does not affect the validity period |
| Rail, air or ship | Same distance-based rule, from the time Part B (transport document) is entered |
| Part A only under the 50 km same-state rule | Bill not valid for long-distance movement until Part B is filled |
| Consolidated e-way bill (EWB-02) | Each underlying e-way bill keeps its own validity |

## Common mistakes

- Counting hours instead of calendar midnights ("1 day = 24 hours").
- Rounding down: 201 km is 2 days, not 1, and 410 km is 3 days, not 2.
- Assuming validity starts at Part A generation when Part B was filled later (it starts later, which is in your favour).
- Generating the bill the night before when the truck leaves the next evening — it eats into validity.
- Missing the 8-hour extension window over a weekend; set a reminder for long trips.
- Entering a much shorter distance — a lower distance means fewer days, and the portal will flag distances that do not match PIN codes. Enter the realistic route distance (up to 10% above the PIN-to-PIN figure). More in [How Distance Affects E-Way Bill Validity](/blog/how-distance-affects-eway-bill-validity).
- Not selecting ODC when it applies, or selecting it when it does not. ODC has a specific definition.

## Tips

- Generate in the morning of dispatch, not late the previous night.
- Ask the transporter to message you the moment a delay looks likely.
- For long routes, note the expiry on the LR so the driver knows.
- Check distance and expected travel time together when you prepare the invoice. The free [distance calculator](/tools/distance-calculator) gives an estimate; the E-Way Easy app also calculates distance from PIN codes as part of the invoice flow and lets you edit it, so the validity implication is visible before the bill is finalised.

## Official sources

Validity and extension are governed by Rule 138(10) and portal functionality. Check the current position on the [e-way bill portal](https://ewaybillgst.gov.in/) and in the [user documentation](https://docs.ewaybillgst.gov.in/), and read the rule on [CBIC GST](https://cbic-gst.gov.in/).
