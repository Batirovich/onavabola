import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { CommunityIcon, PregnancyIcon, RecoveryIcon, SpeechIcon } from '@/components/icons/BrandIcons';
import { Section, SectionHeading } from '@/components/landing/Section';
import { PILLARS } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

function find(id: string) {
  return PILLARS.find((p) => p.id === id)!;
}

export function PillarsSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const pregnancy = find('pregnancy');
  const recovery = find('recovery');
  const monitor = find('monitor');
  const speech = find('speech');
  const community = find('community');

  return (
    <Section className="bg-(--bg-elevated)">
      <SectionHeading title={t('landing.pillars.title')} subtitle={t('landing.pillars.subtitle')} />

      <div className="mt-12 grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {/* Monitor — the flagship, dark, spans both middle columns */}
        <Link
          to={monitor.link}
          className="group relative overflow-hidden rounded-3xl bg-night-700 p-7 text-white shadow-soft-night transition-transform hover:-translate-y-1 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center lg:gap-8 lg:p-9"
        >
          <DeviceIllustration state="listening" className="mx-auto h-32 w-auto shrink-0 lg:mx-0 lg:h-44" />
          <div className="mt-5 text-center lg:mt-0 lg:text-left">
            <p className="font-display text-2xl font-bold">{monitor.title[lng]}</p>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-night-50 lg:max-w-sm">{monitor.body[lng]}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-turquoise-300">
              {t('landing.pillars.cta')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>

        {/* Pregnancy */}
        <Link
          to={pregnancy.link}
          className="group rounded-3xl border border-lapis-200 bg-lapis-50 p-5 transition-transform hover:-translate-y-1 lg:col-start-1 lg:row-start-1"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lapis-700 text-white">
            <PregnancyIcon className="h-5.5 w-5.5" />
          </span>
          <p className="mt-3 font-display text-lg font-bold text-lapis-900">{pregnancy.title[lng]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-lapis-800/80">{pregnancy.body[lng]}</p>
        </Link>

        {/* Recovery */}
        <Link
          to={recovery.link}
          className="group rounded-3xl border border-turquoise-200 bg-turquoise-50 p-5 transition-transform hover:-translate-y-1 lg:col-start-1 lg:row-start-2"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-turquoise-600 text-white">
            <RecoveryIcon className="h-5.5 w-5.5" />
          </span>
          <p className="mt-3 font-display text-lg font-bold text-turquoise-900">{recovery.title[lng]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-turquoise-800/80">{recovery.body[lng]}</p>
        </Link>

        {/* Speech */}
        <Link
          to={speech.link}
          className="group rounded-3xl border border-apricot-200 bg-apricot-50 p-5 transition-transform hover:-translate-y-1 lg:col-start-4 lg:row-start-1"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-apricot-500 text-white">
            <SpeechIcon className="h-5.5 w-5.5" />
          </span>
          <p className="mt-3 font-display text-lg font-bold text-apricot-900">{speech.title[lng]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-apricot-800/80">{speech.body[lng]}</p>
        </Link>

        {/* Community */}
        <Link
          to={community.link}
          className="group rounded-3xl border border-linen-300 bg-white p-5 transition-transform hover:-translate-y-1 lg:col-start-4 lg:row-start-2"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
            <CommunityIcon className="h-5.5 w-5.5" />
          </span>
          <p className="mt-3 font-display text-lg font-bold text-ink-900">{community.title[lng]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{community.body[lng]}</p>
        </Link>
      </div>
    </Section>
  );
}
