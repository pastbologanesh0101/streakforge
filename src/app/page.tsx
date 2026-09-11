"use client";

import { useEffect, useState } from "react";
import HabitCard from "@/components/HabitCard";
import NewHabitForm from "@/components/NewHabitForm";
import { toDateKey } from "@/lib/dates";
import { createHabitId, loadHabits, saveHabits } from "@/lib/storage";
import type { Habit, HabitColor } from "@/lib/types";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage, which isn't available during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHabits(loadHabits());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveHabits(habits);
  }, [habits, hydrated]);

  function handleCreate(name: string, color: HabitColor) {
    const habit: Habit = {
      id: createHabitId(),
      name,
      color,
      createdAt: toDateKey(new Date()),
      logs: [],
    };
    setHabits((prev) => [habit, ...prev]);
  }

  function handleToggleToday(id: string) {
    const todayKey = toDateKey(new Date());
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              logs: h.logs.includes(todayKey)
                ? h.logs.filter((k) => k !== todayKey)
                : [...h.logs, todayKey],
            }
          : h,
      ),
    );
  }

  function handleDelete(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">StreakForge</h1>
        <p className="text-sm text-black/60 dark:text-white/60 mt-1">
          Track daily habits and keep the streak alive. Everything here lives
          in your browser&apos;s local storage — nothing leaves your device.
        </p>
      </header>

      <div className="mb-6">
        <NewHabitForm onCreate={handleCreate} />
      </div>

      {hydrated && habits.length === 0 && (
        <p className="text-sm text-black/40 dark:text-white/40 text-center py-12">
          No habits yet — add your first one above.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleToday={handleToggleToday}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
