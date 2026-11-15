import { useState } from "react";
import { ArrowRight, CheckCircle, RotateCcw } from "lucide-react";
const questions = [
  [
    "Care este cea mai fierbinte planetă?",
    ["Mercur", "Venus", "Marte", "Jupiter"],
    1,
    "Atmosfera densă de CO₂ a lui Venus reține căldura.",
  ],
  [
    "Ce este un an-lumină?",
    ["O durată", "O temperatură", "O distanță", "O viteză"],
    2,
    "Este distanța pe care lumina o parcurge într-un an.",
  ],
  [
    "Ce cauzează fazele obișnuite ale Lunii?",
    [
      "Unghiul din care vedem partea luminată",
      "Umbra Pământului la fiecare fază",
      "Schimbarea mărimii Lunii",
      "Norii de pe Pământ",
    ],
    0,
    "Partea luminată este văzută din unghiuri diferite pe măsură ce Luna orbitează.",
  ],
  [
    "De ce plutesc astronauții pe ISS?",
    [
      "Gravitația dispare",
      "Stația și astronauții cad împreună",
      "Aerul este mai dens",
      "Pământul îi respinge",
    ],
    1,
    "Stația și astronauții se află în cădere liberă continuă pe orbită.",
  ],
  [
    "Ce problemă poate crea prea multă apă la rădăcini?",
    [
      "Le scade accesul la oxigen",
      "Stinge instantaneu LED-urile",
      "Elimină gravitația",
      "Schimbă culoarea Soarelui",
    ],
    0,
    "Un exces de apă reduce schimbul de gaze în jurul rădăcinilor.",
  ],
  [
    "Cât durează o orbită solară la 4 UA?",
    ["2 ani", "4 ani", "8 ani", "16 ani"],
    2,
    "P = √(4³) = 8 ani, pentru un corp cu masă neglijabilă.",
  ],
  [
    "Ce fracție de lumină blochează ideal o planetă cu raza de 0,1 ori cea a stelei?",
    ["0,1%", "1%", "10%", "25%"],
    1,
    "Raportul ariilor este 0,1² = 0,01, adică 1%.",
  ],
  [
    "Ce observăm ca radiație cosmică de fond?",
    [
      "Vântul solar",
      "Lumina reflectată de Lună",
      "Emisia unor orașe îndepărtate",
      "Lumina din universul timpuriu, deplasată spre microunde",
    ],
    3,
    "Radiația a început să se propage liber când universul a devenit transparent, în epoca recombinării.",
  ],
] as const;
export default function SpaceQuiz() {
  const [index, setIndex] = useState(0),
    [answer, setAnswer] = useState<number | null>(null),
    [score, setScore] = useState(0);
  const q = questions[index];
  return (
    <section className="space-block" id="space-quiz">
      <div className="space-heading">
        <span className="space-kicker">
          <CheckCircle size={15} /> RECAPITULARE
        </span>
        <h2>Quiz de astronomie</h2>
      </div>
      <div className="space-quiz">
        {q ? (
          <>
            <span className="space-kicker">
              ÎNTREBAREA {index + 1} / {questions.length}
            </span>
            <h3>{q[0]}</h3>
            <div className="space-quiz-options">
              {q[1].map((option, i) => (
                <button
                  key={option}
                  disabled={answer !== null}
                  data-result={
                    answer === null
                      ? ""
                      : i === q[2]
                        ? "correct"
                        : i === answer
                          ? "wrong"
                          : ""
                  }
                  onClick={() => {
                    setAnswer(i);
                    if (i === q[2]) setScore((s) => s + 1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {answer !== null && (
              <>
                <p role="status">
                  <strong>
                    {answer === q[2]
                      ? "Corect! "
                      : "Mai încearcă la următoarea. "}
                  </strong>
                  {q[3]}
                </p>
                <button
                  className="space-primary"
                  onClick={() => {
                    setIndex((i) => i + 1);
                    setAnswer(null);
                  }}
                >
                  {index + 1 === questions.length
                    ? "Vezi rezultatul"
                    : "Următoarea întrebare"}{" "}
                  <ArrowRight size={17} />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h3>
              Ai obținut {score} din {questions.length} puncte.
            </h3>
            <button
              className="space-primary"
              onClick={() => {
                setIndex(0);
                setAnswer(null);
                setScore(0);
              }}
            >
              <RotateCcw size={17} /> Reia quizul
            </button>
          </>
        )}
      </div>
    </section>
  );
}
