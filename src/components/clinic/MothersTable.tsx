import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CLINIC_MOTHERS, MAHALLAS, type ClinicMother, type MotherStatus, type RiskFlag } from '@/data/clinic';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

const STATUS_COLOR: Record<MotherStatus, string> = {
  pregnant: 'bg-lapis-50 text-lapis-700',
  postpartum: 'bg-apricot-50 text-apricot-700',
  raisingChild: 'bg-turquoise-50 text-turquoise-700',
};

const FLAG_COLOR: Record<RiskFlag, string> = {
  epds: 'bg-rose-50 text-rose-600',
  missedVisit: 'bg-apricot-50 text-apricot-700',
  speechDelay: 'bg-lapis-50 text-lapis-700',
};

export function MothersTable({ onSelect }: { onSelect: (mother: ClinicMother) => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [mahalla, setMahalla] = useState<string>('all');
  const [status, setStatus] = useState<MotherStatus | 'all'>('all');

  const filtered = useMemo(
    () =>
      CLINIC_MOTHERS.filter((m) => (mahalla === 'all' || m.mahalla === mahalla) && (status === 'all' || m.status === status)),
    [mahalla, status],
  );

  return (
    <div className="rounded-2xl border border-linen-300 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-linen-200 p-4">
        <select
          value={mahalla}
          onChange={(e) => setMahalla(e.target.value)}
          className="rounded-lg border border-linen-300 px-3 py-1.5 text-sm"
        >
          <option value="all">{t('clinic.mothers.allMahallas')}</option>
          {MAHALLAS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as MotherStatus | 'all')}
          className="rounded-lg border border-linen-300 px-3 py-1.5 text-sm"
        >
          <option value="all">{t('clinic.mothers.allStatuses')}</option>
          <option value="pregnant">{t('clinic.mothers.statusValues.pregnant')}</option>
          <option value="postpartum">{t('clinic.mothers.statusValues.postpartum')}</option>
          <option value="raisingChild">{t('clinic.mothers.statusValues.raisingChild')}</option>
        </select>
        <span className="ml-auto text-xs text-ink-500">{filtered.length}</span>
      </div>

      <div className="max-h-[560px] overflow-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="sticky top-0 bg-white text-xs text-ink-500">
            <tr className="border-b border-linen-200">
              <th className="px-4 py-2.5 font-medium">{t('clinic.mothers.code')}</th>
              <th className="px-4 py-2.5 font-medium">{t('clinic.mothers.name')}</th>
              <th className="hidden px-4 py-2.5 font-medium sm:table-cell">{t('clinic.mothers.mahalla')}</th>
              <th className="px-4 py-2.5 font-medium">{t('clinic.mothers.status')}</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">{t('clinic.mothers.nextVisit')}</th>
              <th className="px-4 py-2.5 font-medium">{t('clinic.mothers.flags')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((mother) => (
              <tr
                key={mother.id}
                onClick={() => onSelect(mother)}
                className="cursor-pointer border-b border-linen-100 hover:bg-linen-50"
              >
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-ink-500">{mother.patientCode}</td>
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-ink-900">{mother.fullName}</td>
                <td className="hidden whitespace-nowrap px-4 py-2.5 text-ink-600 sm:table-cell">
                  {MAHALLAS.find((m) => m.id === mother.mahalla)?.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', STATUS_COLOR[mother.status])}>
                    {t(`clinic.mothers.statusValues.${mother.status}`)}
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-2.5 text-ink-600 md:table-cell">
                  {mother.nextVisit ? formatDate(new Date(mother.nextVisit), lng, { day: 'numeric', month: 'short' }) : '—'}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-nowrap gap-1">
                    {mother.riskFlags.map((flag) => (
                      <span key={flag} className={cn('whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold', FLAG_COLOR[flag])}>
                        {t(`clinic.mothers.flagValues.${flag}`)}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink-500">
                  {t('clinic.mothers.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
