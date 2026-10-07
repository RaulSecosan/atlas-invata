import { describe, it, expect } from "vitest";
import {
  continents,
  countries,
  createQuestions,
  normalize,
} from "../lib/geography";
describe("Geography data and quiz", () => {
  it("covers 197 unique countries with valid continent assignments", () => {
    expect(countries).toHaveLength(197);
    expect(new Set(countries.map((c) => c.code)).size).toBe(countries.length);
    expect(
      countries.every((c) => continents.some((x) => x.id === c.continent)),
    ).toBe(true);
    expect(countries.filter((c) => c.continent === "antarctica")).toHaveLength(
      0,
    );
  });
  it("has the Romanian capital and preserves countries without official capitals", () => {
    expect(countries.find((c) => c.code === "RO")?.capital).toEqual([
      "București",
    ]);
    expect(countries.find((c) => c.code === "NR")?.capital).toEqual([]);
  });
  it("generates distinct questions and four unambiguous choices across both quiz modes", () => {
    for (const mode of ["capitals", "continents"] as const) {
      for (let i = 0; i < 20; i++) {
        const qs = createQuestions(countries, mode, 50);
        expect(qs).toHaveLength(50);
        expect(new Set(qs.map((q) => q.country.code)).size).toBe(50);
        qs.forEach((q) => {
          expect(q.options).toHaveLength(4);
          expect(new Set(q.options).size).toBe(4);
          expect(q.options.filter((x) => x === q.correct)).toHaveLength(1);
        });
      }
    }
  });
  it("limits questions to the chosen country and handles an empty pool", () => {
    const ro = countries.filter((c) => c.code === "RO");
    expect(createQuestions(ro, "capitals", 10)).toHaveLength(1);
    expect(createQuestions([], "capitals", 10)).toEqual([]);
    expect(
      createQuestions(
        countries.filter((c) => c.code === "NR"),
        "capitals",
        5,
      ),
    ).toEqual([]);
  });
  it("matches Romanian names without diacritics", () => {
    expect(normalize("București România")).toBe("bucuresti romania");
  });
});
