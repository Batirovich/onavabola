export interface Bilingual<T = string> {
  uz: T;
  en: T;
}

export interface Region {
  id: string;
  name: Bilingual;
}

export type CryReason =
  | 'hunger'
  | 'painGas'
  | 'sleepy'
  | 'wantsHeld'
  | 'diaper'
  | 'discomfort';

export interface BabyProfile {
  id: string;
  name: string;
  birthDate: string; // ISO date
  sex: 'girl' | 'boy';
  motherId: string;
}

export interface MotherProfile {
  id: string;
  name: string;
  pseudonym: string;
  region: string; // Region id
  city: string;
  avatarSeed: string;
}

export interface PregnancyProfile {
  id: string;
  motherId: string;
  name: string;
  currentWeek: number;
  dueDate: string;
}
