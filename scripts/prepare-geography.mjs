import fs from "node:fs";
const response = await fetch(
  "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
);
if (!response.ok) throw Error("Could not download geography data");
const raw = await response.json();
const names = new Intl.DisplayNames(["ro"], { type: "region" });
const capitals = {
  RO: ["București"],
  FR: ["Paris"],
  IT: ["Roma"],
  DE: ["Berlin"],
  GB: ["Londra"],
  ES: ["Madrid"],
  PT: ["Lisabona"],
  GR: ["Atena"],
  AT: ["Viena"],
  HU: ["Budapesta"],
  PL: ["Varșovia"],
  CZ: ["Praga"],
  RS: ["Belgrad"],
  BG: ["Sofia"],
  BE: ["Bruxelles"],
  DK: ["Copenhaga"],
  SE: ["Stockholm"],
  NO: ["Oslo"],
  FI: ["Helsinki"],
  CH: ["Berna"],
  UA: ["Kiev"],
  RU: ["Moscova"],
  MD: ["Chișinău"],
  TR: ["Ankara"],
  CN: ["Beijing"],
  JP: ["Tokyo"],
  IN: ["New Delhi"],
  US: ["Washington, D.C."],
  MX: ["Ciudad de México"],
  BR: ["Brasília"],
  EG: ["Cairo"],
  ZA: ["Pretoria", "Cape Town", "Bloemfontein"],
  LK: ["Sri Jayawardenepura Kotte"],
  SZ: ["Mbabane", "Lobamba"],
  BO: ["Sucre", "La Paz"],
  NL: ["Amsterdam"],
  MY: ["Kuala Lumpur"],
  KZ: ["Astana"],
  ID: ["Jakarta"],
  NR: [],
  PS: ["Ierusalimul de Est"],
  IL: ["Ierusalim"],
  VA: ["Vatican"],
};
const notes = {
  ZA: "Pretoria: executivă; Cape Town: legislativă; Bloemfontein: judiciară.",
  BO: "Sucre este capitala constituțională; La Paz este sediul guvernului.",
  NL: "Amsterdam este capitala; guvernul se află la Haga.",
  LK: "Sri Jayawardenepura Kotte este capitala legislativă; Colombo găzduiește funcții executive.",
  NR: "Nu are o capitală oficială. Instituțiile guvernamentale se află în districtul Yaren.",
  PS: "Ierusalimul de Est este capitala revendicată; administrația se află la Ramallah. Statutul orașului este disputat.",
  IL: "Ierusalimul este declarat capitală de Israel; statutul său internațional este disputat.",
  XK: "Stat cu recunoaștere internațională parțială.",
  TW: "Statut internațional disputat.",
};
Object.assign(capitals, {
  DZ: ["Alger"],
  AM: ["Erevan"],
  KR: ["Seul"],
  KP: ["Phenian"],
  GT: ["Ciudad de Guatemala"],
  IQ: ["Bagdad"],
  IR: ["Teheran"],
  KW: ["Kuweit"],
  LU: ["Luxemburg"],
  PA: ["Ciudad de Panamá"],
  SM: ["San Marino"],
  SG: ["Singapore"],
  SY: ["Damasc"],
  SO: ["Mogadishu"],
  TJ: ["Dușanbe"],
  TM: ["Așgabat"],
  UZ: ["Tașkent"],
  GQ: ["Ciudad de la Paz"],
});
Object.assign(notes, {
  GQ: "Ciudad de la Paz a fost declarată capitală la 2 ianuarie 2026, înlocuind Malabo.",
  ID: "Transferul instituțiilor către Nusantara se desfășoară în etape. Jakarta rămâne capitală până la decretul de transfer.",
});
const countryNames = {
  CI: "Coasta de Fildeș",
  PS: "Palestina",
  CG: "Republica Congo",
  CD: "Republica Democrată Congo",
};
const countries = raw
  .filter(
    (c) =>
      c.unMember || c.independent || ["VA", "PS", "XK", "TW"].includes(c.cca2),
  )
  .map((c) => ({
    code: c.cca2,
    name: countryNames[c.cca2] ?? names.of(c.cca2),
    capital: capitals[c.cca2] ?? c.capital,
    continent:
      c.region === "Americas"
        ? c.subregion === "South America"
          ? "south-america"
          : "north-america"
        : {
            Europe: "europe",
            Asia: "asia",
            Africa: "africa",
            Oceania: "oceania",
            Antarctic: "antarctica",
          }[c.region],
    note: notes[c.cca2] ?? "",
    area: c.area,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "ro"));
fs.writeFileSync("src/data/countries.json", JSON.stringify(countries, null, 2));
await Promise.all(
  countries.map(async (c) => {
    const url = `https://raw.githubusercontent.com/mledoze/countries/master/data/${raw.find((x) => x.cca2 === c.code).cca3.toLowerCase()}.svg`;
    const r = await fetch(url);
    if (!r.ok) throw Error(url);
    fs.writeFileSync(
      `public/flags/${c.code.toLowerCase()}.svg`,
      await r.text(),
    );
  }),
);
console.log(`Saved ${countries.length} countries with local flags`);
