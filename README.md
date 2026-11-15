# Atlas — Matematică și Geografie

Aplicație educațională în limba română, cu design „Atlas modern”.

**Site:** https://raulsecosan.github.io/atlas-invata/

- Exerciții de matematică pe operații și niveluri.
- Explorarea a 7 continente și 197 de țări/state, cu steaguri și capitale.
- Quizuri pentru capitale și continente, cu selecție de țări și feedback.
- Observator **Spațiu**: explorator 3D (WebGL), 21 de lecții cu surse primare, laboratoare pentru orbite, tranzite și plante pe ISS, plus quiz. Modelul 3D este ilustrativ și se încarcă separat.
- Istoric local al rezultatelor, păstrat în browserul dispozitivului.
- Mod luminos / întunecat, cu preferință salvată.
- Calendar de prezență, notițe pe zile și statistici de consecvență.
- Conținut și imagini găzduite în repository, fără servicii plătite de backend.

## Dezvoltare

```sh
npm ci
npm run dev
```

## Verificare

```sh
npm test
npm run build
npx tsc --noEmit -p tsconfig.app.json
```

[Design, date și surse](ATLAS.md) · [Publicare](DEPLOYMENT.md) · [Export SQLite](database/README.md)

Publicarea pe GitHub Pages se face automat după push în `main`, prin GitHub Actions. Exportul SQLite este un backup al catalogului; site-ul static folosește JSON și imagini. Nu există conturi sau sincronizare a progresului între dispozitive.
