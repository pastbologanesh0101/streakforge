export type Habit = {
  id: string;
  name: string;
  color: HabitColor;
  createdAt: string; // ISO date string (YYYY-MM-DD)
  /** Set of completed day keys, formatted YYYY-MM-DD, local time. */
  logs: string[];
};

export const HABIT_COLORS = [
  "emerald",
  "sky",
  "violet",
  "amber",
  "rose",
  "cyan",
] as const;

export type HabitColor = (typeof HABIT_COLORS)[number];
