import type { Bilingual } from '@/data/types';

export interface MilestoneItem {
  id: string;
  text: Bilingual;
}

export interface MilestoneGroup {
  id: string;
  ageRange: Bilingual;
  items: MilestoneItem[];
}

export const MILESTONE_GROUPS: MilestoneGroup[] = [
  {
    id: '12-18m',
    ageRange: { uz: '12–18 oy', en: '12–18 months' },
    items: [
      { id: 'm1-1', text: { uz: '"Ona", "dada" kabi soʻzlarni ishlatadi', en: 'Uses words like "mama", "dada"' } },
      { id: 'm1-2', text: { uz: 'Oddiy soʻrovlarni tushunadi ("bering", "keling")', en: 'Understands simple requests ("give", "come")' } },
      { id: 'm1-3', text: { uz: 'Tanish narsalarga ishora qiladi', en: 'Points to familiar objects' } },
    ],
  },
  {
    id: '18-24m',
    ageRange: { uz: '18–24 oy', en: '18–24 months' },
    items: [
      { id: 'm2-1', text: { uz: '20 dan ortiq soʻz ishlatadi', en: 'Uses more than 20 words' } },
      { id: 'm2-2', text: { uz: 'Ikki soʻzli iboralar tuzadi ("ona keldi")', en: 'Combines two words ("mama come")' } },
      { id: 'm2-3', text: { uz: 'Tana qismlariga ishora qiladi', en: 'Points to body parts when named' } },
    ],
  },
  {
    id: '2-3y',
    ageRange: { uz: '2–3 yosh', en: '2–3 years' },
    items: [
      { id: 'm3-1', text: { uz: 'Qisqa jumlalar bilan gapiradi', en: 'Speaks in short sentences' } },
      { id: 'm3-2', text: { uz: 'Notanish odam ham nutqining koʻpini tushunadi', en: 'Is mostly understood by unfamiliar listeners' } },
      { id: 'm3-3', text: { uz: '"Nima" va "qayerda" savollarini beradi', en: 'Asks "what" and "where" questions' } },
    ],
  },
  {
    id: '3-4y',
    ageRange: { uz: '3–4 yosh', en: '3–4 years' },
    items: [
      { id: 'm4-1', text: { uz: '4–5 soʻzli jumlalar tuzadi', en: 'Builds 4–5 word sentences' } },
      { id: 'm4-2', text: { uz: 'Kichik hikoyalarni aytib beradi', en: 'Retells simple stories' } },
      { id: 'm4-3', text: { uz: 'Koʻpchilik tovushlarni aniq talaffuz qiladi', en: 'Pronounces most sounds clearly' } },
    ],
  },
  {
    id: '4-5y',
    ageRange: { uz: '4–5 yosh', en: '4–5 years' },
    items: [
      { id: 'm5-1', text: { uz: 'Murakkab jumlalar ishlatadi ("chunki", "agar")', en: 'Uses complex sentences ("because", "if")' } },
      { id: 'm5-2', text: { uz: 'Kun tartibini tartib bilan aytib beradi', en: 'Recounts the order of daily events' } },
      { id: 'm5-3', text: { uz: 'Deyarli barcha tovushlarni toʻgʻri talaffuz qiladi', en: 'Pronounces nearly all sounds correctly' } },
    ],
  },
  {
    id: '5-7y',
    ageRange: { uz: '5–7 yosh', en: '5–7 years' },
    items: [
      { id: 'm6-1', text: { uz: 'Suhbatni navbat bilan olib boradi', en: 'Takes turns in conversation naturally' } },
      { id: 'm6-2', text: { uz: 'Harflar va tovushlar bogʻliqligini tushunadi', en: 'Understands letter-sound relationships' } },
      { id: 'm6-3', text: { uz: 'Batafsil hikoyalarni tartib bilan gapirib beradi', en: 'Tells detailed stories in order' } },
    ],
  },
];

export interface GameCard {
  id: string;
  label: Bilingual;
  emoji: string;
}

export interface RepeatSoundPrompt {
  id: string;
  targetSound: string;
  card: GameCard;
}

export const REPEAT_SOUND_GAME: RepeatSoundPrompt[] = [
  { id: 'r1', targetSound: 'olma', card: { id: 'apple', label: { uz: 'Olma', en: 'Apple' }, emoji: '🍎' } },
  { id: 'r2', targetSound: 'quyosh', card: { id: 'sun', label: { uz: 'Quyosh', en: 'Sun' }, emoji: '☀️' } },
  { id: 'r3', targetSound: 'kitob', card: { id: 'book', label: { uz: 'Kitob', en: 'Book' }, emoji: '📖' } },
  { id: 'r4', targetSound: 'baliq', card: { id: 'fish', label: { uz: 'Baliq', en: 'Fish' }, emoji: '🐟' } },
  { id: 'r5', targetSound: 'gul', card: { id: 'flower', label: { uz: 'Gul', en: 'Flower' }, emoji: '🌷' } },
];

export interface AnimalSoundPrompt {
  id: string;
  animal: Bilingual;
  emoji: string;
  soundUz: string;
  soundEn: string;
}

export const ANIMAL_SOUND_GAME: AnimalSoundPrompt[] = [
  { id: 'a1', animal: { uz: 'Mushuk', en: 'Cat' }, emoji: '🐱', soundUz: 'miyov', soundEn: 'meow' },
  { id: 'a2', animal: { uz: 'It', en: 'Dog' }, emoji: '🐶', soundUz: 'vov-vov', soundEn: 'woof' },
  { id: 'a3', animal: { uz: 'Sigir', en: 'Cow' }, emoji: '🐄', soundUz: 'moʻʻ', soundEn: 'moo' },
  { id: 'a4', animal: { uz: 'Xoʻroz', en: 'Rooster' }, emoji: '🐓', soundUz: 'qiqriqu', soundEn: 'cock-a-doodle-doo' },
  { id: 'a5', animal: { uz: 'Qoʻy', en: 'Sheep' }, emoji: '🐑', soundUz: 'baʼ', soundEn: 'baa' },
];

export interface FindWordPrompt {
  id: string;
  letterUz: string;
  letterEn: string;
  correct: GameCard;
  distractors: GameCard[];
}

export const FIND_WORD_GAME: FindWordPrompt[] = [
  {
    id: 'f1',
    letterUz: 'B',
    letterEn: 'B',
    correct: { id: 'ball', label: { uz: 'Boʻyra', en: 'Ball' }, emoji: '⚽' },
    distractors: [
      { id: 'cat', label: { uz: 'Mushuk', en: 'Cat' }, emoji: '🐱' },
      { id: 'sun', label: { uz: 'Quyosh', en: 'Sun' }, emoji: '☀️' },
    ],
  },
  {
    id: 'f2',
    letterUz: 'Q',
    letterEn: 'Q',
    correct: { id: 'quyosh', label: { uz: 'Quyosh', en: 'Sun' }, emoji: '☀️' },
    distractors: [
      { id: 'book', label: { uz: 'Kitob', en: 'Book' }, emoji: '📖' },
      { id: 'fish', label: { uz: 'Baliq', en: 'Fish' }, emoji: '🐟' },
    ],
  },
  {
    id: 'f3',
    letterUz: 'G',
    letterEn: 'G',
    correct: { id: 'gul', label: { uz: 'Gul', en: 'Flower' }, emoji: '🌷' },
    distractors: [
      { id: 'apple', label: { uz: 'Olma', en: 'Apple' }, emoji: '🍎' },
      { id: 'dog', label: { uz: 'It', en: 'Dog' }, emoji: '🐶' },
    ],
  },
];

export interface RecordingEntry {
  id: string;
  monthLabel: Bilingual;
  date: string; // ISO
  therapistNote: Bilingual;
  progress: 'onTrack' | 'watch' | 'improving';
}

export const RECORDING_HISTORY: RecordingEntry[] = [
  {
    id: 'rec-1',
    monthLabel: { uz: 'Aprel 2026', en: 'April 2026' },
    date: '2026-04-12',
    therapistNote: {
      uz: 'Madina koʻp yangi soʻzlar ishlatmoqda, ayrim tovushlarni hali aniq talaffuz qilmayapti.',
      en: "Madina is using many new words; a few sounds are still not fully clear.",
    },
    progress: 'watch',
  },
  {
    id: 'rec-2',
    monthLabel: { uz: 'Iyun 2026', en: 'June 2026' },
    date: '2026-06-14',
    therapistNote: {
      uz: '"R" tovushi ustida mashqlar davom etmoqda, ijobiy oʻzgarish bor.',
      en: 'Continued practice on the "r" sound — positive progress noted.',
    },
    progress: 'improving',
  },
  {
    id: 'rec-3',
    monthLabel: { uz: 'Avgust 2026', en: 'August 2026' },
    date: '2026-08-16',
    therapistNote: {
      uz: 'Jumlalar uzunroq va tushunarli boʻlmoqda. Mashqlarni davom ettiring.',
      en: 'Sentences are longer and clearer. Keep up the exercises.',
    },
    progress: 'onTrack',
  },
];

export interface SpeechTherapist {
  name: string;
  title: Bilingual;
  assignedExercises: Bilingual<string>[];
  lastComment: Bilingual;
}

export const SPEECH_THERAPIST: SpeechTherapist = {
  name: 'Kamola Tashkentova',
  title: { uz: 'Nutq terapevti', en: 'Speech therapist' },
  assignedExercises: [
    { uz: '"R" tovushi bilan kunlik 5 daqiqalik mashq', en: 'Daily 5-minute "r" sound practice' },
    { uz: 'Hayvon ovozlari oʻyinini haftada 3 marta oʻynash', en: 'Play the animal sounds game 3 times a week' },
  ],
  lastComment: {
    uz: 'Ajoyib davom etyapsiz! Keyingi yozib olishda qisqa hikoya aytib berishni sinab koʻring.',
    en: "Great progress! For the next recording, try having her tell a short story.",
  },
};
