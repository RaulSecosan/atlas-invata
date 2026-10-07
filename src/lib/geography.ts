import data from "@/data/countries.json";
import continentData from "@/data/continents.json";
export type ContinentId =
  | "europe"
  | "asia"
  | "africa"
  | "north-america"
  | "south-america"
  | "oceania"
  | "antarctica";
export type Continent = {
  id: ContinentId;
  name: string;
  short: string;
  description: string;
  fact: string;
};
export const continents = continentData as Continent[];
export type Country = {
  code: string;
  name: string;
  capital: string[];
  continent: string;
  note: string;
  area: number;
};
export const countries: Country[] = data;
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export const shuffle = <T>(items: readonly T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
export type Question = { country: Country; correct: string; options: string[] };
export function createQuestions(
  pool: Country[],
  mode: "capitals" | "continents",
  count: number,
): Question[] {
  const eligible = pool.filter(
    (c) => mode === "continents" || c.capital.length > 0,
  );
  return shuffle(eligible)
    .slice(0, count)
    .map((country) => {
      const correct =
        mode === "continents"
          ? continents.find((c) => c.id === country.continent)!.name
          : country.capital.join(" / ");
      const alternatives =
        mode === "continents"
          ? continents.map((c) => c.name)
          : countries
              .filter((c) => c.capital.length)
              .map((c) => c.capital.join(" / "));
      const distractors = shuffle(
        [...new Set(alternatives)].filter(
          (s) =>
            s !== correct &&
            (mode === "continents" ||
              !s.split(" / ").some((cap) => country.capital.includes(cap))),
        ),
      ).slice(0, 3);
      return { country, correct, options: shuffle([correct, ...distractors]) };
    });
}
