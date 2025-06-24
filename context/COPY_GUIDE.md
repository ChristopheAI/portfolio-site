# Copywriter Guide – Portfolio Website CVH

This document serves as the canonical reference for anyone who writes or reviews copy in this project. It distils two sources:

1. "Een stap-voor-stap handleiding om Andy's schrijfstijl exact te kopiëren"  
2. "33 copywritingtips voor betere bedrijfsteksten"

---

## 1. Tone-of-Voice Snapshot (aka *Andy-stijl*)

**🎯 B2B Software Focus:**
Target audience: Enterprise software consultancies (Déhora-type), workforce management companies, B2B SaaS in Belgium/Netherlands. Emphasize: multi-project management, deadline delivery, enterprise complexity, business process understanding.

+**💼 Relaxy Experience - Copy Guidelines:**

**Wat er gebeurde (Feb-April 2025):**
- Leerde Relaxy SaaS platform van binnen en buiten kennen
- Deed marktonderzoek naar bestaande software bij bedrijven
- Prospecteerde bedrijven om hun huidige tech stack te begrijpen
- Ontdekte via research welke tools/software ze al gebruikten

**Hoe dit te verwoorden (Andy-stijl):**
✅ "Dook drie maanden diep in de Relaxy SaaS wereld"
✅ "Ontdekte welke software bedrijven écht gebruiken (niet wat ze zeggen dat ze gebruiken)"
✅ "Van platform-expert naar marktonderzoeker in 90 dagen"
✅ "Leerde hoe je concurrentie-analyse doet die klopt"

**Voordelen voor B2B positioning:**
- SaaS platform kennis = begrijpt subscription business models
- Marktonderzoek skills = kan concurrentie analyseren
- Prospectie ervaring = weet hoe je bedrijven benadert
- Tech stack research = begrijpt enterprise software landscape

| Element | Richtlijn |
|---------|-----------|
| **Persoonlijk** | Open met een mini-anekdote van 1–2 zinnen. |
| **Structuur** | Gebruik *Drie Snelle Updates* (⏱️ 1 min. leestijd) of bullets van max. 4 zinnen. |
| **Dialoog** | Spreek de lezer direct aan (je/jij). Stel minstens één vraag. |
| **Energie & Humor** | Korte uitroepen: "Yes!", "Feest!", "Wow!" |
| **Social Proof** | Verwerk 1 naam, award of meetbaar resultaat. |
| **Zachte CTA** | Sluit af met uitnodigende vraag + laagdrempelig actie. |

> **Template**  
> ```markdown
> [Mini-anekdote]
>
> Drie snelle updates (⏱️ 1 min. leestijd):
>
> 1/ **Titel**  
> 2–4 zinnen.
>
> 2/ **Titel**  
> 2–4 zinnen.
>
> 3/ **Titel**  
> 2–4 zinnen.
>
> [Uitroep] Wow!
>
> Hoe kijk jij hiernaar? Reageer gerust.
> ```

---

## 2. 33 Copy-Quick-Checks

**Visuele kapstokken**  
1 Lettergrootte ≥ 11 pt  2 Korte alinea's  3 Witruimte  4 Tussenkoppen ≤ 1 regel  5 Leeszwaartekracht  6 Zuinig onderstrepen  7 Bullets (≤ 5, kort→lang)

**Headline boosters**  
8 Stopkracht samenvatting  9 Voordeel benoemen  10 Geen woordspelingen  11 Vermijd ja-nee-vragen  12 Prikkelende vraag  13 Geloofwaardig blijven  14 Gratis aanbod / korting  15 Story/testimonial  16 Waarschuwing-kop

**Dialoogkracht**  
17 Schrijf voor één persoon  18 Lezer > Schrijver  19 Woordkeus check  20 Eenvoudige woorden  21 Korte woorden  22 Oprechtheid  23 Spreektaal  24 Hardop lezen  25 Variatie in zinslengte

**Ballast schrappen**  
26 Lege hulpwerkwoorden  27 -schap/-heid/-ing  28 'Hopen'  29 Containerwoorden  30 Overbodige bijvoeglijke nw.  31 Emotionele bijv. nw.  32 Drempelwoorden  33 Schrap 'maar' ⇢ 'en'

---

## 3. Process

1. **Bronbestanden**  
   Alle tekst staat in `content/*.md` of `src/data/copy.json` en *niet* hard-coded in HTML waar mogelijk.

2. **PR-flow**  
   1. Branch `copy/<ticket>`  
   2. Markdown diff + screenshot(s) in PR  
   3. Labels: `copy:*`  
   4. Reviewervolgorde: Design → Dev → PM.

3. **Linting**  
   CI checkt op stopwoorden & drempelwoorden via `alex` + custom rules (TODO).

---

## 4. Quick Reference Cheatsheet

```txt
✅ Mini-anekdote
✅ 3 Snelle Updates (≤ 4 zinnen elk)
✅ Directe vraag aan lezer
✅ Uitroep / spreektaal
✅ 1 stuk social proof (naam/resultaat)
✅ Zachte CTA
✅ Controleer 33 tips checklist
``` 