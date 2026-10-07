# Atlas

Design ales: varianta 2, „Atlas modern”.

## Pornire

```sh
npm install
npm run dev
```

- `/`: alegere Matematică / Geografie.
- `/matematica`: exercițiile și istoricul existente.
- `/geografie`: 7 continente, 197 țări/state, steaguri locale, capitale, căutare fără diacritice.
- `/geografie/quiz`: quiz pentru capitale sau continente; filtrare pe continent și selecție de țări; răspunsuri multiple, feedback și recapitulare finală.

## Verificare

```sh
npm test
npm run build
npx tsc --noEmit -p tsconfig.app.json
node scripts/check-interface.mjs
```

Ultima comandă necesită serverul local pe portul 8080 și Chromium pentru Playwright (`npx playwright install chromium`). Capturile desktop și mobil sunt în `output/`.

## Date și convenții

Datele și steagurile provin din [mledoze/countries](https://github.com/mledoze/countries), cu licența în `public/countries-LICENSE.txt`. Numele țărilor sunt localizate prin `Intl.DisplayNames('ro')`, cu corecții explicite. Sunt incluse statele membre ONU, statele independente din sursă, Vaticanul, Palestina, Kosovo și Taiwan. Teritoriile dependente nu sunt prezentate drept țări.

Folosim modelul cu șapte continente; America Centrală și Caraibele sunt în America de Nord. Țările transcontinentale sunt grupate într-un singur continent conform sursei. Antarctica nu are țări suverane. Nauru nu are capitală oficială și este exclus din quizul de capitale. În cazurile cu mai multe capitale răspunsul corect le listează împreună, cu o explicație după verificare.

Actualizări și explicații:

- [Guvernul Guineei Ecuatoriale: Ciudad de la Paz, 2 ianuarie 2026](https://www.guineaecuatorialpress.com/index.php/noticias/el_presidente_de_la_republica_proclama_la_ciudad_de_la_paz_como_capital_de_la_republica_de_guinea_ecuatorial_con_la_firma_de_un_decreto_ley).
- [Guvernul Africii de Sud: cele trei capitale](https://www.gov.za/south-africa-glance).
- [Indonezia: Jakarta rămâne capitală până la decretul de transfer](https://setkab.go.id/en/president-jokowi-signs-law-on-special-regional-province-of-jakarta/); [autoritatea Nusantara: obiectiv pentru 2028](https://ikn.go.id/id/posts/pembangunan-tahap-ii-ikn-terus-berjalan-otorita-ikn-lakukan-evaluasi-berkala).

Harta este simplificată din [Natural Earth 110m](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson), date public domain. Nu este o hartă politică detaliată; unele state mici nu apar la această scară. Lista țărilor este completă pentru selecția de mai sus.

Regenerarea datelor și a steagurilor: `node scripts/prepare-geography.mjs`. Nu este necesară o conexiune externă pentru date/steaguri în timpul folosirii aplicației; fonturile Google se încarcă online cu fallback local.

## Ilustrație

Fișier: `public/atlas-landscape.png`. Generat cu instrumentul integrat imagegen. Prompt:

> Generate a wide panoramic watercolor illustration for the hero banner of an elegant educational digital atlas. Muted sage green, warm ivory, forest green, soft blue lake, mountains fading into mist, cypress trees and an old European village on the far right, gentle hills left, middle mostly open pale sky for dark text overlaid later. Fine book illustration, refined restrained colors, landscape wide composition. No text, no lettering, no UI. Opaque background.
