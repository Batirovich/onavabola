import { FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

/**
 * Docked in the sticky header (not a floating fixed overlay) — a floating
 * badge inevitably drifts over interactive content somewhere on a tall
 * page (confirmed during the responsive pass: it sat on top of the phone
 * app's tab bar on mobile). The header is already sticky, so this stays
 * "persistent" without the collision risk.
 */
export function DemoBadge({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-elevated) px-3 py-1.5 text-xs font-medium text-(--fg-muted)',
        className,
      )}
    >
      <FlaskConical className="h-3.5 w-3.5 shrink-0 text-apricot-500" aria-hidden="true" />
      {t('common.demoBadge')}
    </span>
  );
}
