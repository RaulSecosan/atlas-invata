import { createContext, useContext } from "react";
export function readDarkPreference() {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
}
export const ThemeContext = createContext({ dark: false, toggle: () => {} });
export const useAtlasTheme = () => useContext(ThemeContext);
