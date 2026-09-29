import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KpiCards } from '@/components/clinic/KpiCards';
import { MotherDrawer } from '@/components/clinic/MotherDrawer';
import { MothersTable } from '@/components/clinic/MothersTable';
import { RegionMap } from '@/components/clinic/RegionMap';
import { SpeechTherapistView } from '@/components/clinic/SpeechTherapistView';
import { DISTRICT_NAME, type ClinicMother } from '@/data/clinic';
import type { SupportedLanguage } from '@/i18n';
import { usePageMeta } from '@/lib/usePageMeta';
import { cn } from '@/lib/utils';

type ClinicTab = 'mothers' | 'speech';

export function Clinic() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  usePageMeta('meta.clinic.title', 'meta.clinic.description');

  const [tab, setTab] = useState<ClinicTab>('mothers');
  const [selected, setSelected] = useState<ClinicMother | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('meta.clinic.title')}</h1>
        <p className="mt-2 text-(--fg-muted)">{t('clinic.subtitle', { district: DISTRICT_NAME[lng] })}</p>
        <p className="mt-1 text-sm text-(--fg-muted)">{t('clinic.purpose')}</p>
      </div>

      <div className="mt-6">
        <KpiCards />
      </div>

      <div className="mt-6">
        <RegionMap />
      </div>

      <div className="mt-8 flex gap-2 border-b border-(--border)">
        {(['mothers', 'speech'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors',
              tab === id ? 'border-lapis-700 text-lapis-700' : 'border-transparent text-(--fg-muted) hover:text-(--fg)',
            )}
          >
            {t(`clinic.tabs.${id}`)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'mothers' ? <MothersTable onSelect={setSelected} /> : <SpeechTherapistView />}
      </div>

      {selected && <MotherDrawer mother={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
