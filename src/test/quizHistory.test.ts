import { beforeEach, describe, expect, it } from "vitest";
import { getQuizHistory, saveQuizResult } from "../lib/quizHistoryStorage";
describe("Local geography progress", () => {
  beforeEach(() => localStorage.clear());
  it("retains completed scores between reads", () => {
    saveQuizResult({ mode: "capitals", score: 4, total: 5 });
    expect(getQuizHistory()[0]).toMatchObject({
      mode: "capitals",
      score: 4,
      total: 5,
    });
    expect(getQuizHistory()).toHaveLength(1);
  });
  it("ignores corrupt browser storage", () => {
    localStorage.setItem("atlas-geography-history", "not json");
    expect(getQuizHistory()).toEqual([]);
    localStorage.setItem("atlas-geography-history", '[null, {"score":99}]');
    expect(getQuizHistory()).toEqual([]);
  });
  it("bounds local history", () => {
    for (let i = 0; i < 105; i++)
      saveQuizResult({ mode: "continents", score: 1, total: 5 });
    expect(getQuizHistory()).toHaveLength(100);
  });
});
