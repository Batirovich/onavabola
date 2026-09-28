import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Original SVG geometric pattern inspired by Samarkand majolica tilework —
 * an 8-point star built from two overlapping squares, tiled on a grid.
 * Used sparingly: hero backgrounds, dividers, device faceplates.
 */
export function TileMotif({
  className,
  color = 'currentColor',
  opacity = 0.08,
  size = 64,
}: {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}) {
  const id = useId().replace(/[:]/g, '');
  return (
    <svg className={cn('pointer-events-none', className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`tile-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
            <rect
              x={size * 0.22}
              y={size * 0.22}
              width={size * 0.56}
              height={size * 0.56}
              transform={`rotate(45 ${size / 2} ${size / 2})`}
            />
            <rect x={size * 0.3} y={size * 0.3} width={size * 0.4} height={size * 0.4} />
            <circle cx={size / 2} cy={size / 2} r={size * 0.06} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#tile-${id})`} />
    </svg>
  );
}
