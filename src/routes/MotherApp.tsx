import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/app/AppShell';
import { PhoneFrame } from '@/components/PhoneFrame';
import { usePageMeta } from '@/lib/usePageMeta';

export function MotherApp() {
  const { t } = useTranslation();
  usePageMeta('meta.app.title', 'meta.app.description');

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('meta.app.title')}</h1>
        <p className="mt-3 text-(--fg-muted)">{t('meta.app.description')}</p>
      </div>

      <div className="mt-10 lg:hidden">
        <div className="mx-auto h-[720px] max-w-sm overflow-hidden rounded-[2.5rem] border border-(--border) shadow-soft-lapis">
          <AppShell className="h-full" />
        </div>
      </div>

      <div className="mt-10 hidden justify-center lg:flex">
        <PhoneFrame>
          <AppShell className="h-full" />
        </PhoneFrame>
      </div>
    </div>
  );
}
