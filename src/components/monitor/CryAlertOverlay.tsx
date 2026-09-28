import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PhoneFrame } from '@/components/PhoneFrame';
import { Wordmark } from '@/components/brand/Wordmark';
import { CHECKLIST_BY_REASON, CRY_REASONS, CRY_REASON_LABELS } from '@/data/monitor';
import type { ActiveCry } from '@/hooks/useMonitorDemo';
import type { SupportedLanguage } from '@/i18n';
import { formatDuration } from '@/lib/format';
import type { CryReason } from '@/data/types';

export function CryAlertOverlay({
  cry,
  onFeedback,
  onDismiss,
}: {
  cry: ActiveCry;
  onFeedback: (reason: CryReason) => void;
  onDismiss: () => void;
}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const topReason = cry.predictions[0]?.reason ?? 'hunger';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-night-900/80 p-4 backdrop-blur-sm no-print">
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t('monitor.alert.close')}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <PhoneFrame>
        <div className="flex h-full flex-col bg-linen-50 text-ink-900">
          <div className="flex items-center justify-between border-b border-linen-300 px-4 py-3">
            <Wordmark className="scale-90" />
          </div>

          <AnimatePresence mode="wait">
            {cry.stage === 'notifying' && (
              <motion.div key="notifying" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="p-4">
                <div className="rounded-2xl border border-apricot-300 bg-apricot-50 p-4 shadow-soft-lapis">
                  <p className="font-display text-base font-bold text-apricot-800">{t('monitor.alert.notification')}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-apricot-700">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {t('monitor.alert.analyzing')}
                  </p>
                </div>
              </motion.div>
            )}

            {(cry.stage === 'result' || cry.stage === 'feedback-given') && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 overflow-y-auto p-4"
              >
                <p className="font-display text-lg font-bold text-lapis-800">{t('monitor.alert.notification')}</p>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('monitor.alert.likelyReasons')}</p>
                  {cry.predictions.slice(0, 4).map((p) => (
                    <div key={p.reason}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-ink-900">{CRY_REASON_LABELS[p.reason][lng]}</span>
                        <span className="text-ink-500">{p.probability}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-900/10">
                        <div
                          className="h-2 rounded-full bg-turquoise-500 transition-all"
                          style={{ width: `${p.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl bg-linen-100 p-3 text-sm text-ink-700">
                  <p className="font-semibold text-ink-900">{t('monitor.alert.context')}</p>
                  <p className="mt-1">{t('monitor.alert.lastFeed', { time: formatDuration(cry.lastFeedMinutesAgo, lng) })}</p>
                  <p>{t('monitor.alert.sleptFor', { duration: formatDuration(cry.sleptForMin, lng) })}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('monitor.alert.checklist')}</p>
                  <ul className="mt-2 space-y-1.5">
                    {CHECKLIST_BY_REASON[topReason][lng].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {cry.stage === 'result' && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-ink-900">{t('monitor.alert.whatWasIt')}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CRY_REASONS.map((reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => onFeedback(reason)}
                          className="rounded-full border border-lapis-200 bg-white px-3 py-1.5 text-sm font-medium text-lapis-700 transition-colors hover:bg-lapis-700 hover:text-white"
                        >
                          {CRY_REASON_LABELS[reason][lng]}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-ink-500">{t('monitor.alert.feedbackNote')}</p>
                  </div>
                )}

                {cry.stage === 'feedback-given' && cry.confirmedReason && (
                  <div className="mt-5 rounded-xl border border-turquoise-200 bg-turquoise-50 p-3 text-sm text-turquoise-800">
                    <p className="font-semibold">{t('monitor.alert.thanks')}</p>
                    {cry.timeToCalmMin != null && (
                      <p className="mt-1">{t('monitor.alert.calmedIn', { minutes: cry.timeToCalmMin })}</p>
                    )}
                    <button
                      type="button"
                      onClick={onDismiss}
                      className="mt-3 rounded-full bg-turquoise-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-turquoise-700"
                    >
                      {t('monitor.alert.close')}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  );
}
