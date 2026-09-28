import { useTranslation } from 'react-i18next';
import { usePageMeta } from '@/lib/usePageMeta';

export function Clinic() {
  const { t } = useTranslation();
  usePageMeta('meta.clinic.title', 'meta.clinic.description');

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold text-(--fg) sm:text-5xl">{t('meta.clinic.title')}</h1>
      <p className="mt-4 text-(--fg-muted)">{t('meta.clinic.description')}</p>
    </div>
  );
}
