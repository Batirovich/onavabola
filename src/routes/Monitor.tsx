import { useTranslation } from 'react-i18next';
import { MonitorShell } from '@/components/layout/MonitorShell';
import { usePageMeta } from '@/lib/usePageMeta';

export function Monitor() {
  const { t } = useTranslation();
  usePageMeta('meta.monitor.title', 'meta.monitor.description');

  return (
    <MonitorShell>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{t('meta.monitor.title')}</h1>
        <p className="mt-4 text-night-50">{t('meta.monitor.description')}</p>
      </div>
    </MonitorShell>
  );
}
