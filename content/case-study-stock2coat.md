***

id: case-study-stock2coat
section: Stock2coat Case Study
------------------------------

# Stock2coat Case Study Copy

## Header

Title: Stock2coat\
Subtitle: Maatwerk voorraad-app die 90 % tijd bespaart op poederbeheer

## Meta

Status: ✅ Live & in productie\
Timeline: 14 dagen van idee tot lancering\
Rol: Solo-developer (full-stack)  

---

## Challenge

Nicolas startte een poederlakkerij maar verloor elke week uren met manuele Excel-tellingen.  
• Geen realtime inzicht in 57 poederdozen  
• Onzeker voorraadniveau → risico op stilstand  
• Weegmomenten werden niet centraal gelogd

## Oplossing

Ik bouwde **Stock2coat**: een webapp met React 18, TypeScript en een Node.js API.  
• Poederdoos wegen op digitale weegschaal → waarde wordt live ingelezen  
• Centrale database (PostgreSQL via Neon) houdt verbruikshistoriek bij  
• Dashboard toont statuscodes (OK/LOW/EMPTY) met kleurindicatie  

## Implementatie

1. Systeemdiagram & databank-schema in dag 1  
2. MVP in Replit binnen 5 dagen; iteraties met Nicolas via WhatsApp-feedback  
3. Integratie Shadcn/ui en Responsive layout  
4. Deploy op Vercel + automatisering dagelijkse backup

## Impact

• **90 % minder tijd** nodig voor voorraadregistratie  
• **2 uur per dag** vrijgespeeld → € 730/maand besparing aan arbeidsuren  
• Geen stock-outs meer sinds ingebruikname (3 maanden)  

> "Je hebt dit laten werken als een droom, maat." — *Nicolas, zaakvoerder ML Coating*

## Meetbare Resultaten

| KPI | Voor | Na |
| --- | --- | --- |
| Tijd per telling | 5 min | 30 sec |
| Dagelijkse registratietijd | 120 min | 12 min |
| Stock-outs per kwartaal | 4 | 0 |

---

## Stack & Tools

Frontend → React 18, TypeScript, Vite  
Backend → Node.js, Express, Drizzle ORM  
Database → PostgreSQL (Neon)  
CI/CD → Vercel + GitHub Actions  
AI-tools → Replit AI, Cursor, Claude Code  

---

CTA: **Wil jij ook realtime voorraad-inzicht? Plan een kennismaking**
