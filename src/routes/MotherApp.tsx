import { useTranslation } from 'react-i18next';
import { PhoneFrame } from '@/components/PhoneFrame';
import { usePageMeta } from '@/lib/usePageMeta';

export function MotherApp() {
  const { t } = useTranslation();
  usePageMeta('meta.app.title', 'meta.app.description');

  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold text-(--fg) sm:text-5xl">{t('meta.app.title')}</h1>
      <p className="mx-auto mt-4 max-w-xl text-(--fg-muted)">{t('meta.app.description')}</p>
      <div className="mt-12 hidden justify-center lg:flex">
        <PhoneFrame>
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-(--fg-muted)">
            {t('common.comingSoon')}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
