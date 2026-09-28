import { Cpu, Database, ShieldCheck, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { SAFETY_POINTS } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

const ICONS = [Cpu, ShieldCheck, Stethoscope, Database];

export function SafetySection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section>
      <SectionHeading title={t('landing.safety.title')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SAFETY_POINTS.map((point, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={point.uz} className="flex gap-4 rounded-2xl border border-turquoise-200 bg-turquoise-50 p-5">
              <Icon className="h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-turquoise-900">{point[lng]}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
