import type { Bilingual } from '@/data/types';

export interface VaccinationEntry {
  id: string;
  ageLabel: Bilingual;
  name: Bilingual;
  status: 'done' | 'upcoming';
  date: string; // ISO
}

export const VACCINATIONS: VaccinationEntry[] = [
  { id: 'v1', ageLabel: { uz: 'Tugʻilganda', en: 'At birth' }, name: { uz: 'BCJ, Gepatit B', en: 'BCG, Hepatitis B' }, status: 'done', date: '2026-06-30' },
  { id: 'v2', ageLabel: { uz: '2 oylik', en: '2 months' }, name: { uz: 'AKDS, Poliomielit', en: 'DTP, Polio' }, status: 'done', date: '2026-08-30' },
  { id: 'v3', ageLabel: { uz: '3 oylik', en: '3 months' }, name: { uz: 'AKDS-2, Poliomielit-2', en: 'DTP-2, Polio-2' }, status: 'upcoming', date: '2026-10-07' },
  { id: 'v4', ageLabel: { uz: '4 oylik', en: '4 months' }, name: { uz: 'AKDS-3, Poliomielit-3', en: 'DTP-3, Polio-3' }, status: 'upcoming', date: '2026-10-30' },
];

export interface GrowthPoint {
  ageMonths: number;
  weightKg: number;
  heightCm: number;
}

export const GROWTH_DATA: GrowthPoint[] = [
  { ageMonths: 0, weightKg: 3.3, heightCm: 50 },
  { ageMonths: 1, weightKg: 4.2, heightCm: 54 },
  { ageMonths: 2, weightKg: 5.1, heightCm: 57.5 },
  { ageMonths: 3, weightKg: 5.9, heightCm: 60 },
];

export const GROWTH_MILESTONES: Bilingual<string>[] = [
  { uz: 'Boshini mustahkam ushlab turadi', en: 'Holds head up steadily' },
  { uz: 'Tabassumga tabassum bilan javob beradi', en: 'Smiles back responsively' },
  { uz: 'Ovozlarga qarab boshini burdi', en: 'Turns head toward sounds' },
];
