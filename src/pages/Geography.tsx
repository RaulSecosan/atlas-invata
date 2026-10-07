import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Search,
  Trophy,
  Lightbulb,
  MapPin,
  Flag,
} from "lucide-react";
import {
  continents,
  countries,
  normalize,
  type ContinentId,
} from "@/lib/geography";
import AtlasMap from "@/components/AtlasMap";
export function FlagImage({ code, name }: { code: string; name: string }) {
  return (
    <img
      className="country-flag"
      src={`${import.meta.env.BASE_URL}flags/${code.toLowerCase()}.svg`}
      alt={`Steagul țării ${name}`}
      loading="lazy"
    />
  );
}
export default function Geography() {
  const [selected, setSelected] = useState<ContinentId>("europe");
  const [query, setQuery] = useState("");
  const continent = continents.find((c) => c.id === selected)!;
  const all = countries.filter((c) => c.continent === selected);
  const filtered = all.filter((c) =>
    normalize(c.name + " " + c.capital.join(" ")).includes(normalize(query)),
  );
  return (
    <>
      <section className="atlas-hero">
        <span className="eyebrow">GEOGRAFIE / ÎNVĂȚARE</span>
        <h1>Descoperă lumea.</h1>
        <p>
          Șapte continente. O planetă plină de povești.
          <br />
          Explorează țările, steagurile și capitalele lor.
        </p>
      </section>
      <main className="atlas-main">
        <div className="mode-tabs">
          <Link className="active" to="/geografie">
            <BookOpen size={18} /> Învață
          </Link>
          <Link to="/geografie/quiz">
            <Trophy size={18} /> Quiz
          </Link>
        </div>
        <div className="continent-tabs" aria-label="Alege continentul">
          {continents.map((c) => (
            <button
              key={c.id}
              className={selected === c.id ? "active" : ""}
              aria-pressed={selected === c.id}
              onClick={() => {
                setSelected(c.id);
                setQuery("");
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="learn-layout">
          <aside className="continent-panel">
            <div className="continent-heading">
              <span className="eyebrow">CONTINENTUL TĂU</span>
              <h2>{continent.name}</h2>
              <p>{continent.description}</p>
            </div>
            <AtlasMap
              selected={selected}
              onSelect={(id) => {
                setSelected(id as ContinentId);
                setQuery("");
              }}
            />
            <div className="continent-fact">
              <Lightbulb size={20} />
              <p>{continent.fact}</p>
            </div>
            <div className="continent-count">
              <Flag size={18} />
              {all.length} țări în atlas
            </div>
            {all.length > 0 && (
              <Link
                className="atlas-button"
                to={`/geografie/quiz?continent=${selected}`}
              >
                Repetă acest continent <ArrowRight size={17} />
              </Link>
            )}
          </aside>
          <section className="countries-panel">
            <div className="countries-heading">
              <div>
                <span className="eyebrow">PAȘAPORT PENTRU CUNOAȘTERE</span>
                <h2>Țările din {continent.name}</h2>
              </div>
              <span className="count-badge">{filtered.length} țări</span>
            </div>
            <label className="search-box">
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută o țară sau o capitală…"
                aria-label="Caută o țară sau o capitală"
              />
            </label>
            <div className="country-list">
              {filtered.map((c) => (
                <article key={c.code} className="country-row">
                  <FlagImage code={c.code} name={c.name} />
                  <div>
                    <h3>{c.name}</h3>
                    <p>
                      <MapPin size={13} />{" "}
                      {c.capital.length
                        ? c.capital.join(" / ")
                        : "Fără capitală oficială"}
                    </p>
                    {c.note && <small>{c.note}</small>}
                  </div>
                  <span className="country-code">{c.code}</span>
                </article>
              ))}
            </div>
            {!filtered.length && (
              <div className="empty-state">
                <GlobeEmpty />
                <h3>
                  {selected === "antarctica"
                    ? "Un continent fără țări"
                    : "Nicio țară găsită"}
                </h3>
                <p>
                  {selected === "antarctica"
                    ? continent.fact
                    : "Încearcă un alt nume sau șterge căutarea."}
                </p>
              </div>
            )}
          </section>
        </div>
        <p className="data-note">
          Atlasul include 197 de țări și state, inclusiv entități cu
          recunoaștere parțială. Clasificarea continentală este convențională;
          țările transcontinentale sunt grupate într-un singur continent. Date:{" "}
          <a
            href="https://github.com/mledoze/countries"
            target="_blank"
            rel="noreferrer"
          >
            mledoze/countries
          </a>
          . Hartă: Natural Earth.
        </p>
      </main>
    </>
  );
}
function GlobeEmpty() {
  return <Flag size={32} />;
}
