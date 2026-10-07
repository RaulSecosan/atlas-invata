import type { Operation, Level } from "./mathEngine";

export interface SessionRecord {
  id: string;
  operation: Operation;
  level: Level;
  multiplyBy: number | null;
  score: number;
  total: number;
  timeSeconds: number | null;
  date: string; // ISO string
}

const STORAGE_KEY = "mathpro-history";

export function getHistory(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(record: Omit<SessionRecord, "id" | "date">): void {
  const history = getHistory();
  history.unshift({
    ...record,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  });
  // Keep last 200 records
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 200)));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
