import { FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DemoBadge() {
  const { t } = useTranslation();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 sm:bottom-4 sm:justify-end sm:pr-4">
      <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-elevated)/90 px-3 py-1.5 text-xs font-medium text-(--fg-muted) shadow-soft-lapis backdrop-blur">
        <FlaskConical className="h-3.5 w-3.5 text-apricot-500" aria-hidden="true" />
        {t('common.demoBadge')}
      </span>
    </div>
  );
}
