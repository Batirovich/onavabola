import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppShell } from '@/components/app/AppShell';
import type { AppTab } from '@/components/app/TabBar';
import {
  BabyTabIcon,
  HomeTabIcon,
  PregnancyIcon,
  ProfileTabIcon,
  RecoveryIcon,
  SpeechIcon,
} from '@/components/icons/BrandIcons';
import { PhoneFrame } from '@/components/PhoneFrame';
import { usePageMeta } from '@/lib/usePageMeta';
import { cn } from '@/lib/utils';

const FEATURES: Array<{ id: AppTab; icon: typeof HomeTabIcon }> = [
  { id: 'home', icon: HomeTabIcon },
  { id: 'pregnancy', icon: PregnancyIcon },
  { id: 'recovery', icon: RecoveryIcon },
  { id: 'baby', icon: BabyTabIcon },
  { id: 'speech', icon: SpeechIcon },
  { id: 'profile', icon: ProfileTabIcon },
];

export function MotherApp() {
  const { t } = useTranslation();
  usePageMeta('meta.app.title', 'meta.app.description');
  const [desktopTab, setDesktopTab] = useState<AppTab>('home');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('meta.app.title')}</h1>
        <p className="mt-3 text-(--fg-muted)">{t('meta.app.description')}</p>
      </div>

      <div className="mt-10 lg:hidden">
        <div className="mx-auto h-[720px] max-w-sm overflow-hidden rounded-[2.5rem] border border-(--border) shadow-soft-lapis">
          <AppShell className="h-full" />
        </div>
      </div>

      <div className="mt-14 hidden items-center gap-16 lg:flex">
        <div className="flex-1 space-y-2">
          {FEATURES.map(({ id, icon: Icon }) => {
            const active = desktopTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setDesktopTab(id)}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors',
                  active ? 'border-lapis-200 bg-lapis-50' : 'border-transparent hover:bg-(--bg-elevated)',
                )}
              >
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors',
                    active ? 'bg-lapis-700 text-white' : 'bg-(--bg-elevated) text-(--fg-muted)',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className={cn('block font-display text-base font-bold', active ? 'text-lapis-800' : 'text-(--fg)')}>
                    {t(`app.nav.${id}`)}
                  </span>
                  <span className="mt-0.5 block text-sm text-(--fg-muted)">{t(`app.featureBlurbs.${id}`)}</span>
                </span>
              </button>
            );
          })}
        </div>

        <PhoneFrame className="shrink-0">
          <AppShell className="h-full" activeTab={desktopTab} onTabChange={setDesktopTab} />
        </PhoneFrame>
      </div>
    </div>
  );
}
