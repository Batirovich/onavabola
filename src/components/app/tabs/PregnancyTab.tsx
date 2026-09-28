import { useState } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/app/Card';
import { NILUFAR, NILUFAR_PREGNANCY } from '@/data/profiles';
import { PREGNANCY_TESTS, PREGNANCY_WEEKS, WARNING_SIGNS } from '@/data/pregnancy';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';

export function PregnancyTab() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [week, setWeek] = useState(NILUFAR_PREGNANCY.currentWeek);

  const current = PREGNANCY_WEEKS[week - 1];
  const upcomingTests = PREGNANCY_TESTS.filter((test) => test.weekTo >= week).slice(0, 3);

  return (
    <div className="space-y-5 px-4 py-5">
      <div className="rounded-2xl border border-apricot-200 bg-apricot-50 p-3.5 text-xs leading-relaxed text-apricot-800">
        {t('app.pregnancy.demoNotice')}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-bold text-lapis-800">{t('app.pregnancy.weekLabel', { week })}</p>
            <p className="text-sm text-ink-500">{t('app.pregnancy.trimester', { trimester: current.trimester })} · {NILUFAR.name}</p>
          </div>
          <div className="text-4xl">{current.size.emoji}</div>
        </div>

        <input
          type="range"
          min={1}
          max={40}
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          className="mt-4 w-full accent-lapis-700"
          aria-label={t('app.pregnancy.weekLabel', { week })}
        />

        <p className="mt-3 text-sm text-ink-700">
          {t('app.pregnancy.sizeCompareTitle')}{' '}
          <strong>{lng === 'uz' ? current.size.itemUz : current.size.itemEn}</strong>.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-linen-100 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('app.pregnancy.babyNoteTitle')}</p>
            <p className="mt-1 text-sm text-ink-700">{current.babyNote[lng]}</p>
          </div>
          <div className="rounded-xl bg-linen-100 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('app.pregnancy.motherNoteTitle')}</p>
            <p className="mt-1 text-sm text-ink-700">{current.motherNote[lng]}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink-500">
          {t('app.pregnancy.dueDate')}: {formatDate(new Date(NILUFAR_PREGNANCY.dueDate), lng)}
        </p>
      </Card>

      <Card title={t('app.pregnancy.upcomingTestsTitle')}>
        <ul className="space-y-2.5">
          {upcomingTests.map((test) => (
            <li key={test.name.uz} className="text-sm">
              <p className="font-semibold text-ink-900">
                {test.name[lng]} <span className="font-normal text-ink-500">· {test.weekFrom}–{test.weekTo}w</span>
              </p>
              <p className="text-ink-500">{test.note[lng]}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('app.pregnancy.warningSignsTitle')}>
        <p className="mb-3 text-sm text-ink-600">{t('app.pregnancy.warningSignsBody')}</p>
        <ul className="space-y-2">
          {WARNING_SIGNS.map((sign) => (
            <li key={sign.uz} className="flex items-start gap-2 text-sm text-rose-600">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {sign[lng]}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(194,75,92,0.5)] transition-transform active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {t('app.pregnancy.callDoctor')}
        </button>
      </Card>
    </div>
  );
}
