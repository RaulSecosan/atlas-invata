import { Clock } from "lucide-react";
import { getQuizHistory } from "@/lib/quizHistoryStorage";
export default function QuizHistory() {
  const history = getQuizHistory();
  if (!history.length) return null;
  return (
    <details className="quiz-history">
      <summary>
        <Clock size={15} /> Progres pe acest dispozitiv{" "}
        <span>{history.length} quizuri</span>
      </summary>
      <p>Rezultatele sunt salvate doar în acest browser.</p>
      {history.slice(0, 10).map((r) => (
        <div key={r.id}>
          <span>
            {r.mode === "capitals" ? "Țări și capitale" : "Continente"}
            <small>
              {new Date(r.date).toLocaleString("ro-RO", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </small>
          </span>
          <strong>
            {r.score} / {r.total}
          </strong>
        </div>
      ))}
    </details>
  );
}
