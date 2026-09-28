import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { GeometricAvatar } from '@/components/community/GeometricAvatar';
import { TEAM } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

export function TeamSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section className="bg-(--bg-elevated)">
      <SectionHeading title={t('landing.team.title')} subtitle={t('landing.team.subtitle')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.id} className="rounded-2xl border border-dashed border-linen-300 bg-white p-5 text-center">
            <GeometricAvatar seed={member.id} size={56} className="mx-auto" />
            <p className="mt-3 font-display text-base font-bold text-ink-400">{member.placeholder[lng]}</p>
            <p className="mt-1 text-xs text-ink-500">{member.role[lng]}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
