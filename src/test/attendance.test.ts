import { beforeEach, describe, expect, it } from "vitest";
import {
  dayKey,
  isDayKey,
  readAttendance,
  writeAttendance,
  attendanceStreak,
} from "../lib/attendanceStorage";
describe("Attendance calendar", () => {
  beforeEach(() => localStorage.clear());
  it("uses local calendar days and validates leap dates", () => {
    expect(dayKey(new Date(2026, 9, 7, 23))).toBe("2026-10-07");
    expect(isDayKey("2024-02-29")).toBe(true);
    expect(isDayKey("2026-02-29")).toBe(false);
  });
  it("persists marks with optional notes and supports unmarking", () => {
    expect(writeAttendance({ "2026-10-07": "Capitalele Europei" })).toBe(true);
    expect(readAttendance()).toEqual({ "2026-10-07": "Capitalele Europei" });
    writeAttendance({});
    expect(readAttendance()).toEqual({});
  });
  it("ignores corrupt data", () => {
    localStorage.setItem(
      "atlas-attendance",
      '{"2026-02-30":"bad","2026-10-07":true,"2026-10-06":""}',
    );
    expect(readAttendance()).toEqual({ "2026-10-06": "" });
  });
  it("counts consecutive local days across months and allows today to be pending", () => {
    const days = { "2026-09-30": "", "2026-10-01": "", "2026-10-02": "" };
    expect(attendanceStreak(days, new Date(2026, 9, 2))).toBe(3);
    expect(attendanceStreak(days, new Date(2026, 9, 3))).toBe(3);
    expect(attendanceStreak(days, new Date(2026, 9, 4))).toBe(0);
  });
});
