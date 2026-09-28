import { useId } from 'react';
import { cn } from '@/lib/utils';

export type DeviceState = 'idle' | 'listening' | 'crying';

const RING_COLOR: Record<DeviceState, string> = {
  idle: '#62BBB0',
  listening: '#62BBB0',
  crying: '#E2924C',
};

/**
 * Original SVG product render of the bedside monitor — a soft rounded unit
 * with a light ring that pulses when it hears crying. Reused on /monitor
 * and the landing page hero.
 */
export function DeviceIllustration({ state = 'idle', className }: { state?: DeviceState; className?: string }) {
  const id = useId().replace(/[:]/g, '');
  const ring = RING_COLOR[state];
  const pulsing = state !== 'idle';

  return (
    <svg viewBox="0 0 280 220" className={cn('overflow-visible', className)} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={`body-${id}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1E3660" />
          <stop offset="100%" stopColor="#0F1F3D" />
        </radialGradient>
        <pattern id={`grille-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#0B1528" opacity="0.5" />
        </pattern>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="140" cy="196" rx="86" ry="12" fill="#000" opacity="0.18" />

      {/* pulsing light ring */}
      {pulsing && (
        <circle cx="140" cy="92" r="46" fill="none" stroke={ring} strokeWidth="3" className="animate-pulse-ring" style={{ transformOrigin: '140px 92px' }} />
      )}

      {/* body */}
      <rect x="46" y="34" width="188" height="140" rx="46" fill={`url(#body-${id})`} />
      <rect x="46" y="34" width="188" height="140" rx="46" fill="none" stroke="#2A3358" strokeWidth="1.5" />

      {/* faceplate grille */}
      <circle cx="140" cy="98" r="36" fill={`url(#grille-${id})`} opacity="0.7" />

      {/* light ring (static base) */}
      <circle cx="140" cy="98" r="30" fill="none" stroke={ring} strokeWidth="3" opacity={state === 'idle' ? 0.55 : 0.95} />
      <circle cx="140" cy="98" r="6" fill={ring} />

      {/* status LED */}
      <circle cx="205" cy="56" r="4" fill="#62BBB0" />

      {/* base */}
      <rect x="90" y="174" width="100" height="14" rx="7" fill="#0B1528" />
    </svg>
  );
}
