import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { MAHALLAS, type ClinicMother } from '@/data/clinic';
import { CRY_REASON_LABELS } from '@/data/monitor';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

export function MotherDrawer({ mother, onClose }: { mother: ClinicMother; onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  const epdsData = mother.epdsHistory.map((e) => ({ date: formatDate(new Date(e.date), lng, { day: 'numeric', month: 'short' }), score: e.score }));

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-ink-900/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-soft-lapis">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-xl font-bold text-ink-900">{mother.fullName}</p>
            <p className="text-xs text-ink-500">
              {mother.patientCode} · {MAHALLAS.find((m) => m.id === mother.mahalla)?.name}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('clinic.drawer.close')} className="rounded-full p-1.5 hover:bg-linen-100">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {mother.riskFlags.map((flag) => (
            <span key={flag} className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
              {t(`clinic.mothers.flagValues.${flag}`)}
            </span>
          ))}
        </div>

        {mother.epdsHistory.length > 0 && (
          <section className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('clinic.drawer.epdsHistory')}</p>
            <div className="mt-2 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={epdsData} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#8A8398" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 30]} stroke="#8A8398" fontSize={10} tickLine={false} axisLine={false} width={28} />
                  <Line type="monotone" dataKey="score" stroke="#C24B5C" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('clinic.drawer.monitorSummary')}</p>
          {mother.monitorSummary ? (
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Stat label={t('clinic.drawer.avgSleep')} value={`${mother.monitorSummary.avgSleepHrs}h`} />
              <Stat label={t('clinic.drawer.criesPerDay')} value={String(mother.monitorSummary.criesPerDay)} />
              <Stat label={t('clinic.drawer.topReason')} value={CRY_REASON_LABELS[mother.monitorSummary.topReason][lng]} />
            </div>
          ) : (
            <p className="mt-2 text-sm text-ink-500">{t('clinic.drawer.noMonitor')}</p>
          )}
        </section>

        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('clinic.drawer.visitHistory')}</p>
          <ul className="mt-2 space-y-2">
            {mother.visitHistory.map((v, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-ink-700">{v.type[lng]}</span>
                <span className="text-ink-500">{formatDate(new Date(v.date), lng, { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t('clinic.drawer.notes')}</p>
          <ul className={cn('mt-2 space-y-2')}>
            {mother.notes.map((note) => (
              <li key={note.uz} className="rounded-lg bg-linen-100 p-2.5 text-sm text-ink-700">
                {note[lng]}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-linen-100 p-2.5 text-center">
      <p className="font-display text-base font-bold text-lapis-800">{value}</p>
      <p className="text-[10px] text-ink-500">{label}</p>
    </div>
  );
}
