import { useTranslation } from 'react-i18next';
import { CRY_REASON_LABELS, predictReasons } from '@/data/monitor';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

/**
 * The "phone receives the alert" moment — shared by the hero (4.1), the
 * night-scene sequence (4.2), and /kiosk. Not a mockup: calls the real
 * predictReasons() from the data layer with the given context/confidence,
 * so the bars shown are the same numbers the /monitor demo would produce.
 */
export function CryPredictionPhone({
  confidence,
  context,
  notification,
  className,
}: {
  confidence: number;
  context: { timeSinceLastFeedMin: number; sleptBeforeMin: number; hour: number };
  notification: string;
  className?: string;
}) {
  const { i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const predictions = predictReasons(context, confidence).slice(0, 3);

  return (
    <div className={cn('rounded-2xl border border-apricot-300/40 bg-apricot-500/15 p-4', className)}>
      <p className="text-sm font-semibold text-apricot-200">{notification}</p>
      <div className="mt-3 space-y-2">
        {predictions.map((p) => (
          <div key={p.reason}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-white/90">{CRY_REASON_LABELS[p.reason][lng]}</span>
              <span className="text-white/60">{p.probability}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                className="h-1.5 rounded-full bg-turquoise-400 transition-all duration-700"
                style={{ width: `${p.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
