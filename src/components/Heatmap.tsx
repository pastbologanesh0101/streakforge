"use client";

import { buildHeatmap } from "@/lib/streaks";
import type { HabitColor } from "@/lib/types";
import { HABIT_PALETTES } from "@/lib/colors";

const WEEKS = 18;

export default function Heatmap({
  logs,
  color,
}: {
  logs: string[];
  color: HabitColor;
}) {
  const grid = buildHeatmap(logs, WEEKS, new Date());
  const dot = HABIT_PALETTES[color].dot;

  return (
    <div
      className="grid grid-flow-col gap-[3px]"
      style={{ gridTemplateRows: "repeat(7, 10px)" }}
      role="img"
      aria-label={`Last ${WEEKS} weeks of activity`}
    >
      {grid.flatMap((column) =>
        column.map((cell) => (
          <div
            key={cell.key}
            title={`${cell.key}${cell.done ? " — done" : ""}`}
            className={`h-[10px] w-[10px] rounded-[2px] ${
              !cell.inRange
                ? "invisible"
                : cell.done
                  ? dot
                  : "bg-black/10 dark:bg-white/10"
            }`}
          />
        )),
      )}
    </div>
  );
}
