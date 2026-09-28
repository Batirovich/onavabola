import type { Bilingual } from '@/data/types';

export type ModerationCategory = 'offTopic' | 'misinformation' | 'scam' | 'harassment' | 'personalData' | 'crisis' | 'ok';
export type ModerationAction = 'allowed' | 'blocked' | 'held' | 'routedToSpecialist';

export interface ModerationResult {
  category: ModerationCategory;
  action: ModerationAction;
  matched?: string;
}

const PHONE_REGEX = /(\+?\d[\d\s-]{7,}\d)/;

const KEYWORDS: Record<Exclude<ModerationCategory, 'ok'>, string[]> = {
  crisis: [
    'oʻzimga zarar', 'ozimga zarar', 'yashagim kelmayapti', 'yashashni xohlamayapman', 'oʻzimni oʻldir', 'jonimga qasd',
    'harm myself', 'hurt myself', 'kill myself', 'end my life', 'dont want to live', "don't want to live", 'suicide',
  ],
  misinformation: [
    'vaksinatsiyadan voz', 'emlamang', 'emlashdan voz', 'vaksina xavfli', 'spirt bilan artish', 'uyda tayyorlangan dori',
    "don't vaccinate", 'skip vaccination', 'avoid vaccines', 'vaccines are dangerous', 'rub alcohol', 'home remedy cures',
  ],
  scam: [
    'sotiladi', 'chegirma', 'arzon narxda', 'link bosing', 'http://', 'https://', 'www.',
    'for sale', 'discount', 'click the link', 'buy now', 'limited offer',
  ],
  harassment: [
    'ahmoq', 'tentak', 'aqlsiz', 'uyatsiz', 'yaramas',
    'stupid', 'idiot', 'shut up', 'worthless', 'pathetic',
  ],
  personalData: [
    'manzilim', 'uyim manzili', 'passport raqam', 'pasport raqami',
    'my address', 'home address', 'passport number',
  ],
  offTopic: [
    'prezident', 'saylov', 'partiya', 'urush', 'siyosat',
    'president', 'election', 'political party', 'war in', 'politics',
  ],
};

const ACTION_BY_CATEGORY: Record<Exclude<ModerationCategory, 'ok'>, ModerationAction> = {
  crisis: 'routedToSpecialist',
  misinformation: 'held',
  scam: 'blocked',
  harassment: 'blocked',
  personalData: 'blocked',
  offTopic: 'blocked',
};

// Crisis checked first (never just "blocked" — always routed to a human),
// then clearer rule violations, then softer judgment calls.
const CHECK_ORDER: Array<Exclude<ModerationCategory, 'ok'>> = [
  'crisis', 'personalData', 'scam', 'harassment', 'misinformation', 'offTopic',
];

export function moderateText(text: string): ModerationResult {
  const normalized = text.toLowerCase();

  for (const category of CHECK_ORDER) {
    if (category === 'personalData' && PHONE_REGEX.test(text)) {
      return { category, action: ACTION_BY_CATEGORY[category], matched: text.match(PHONE_REGEX)?.[0] };
    }
    const hit = KEYWORDS[category].find((kw) => normalized.includes(kw.toLowerCase()));
    if (hit) {
      return { category, action: ACTION_BY_CATEGORY[category], matched: hit };
    }
  }

  return { category: 'ok', action: 'allowed' };
}

export const MODERATION_CATEGORY_LABELS: Record<ModerationCategory, Bilingual> = {
  offTopic: { uz: 'Mavzudan tashqari', en: 'Off-topic' },
  misinformation: { uz: 'Tibbiy notoʻgʻri maʼlumot', en: 'Medical misinformation' },
  scam: { uz: 'Reklama / firibgarlik', en: 'Ad / scam' },
  harassment: { uz: 'Haqorat', en: 'Harassment' },
  personalData: { uz: 'Shaxsiy maʼlumot', en: 'Personal data' },
  crisis: { uz: 'Ogʻir holat', en: 'Crisis language' },
  ok: { uz: 'Muammo yoʻq', en: 'No issue' },
};

export const MODERATION_EXPLANATIONS: Record<Exclude<ModerationCategory, 'ok'>, Bilingual> = {
  crisis: {
    uz: 'Sizning fikringiz muhim. Bu postni ommaga chiqarmadik, buning oʻrniga mutaxassisimiz siz bilan tez orada bogʻlanadi.',
    en: "Your feelings matter. We didn't publish this post publicly — instead, one of our specialists will reach out to you shortly.",
  },
  misinformation: {
    uz: 'Bu xabar tibbiy jihatdan tekshirilmagan maʼlumot boʻlishi mumkin, shu sabab inson moderatori koʻrib chiqishi uchun kutilmoqda.',
    en: 'This message may contain unverified medical claims, so it is held for a human moderator to review before it goes live.',
  },
  scam: {
    uz: 'Reklama, havolalar va sotuv postlari ushbu hamjamiyatda ruxsat etilmaydi.',
    en: 'Ads, links, and sales posts are not allowed in this community.',
  },
  harassment: {
    uz: 'Boshqa onalarga nisbatan hurmatsiz soʻzlarni ishlatmaslikni soʻraymiz.',
    en: "We ask that you avoid disrespectful language toward other mothers.",
  },
  personalData: {
    uz: 'Xavfsizligingiz uchun telefon raqami yoki manzil kabi shaxsiy maʼlumotlarni ulashmang.',
    en: "For your safety, please don't share personal details like phone numbers or addresses.",
  },
  offTopic: {
    uz: 'Bu hamjamiyat homiladorlik va bolalar parvarishiga bagʻishlangan — siyosat kabi mavzular bu yerga mos emas.',
    en: 'This community is focused on pregnancy and childcare — topics like politics are off-limits here.',
  },
};
