import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8', className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      <h2 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-(--fg-muted)">{subtitle}</p>}
    </div>
  );
}
