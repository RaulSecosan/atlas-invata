import type { Level } from "@/lib/mathEngine";

interface LevelSelectorProps {
  selected: Level;
  onChange: (level: Level) => void;
}

const levels: { value: Level; label: string; desc: string }[] = [
  { value: 1, label: "Ușor", desc: "Numere mici" },
  { value: 2, label: "Mediu", desc: "Numere mai mari" },
  { value: 3, label: "Greu", desc: "Numere mari" },
];

export function LevelSelector({ selected, onChange }: LevelSelectorProps) {
  return (
    <div className="flex gap-3">
      {levels.map((l) => (
        <button
          key={l.value}
          onClick={() => onChange(l.value)}
          className={`flex-1 rounded-xl px-4 py-3 text-center transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            selected === l.value
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-card text-foreground border border-border hover:border-primary/30"
          }`}
        >
          <span className="block font-bold text-sm">{l.label}</span>
          <span className={`block text-xs mt-0.5 ${selected === l.value ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {l.desc}
          </span>
        </button>
      ))}
    </div>
  );
}
