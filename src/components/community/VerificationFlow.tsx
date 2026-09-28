import { useState } from 'react';
import { Check, Fingerprint, ShieldCheck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GeometricAvatar } from '@/components/community/GeometricAvatar';
import { DEMO_VERIFICATION_CODE } from '@/data/community';
import { cn } from '@/lib/utils';

export interface CommunityProfile {
  pseudonym: string;
  avatarSeed: string;
  shareRegion: boolean;
  shareAge: boolean;
}

export function VerificationFlow({ onClose, onComplete }: { onClose: () => void; onComplete: (profile: CommunityProfile) => void }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [pseudonym, setPseudonym] = useState('');
  const [shareRegion, setShareRegion] = useState(true);
  const [shareAge, setShareAge] = useState(true);
  const [done, setDone] = useState(false);

  function submitCode() {
    if (code.trim().toUpperCase() === DEMO_VERIFICATION_CODE) {
      setCodeError(false);
      setStep(2);
    } else {
      setCodeError(true);
    }
  }

  function finish() {
    setDone(true);
    window.setTimeout(() => {
      onComplete({
        pseudonym: pseudonym.trim() || 'Mehribon',
        avatarSeed: pseudonym.trim() || 'Mehribon',
        shareRegion,
        shareAge,
      });
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft-lapis">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <span key={s} className={cn('h-1.5 w-8 rounded-full', s <= step ? 'bg-lapis-700' : 'bg-linen-300')} />
            ))}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-linen-100">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-100 text-turquoise-600">
              <Check className="h-7 w-7" aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-xl font-bold text-ink-900">{t('community.verify.successTitle')}</p>
            <p className="mt-1 text-sm text-ink-600">{t('community.verify.successBody')}</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="mt-5">
                <p className="font-display text-lg font-bold text-ink-900">{t('community.verify.step1Title')}</p>
                <p className="mt-1 text-sm text-ink-600">{t('community.verify.step1Body')}</p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeError(false);
                  }}
                  placeholder={t('community.verify.codePlaceholder')}
                  className="mt-4 w-full rounded-xl border border-linen-300 px-4 py-2.5 text-sm uppercase tracking-wide focus:border-lapis-500 focus:outline-none"
                />
                {codeError && <p className="mt-2 text-sm text-rose-600">{t('community.verify.codeError')}</p>}
                <button
                  type="button"
                  onClick={submitCode}
                  className="mt-4 w-full rounded-full bg-lapis-700 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
                >
                  {t('community.verify.next')}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-5">
                <p className="font-display text-lg font-bold text-ink-900">{t('community.verify.step2Title')}</p>
                <p className="mt-1 text-sm text-ink-600">{t('community.verify.step2Body')}</p>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-linen-300 bg-linen-100 px-4 py-3 opacity-60">
                  <span className="flex items-center gap-2 text-sm font-medium text-ink-700">
                    <Fingerprint className="h-4 w-4" aria-hidden="true" />
                    MyID
                  </span>
                  <span className="text-xs font-semibold text-ink-500">{t('community.verify.comingSoon')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-4 w-full rounded-full bg-lapis-700 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
                >
                  {t('community.verify.next')}
                </button>
                <button type="button" onClick={() => setStep(1)} className="mt-2 w-full text-sm font-medium text-ink-500 hover:text-ink-700">
                  {t('community.verify.back')}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="mt-5">
                <p className="font-display text-lg font-bold text-ink-900">{t('community.verify.step3Title')}</p>
                <p className="mt-1 text-sm text-ink-600">{t('community.verify.step3Body')}</p>
                <div className="mt-4 flex items-center gap-3">
                  <GeometricAvatar seed={pseudonym || 'demo'} size={48} />
                  <input
                    type="text"
                    value={pseudonym}
                    onChange={(e) => setPseudonym(e.target.value)}
                    placeholder={t('community.verify.pseudonymPlaceholder')}
                    className="flex-1 rounded-xl border border-linen-300 px-4 py-2.5 text-sm focus:border-lapis-500 focus:outline-none"
                  />
                </div>
                <label className="mt-4 flex items-center gap-2.5 text-sm text-ink-700">
                  <input type="checkbox" checked={shareRegion} onChange={(e) => setShareRegion(e.target.checked)} className="accent-turquoise-600" />
                  {t('community.verify.shareRegion')}
                </label>
                <label className="mt-2 flex items-center gap-2.5 text-sm text-ink-700">
                  <input type="checkbox" checked={shareAge} onChange={(e) => setShareAge(e.target.checked)} className="accent-turquoise-600" />
                  {t('community.verify.shareAge')}
                </label>
                <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-turquoise-50 p-3 text-xs text-turquoise-800">
                  <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t('community.eligibility')}
                </div>
                <button
                  type="button"
                  onClick={finish}
                  className="mt-4 w-full rounded-full bg-lapis-700 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
                >
                  {t('community.verify.finish')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
