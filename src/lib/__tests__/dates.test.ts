import { describe, expect, it } from "vitest";
import { addDays, parseDateKey, startOfWeek, toDateKey } from "../dates";

describe("toDateKey / parseDateKey", () => {
  it("round-trips a local date", () => {
    const d = new Date(2026, 8, 11); // Sep 11 2026
    expect(toDateKey(d)).toBe("2026-09-11");
    expect(toDateKey(parseDateKey("2026-09-11"))).toBe("2026-09-11");
  });

  it("pads single-digit month and day", () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("addDays", () => {
  it("crosses month boundaries", () => {
    expect(toDateKey(addDays(new Date(2026, 8, 30), 1))).toBe("2026-10-01");
  });

  it("supports negative deltas", () => {
    expect(toDateKey(addDays(new Date(2026, 8, 1), -1))).toBe("2026-08-31");
  });
});

describe("startOfWeek", () => {
  it("returns the preceding Sunday", () => {
    const friday = new Date(2026, 8, 11);
    expect(toDateKey(startOfWeek(friday))).toBe("2026-09-06");
  });

  it("is a no-op on a Sunday", () => {
    const sunday = new Date(2026, 8, 6);
    expect(toDateKey(startOfWeek(sunday))).toBe("2026-09-06");
  });
});
