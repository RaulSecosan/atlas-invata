# Catalogul Atlas

- `atlas.sqlite`: bază de date SQLite portabilă, cu continente, țări, capitale și referințe la imagini.
- `schema.sql`: structura tabelelor.
- `content.sql`: export complet al catalogului, inclusiv datele.

Imaginile se află în `public/`, iar tabela `assets` conține căile către ele. Nu stocăm imagini binare în tabele.

Aplicația statică publicată pe GitHub Pages citește fișierele JSON din `src/data/`, compilate în aplicație. SQLite este un export pentru backup și import într-un serviciu SQL; GitHub Pages nu execută interogări și nu oferă un server de baze de date. Catalogul și imaginile sunt versionate și găzduite împreună cu site-ul. Progresul utilizatorului este păstrat în localStorage pe dispozitiv.

Regenerare după modificarea catalogului:

```sh
python3 scripts/export-content-database.py
```

Exportul nu conține date personale sau progresul utilizatorilor.
