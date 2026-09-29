import type { Bilingual } from '@/data/types';

/**
 * Content that has no existing home elsewhere in src/data/ — everything else
 * on /jury imports from landing.ts / clinic.ts as-is. See DECISIONS.md.
 */

export type MvpStatusLevel = 'working' | 'mockup' | 'roadmap';

export interface MvpStatusItem {
  id: string;
  status: MvpStatusLevel;
  label: Bilingual;
}

export const MVP_STATUS: MvpStatusItem[] = [
  {
    id: 'algorithms',
    status: 'working',
    label: {
      uz: 'Yigʻi sababini taxmin qilish, EPDS baholash va hamjamiyat moderatsiyasi — real ishlayotgan algoritmlar, skript bilan yozilgan natija emas.',
      en: 'Cry-reason prediction, EPDS scoring, and community moderation are real, running algorithms — not scripted output.',
    },
  },
  {
    id: 'app',
    status: 'working',
    label: {
      uz: 'Onalar ilovasi, monitor paneli, hamjamiyat va klinika paneli — toʻliq interaktiv, statik maket emas.',
      en: 'The mother’s app, monitor dashboard, community, and clinic panel are fully interactive, not static mockups.',
    },
  },
  {
    id: 'device',
    status: 'mockup',
    label: {
      uz: 'Jismoniy qurilma — mahsulot surati va illyustratsiya. Ishlaydigan apparat hali mavjud emas.',
      en: 'The physical device shown is a product photo and illustration — no working hardware exists yet.',
    },
  },
  {
    id: 'dataset',
    status: 'roadmap',
    label: {
      uz: 'Haqiqiy oʻzbek chaqaloqlari yigʻisi toʻplami hali yigʻilmagan — bugungi taxminlar modellashtirilgan maʼlumotlar asosida ishlaydi.',
      en: 'A real Uzbek infant-cry dataset has not been collected yet — today’s predictions run on a modeled dataset.',
    },
  },
  {
    id: 'backend',
    status: 'roadmap',
    label: {
      uz: 'Hali backend yoki haqiqiy foydalanuvchi hisoblari yoʻq — koʻrayotgan barcha narsa butunlay brauzeringizda ishlaydi.',
      en: 'There is no backend or real user accounts yet — everything you see runs entirely in your browser.',
    },
  },
];

export const JURY_LIMITS: Bilingual = {
  uz: 'Yigʻi tahlili — qoʻllab-quvvatlovchi signal, tibbiy tashxis emas. Haqiqiy chaqaloq yigʻisi har qanday algoritm toʻliq tasniflay oladiganidan ancha xilma-xil; nashr qilingan tadqiqotlarda ham yaxshi oʻqitilgan modellar oʻrtacha 70–90% aniqlikka erishadi. Shu sabab har bir tavsiya ota-ona tasdiqlashi yoki rad etishi mumkin boʻlgan taklif sifatida beriladi — hech qachon mustaqil qaror sifatida emas. Bugun ishlatilayotgan maʼlumotlar toʻplami koʻrgazmali boʻlib, klinik yigʻilgan emas; haqiqiy joriy etish tugʻruqxonalar bilan hamkorlikda validatsiyadan oʻtgan maʼlumotlar toʻplamini talab qiladi (Yoʻl xaritasiga qarang).',
  en: 'Cry analysis is a supportive signal, not a medical diagnosis. Real infant cries are far more varied than any algorithm can fully classify; even well-trained models in published research reach roughly 70–90% accuracy on studied cohorts. That’s why every recommendation is framed as a suggestion the caregiver can confirm or reject — never an unsupervised decision. The dataset used today is illustrative, not clinically collected; a real deployment would need a validated dataset built in partnership with maternity hospitals (see Roadmap).',
};
