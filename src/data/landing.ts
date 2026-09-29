import type { Bilingual } from '@/data/types';

export interface TimelineStage {
  id: string;
  stage: Bilingual;
  gap: Bilingual;
}

export const PROBLEM_TIMELINE: TimelineStage[] = [
  {
    id: 'pregnancy',
    stage: { uz: 'Homiladorlik', en: 'Pregnancy' },
    gap: {
      uz: 'Tekshiruvlar va ogohlantiruvchi belgilar haqida maʼlumot tarqoq, koʻp onalar nimani kutish kerakligini bilmay qoladi.',
      en: 'Information about checkups and warning signs is scattered — many mothers are unsure what to expect.',
    },
  },
  {
    id: 'afterBirth',
    stage: { uz: 'Tugʻruqdan keyin', en: 'Right after birth' },
    gap: {
      uz: 'Tiklanish davri koʻpincha eʼtibordan chetda qoladi — jismoniy va ruhiy holatga yetarli qoʻllab-quvvatlash yoʻq.',
      en: 'Recovery is often overlooked — little support for either the physical or emotional side.',
    },
  },
  {
    id: 'firstMonths',
    stage: { uz: 'Birinchi oylar', en: 'The first months' },
    gap: {
      uz: 'Chaqaloq nega yigʻlayotganini tushunish qiyin, uyqusiz tunlar onani charchatib qoʻyadi.',
      en: "Understanding why a baby is crying is hard, and sleepless nights wear a mother down.",
    },
  },
  {
    id: 'ages1to7',
    stage: { uz: '1–7 yosh', en: 'Ages 1–7' },
    gap: {
      uz: 'Nutq rivojidagi kechikishlar koʻpincha maktabgacha yaqin payta aniqlanadi — erta yordam imkoniyati boy beriladi.',
      en: 'Speech delays are often caught close to school age — the window for early support is missed.',
    },
  },
  {
    id: 'misinformation',
    stage: { uz: 'Internetdagi notoʻgʻri maʼlumot', en: 'Online misinformation' },
    gap: {
      uz: 'Ishonchli boʻlmagan maslahatlar ijtimoiy tarmoqlarda tez tarqaladi, onalarni chalkashtirib yuboradi.',
      en: 'Unreliable advice spreads fast on social media, leaving mothers confused about what to trust.',
    },
  },
];

export type PillarId = 'pregnancy' | 'recovery' | 'monitor' | 'speech' | 'community';

export interface Pillar {
  id: PillarId;
  emoji: string;
  title: Bilingual;
  body: Bilingual;
  link: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 'pregnancy',
    emoji: '🤰',
    title: { uz: 'Homiladorlik', en: 'Pregnancy' },
    body: {
      uz: 'Haftalik kuzatuv, eslatmalar va qachon shifokorga murojaat qilish kerakligini aniq bildiruvchi ogohlantiruvchi belgilar.',
      en: 'Week-by-week tracking, reminders, and clear warning signs for when to see a doctor.',
    },
    link: '/app',
  },
  {
    id: 'recovery',
    emoji: '🌿',
    title: { uz: 'Onaning tiklanishi', en: "Mother's recovery" },
    body: {
      uz: 'Oʻzbek taomlariga asoslangan ovqatlanish, yengil mashqlar va his-tuygʻu holatini tekshiruvchi EPDS anketa.',
      en: 'Uzbek-cuisine nutrition, gentle exercises, and an EPDS wellbeing check-in.',
    },
    link: '/app',
  },
  {
    id: 'monitor',
    emoji: '🌙',
    title: { uz: 'Aqlli monitor', en: 'Smart monitor' },
    body: {
      uz: 'Beshik yonidagi qurilma yigʻini aniqlaydi, sababini taxmin qiladi va vaqt oʻtishi bilan chaqaloqni oʻrganadi.',
      en: 'A bedside device detects crying, suggests likely reasons, and learns your baby over time.',
    },
    link: '/monitor',
  },
  {
    id: 'speech',
    emoji: '🗣️',
    title: { uz: 'Nutq rivoji', en: 'Speech development' },
    body: {
      uz: '1–7 yosh oraligʻida nutq rivojini kuzatuvchi mashqlar, oʻyinlar va ovoz yozuvlari orqali erta aniqlash.',
      en: 'Speech milestone tracking, practice games, and voice recordings for early detection, ages 1–7.',
    },
    link: '/app',
  },
  {
    id: 'community',
    emoji: '🤝',
    title: { uz: 'Hamjamiyat', en: 'Community' },
    body: {
      uz: 'Tasdiqlangan, taxallusli onalar hamjamiyati — sunʻiy intellekt tomonidan xavfsiz muhokamaga yoʻnaltiriladi.',
      en: 'A verified, pseudonymous community for mothers, kept safe with AI-assisted moderation.',
    },
    link: '/community',
  },
];

export interface Differentiator {
  id: string;
  title: Bilingual;
  body: Bilingual;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: 'language',
    title: { uz: 'Ona tilida', en: 'In your language' },
    body: { uz: 'Toʻliq oʻzbek tilida — tarjima qilingan emas, mahalliy sharoitga moslashtirilgan.', en: 'Fully in Uzbek — not translated, built around local life.' },
  },
  {
    id: 'personalized',
    title: { uz: 'Shaxsiylashtirilgan sunʻiy intellekt', en: 'Personalized AI' },
    body: { uz: 'Monitor har bir chaqaloqning oʻziga xos namunasini oʻrganadi, umumiy shablon emas.', en: 'The monitor learns each baby individually, not a generic template.' },
  },
  {
    id: 'earlyDetection',
    title: { uz: 'Erta aniqlash', en: 'Early detection' },
    body: { uz: 'Nutq kechikishi va tugʻruqdan keyingi depressiya erta bosqichda seziladi.', en: 'Speech delays and postpartum depression are caught earlier.' },
  },
  {
    id: 'trustedCommunity',
    title: { uz: 'Ishonchli hamjamiyat', en: 'Trusted community' },
    body: { uz: 'Faqat tasdiqlangan onalar, inson moderatori bilan birga sunʻiy intellekt nazorati.', en: 'Verified mothers only, with AI moderation backed by a human reviewer.' },
  },
  {
    id: 'importSubstitution',
    title: { uz: 'Importni oʻrnini bosish', en: 'Import substitution' },
    body: { uz: 'Xorijiy qurilmalarga bogʻliqlikni kamaytiradigan mahalliy ishlab chiqarilgan yechim.', en: 'A locally-built solution reducing reliance on foreign devices.' },
  },
  {
    id: 'healthLink',
    title: { uz: 'Sogʻliqni saqlash tizimi bilan bogʻliqlik', en: 'Linked to the health system' },
    body: { uz: 'Patronaj hamshiralari va poliklinikalar bilan toʻgʻridan-toʻgʻri aloqa.', en: 'A direct link to patronage nurses and polyclinics.' },
  },
];

export interface BusinessModelItem {
  id: string;
  title: Bilingual;
  body: Bilingual;
}

export const BUSINESS_MODEL: BusinessModelItem[] = [
  {
    id: 'freemium',
    title: { uz: 'Bepul ilova + Premium', en: 'Free app + Premium' },
    body: { uz: 'Asosiy funksiyalar bepul, kengaytirilgan tahlil va maslahatlar premium obunada.', en: 'Core features are free; deeper insights and consultations are a premium tier.' },
  },
  {
    id: 'device',
    title: { uz: 'Qurilma sotuvi', en: 'Device sales' },
    body: { uz: 'Aqlli monitor qurilmasining bir martalik sotuvi.', en: 'A one-time purchase of the smart monitor device.' },
  },
  {
    id: 'b2g',
    title: { uz: 'B2G litsenziyalar', en: 'B2G licenses' },
    body: { uz: 'Davlat sogʻliqni saqlash tizimlari uchun litsenziyalash.', en: 'Licensing for public health system deployments.' },
  },
  {
    id: 'b2b',
    title: { uz: 'B2B hamkorlik', en: 'B2B partnerships' },
    body: { uz: 'Xususiy klinikalar va sugʻurta kompaniyalari bilan hamkorlik.', en: 'Partnerships with private clinics and insurers.' },
  },
];

export interface RoadmapStep {
  id: string;
  title: Bilingual;
  body: Bilingual;
}

export const ROADMAP: RoadmapStep[] = [
  {
    id: 'mvp',
    title: { uz: 'MVP va tanlov, 2026-yil sentyabr–oktyabr', en: 'MVP & competition, Sep–Oct 2026' },
    body: { uz: 'InnoWeek.Uz–2026 koʻrgazmasi uchun ishlaydigan demo tayyorlash.', en: 'Build a working demo for the InnoWeek.Uz–2026 exhibition.' },
  },
  {
    id: 'pilot',
    title: { uz: 'Pilot loyiha', en: 'Pilot' },
    body: { uz: 'Bitta tuman doirasida sinov ishga tushirish.', en: 'Launch a pilot within a single district.' },
  },
  {
    id: 'dataset',
    title: { uz: 'Oʻzbek yigʻi maʼlumotlar toʻplami', en: 'Uzbek cry dataset' },
    body: { uz: 'Tugʻruqxona bilan hamkorlikda maʼlumotlar toʻplash.', en: 'Build a dataset in partnership with a maternity hospital.' },
  },
  {
    id: 'validation',
    title: { uz: 'Klinik tekshiruv', en: 'Clinical validation' },
    body: { uz: 'Natijalarni mustaqil klinik tekshiruvdan oʻtkazish.', en: 'Independently validate outcomes.' },
  },
  {
    id: 'ip',
    title: { uz: 'IP roʻyxatga olish', en: 'IP registration' },
    body: { uz: 'Intellektual mulkni himoyalash.', en: 'Protect the intellectual property.' },
  },
  {
    id: 'expansion',
    title: { uz: 'MyID va hududiy kengayish', en: 'MyID + regional expansion' },
    body: { uz: 'MyID integratsiyasi va boshqa hududlarga chiqish.', en: 'MyID integration and expansion to other regions.' },
  },
];

export interface TeamMember {
  id: string;
  role: Bilingual;
  /** What this role contributes — no named team is announced yet, so this describes the expertise rather than a person. */
  contribution: Bilingual;
}

export const TEAM: TeamMember[] = [
  {
    id: 'lead',
    role: { uz: 'Loyiha yetakchisi', en: 'Project lead' },
    contribution: { uz: 'Mahsulot va ijro ustidan umumiy nazorat.', en: 'Overall oversight of product and execution.' },
  },
  {
    id: 'pediatrician',
    role: { uz: 'Pediatr maslahatchi', en: 'Pediatrician advisor' },
    contribution: {
      uz: 'Yigʻi sabablari toifalari va xavfsizlik xabarlarini koʻrib chiqadi.',
      en: 'Reviews the cry-reason categories and safety messaging.',
    },
  },
  {
    id: 'speechTherapist',
    role: { uz: 'Nutq terapevti maslahatchi', en: 'Speech therapist advisor' },
    contribution: {
      uz: 'Nutq rivoji mashqlari va bosqichlarini ishlab chiqadi.',
      en: 'Designs the speech-development exercises and milestones.',
    },
  },
  {
    id: 'nutritionist',
    role: { uz: 'Ovqatlanish boʻyicha maslahatchi', en: 'Nutritionist advisor' },
    contribution: {
      uz: 'Tiklanish davri uchun oʻzbek taomlariga asoslangan tavsiyalarni tayyorlaydi.',
      en: 'Prepares Uzbek-cuisine-based recovery nutrition guidance.',
    },
  },
];

export const SAFETY_POINTS: Bilingual[] = [
  { uz: 'Audio maʼlumotlar qurilmaning oʻzida qayta ishlanadi — bulutga xom ovoz yuborilmaydi.', en: 'Audio is processed on the device — raw sound is never sent to the cloud.' },
  { uz: 'Chaqaloqqa kiyiladigan hech qanday sensor yoʻq.', en: 'No wearable sensor is ever attached to the baby.' },
  { uz: 'Barcha sunʻiy intellekt natijalari tavsiya sifatida beriladi, tashxis sifatida emas.', en: 'Every AI output is a suggestion, never a diagnosis.' },
  { uz: 'Maʼlumotlar Oʻzbekiston hududida saqlanadi.', en: "Data is stored within Uzbekistan." },
];
