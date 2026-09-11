"use client";

import { useState } from "react";
import { HABIT_COLORS, type HabitColor } from "@/lib/types";
import { HABIT_PALETTES } from "@/lib/colors";

export default function NewHabitForm({
  onCreate,
}: {
  onCreate: (name: string, color: HabitColor) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<HabitColor>(HABIT_COLORS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed, color);
    setName("");
    setColor(HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 sm:items-center rounded-xl border border-black/10 dark:border-white/10 p-4"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New habit, e.g. Read 20 pages"
        maxLength={60}
        className="flex-1 min-w-0 rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:focus:border-white/30"
      />
      <div className="flex items-center gap-1.5 shrink-0">
        {HABIT_COLORS.map((c) => (
          <button
            type="button"
            key={c}
            aria-label={`Use ${c} color`}
            onClick={() => setColor(c)}
            className={`h-5 w-5 rounded-full ${HABIT_PALETTES[c].dot} ${
              color === c ? `ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black ${HABIT_PALETTES[c].ring}` : ""
            }`}
          />
        ))}
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Add habit
      </button>
    </form>
  );
}
