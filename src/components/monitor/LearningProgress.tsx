import { Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Ear, MessageCircleHeart, Waypoints } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DAYS, LEARNING_WINDOW_DAYS } from '@/data/monitor';
import { Panel } from '@/components/monitor/Panel';

const SIGNALS = [
  { key: 'sound', icon: Ear },
  { key: 'context', icon: Waypoints },
  { key: 'feedback', icon: MessageCircleHeart },
] as const;

export function LearningProgress({ learningDay, confidence }: { learningDay: number; confidence: number }) {
  const { t } = useTranslation();
  const learned = learningDay >= LEARNING_WINDOW_DAYS;

  const chartData = DAYS.slice(0, LEARNING_WINDOW_DAYS + 7).map((d) => ({
    day: d.dayNumber,
    confidence: d.dayNumber <= learningDay ? d.learningConfidence : null,
  }));

  return (
    <Panel
      title={t('monitor.learning.title')}
      subtitle={learned ? t('monitor.learning.learned') : t('monitor.learning.learningLabel')}
      action={
        <div className="text-right">
          <div className="font-display text-2xl font-bold text-turquoise-300">{confidence}%</div>
          <div className="text-xs text-night-50">{t('monitor.learning.confidence')}</div>
        </div>
      }
    >
      <div className="flex items-center justify-between text-sm text-night-50">
        <span className="font-semibold text-white">{t('monitor.learning.dayOf', { day: Math.min(learningDay, 21) })}</span>
      </div>

      <div className="mt-3 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#62BBB0" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#62BBB0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis domain={[30, 100]} stroke="#4D597E" fontSize={11} tickLine={false} axisLine={false} width={36} />
            <Tooltip
              contentStyle={{ background: '#0A1226', border: '1px solid #2A3358', borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: '#7C88AD' }}
              formatter={(value) => [`${value}%`, t('monitor.learning.confidence')]}
              labelFormatter={(d) => `Day ${d}`}
            />
            <ReferenceLine x={learningDay} stroke="#E2924C" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="confidence" stroke="#62BBB0" strokeWidth={2.5} fill="url(#confidenceFill)" connectNulls />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-night-50">{t('monitor.learning.signalsTitle')}</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {SIGNALS.map(({ key, icon: Icon }) => (
          <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Icon className="h-4 w-4 text-turquoise-300" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-white">{t(`monitor.learning.signals.${key}.title`)}</p>
            <p className="mt-0.5 text-xs text-night-50">{t(`monitor.learning.signals.${key}.body`)}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
