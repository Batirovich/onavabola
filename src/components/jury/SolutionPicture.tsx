import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { Section, SectionHeading } from '@/components/landing/Section';
import { PILLARS } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

export function SolutionPicture({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id} className="bg-(--bg-elevated)">
      <SectionHeading title={t('jury.solution.title')} subtitle={t('jury.solution.subtitle')} />

      <div className="mt-12 flex flex-col items-center">
        <DeviceIllustration className="h-32 w-auto" />
        <div className="mt-2 h-10 w-px bg-linen-300" aria-hidden="true" />

        <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.id}
              to={pillar.link}
              className="flex flex-col items-center rounded-2xl border border-linen-300 bg-white p-4 text-center transition-colors hover:border-lapis-300"
            >
              <span className="text-2xl" aria-hidden="true">{pillar.emoji}</span>
              <span className="mt-2 text-sm font-semibold text-(--fg)">{pillar.title[lng]}</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
