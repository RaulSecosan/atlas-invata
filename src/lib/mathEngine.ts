export type Operation = "adunare" | "scadere" | "inmultire" | "impartire" | "combinat";
export type Level = 1 | 2 | 3;

export interface MathProblem {
  a: number;
  b: number;
  operation: "+" | "-" | "×" | "÷";
  answer: number;
  display: string;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const levelRanges: Record<Level, { add: [number, number]; mul: [number, number] }> = {
  1: { add: [1, 20], mul: [1, 10] },
  2: { add: [10, 100], mul: [1, 12] },
  3: { add: [50, 500], mul: [2, 15] },
};

export function generateProblem(
  operation: Operation,
  level: Level,
  multiplyBy?: number
): MathProblem {
  const range = levelRanges[level];

  if (operation === "combinat") {
    const ops: Operation[] = ["adunare", "scadere", "inmultire", "impartire"];
    return generateProblem(ops[rand(0, 3)], level);
  }

  if (operation === "adunare") {
    const a = rand(range.add[0], range.add[1]);
    const b = rand(range.add[0], range.add[1]);
    return { a, b, operation: "+", answer: a + b, display: `${a} + ${b}` };
  }

  if (operation === "scadere") {
    let a = rand(range.add[0], range.add[1]);
    let b = rand(range.add[0], range.add[1]);
    if (b > a) [a, b] = [b, a];
    return { a, b, operation: "-", answer: a - b, display: `${a} - ${b}` };
  }

  if (operation === "inmultire") {
    const a = multiplyBy ?? rand(2, 9);
    const b = rand(range.mul[0], range.mul[1]);
    return { a, b, operation: "×", answer: a * b, display: `${a} × ${b}` };
  }

  // impartire
  const divisor = multiplyBy ?? rand(2, 9);
  const b = rand(range.mul[0], range.mul[1]);
  const product = divisor * b;
  return { a: product, b: divisor, operation: "÷", answer: b, display: `${product} ÷ ${divisor}` };
}

export function generateSet(
  operation: Operation,
  level: Level,
  count: number = 10,
  multiplyBy?: number
): MathProblem[] {
  return Array.from({ length: count }, () => generateProblem(operation, level, multiplyBy));
}

export const operationLabels: Record<Operation, string> = {
  adunare: "Adunare",
  scadere: "Scădere",
  inmultire: "Înmulțire",
  impartire: "Împărțire",
  combinat: "Combinat",
};

export const operationEmojis: Record<Operation, string> = {
  adunare: "➕",
  scadere: "➖",
  inmultire: "✖️",
  impartire: "➗",
  combinat: "🔀",
};

export const operationColors: Record<Operation, string> = {
  adunare: "bg-primary",
  scadere: "bg-secondary",
  inmultire: "bg-accent",
  impartire: "bg-success",
  combinat: "bg-foreground/80",
};
