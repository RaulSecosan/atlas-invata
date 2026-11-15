import { ThemeToggle } from "./ThemeToggle";
import { NavLink, Outlet } from "react-router-dom";
import { Globe2, ArrowUpRight } from "lucide-react";
export default function AtlasLayout() {
  return (
    <div className="atlas-app">
      <header className="atlas-header">
        <NavLink to="/" className="atlas-brand">
          <Globe2 size={33} />
          <div>
            Atlas<small>DESCOPERĂ. ÎNVAȚĂ. EXPLOREAZĂ.</small>
          </div>
        </NavLink>
        <div className="atlas-header-tools">
          <nav aria-label="Navigare principală">
            <NavLink to="/" end>
              Acasă
            </NavLink>
            <NavLink to="/matematica">Matematică</NavLink>
            <NavLink to="/geografie" end>
              Geografie
            </NavLink>
            <NavLink to="/geografie/quiz">
              Quiz <ArrowUpRight size={14} />
            </NavLink>
            <NavLink to="/spatiu">Spațiu</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
      <footer className="atlas-footer">
        <span>
          <Globe2 size={16} /> Atlas · Fiecare zi, o nouă descoperire.
        </span>
        <span>Învață cu plăcere.</span>
      </footer>
    </div>
  );
}
