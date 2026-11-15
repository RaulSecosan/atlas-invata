export const worlds = [
  {
    id: "sun",
    name: "Soarele",
    type: "Stea",
    diameter: 1392700,
    au: 0,
    years: 0,
    size: 1.62,
    color: "#ffaf45",
    summary:
      "În nucleu, fuziunea transformă hidrogenul în heliu și eliberează energie. Lumina Soarelui ajunge la Pământ în aproximativ 8 minute și 20 de secunde.",
  },
  {
    id: "mercury",
    name: "Mercur",
    type: "Planetă stâncoasă",
    diameter: 4879,
    au: 0.39,
    years: 0.24,
    size: 0.18,
    color: "#aaa398",
    summary:
      "Cea mai apropiată planetă de Soare. Nu are o atmosferă densă care să distribuie căldura, iar temperaturile variază puternic.",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Planetă stâncoasă",
    diameter: 12104,
    au: 0.72,
    years: 0.62,
    size: 0.29,
    color: "#dfb16c",
    summary:
      "Atmosfera densă de dioxid de carbon produce un efect de seră puternic. Este cea mai fierbinte planetă, chiar dacă Mercur e mai aproape de Soare.",
  },
  {
    id: "earth",
    name: "Pământ",
    type: "Planetă stâncoasă",
    diameter: 12756,
    au: 1,
    years: 1,
    size: 0.31,
    color: "#397edb",
    summary:
      "O planetă cu oceane lichide la suprafață și singurul loc unde știm că există viață. Înclinarea axei sale explică anotimpurile, nu apropierea de Soare.",
  },
  {
    id: "mars",
    name: "Marte",
    type: "Planetă stâncoasă",
    diameter: 6792,
    au: 1.52,
    years: 1.88,
    size: 0.24,
    color: "#c96549",
    summary:
      "Oxizii de fier îi dau culoarea roșiatică. Relieful păstrează urmele apei lichide din trecut, iar astăzi există depozite de gheață.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gigant gazos",
    diameter: 142984,
    au: 5.2,
    years: 11.86,
    size: 0.84,
    color: "#c79679",
    summary:
      "Cea mai mare planetă. Marea Pată Roșie este o furtună, iar printre sateliți se află Europa, care are dovezi puternice pentru un ocean sub gheață.",
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gigant gazos",
    diameter: 120536,
    au: 9.58,
    years: 29.45,
    size: 0.73,
    color: "#d7bb89",
    summary:
      "Inelele sunt alcătuite în mare parte din particule de gheață. Titan, unul dintre sateliții săi, are o atmosferă densă și lacuri de hidrocarburi.",
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Gigant de gheață",
    diameter: 51118,
    au: 19.2,
    years: 84,
    size: 0.48,
    color: "#7bced2",
    summary:
      "Axa de rotație este înclinată cu aproape 98°, așa că planeta pare să se rostogolească pe orbită. Metanul din atmosferă contribuie la culoarea ei.",
  },
  {
    id: "neptune",
    name: "Neptun",
    type: "Gigant de gheață",
    diameter: 49528,
    au: 30.05,
    years: 164.8,
    size: 0.47,
    color: "#617fcf",
    summary:
      "Cea mai îndepărtată dintre cele opt planete. Are vânturi foarte puternice. Triton, satelitul său mare, se deplasează în sens opus rotației planetei.",
  },
  {
    id: "pluto",
    name: "Pluto",
    type: "Planetă pitică",
    diameter: 2377,
    au: 39.48,
    years: 248,
    size: 0.15,
    color: "#c7a998",
    summary:
      "O lume din centura Kuiper. New Horizons a observat o câmpie în formă de inimă, cu gheață de azot. Orbita sa reală este eliptică și înclinată.",
  },
  {
    id: "moon",
    name: "Luna",
    type: "Satelit natural",
    diameter: 3475,
    au: null,
    years: null,
    size: 0.13,
    color: "#b6bcca",
    summary:
      "Luna parcurge o orbită față de stele în circa 27,3 zile; de la o Lună nouă la următoarea trec cam 29,5 zile. Craterele și câmpiile vulcanice îi marchează suprafața.",
  },
] as const;
export type World = (typeof worlds)[number];
export type WorldId = World["id"];
export const orbits = [
  0, 2.5, 3.65, 4.95, 6.2, 8.0, 10.3, 12.5, 14.2, 15.65,
] as const;
export const periodYears = (au: number) => au ** 1.5;
export const transitPercent = (ratio: number) => ratio ** 2 * 100;
