import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section, SectionHeading } from '@/components/landing/Section';
import { AZIZ, MADINA, NILUFAR, NILUFAR_PREGNANCY, ageInMonths } from '@/data/profiles';
import { PREGNANCY_WEEKS } from '@/data/pregnancy';
import { EPDS_QUESTIONS } from '@/data/recovery';
import { cryCountToday, sleepPerDay } from '@/data/monitorStats';
import { ANIMAL_SOUND_GAME } from '@/data/speech';
import type { SupportedLanguage } from '@/i18n';

function StopCard({ eyebrow, title, to, children }: { eyebrow: string; title: string; to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-3xl border border-linen-300 bg-white p-5 transition-colors hover:border-lapis-300"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-lapis-500">{eyebrow}</p>
      <p className="mt-1 font-display text-lg font-bold text-ink-900 group-hover:text-lapis-700">{title}</p>
      <div className="mt-4 flex-1 rounded-2xl bg-linen-50 p-4">{children}</div>
    </Link>
  );
}

export function JourneyStops() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  const week = PREGNANCY_WEEKS[NILUFAR_PREGNANCY.currentWeek - 1];
  const azizMonths = ageInMonths(AZIZ.birthDate);
  const todaySleep = sleepPerDay().at(-1);
  const todaySleepHours = todaySleep ? Math.round(((todaySleep.nightMin + todaySleep.napMin) / 60) * 10) / 10 : 0;
  const animal = ANIMAL_SOUND_GAME[0];

  return (
    <Section id="journey">
      <SectionHeading title={t('story.journey.title')} subtitle={t('story.journey.subtitle')} />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StopCard eyebrow={t('story.journey.pregnancy.eyebrow', { week: week.week })} title={NILUFAR.name} to="/app?tab=pregnancy">
          <div className="text-center">
            <div className="text-4xl">{week.size.emoji}</div>
            <p className="mt-2 text-sm text-ink-700">
              {t('story.journey.pregnancy.size', { item: lng === 'uz' ? week.size.itemUz : week.size.itemEn })}
            </p>
          </div>
        </StopCard>

        <StopCard eyebrow={t('story.journey.recovery.eyebrow')} title={t('story.journey.recovery.title')} to="/app?tab=recovery">
          <p className="text-sm text-ink-700">{t('story.journey.recovery.body', { count: EPDS_QUESTIONS.length })}</p>
        </StopCard>

        <StopCard eyebrow={t('story.journey.baby.eyebrow', { months: azizMonths })} title={AZIZ.name} to="/app?tab=baby">
          <ul className="space-y-1.5 text-sm text-ink-700">
            <li>{t('story.journey.baby.cries', { count: cryCountToday() })}</li>
            <li>{t('story.journey.baby.sleep', { hours: todaySleepHours })}</li>
          </ul>
        </StopCard>

        <StopCard eyebrow={t('story.journey.speech.eyebrow')} title={MADINA.name} to="/app?tab=speech">
          <div className="text-center">
            <div className="text-4xl">{animal.emoji}</div>
            <p className="mt-2 text-sm text-ink-700">{t('app.speech.animalPrompt')}</p>
          </div>
        </StopCard>
      </div>
    </Section>
  );
}
