import { useTranslation } from 'react-i18next';
import type { ModerationLogEntry } from '@/data/moderation';
import { MODERATION_CATEGORY_LABELS } from '@/lib/moderation';
import type { SupportedLanguage } from '@/i18n';
import { formatClock } from '@/lib/format';
import { cn } from '@/lib/utils';

const ACTION_COLOR: Record<string, string> = {
  blocked: 'text-rose-600 bg-rose-50',
  held: 'text-apricot-700 bg-apricot-50',
  routedToSpecialist: 'text-turquoise-700 bg-turquoise-50',
  allowed: 'text-ink-600 bg-linen-100',
};

export function ModerationLog({ entries }: { entries: ModerationLogEntry[] }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="rounded-2xl border border-linen-300 bg-white p-4">
      <p className="font-display text-base font-bold text-ink-900">{t('community.moderation.logTitle')}</p>
      <ul className="mt-3 max-h-[70vh] space-y-2.5 overflow-y-auto pr-0.5">
        {entries.map((entry) => (
          <li key={entry.id} className="rounded-xl border border-linen-200 p-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className={cn('rounded-full px-2 py-0.5 font-semibold', ACTION_COLOR[entry.action])}>
                {t(`community.moderation.logAction.${entry.action}`)}
              </span>
              <span className="text-ink-400">{formatClock(new Date(entry.createdAt), lng)}</span>
            </div>
            <p className="mt-1.5 truncate text-ink-600" title={entry.snippet}>
              “{entry.snippet}”
            </p>
            <div className="mt-1 flex items-center justify-between text-ink-500">
              <span>{MODERATION_CATEGORY_LABELS[entry.category][lng]}</span>
              <span>{entry.reviewedByHuman ? t('community.moderation.reviewedByHuman') : t('community.moderation.notReviewed')}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
