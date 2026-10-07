import { readDarkPreference } from "./hooks/theme-context";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./atlas.css";

document.documentElement.classList.toggle("dark", readDarkPreference());

createRoot(document.getElementById("root")!).render(<App />);
