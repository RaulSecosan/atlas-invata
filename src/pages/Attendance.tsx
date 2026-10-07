import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  Flame,
  BookOpen,
} from "lucide-react";
import {
  attendanceStreak,
  dayKey,
  readAttendance,
  writeAttendance,
} from "@/lib/attendanceStorage";
export default function Attendance() {
  const today = new Date();
  const todayKey = dayKey(today);
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState(todayKey);
  const [days, setDays] = useState(readAttendance);
  const [error, setError] = useState("");
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "atlas-attendance" || e.key === null)
        setDays(readAttendance());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const selectedDate = new Date(
    Number(selected.slice(0, 4)),
    Number(selected.slice(5, 7)) - 1,
    Number(selected.slice(8, 10)),
  );
  const marked = selected in days;
  const future = selected > todayKey;
  const count = Object.keys(days).filter((k) =>
    k.startsWith(
      `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-`,
    ),
  ).length;
  const totalDays = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const offset = (month.getDay() + 6) % 7;
  const save = (next: typeof days) => {
    setDays(next);
    setError(
      writeAttendance(next)
        ? ""
        : "Browserul nu permite salvarea. Bifările sunt disponibile doar până închizi pagina.",
    );
  };
  const mark = (key: string) => {
    save({ ...days, [key]: days[key] ?? "" });
  };
  const toggle = () => {
    if (future) return;
    if (marked) {
      const next = { ...days };
      delete next[selected];
      save(next);
    } else mark(selected);
  };
  return (
    <>
      <section className="atlas-hero attendance-hero">
        <span className="eyebrow">CALENDAR / PREZENȚĂ</span>
        <h1>Puțin în fiecare zi.</h1>
        <p>
          Fiecare zi în care înveți contează.
          <br />
          Bifează-ți prezența și păstrează micile reușite.
        </p>
      </section>
      <main className="atlas-main attendance-main">
        <div className="attendance-stats">
          <div>
            <CalendarDays size={21} />
            <strong>{count}</strong>
            <span>zile în luna afișată</span>
          </div>
          <div>
            <Flame size={21} />
            <strong>{attendanceStreak(days, today)}</strong>
            <span>zile consecutive</span>
          </div>
          <div>
            <BookOpen size={21} />
            <strong>{Object.keys(days).length}</strong>
            <span>zile de învățare în total</span>
          </div>
        </div>
        <div className="attendance-layout">
          <section
            className="atlas-panel attendance-calendar"
            aria-label="Calendar de prezență"
          >
            <div className="calendar-month">
              <button
                aria-label="Luna precedentă"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1),
                  )
                }
              >
                <ChevronLeft size={20} />
              </button>
              <h2 aria-live="polite">
                {month.toLocaleDateString("ro-RO", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                aria-label="Luna următoare"
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1),
                  )
                }
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="calendar-weekdays" aria-hidden="true">
              {["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="calendar-grid">
              {Array.from({ length: offset }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}
              {Array.from({ length: totalDays }, (_, i) => {
                const d = new Date(
                  month.getFullYear(),
                  month.getMonth(),
                  i + 1,
                );
                const key = dayKey(d);
                const done = key in days;
                return (
                  <button
                    key={key}
                    className={[
                      key === selected ? "selected" : "",
                      done ? "marked" : "",
                      key === todayKey ? "today" : "",
                    ].join(" ")}
                    disabled={key > todayKey}
                    aria-pressed={key === selected}
                    aria-current={key === todayKey ? "date" : undefined}
                    aria-label={`${d.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}${done ? ", prezență bifată" : ""}`}
                    onClick={() => setSelected(key)}
                  >
                    <span>{i + 1}</span>
                    {done && <Check size={12} />}
                  </button>
                );
              })}
            </div>
            <div className="calendar-legend">
              <span>
                <i className="legend-done" /> Zi bifată
              </span>
              <span>
                <i className="legend-today" /> Astăzi
              </span>
            </div>
            <button
              className="secondary-button calendar-today"
              onClick={() => {
                setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                setSelected(todayKey);
              }}
            >
              Înapoi la astăzi
            </button>
          </section>
          <section className="atlas-panel attendance-detail">
            <span className="eyebrow">O MICĂ REUȘITĂ</span>
            <h2>
              {selectedDate.toLocaleDateString("ro-RO", {
                day: "numeric",
                month: "long",
              })}
            </h2>
            <p className="attendance-status">
              {marked
                ? "Ai bifat această zi. Bravo pentru consecvență!"
                : "Ai fost pe site și ai învățat ceva? Bifează această zi."}
            </p>
            <button
              className={`atlas-button full-button ${marked ? "day-complete" : ""}`}
              disabled={future}
              onClick={toggle}
            >
              <Check size={18} />
              {marked ? "Debifează prezența" : "Am învățat în această zi"}
            </button>
            {marked && (
              <label className="achievement-note">
                Ce ai realizat? <span>(opțional)</span>
                <textarea
                  maxLength={300}
                  rows={4}
                  placeholder="De exemplu: am repetat capitalele Europei."
                  value={days[selected]}
                  onChange={(e) =>
                    save({ ...days, [selected]: e.target.value })
                  }
                />
                <small>{days[selected].length}/300 · Se salvează automat</small>
              </label>
            )}
            <div className="attendance-tip">
              <Flame size={18} />
              <p>
                Un exercițiu sau câteva capitale sunt un început bun. Bifează
                zilele în care ai făcut un pas înainte.
              </p>
            </div>
            {!(todayKey in days) && selected !== todayKey && (
              <button
                className="text-link"
                onClick={() => {
                  setSelected(todayKey);
                  setMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                  mark(todayKey);
                }}
              >
                Bifează și ziua de astăzi <Check size={16} />
              </button>
            )}
          </section>
        </div>
        {error && (
          <p role="alert" className="storage-error">
            {error}
          </p>
        )}
        <p className="data-note">
          Prezența și notițele se salvează doar în acest browser. Poți bifa și
          zilele trecute; zilele viitoare nu pot fi bifate. Ștergerea datelor
          browserului șterge și calendarul.
        </p>
      </main>
    </>
  );
}
