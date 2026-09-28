import { CRY_EVENTS, CRY_REASONS, DAYS, FEED_EVENTS, SLEEP_SESSIONS, type DayIndex } from '@/data/monitor';
import type { CryReason } from '@/data/types';

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const TODAY_INDEX: DayIndex = DAYS[DAYS.length - 1];

export interface TimelineBlock {
  kind: 'night' | 'nap' | 'awake' | 'feed' | 'cry';
  startMin: number; // minutes since midnight
  endMin: number;
}

/** Today's 24h lane: sleep/nap blocks plus point markers for feeds and cries. */
export function todayTimeline(): TimelineBlock[] {
  const blocks: TimelineBlock[] = [];
  const today = TODAY_INDEX.date;

  for (const s of SLEEP_SESSIONS) {
    if (!sameDay(s.start, today)) continue;
    blocks.push({
      kind: s.type,
      startMin: s.start.getHours() * 60 + s.start.getMinutes(),
      endMin: s.end.getHours() * 60 + s.end.getMinutes(),
    });
  }
  for (const f of FEED_EVENTS) {
    if (!sameDay(f.time, today)) continue;
    const startMin = f.time.getHours() * 60 + f.time.getMinutes();
    blocks.push({ kind: 'feed', startMin, endMin: startMin + f.durationMin });
  }
  for (const c of CRY_EVENTS) {
    if (!sameDay(c.time, today)) continue;
    const startMin = c.time.getHours() * 60 + c.time.getMinutes();
    blocks.push({ kind: 'cry', startMin, endMin: startMin + c.durationMin });
  }
  return blocks.sort((a, b) => a.startMin - b.startMin);
}

/** hour (0-23) x day-of-week-ish grid of cry counts across the last 21 days. */
export function cryHeatmap(): number[][] {
  const days = DAYS.slice(-21);
  return days.map((day) => {
    const counts = Array(24).fill(0);
    for (const c of CRY_EVENTS) {
      if (sameDay(c.time, day.date)) counts[c.time.getHours()]++;
    }
    return counts;
  });
}

export interface DailySleep {
  date: Date;
  nightMin: number;
  napMin: number;
}

export function sleepPerDay(): DailySleep[] {
  return DAYS.map((day) => {
    const sessions = SLEEP_SESSIONS.filter((s) => sameDay(s.start, day.date));
    const nightMin = sessions.filter((s) => s.type === 'night').reduce((sum, s) => sum + (s.end.getTime() - s.start.getTime()) / 60000, 0);
    const napMin = sessions.filter((s) => s.type === 'nap').reduce((sum, s) => sum + (s.end.getTime() - s.start.getTime()) / 60000, 0);
    return { date: day.date, nightMin: Math.round(nightMin), napMin: Math.round(napMin) };
  });
}

export interface DailyFeeds {
  date: Date;
  count: number;
  avgIntervalMin: number;
}

export function feedsPerDay(): DailyFeeds[] {
  return DAYS.map((day) => {
    const feeds = FEED_EVENTS.filter((f) => sameDay(f.time, day.date)).sort((a, b) => a.time.getTime() - b.time.getTime());
    let avgIntervalMin = 0;
    if (feeds.length > 1) {
      const gaps = feeds.slice(1).map((f, i) => (f.time.getTime() - feeds[i].time.getTime()) / 60000);
      avgIntervalMin = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
    }
    return { date: day.date, count: feeds.length, avgIntervalMin };
  });
}

export function cryReasonBreakdown(): Array<{ reason: CryReason; count: number }> {
  const counts: Record<CryReason, number> = { hunger: 0, painGas: 0, sleepy: 0, wantsHeld: 0, diaper: 0, discomfort: 0 };
  for (const c of CRY_EVENTS) {
    if (c.confirmedReason) counts[c.confirmedReason]++;
  }
  return CRY_REASONS.map((reason) => ({ reason, count: counts[reason] }));
}

export function averageTimeToCalm(): number {
  const values = CRY_EVENTS.map((c) => c.timeToCalmMin);
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
}

export function cryCountToday(): number {
  return CRY_EVENTS.filter((c) => sameDay(c.time, TODAY_INDEX.date)).length;
}

export function lastFeedForNow(now: Date = new Date(TODAY_INDEX.date.getTime() + 15 * 3600000)): { minutesAgo: number } {
  const priorFeeds = FEED_EVENTS.filter((f) => f.time <= now).sort((a, b) => b.time.getTime() - a.time.getTime());
  const last = priorFeeds[0];
  return { minutesAgo: last ? Math.round((now.getTime() - last.time.getTime()) / 60000) : 0 };
}
