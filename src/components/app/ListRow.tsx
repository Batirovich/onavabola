import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** iOS-style grouped list: rows separated by hairline dividers inside one rounded container, not individually bordered boxes. */
export function ListGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-linen-200 overflow-hidden rounded-2xl bg-linen-100/70', className)}>{children}</div>;
}

export function ListRow({
  icon,
  iconTone = 'apricot',
  title,
  subtitle,
  trailing,
  chevron,
  onClick,
}: {
  icon?: ReactNode;
  iconTone?: 'apricot' | 'lapis' | 'turquoise' | 'rose';
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  chevron?: boolean;
  onClick?: () => void;
}) {
  const Comp = onClick ? 'button' : 'div';
  const toneClass = {
    apricot: 'bg-apricot-100 text-apricot-700',
    lapis: 'bg-lapis-100 text-lapis-700',
    turquoise: 'bg-turquoise-100 text-turquoise-700',
    rose: 'bg-rose-100 text-rose-600',
  }[iconTone];

  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors',
        onClick && 'hover:bg-linen-200/60 active:bg-linen-200',
      )}
    >
      {icon && <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', toneClass)}>{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink-900">{title}</span>
        {subtitle && <span className="mt-0.5 block text-xs text-ink-500">{subtitle}</span>}
      </span>
      {trailing && <span className="shrink-0 text-sm text-ink-500">{trailing}</span>}
      {chevron && <ChevronRight className="h-4 w-4 shrink-0 text-ink-500/50" aria-hidden="true" />}
    </Comp>
  );
}
