import { Ear, MessageCircleHeart, Waypoints } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Section, SectionHeading } from '@/components/landing/Section';
import { DAYS, LEARNING_WINDOW_DAYS } from '@/data/monitor';

const SIGNALS = [
  { key: 'sound', icon: Ear },
  { key: 'context', icon: Waypoints },
  { key: 'feedback', icon: MessageCircleHeart },
] as const;

export function MonitorLearningSection() {
  const { t } = useTranslation();
  const chartData = DAYS.slice(0, LEARNING_WINDOW_DAYS).map((d) => ({ day: d.dayNumber, confidence: d.learningConfidence }));

  return (
    <Section>
      <SectionHeading title={t('landing.learning.title')} subtitle={t('landing.learning.subtitle')} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="h-64 rounded-3xl border border-linen-300 bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="landingConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F8A82" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1F8A82" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#8A8398" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis domain={[30, 100]} stroke="#8A8398" fontSize={11} tickLine={false} axisLine={false} width={32} />
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 12, borderColor: '#E3DAC7' }}
                formatter={(value) => [`${value}%`, t('monitor.learning.confidence')]}
                labelFormatter={(d) => `${t('landing.learning.day')} ${d}`}
              />
              <Area type="monotone" dataKey="confidence" stroke="#1F8A82" strokeWidth={2.5} fill="url(#landingConfidence)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-5">
          {SIGNALS.map(({ key, icon: Icon }) => (
            <div key={key} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-turquoise-50 text-turquoise-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-(--fg)">{t(`monitor.learning.signals.${key}.title`)}</p>
                <p className="mt-0.5 text-sm text-(--fg-muted)">{t(`monitor.learning.signals.${key}.body`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
