import { useTranslation } from 'react-i18next';
import { REGIONS } from '@/data/regions';
import type { SupportedLanguage } from '@/i18n';

type Coverage = 'pilot' | 'planned' | 'none';

const COVERAGE: Record<string, Coverage> = {
  'tashkent-city': 'pilot',
  'tashkent-region': 'planned',
  samarqand: 'planned',
  fargona: 'planned',
};

const COLOR: Record<Coverage, string> = {
  pilot: 'bg-turquoise-500 text-white border-turquoise-500',
  planned: 'bg-apricot-100 text-apricot-800 border-apricot-300',
  none: 'bg-linen-100 text-ink-500 border-linen-300',
};

/**
 * Original, deliberately simplified coverage grid — not a geographic map.
 * Each tile is one of Uzbekistan's regions; color shows pilot status.
 */
export function RegionMap() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="rounded-2xl border border-linen-300 bg-white p-5">
      <p className="font-display text-base font-bold text-ink-900">{t('clinic.map.title')}</p>
      <p className="mt-0.5 text-xs text-ink-500">{t('clinic.map.subtitle')}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        {REGIONS.map((region) => {
          const coverage = COVERAGE[region.id] ?? 'none';
          return (
            <div
              key={region.id}
              className={`rounded-xl border px-2.5 py-3 text-center text-[11px] font-medium leading-tight ${COLOR[coverage]}`}
              title={region.name[lng]}
            >
              {region.name[lng]}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-600">
        <Legend colorClass="bg-turquoise-500" label={t('clinic.map.pilot')} />
        <Legend colorClass="bg-apricot-200" label={t('clinic.map.planned')} />
        <Legend colorClass="bg-linen-200" label={t('clinic.map.none')} />
      </div>
    </div>
  );
}

function Legend({ colorClass, label }: { colorClass: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-sm ${colorClass}`} />
      {label}
    </span>
  );
}
