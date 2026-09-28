import { useRef, useState } from 'react';
import { TabBar, type AppTab } from '@/components/app/TabBar';
import { HomeTab } from '@/components/app/tabs/HomeTab';
import { PregnancyTab } from '@/components/app/tabs/PregnancyTab';
import { RecoveryTab } from '@/components/app/tabs/RecoveryTab';
import { BabyTab } from '@/components/app/tabs/BabyTab';
import { SpeechTab } from '@/components/app/tabs/SpeechTab';
import { ProfileTab } from '@/components/app/tabs/ProfileTab';

const TAB_COMPONENTS: Record<AppTab, React.ComponentType<{ onNavigate: (tab: AppTab) => void }>> = {
  home: HomeTab,
  pregnancy: PregnancyTab,
  recovery: RecoveryTab,
  baby: BabyTab,
  speech: SpeechTab,
  profile: ProfileTab,
};

export function AppShell({ className }: { className?: string }) {
  const [tab, setTab] = useState<AppTab>('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleChange = (next: AppTab) => {
    setTab(next);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const ActiveTab = TAB_COMPONENTS[tab];

  return (
    <div className={`relative flex h-full flex-col bg-linen-50 ${className ?? ''}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <ActiveTab onNavigate={handleChange} />
      </div>
      <TabBar active={tab} onChange={handleChange} />
    </div>
  );
}
