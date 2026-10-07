export type Attendance = Record<string, string>;
const KEY = "atlas-attendance";
export function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function isDayKey(key: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return false;
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d)) === key;
}
export function readAttendance(): Attendance {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        ([k, v]) => isDayKey(k) && typeof v === "string" && v.length <= 300,
      ),
    );
  } catch {
    return {};
  }
}
export function writeAttendance(data: Attendance): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}
export function attendanceStreak(data: Attendance, today: Date) {
  const cursor = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  if (!(dayKey(cursor) in data)) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (dayKey(cursor) in data) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}
