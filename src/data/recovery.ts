import type { Bilingual } from '@/data/types';

export interface NutritionItem {
  id: string;
  name: Bilingual;
  note: Bilingual;
  tags: Array<'breastfeeding' | 'iron' | 'energy' | 'traditional'>;
}

export const NUTRITION_ITEMS: NutritionItem[] = [
  {
    id: 'mastava',
    name: { uz: 'Mastava', en: 'Mastava (rice and vegetable soup)' },
    note: {
      uz: 'Yengil va issiq — koʻp suyuqlik va tuzli-guruchli tarkibi emizikli onalar uchun qulay.',
      en: 'Light and warm — the broth and rice make it gentle and easy to digest while breastfeeding.',
    },
    tags: ['breastfeeding', 'traditional'],
  },
  {
    id: 'moshxorda',
    name: { uz: 'Moshxoʻrda', en: 'Moshxoʻrda (mung bean and rice soup)' },
    note: {
      uz: 'Mosh oqsilga boy — tiklanish davrida energiya beradi.',
      en: 'Mung beans are protein-rich, giving steady energy during recovery.',
    },
    tags: ['breastfeeding', 'energy', 'traditional'],
  },
  {
    id: 'shorva',
    name: { uz: 'Shoʻrva', en: 'Shoʻrva (meat and vegetable soup)' },
    note: {
      uz: 'Suyak sho’rvasi temir va foydali moddalarga boy, koʻp suyuqlik ta’minlaydi.',
      en: 'A bone-based broth rich in iron and minerals, and a good source of fluids.',
    },
    tags: ['breastfeeding', 'iron', 'traditional'],
  },
  {
    id: 'quruq-orik',
    name: { uz: 'Quritilgan oʻrik', en: 'Dried apricots' },
    note: {
      uz: 'Temir va tolaga boy — qabziyatning oldini olishga yordam beradi.',
      en: 'Rich in iron and fiber — helps prevent constipation after birth.',
    },
    tags: ['iron', 'traditional'],
  },
  {
    id: 'yongoq',
    name: { uz: 'Yongʻoq', en: 'Walnuts' },
    note: {
      uz: 'Sogʻlom yogʻlar manbai, kichik miqdorda gazak sifatida foydali.',
      en: 'A good source of healthy fats, useful as a small snack.',
    },
    tags: ['breastfeeding', 'energy'],
  },
  {
    id: 'qovoq-somsa',
    name: { uz: 'Qovoqli somsa', en: 'Pumpkin somsa' },
    note: {
      uz: 'Qovoq A vitaminiga boy — bir bo‘lak gazak sifatida yetarli.',
      en: 'Pumpkin is rich in vitamin A — one piece makes a satisfying snack.',
    },
    tags: ['energy', 'traditional'],
  },
  {
    id: 'behi-murabbosi',
    name: { uz: 'Behi murabbosi', en: 'Quince preserve' },
    note: {
      uz: 'Choy bilan kichik miqdorda — anʼanaviy tiklanish taomi.',
      en: 'A small spoonful with tea — a traditional recovery-time treat.',
    },
    tags: ['traditional'],
  },
  {
    id: 'jigar',
    name: { uz: 'Jigar qovurma', en: 'Sautéed liver' },
    note: {
      uz: 'Temirga juda boy — haftada 1-2 marta yetarli.',
      en: 'Very rich in iron — once or twice a week is plenty.',
    },
    tags: ['iron'],
  },
];

export interface Exercise {
  id: string;
  name: Bilingual;
  description: Bilingual;
  category: 'pelvicFloor' | 'abdominal';
  unlocksAfterCheckup: boolean;
  durationMin: number;
}

export const EXERCISES: Exercise[] = [
  {
    id: 'kegel-basic',
    name: { uz: 'Kegel mashqi', en: 'Kegel exercise' },
    description: {
      uz: 'Tos tubi mushaklarini 5 soniya qisib, 5 soniya boʻshating. 10 marta takrorlang.',
      en: 'Gently tighten the pelvic floor for 5 seconds, then release for 5. Repeat 10 times.',
    },
    category: 'pelvicFloor',
    unlocksAfterCheckup: false,
    durationMin: 5,
  },
  {
    id: 'breathing-core',
    name: { uz: 'Diafragma nafas olish', en: 'Diaphragmatic breathing' },
    description: {
      uz: 'Chalqancha yotib, qorin bilan chuqur nafas oling — qorin mushaklarini asta uygʻotadi.',
      en: 'Lying on your back, breathe deeply into the belly — gently reactivates the core.',
    },
    category: 'abdominal',
    unlocksAfterCheckup: false,
    durationMin: 5,
  },
  {
    id: 'pelvic-tilt',
    name: { uz: 'Tos egilishi', en: 'Pelvic tilt' },
    description: {
      uz: 'Tizzalaringizni bukib yoting, belni asta yerga bosing va boʻshating.',
      en: 'Lying with knees bent, gently press your lower back into the floor and release.',
    },
    category: 'abdominal',
    unlocksAfterCheckup: true,
    durationMin: 8,
  },
  {
    id: 'bridge',
    name: { uz: 'Koʻprik mashqi', en: 'Glute bridge' },
    description: {
      uz: 'Tizzalar bukilgan holda beldan koʻtarilib, sekin tushiring.',
      en: 'With knees bent, lift your hips slowly and lower back down with control.',
    },
    category: 'pelvicFloor',
    unlocksAfterCheckup: true,
    durationMin: 8,
  },
];

export const SKINCARE_NOTES: Bilingual<string>[] = [
  {
    uz: 'Homiladorlikdagi choʻzilish chiziqlari vaqt oʻtishi bilan xiralashadi, lekin butunlay yoʻqolishiga vaʼda berish toʻgʻri emas.',
    en: 'Stretch marks from pregnancy fade over time, but no product can honestly promise to remove them completely.',
  },
  {
    uz: 'Teringizni namlab turish qichishni kamaytirishi mumkin — bu oddiy va xavfsiz yordam.',
    en: 'Keeping skin moisturized can ease itching — a simple, safe habit, not a cure.',
  },
  {
    uz: 'Sochlarning vaqtincha koʻproq toʻkilishi tugʻruqdan keyin odatiy holat va bir necha oyda oʻz-oʻzidan yaxshilanadi.',
    en: 'Temporary extra hair shedding after birth is normal and usually settles within a few months.',
  },
];

export interface EpdsQuestion {
  id: number;
  text: Bilingual;
  options: Array<{ score: 0 | 1 | 2 | 3; text: Bilingual }>;
}

export const EPDS_QUESTIONS: EpdsQuestion[] = [
  {
    id: 1,
    text: { uz: 'Kulishga va vaziyatning yorugʻ tomonini koʻrishga qodir boʻldim', en: 'I have been able to laugh and see the funny side of things' },
    options: [
      { score: 0, text: { uz: 'Har doimgidek', en: 'As much as I always could' } },
      { score: 1, text: { uz: 'Endi biroz kamroq', en: 'Not quite so much now' } },
      { score: 2, text: { uz: 'Aniq kamroq', en: 'Definitely not so much now' } },
      { score: 3, text: { uz: 'Umuman yoʻq', en: 'Not at all' } },
    ],
  },
  {
    id: 2,
    text: { uz: 'Kelajakdan zavq kutish bilan qaradim', en: 'I have looked forward with enjoyment to things' },
    options: [
      { score: 0, text: { uz: 'Har doimgidek', en: 'As much as I ever did' } },
      { score: 1, text: { uz: 'Avvalgidan biroz kamroq', en: 'Rather less than I used to' } },
      { score: 2, text: { uz: 'Aniq avvalgidan kamroq', en: 'Definitely less than I used to' } },
      { score: 3, text: { uz: 'Deyarli umuman yoʻq', en: 'Hardly at all' } },
    ],
  },
  {
    id: 3,
    text: { uz: 'Ishlar notoʻgʻri ketganda, oʻzimni notoʻgʻri ayblab qoʻydim', en: 'I have blamed myself unnecessarily when things went wrong' },
    options: [
      { score: 3, text: { uz: 'Koʻp hollarda', en: 'Yes, most of the time' } },
      { score: 2, text: { uz: 'Baʼzan', en: 'Yes, some of the time' } },
      { score: 1, text: { uz: 'Kamdan-kam', en: 'Not very often' } },
      { score: 0, text: { uz: 'Hech qachon', en: 'No, never' } },
    ],
  },
  {
    id: 4,
    text: { uz: 'Sababsiz xavotirlandim yoki tashvishlandim', en: 'I have been anxious or worried for no good reason' },
    options: [
      { score: 0, text: { uz: 'Yoʻq, umuman yoʻq', en: 'No, not at all' } },
      { score: 1, text: { uz: 'Deyarli yoʻq', en: 'Hardly ever' } },
      { score: 2, text: { uz: 'Ha, baʼzan', en: 'Yes, sometimes' } },
      { score: 3, text: { uz: 'Ha, tez-tez', en: 'Yes, very often' } },
    ],
  },
  {
    id: 5,
    text: { uz: 'Sababsiz qoʻrquv yoki xavotir hissi paydo boʻldi', en: 'I have felt scared or panicky for no very good reason' },
    options: [
      { score: 3, text: { uz: 'Ha, koʻp', en: 'Yes, quite a lot' } },
      { score: 2, text: { uz: 'Ha, baʼzan', en: 'Yes, sometimes' } },
      { score: 1, text: { uz: 'Yoʻq, unchalik emas', en: 'No, not much' } },
      { score: 0, text: { uz: 'Yoʻq, umuman yoʻq', en: 'No, not at all' } },
    ],
  },
  {
    id: 6,
    text: { uz: 'Vaziyatlar meni bosib ketganday his qildim', en: 'Things have been getting on top of me' },
    options: [
      { score: 3, text: { uz: 'Ha, koʻpincha umuman uddalay olmayapman', en: 'Yes, most of the time I have not been coping at all' } },
      { score: 2, text: { uz: 'Baʼzan, odatdagidek uddalay olmayapman', en: 'Yes, sometimes I have not been coping as well as usual' } },
      { score: 1, text: { uz: 'Yoʻq, koʻp hollarda yaxshi uddalayapman', en: 'No, most of the time I have coped quite well' } },
      { score: 0, text: { uz: 'Yoʻq, har doimgidek yaxshi uddalayapman', en: 'No, I have been coping as well as ever' } },
    ],
  },
  {
    id: 7,
    text: { uz: 'Shu qadar bezovtalandimki, uxlashda qiynaldim', en: 'I have been so unhappy that I have had difficulty sleeping' },
    options: [
      { score: 3, text: { uz: 'Ha, koʻp hollarda', en: 'Yes, most of the time' } },
      { score: 2, text: { uz: 'Ha, baʼzan', en: 'Yes, sometimes' } },
      { score: 1, text: { uz: 'Kamdan-kam', en: 'Not very often' } },
      { score: 0, text: { uz: 'Yoʻq, umuman yoʻq', en: 'No, not at all' } },
    ],
  },
  {
    id: 8,
    text: { uz: 'Oʻzimni gʻamgin yoki baxtsiz his qildim', en: 'I have felt sad or miserable' },
    options: [
      { score: 3, text: { uz: 'Ha, koʻp hollarda', en: 'Yes, most of the time' } },
      { score: 2, text: { uz: 'Ha, tez-tez', en: 'Yes, quite often' } },
      { score: 1, text: { uz: 'Kamdan-kam', en: 'Not very often' } },
      { score: 0, text: { uz: 'Yoʻq, umuman yoʻq', en: 'No, not at all' } },
    ],
  },
  {
    id: 9,
    text: { uz: 'Shu qadar bezovtalandimki, yigʻladim', en: 'I have been so unhappy that I have been crying' },
    options: [
      { score: 3, text: { uz: 'Ha, koʻp hollarda', en: 'Yes, most of the time' } },
      { score: 2, text: { uz: 'Ha, tez-tez', en: 'Yes, quite often' } },
      { score: 1, text: { uz: 'Faqat baʼzan', en: 'Only occasionally' } },
      { score: 0, text: { uz: 'Yoʻq, hech qachon', en: 'No, never' } },
    ],
  },
  {
    id: 10,
    text: { uz: 'Oʻzimga zarar yetkazish fikri xayolimga keldi', en: 'The thought of harming myself has occurred to me' },
    options: [
      { score: 3, text: { uz: 'Ha, tez-tez', en: 'Yes, quite often' } },
      { score: 2, text: { uz: 'Baʼzan', en: 'Sometimes' } },
      { score: 1, text: { uz: 'Kamdan-kam', en: 'Hardly ever' } },
      { score: 0, text: { uz: 'Hech qachon', en: 'Never' } },
    ],
  },
];

export const EPDS_MAX_SCORE = 30;
export const EPDS_RISK_THRESHOLD = 13;

export interface EpdsResult {
  score: number;
  question10Positive: boolean;
  needsSpecialist: boolean;
}

export function scoreEpds(answers: Record<number, 0 | 1 | 2 | 3>): EpdsResult {
  const score = Object.values(answers).reduce<number>((sum, v) => sum + v, 0);
  const question10Positive = (answers[10] ?? 0) > 0;
  return { score, question10Positive, needsSpecialist: score >= EPDS_RISK_THRESHOLD || question10Positive };
}

export const EPDS_CALM_MESSAGE: Bilingual<string> = {
  uz: 'Bu koʻrsatkichlarga koʻra, bir mutaxassis bilan gaplashish foydali boʻlishi mumkin. Bu tashxis emas — koʻpgina onalar shunga oʻxshash his-tuyulardan oʻtishadi va yordam bilan yaxshi his qilishadi. Xohlasangiz, hamshirangizga xabar beramiz.',
  en: 'Based on your answers, talking with a specialist could really help. This is not a diagnosis — many mothers feel this way, and support makes a real difference. If you would like, we can let your patronage nurse know.',
};

export const EPDS_REASSURANCE_LOW: Bilingual<string> = {
  uz: 'Javoblaringizga koʻra hozircha xavotirli belgilar sezilmayapti. Oʻzingizni his qilish davomida oʻzgarish sezsangiz, istalgan payt qayta toʻldirishingiz mumkin.',
  en: 'Your answers do not show signs of concern right now. You can retake this any time if how you are feeling changes.',
};
