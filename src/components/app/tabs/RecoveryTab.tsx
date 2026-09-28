import { useState } from 'react';
import { Clock, Lock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/app/Card';
import { EpdsFlow } from '@/components/app/EpdsFlow';
import { EXERCISES, NUTRITION_ITEMS, SKINCARE_NOTES } from '@/data/recovery';
import type { SupportedLanguage } from '@/i18n';

export function RecoveryTab() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [epdsOpen, setEpdsOpen] = useState(false);
  const [checkupDone, setCheckupDone] = useState(false);
  const [lastEpds, setLastEpds] = useState<{ score: number; date: Date } | null>(null);

  return (
    <div className="space-y-5 px-4 py-5">
      <Card title={t('app.recovery.epdsCardTitle')}>
        <p className="text-sm text-ink-600">{t('app.recovery.epdsCardBody')}</p>
        {lastEpds && (
          <p className="mt-2 text-xs text-ink-500">
            {t('app.recovery.epdsLastScore', { score: lastEpds.score, date: lastEpds.date.toLocaleDateString(lng === 'uz' ? 'uz-Latn' : 'en-GB') })}
          </p>
        )}
        <button
          type="button"
          onClick={() => setEpdsOpen(true)}
          className="mt-4 w-full rounded-2xl bg-lapis-700 py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(21,43,84,0.5)] transition-transform active:scale-[0.98]"
        >
          {t('app.recovery.epdsCta')}
        </button>
      </Card>

      <Card title={t('app.recovery.nutritionTitle')}>
        <p className="mb-3 text-xs text-ink-500">{t('app.recovery.nutritionSubtitle')}</p>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {NUTRITION_ITEMS.map((item) => (
            <li key={item.id} className="rounded-xl bg-linen-100 p-3">
              <p className="text-sm font-semibold text-ink-900">{item.name[lng]}</p>
              <p className="mt-0.5 text-xs text-ink-600">{item.note[lng]}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card
        title={t('app.recovery.exercisesTitle')}
        action={
          <label className="flex items-center gap-1.5 text-[11px] font-medium text-ink-500">
            <input type="checkbox" checked={checkupDone} onChange={(e) => setCheckupDone(e.target.checked)} className="accent-turquoise-600" />
            {lng === 'uz' ? 'Koʻrikdan oʻtdim (demo)' : 'Checkup done (demo)'}
          </label>
        }
      >
        <ul className="space-y-2.5">
          {EXERCISES.map((ex) => {
            const locked = ex.unlocksAfterCheckup && !checkupDone;
            return (
              <li key={ex.id} className={`rounded-xl border p-3 ${locked ? 'border-linen-300 bg-linen-100 opacity-60' : 'border-turquoise-200 bg-turquoise-50'}`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-900">{ex.name[lng]}</p>
                  {locked ? <Lock className="h-4 w-4 text-ink-500" aria-hidden="true" /> : <Clock className="h-4 w-4 text-turquoise-600" aria-hidden="true" />}
                </div>
                {locked ? (
                  <p className="mt-1 text-xs text-ink-500">{t('app.recovery.exerciseLocked')}</p>
                ) : (
                  <p className="mt-1 text-xs text-ink-600">{ex.description[lng]} · {ex.durationMin} min</p>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title={t('app.recovery.skincareTitle')}>
        <ul className="space-y-2.5">
          {SKINCARE_NOTES.map((note) => (
            <li key={note.uz} className="flex items-start gap-2 text-sm text-ink-700">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-apricot-400" aria-hidden="true" />
              {note[lng]}
            </li>
          ))}
        </ul>
      </Card>

      {epdsOpen && (
        <EpdsFlow
          onClose={() => setEpdsOpen(false)}
          onComplete={(score) => {
            setLastEpds({ score, date: new Date() });
          }}
        />
      )}
    </div>
  );
}
