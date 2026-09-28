import { useId } from 'react';
import { cn } from '@/lib/utils';

export type DeviceState = 'idle' | 'listening' | 'crying';

const RING_COLOR: Record<DeviceState, string> = {
  idle: '#62BBB0',
  listening: '#62BBB0',
  crying: '#E2924C',
};

/**
 * Original SVG product render of the bedside monitor. A rounded "pebble"
 * body with a matte-to-highlight material gradient, a fabric-style
 * dot-matrix speaker grille, a glowing light ring (with soft bloom), a
 * small tile-motif brand stamp under the grille, and a trailing power
 * cable for a grounded, physical feel. Reused on /monitor and the
 * landing page hero.
 */
export function DeviceIllustration({ state = 'idle', className }: { state?: DeviceState; className?: string }) {
  const id = useId().replace(/[:]/g, '');
  const ring = RING_COLOR[state];
  const pulsing = state !== 'idle';

  return (
    <svg viewBox="0 0 320 300" className={cn('overflow-visible', className)} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={`body-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A4A82" />
          <stop offset="45%" stopColor="#193A6B" />
          <stop offset="100%" stopColor="#0B1730" />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3D5C99" />
          <stop offset="100%" stopColor="#2A4A82" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ring} stopOpacity="0.55" />
          <stop offset="55%" stopColor={ring} stopOpacity="0.16" />
          <stop offset="100%" stopColor={ring} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`specular-${id}`} cx="30%" cy="22%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`shadow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <pattern id={`grille-${id}`} width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <circle cx="2.6" cy="2.6" r="1.15" fill="#050B1C" opacity="0.55" />
          <circle cx="8.1" cy="7.6" r="1.15" fill="#050B1C" opacity="0.55" />
        </pattern>
        <clipPath id={`bodyClip-${id}`}>
          <rect x="70" y="30" width="180" height="176" rx="58" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="160" cy="262" rx="92" ry="16" fill={`url(#shadow-${id})`} />

      {/* trailing power cable, for a grounded product-shot feel */}
      <path
        d="M 224 244 C 250 250, 268 262, 258 280"
        fill="none"
        stroke="#0B1730"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="258" cy="280" r="4.5" fill="#152B54" />

      {/* base */}
      <ellipse cx="160" cy="240" rx="70" ry="13" fill="#0B1730" />
      <rect x="120" y="206" width="80" height="30" rx="13" fill="#0F1F3D" />

      {/* outer glow behind the ring, only when active */}
      {pulsing && <circle cx="160" cy="96" r="72" fill={`url(#glow-${id})`} />}
      {pulsing && (
        <circle
          cx="160"
          cy="96"
          r="50"
          fill="none"
          stroke={ring}
          strokeWidth="2.5"
          className="animate-pulse-ring"
          style={{ transformOrigin: '160px 96px' }}
        />
      )}

      {/* body */}
      <rect x="70" y="30" width="180" height="176" rx="58" fill={`url(#body-${id})`} />
      <rect x="70" y="30" width="180" height="176" rx="58" fill="none" stroke="#354d7d" strokeWidth="1" opacity="0.6" />

      <g clipPath={`url(#bodyClip-${id})`}>
        {/* top-cap sheen band */}
        <rect x="70" y="30" width="180" height="70" fill={`url(#cap-${id})`} />
        {/* specular highlight */}
        <ellipse cx="120" cy="70" rx="70" ry="60" fill={`url(#specular-${id})`} />
        {/* seam line between cap and body */}
        <line x1="70" y1="100" x2="250" y2="100" stroke="#0B1730" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* speaker grille */}
      <circle cx="160" cy="102" r="42" fill={`url(#grille-${id})`} />
      <circle cx="160" cy="102" r="42" fill="none" stroke="#0B1730" strokeWidth="2" opacity="0.4" />

      {/* light ring */}
      <circle cx="160" cy="96" r="32" fill="none" stroke={ring} strokeWidth="3.5" opacity={state === 'idle' ? 0.55 : 1} />
      <circle cx="160" cy="96" r="32" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
      <circle cx="160" cy="96" r="7" fill={ring} />
      <circle cx="160" cy="96" r="7" fill="#ffffff" opacity="0.18" />

      {/* small tile-motif brand stamp under the grille */}
      <g transform="translate(160 158)" opacity="0.85">
        <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#62BBB0" strokeWidth="1.3" transform="rotate(45)" />
        <circle r="1.6" fill="#E2924C" />
      </g>

      {/* status LED */}
      <circle cx="222" cy="54" r="4.5" fill="#62BBB0" />
      <circle cx="222" cy="54" r="4.5" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.4" />
    </svg>
  );
}
