import { type Operation, operationLabels, operationEmojis } from "@/lib/mathEngine";

interface CategoryCardProps {
  operation: Operation;
  colorClass: string;
  onClick: () => void;
}

export function CategoryCard({ operation, colorClass, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`${colorClass} group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-left transition-all duration-200 ease-out hover:shadow-xl hover:shadow-black/10 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-up`}
    >
      <div className="relative z-10">
        <span className="text-4xl sm:text-5xl block mb-3 transition-transform duration-200 group-hover:scale-110">
          {operationEmojis[operation]}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-primary-foreground leading-tight">
          {operationLabels[operation]}
        </h3>
      </div>
      {/* decorative circle */}
      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-125" />
    </button>
  );
}
