import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Globe2,
  Calculator,
  Check,
} from "lucide-react";
import AtlasMap from "@/components/AtlasMap";
export default function Index() {
  return (
    <>
      <section className="atlas-hero home-hero">
        <span className="eyebrow">O LUME DE DESCOPERIT</span>
        <h1>
          Curiozitatea te duce
          <br />
          mai departe.
        </h1>
        <p>
          Alege ce vrei să înveți astăzi.
          <br />
          Un pas mic, o descoperire nouă.
        </p>
      </section>
      <main className="atlas-main home-main">
        <div className="section-intro">
          <div>
            <span className="eyebrow">ÎNCEPE EXPLORAREA</span>
            <h2>Ce vrei să înveți?</h2>
          </div>
          <p>Două materii. Nenumărate descoperiri.</p>
        </div>
        <div className="subject-grid">
          <Link to="/matematica" className="subject-card math-subject">
            <div className="subject-art math-art">
              <span className="art-coordinate">01 / LOGICĂ & CALCUL</span>
              <div className="chalkboard">
                2 + 3 = 5<small>× &nbsp; ÷ &nbsp; − &nbsp; +</small>
              </div>
              <Calculator className="art-calculator" size={65} />
            </div>
            <div className="subject-body">
              <span className="subject-kicker">GÂNDEȘTE PAS CU PAS</span>
              <h2>Matematică</h2>
              <p>
                Exersează operații, alege nivelul potrivit și construiește-ți
                încrederea cu fiecare răspuns.
              </p>
              <span className="atlas-button">
                Începe să exersezi <ArrowRight size={18} />
              </span>
            </div>
          </Link>
          <Link to="/geografie" className="subject-card">
            <div className="subject-art geo-art">
              <span className="art-coordinate">02 / ȚĂRI & CONTINENTE</span>
              <div className="globe-art">
                <AtlasMap />
              </div>
              <Compass className="art-compass" size={62} />
            </div>
            <div className="subject-body">
              <span className="subject-kicker">DESCOPERĂ PLANETA</span>
              <h2>Geografie</h2>
              <p>
                Explorează continente, recunoaște steaguri și învață capitalele
                țărilor din întreaga lume.
              </p>
              <span className="atlas-button">
                Începe să explorezi <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </div>
        <div className="home-features">
          <span>
            <BookOpen size={18} /> Învață în ritmul tău
          </span>
          <span>
            <Globe2 size={18} /> Descoperă prin explorare
          </span>
          <span>
            <Check size={18} /> Repetă prin quizuri
          </span>
        </div>
      </main>
    </>
  );
}
