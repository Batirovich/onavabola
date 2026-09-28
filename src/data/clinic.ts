import { createRng } from '@/data/seed';
import type { Bilingual, CryReason } from '@/data/types';

const rng = createRng(60112026);

export const DISTRICT_NAME: Bilingual = { uz: 'Chilonzor tumani', en: 'Chilonzor district' };

export interface Mahalla {
  id: string;
  name: string;
}

export const MAHALLAS: Mahalla[] = [
  { id: 'guliston', name: 'Guliston' },
  { id: 'boghishamol', name: 'Bogʻishamol' },
  { id: 'chinor', name: 'Chinor' },
];

const FIRST_NAMES = [
  'Malika', 'Nilufar', 'Dilnoza', 'Gulnoza', 'Shahnoza', 'Munira', 'Zilola', 'Sevinch', 'Kamola', 'Ozoda',
  'Feruza', 'Sitora', 'Nodira', 'Yulduz', 'Madina', 'Dilorom', 'Nargiza', 'Gulbahor', 'Umida', 'Lola',
  'Rayhona', 'Xurshida', 'Zarina', 'Saodat', 'Mehriniso', 'Gavhar', 'Iroda', 'Shoira', 'Yorqinoy', 'Tuygʻun',
];
const LAST_NAMES = [
  'Yusupova', 'Qodirova', 'Rahimova', 'Ergasheva', 'Tashkentova', 'Islomova', 'Karimova', 'Norova', 'Sultonova',
  'Abdullayeva', 'Ismoilova', 'Xolmatova', 'Juraeva', 'Saidova', 'Mirzayeva', 'Otabekova', 'Yoldasheva',
];
const CHILD_NAMES = [
  'Madina', 'Aziz', 'Sardor', 'Zayd', 'Amina', 'Yusuf', 'Hadicha', 'Eldor', 'Kamila', 'Ibrohim',
  'Zilola', 'Umar', 'Sofiya', 'Alisher', 'Robiya', 'Temur', 'Mohira', 'Rustam', 'Laylo', 'Shodiyor',
  'Gulnoza', 'Anvar', 'Sabina', 'Bekzod', 'Nigora',
];

function fullName(): string {
  return `${rng.pick(FIRST_NAMES)} ${rng.pick(LAST_NAMES)}`;
}

function isoDaysFromNow(days: number): string {
  const d = new Date('2026-09-28T09:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export type MotherStatus = 'pregnant' | 'postpartum' | 'raisingChild';
export type RiskFlag = 'epds' | 'missedVisit' | 'speechDelay';

export interface VisitRecord {
  date: string;
  type: Bilingual;
  notedBy: string;
}

export interface EpdsEntry {
  date: string;
  score: number;
}

export interface MonitorSummary {
  avgSleepHrs: number;
  criesPerDay: number;
  topReason: CryReason;
}

export interface ClinicMother {
  id: string;
  patientCode: string;
  fullName: string;
  mahalla: string;
  status: MotherStatus;
  trimester: 1 | 2 | 3 | null;
  childAgeMonths: number | null;
  nextVisit: string | null;
  missedVisitThisWeek: boolean;
  epdsHistory: EpdsEntry[];
  riskFlags: RiskFlag[];
  visitHistory: VisitRecord[];
  notes: Bilingual[];
  usesMonitor: boolean;
  monitorSummary: MonitorSummary | null;
}

const VISIT_TYPES: Bilingual[] = [
  { uz: 'Oddiy koʻrik', en: 'Routine checkup' },
  { uz: 'UTT tekshiruvi', en: 'Ultrasound check' },
  { uz: 'Patronaj tashrifi', en: 'Patronage home visit' },
  { uz: 'Vaksinatsiya', en: 'Vaccination' },
  { uz: 'Maslahat uchrashuvi', en: 'Consultation' },
];

const NOTE_BANK: Bilingual[] = [
  { uz: 'Umumiy holat yaxshi, keyingi tashrifga tavsiyalar berildi.', en: 'Overall condition is good, guidance given for the next visit.' },
  { uz: 'Ozgina charchoq belgilari bor, kuzatuvni davom ettiramiz.', en: 'Some signs of fatigue noted — continuing to monitor.' },
  { uz: 'Ovqatlanish rejasi boʻyicha maslahat berildi.', en: 'Nutrition guidance was provided.' },
  { uz: 'Oilaviy yordam yetarli, ijobiy dinamika.', en: 'Family support is sufficient, positive trend.' },
];

function buildEpdsHistory(riskLevel: 'low' | 'watch' | 'high'): EpdsEntry[] {
  const base = riskLevel === 'high' ? 15 : riskLevel === 'watch' ? 9 : 4;
  return [0, 1, 2].map((i) => ({
    date: isoDaysFromNow(-60 + i * 30),
    score: Math.max(0, Math.min(30, base + rng.int(-3, 3) - i)),
  }));
}

function buildMother(index: number): ClinicMother {
  const mahalla = rng.pick(MAHALLAS).id;
  const status: MotherStatus = rng.weighted([
    ['pregnant', 0.3],
    ['postpartum', 0.15],
    ['raisingChild', 0.55],
  ]);
  const trimester = status === 'pregnant' ? (rng.int(1, 3) as 1 | 2 | 3) : null;
  const childAgeMonths = status !== 'pregnant' ? rng.int(0, 84) : null;
  const missedVisitThisWeek = rng.bool(0.16);
  const riskLevel = rng.weighted<'low' | 'watch' | 'high'>([
    ['low', 0.62],
    ['watch', 0.26],
    ['high', 0.12],
  ]);
  const epdsHistory = status !== 'pregnant' || rng.bool(0.4) ? buildEpdsHistory(riskLevel) : [];
  const latestEpds = epdsHistory.at(-1)?.score ?? 0;

  const riskFlags: RiskFlag[] = [];
  if (latestEpds >= 13) riskFlags.push('epds');
  if (missedVisitThisWeek) riskFlags.push('missedVisit');
  const speechDelay = childAgeMonths !== null && childAgeMonths >= 18 && rng.bool(0.18);
  if (speechDelay) riskFlags.push('speechDelay');

  const usesMonitor = childAgeMonths !== null && childAgeMonths <= 18 && rng.bool(0.55);

  return {
    id: `clinic-mother-${index}`,
    patientCode: `P-${String(index).padStart(3, '0')}`,
    fullName: fullName(),
    mahalla,
    status,
    trimester,
    childAgeMonths,
    nextVisit: rng.bool(0.85) ? isoDaysFromNow(rng.int(-3, 21)) : null,
    missedVisitThisWeek,
    epdsHistory,
    riskFlags,
    visitHistory: Array.from({ length: rng.int(2, 5) }, (_, i) => ({
      date: isoDaysFromNow(-14 * (i + 1)),
      type: rng.pick(VISIT_TYPES),
      notedBy: rng.bool(0.7) ? 'Hamshira Gulbahor' : 'Hamshira Dinora',
    })),
    notes: rng.pickMany(NOTE_BANK, rng.int(1, 2)),
    usesMonitor,
    monitorSummary: usesMonitor
      ? {
          avgSleepHrs: Math.round((10 + rng.float(0, 3)) * 10) / 10,
          criesPerDay: rng.int(3, 8),
          topReason: rng.pick<CryReason>(['hunger', 'sleepy', 'painGas', 'wantsHeld', 'diaper', 'discomfort']),
        }
      : null,
  };
}

export const CLINIC_MOTHERS: ClinicMother[] = Array.from({ length: 60 }, (_, i) => buildMother(i + 1));

export interface ClinicChild {
  id: string;
  name: string;
  ageMonths: number;
  motherName: string;
  mahalla: string;
  speechDelayFlag: boolean;
  progress: Array<{ monthLabel: string; score: number }>;
  assignedExercises: Bilingual[];
  pendingRecordingReviews: number;
}

const MONTH_LABELS_UZ = ['Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen'];
const MONTH_LABELS_EN = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

function buildChild(index: number): ClinicChild {
  const ageMonths = rng.int(14, 84);
  const speechDelayFlag = rng.bool(0.24);
  const startScore = speechDelayFlag ? rng.int(35, 55) : rng.int(55, 75);
  const progress = MONTH_LABELS_UZ.map((label, i) => ({
    monthLabel: label,
    score: Math.min(100, startScore + i * rng.int(2, 6)),
  }));

  return {
    id: `clinic-child-${index}`,
    name: rng.pick(CHILD_NAMES),
    ageMonths,
    motherName: fullName(),
    mahalla: rng.pick(MAHALLAS).id,
    speechDelayFlag,
    progress,
    assignedExercises: rng.pickMany(
      [
        { uz: '"R" tovushi mashqlari', en: '"R" sound exercises' },
        { uz: 'Hikoya aytib berish', en: 'Storytelling practice' },
        { uz: 'Hayvon ovozlari oʻyini', en: 'Animal sounds game' },
        { uz: 'Soʻz boyligini oshirish kartalari', en: 'Vocabulary picture cards' },
      ],
      2,
    ),
    pendingRecordingReviews: rng.bool(0.3) ? rng.int(1, 3) : 0,
  };
}

export const CLINIC_CHILDREN: ClinicChild[] = Array.from({ length: 25 }, (_, i) => buildChild(i + 1));
// Use uz labels directly on `progress`; en labels available via index into MONTH_LABELS_EN when rendering.
export { MONTH_LABELS_EN, MONTH_LABELS_UZ };

export interface ClinicKpis {
  registeredMothers: number;
  pregnanciesByTrimester: Record<1 | 2 | 3, number>;
  missedVisitsThisWeek: number;
  epdsRiskFlags: number;
  speechDelayFlags: number;
  activeMonitors: number;
}

export function computeKpis(): ClinicKpis {
  const pregnanciesByTrimester: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 };
  for (const m of CLINIC_MOTHERS) {
    if (m.trimester) pregnanciesByTrimester[m.trimester]++;
  }
  return {
    registeredMothers: CLINIC_MOTHERS.length,
    pregnanciesByTrimester,
    missedVisitsThisWeek: CLINIC_MOTHERS.filter((m) => m.missedVisitThisWeek).length,
    epdsRiskFlags: CLINIC_MOTHERS.filter((m) => m.riskFlags.includes('epds')).length,
    speechDelayFlags: CLINIC_CHILDREN.filter((c) => c.speechDelayFlag).length,
    activeMonitors: CLINIC_MOTHERS.filter((m) => m.usesMonitor).length,
  };
}

export const CLINIC_KPIS = computeKpis();
