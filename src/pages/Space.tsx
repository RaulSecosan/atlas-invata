import { lazy, Suspense, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CircleDot,
  ExternalLink,
  FlaskConical,
  ListChecks,
  Orbit,
  Pause,
  Play,
  RotateCcw,
  Search,
  Telescope,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { lessons, levels, sources } from "@/features/space/lessons";
import { worlds, type WorldId } from "@/features/space/worlds";
import SpaceLabs from "@/features/space/SpaceLabs";
import SpaceQuiz from "@/features/space/SpaceQuiz";
import "./space.css";

const SolarScene = lazy(() => import("@/features/space/SolarScene"));
const initialView = { yaw: 0, pitch: 0, zoom: 1 };
const number = (x: number | null) =>
  x === null ? "—" : x.toLocaleString("ro-RO", { maximumFractionDigits: 2 });
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
export default function Space() {
  const [selected, setSelected] = useState<WorldId>("saturn"),
    [mode, setMode] = useState<"system" | "detail">("system");
  const [playing, setPlaying] = useState(
    () =>
      typeof matchMedia === "function" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [speed, setSpeed] = useState(1),
    [view, setView] = useState(initialView),
    [reset, setReset] = useState(0);
  const [level, setLevel] = useState<number | null>(null),
    [search, setSearch] = useState("");
  const world = worlds.find((w) => w.id === selected)!;
  const visible = lessons.filter(
    (l) =>
      (level === null || l.level === level) &&
      normalize([l.title, l.topic, ...l.sections].join(" ")).includes(
        normalize(search.trim()),
      ),
  );
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  const zoom = (direction: number) =>
    setView((v) => ({
      ...v,
      zoom: Math.min(1.85, Math.max(0.65, v.zoom + direction * 0.18)),
    }));
  return (
    <main className="space-page">
      <section className="space-hero">
        <div className="space-container space-hero-inner">
          <div>
            <span className="space-kicker">
              <span className="space-status-dot" /> ATLAS / OBSERVATOR
            </span>
            <h1>
              Explorează
              <br />
              <em>Universul.</em>
            </h1>
            <p>
              De la primul pas pe Lună la lumina primelor galaxii. Explorează un
              Sistem Solar 3D, testează idei și învață în ritmul tău.
            </p>
            <div className="space-hero-actions">
              <button
                className="space-primary"
                onClick={() => go("space-observatory")}
              >
                <Orbit size={18} /> Explorează în 3D <ArrowDown size={16} />
              </button>
              <button
                className="space-secondary"
                onClick={() => go("space-lessons")}
              >
                <BookOpen size={17} /> Vezi lecțiile
              </button>
            </div>
          </div>
          <div className="space-hero-art" aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-ring" />
            <div className="hero-planet" />
            <div className="hero-ring-front" />
            <span className="hero-coordinate">
              ATLAS CELEST
              <br />
              06 / SATURN
            </span>
          </div>
        </div>
      </section>
      <div className="space-container">
        <div className="space-subnav">
          <button onClick={() => go("space-observatory")}>
            <Orbit size={16} /> Explorator
          </button>
          <button onClick={() => go("space-labs")}>
            <FlaskConical size={16} /> Laboratoare
          </button>
          <button onClick={() => go("space-lessons")}>
            <BookOpen size={16} /> Lecții
          </button>
          <button onClick={() => go("space-quiz")}>
            <ListChecks size={16} /> Quiz
          </button>
        </div>
        <section className="space-block" id="space-observatory">
          <div className="space-heading">
            <span className="space-kicker">
              <Telescope size={15} /> OBSERVATOR INTERACTIV
            </span>
            <h2>Sistemul Solar în 3D</h2>
            <p>
              Rotește modelul și alege un corp ceresc pentru a-l vedea de
              aproape.
            </p>
          </div>
          <div className="observatory">
            <div className="observatory-stage">
              <div className="scene-toolbar">
                <div className="space-pills">
                  <button
                    aria-pressed={mode === "system"}
                    onClick={() => setMode("system")}
                  >
                    Sistem solar
                  </button>
                  <button
                    aria-pressed={mode === "detail"}
                    onClick={() => setMode("detail")}
                  >
                    Detaliu planetar
                  </button>
                </div>
                <button
                  className="space-icon"
                  aria-label={
                    playing ? "Pune animația pe pauză" : "Pornește animația"
                  }
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <Pause size={17} /> : <Play size={17} />}
                </button>
              </div>
              <div
                className="scene-viewport"
                tabIndex={0}
                role="region"
                aria-label="Model 3D. Folosește săgețile pentru rotire."
                onKeyDown={(e) => {
                  if (
                    ![
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(e.key)
                  )
                    return;
                  e.preventDefault();
                  setView((v) => ({
                    ...v,
                    yaw:
                      v.yaw +
                      (e.key === "ArrowLeft"
                        ? -0.16
                        : e.key === "ArrowRight"
                          ? 0.16
                          : 0),
                    pitch:
                      v.pitch +
                      (e.key === "ArrowUp"
                        ? 0.12
                        : e.key === "ArrowDown"
                          ? -0.12
                          : 0),
                  }));
                }}
              >
                <Suspense
                  fallback={
                    <div className="scene-loading">Se încarcă modelul 3D…</div>
                  }
                >
                  <SolarScene
                    reset={reset}
                    selected={selected}
                    mode={mode}
                    playing={playing}
                    speed={speed}
                    view={view}
                    onPick={setSelected}
                  />
                </Suspense>
              </div>
              <div className="scene-bottom">
                <label>
                  Viteză{" "}
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                  >
                    <option value=".3">0,3×</option>
                    <option value="1">1×</option>
                    <option value="3">3×</option>
                  </select>
                </label>
                <div>
                  <button
                    className="space-icon"
                    aria-label="Micșorează modelul"
                    onClick={() => zoom(-1)}
                  >
                    <ZoomOut size={17} />
                  </button>
                  <button
                    className="space-icon"
                    aria-label="Mărește modelul"
                    onClick={() => zoom(1)}
                  >
                    <ZoomIn size={17} />
                  </button>
                  <button
                    className="space-icon"
                    aria-label="Resetează vederea"
                    onClick={() => {
                      setView(initialView);
                      setReset((n) => n + 1);
                    }}
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
            <aside className="world-data" aria-live="polite">
              <span className="space-kicker">
                <CircleDot size={15} /> {world.type}
              </span>
              <h3>{world.name}</h3>
              <p>{world.summary}</p>
              <dl>
                <div>
                  <dt>Diametru aproximativ</dt>
                  <dd>{number(world.diameter)} km</dd>
                </div>
                {world.au !== null && world.au > 0 && (
                  <div>
                    <dt>Semiaxă orbitală</dt>
                    <dd>{number(world.au)} UA</dd>
                  </div>
                )}
                {world.years !== null && world.years > 0 && (
                  <div>
                    <dt>Perioadă orbitală</dt>
                    <dd>{number(world.years)} ani</dd>
                  </div>
                )}
                {world.id === "moon" && (
                  <div>
                    <dt>Distanță medie față de Pământ</dt>
                    <dd>384.400 km</dd>
                  </div>
                )}
              </dl>
              {mode === "system" && (
                <button
                  className="space-secondary"
                  onClick={() => setMode("detail")}
                >
                  Privește de aproape <ArrowRight size={16} />
                </button>
              )}
            </aside>
          </div>
          <div className="world-selector" aria-label="Alege corpul ceresc">
            {worlds.map((w) => (
              <button
                key={w.id}
                aria-pressed={selected === w.id}
                onClick={() => setSelected(w.id)}
              >
                <i
                  style={{ "--planet-color": w.color } as React.CSSProperties}
                />
                {w.name}
              </button>
            ))}
          </div>
          <p className="space-caption">
            Model ilustrativ: texturi procedurale și orbite circulare.
            Dimensiunile, distanțele, vitezele și pozițiile sunt adaptate pentru
            vizualizare. Nu arată unde se află corpurile cerești în acest
            moment.{" "}
            <a href={sources.planets[1]} target="_blank" rel="noreferrer">
              Referință: NASA
            </a>
          </p>
        </section>
        <SpaceLabs />
        <section className="space-block" id="space-lessons">
          <div className="space-heading">
            <span className="space-kicker">
              <BookOpen size={15} /> GHID DE ÎNVĂȚARE
            </span>
            <h2>De la curiozitate la astrofizică</h2>
            <p>
              {lessons.length} lecții pe trei niveluri. Fiecare are o provocare
              și o sursă pentru aprofundare.
            </p>
          </div>
          <div className="lesson-controls">
            <div
              className="space-pills"
              aria-label="Filtrează lecțiile după nivel"
            >
              <button
                aria-pressed={level === null}
                onClick={() => setLevel(null)}
              >
                Toate
              </button>
              {levels.map((name, i) => (
                <button
                  key={name}
                  aria-pressed={level === i}
                  onClick={() => setLevel(i)}
                >
                  {name}
                </button>
              ))}
            </div>
            <label className="space-search">
              <Search size={17} />
              <input
                aria-label="Caută în lecții"
                placeholder="Caută: Luna, plante, galaxii…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <p className="space-caption" role="status">
            {visible.length}{" "}
            {visible.length === 1 ? "lecție găsită" : "lecții găsite"}
          </p>
          {!visible.length && (
            <p className="space-empty">
              Încearcă alt termen de căutare sau alege „Toate”.
            </p>
          )}
          <div className="lesson-list">
            {visible.map((l) => (
              <details className="space-lesson" key={l.title}>
                <summary>
                  <span className="lesson-index">
                    {String(lessons.indexOf(l) + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{l.title}</strong>
                    <small>
                      {l.topic} · {levels[l.level]}
                    </small>
                  </span>
                  <span className="lesson-open" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="lesson-content">
                  {l.sections.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                  <div>
                    <b>Încearcă:</b> {l.challenge}
                  </div>
                  <a
                    href={sources[l.source][1]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sources[l.source][0]} <ExternalLink size={13} />
                  </a>
                </div>
              </details>
            ))}
          </div>
        </section>
        <SpaceQuiz />
        <section className="space-block space-references">
          <div className="space-heading">
            <span className="space-kicker">MAI DEPARTE</span>
            <h2>Surse pentru explorare</h2>
            <p>
              Materialele sunt explicate în română. Sursele primare sunt în
              engleză.
            </p>
          </div>
          <div>
            {Object.values(sources).map(([label, url]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                {label}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
