import type { HabitColor } from "./types";

type Palette = {
  dot: string;
  ring: string;
  solid: string;
  text: string;
  border: string;
};

// Full literal class names so Tailwind's compiler can see and keep them.
export const HABIT_PALETTES: Record<HabitColor, Palette> = {
  emerald: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-400",
    solid: "bg-emerald-500 hover:bg-emerald-400",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
  },
  sky: {
    dot: "bg-sky-500",
    ring: "ring-sky-400",
    solid: "bg-sky-500 hover:bg-sky-400",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-500",
  },
  violet: {
    dot: "bg-violet-500",
    ring: "ring-violet-400",
    solid: "bg-violet-500 hover:bg-violet-400",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500",
  },
  amber: {
    dot: "bg-amber-500",
    ring: "ring-amber-400",
    solid: "bg-amber-500 hover:bg-amber-400",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500",
  },
  rose: {
    dot: "bg-rose-500",
    ring: "ring-rose-400",
    solid: "bg-rose-500 hover:bg-rose-400",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
  },
  cyan: {
    dot: "bg-cyan-500",
    ring: "ring-cyan-400",
    solid: "bg-cyan-500 hover:bg-cyan-400",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500",
  },
};
