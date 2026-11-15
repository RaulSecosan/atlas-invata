export const sources = {
  solar: [
    "NASA · Sistemul Solar",
    "https://science.nasa.gov/solar-system/solar-system-facts/",
  ],
  weather: [
    "NASA · Furtuni solare",
    "https://science.nasa.gov/sun/solar-storms-and-flares/",
  ],
  astrobiology: [
    "NASA · Potențiale biosignături",
    "https://science.nasa.gov/resource/what-is-a-potential-biosignature/",
  ],
  planets: [
    "NASA · Planetele",
    "https://science.nasa.gov/solar-system/planets/",
  ],
  moon: [
    "NASA · Fazele Lunii și eclipsele",
    "https://science.nasa.gov/moon/moon-phases/",
  ],
  stars: ["NASA · Stelele", "https://science.nasa.gov/universe/stars/"],
  galaxies: ["NASA · Galaxiile", "https://science.nasa.gov/universe/galaxies/"],
  holes: [
    "NASA · Găurile negre",
    "https://science.nasa.gov/universe/black-holes/",
  ],
  universe: [
    "NASA · Istoria universului",
    "https://science.nasa.gov/universe/overview/",
  ],
  dark: [
    "NASA · Componentele universului",
    "https://science.nasa.gov/universe/overview/building-blocks/",
  ],
  exo: [
    "NASA · Detectarea exoplanetelor",
    "https://science.nasa.gov/exoplanets/how-we-find-and-characterize/",
  ],
  plants: [
    "NASA · Cultivarea plantelor în spațiu",
    "https://www.nasa.gov/exploration-research-and-technology/growing-plants-in-space/",
  ],
  bio: [
    "NASA · Provocările cultivării",
    "https://science.nasa.gov/biological-physical/the-challenges-of-growing-plants-in-space/",
  ],
  webb: [
    "NASA · Știința telescopului Webb",
    "https://science.nasa.gov/mission/webb/science-overview/",
  ],
  station: [
    "NASA · Stația Spațială Internațională",
    "https://www.nasa.gov/international-space-station/",
  ],
  grav: [
    "LIGO · Unde gravitaționale",
    "https://www.ligo.caltech.edu/page/what-are-gw",
  ],
  gaia: [
    "ESA · Misiunea Gaia",
    "https://www.esa.int/Science_Exploration/Space_Science/Gaia",
  ],
  missions: [
    "NASA · Catalogul misiunilor",
    "https://science.nasa.gov/missions/",
  ],
} as const;
export const levels = ["Începător", "Intermediar", "Avansat"] as const;
type Lesson = {
  title: string;
  level: 0 | 1 | 2;
  topic: string;
  sections: [string, string];
  challenge: string;
  source: keyof typeof sources;
};
export const lessons: Lesson[] = [
  {
    title: "Harta cosmică",
    level: 0,
    topic: "Orientare",
    sections: [
      "Pământul este o planetă a Sistemului Solar. Sistemul Solar se află în Calea Lactee, iar Calea Lactee este una dintre multele galaxii din universul observabil. O constelație este o regiune de pe cer; stelele din același desen se pot afla la distanțe foarte diferite.",
      "O unitate astronomică (UA) măsoară aproximativ 150 de milioane de kilometri. Un an-lumină este o distanță, aproximativ 9,46 trilioane de kilometri: cât parcurge lumina într-un an. Privind mai departe, vedem și mai în trecut.",
    ],
    challenge:
      "Dacă o stea este la 10 ani-lumină, lumina pe care o vezi astăzi a plecat acum aproximativ 10 ani.",
    source: "solar",
  },
  {
    title: "Soarele și cele opt planete",
    level: 0,
    topic: "Sistemul Solar",
    sections: [
      "De la Soare spre exterior întâlnim Mercur, Venus, Pământ, Marte, Jupiter, Saturn, Uranus și Neptun. Primele patru sunt stâncoase; Jupiter și Saturn sunt giganți gazoși, iar Uranus și Neptun sunt giganți de gheață. Numele nu înseamnă că aceștia au o suprafață de gheață solidă.",
      "Soarele este o stea, nu o planetă. El încălzește și luminează planetele; cele mai multe corpuri din Sistemul Solar sunt vizibile pentru că reflectă lumina sa. Pământul se rotește în jurul propriei axe și se deplasează în jurul Soarelui.",
    ],
    challenge:
      "Explorează Venus și Mercur în model. Care este mai fierbinte și ce rol are atmosfera?",
    source: "planets",
  },
  {
    title: "Ziua, anotimpurile și Luna",
    level: 0,
    topic: "Sistemul Solar",
    sections: [
      "Rotația Pământului produce alternanța zilei cu noaptea. Înclinarea axei face ca, timp de o parte a anului, o emisferă să primească lumină mai directă și să aibă zile mai lungi. Când în nord e vară, în sud e iarnă.",
      "Vedem faze diferite pentru că observăm din unghiuri diferite jumătatea Lunii luminată de Soare. Umbra Pământului întunecă Luna doar la o eclipsă lunară. Orbita Lunii este înclinată, așa că eclipsele nu au loc la fiecare Lună nouă sau plină.",
    ],
    challenge:
      "Desenează Soarele, Pământul și Luna pentru o eclipsă de Soare: Luna se află între Pământ și Soare.",
    source: "moon",
  },
  {
    title: "Comete, asteroizi și planete pitice",
    level: 0,
    topic: "Sistemul Solar",
    sections: [
      "Asteroizii sunt în general corpuri stâncoase sau metalice. Cometele, bogate în materiale volatile, pot dezvolta o coamă și cozi când se apropie de Soare. Cozile sunt orientate în general în sens opus Soarelui, nu neapărat în urma cometei.",
      "Un meteoroid este un fragment în spațiu, un meteor este fenomenul luminos din atmosferă, iar un meteorit este materialul care atinge solul. Ceres este o planetă pitică din centura de asteroizi; Pluto, Eris, Haumea și Makemake sunt lumi dincolo de Neptun.",
    ],
    challenge:
      "În care dintre cele trei situații poți ridica obiectul de pe sol: meteoroid, meteor sau meteorit?",
    source: "solar",
  },
  {
    title: "Plante la bordul stației spațiale",
    level: 0,
    topic: "Plante și viață",
    sections: [
      "În experimentele de pe Stația Spațială Internațională au crescut salată, mizuna și flori de zinnia; experimentul Plant Habitat-04 a cultivat ardei iuți. Aceste culturi au fost crescute în interiorul stației, în condiții controlate, nu expuse vidului cosmic.",
      "Plantele au nevoie de lumină, apă, nutrienți și aer. La bord, lumina vine de la LED-uri, iar apa trebuie distribuită cu grijă deoarece nu se scurge ca pe Pământ. Unele culturi oferă hrană proaspătă; altele ajută cercetătorii să înțeleagă dezvoltarea plantelor.",
    ],
    challenge:
      "În laboratorul Sera orbitală, compară o plantă fără lumină cu una care are lumină, dar prea multă apă.",
    source: "plants",
  },
  {
    title: "Cum ajungem și trăim pe orbită",
    level: 0,
    topic: "Explorare",
    sections: [
      "O rachetă câștigă viteză aruncând masă în direcția opusă. Ca să rămână pe orbită, o navă are nevoie de suficientă viteză laterală; nu este de ajuns să urce. La revenire, scutul termic protejează nava de încălzirea intensă.",
      "Astronauții de pe ISS plutesc pentru că ei și stația sunt în cădere liberă în jurul Pământului. Stația are sisteme de control al aerului, temperaturii și apei. În afara ei, costumul asigură presiunea și oxigenul și ajută la reglarea temperaturii.",
    ],
    challenge:
      "De ce ar pluti și un obiect lăsat liber într-o navă care cade împreună cu el?",
    source: "station",
  },
  {
    title: "Orbitele și legile lui Kepler",
    level: 1,
    topic: "Mecanică orbitală",
    sections: [
      "O orbită ideală cu două corpuri poate fi o elipsă, cu corpul central la unul dintre focare. Linia Soare–planetă mătură arii egale în intervale egale: planeta se deplasează mai repede în apropierea Soarelui.",
      "A treia lege leagă perioada de semiaxa mare. Pentru un corp cu masă neglijabilă care orbitează Soarele, P² ≈ a³ când P este în ani, iar a în UA. O orbită de 4 UA durează aproximativ 8 ani.",
    ],
    challenge:
      "Testează 4 și 9 UA în simulator. Ce se întâmplă cu perioada când triplezi distanța față de 1 UA?",
    source: "solar",
  },
  {
    title: "Soarele activ și vremea spațială",
    level: 1,
    topic: "Sistemul Solar",
    sections: [
      "Câmpurile magnetice ale Soarelui pot produce pete, erupții și ejecții de masă coronală. O erupție emite radiație; o ejecție expulzează plasmă și câmp magnetic. Vântul solar este un flux continuu de particule încărcate.",
      "Când particulele ajung în atmosfera superioară și excită atomi și molecule, putem observa aurore. Furtunile geomagnetice puternice pot afecta comunicațiile radio, navigația, sateliții și rețelele electrice.",
    ],
    challenge:
      "Explică diferența dintre o erupție solară și o ejecție de masă coronală.",
    source: "weather",
  },
  {
    title: "Nașterea și evoluția stelelor",
    level: 1,
    topic: "Stele",
    sections: [
      "Stelele se formează în regiunile dense ale norilor de gaz și praf. Gravitația comprimă gazul până când nucleul devine suficient de fierbinte pentru fuziune. În faza numită secvență principală stelele fuzionează hidrogen.",
      "Masa stabilește în mare parte durata vieții. O stea ca Soarele devine gigantă roșie și apoi pitică albă. Unele stele masive explodează ca supernove și pot lăsa stele neutronice sau găuri negre. Materia ejectată contribuie la formarea unor noi stele și planete.",
    ],
    challenge:
      "De ce o stea masivă poate trăi mai puțin, chiar dacă are mai mult combustibil?",
    source: "stars",
  },
  {
    title: "Galaxii, roiuri și rețeaua cosmică",
    level: 1,
    topic: "Galaxii",
    sections: [
      "Galaxiile adună stele, gaz, praf și materie întunecată. Pot avea forme spirale, eliptice sau neregulate. Calea Lactee este o spirală barată; Sistemul Solar se află în discul său, departe de centru.",
      "Galaxiile formează grupuri și roiuri, distribuite la scară mare în filamente și noduri, cu goluri între ele. Fuziunile pot schimba forma galaxiilor, chiar dacă stelele individuale se ciocnesc rar.",
    ],
    challenge:
      "De ce o fuziune între două galaxii nu înseamnă automat ciocnirea majorității stelelor?",
    source: "galaxies",
  },
  {
    title: "Exoplanete și lumi locuibile",
    level: 1,
    topic: "Exoplanete",
    sections: [
      "Exoplanetele orbitează alte stele. În metoda tranzitului căutăm scăderi repetitive ale strălucirii. Viteza radială detectează deplasări Doppler ale spectrului stelei care se mișcă sub atracția planetei; imagistica directă încearcă să separe lumina planetei de cea a stelei.",
      "O planetă din zona locuibilă ar putea permite apă lichidă la suprafață în condiții atmosferice potrivite. Nu e o dovadă că are apă sau viață. Atmosfera, radiația stelei și istoria lumii fac parte din evaluare.",
    ],
    challenge:
      "Mărește raza planetei în simulator. Cum se schimbă scăderea de lumină dacă dublezi raza?",
    source: "exo",
  },
  {
    title: "Telescoape și spectre",
    level: 1,
    topic: "Observație",
    sections: [
      "Telescopul adună lumină; instrumentele măsoară intensitatea, poziția sau lungimea de undă. Hubble observă în principal în vizibil și ultraviolet, precum și în infraroșul apropiat. Webb observă în infraroșu și poate studia lumina unor galaxii timpurii, regiuni cu praf și atmosfere planetare.",
      "Un spectru descompune lumina pe lungimi de undă. Atomii și moleculele lasă linii sau benzi caracteristice. Forma spectrului și poziția liniilor pot ajuta la estimarea temperaturii, compoziției și vitezei radiale.",
    ],
    challenge:
      "De ce o fotografie color și un spectru pot spune lucruri diferite despre aceeași stea?",
    source: "webb",
  },
  {
    title: "De la Apollo la explorarea robotică",
    level: 1,
    topic: "Explorare",
    sections: [
      "Apollo 11 a dus primii oameni pe Lună în 1969. Voyager explorează departe de planetele interioare; New Horizons a trecut pe lângă Pluto în 2015. Misiunile pot fi survoluri, orbitatoare, aterizatoare, rovere sau misiuni cu întoarcere de probe.",
      "Perseverance studiază geologia craterului Jezero și a colectat mostre pe Marte. OSIRIS-REx a adus pe Pământ probe de pe asteroidul Bennu în 2023. Analizele de laborator măsoară lucruri greu accesibile instrumentelor de la distanță.",
    ],
    challenge:
      "Ce ai alege pentru cartografierea globală a unei planete: un rover sau un orbitator? Dar pentru a testa un strat de rocă?",
    source: "missions",
  },
  {
    title: "Microgravitație și sere orbitale",
    level: 1,
    topic: "Plante și viață",
    sections: [
      "Rădăcinile folosesc gravitația ca indiciu de orientare, iar lăstarii pot răspunde la lumină. În microgravitație, aceste semnale și distribuția apei și a aerului în jurul rădăcinilor se schimbă. Prea multă apă poate reduce accesul rădăcinilor la oxigen.",
      "Veggie oferă un mediu de creștere la bord; Advanced Plant Habitat este o cameră mai automatizată, care monitorizează variabilele mediului. Arabidopsis thaliana ajută la studierea răspunsului plantelor. Un experiment comparabil folosește și un lot martor, cu aceleași condiții pe cât posibil.",
    ],
    challenge:
      "Proiectează pe hârtie un experiment care schimbă doar o variabilă. Ce vei măsura: germinația, lungimea rădăcinii sau biomasa?",
    source: "bio",
  },
  {
    title: "Diagrama H–R și luminozitatea",
    level: 2,
    topic: "Stele",
    sections: [
      "Diagrama Hertzsprung–Russell compară luminozitatea și temperatura efectivă; frecvent temperatura scade spre dreapta. Secvența principală, gigantele și piticele albe ocupă regiuni distincte. Culoarea oferă indicii despre temperatură, dar praful poate înroși lumina.",
      "Aproximând steaua ca un corp negru, L = 4πR²σT⁴. Două stele la aceeași temperatură pot avea luminozități foarte diferite dacă razele diferă. Un spectru real păstrează linii de absorbție și alte abateri de la acel model ideal.",
    ],
    challenge:
      "La aceeași temperatură, o rază de două ori mai mare înseamnă o luminozitate de patru ori mai mare.",
    source: "stars",
  },
  {
    title: "Paralaxă, flux și distanțe",
    level: 2,
    topic: "Observație",
    sections: [
      "Paralaxa anuală este deplasarea aparentă a unei stele pe fundal, măsurată când Pământul se află în poziții diferite pe orbită. În unități convenabile, d (parseci) ≈ 1/p (secunde de arc), pentru măsurători cu incertitudine mică. Gaia a măsurat poziții și distanțe stelare la scară mare.",
      "Pentru o sursă izotropă și fără absorbție, fluxul observat este F = L/(4πd²). Măsurarea fluxului singur nu oferă distanța: trebuie cunoscută luminozitatea ori folosită o metodă independentă.",
    ],
    challenge:
      "Transformă o paralaxă de 0,1″ în distanță. Dacă dublezi distanța, fluxul scade la un sfert.",
    source: "gaia",
  },
  {
    title: "Tranzite, atmosferă și incertitudini",
    level: 2,
    topic: "Exoplanete",
    sections: [
      "Pentru un disc stelar uniform, într-un tranzit complet, adâncimea este δ ≈ (Rp/R⋆)². Durata, geometria și întunecarea spre marginea stelei schimbă forma curbei. O binară eclipsantă amestecată cu o altă sursă poate imita un semnal de planetă.",
      "Spectroscopia de transmisie măsoară diferența de adâncime cu lungimea de undă. Norii, atmosfera și activitatea stelei pot produce interpretări ambigue. Combinarea tranzitului cu viteza radială permite estimarea densității, cu incertitudini.",
    ],
    challenge:
      "O scădere de 1% corespunde unui raport al razelor de aproximativ 0,1 în acest model. Ce presupuneri ai folosit?",
    source: "exo",
  },
  {
    title: "Relativitate, găuri negre și unde",
    level: 2,
    topic: "Gravitație",
    sections: [
      "Relativitatea generală descrie gravitația prin curbura spațiu-timpului. Orizontul este limita dincolo de care semnalele nu mai pot ajunge la un observator îndepărtat. Pentru o gaură neagră fără rotație și sarcină, raza Schwarzschild este 2GM/c²; discul luminos observat se află în exterior.",
      "Sisteme compacte, precum două găuri negre sau stele neutronice în spirală, emit unde gravitaționale. Interferometrele LIGO măsoară variații minuscule ale distanței. Undele și radiația electromagnetică pot descrie împreună anumite evenimente.",
    ],
    challenge:
      "Dacă masa se dublează, cum se schimbă raza Schwarzschild în modelul nerotitor?",
    source: "grav",
  },
  {
    title: "Universul timpuriu și radiația de fond",
    level: 2,
    topic: "Cosmologie",
    sections: [
      "Modelul Big Bang descrie expansiunea dintr-o stare timpurie fierbinte și densă. În primele minute s-au format nuclee ușoare; după aproximativ 380.000 de ani, electronii s-au legat de nuclee, iar fotonii au putut călători mai liber. Acea lumină veche se observă azi în microunde.",
      "Universul observabil are o limită impusă de timpul de călătorie al luminii în spațiul în expansiune. Vârsta universului, aproximativ 13,8 miliarde de ani în modelul cosmologic standard, nu este egală numeric cu raza universului observabil exprimată în ani-lumină.",
    ],
    challenge:
      "De ce nu descriem expansiunea cosmică drept o explozie dintr-un punct central într-un spațiu gol?",
    source: "universe",
  },
  {
    title: "Materia întunecată și energia întunecată",
    level: 2,
    topic: "Cosmologie",
    sections: [
      "Curbele de rotație ale galaxiilor, lentilele gravitaționale și structura la scară mare indică mai multă masă gravitațională decât cea a materiei vizibile. Materia întunecată este o explicație a acestor efecte; natura ei microscopică rămâne necunoscută.",
      "Energia întunecată este numele dat componentei asociate accelerării expansiunii. Modelul de referință ΛCDM folosește o constantă cosmologică, Λ, și materie întunecată rece. O potrivire bună cu datele nu demonstrează natura fizică a acestor componente.",
    ],
    challenge:
      "Separă cele două tipuri de indicii: curbele de rotație galactică și accelerarea expansiunii cosmice.",
    source: "dark",
  },
  {
    title: "Astrobiologie și habitate sustenabile",
    level: 2,
    topic: "Plante și viață",
    sections: [
      "O biosignătură este un indiciu care ar putea avea origine biologică. Evaluarea ei cere context geologic și atmosferic și compararea cu explicații fără viață. Căutarea urmărește, între altele, urme ale apei pe Marte, oceane sub gheață și atmosfera exoplanetelor.",
      "Serele spațiale ar putea suplimenta hrana și ajuta la reciclarea resurselor. Un habitat cu bucle cât mai închise trebuie să echilibreze apa, nutrienții, energia și gazele, plus siguranța alimentară și mentenanța. Creșterea unei recolte pe ISS nu dovedește autosuficiența unui habitat.",
    ],
    challenge:
      "Ce s-ar întâmpla cu o seră dacă ai recicla apa, dar nu ai înlocui nutrienții pierduți la recoltă?",
    source: "astrobiology",
  },
];
