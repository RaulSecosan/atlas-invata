PRAGMA foreign_keys = ON;
CREATE TABLE continents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_label TEXT NOT NULL,
  description TEXT NOT NULL,
  fact TEXT NOT NULL
);
CREATE TABLE countries (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  continent_id TEXT NOT NULL REFERENCES continents(id),
  note TEXT NOT NULL DEFAULT '',
  area_km2 REAL NOT NULL CHECK(area_km2 >= 0)
);
CREATE INDEX countries_continent_idx ON countries(continent_id);
CREATE TABLE capitals (
  country_code TEXT NOT NULL REFERENCES countries(code),
  position INTEGER NOT NULL CHECK(position >= 0),
  name TEXT NOT NULL,
  PRIMARY KEY(country_code, position)
);
CREATE TABLE assets (
  path TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK(kind IN ('flag', 'illustration')),
  country_code TEXT REFERENCES countries(code),
  alt_text TEXT NOT NULL
);
