import { useTranslation } from 'react-i18next';
import { todayTimeline } from '@/data/monitorStats';
import { Panel } from '@/components/monitor/Panel';

const BLOCK_COLOR: Record<string, string> = {
  night: '#1E3660',
  nap: '#359E91',
};
const MARKER_COLOR: Record<string, string> = {
  feed: '#E2924C',
  cry: '#C24B5C',
};

const MINUTES_IN_DAY = 24 * 60;

export function Timeline24h() {
  const { t } = useTranslation();
  const blocks = todayTimeline();
  const bands = blocks.filter((b) => b.kind === 'night' || b.kind === 'nap');
  const markers = blocks.filter((b) => b.kind === 'feed' || b.kind === 'cry');

  return (
    <Panel title={t('monitor.stats.timeline')}>
      <div className="relative h-12 rounded-full bg-white/5">
        {bands.map((b, i) => (
          <div
            key={i}
            className="absolute top-0 h-full rounded-full"
            style={{
              left: `${(b.startMin / MINUTES_IN_DAY) * 100}%`,
              width: `${((b.endMin - b.startMin) / MINUTES_IN_DAY) * 100}%`,
              backgroundColor: BLOCK_COLOR[b.kind],
            }}
          />
        ))}
        {markers.map((m, i) => (
          <div
            key={i}
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night-700"
            style={{ left: `${(m.startMin / MINUTES_IN_DAY) * 100}%`, backgroundColor: MARKER_COLOR[m.kind] }}
            title={m.kind}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-night-50">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-night-50">
        <LegendDot color={BLOCK_COLOR.night} label={t('monitor.stats.timelineLegend.night')} />
        <LegendDot color={BLOCK_COLOR.nap} label={t('monitor.stats.timelineLegend.nap')} />
        <LegendDot color={MARKER_COLOR.feed} label={t('monitor.stats.timelineLegend.feed')} round />
        <LegendDot color={MARKER_COLOR.cry} label={t('monitor.stats.timelineLegend.cry')} round />
      </div>
    </Panel>
  );
}

function LegendDot({ color, label, round }: { color: string; label: string; round?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={round ? 'h-2.5 w-2.5 rounded-full' : 'h-2.5 w-4 rounded-full'} style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
