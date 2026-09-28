import { Baby, Flower2, Heart, Home, MessageCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type AppTab = 'home' | 'pregnancy' | 'recovery' | 'baby' | 'speech' | 'profile';

const TABS: Array<{ id: AppTab; icon: typeof Home }> = [
  { id: 'home', icon: Home },
  { id: 'pregnancy', icon: Heart },
  { id: 'recovery', icon: Flower2 },
  { id: 'baby', icon: Baby },
  { id: 'speech', icon: MessageCircle },
  { id: 'profile', icon: User },
];

export function TabBar({ active, onChange }: { active: AppTab; onChange: (tab: AppTab) => void }) {
  const { t } = useTranslation();
  return (
    <nav className="flex border-t border-linen-300 bg-white/95 backdrop-blur" aria-label={t('nav.app')}>
      {TABS.map(({ id, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors',
              isActive ? 'text-lapis-700' : 'text-ink-500/70 hover:text-ink-700',
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={isActive ? 2.4 : 2} />
            {t(`app.nav.${id}`)}
          </button>
        );
      })}
    </nav>
  );
}
