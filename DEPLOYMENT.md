# Publicare gratuită pe GitHub Pages

Aplicația este statică: conținutul și imaginile stau în repository, iar istoricul rămâne în browser. Nu există un serviciu de baze de date cu abonament. Repository-ul trebuie să fie public pentru GitHub Pages pe GitHub Free.

## Publicare

1. Încarcă proiectul într-un repository GitHub, pe ramura `main`.
2. În Settings → Pages → Build and deployment, alege **GitHub Actions**.
3. Workflow-ul `.github/workflows/pages.yml` testează, compilează și publică automat site-ul la fiecare push în `main`. Poate fi pornit și manual din Actions.
4. Adresa finală este afișată în workflow-ul de deploy și în Settings → Pages.

Workflow-ul configurează automat prefixul URL al repository-ului. Navigarea folosește hash (`/#/geografie`), astfel încât refresh-ul și linkurile directe să funcționeze pe GitHub Pages. Steagurile folosesc prefixul configurat la compilare.

## Catalog și progres

- Țări: `src/data/countries.json`.
- Continente: `src/data/continents.json`.
- Imagini: `public/flags/` și `public/atlas-landscape.png`.
- Export relațional de backup: `database/atlas.sqlite`, `database/content.sql`.
- Progres matematică și geografie: localStorage în browser, fără conturi și fără sincronizare între dispozitive.

După modificarea conținutului, regenerează exportul cu `python3 scripts/export-content-database.py`, apoi încarcă schimbările. Baza SQLite nu rulează pe GitHub Pages; aplicația folosește catalogul JSON compilat.

Planurile gratuite ale furnizorilor au limite. Pentru funcții viitoare cu scriere centralizată, Supabase Free oferă PostgreSQL, autentificare și storage; Cloudflare Pages/Workers + D1 oferă hosting și SQLite gestionat. Activarea unui astfel de serviciu ar necesita un cont separat și o implementare de backend.
