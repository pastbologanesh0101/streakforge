import { addDays, parseDateKey, startOfWeek, toDateKey } from "./dates";

/**
 * Current streak length. A streak stays "alive" on days that haven't been
 * checked in yet today — it only breaks once a full day is skipped — so an
 * unbroken run ending yesterday still counts until today lapses too.
 */
export function currentStreak(logs: string[], today: Date = new Date()): number {
  const done = new Set(logs);
  let cursor = today;
  if (!done.has(toDateKey(cursor))) {
    cursor = addDays(cursor, -1);
    if (!done.has(toDateKey(cursor))) return 0;
  }
  let count = 0;
  while (done.has(toDateKey(cursor))) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

export function longestStreak(logs: string[]): number {
  if (logs.length === 0) return 0;
  const sorted = [...new Set(logs)].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = parseDateKey(sorted[i - 1]);
    const curr = parseDateKey(sorted[i]);
    const dayGap = Math.round((curr.getTime() - prev.getTime()) / 86_400_000);
    run = dayGap === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}

export function isDoneOn(logs: string[], date: Date): boolean {
  return logs.includes(toDateKey(date));
}

export type HeatmapCell = {
  key: string;
  date: Date;
  done: boolean;
  inRange: boolean;
};

/**
 * Weekly columns (oldest first), each 7 cells Sun-Sat, for a GitHub-style
 * contribution grid covering the last `weeks` weeks up to and including today.
 */
export function buildHeatmap(
  logs: string[],
  weeks: number,
  today: Date = new Date(),
): HeatmapCell[][] {
  const done = new Set(logs);
  const end = today;
  const start = addDays(startOfWeek(end), -(weeks - 1) * 7);

  const columns: HeatmapCell[][] = [];
  for (let w = 0; w < weeks; w++) {
    const column: HeatmapCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date = addDays(start, w * 7 + d);
      const key = toDateKey(date);
      column.push({
        key,
        date,
        done: done.has(key),
        inRange: date.getTime() <= end.getTime(),
      });
    }
    columns.push(column);
  }
  return columns;
}
