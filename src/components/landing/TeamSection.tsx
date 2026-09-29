import { Apple, Compass, MessagesSquare, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { TEAM } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

const ICONS: Record<string, typeof Compass> = {
  lead: Compass,
  pediatrician: Stethoscope,
  speechTherapist: MessagesSquare,
  nutritionist: Apple,
};

export function TeamSection({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id} className="bg-(--bg-elevated)">
      <SectionHeading title={t('landing.team.title')} subtitle={t('landing.team.subtitle')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => {
          const Icon = ICONS[member.id];
          return (
            <div key={member.id} className="rounded-2xl border border-linen-300 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lapis-50 text-lapis-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-display text-base font-bold text-(--fg)">{member.role[lng]}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-(--fg-muted)">{member.contribution[lng]}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
