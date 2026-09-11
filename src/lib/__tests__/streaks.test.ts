import { describe, expect, it } from "vitest";
import { addDays, toDateKey } from "../dates";
import { buildHeatmap, currentStreak, longestStreak } from "../streaks";

const day = (offset: number, from = new Date(2026, 8, 11)) =>
  toDateKey(addDays(from, offset));

describe("currentStreak", () => {
  const today = new Date(2026, 8, 11); // Fri Sep 11 2026

  it("is 0 with no logs", () => {
    expect(currentStreak([], today)).toBe(0);
  });

  it("counts a run ending today", () => {
    const logs = [day(-2, today), day(-1, today), day(0, today)];
    expect(currentStreak(logs, today)).toBe(3);
  });

  it("stays alive if yesterday was done but today has not been checked in yet", () => {
    const logs = [day(-2, today), day(-1, today)];
    expect(currentStreak(logs, today)).toBe(2);
  });

  it("does not bridge a skipped day", () => {
    const logs = [day(-3, today), day(-1, today)]; // gap at day -2
    expect(currentStreak(logs, today)).toBe(1); // only yesterday counts
  });

  it("is 0 once both today and yesterday are missed", () => {
    const logs = [day(-3, today), day(-2, today)];
    expect(currentStreak(logs, today)).toBe(0);
  });

  it("ignores unrelated future or far-past entries", () => {
    const logs = [day(0, today), day(-100, today)];
    expect(currentStreak(logs, today)).toBe(1);
  });
});

describe("longestStreak", () => {
  it("is 0 with no logs", () => {
    expect(longestStreak([])).toBe(0);
  });

  it("finds the best run even after later gaps", () => {
    const today = new Date(2026, 8, 11);
    const logs = [
      day(-10, today),
      day(-9, today),
      day(-8, today),
      day(-8, today), // duplicate, should not inflate the run
      day(-5, today),
      day(0, today),
    ];
    expect(longestStreak(logs)).toBe(3);
  });
});

describe("buildHeatmap", () => {
  it("produces `weeks` columns of exactly 7 days each", () => {
    const grid = buildHeatmap([], 18, new Date(2026, 8, 11));
    expect(grid).toHaveLength(18);
    for (const column of grid) expect(column).toHaveLength(7);
  });

  it("marks cells after today as out of range", () => {
    const today = new Date(2026, 8, 11);
    const grid = buildHeatmap([], 2, today);
    const flat = grid.flat();
    const future = flat.filter((c) => c.date.getTime() > today.getTime());
    expect(future.every((c) => !c.inRange)).toBe(true);
    expect(future.length).toBeGreaterThan(0);
  });

  it("marks a logged day as done", () => {
    const today = new Date(2026, 8, 11);
    const key = toDateKey(today);
    const grid = buildHeatmap([key], 1, today);
    const cell = grid.flat().find((c) => c.key === key);
    expect(cell?.done).toBe(true);
  });
});
