import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { sleepPerDay } from '@/data/monitorStats';
import { Panel } from '@/components/monitor/Panel';

export function SleepChart() {
  const { t } = useTranslation();
  const data = sleepPerDay().map((d) => ({
    day: d.date.getDate(),
    night: Math.round((d.nightMin / 60) * 10) / 10,
    nap: Math.round((d.napMin / 60) * 10) / 10,
    total: Math.round(((d.nightMin + d.napMin) / 60) * 10) / 10,
  }));

  return (
    <Panel title={t('monitor.stats.sleep')}>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="#2A3358" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} width={28} />
            <Tooltip
              contentStyle={{ background: '#0A1226', border: '1px solid #2A3358', borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: '#7C88AD' }}
            />
            <Bar dataKey="night" stackId="sleep" fill="#1E3660" radius={[0, 0, 4, 4]} name={t('monitor.stats.sleepNight')} />
            <Bar dataKey="nap" stackId="sleep" fill="#359E91" radius={[4, 4, 0, 0]} name={t('monitor.stats.sleepNap')} />
            <Line type="monotone" dataKey="total" stroke="#E2924C" strokeWidth={2} dot={false} name={t('monitor.stats.sleep')} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
