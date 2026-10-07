import { Moon, Sun } from "lucide-react";
import { useAtlasTheme } from "@/hooks/theme-context";
export function ThemeToggle() {
  const { dark, toggle } = useAtlasTheme();
  return (
    <button
      onClick={toggle}
      className="theme-toggle p-2.5 rounded-xl bg-card border border-border text-foreground hover:border-primary/40 transition-all duration-200 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={
        dark ? "Activează modul luminos" : "Activează modul întunecat"
      }
      aria-pressed={dark}
      title={dark ? "Mod luminos" : "Mod întunecat"}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
