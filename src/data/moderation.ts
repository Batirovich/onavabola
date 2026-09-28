import type { ModerationAction, ModerationCategory } from '@/lib/moderation';
import type { Bilingual } from '@/data/types';

export interface ExampleMessage {
  id: string;
  category: ModerationCategory;
  text: Bilingual;
}

export const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: 'ex-ok',
    category: 'ok',
    text: {
      uz: 'Bolam kechqurun 18-20 orasida koʻp yigʻlaydi, sizlarda ham shunday boʻlganmi?',
      en: 'My baby cries a lot between 6-8pm, has anyone else noticed this?',
    },
  },
  {
    id: 'ex-crisis',
    category: 'crisis',
    text: {
      uz: 'Oxirgi kunlarda yashagim kelmayapti, hammasi juda ogʻir boʻlib qoldi.',
      en: "I haven't wanted to keep living these past few days, everything feels too heavy.",
    },
  },
  {
    id: 'ex-misinfo',
    category: 'misinformation',
    text: {
      uz: 'Chaqaloqni vaksinatsiyadan voz keching, buning oʻrniga uyda tayyorlangan dori bering.',
      en: "Skip vaccination for your baby, give a home remedy instead.",
    },
  },
  {
    id: 'ex-scam',
    category: 'scam',
    text: {
      uz: 'Chaqaloq aravachasi sotiladi, katta chegirma bilan! Link bosing: www.example.com',
      en: 'Baby stroller for sale, big discount! Click the link: www.example.com',
    },
  },
  {
    id: 'ex-harassment',
    category: 'harassment',
    text: {
      uz: 'Bunday savol berish uchun ahmoq boʻlish kerak.',
      en: 'You have to be an idiot to ask a question like that.',
    },
  },
  {
    id: 'ex-personal',
    category: 'personalData',
    text: {
      uz: 'Meni +998 90 123 45 67 raqamiga yozing, batafsil gaplashamiz.',
      en: 'Message me at +998 90 123 45 67, let\'s talk in detail.',
    },
  },
  {
    id: 'ex-offtopic',
    category: 'offTopic',
    text: {
      uz: 'Kecha saylov natijalari haqida nima deysiz?',
      en: 'What do you think about yesterday\'s election results?',
    },
  },
];

export interface ModerationLogEntry {
  id: string;
  snippet: string;
  category: ModerationCategory;
  action: ModerationAction;
  reviewedByHuman: boolean;
  createdAt: string;
}

export const SEEDED_MODERATION_LOG: ModerationLogEntry[] = [
  {
    id: 'log-1',
    snippet: 'Chaqaloq uchun arzon narxda kiyimlar, chegirma...',
    category: 'scam',
    action: 'blocked',
    reviewedByHuman: false,
    createdAt: '2026-09-27T10:12:00',
  },
  {
    id: 'log-2',
    snippet: 'Isitmani spirt bilan artish kerak, bu eng yaxshi usul...',
    category: 'misinformation',
    action: 'held',
    reviewedByHuman: true,
    createdAt: '2026-09-26T18:44:00',
  },
  {
    id: 'log-3',
    snippet: 'Hech narsa qilgim kelmayapti, juda charchadim...',
    category: 'crisis',
    action: 'routedToSpecialist',
    reviewedByHuman: true,
    createdAt: '2026-09-25T21:03:00',
  },
  {
    id: 'log-4',
    snippet: 'Bunday deb yozgan onalar ahmoq...',
    category: 'harassment',
    action: 'blocked',
    reviewedByHuman: false,
    createdAt: '2026-09-24T09:27:00',
  },
];
