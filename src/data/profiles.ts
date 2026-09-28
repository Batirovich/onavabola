import type { BabyProfile, MotherProfile, PregnancyProfile } from '@/data/types';

/**
 * The demo's recurring cast, referenced across monitor/, pregnancy/,
 * recovery/, speech/, community/, and clinic/ data so every screen shows
 * numbers that agree with each other.
 */

export const MALIKA: MotherProfile = {
  id: 'mother-malika',
  name: 'Malika Yusupova',
  pseudonym: 'Quyosh',
  region: 'tashkent-city',
  city: 'Toshkent',
  avatarSeed: 'malika-quyosh',
};

export const AZIZ: BabyProfile = {
  id: 'baby-aziz',
  name: 'Aziz',
  birthDate: '2026-06-30', // ~3 months before "today" (2026-09-28)
  sex: 'boy',
  motherId: MALIKA.id,
};

export const NILUFAR: MotherProfile = {
  id: 'mother-nilufar',
  name: 'Nilufar Qodirova',
  pseudonym: 'Bahor',
  region: 'samarqand',
  city: 'Samarqand',
  avatarSeed: 'nilufar-bahor',
};

export const NILUFAR_PREGNANCY: PregnancyProfile = {
  id: 'pregnancy-nilufar',
  motherId: NILUFAR.id,
  name: 'Nilufar',
  currentWeek: 24,
  dueDate: '2027-03-08',
};

export const DILNOZA: MotherProfile = {
  id: 'mother-dilnoza',
  name: 'Dilnoza Rahimova',
  pseudonym: 'Gulnora',
  region: 'fargona',
  city: 'Fargʻona',
  avatarSeed: 'dilnoza-gulnora',
};

export const MADINA: BabyProfile = {
  id: 'child-madina',
  name: 'Madina',
  birthDate: '2023-09-15', // 3 years old
  sex: 'girl',
  motherId: DILNOZA.id,
};

export const TODAY = new Date('2026-09-28T09:00:00');

export function ageInMonths(birthDate: string, at: Date = TODAY): number {
  const birth = new Date(birthDate);
  return (at.getFullYear() - birth.getFullYear()) * 12 + (at.getMonth() - birth.getMonth());
}
