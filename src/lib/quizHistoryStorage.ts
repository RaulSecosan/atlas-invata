export interface QuizRecord {
  id: string;
  date: string;
  mode: "capitals" | "continents";
  score: number;
  total: number;
}
const KEY = "atlas-geography-history";
export function getQuizHistory(): QuizRecord[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (!Array.isArray(value)) return [];
    return value
      .filter(
        (r): r is QuizRecord =>
          r &&
          typeof r.id === "string" &&
          typeof r.date === "string" &&
          !Number.isNaN(Date.parse(r.date)) &&
          ["capitals", "continents"].includes(r.mode) &&
          Number.isInteger(r.score) &&
          Number.isInteger(r.total) &&
          r.total > 0 &&
          r.score >= 0 &&
          r.score <= r.total,
      )
      .slice(0, 100);
  } catch {
    return [];
  }
}
export function saveQuizResult(
  record: Pick<QuizRecord, "mode" | "score" | "total">,
) {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify(
        [
          {
            ...record,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
          },
          ...getQuizHistory(),
        ].slice(0, 100),
      ),
    );
  } catch {
    /* The quiz remains usable when browser storage is unavailable. */
  }
}
