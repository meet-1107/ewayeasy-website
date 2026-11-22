# Overseas market research: one country, one genuine problem (21 Nov 2026)

Goal: one overseas market where (1) a real, evidenced compliance problem exists, (2) our software can solve it simply, (3) people already pay for it, priced in dollars.

13 countries were researched in three parallel passes (Latin America dollar economies, Europe, Mexico/Gulf/Africa). Facts below are marked **[Primary]** (read in the official text), **[Press]** (trade or national press, quote checked) or **[Inference]**.

## Recommendation: Spain, the electronic road-freight control document (DeCA)

### The problem is real and live
- **[Primary]** Law 9/2025 of 3 December (Ley de Movilidad Sostenible), transitional provision 8: the administrative control document for public road freight (Orden FOM/2861/2012) "deberá ser necesariamente digital a los diez meses" after the law entered into force. Paper stopped being valid on **5 October 2026** [Press, trans.info 9.10.2026; Interempresas 5.10.2026].
- **[Primary]** It covers every domestic for-hire road freight trip in Spain, including cabotage by foreign carriers (BOE-A-2026-12784, preamble).
- **[Press]** Drivers were fined "superiores a 400 euros" in October; the Ministry ordered files closed only where the sole issue was that police tablets could not read the document between 5 and 19 October (trans.info, 23.10.2026). Fines for missing data or no document still stand.
- **[Press]** Hauliers' associations complain publicly: CETM says some shippers hand the whole document to the carrier and "se pretende cobrar al transportista por cada DeCA generado"; FENADISMER says shippers "obligan a los conductores a registrarse en sus propias plataformas" (trans.info, 9.10.2026).
- **[Press]** Price chaos: FENADISMER found offers "desde alrededor de 5 euros" with some "más de un 1.000%" higher, and tools that may not meet the legal requirements (trans.info, 11.09.2026). The price unit (per document or per month) is not stated in the article.

### Our software can solve it without any government integration
From the official resolution, BOE-A-2026-12784 (5 June 2026) **[Primary]**:
- The document is a **native digital PDF, max 5 MB**, with creation and modification date-times as PDF metadata. Scans are not valid.
- The PDF must carry a **QR code with a unique HTTPS URL** (TLS 1.2+) that **downloads the PDF directly**: no login, no download button.
- The file sits in a repository whose domain "**podrá ser cualquiera y no requerirá comunicación previa**". Nothing is filed with the government, so no certification and no API are needed.
- The shipper (cargador contractual) and the actual carrier (transportista efectivo) keep the files **at least 1 year**. The download link may be switched off 7 days after the trip ends.
- **A signature is not required.** If used, it must be at least an advanced e-signature (AdES).
- Changes during the trip: either amend the same PDF (old data kept and marked invalid, with the reason) or issue a new PDF and keep the original.
- Several shipments can share one document if the shipper and the carrier are the same.
- The driver must carry a copy before departure, on a phone or on paper, with the QR code. Showing only the QR code is accepted.
- Required data = article 6 of Orden FOM/2861/2012 (to be checked field by field before building).

**[Inference]** This is almost exactly what E-Way Easy already does in India: make a transport document from business data, put a QR on it and get it to the driver's phone. The difference is that we also host the file.

### Willingness to pay
- **[Press]** Businesses are already being charged (from about €5 up to 10x more) and shippers are trying to bill carriers per document.
- **[Inference]** A simple, honest, per-document price for owner-drivers and small hauliers is a gap. Spain is in the euro area, where USD pricing is technically possible (Stripe) but EUR is what buyers expect.

### Risks
- Hosting duty: the PDF must stay downloadable during the trip and be kept for 1 year, so uptime matters. The current site is a static export, so this needs Firebase Storage plus a small backend.
- GDPR: names and tax IDs are personal data, so EU hosting and a privacy policy are needed.
- Spanish-language product and support.
- Large players (Edicom, Routal, Docusign) and shipper platforms already exist. The gap is small hauliers, not large shippers.
- eFTI (EU electronic freight information) applies from July 2027 and is an alternative way to comply.

## Runner-up: El Salvador (true USD market)
- **[Press]** Electronic tax documents (DTE) are mandatory in phases. Only 13.02% of 111,038 taxpayers had adopted by the end of 2024, including 20% of small ones. Small merchants call it "complejo y hasta costoso" (El Diario de Hoy, 18.11.2025). The deadline slipped from May 2025 to mid-2026.
- Open to any developer (no PAC), with free government signature certificates. Fully dollarized economy.
- Weaker fit: it is invoicing, not a transport document. Each customer must complete issuer authorisation, Hacienda's free tool caps prices for the smallest users, and the build needs integration with Hacienda's web service.

## Others ruled out (short reasons)
| Country | Why not first |
|---|---|
| Saudi Arabia | Hard deadline 1 Feb 2027 and USD peg, but little documented SME pain; crowded |
| UAE | 88 accredited providers already; heavy accreditation |
| Mexico (Carta Porte) | Strong pain, but floating peso, PAC needed and the SAT app is free |
| Kenya (eTIMS) | Strong pain, but floating shilling and local certification |
| Greece (digital delivery note) | Live from 12 Oct 2026, but free government app; private prices not found |
| Romania (e-Transport) | Real fines, but small volume (~84k transports a year) and cheap local tools |
| Portugal, Poland, Ecuador, Panama | Mature or saturated, certification barriers, or penalties suspended |

Sources: BOE-A-2026-12784 (boe.es); trans.info 11.09.2026, 9.10.2026, 23.10.2026; Interempresas 5.10.2026; El Diario de Hoy 18.11.2025; ZATCA, KPMG, EY, Khaleej Times, Business Daily, Primicias, Edicom and others as listed in the research notes.
