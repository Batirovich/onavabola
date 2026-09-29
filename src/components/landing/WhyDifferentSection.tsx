import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { DIFFERENTIATORS } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

export function WhyDifferentSection({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id}>
      <SectionHeading title={t('landing.whyDifferent.title')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIATORS.map((d, i) => (
          <div key={d.id} className="rounded-2xl border border-linen-300 bg-white p-5">
            <span className="font-display text-2xl font-bold text-turquoise-300">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-2 font-display text-base font-bold text-(--fg)">{d.title[lng]}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-(--fg-muted)">{d.body[lng]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
