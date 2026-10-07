import QuizHistory from "@/components/QuizHistory";
import { saveQuizResult } from "@/lib/quizHistoryStorage";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Globe2,
  Flag,
  Search,
} from "lucide-react";
import {
  continents,
  countries,
  createQuestions,
  normalize,
  type Question,
} from "@/lib/geography";
import { FlagImage } from "./Geography";
export default function GeographyQuiz() {
  const [params] = useSearchParams();
  const initial = params.get("continent");
  const [mode, setMode] = useState<"capitals" | "continents">("capitals");
  const [region, setRegion] = useState(
    continents.some((c) => c.id === initial) ? initial! : "all",
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [choice, setChoice] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const available = countries.filter(
    (c) =>
      (region === "all" || c.continent === region) &&
      (mode === "continents" || c.capital.length),
  );
  const pool = selected.length
    ? available.filter((c) => selected.includes(c.code))
    : available;
  const active = questions.length > 0;
  const current = questions[answers.length];
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const start = () => {
    setQuestions(createQuestions(pool, mode, count));
    setAnswers([]);
    setChoice(null);
    setChecked(false);
    setFinished(false);
    setInfoOpen(false);
  };
  const reset = () => {
    setQuestions([]);
    setFinished(false);
    setAnswers([]);
    setChoice(null);
    setChecked(false);
  };
  const next = () => {
    setAnswers([...answers, choice!]);
    setChoice(null);
    setChecked(false);
    setInfoOpen(false);
    if (answers.length + 1 === questions.length) {
      const completed = [...answers, choice!];
      saveQuizResult({
        mode,
        score: completed.filter((a, i) => a === questions[i].correct).length,
        total: questions.length,
      });
      setFinished(true);
    }
  };
  return (
    <>
      <section className="atlas-hero quiz-hero">
        <span className="eyebrow">GEOGRAFIE / REPETARE</span>
        <h1>Pune lumea la încercare.</h1>
        <p>
          O țară, un steag, o nouă provocare.
          <br />
          Descoperă cât de bine cunoști planeta.
        </p>
      </section>
      <main className="atlas-main quiz-main">
        <div className="mode-tabs">
          <Link to="/geografie">
            <BookOpen size={18} /> Învață
          </Link>
          <Link className="active" to="/geografie/quiz">
            <Trophy size={18} /> Quiz
          </Link>
        </div>
        {!active ? (
          <section className="quiz-setup atlas-panel">
            <span className="eyebrow">PREGĂTEȘTE EXPEDIȚIA</span>
            <h2>Ce vrei să repeți?</h2>
            <div className="quiz-modes">
              <button
                className={mode === "continents" ? "active" : ""}
                aria-pressed={mode === "continents"}
                onClick={() => {
                  setMode("continents");
                  setSelected([]);
                }}
              >
                <Globe2 size={24} />
                <strong>Continente</strong>
                <small>Recunoaște continentul unei țări</small>
              </button>
              <button
                className={mode === "capitals" ? "active" : ""}
                aria-pressed={mode === "capitals"}
                onClick={() => {
                  setMode("capitals");
                  setSelected([]);
                }}
              >
                <Flag size={24} />
                <strong>Țări și capitale</strong>
                <small>Ghicește capitala după țară și steag</small>
              </button>
            </div>
            <div className="setup-fields">
              <label>
                Continent
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setSelected([]);
                  }}
                >
                  <option value="all">Toate continentele</option>
                  {continents.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Număr de întrebări
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n} întrebări
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <details className="country-picker">
              <summary>
                Alege țările de repetat{" "}
                <span>
                  {selected.length
                    ? `${selected.length} selectate`
                    : `Toate (${available.length})`}
                </span>
              </summary>
              <label className="search-box">
                <Search size={17} />
                <input
                  aria-label="Filtrează țările de repetat"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Caută o țară…"
                />
              </label>
              <div className="picker-actions">
                <button
                  onClick={() => setSelected(available.map((c) => c.code))}
                >
                  Selectează toate
                </button>
                <button onClick={() => setSelected([])}>
                  Resetează selecția
                </button>
              </div>
              <div className="picker-list">
                {available
                  .filter((c) => normalize(c.name).includes(normalize(search)))
                  .map((c) => (
                    <label key={c.code}>
                      <input
                        type="checkbox"
                        checked={selected.includes(c.code)}
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? [...selected, c.code]
                              : selected.filter((x) => x !== c.code),
                          )
                        }
                      />
                      <FlagImage code={c.code} name={c.name} />
                      {c.name}
                    </label>
                  ))}
              </div>
            </details>
            <div className="setup-summary">
              <Info size={17} />
              <p>
                {pool.length
                  ? `${Math.min(count, pool.length)} întrebări · 4 variante de răspuns · Fără cronometru`
                  : "Antarctica nu are țări sau capitale. Alege un alt continent pentru quiz."}
              </p>
            </div>
            {mode === "continents" && region !== "all" && (
              <p className="quiz-hint">
                Pentru o provocare mai variată, alege toate continentele.
              </p>
            )}
            <button
              className="atlas-button full-button"
              disabled={!pool.length}
              onClick={start}
            >
              Începe quizul <ArrowRight size={18} />
            </button>
            <QuizHistory />
          </section>
        ) : finished ? (
          <section className="atlas-panel results-panel">
            <div className="results-icon">
              <Trophy size={35} />
            </div>
            <span className="eyebrow">EXPEDIȚIE ÎNCHEIATĂ</span>
            <h2>
              {score === questions.length
                ? "Felicitări, exploratorule!"
                : "Fiecare răspuns te învață ceva."}
            </h2>
            <p>
              Ai răspuns corect la{" "}
              <strong>
                {score} din {questions.length}
              </strong>{" "}
              întrebări.
            </p>
            <div className="score-number">
              {Math.round((score / questions.length) * 100)}
              <small>%</small>
            </div>
            <div className="result-actions">
              <button className="atlas-button" onClick={start}>
                <RotateCcw size={17} /> Repetă quizul
              </button>
              <button className="secondary-button" onClick={reset}>
                Schimbă selecția
              </button>
            </div>
            <details className="answer-review">
              <summary>Vezi toate răspunsurile</summary>
              {questions.map((q, i) => (
                <div key={q.country.code}>
                  <FlagImage code={q.country.code} name={q.country.name} />
                  <span>
                    <strong>{q.country.name}</strong>
                    <small>
                      Răspuns corect: {q.correct}
                      {answers[i] !== q.correct && ` · Ai ales: ${answers[i]}`}
                    </small>
                  </span>
                  {answers[i] === q.correct ? (
                    <CheckCircle2 className="correct-text" size={20} />
                  ) : (
                    <XCircle className="wrong-text" size={20} />
                  )}
                </div>
              ))}
            </details>
            <Link className="text-link" to="/geografie">
              Înapoi la învățare <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          current && (
            <section className="quiz-playing">
              <div className="quiz-progress-top">
                <span>
                  Întrebarea {answers.length + 1} din {questions.length}
                </span>
                <span>{score} corecte</span>
              </div>
              <div
                className="quiz-progress"
                role="progressbar"
                aria-label="Progres quiz"
                aria-valuemin={0}
                aria-valuemax={questions.length}
                aria-valuenow={answers.length}
              >
                <div
                  style={{
                    width: `${(answers.length / questions.length) * 100}%`,
                  }}
                />
              </div>
              <div className="atlas-panel question-panel">
                <span className="eyebrow">
                  {mode === "capitals"
                    ? "ȚĂRI ȘI CAPITALE"
                    : "ȚĂRI ȘI CONTINENTE"}
                </span>
                <FlagImage
                  code={current.country.code}
                  name={current.country.name}
                />
                <div className="question-country">
                  <h2>{current.country.name}</h2>
                  {mode === "capitals" && (
                    <div className="info-wrap">
                      <button
                        className="info-button"
                        aria-label="Arată continentul"
                        aria-expanded={infoOpen}
                        aria-describedby="continent-tip"
                        onClick={() => setInfoOpen(!infoOpen)}
                      >
                        <Info size={21} />
                      </button>
                      <span
                        id="continent-tip"
                        role="tooltip"
                        className={`info-tooltip ${infoOpen ? "is-open" : ""}`}
                      >
                        Continent:{" "}
                        {
                          continents.find(
                            (c) => c.id === current.country.continent,
                          )?.name
                        }
                      </span>
                    </div>
                  )}
                </div>
                <h3>
                  {mode === "capitals"
                    ? "Care este capitala?"
                    : "Pe ce continent se află?"}
                </h3>
                <div className="answer-options">
                  {current.options.map((option, i) => {
                    const state = checked
                      ? option === current.correct
                        ? "correct"
                        : choice === option
                          ? "wrong"
                          : ""
                      : choice === option
                        ? "selected"
                        : "";
                    return (
                      <button
                        key={option}
                        disabled={checked}
                        aria-pressed={choice === option}
                        className={state}
                        onClick={() => setChoice(option)}
                      >
                        <span className="answer-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {option}
                        {checked && option === current.correct && (
                          <CheckCircle2 size={18} />
                        )}
                      </button>
                    );
                  })}
                </div>
                {checked && (
                  <div
                    aria-live="polite"
                    className={`answer-feedback ${choice === current.correct ? "correct-text" : "wrong-text"}`}
                  >
                    <strong>
                      {choice === current.correct
                        ? "Corect! Foarte bine."
                        : `Răspunsul corect: ${current.correct}`}
                    </strong>
                    {current.country.note && <p>{current.country.note}</p>}
                  </div>
                )}
                <button
                  className="atlas-button full-button"
                  disabled={!choice}
                  onClick={() => (checked ? next() : setChecked(true))}
                >
                  {checked
                    ? answers.length + 1 === questions.length
                      ? "Vezi rezultatul"
                      : "Următoarea întrebare"
                    : "Verifică răspunsul"}
                  <ArrowRight size={18} />
                </button>
              </div>
              <button className="quit-button" onClick={reset}>
                Încheie quizul și schimbă selecția
              </button>
            </section>
          )
        )}
      </main>
    </>
  );
}
