import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { INSIGHTS } from '@/data/monitor';
import { Panel } from '@/components/monitor/Panel';
import type { SupportedLanguage } from '@/i18n';

export function InsightsList() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Panel title={t('monitor.insights.title')}>
      <ul className="space-y-3">
        {INSIGHTS.map((insight, i) => (
          <li key={i} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-apricot-300" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-night-50">{insight[lng]}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
