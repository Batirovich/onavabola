import { useTranslation } from 'react-i18next';
import {
  BabyTabIcon,
  HomeTabIcon,
  PregnancyIcon,
  ProfileTabIcon,
  RecoveryIcon,
  SpeechIcon,
} from '@/components/icons/BrandIcons';
import { cn } from '@/lib/utils';

export type AppTab = 'home' | 'pregnancy' | 'recovery' | 'baby' | 'speech' | 'profile';

const TABS: Array<{ id: AppTab; icon: typeof HomeTabIcon }> = [
  { id: 'home', icon: HomeTabIcon },
  { id: 'pregnancy', icon: PregnancyIcon },
  { id: 'recovery', icon: RecoveryIcon },
  { id: 'baby', icon: BabyTabIcon },
  { id: 'speech', icon: SpeechIcon },
  { id: 'profile', icon: ProfileTabIcon },
];

export function TabBar({ active, onChange }: { active: AppTab; onChange: (tab: AppTab) => void }) {
  const { t } = useTranslation();
  return (
    <nav className="flex border-t border-linen-300 bg-white/95 px-1.5 pb-1.5 pt-1 backdrop-blur" aria-label={t('nav.app')}>
      {TABS.map(({ id, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-1 flex-col items-center gap-1 py-1.5 text-[10px] font-semibold transition-colors"
          >
            <span
              className={cn(
                'flex h-9 w-12 items-center justify-center rounded-full transition-colors',
                isActive ? 'bg-lapis-700 text-white' : 'text-ink-500/65',
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={isActive ? 2 : 1.75} />
            </span>
            <span className={isActive ? 'text-lapis-700' : 'text-ink-500/65'}>{t(`app.nav.${id}`)}</span>
          </button>
        );
      })}
    </nav>
  );
}
