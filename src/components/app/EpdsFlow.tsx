import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="absolute inset-0 z-20 flex flex-col justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label={t('app.epds.close')}
        className="absolute inset-0 bg-ink-900/35 backdrop-blur-[1px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        className="relative flex h-[94%] flex-col rounded-t-[1.75rem] bg-linen-50 shadow-[0_-8px_30px_-8px_rgba(18,23,42,0.3)]"
      >
        <div className="flex shrink-0 items-center justify-center pb-1 pt-2.5">
          <span className="h-1.5 w-10 rounded-full bg-linen-300" />
        </div>
        <div className="flex shrink-0 items-center justify-between px-5 pb-3">
          <p className="font-display text-lg font-bold text-ink-900">{t('app.epds.title')}</p>
          <button type="button" onClick={onClose} aria-label={t('app.epds.close')} className="rounded-full p-1.5 hover:bg-linen-200">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {step === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-600">
                <HeartHandshake className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">{t('app.epds.intro')}</p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-6 w-full rounded-2xl bg-lapis-700 py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(21,43,84,0.5)] transition-transform active:scale-[0.98]"
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
              <p className="mt-4 font-display text-xl font-bold text-ink-900">{question.text[lng]}</p>
              <div className="mt-4 space-y-2.5">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectAnswer(opt.score)}
                    className={cn(
                      'w-full rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors active:scale-[0.99]',
                      answers[question.id] === opt.score
                        ? 'border-lapis-600 bg-lapis-50 text-lapis-800'
                        : 'border-linen-200 bg-white text-ink-700',
                    )}
                  >
                    {opt.text[lng]}
                  </button>
                ))}
              </div>
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="mt-4 text-sm font-semibold text-ink-500">
                  {t('app.epds.back')}
                </button>
              )}
            </div>
          )}

          {isResult && result && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-lg font-bold text-ink-900">{t('app.epds.resultTitle')}</p>
              <p className="mt-2 text-4xl font-bold text-lapis-700">
                {result.score} <span className="text-base font-normal text-ink-500">/ {EPDS_MAX_SCORE}</span>
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-700">
                {result.needsSpecialist ? EPDS_CALM_MESSAGE[lng] : EPDS_REASSURANCE_LOW[lng]}
              </p>

              {result.needsSpecialist && !notified && (
                <button
                  type="button"
                  onClick={() => setNotified(true)}
                  className="mt-5 w-full rounded-2xl bg-turquoise-600 py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(31,138,130,0.5)] transition-transform active:scale-[0.98]"
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

              <div className="mt-6 flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setAnswers({});
                    setResult(null);
                    setNotified(false);
                  }}
                  className="flex-1 rounded-2xl border-2 border-linen-300 py-3 text-sm font-bold text-ink-700"
                >
                  {t('app.epds.retake')}
                </button>
                <button type="button" onClick={onClose} className="flex-1 rounded-2xl bg-lapis-700 py-3 text-sm font-bold text-white">
                  {t('app.epds.close')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
