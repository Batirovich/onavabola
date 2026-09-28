import { useEffect, useState } from 'react';
import { Moon, Sun, Baby } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { Waveform } from '@/components/monitor/Waveform';
import { Panel } from '@/components/monitor/Panel';
import type { BabyState } from '@/hooks/useMonitorDemo';
import { formatDuration } from '@/lib/format';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

const STATE_META: Record<BabyState, { icon: typeof Moon; color: string }> = {
  sleeping: { icon: Moon, color: 'text-turquoise-300' },
  awake: { icon: Sun, color: 'text-apricot-300' },
  crying: { icon: Baby, color: 'text-apricot-400' },
};

export function LiveView({ babyState, stateSince }: { babyState: BabyState; stateSince: number }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(interval);
  }, []);

  const meta = STATE_META[babyState];
  const Icon = meta.icon;
  const durationMin = Math.max(0, Math.round((now - stateSince) / 60000));

  return (
    <Panel title={t('monitor.liveView.title')}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <DeviceIllustration
          state={babyState === 'crying' ? 'crying' : 'listening'}
          className="h-40 w-auto shrink-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className={cn('inline-flex items-center gap-2 text-2xl font-bold', meta.color)}>
            <Icon className="h-6 w-6" aria-hidden="true" />
            {t(`monitor.liveView.${babyState}`)}
          </div>
          <p className="mt-1 text-sm text-night-50">
            {formatDuration(durationMin, lng)} {t('monitor.liveView.since')}
          </p>
          <div className="mt-4">
            <Waveform active={babyState === 'crying'} color={babyState === 'crying' ? '#E2924C' : '#62BBB0'} />
          </div>
        </div>
      </div>
    </Panel>
  );
}
