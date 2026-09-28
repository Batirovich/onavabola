const PALETTE = ['#152B54', '#1F8A82', '#E2924C', '#4F6AA0', '#359E91', '#D97E34'];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Deterministic geometric avatar generated from a pseudonym seed — no external images. */
export function GeometricAvatar({ seed, size = 40, className }: { seed: string; size?: number; className?: string }) {
  const h = hash(seed);
  const bg = PALETTE[h % PALETTE.length];
  const fg = PALETTE[(h >> 3) % PALETTE.length];
  const rotation = (h % 4) * 90;
  const shape = h % 3;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} role="img" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill={bg} />
      <g transform={`rotate(${rotation} 20 20)`} fill={fg} opacity="0.9">
        {shape === 0 && <rect x="12" y="12" width="16" height="16" rx="4" />}
        {shape === 1 && <circle cx="20" cy="20" r="9" />}
        {shape === 2 && <polygon points="20,9 31,29 9,29" />}
      </g>
      <circle cx={10 + (h % 14)} cy={30 - (h % 10)} r="2.4" fill={fg} opacity="0.6" />
    </svg>
  );
}
