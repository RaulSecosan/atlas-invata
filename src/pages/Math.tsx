import { useState } from "react";
import { CategoryCard } from "@/components/CategoryCard";
import { LevelSelector } from "@/components/LevelSelector";
import { SubcategorySelector } from "@/components/SubcategorySelector";
import { PracticeView } from "@/components/PracticeView";
import { ThemeToggle } from "@/components/ThemeToggle";
import History from "@/pages/History";
import {
  type Operation,
  type Level,
  operationLabels,
  operationColors,
} from "@/lib/mathEngine";
import { GraduationCap, Clock, History as HistoryIcon } from "lucide-react";

const operations: Operation[] = [
  "adunare",
  "scadere",
  "inmultire",
  "impartire",
  "combinat",
];

export default function Math() {
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);
  const [level, setLevel] = useState<Level>(1);
  const [multiplyBy, setMultiplyBy] = useState<number | null>(null);
  const [practicing, setPracticing] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const needsSubcategory =
    selectedOp === "inmultire" || selectedOp === "impartire";

  const startPractice = () => {
    if (!selectedOp) return;
    setPracticing(true);
  };

  const handleBack = () => {
    setPracticing(false);
    setSelectedOp(null);
    setMultiplyBy(null);
  };

  if (showHistory) {
    return <History onBack={() => setShowHistory(false)} />;
  }

  if (practicing && selectedOp) {
    return (
      <div className="min-h-screen px-4 py-8 sm:py-12">
        <PracticeView
          operation={selectedOp}
          level={level}
          multiplyBy={multiplyBy}
          timerEnabled={timerEnabled}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-up">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-bold">
          <GraduationCap className="w-4 h-4" />
          Matematică
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(true)}
            className="p-2.5 rounded-xl bg-card border border-border text-foreground hover:border-primary/40 transition-all duration-200 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Istoric"
          >
            <HistoryIcon className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div
        className="text-center mb-10 animate-fade-up"
        style={{ animationDelay: "40ms" }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight text-balance">
          Exersează matematica
        </h1>
        <p className="text-muted-foreground mt-2 text-base">
          Alege o categorie și un nivel pentru a începe
        </p>
      </div>

      {/* Level selector */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <p className="text-sm font-semibold text-muted-foreground mb-3">
          Nivel de dificultate
        </p>
        <LevelSelector selected={level} onChange={setLevel} />
      </div>

      {/* Timer toggle */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <button
          onClick={() => setTimerEnabled((t) => !t)}
          className={`flex items-center gap-3 w-full rounded-2xl px-5 py-4 transition-all duration-200 active:scale-[0.98] border-2 ${
            timerEnabled
              ? "bg-secondary/10 border-secondary text-foreground"
              : "bg-card border-border text-foreground hover:border-secondary/30"
          }`}
        >
          <Clock
            className={`w-5 h-5 ${timerEnabled ? "text-secondary" : "text-muted-foreground"}`}
          />
          <div className="text-left flex-1">
            <span className="block font-bold text-sm">Cronometru</span>
            <span className="block text-xs text-muted-foreground">
              {timerEnabled
                ? "Activat — timpul va fi înregistrat"
                : "Dezactivat — apasă pentru a activa"}
            </span>
          </div>
          <div
            className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${
              timerEnabled ? "bg-secondary" : "bg-muted"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                timerEnabled ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Category grid */}
      <div className="mb-8">
        <p
          className="text-sm font-semibold text-muted-foreground mb-3 animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          Alege categoria
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
          {operations.map((op) => (
            <CategoryCard
              key={op}
              operation={op}
              colorClass={`${operationColors[op]} ${selectedOp === op ? "ring-4 ring-ring ring-offset-2 ring-offset-background" : ""}`}
              onClick={() => {
                setSelectedOp(op);
                setMultiplyBy(null);
              }}
            />
          ))}
        </div>
      </div>

      {/* Subcategory for inmultire/impartire */}
      {selectedOp && needsSubcategory && (
        <div className="mb-8">
          <SubcategorySelector
            selected={multiplyBy}
            onChange={setMultiplyBy}
            label={`Tabla lui... (${operationLabels[selectedOp]})`}
          />
        </div>
      )}

      {/* Start button */}
      {selectedOp && (
        <div className="animate-fade-up">
          <button
            onClick={startPractice}
            className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-extrabold text-lg transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98]"
          >
            Începe exercițiile →
          </button>
        </div>
      )}
    </div>
  );
}
