import { useId, useState } from "react";
import { FlaskConical, Orbit, Sprout, Telescope } from "lucide-react";
import { periodYears, transitPercent } from "./worlds";

const decimal = (n: number) =>
  n.toLocaleString("ro-RO", { maximumFractionDigits: 2 });
const labs = [
  { id: "orbit", title: "Orbita lui Kepler", icon: Orbit },
  { id: "transit", title: "Tranzitul unei exoplanete", icon: Telescope },
  { id: "garden", title: "Sera orbitală", icon: Sprout },
] as const;
function Kepler() {
  const [au, setAu] = useState(1),
    id = useId();
  const radius = 38 + Math.log(au / 0.4) * 43;
  const p = periodYears(au);
  return (
    <>
      <svg
        className="lab-art"
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Orbită la ${decimal(au)} unități astronomice`}
      >
        <ellipse
          cx="180"
          cy="99"
          rx={radius}
          ry={radius * 0.55}
          fill="none"
          stroke="#768eb9"
          strokeDasharray="4 5"
        />
        <line
          x1="180"
          x2={180 + radius}
          y1="99"
          y2="99"
          stroke="#768eb9"
          strokeDasharray="2 4"
        />
        <circle cx="180" cy="99" r="18" fill="#ffd082" />
        <circle cx={180 + radius} cy="99" r="9" fill="#8fb8ff" />
        <text x="180" y="181" textAnchor="middle" fill="#b6c6e4" fontSize="12">
          Distanță ilustrativă · scară logaritmică
        </text>
      </svg>
      <div className="lab-controls">
        <h3>Cât durează un an acolo?</h3>
        <p>Mută planeta imaginară mai departe de o stea cu masa Soarelui.</p>
        <label htmlFor={id}>
          Semiaxa mare <strong>{decimal(au)} UA</strong>
        </label>
        <input
          id={id}
          type="range"
          min=".4"
          max="10"
          step=".1"
          value={au}
          onChange={(e) => setAu(Number(e.target.value))}
        />
        <div className="lab-output">
          <span>PERIOADA ORBITEI</span>
          <strong>{decimal(p)} ani tereștri</strong>
        </div>
        <p>
          Legea a treia: P² ≈ a³. Presupunem că masa planetei este neglijabilă
          față de cea a stelei. Diagrama arată cazul circular.
        </p>
      </div>
    </>
  );
}
function Transit() {
  const [ratio, setRatio] = useState(0.1),
    id = useId();
  const depth = transitPercent(ratio),
    dip = 135 + depth * 6;
  return (
    <>
      <svg
        className="lab-art"
        viewBox="0 0 360 220"
        role="img"
        aria-label={`Curba de lumină: scădere de ${decimal(depth)} la sută`}
      >
        <circle cx="180" cy="55" r="40" fill="#ffd082" />
        <circle cx="173" cy="56" r={ratio * 40} fill="#152343" />
        <line x1="45" x2="320" y1="190" y2="190" stroke="#6e83aa" />
        <line x1="45" x2="45" y1="126" y2="190" stroke="#6e83aa" />
        <path
          d={`M45 135 H122 L142 ${dip} H217 L237 135 H320`}
          fill="none"
          stroke="#91c5ff"
          strokeWidth="2.4"
        />
        <text x="275" y="209" fill="#b6c6e4" fontSize="11">
          timp →
        </text>
        <text x="58" y="122" fill="#b6c6e4" fontSize="11">
          strălucire relativă
        </text>
      </svg>
      <div className="lab-controls">
        <h3>O umbră în lumina stelei</h3>
        <p>Compară o planetă mică și una mare care trec prin fața stelei.</p>
        <label htmlFor={id}>
          Raza planetei / raza stelei <strong>{decimal(ratio)}</strong>
        </label>
        <input
          id={id}
          type="range"
          min=".02"
          max=".25"
          step=".01"
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
        />
        <div className="lab-output">
          <span>SCĂDEREA LUMINII</span>
          <strong>{decimal(depth)}%</strong>
        </div>
        <p>
          Scăderea aproximativă este (Rₚ/R★)². Modelul presupune un disc stelar
          uniform și un tranzit complet; nu include atmosfera sau zgomotul
          observației.
        </p>
      </div>
    </>
  );
}
function Garden() {
  const [light, setLight] = useState(true),
    [water, setWater] = useState("balanced"),
    [air, setAir] = useState(true);
  const issues = [
    !light &&
      "Fără lumină, fotosinteza nu poate susține creșterea pe termen lung.",
    water === "low" && "Apa insuficientă limitează creșterea.",
    water === "high" &&
      "Prea multă apă poate reduce oxigenul disponibil la rădăcini.",
    !air && "Rădăcinile au nevoie de oxigen, iar frunzele de schimb de gaze.",
  ].filter(Boolean);
  return (
    <>
      <div
        className={`lab-art greenhouse ${light ? "lit" : ""} ${issues.length ? "stressed" : ""}`}
        aria-hidden="true"
      >
        <div className="grow-lamp" />
        <Sprout size={90} strokeWidth={1} />
        <div className="grow-pot" />
        <span>CAMERĂ DE CREȘTERE · ISS</span>
      </div>
      <div className="lab-controls">
        <h3>Ce îi trebuie unei plante?</h3>
        <p>
          Configurează o cameră de creștere și urmărește ce condiții limitează
          planta.
        </p>
        <div className="garden-fields">
          <label>
            <input
              type="checkbox"
              checked={light}
              onChange={(e) => setLight(e.target.checked)}
            />{" "}
            Iluminare LED
          </label>
          <label>
            <input
              type="checkbox"
              checked={air}
              onChange={(e) => setAir(e.target.checked)}
            />{" "}
            Aerare
          </label>
        </div>
        <label className="garden-water">
          Apă
          <select value={water} onChange={(e) => setWater(e.target.value)}>
            <option value="low">Prea puțină</option>
            <option value="balanced">Echilibrată</option>
            <option value="high">Prea multă</option>
          </select>
        </label>
        <div className="lab-output" role="status">
          <strong>
            {issues.length ? "Creștere limitată" : "Condiții favorabile"}
          </strong>
          {issues.length ? (
            <ul>
              {issues.map((issue) => (
                <li key={String(issue)}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p>Lumina, apa și aerarea sunt echilibrate în scenariul ales.</p>
          )}
        </div>
        <p>
          Model calitativ, nu predicție de recoltă. Presupunem că nutrienții și
          temperatura sunt potriviți.
        </p>
      </div>
    </>
  );
}
export default function SpaceLabs() {
  const [lab, setLab] = useState<(typeof labs)[number]["id"]>("orbit");
  return (
    <section className="space-block" id="space-labs">
      <div className="space-heading">
        <span className="space-kicker">
          <FlaskConical size={15} /> EXPERIMENTE
        </span>
        <h2>Laboratorul cosmic</h2>
        <p>Schimbă o variabilă și vezi ce se întâmplă.</p>
      </div>
      <div className="space-pills" aria-label="Simulatoare">
        {labs.map(({ id, title, icon: Icon }) => (
          <button key={id} aria-pressed={lab === id} onClick={() => setLab(id)}>
            <Icon size={16} />
            {title}
          </button>
        ))}
      </div>
      <div className="space-lab">
        {lab === "orbit" ? (
          <Kepler />
        ) : lab === "transit" ? (
          <Transit />
        ) : (
          <Garden />
        )}
      </div>
    </section>
  );
}
