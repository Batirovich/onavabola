import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { PROBLEM_TIMELINE } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

export function ProblemTimeline({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id}>
      <SectionHeading title={t('landing.problem.title')} subtitle={t('landing.problem.subtitle')} />

      <ol className="relative mt-12 space-y-8 lg:space-y-0">
        <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:top-5 lg:h-px lg:bg-linen-300" aria-hidden="true" />
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          {PROBLEM_TIMELINE.map((stage, i) => (
            <li key={stage.id} className="relative flex gap-4 lg:block lg:gap-0">
              <div className="flex flex-col items-center lg:mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lapis-700 font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-1 w-px flex-1 bg-linen-300 lg:hidden" aria-hidden="true" />
              </div>
              <div className="pb-8 lg:pb-0">
                <p className="font-display text-base font-bold text-(--fg)">{stage.stage[lng]}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-(--fg-muted)">{stage.gap[lng]}</p>
              </div>
            </li>
          ))}
        </div>
      </ol>
    </Section>
  );
}
