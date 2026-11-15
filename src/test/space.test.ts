import { describe, expect, it } from "vitest";
import {
  periodYears,
  transitPercent,
  orbits,
  worlds,
} from "@/features/space/worlds";
import { lessons, levels, sources } from "@/features/space/lessons";
describe("Space learning and lab models", () => {
  it("calculates Keplerian periods in Earth years around a solar-mass star", () => {
    expect(periodYears(1)).toBe(1);
    expect(periodYears(4)).toBe(8);
    expect(periodYears(9)).toBe(27);
  });
  it("uses the squared radius ratio for full transit depth", () => {
    expect(transitPercent(0.1)).toBeCloseTo(1);
    expect(transitPercent(0.2)).toBeCloseTo(4);
  });
  it("lists eight planets between the Sun and Pluto with increasing orbit radii", () => {
    expect(worlds.slice(1, 9).map((w) => w.id)).toEqual([
      "mercury",
      "venus",
      "earth",
      "mars",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
    ]);
    expect(orbits.every((r, i) => !i || r > orbits[i - 1])).toBe(true);
    expect(orbits).toHaveLength(worlds.length - 1);
  });
  it("covers every level and includes a reference for each lesson", () => {
    expect(levels.every((_, i) => lessons.some((l) => l.level === i))).toBe(
      true,
    );
    expect(
      lessons.every((l) => sources[l.source] && l.sections.length === 2),
    ).toBe(true);
  });
});
