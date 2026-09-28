import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { feedsPerDay } from '@/data/monitorStats';
import { Panel } from '@/components/monitor/Panel';

export function FeedsChart() {
  const { t } = useTranslation();
  const daily = feedsPerDay();
  const data = daily.map((d) => ({ day: d.date.getDate(), count: d.count }));
  const avgInterval = Math.round(
    daily.filter((d) => d.avgIntervalMin > 0).reduce((sum, d) => sum + d.avgIntervalMin, 0) /
      Math.max(1, daily.filter((d) => d.avgIntervalMin > 0).length),
  );

  return (
    <Panel
      title={t('monitor.stats.feeds')}
      action={
        <div className="text-right">
          <div className="font-display text-xl font-bold text-apricot-300">{Math.round(avgInterval / 60)}h {avgInterval % 60}m</div>
          <div className="text-xs text-night-50">{t('monitor.stats.avgInterval')}</div>
        </div>
      }
    >
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="#2A3358" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} width={24} />
            <Tooltip contentStyle={{ background: '#0A1226', border: '1px solid #2A3358', borderRadius: 12, fontSize: 12 }} labelStyle={{ color: '#7C88AD' }} />
            <Bar dataKey="count" fill="#E2924C" radius={[6, 6, 0, 0]} name={t('monitor.stats.feeds')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
