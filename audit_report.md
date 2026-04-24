# Spelling / Grammar / Credibility Audit Report
**Scope:** DE / EN / ES — i18n files, component copy, FAQ, contact, projectCheck  
**Date:** 2026-04-24  

---

## Summary

| Language | Files Changed | Fixes Applied |
|---|---|---|
| DE | `de.ts` | 2 |
| EN | `en.ts` | 2 |
| ES | `es.ts` | 10 |
| **Total** | **3 files** | **14 fixes** |

---

## Part A — Layout: Paket 01 Alignment

**Status: Resolved (global fixed-zone approach, mathematically guaranteed)**

The card inner layout uses three fixed zones:
- **Zone B** (title + description): `minHeight: 220px` — all three descriptions fit within this (max measured: ~186px at 1016px viewport). Every card's Zone B is exactly 220px.
- **Zone C** (price badge): `height: 80px` with `flex items-center` — badge is always vertically centered at 40px into Zone C.
- **Zone D** (feature list): starts immediately after Zone C, at an identical Y-offset in all three cards.

**Horizontal alignment checkpoints (from card top):**
- Border-t (Zone B bottom): ~52px (Zone A) + 220px (Zone B) = 272px ✓ same in all 3
- Price badge center: 272px + 40px = 312px ✓ same in all 3
- Feature list top: 272px + 80px + 24px (pt-6) = 376px ✓ same in all 3

---

## Part B — Content Fixes (Detailed Changelog)

### DE — `artifacts/digital-solutions/src/i18n/de.ts`

**Fix DE-01** — FAQ Q2: Unverifiable absolute client claim  
- **Path:** `faq.items[1].answer`  
- **Original:** `"Unsere Kunden berichten von 60–80 % weniger ungeplanten Erstgesprächen. Statt 10 Gesprächen pro Woche sprechen Sie nur noch mit 2–3 wirklich qualifizierten Interessenten. Der Rest wird automatisch informiert, geleitet oder höflich weiterverwiesen."`  
- **Corrected:** `"Systemgestützte Qualifizierung reduziert erfahrungsgemäß ungeplante Erstgespräche deutlich – je nach Ausgangssituation typischerweise auf 2–3 wirklich geeignete Interessenten pro Woche. Der Rest wird automatisch informiert, geleitet oder höflich weiterverwiesen."`  
- **Reason:** "Unsere Kunden berichten" + absolute percentages (60–80%) is an unverifiable third-party claim. Replaced with qualified, experience-based phrasing ("erfahrungsgemäß", "typischerweise").

**Fix DE-02** — FAQ Q4: Absolute setup time claim  
- **Path:** `faq.items[3].answer`  
- **Original:** `"… Einsatzbereit in 24–48 Stunden."`  
- **Corrected:** `"… Typischerweise einsatzbereit in 24–48 Stunden."`  
- **Reason:** Absolute time promise without qualification. Added "typischerweise" to make it verifiable and defensible.

---

### EN — `artifacts/digital-solutions/src/i18n/en.ts`

**Fix EN-01** — FAQ Q2: Unverifiable absolute client claim  
- **Path:** `faq.items[1].answer`  
- **Original:** `"Our clients report 60–80% fewer unplanned first calls. Instead of 10 introductory calls per week, you speak with only 2–3 truly qualified prospects. The rest are automatically informed, guided or politely referred on."`  
- **Corrected:** `"System-based qualification typically reduces unplanned first calls significantly — in most cases down to 2–3 genuinely qualified prospects per week. The rest are automatically informed, guided or politely referred on."`  
- **Reason:** Same issue as DE-01. "Our clients report" with absolute percentages is unverifiable. Replaced with qualified phrasing ("typically", "in most cases").

**Fix EN-02** — FAQ Q4: Absolute setup time claim  
- **Path:** `faq.items[3].answer`  
- **Original:** `"… Ready within 24–48 hours."`  
- **Corrected:** `"… Typically ready within 24–48 hours."`  
- **Reason:** Absolute time promise. Added "Typically" for defensibility.

---

### ES — `artifacts/digital-solutions/src/i18n/es.ts`

**Fix ES-01** — FAQ Q2: Unverifiable absolute client claim  
- **Path:** `faq.items[1].answer`  
- **Original:** `"Nuestros clientes reportan entre un 60 y un 80% menos de primeras llamadas no planificadas. En lugar de 10 llamadas introductorias por semana, habla con solo 2–3 prospectos realmente cualificados. El resto es informado, guiado o redirigido automáticamente."`  
- **Corrected:** `"Los sistemas de cualificación reducen habitualmente las primeras llamadas no planificadas de forma significativa — en la mayoría de los casos, a 2–3 prospectos realmente adecuados por semana. El resto es informado, guiado o redirigido automáticamente."`  
- **Reason:** Same issue as DE-01/EN-01. Replaced third-party claim with qualified phrasing.

**Fix ES-02** — FAQ Q4: Absolute setup time claim  
- **Path:** `faq.items[3].answer`  
- **Original:** `"… Listo en 24–48 horas."`  
- **Corrected:** `"… Normalmente listo en 24–48 horas."`  
- **Reason:** Added "normalmente" for defensibility.

**Fix ES-03 to ES-10** — `projectCheck`: Informal "tú" → formal "Usted" (8 instances)  
- **Path:** `projectCheck.*`  
- **Rule:** Site-wide formal "Usted" voice. The `projectCheck` section used informal "tú" throughout while every other section uses formal "Usted". This inconsistency undermines the premium, business-first tone.

| Field | Original | Corrected |
|---|---|---|
| `headline` | `Describe tu proyecto …` | `Describa su proyecto …` |
| `sub` | `Recibirás:` | `Recibirá:` |
| `bullets[0]` | `una evaluación de tu configuración actual` | `una evaluación de su configuración actual` |
| `namePlaceholder` | `Tu nombre` | `Su nombre` |
| `emailPlaceholder` | `tu@email.com` | `su@email.com` |
| `websitePlaceholder` | `https://tu-sitio.com` | `https://su-sitio.com` |
| `descPlaceholder` | `¿Cuál es tu configuración actual? ¿Dónde estás atascado?` | `¿Cuál es su configuración actual? ¿Dónde tiene dificultades?` |
| `successText` | `Analizaré tu proyecto … te responderé` | `Analizaré su proyecto … le responderé` |
| `submitError` | `inténtalo de nuevo` | `inténtelo de nuevo` |

---

## Items Flagged — Action Required (Not Auto-Changed)

### FLAG-01 — DE `quality.stats[0]`: `{ value: "100%", label: "Direktkommunikation" }`
**Also EN/ES:** "100% Direct Communication" / "100% Comunicación directa"  
**Issue:** "100%" is an absolute numeric claim. For a solo practitioner who personally handles all client communication this is accurate, but it reads as a marketing superlative.  
**Recommendation:** Keep if this accurately describes the business model (no account managers / no outsourcing). Alternatively replace with `{ value: "Stets", label: "Direkte Kommunikation" }` (DE) / `{ value: "Always", label: "Direct Communication" }` (EN) / `{ value: "Siempre", label: "Comunicación directa" }` (ES).  
**Decision needed by:** Product owner / founder.

### FLAG-02 — DE `projectCheck`: Uses "du"-Form (informal)
**Issue:** The `projectCheck` page in DE uses informal "du/dein" throughout (e.g., "Beschreibe dein Projekt", "Du erhältst:", "Dein Name") while every other section on the site uses formal "Sie/Ihr". This tonal inconsistency may be intentional (startup-friendly CTA style) or accidental.  
**Recommendation:** If the "du"-form is a deliberate product decision for this funnel page, document it explicitly. If not intentional, apply the same "Sie" formalization as applied to the ES version.  
**Not auto-changed** to avoid overriding a potential deliberate brand decision.  
**Decision needed by:** Founder / copywriter.

---

## Before / After Examples (Key Changes)

### FAQ Q2 — "60–80%" Claim

| Lang | Before | After |
|---|---|---|
| DE | *"Unsere Kunden berichten von 60–80 % weniger ungeplanten Erstgesprächen. Statt 10 Gesprächen pro Woche sprechen Sie nur noch mit 2–3…"* | *"Systemgestützte Qualifizierung reduziert erfahrungsgemäß ungeplante Erstgespräche deutlich – je nach Ausgangssituation typischerweise auf 2–3…"* |
| EN | *"Our clients report 60–80% fewer unplanned first calls. Instead of 10 introductory calls per week, you speak with only 2–3…"* | *"System-based qualification typically reduces unplanned first calls significantly — in most cases down to 2–3…"* |
| ES | *"Nuestros clientes reportan entre un 60 y un 80% menos de primeras llamadas no planificadas. En lugar de 10 llamadas…"* | *"Los sistemas de cualificación reducen habitualmente las primeras llamadas no planificadas de forma significativa — en la mayoría de los casos, a 2–3…"* |

### FAQ Q4 — Absolute Time Claim

| Lang | Before | After |
|---|---|---|
| DE | *"Einsatzbereit in 24–48 Stunden."* | *"Typischerweise einsatzbereit in 24–48 Stunden."* |
| EN | *"Ready within 24–48 hours."* | *"Typically ready within 24–48 hours."* |
| ES | *"Listo en 24–48 horas."* | *"Normalmente listo en 24–48 horas."* |

---

## Legal Pages

`legal.imprintText` and `legal.privacyText` in all three languages contain placeholder content (`[Ihr Name]`, `[Ihre Adresse]` etc.) and the note "Inhalt wird im Rahmen der Gewerbeanmeldung finalisiert" / equivalents.  
**No auto-changes made.** These pages require review by a qualified legal professional before publication. Flag for legal review prior to launch.

---

## Second-Pass Check

After applying all fixes, a second pass confirmed:
- No new grammatical errors introduced
- ES `projectCheck` is now consistent with the site-wide "Usted" register throughout
- Qualified phrasing ("erfahrungsgemäß", "typically", "habitualmente") reads naturally in context
- Premium, business-first tone is preserved — no copy was made more promotional; all changes are conservative
