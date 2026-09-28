import type { Bilingual } from '@/data/types';

export interface SizeComparison {
  itemUz: string;
  itemEn: string;
  emoji: string;
}

export interface PregnancyWeek {
  week: number;
  trimester: 1 | 2 | 3;
  size: SizeComparison;
  babyNote: Bilingual;
  motherNote: Bilingual;
}

/** Gentle size comparisons using produce common in Uzbekistan, roughly matched to real fetal-length data. */
const SIZE_BY_WEEK: SizeComparison[] = [
  { itemUz: 'moshdona', itemEn: 'a mung bean', emoji: '🫘' },
  { itemUz: 'moshdona', itemEn: 'a mung bean', emoji: '🫘' },
  { itemUz: 'rezavor', itemEn: 'a berry', emoji: '🫐' },
  { itemUz: 'uzum donasi', itemEn: 'a grape', emoji: '🍇' },
  { itemUz: 'uzum donasi', itemEn: 'a grape', emoji: '🍇' },
  { itemUz: 'oʻrik', itemEn: 'an apricot', emoji: '🍑' },
  { itemUz: 'limon', itemEn: 'a lemon', emoji: '🍋' },
  { itemUz: 'olma', itemEn: 'an apple', emoji: '🍎' },
  { itemUz: 'nok', itemEn: 'a pear', emoji: '🍐' },
  { itemUz: 'behi', itemEn: 'a quince', emoji: '🍐' },
  { itemUz: 'sabzi bogʻlami', itemEn: 'a bunch of carrots', emoji: '🥕' },
  { itemUz: 'katta anor', itemEn: 'a large pomegranate', emoji: '🍎' },
  { itemUz: 'kichik qovoq', itemEn: 'a small squash', emoji: '🎃' },
  { itemUz: 'baqlajon', itemEn: 'an eggplant', emoji: '🍆' },
  { itemUz: 'karam boshi', itemEn: 'a head of cabbage', emoji: '🥬' },
  { itemUz: 'kichik qovun', itemEn: 'a small melon', emoji: '🍈' },
  { itemUz: 'jiyda shoxi', itemEn: 'a bunch of grapes on the vine', emoji: '🍇' },
  { itemUz: 'oʻrtacha qovun', itemEn: 'a medium melon', emoji: '🍈' },
  { itemUz: 'kichik tarvuz', itemEn: 'a small watermelon', emoji: '🍉' },
  { itemUz: 'katta qovoq', itemEn: 'a large squash', emoji: '🎃' },
  { itemUz: 'katta karam', itemEn: 'a large cabbage', emoji: '🥬' },
  { itemUz: 'katta qovun', itemEn: 'a large melon', emoji: '🍈' },
  { itemUz: 'oʻrtacha tarvuz', itemEn: 'a medium watermelon', emoji: '🍉' },
  { itemUz: 'katta tarvuz', itemEn: 'a large watermelon', emoji: '🍉' },
];

function trimesterFor(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

export const PREGNANCY_WEEKS: PregnancyWeek[] = Array.from({ length: 40 }, (_, i) => {
  const week = i + 1;
  return {
    week,
    trimester: trimesterFor(week),
    size: SIZE_BY_WEEK[Math.min(i, SIZE_BY_WEEK.length - 1)],
    babyNote: {
      uz: `${week}-haftada chaqaloqning organlari va tizimlari asta rivojlanishda davom etadi.`,
      en: `At week ${week}, your baby's organs and systems continue developing steadily.`,
    },
    motherNote: {
      uz: 'Oʻzingizni tinglang, yetarlicha suv iching va shifokor tavsiyalariga amal qiling.',
      en: "Listen to your body, stay hydrated, and follow your doctor's guidance.",
    },
  };
});

export interface PregnancyTest {
  weekFrom: number;
  weekTo: number;
  name: Bilingual;
  note: Bilingual;
}

export const PREGNANCY_TESTS: PregnancyTest[] = [
  {
    weekFrom: 10,
    weekTo: 13,
    name: { uz: 'Birinchi skrining (UTT + qon tahlili)', en: 'First trimester screening (ultrasound + blood test)' },
    note: { uz: 'Xromosoma xavfini baholash uchun.', en: 'Assesses chromosomal risk.' },
  },
  {
    weekFrom: 16,
    weekTo: 18,
    name: { uz: 'Ikkinchi skrining', en: 'Second trimester screening' },
    note: { uz: 'Qon tahlili orqali qoʻshimcha nazorat.', en: 'Additional blood-based check.' },
  },
  {
    weekFrom: 18,
    weekTo: 22,
    name: { uz: 'Anatomik UTT', en: 'Anatomy ultrasound' },
    note: { uz: 'Chaqaloqning rivojlanishini batafsil koʻrish.', en: "A detailed look at your baby's development." },
  },
  {
    weekFrom: 24,
    weekTo: 28,
    name: { uz: 'Glyukoza toleranttest', en: 'Glucose tolerance test' },
    note: { uz: 'Homiladorlik diabetini tekshirish uchun.', en: 'Checks for gestational diabetes.' },
  },
  {
    weekFrom: 35,
    weekTo: 37,
    name: { uz: 'Streptokokk guruh B tahlili', en: 'Group B strep test' },
    note: { uz: 'Tugʻruqqa tayyorgarlik nazorati.', en: 'A routine check ahead of delivery.' },
  },
];

export const WARNING_SIGNS: Bilingual<string>[] = [
  {
    uz: 'Qattiq yoki uzoq davom etuvchi qorin ogʻrigʻi',
    en: 'Severe or persistent abdominal pain',
  },
  {
    uz: 'Qinidan qon ketishi',
    en: 'Vaginal bleeding',
  },
  {
    uz: 'Kuchli bosh ogʻrigʻi yoki koʻzda xira tortish',
    en: 'Severe headache or blurred vision',
  },
  {
    uz: 'Qoʻl, yuz yoki oyoqlarning toʻsatdan shishishi',
    en: 'Sudden swelling of hands, face, or legs',
  },
  {
    uz: 'Chaqaloq harakatining sezilarli kamayishi',
    en: "A noticeable decrease in baby's movements",
  },
  {
    uz: 'Isitma 38°C dan yuqori',
    en: 'Fever above 38°C',
  },
  {
    uz: 'Suv keta boshlashi (muddatidan oldin)',
    en: 'Fluid leaking before your due date',
  },
];
