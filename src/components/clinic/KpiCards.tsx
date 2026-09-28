import { AlertTriangle, Baby, CalendarX2, HeartPulse, MessageCircle, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CLINIC_KPIS } from '@/data/clinic';
import type { SupportedLanguage } from '@/i18n';
import { formatNumber } from '@/lib/format';

const CARDS = [
  { key: 'registeredMothers', icon: Users, value: () => CLINIC_KPIS.registeredMothers, tone: 'lapis' },
  {
    key: 'pregnancies',
    icon: Baby,
    value: () => `${CLINIC_KPIS.pregnanciesByTrimester[1]}/${CLINIC_KPIS.pregnanciesByTrimester[2]}/${CLINIC_KPIS.pregnanciesByTrimester[3]}`,
    tone: 'turquoise',
  },
  { key: 'missedVisits', icon: CalendarX2, value: () => CLINIC_KPIS.missedVisitsThisWeek, tone: 'apricot' },
  { key: 'epdsFlags', icon: HeartPulse, value: () => CLINIC_KPIS.epdsRiskFlags, tone: 'rose' },
  { key: 'speechDelayFlags', icon: MessageCircle, value: () => CLINIC_KPIS.speechDelayFlags, tone: 'apricot' },
  { key: 'activeMonitors', icon: AlertTriangle, value: () => CLINIC_KPIS.activeMonitors, tone: 'turquoise' },
] as const;

const TONE_CLASSES: Record<string, string> = {
  lapis: 'text-lapis-700 bg-lapis-50',
  turquoise: 'text-turquoise-700 bg-turquoise-50',
  apricot: 'text-apricot-700 bg-apricot-50',
  rose: 'text-rose-600 bg-rose-50',
};

export function KpiCards() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {CARDS.map(({ key, icon: Icon, value, tone }) => {
        const raw = value();
        const display = typeof raw === 'number' ? formatNumber(raw, lng) : raw;
        return (
          <div key={key} className="rounded-2xl border border-linen-300 bg-white p-4">
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${TONE_CLASSES[tone]}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="mt-2.5 font-display text-2xl font-bold text-ink-900">{display}</p>
            <p className="mt-0.5 text-xs leading-tight text-ink-500">{t(`clinic.kpi.${key}`)}</p>
          </div>
        );
      })}
    </div>
  );
}
