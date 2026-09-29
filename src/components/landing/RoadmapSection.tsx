import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { ROADMAP } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

export function RoadmapSection({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id}>
      <SectionHeading title={t('landing.roadmap.title')} />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
        {ROADMAP.map((step, i) => (
          <li key={step.id} className="relative pl-10 lg:pl-0">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
              <span className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-turquoise-600 font-display text-sm font-bold text-white lg:static lg:mb-3">
                {i + 1}
              </span>
              {i < ROADMAP.length - 1 && (
                <span className="absolute left-4 top-8 h-[calc(100%+1rem)] w-px bg-linen-300 lg:left-0 lg:right-0 lg:top-4 lg:h-px lg:w-full" aria-hidden="true" />
              )}
            </div>
            <p className="font-display text-base font-bold text-(--fg)">{step.title[lng]}</p>
            <p className="mt-1 text-sm leading-relaxed text-(--fg-muted)">{step.body[lng]}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
