import { Printer, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CRY_REASON_LABELS } from '@/data/monitor';
import { averageTimeToCalm, cryReasonBreakdown, feedsPerDay, sleepPerDay } from '@/data/monitorStats';
import { AZIZ } from '@/data/profiles';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';

export function DoctorReport({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  const sleep = sleepPerDay().slice(-7);
  const feeds = feedsPerDay().slice(-7);
  const avgSleepHrs = Math.round((sleep.reduce((s, d) => s + d.nightMin + d.napMin, 0) / sleep.length / 60) * 10) / 10;
  const avgFeeds = Math.round((feeds.reduce((s, d) => s + d.count, 0) / feeds.length) * 10) / 10;
  const topReason = cryReasonBreakdown().sort((a, b) => b.count - a.count)[0];
  const avgCalm = averageTimeToCalm();
  const rangeFrom = formatDate(sleep[0].date, lng);
  const rangeTo = formatDate(sleep[sleep.length - 1].date, lng);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-night-900/80 p-4 backdrop-blur-sm print:static print:bg-white print:p-0 print:backdrop-blur-none">
      <div className="mx-auto max-w-2xl rounded-3xl bg-linen-50 p-6 text-ink-900 shadow-soft-night print:rounded-none print:shadow-none sm:p-8">
        <div className="flex items-start justify-between no-print">
          <div>
            <h2 className="font-display text-2xl font-bold">{t('monitor.doctorReport.title')}</h2>
            <p className="text-sm text-ink-500">{t('monitor.doctorReport.subtitle', { range: `${rangeFrom} – ${rangeTo}` })}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('monitor.doctorReport.close')} className="rounded-full p-2 hover:bg-linen-200">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden print:block">
          <h2 className="font-display text-2xl font-bold">{t('monitor.doctorReport.title')} — {AZIZ.name}</h2>
          <p className="text-sm text-ink-500">{t('monitor.doctorReport.subtitle', { range: `${rangeFrom} – ${rangeTo}` })}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label={t('monitor.stats.sleep')} value={`${avgSleepHrs}h`} />
          <Stat label={t('monitor.stats.feeds')} value={String(avgFeeds)} />
          <Stat label={t('monitor.stats.avgCalm')} value={`${avgCalm} ${t('monitor.stats.minutes')}`} />
          <Stat label={t('monitor.stats.cryReasons')} value={topReason ? CRY_REASON_LABELS[topReason.reason][lng] : '—'} />
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('monitor.doctorReport.summaryTitle')}</p>
          <table className="mt-2 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-linen-300 text-ink-500">
                <th className="py-1.5 font-medium">{t('monitor.doctorReport.dateColumn')}</th>
                <th className="py-1.5 font-medium">{t('monitor.stats.sleep')}</th>
                <th className="py-1.5 font-medium">{t('monitor.stats.feeds')}</th>
              </tr>
            </thead>
            <tbody>
              {sleep.map((s, i) => (
                <tr key={i} className="border-b border-linen-200">
                  <td className="py-1.5">{formatDate(s.date, lng, { day: 'numeric', month: 'short' })}</td>
                  <td className="py-1.5">{Math.round(((s.nightMin + s.napMin) / 60) * 10) / 10}h</td>
                  <td className="py-1.5">{feeds[i]?.count ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-ink-500">{t('monitor.doctorReport.generatedFor')}</p>

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-lapis-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600 no-print"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          {t('monitor.doctorReport.print')}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-linen-300 bg-white p-3">
      <div className="font-display text-lg font-bold text-lapis-800">{value}</div>
      <div className="text-xs text-ink-500">{label}</div>
    </div>
  );
}
