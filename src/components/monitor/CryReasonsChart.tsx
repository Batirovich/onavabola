import { useTranslation } from 'react-i18next';
import { CRY_REASON_LABELS } from '@/data/monitor';
import { averageTimeToCalm, cryReasonBreakdown } from '@/data/monitorStats';
import { Panel } from '@/components/monitor/Panel';
import type { SupportedLanguage } from '@/i18n';

const REASON_COLOR: Record<string, string> = {
  hunger: '#E2924C',
  painGas: '#C24B5C',
  sleepy: '#4F6AA0',
  wantsHeld: '#359E91',
  diaper: '#D97E34',
  discomfort: '#7C88AD',
};

export function CryReasonsChart() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const breakdown = cryReasonBreakdown().sort((a, b) => b.count - a.count);
  const total = Math.max(1, breakdown.reduce((s, r) => s + r.count, 0));
  const avgCalm = averageTimeToCalm();

  return (
    <Panel
      title={t('monitor.stats.cryReasons')}
      action={
        <div className="text-right">
          <div className="font-display text-xl font-bold text-turquoise-300">
            {avgCalm} <span className="text-sm font-normal text-night-50">{t('monitor.stats.minutes')}</span>
          </div>
          <div className="text-xs text-night-50">{t('monitor.stats.avgCalm')}</div>
        </div>
      }
    >
      <div className="space-y-2.5">
        {breakdown.map((r) => {
          const pct = Math.round((r.count / total) * 100);
          return (
            <div key={r.reason}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-white">{CRY_REASON_LABELS[r.reason][lng]}</span>
                <span className="text-night-50">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: REASON_COLOR[r.reason] }} />
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
