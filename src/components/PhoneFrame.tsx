import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Realistic phone mockup shown around app screens on desktop; on small
 * viewports the caller should render the screen content full-bleed instead.
 */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative mx-auto w-[300px]', className)}>
      <div className="relative rounded-[2.75rem] border-[10px] border-ink-900 bg-ink-900 shadow-soft-lapis">
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-ink-900" />
        <div className="relative h-[620px] overflow-hidden rounded-[2rem] bg-(--bg-elevated)">
          <div className="scrollbar-none h-full overflow-y-auto">{children}</div>
        </div>
      </div>
      <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-ink-700" />
    </div>
  );
}
