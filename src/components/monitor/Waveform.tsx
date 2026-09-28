import { cn } from '@/lib/utils';

const BAR_COUNT = 24;

export function Waveform({ active, color = '#62BBB0' }: { active: boolean; color?: string }) {
  return (
    <div className="flex h-16 items-center gap-[3px]" role="presentation" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const base = 20 + Math.abs(((i * 37) % 100) - 50);
        return (
          <span
            key={i}
            className={cn('w-1 rounded-full', active ? 'animate-wave' : '')}
            style={{
              height: active ? '100%' : `${Math.max(12, base * 0.3)}%`,
              backgroundColor: color,
              opacity: active ? 0.9 : 0.35,
              animationDelay: `${(i % 8) * 90}ms`,
              transformOrigin: 'center',
            }}
          />
        );
      })}
    </div>
  );
}
