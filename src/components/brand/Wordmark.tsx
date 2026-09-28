import { useTranslation } from 'react-i18next';
import { Mark } from '@/components/brand/Mark';
import { cn } from '@/lib/utils';

export function Wordmark({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Mark className="h-8 w-8 shrink-0" />
      <span className="font-display text-lg font-bold tracking-tight text-(--fg)">{t('common.siteName')}</span>
    </span>
  );
}
