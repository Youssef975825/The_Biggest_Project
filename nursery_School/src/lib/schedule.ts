// src/lib/schedule.ts: which pack/stories are visible today. Pure functions, easy to test.
const TZ = 'Africa/Cairo';

/** Today's date in Cairo as 'YYYY-MM-DD'. ISO dates compare correctly as plain strings. */
export function cairoToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
}

/** Latest pack whose month is <= the current month (so a late upload never leaves a blank page). */
export function getCurrentPack<T extends { month: string }>(packs: T[], today = cairoToday()): T | undefined {
  const month = today.slice(0, 7);
  return [...packs].sort((a, b) => a.month.localeCompare(b.month)).filter(p => p.month <= month).at(-1);
}

export type ReleaseMode = 'current-only' | 'cumulative';

/** Released stories. 'current-only' = just the newest one, 'cumulative' = all released so far. */
export function getReleasedStories<S extends { releaseDate: string }>(stories: S[], mode: ReleaseMode, today = cairoToday()): S[] {
  const released = stories.filter(s => s.releaseDate <= today).sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  return mode === 'current-only' ? released.slice(-1) : released;
}

export const isReleased = (releaseDate: string, today = cairoToday()) => releaseDate <= today;