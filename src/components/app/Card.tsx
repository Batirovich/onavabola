import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className={cn('rounded-[1.75rem] border border-linen-300 bg-white p-5 shadow-[0_1px_2px_rgba(18,23,42,0.04),0_8px_20px_-12px_rgba(18,23,42,0.12)]', className)}>
      {(title || action) && (
        <div className="mb-3.5 flex items-center justify-between gap-2">
          {title && <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
