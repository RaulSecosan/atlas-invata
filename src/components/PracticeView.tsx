import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { generateProblem, type MathProblem, type Operation, type Level, operationLabels, operationEmojis } from "@/lib/mathEngine";
import { saveSession } from "@/lib/historyStorage";
import { ArrowLeft, Check, X, Trophy, RotateCcw, Clock } from "lucide-react";

interface PracticeViewProps {
  operation: Operation;
  level: Level;
  multiplyBy?: number | null;
  timerEnabled: boolean;
  onBack: () => void;
}

const TOTAL = 10;

function generateChoices(answer: number): number[] {
  const choices = new Set<number>([answer]);
  const range = Math.max(5, Math.abs(answer));
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * range) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    const wrong = answer + offset * sign;
    if (wrong >= 0 && wrong !== answer) choices.add(wrong);
  }
  return [...choices].sort(() => Math.random() - 0.5);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function PracticeView({ operation, level, multiplyBy, timerEnabled, onBack }: PracticeViewProps) {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initProblems = useCallback(() => {
    const ps = Array.from({ length: TOTAL }, () =>
      generateProblem(operation, level, multiplyBy ?? undefined)
    );
    setProblems(ps);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setFinished(false);
    setElapsed(0);
  }, [operation, level, multiplyBy]);

  useEffect(() => {
    initProblems();
  }, [initProblems]);

  // Timer
  useEffect(() => {
    if (timerEnabled && !finished) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerEnabled, finished]);

  const problem = problems[currentIndex];

  const choices = useMemo(() => {
    if (!problem) return [];
    return generateChoices(problem.answer);
  }, [problem]);

  const handleChoice = (value: number) => {
    if (feedback) return;
    setSelected(value);

    const isCorrect = value === problem.answer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setFeedback("correct");
      setScore(newScore);
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      if (currentIndex + 1 >= TOTAL) {
        setFinished(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        saveSession({
          operation,
          level,
          multiplyBy: multiplyBy ?? null,
          score: newScore,
          total: TOTAL,
          timeSeconds: timerEnabled ? elapsed : null,
        });
      } else {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 900);
  };

  if (!problem && !finished) return null;

  if (finished) {
    const pct = Math.round((score / TOTAL) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪";
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-scale-in">
        <span className="text-6xl mb-4">{emoji}</span>
        <h2 className="text-3xl font-extrabold text-foreground mb-2">
          {pct >= 80 ? "Excelent!" : pct >= 50 ? "Bine!" : "Mai exersează!"}
        </h2>
        <p className="text-lg text-muted-foreground mb-1">
          Scor: <span className="font-bold text-foreground">{score}</span> / {TOTAL}
        </p>
        {timerEnabled && (
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
            <Clock className="w-4 h-4" />
            Timp: <span className="font-bold text-foreground">{formatTime(elapsed)}</span>
          </p>
        )}
        <div className="w-48 h-3 bg-muted rounded-full overflow-hidden mt-3 mb-6">
          <div
            className="h-full bg-success rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={initProblems}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg active:scale-[0.97]"
          >
            <RotateCcw className="w-4 h-4" /> Încearcă din nou
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-card text-foreground border border-border px-6 py-3 rounded-xl font-bold transition-all hover:border-primary/30 active:scale-[0.97]"
          >
            <ArrowLeft className="w-4 h-4" /> Înapoi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-up">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Înapoi</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg">{operationEmojis[operation]}</span>
          <span className="font-bold text-sm text-foreground">{operationLabels[operation]}</span>
        </div>
        <div className="flex items-center gap-2">
          {timerEnabled && (
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-1.5">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="font-bold text-sm tabular-nums">{formatTime(elapsed)}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-1.5">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-bold text-sm">{score}/{TOTAL}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-10 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / TOTAL) * 100}%` }}
        />
      </div>

      {/* Problem */}
      <div className="text-center animate-scale-in" key={currentIndex}>
        <p className="text-sm text-muted-foreground font-semibold mb-2">
          Exercițiul {currentIndex + 1} din {TOTAL}
        </p>
        <p className="text-5xl sm:text-6xl font-extrabold text-foreground mb-10 leading-tight">
          {problem.display} = ?
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {choices.map((value) => {
            const isSelected = selected === value;
            const isCorrectAnswer = value === problem.answer;
            let btnClass =
              "relative py-4 rounded-2xl text-2xl font-extrabold transition-all duration-200 border-2 ";

            if (!feedback) {
              btnClass += "bg-card border-border text-foreground hover:border-primary hover:shadow-md active:scale-[0.96] cursor-pointer";
            } else if (isCorrectAnswer) {
              btnClass += "bg-success/15 border-success text-success";
            } else if (isSelected && !isCorrectAnswer) {
              btnClass += "bg-destructive/15 border-destructive text-destructive";
            } else {
              btnClass += "bg-card border-border text-muted-foreground opacity-50";
            }

            return (
              <button
                key={value}
                onClick={() => handleChoice(value)}
                disabled={!!feedback}
                className={btnClass}
              >
                {value}
                {feedback && isCorrectAnswer && (
                  <span className="absolute -right-2 -top-2 w-7 h-7 bg-success rounded-full flex items-center justify-center animate-bounce-success">
                    <Check className="w-4 h-4 text-success-foreground" />
                  </span>
                )}
                {feedback && isSelected && !isCorrectAnswer && (
                  <span className="absolute -right-2 -top-2 w-7 h-7 bg-destructive rounded-full flex items-center justify-center animate-bounce-success">
                    <X className="w-4 h-4 text-destructive-foreground" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
