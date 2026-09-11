"use client";

import { HABIT_PALETTES } from "@/lib/colors";
import { toDateKey } from "@/lib/dates";
import { currentStreak, longestStreak } from "@/lib/streaks";
import type { Habit } from "@/lib/types";
import Heatmap from "./Heatmap";

export default function HabitCard({
  habit,
  onToggleToday,
  onDelete,
}: {
  habit: Habit;
  onToggleToday: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const todayKey = toDateKey(new Date());
  const doneToday = habit.logs.includes(todayKey);
  const streak = currentStreak(habit.logs);
  const best = longestStreak(habit.logs);
  const palette = HABIT_PALETTES[habit.color];

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${palette.dot}`} />
          <h3 className="font-medium truncate">{habit.name}</h3>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          aria-label={`Delete ${habit.name}`}
          className="text-xs text-black/40 dark:text-white/40 hover:text-red-500 transition-colors"
        >
          Delete
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className={`font-semibold ${palette.text}`}>
          🔥 {streak} day{streak === 1 ? "" : "s"}
        </span>
        <span className="text-black/50 dark:text-white/50">Best: {best}</span>
      </div>

      <Heatmap logs={habit.logs} color={habit.color} />

      <button
        onClick={() => onToggleToday(habit.id)}
        className={`mt-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors ${
          doneToday ? "bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30" : palette.solid
        }`}
      >
        {doneToday ? "Done today ✓ (undo)" : "Mark done today"}
      </button>
    </div>
  );
}
