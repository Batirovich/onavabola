import { useState } from 'react';
import { Check, HeartHandshake, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  EPDS_CALM_MESSAGE,
  EPDS_MAX_SCORE,
  EPDS_QUESTIONS,
  EPDS_REASSURANCE_LOW,
  scoreEpds,
  type EpdsResult,
} from '@/data/recovery';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function EpdsFlow({ onClose, onComplete }: { onClose: () => void; onComplete: (score: number) => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [step, setStep] = useState(0); // 0 = intro, 1..10 = questions, 11 = result
  const [answers, setAnswers] = useState<Record<number, 0 | 1 | 2 | 3>>({});
  const [result, setResult] = useState<EpdsResult | null>(null);
  const [notified, setNotified] = useState(false);

  const question = EPDS_QUESTIONS[step - 1];
  const isQuestion = step >= 1 && step <= EPDS_QUESTIONS.length;
  const isResult = step === EPDS_QUESTIONS.length + 1;

  function selectAnswer(score: 0 | 1 | 2 | 3) {
    const next = { ...answers, [question.id]: score };
    setAnswers(next);
    if (step === EPDS_QUESTIONS.length) {
      const r = scoreEpds(next);
      setResult(r);
      onComplete(r.score);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-linen-50">
      <div className="flex items-center justify-between border-b border-linen-300 px-4 py-3">
        <p className="font-display text-base font-bold text-ink-900">{t('app.epds.title')}</p>
        <button type="button" onClick={onClose} aria-label={t('app.epds.close')} className="rounded-full p-1.5 hover:bg-linen-200">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {step === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <HeartHandshake className="h-10 w-10 text-turquoise-500" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-ink-700">{t('app.epds.intro')}</p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-6 rounded-full bg-lapis-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
            >
              {t('app.epds.start')}
            </button>
          </div>
        )}

        {isQuestion && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              {t('app.epds.questionOf', { current: step, total: EPDS_QUESTIONS.length })}
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-linen-200">
              <div className="h-1.5 rounded-full bg-turquoise-500 transition-all" style={{ width: `${(step / EPDS_QUESTIONS.length) * 100}%` }} />
            </div>
            <p className="mt-4 font-display text-lg font-bold text-ink-900">{question.text[lng]}</p>
            <div className="mt-4 space-y-2">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectAnswer(opt.score)}
                  className={cn(
                    'w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                    answers[question.id] === opt.score
                      ? 'border-lapis-600 bg-lapis-50 text-lapis-800'
                      : 'border-linen-300 bg-white text-ink-700 hover:border-lapis-300',
                  )}
                >
                  {opt.text[lng]}
                </button>
              ))}
            </div>
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="mt-4 text-sm font-medium text-ink-500 hover:text-ink-700">
                {t('app.epds.back')}
              </button>
            )}
          </div>
        )}

        {isResult && result && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-display text-lg font-bold text-ink-900">{t('app.epds.resultTitle')}</p>
            <p className="mt-2 text-3xl font-bold text-lapis-700">
              {result.score} <span className="text-base font-normal text-ink-500">/ {EPDS_MAX_SCORE}</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-700">
              {result.needsSpecialist ? EPDS_CALM_MESSAGE[lng] : EPDS_REASSURANCE_LOW[lng]}
            </p>

            {result.needsSpecialist && !notified && (
              <button
                type="button"
                onClick={() => setNotified(true)}
                className="mt-5 rounded-full bg-turquoise-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-turquoise-700"
              >
                {t('app.epds.notifyNurse')}
              </button>
            )}
            {notified && (
              <p className="mt-5 flex items-center gap-2 rounded-full bg-turquoise-50 px-4 py-2 text-sm font-medium text-turquoise-700">
                <Check className="h-4 w-4" aria-hidden="true" />
                {t('app.epds.notifySent')}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setResult(null);
                  setNotified(false);
                }}
                className="rounded-full border border-linen-300 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-linen-100"
              >
                {t('app.epds.retake')}
              </button>
              <button type="button" onClick={onClose} className="rounded-full bg-lapis-700 px-4 py-2 text-sm font-semibold text-white hover:bg-lapis-600">
                {t('app.epds.close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
