import type { Region } from '@/data/types';

export const REGIONS: Region[] = [
  { id: 'tashkent-city', name: { uz: 'Toshkent shahri', en: 'Tashkent city' } },
  { id: 'tashkent-region', name: { uz: 'Toshkent viloyati', en: 'Tashkent region' } },
  { id: 'samarqand', name: { uz: 'Samarqand', en: 'Samarkand' } },
  { id: 'buxoro', name: { uz: 'Buxoro', en: 'Bukhara' } },
  { id: 'fargona', name: { uz: 'Fargʻona', en: 'Fergana' } },
  { id: 'andijon', name: { uz: 'Andijon', en: 'Andijan' } },
  { id: 'namangan', name: { uz: 'Namangan', en: 'Namangan' } },
  { id: 'qashqadaryo', name: { uz: 'Qashqadaryo', en: 'Qashqadaryo' } },
  { id: 'surxondaryo', name: { uz: 'Surxondaryo', en: 'Surkhandarya' } },
  { id: 'xorazm', name: { uz: 'Xorazm', en: 'Khorezm' } },
  { id: 'navoiy', name: { uz: 'Navoiy', en: 'Navoiy' } },
  { id: 'jizzax', name: { uz: 'Jizzax', en: 'Jizzakh' } },
  { id: 'sirdaryo', name: { uz: 'Sirdaryo', en: 'Sirdaryo' } },
  { id: 'qoraqalpogiston', name: { uz: 'Qoraqalpogʻiston Respublikasi', en: 'Republic of Karakalpakstan' } },
];

export function regionName(id: string, lng: 'uz' | 'en'): string {
  return REGIONS.find((r) => r.id === id)?.name[lng] ?? id;
}
