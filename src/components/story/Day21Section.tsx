import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Section, SectionHeading } from '@/components/landing/Section';
import { confidenceForDay, DAYS, INSIGHTS, LEARNING_WINDOW_DAYS } from '@/data/monitor';
import type { SupportedLanguage } from '@/i18n';

export function Day21Section() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const chartData = DAYS.slice(0, LEARNING_WINDOW_DAYS).map((d) => ({ day: d.dayNumber, confidence: d.learningConfidence }));
  const confidence = confidenceForDay(LEARNING_WINDOW_DAYS);

  return (
    <Section id="day21" className="bg-linen-50">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-apricot-600">{t('story.day21.eyebrow')}</p>
      <SectionHeading title={t('story.day21.title')} subtitle={t('story.day21.subtitle')} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl border border-linen-300 bg-white p-5">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-turquoise-700">{confidence}%</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('monitor.learning.confidence')}</span>
          </div>
          <div className="mt-3 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="day21Confidence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1F8A82" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#1F8A82" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#8A8398" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[30, 100]} stroke="#8A8398" fontSize={11} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, fontSize: 12, borderColor: '#E3DAC7' }}
                  formatter={(value) => [`${value}%`, t('monitor.learning.confidence')]}
                  labelFormatter={(d) => `${d} ${t('landing.learning.day')}`}
                />
                <Area type="monotone" dataKey="confidence" stroke="#1F8A82" strokeWidth={2.5} fill="url(#day21Confidence)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {INSIGHTS.slice(0, 2).map((insight, i) => (
            <div key={i} className="flex gap-4 rounded-2xl border border-linen-300 bg-white p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-apricot-50 text-apricot-600">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{insight[lng]}</p>
            </div>
          ))}
          <Link
            to="/monitor"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-lapis-700 underline decoration-lapis-300 underline-offset-4 hover:text-lapis-900"
          >
            {t('story.day21.cta')}
          </Link>
        </div>
      </div>
    </Section>
  );
}
