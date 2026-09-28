import { AlertCircle, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Sparkline } from '@/components/clinic/Sparkline';
import { CLINIC_CHILDREN, MAHALLAS } from '@/data/clinic';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function SpeechTherapistView() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const reviewQueue = CLINIC_CHILDREN.filter((c) => c.pendingRecordingReviews > 0).sort(
    (a, b) => b.pendingRecordingReviews - a.pendingRecordingReviews,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-linen-300 bg-white p-5">
        <p className="font-display text-base font-bold text-ink-900">{t('clinic.speech.reviewQueueTitle')}</p>
        {reviewQueue.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">{t('clinic.speech.noPending')}</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {reviewQueue.map((child) => (
              <li key={child.id} className="flex items-center justify-between rounded-xl border border-apricot-200 bg-apricot-50 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-sm font-medium text-apricot-800">
                  <Mic className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {child.name}
                </span>
                <span className="rounded-full bg-apricot-500 px-2 py-0.5 text-xs font-bold text-white">{child.pendingRecordingReviews}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="font-display text-base font-bold text-ink-900">{t('clinic.speech.childrenTitle')}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLINIC_CHILDREN.map((child) => (
            <div key={child.id} className="rounded-2xl border border-linen-300 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-ink-900">{child.name}</p>
                  <p className="text-xs text-ink-500">
                    {child.ageMonths} {lng === 'uz' ? 'oy' : 'mo'} · {MAHALLAS.find((m) => m.id === child.mahalla)?.name}
                  </p>
                </div>
                {child.speechDelayFlag && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {t('clinic.speech.delayFlag')}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink-500">{t('clinic.speech.progress')}</span>
                <Sparkline
                  values={child.progress.map((p) => p.score)}
                  color={child.speechDelayFlag ? '#C24B5C' : '#1F8A82'}
                />
              </div>

              <p className={cn('mt-2 text-xs font-semibold uppercase tracking-wide text-ink-500')}>{t('clinic.speech.assignedExercises')}</p>
              <ul className="mt-1 space-y-0.5">
                {child.assignedExercises.map((ex) => (
                  <li key={ex.uz} className="text-xs text-ink-700">
                    · {ex[lng]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
