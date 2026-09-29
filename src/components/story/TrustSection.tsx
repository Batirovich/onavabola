import { Cpu, Database, ShieldCheck, Stethoscope, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TileMotif } from '@/components/brand/TileMotif';
import { Section, SectionHeading } from '@/components/landing/Section';
import { CLINIC_KPIS } from '@/data/clinic';
import { SAFETY_POINTS } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

const ICONS = [Cpu, ShieldCheck, Stethoscope, Database];

export function TrustSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [featured, ...rest] = SAFETY_POINTS;
  const FeaturedIcon = ICONS[0];

  return (
    <Section id="trust" className="relative overflow-hidden">
      <TileMotif className="absolute inset-0 h-full w-full text-lapis-700" opacity={0.06} />
      <div className="relative">
        <SectionHeading title={t('story.trust.title')} subtitle={t('story.trust.subtitle')} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <div className="flex items-start gap-5 rounded-3xl border border-turquoise-200 bg-turquoise-50 p-6 lg:col-span-3">
            <FeaturedIcon className="h-7 w-7 shrink-0 text-turquoise-700" aria-hidden="true" />
            <p className="font-display text-xl font-bold leading-snug text-turquoise-900">{featured[lng]}</p>
          </div>

          {rest.map((point, i) => {
            const Icon = ICONS[i + 1];
            return (
              <div key={point.uz} className="flex gap-3.5 rounded-2xl border border-turquoise-200 bg-turquoise-50 p-5">
                <Icon className="h-5 w-5 shrink-0 text-turquoise-700" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-turquoise-900">{point[lng]}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-linen-300 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lapis-50 text-lapis-700">
              <Users className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink-900">{t('story.trust.clinicKpi.title')}</p>
              <p className="mt-0.5 text-sm text-ink-600">
                {t('story.trust.clinicKpi.mothers', { count: CLINIC_KPIS.registeredMothers })}
                {' · '}
                {t('story.trust.clinicKpi.monitors', { count: CLINIC_KPIS.activeMonitors })}
              </p>
            </div>
          </div>
          <Link
            to="/clinic"
            className="shrink-0 text-sm font-semibold text-lapis-700 underline decoration-lapis-300 underline-offset-4 hover:text-lapis-900"
          >
            {t('story.trust.cta')}
          </Link>
        </div>
      </div>
    </Section>
  );
}
