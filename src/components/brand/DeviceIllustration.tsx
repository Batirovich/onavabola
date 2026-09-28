import deviceHero from '@/assets/device-hero.webp';
import { cn } from '@/lib/utils';

export type DeviceState = 'idle' | 'listening' | 'crying';

const RING_COLOR: Record<DeviceState, string> = {
  idle: '#62BBB0',
  listening: '#62BBB0',
  crying: '#E2924C',
};

/**
 * The bedside monitor's product illustration. Renders the real device
 * artwork (a cleanly extracted, alpha-matted PNG/WebP) with an animated
 * glow + pulsing ring overlaid at the light ring's actual position in the
 * source art, so the "listening"/"crying" states still animate. Reused
 * on /monitor and the landing page.
 */
export function DeviceIllustration({ state = 'idle', className }: { state?: DeviceState; className?: string }) {
  const ring = RING_COLOR[state];
  const pulsing = state !== 'idle';

  return (
    <div className={cn('relative inline-block', className)}>
      <img
        src={deviceHero}
        alt=""
        aria-hidden="true"
        className="relative z-10 h-full w-auto select-none"
        draggable={false}
      />
      {/* glow + pulse positioned at the light ring's location in the source art (~50% x, ~13% y) */}
      <div
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          left: '50%',
          top: '13%',
          width: '70%',
          aspectRatio: '1 / 1',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${ring}55 0%, ${ring}22 45%, transparent 72%)`,
          opacity: pulsing ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      />
      {pulsing && (
        <div
          className="pointer-events-none absolute z-0 animate-pulse-ring rounded-full border-2"
          style={{
            left: '50%',
            top: '13%',
            width: '40%',
            aspectRatio: '1 / 1',
            transform: 'translate(-50%, -50%)',
            borderColor: ring,
            transformOrigin: 'center',
          }}
        />
      )}
    </div>
  );
}
