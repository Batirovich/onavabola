import { useTranslation } from 'react-i18next';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { GeometricAvatar } from '@/components/community/GeometricAvatar';
import { CryPredictionPhone } from '@/components/story/CryPredictionPhone';
import { FEATURED_POSTS, MODERATION_EXAMPLE } from '@/components/story/CommunityGlimpse';
import { HERO_CONTEXT } from '@/components/story/HeroSection';
import { EARLY_DAY } from '@/components/story/NightScene';
import { CLINIC_KPIS } from '@/data/clinic';
import { AZIZ, ageInMonths, MADINA, NILUFAR } from '@/data/profiles';
import { PREGNANCY_WEEKS } from '@/data/pregnancy';
import { confidenceForDay, LEARNING_WINDOW_DAYS } from '@/data/monitor';
import { cryCountToday, sleepPerDay } from '@/data/monitorStats';
import { PILLARS, SAFETY_POINTS } from '@/data/landing';
import { moderateText, MODERATION_EXPLANATIONS, type ModerationCategory } from '@/lib/moderation';
import type { SupportedLanguage } from '@/i18n';

function useLng(): SupportedLanguage {
  const { i18n } = useTranslation();
  return i18n.resolvedLanguage as SupportedLanguage;
}

function HeroSlide() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-lapis-900 px-8 text-center text-white lg:flex-row lg:gap-20 lg:text-left">
      <DeviceIllustration state="crying" className="h-56 w-auto lg:h-72" />
      <div className="max-w-xl">
        <h1 className="font-display text-4xl font-bold leading-tight lg:text-6xl">{t('story.hero.title')}</h1>
        <div className="mt-8 w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/5 p-5 text-left backdrop-blur">
          <CryPredictionPhone
            confidence={confidenceForDay(LEARNING_WINDOW_DAYS)}
            context={HERO_CONTEXT}
            notification={t('story.hero.notification')}
          />
        </div>
      </div>
    </div>
  );
}

function NightSlide() {
  const { t } = useTranslation();
  const confidence = confidenceForDay(EARLY_DAY);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-night-900 px-8 text-center text-white lg:flex-row lg:gap-20 lg:text-left">
      <DeviceIllustration state="crying" className="h-48 w-auto lg:h-64" />
      <div className="max-w-xl">
        <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-apricot-400">{t('story.night.eyebrow')}</p>
        <h2 className="mt-3 font-display text-3xl font-bold lg:text-5xl">{t('story.night.step3Title')}</h2>
        <p className="mt-4 text-lg text-lapis-100">{t('story.night.step3Body')}</p>
        <p className="mt-5 text-base text-lapis-300">{t('story.night.dayConfidence', { day: EARLY_DAY, value: confidence })}</p>
      </div>
    </div>
  );
}

function Day21Slide() {
  const { t } = useTranslation();
  const confidence = confidenceForDay(LEARNING_WINDOW_DAYS);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-linen-50 px-8 text-center">
      <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-apricot-600">{t('story.day21.eyebrow')}</p>
      <div className="font-display text-8xl font-bold text-turquoise-700 lg:text-9xl">{confidence}%</div>
      <h2 className="max-w-2xl font-display text-3xl font-bold text-ink-900 lg:text-4xl">{t('story.day21.title')}</h2>
      <p className="max-w-xl text-lg text-ink-600">{t('story.day21.subtitle')}</p>
    </div>
  );
}

function JourneySlide() {
  const { t } = useTranslation();
  const week = PREGNANCY_WEEKS[23];
  const azizMonths = ageInMonths(AZIZ.birthDate);

  const stops = [
    { emoji: week.size.emoji, eyebrow: t('story.journey.pregnancy.eyebrow', { week: week.week }), name: NILUFAR.name },
    { emoji: '🌿', eyebrow: t('story.journey.recovery.eyebrow'), name: t('story.journey.recovery.title') },
    { emoji: '🌙', eyebrow: t('story.journey.baby.eyebrow', { months: azizMonths }), name: AZIZ.name },
    { emoji: '🗣️', eyebrow: t('story.journey.speech.eyebrow'), name: MADINA.name },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-linen-50 px-8 text-center">
      <h2 className="font-display text-3xl font-bold text-ink-900 lg:text-5xl">{t('story.journey.title')}</h2>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-10">
        {stops.map((s) => (
          <div key={s.name} className="flex flex-col items-center rounded-3xl border border-linen-300 bg-white p-6">
            <span className="text-5xl" aria-hidden="true">{s.emoji}</span>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-lapis-500">{s.eyebrow}</p>
            <p className="mt-1 font-display text-lg font-bold text-ink-900">{s.name}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-ink-600">
        <span>{t('story.journey.baby.cries', { count: cryCountToday() })}</span>
        <span>{t('story.journey.baby.sleep', { hours: Math.round(((sleepPerDay().at(-1)!.nightMin + sleepPerDay().at(-1)!.napMin) / 60) * 10) / 10 })}</span>
      </div>
    </div>
  );
}

function CommunitySlide() {
  const { t } = useTranslation();
  const lng = useLng();
  const post = FEATURED_POSTS[0];
  const result = moderateText(MODERATION_EXAMPLE.text[lng]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-linen-50 px-8 text-center lg:flex-row lg:gap-16 lg:text-left">
      <div className="w-full max-w-lg rounded-3xl border border-linen-300 bg-white p-8 text-left">
        <div className="flex items-center gap-3">
          <GeometricAvatar seed={post.author.avatarSeed} size={48} />
          <span className="text-lg font-semibold text-ink-900">{post.author.pseudonym}</span>
        </div>
        <p className="mt-4 font-display text-2xl font-bold text-ink-900">{post.title[lng]}</p>
        <p className="mt-2 text-base text-ink-600">{post.body[lng]}</p>
      </div>
      <div className="w-full max-w-lg rounded-3xl border border-linen-300 bg-white p-8 text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-lapis-500">{t('story.community.moderation.title')}</p>
        <p className="mt-3 text-lg italic text-ink-700">“{MODERATION_EXAMPLE.text[lng]}”</p>
        <div className="mt-4 rounded-xl border border-apricot-200 bg-apricot-50 p-4 text-base text-apricot-800">
          {MODERATION_EXPLANATIONS[result.category as Exclude<ModerationCategory, 'ok'>][lng]}
        </div>
      </div>
    </div>
  );
}

function TrustSlide() {
  const { t } = useTranslation();
  const lng = useLng();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-linen-50 px-8 text-center">
      <h2 className="font-display text-3xl font-bold text-ink-900 lg:text-5xl">{t('story.trust.title')}</h2>
      <p className="max-w-2xl text-xl font-semibold text-turquoise-800">{SAFETY_POINTS[0][lng]}</p>
      <p className="text-lg text-ink-600">
        {t('story.trust.clinicKpi.mothers', { count: CLINIC_KPIS.registeredMothers })}
        {' · '}
        {t('story.trust.clinicKpi.monitors', { count: CLINIC_KPIS.activeMonitors })}
      </p>
      <div className="mt-2 flex gap-4 text-3xl" aria-hidden="true">
        {PILLARS.map((p) => (
          <span key={p.id}>{p.emoji}</span>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-lapis-900 px-8 text-center text-white">
      <p className="max-w-2xl font-display text-3xl font-bold leading-snug lg:text-5xl">{t('story.closing.line')}</p>
      <p className="text-lapis-300">Ona va Bola — InnoWeek.Uz 2026</p>
    </div>
  );
}

export const KIOSK_SLIDES = [HeroSlide, NightSlide, Day21Slide, JourneySlide, CommunitySlide, TrustSlide, ClosingSlide];
