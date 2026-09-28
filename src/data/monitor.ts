import { createRng } from '@/data/seed';
import { AZIZ, TODAY } from '@/data/profiles';
import type { Bilingual, CryReason } from '@/data/types';

const rng = createRng(19840512);

export const CRY_REASONS: CryReason[] = ['hunger', 'painGas', 'sleepy', 'wantsHeld', 'diaper', 'discomfort'];

export const CRY_REASON_LABELS: Record<CryReason, Bilingual> = {
  hunger: { uz: 'Ochlik', en: 'Hunger' },
  painGas: { uz: 'Ogʻriq / gaz', en: 'Pain / gas' },
  sleepy: { uz: 'Uyqu keladi', en: 'Sleepy' },
  wantsHeld: { uz: 'Quchoqqa soʻraydi', en: 'Wants to be held' },
  diaper: { uz: 'Xoʻl choyshab', en: 'Diaper' },
  discomfort: { uz: 'Noqulaylik', en: 'Discomfort' },
};

export const CHECKLIST_BY_REASON: Record<CryReason, Bilingual<string[]>> = {
  hunger: {
    uz: ['Ovqatlantirib koʻring', 'Bir necha daqiqa kuting — chala uygʻonayotgan boʻlishi mumkin'],
    en: ['Try a feed', 'Wait a couple of minutes — they may be waking gradually'],
  },
  painGas: {
    uz: ['Qorinchasini yengil siypalang', 'Oyoqchalarini asta bukib-yozing', 'Ovqatdan keyin koʻtarib turing'],
    en: ['Gently rub the tummy', 'Bicycle the legs slowly', 'Hold upright after feeding'],
  },
  sleepy: {
    uz: ['Xonani xiraroq va sokin qiling', 'Asta silkitib uxlatishga harakat qiling'],
    en: ['Dim the room and keep it quiet', 'Try gentle rocking to settle'],
  },
  wantsHeld: {
    uz: ['Quchoqlab, ovoz bilan tinchlantiring', 'Terisiga teri tekkizib ushlab turing'],
    en: ['Hold and soothe with your voice', 'Try skin-to-skin contact'],
  },
  diaper: {
    uz: ['Choyshabini tekshiring va almashtiring'],
    en: ['Check and change the diaper'],
  },
  discomfort: {
    uz: ['Kiyimini tekshiring — tor joyi bormi?', 'Xona haroratini tekshiring'],
    en: ['Check clothing for anything tight', 'Check the room temperature'],
  },
};

export interface FeedEvent {
  id: string;
  time: Date;
  durationMin: number;
}

export interface SleepSession {
  id: string;
  start: Date;
  end: Date;
  type: 'night' | 'nap';
}

export interface ReasonProbability {
  reason: CryReason;
  probability: number;
}

export interface CryEvent {
  id: string;
  time: Date;
  durationMin: number;
  trueReason: CryReason;
  predictions: ReasonProbability[];
  confirmedReason: CryReason | null;
  timeSinceLastFeedMin: number;
  sleptBeforeMin: number;
  timeToCalmMin: number;
}

export interface DayIndex {
  dayNumber: number; // 1..28
  date: Date;
  learningConfidence: number; // 0-100, the model's confidence that day
}

export const HISTORY_DAYS = 28;
export const LEARNING_WINDOW_DAYS = 21;
/** Where the live demo narrative starts — see DECISIONS.md */
export const DEMO_LEARNING_DAY = 14;

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const DAYS: DayIndex[] = Array.from({ length: HISTORY_DAYS }, (_, i) => {
  const dayNumber = i + 1;
  const date = startOfDay(new Date(TODAY.getTime() - (HISTORY_DAYS - dayNumber) * 86400000));
  const learningConfidence =
    dayNumber <= LEARNING_WINDOW_DAYS
      ? 45 + (80 - 45) * (dayNumber / LEARNING_WINDOW_DAYS) + rng.float(-2, 2)
      : 80 + rng.float(-3, 4);
  return { dayNumber, date, learningConfidence: Math.round(Math.min(96, Math.max(40, learningConfidence))) };
});

export function confidenceForDay(dayNumber: number): number {
  return DAYS.find((d) => d.dayNumber === Math.min(dayNumber, HISTORY_DAYS))?.learningConfidence ?? 45;
}

export const DEMO_CONFIDENCE = confidenceForDay(DEMO_LEARNING_DAY);

/** Predicts cry reasons given context, sharper as `confidence` rises — reused live by the "Simulate cry" demo control. */
export function predictReasons(
  context: { timeSinceLastFeedMin: number; sleptBeforeMin: number; hour: number },
  confidence: number,
  bias?: CryReason,
): ReasonProbability[] {
  const weights: Record<CryReason, number> = {
    hunger: context.timeSinceLastFeedMin > 150 ? 3 : 1,
    painGas: context.sleptBeforeMin < 20 ? 2.4 : 1,
    sleepy: context.hour >= 19 || context.hour <= 6 ? 2.2 : 1,
    wantsHeld: 1.2,
    diaper: 1,
    discomfort: 0.8,
  };
  if (bias) weights[bias] *= 2.5;

  const sharpness = 0.6 + (confidence / 100) * 1.8;
  const scored = CRY_REASONS.map((reason) => ({ reason, score: weights[reason] ** sharpness }));
  const total = scored.reduce((s, r) => s + r.score, 0);
  return scored
    .map(({ reason, score }) => ({ reason, probability: Math.round((score / total) * 100) }))
    .sort((a, b) => b.probability - a.probability);
}

function buildDay(day: DayIndex, rngLocal: ReturnType<typeof createRng>) {
  const feeds: FeedEvent[] = [];
  const sleeps: SleepSession[] = [];
  const cries: CryEvent[] = [];

  // Night sleep lengthens gradually across the window.
  const nightSleepMin = 300 + Math.round((day.dayNumber / HISTORY_DAYS) * 95) + rngLocal.int(-15, 15);
  const nightStart = new Date(day.date);
  nightStart.setHours(20, rngLocal.int(30, 59), 0, 0);
  const nightEnd = new Date(nightStart.getTime() + nightSleepMin * 60000);
  sleeps.push({ id: `sleep-${day.dayNumber}-night`, start: nightStart, end: nightEnd, type: 'night' });

  // 3-4 day naps.
  let cursor = 7;
  const napCount = rngLocal.int(3, 4);
  for (let n = 0; n < napCount; n++) {
    cursor += rngLocal.float(1.5, 2.5);
    if (cursor > 19.5) break;
    const start = new Date(day.date);
    start.setHours(Math.floor(cursor), Math.round((cursor % 1) * 60), 0, 0);
    const napMin = rngLocal.int(35, 90);
    const end = new Date(start.getTime() + napMin * 60000);
    sleeps.push({ id: `sleep-${day.dayNumber}-nap-${n}`, start, end, type: 'nap' });
  }

  // Feeds roughly every 2.5-3.5h, tapering off overnight feeds as the window progresses.
  let feedCursor = 6 + rngLocal.float(-0.3, 0.3);
  let feedIndex = 0;
  const includesNightFeed = day.dayNumber < 18 && rngLocal.bool(0.6 - (day.dayNumber / 18) * 0.5);
  while (feedCursor < 23.5) {
    const time = new Date(day.date);
    time.setHours(Math.floor(feedCursor), Math.round((feedCursor % 1) * 60), 0, 0);
    feeds.push({ id: `feed-${day.dayNumber}-${feedIndex}`, time, durationMin: rngLocal.int(12, 28) });
    feedIndex++;
    feedCursor += rngLocal.float(2.5, 3.5);
  }
  if (includesNightFeed) {
    const time = new Date(day.date);
    time.setHours(2, rngLocal.int(0, 59), 0, 0);
    feeds.push({ id: `feed-${day.dayNumber}-night`, time, durationMin: rngLocal.int(10, 18) });
    feeds.sort((a, b) => a.time.getTime() - b.time.getTime());
  }

  // Cries: 4-8/day, weighted toward the 18:00-20:00 window.
  const cryCount = rngLocal.int(4, 8);
  const eveningWeight = 3;
  const hourPool = [
    ...Array(eveningWeight).fill([18, 20]),
    [6, 9],
    [9, 12],
    [12, 15],
    [15, 18],
    [20, 22],
    [22, 24],
  ] as Array<[number, number]>;

  for (let c = 0; c < cryCount; c++) {
    const [hFrom, hTo] = rngLocal.pick(hourPool);
    const hour = rngLocal.float(hFrom, hTo, 3);
    const time = new Date(day.date);
    time.setHours(Math.floor(hour), Math.round((hour % 1) * 60), 0, 0);

    const priorFeed = [...feeds].reverse().find((f) => f.time < time);
    const timeSinceLastFeedMin = priorFeed ? Math.round((time.getTime() - priorFeed.time.getTime()) / 60000) : 180;
    const priorSleep = [...sleeps].reverse().find((s) => s.end <= time);
    const sleptBeforeMin = priorSleep ? Math.round((priorSleep.end.getTime() - priorSleep.start.getTime()) / 60000) : 60;
    const wokeRecently = priorSleep ? Math.round((time.getTime() - priorSleep.end.getTime()) / 60000) : 999;

    let trueReason: CryReason;
    if (wokeRecently < 25 && rngLocal.bool(0.5)) trueReason = 'painGas';
    else if (timeSinceLastFeedMin > 150) trueReason = 'hunger';
    else trueReason = rngLocal.weighted([
      ['sleepy', hour >= 19 || hour <= 6 ? 2.5 : 0.8],
      ['wantsHeld', 1.4],
      ['diaper', 1.2],
      ['discomfort', 0.8],
      ['hunger', 0.6],
      ['painGas', 0.6],
    ]);

    const confidence = day.learningConfidence;
    const predictions = predictReasons({ timeSinceLastFeedMin, sleptBeforeMin, hour }, confidence, trueReason);
    const feedbackGiven = rngLocal.bool(0.88);
    const feedbackAccurate = rngLocal.bool(0.85);
    const confirmedReason = feedbackGiven ? (feedbackAccurate ? trueReason : rngLocal.pick(CRY_REASONS)) : null;

    const baseCalm = 12 - (confidence / 100) * 6;
    const timeToCalmMin = Math.max(2, Math.round(baseCalm + rngLocal.float(-2, 3)));

    cries.push({
      id: `cry-${day.dayNumber}-${c}`,
      time,
      durationMin: rngLocal.int(2, 9),
      trueReason,
      predictions,
      confirmedReason,
      timeSinceLastFeedMin,
      sleptBeforeMin,
      timeToCalmMin,
    });
  }

  return { feeds, sleeps, cries };
}

const built = DAYS.map((day) => buildDay(day, rng));

export const FEED_EVENTS: FeedEvent[] = built.flatMap((b) => b.feeds);
export const SLEEP_SESSIONS: SleepSession[] = built.flatMap((b) => b.sleeps);
export const CRY_EVENTS: CryEvent[] = built.flatMap((b) => b.cries).sort((a, b) => a.time.getTime() - b.time.getTime());

export interface FamilyAlertMember {
  id: string;
  role: Bilingual;
  name: string;
  enabled: boolean;
}

export const FAMILY_ALERTS: FamilyAlertMember[] = [
  { id: 'mother', role: { uz: 'Ona', en: 'Mother' }, name: 'Malika', enabled: true },
  { id: 'father', role: { uz: 'Ota', en: 'Father' }, name: 'Sardor', enabled: true },
  { id: 'grandmother', role: { uz: 'Buvi', en: 'Grandmother' }, name: 'Zulxumor', enabled: false },
];

export const DEVICE_STATUS = {
  online: true,
  power: 'plugged' as const,
  wifiStrength: 4 as 0 | 1 | 2 | 3 | 4,
  roomTempC: 22.4,
  roomHumidityPct: 46,
  lastSyncMinutesAgo: 2,
};

export const INSIGHTS: Bilingual<string>[] = [
  {
    uz: 'Kechqurungi ovqatlantirishdan soʻng Aziz koʻpincha uygʻongandan 20 daqiqa oʻtib yigʻlaydi va koʻtarib turilganda tinchlanadi. Bu tez-tez takrorlansa, pediatrga aytib qoʻying — gaz yoki reflyuks bilan bogʻliq boʻlishi mumkin.',
    en: 'After evening feeds, Aziz often cries about 20 minutes after waking and calms when held upright. If this keeps happening, mention it to your pediatrician — it can be related to gas or reflux.',
  },
  {
    uz: 'Bu hafta tungi uyqu 35 daqiqaga uzaydi.',
    en: 'Night sleep got 35 minutes longer this week.',
  },
  {
    uz: 'Yigʻi holatlari koʻpincha soat 18:00–20:00 oraligʻida kuzatiladi.',
    en: 'Crying episodes are most frequent between 18:00–20:00.',
  },
];

export const BABY = AZIZ;
