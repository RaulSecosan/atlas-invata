import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, readDarkPreference } from "@/hooks/theme-context";
export default function AtlasThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dark, setDark] = useState(readDarkPreference);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* Theme still works without browser storage. */
    }
  }, [dark]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === "theme" || e.key === null) setDark(readDarkPreference());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}
