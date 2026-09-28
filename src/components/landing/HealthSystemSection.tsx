import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Section } from '@/components/landing/Section';
import { CLINIC_KPIS, DISTRICT_NAME } from '@/data/clinic';
import type { SupportedLanguage } from '@/i18n';
import { formatNumber } from '@/lib/format';

export function HealthSystemSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  const stats = [
    { label: t('clinic.kpi.registeredMothers'), value: CLINIC_KPIS.registeredMothers },
    { label: t('clinic.kpi.missedVisits'), value: CLINIC_KPIS.missedVisitsThisWeek },
    { label: t('clinic.kpi.epdsFlags'), value: CLINIC_KPIS.epdsRiskFlags },
    { label: t('clinic.kpi.activeMonitors'), value: CLINIC_KPIS.activeMonitors },
  ];

  return (
    <Section className="bg-(--bg-elevated)">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('landing.healthSystem.title')}</h2>
          <p className="mt-3 max-w-md text-(--fg-muted)">{t('landing.healthSystem.subtitle')}</p>
          <Link
            to="/clinic"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lapis-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
          >
            {t('landing.healthSystem.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="rounded-3xl border border-linen-300 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-turquoise-600">{DISTRICT_NAME[lng]}</p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-lapis-800">{formatNumber(s.value, lng)}</p>
                <p className="mt-0.5 text-xs text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
