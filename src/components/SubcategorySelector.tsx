interface SubcategorySelectorProps {
  selected: number | null;
  onChange: (n: number | null) => void;
  label: string;
}

const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

export function SubcategorySelector({ selected, onChange, label }: SubcategorySelectorProps) {
  return (
    <div className="animate-fade-up">
      <p className="text-sm font-semibold text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 active:scale-[0.97] ${
            selected === null
              ? "bg-secondary text-secondary-foreground shadow-md"
              : "bg-card text-foreground border border-border hover:border-secondary/40"
          }`}
        >
          Toate
        </button>
        {numbers.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`rounded-xl w-11 h-11 text-sm font-bold transition-all duration-200 active:scale-[0.97] ${
              selected === n
                ? "bg-secondary text-secondary-foreground shadow-md"
                : "bg-card text-foreground border border-border hover:border-secondary/40"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
