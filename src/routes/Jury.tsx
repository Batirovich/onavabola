import { Printer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BusinessModelSection } from '@/components/landing/BusinessModelSection';
import { ProblemTimeline } from '@/components/landing/ProblemTimeline';
import { RoadmapSection } from '@/components/landing/RoadmapSection';
import { SafetySection } from '@/components/landing/SafetySection';
import { Section } from '@/components/landing/Section';
import { TeamSection } from '@/components/landing/TeamSection';
import { WhyDifferentSection } from '@/components/landing/WhyDifferentSection';
import { MvpStatus } from '@/components/jury/MvpStatus';
import { SolutionPicture } from '@/components/jury/SolutionPicture';
import { JURY_LIMITS } from '@/data/jury';
import type { SupportedLanguage } from '@/i18n';
import { usePageMeta } from '@/lib/usePageMeta';

const TOC = [
  { id: 'problem', key: 'problem' },
  { id: 'solution', key: 'solution' },
  { id: 'different', key: 'different' },
  { id: 'mvp', key: 'mvp' },
  { id: 'business', key: 'business' },
  { id: 'roadmap', key: 'roadmap' },
  { id: 'team', key: 'team' },
  { id: 'safety', key: 'safety' },
] as const;

export function Jury() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  usePageMeta('meta.jury.title', 'meta.jury.description');

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('meta.jury.title')}</h1>
            <p className="mt-2 max-w-2xl text-(--fg-muted)">{t('meta.jury.description')}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 rounded-full border border-(--border) px-4 py-2 text-sm font-semibold text-(--fg) hover:bg-(--bg-elevated)"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            {t('jury.print')}
          </button>
        </div>
      </div>

      <nav
        aria-label={t('jury.tocLabel')}
        className="no-print sticky top-20 z-30 overflow-x-auto border-y border-(--border) bg-(--bg)/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl gap-6 px-4 py-3 text-sm font-semibold text-(--fg-muted) sm:px-6 lg:px-8">
          {TOC.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="shrink-0 whitespace-nowrap hover:text-lapis-700">
              {t(`jury.toc.${item.key}`)}
            </a>
          ))}
        </div>
      </nav>

      <ProblemTimeline id="problem" />
      <SolutionPicture id="solution" />
      <WhyDifferentSection id="different" />
      <MvpStatus id="mvp" />
      <div id="business">
        <BusinessModelSection />
        <Section className="bg-(--bg-elevated) pt-0">
          <p className="text-sm text-(--fg-muted)">{t('jury.pricingNote')}</p>
        </Section>
      </div>
      <RoadmapSection id="roadmap" />
      <TeamSection id="team" />
      <div id="safety">
        <SafetySection />
        <Section className="pt-0">
          <div className="rounded-2xl border border-linen-300 bg-(--bg-elevated) p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-(--fg-muted)">{t('jury.limitsTitle')}</p>
            <p className="mt-2 text-sm leading-relaxed text-(--fg-muted)">{JURY_LIMITS[lng]}</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
