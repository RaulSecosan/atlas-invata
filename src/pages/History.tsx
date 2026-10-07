import { useState, useMemo } from "react";
import { getHistory, clearHistory, type SessionRecord } from "@/lib/historyStorage";
import { operationLabels, operationEmojis, type Operation } from "@/lib/mathEngine";
import { ArrowLeft, Trash2, Clock, Trophy, Filter } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HistoryPageProps {
  onBack: () => void;
}

const allOps: Operation[] = ["adunare", "scadere", "inmultire", "impartire", "combinat"];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function History({ onBack }: HistoryPageProps) {
  const [records, setRecords] = useState<SessionRecord[]>(getHistory);
  const [filterOp, setFilterOp] = useState<Operation | "all">("all");

  const filtered = useMemo(
    () => (filterOp === "all" ? records : records.filter((r) => r.operation === filterOp)),
    [records, filterOp]
  );

  const handleClear = () => {
    clearHistory();
    setRecords([]);
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Înapoi</span>
        </button>
        <h1 className="text-xl font-extrabold text-foreground">Istoric</h1>
        <ThemeToggle />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <button
          onClick={() => setFilterOp("all")}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all active:scale-[0.97] ${
            filterOp === "all"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground border border-border hover:border-primary/30"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Toate
        </button>
        {allOps.map((op) => (
          <button
            key={op}
            onClick={() => setFilterOp(op)}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition-all active:scale-[0.97] ${
              filterOp === op
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border hover:border-primary/30"
            }`}
          >
            {operationEmojis[op]} {operationLabels[op]}
          </button>
        ))}
      </div>

      {/* Records */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-fade-up">
          <Clock className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground font-semibold">Niciun rezultat încă</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Rezultatele vor apărea aici după ce termini o sesiune.</p>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-up" style={{ animationDelay: "160ms" }}>
          {filtered.map((r) => {
            const pct = Math.round((r.score / r.total) * 100);
            return (
              <div
                key={r.id}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 transition-all hover:shadow-md"
              >
                <span className="text-2xl">{operationEmojis[r.operation]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-foreground">
                      {operationLabels[r.operation]}
                    </span>
                    {r.multiplyBy && (
                      <span className="text-xs bg-muted text-muted-foreground rounded-lg px-2 py-0.5 font-semibold">
                        ×{r.multiplyBy}
                      </span>
                    )}
                    <span className="text-xs bg-muted text-muted-foreground rounded-lg px-2 py-0.5 font-semibold">
                      Niv. {r.level}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(r.date)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {r.timeSeconds != null && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(r.timeSeconds)}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className={`font-extrabold text-sm ${pct >= 80 ? "text-success" : pct >= 50 ? "text-accent-foreground" : "text-destructive"}`}>
                      {r.score}/{r.total}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear button */}
      {records.length > 0 && (
        <div className="mt-8 text-center animate-fade-up">
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 text-sm text-destructive font-semibold hover:underline active:scale-[0.97] transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Șterge tot istoricul
          </button>
        </div>
      )}
    </div>
  );
}
