import { useTranslation } from 'react-i18next';
import { cryHeatmap } from '@/data/monitorStats';
import { Panel } from '@/components/monitor/Panel';

export function CryHeatmap() {
  const { t } = useTranslation();
  const grid = cryHeatmap();
  const max = Math.max(1, ...grid.flat());

  return (
    <Panel title={t('monitor.stats.heatmap')} subtitle={t('monitor.stats.heatmapNote')}>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-[3px]" style={{ minWidth: 24 * 14 }}>
          <div className="flex gap-[3px] pl-0 text-[9px] text-night-50">
            {Array.from({ length: 24 }).map((_, h) => (
              <span key={h} className="w-[14px] text-center">
                {h % 6 === 0 ? h : ''}
              </span>
            ))}
          </div>
          {grid.map((row, dayIdx) => (
            <div key={dayIdx} className="flex gap-[3px]">
              {row.map((count, hour) => (
                <span
                  key={hour}
                  className="h-[10px] w-[14px] rounded-[3px]"
                  style={{
                    backgroundColor: count === 0 ? 'rgba(255,255,255,0.06)' : '#E2924C',
                    opacity: count === 0 ? 1 : 0.25 + (count / max) * 0.75,
                  }}
                  title={`${count}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
