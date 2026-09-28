import type { SVGProps } from 'react';

/**
 * A small bespoke icon set, original to this brand — not a generic icon
 * library. Consistent 24x24 grid, rounded caps/joins, a slightly bolder
 * stroke than typical UI icon defaults, and a small filled accent dot on
 * most glyphs (echoing the wordmark and device illustration's accent
 * dot) so the set reads as designed rather than imported off the shelf.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PregnancyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 3.5c-2.8 1-4.5 3.6-4.5 7.2 0 4.6 3.4 8.3 7.5 8.3s7.5-3.7 7.5-8.3c0-1.6-.4-3-1.1-4.1" />
      <path d="M12 9c1 1.2 1 2.8 0 4-1-1.2-1-2.8 0-4Z" fill="currentColor" stroke="none" opacity={0.9} />
      <circle cx="14.5" cy="4.5" r="1.4" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function RecoveryIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20V11" />
      <path d="M12 12c0-4 2.5-6.5 6.5-7-0.5 4-3 6.5-6.5 7Z" />
      <path d="M12 15c0-3-2-5-5.5-5.5.4 3.1 2.3 5.1 5.5 5.5Z" />
      <circle cx="12" cy="20.5" r="1.1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function MonitorPillarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 4.2A7 7 0 1 0 19.8 15a8 8 0 0 1-5.3-10.8Z" />
      <path d="M18.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function SpeechIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 12.5Z" />
      <circle cx="8.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function CommunityIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="9" r="3.4" />
      <circle cx="15.5" cy="11" r="2.6" />
      <path d="M4 19c.6-2.8 2.4-4.3 5-4.3s4.4 1.5 5 4.3" />
      <path d="M14 19c.4-2 1.6-3.1 3.5-3.1s3 1 3.5 2.8" />
    </Base>
  );
}

export function HomeTabIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 11.5 12 4l7.5 7.5" />
      <path d="M6 10v8.5A1.5 1.5 0 0 0 7.5 20H10v-4.5a2 2 0 0 1 4 0V20h2.5a1.5 1.5 0 0 0 1.5-1.5V10" />
      <circle cx="12" cy="4" r="0" />
    </Base>
  );
}

export function BabyTabIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="7" r="3.2" />
      <path d="M12 3.8V2.5" />
      <circle cx="12" cy="2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M6.5 20c.3-4 2.4-6.2 5.5-6.2s5.2 2.2 5.5 6.2" />
    </Base>
  );
}

export function ProfileTabIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.3" r="3.6" />
      <path d="M4.8 20c.7-3.9 3.1-6 7.2-6s6.5 2.1 7.2 6" />
    </Base>
  );
}

export function CryIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3c2.8 3.6 4.5 6.6 4.5 9a4.5 4.5 0 1 1-9 0c0-2.4 1.7-5.4 4.5-9Z" />
      <path d="M4 15.5c.6-.6.6-1.4 0-2M20 15.5c-.6-.6-.6-1.4 0-2" opacity={0.8} />
    </Base>
  );
}

export function WakingIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
    </Base>
  );
}

export function FeedingIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 3.5h5l-.6 3.2c1.7.7 2.6 2 2.6 4.3v7a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-7c0-2.3.9-3.6 2.6-4.3Z" />
      <path d="M9.3 12.5h5.4" />
      <path d="M9.8 6.7h4.4" />
    </Base>
  );
}

export function FastForwardIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6.5v11l7-5.5Z" />
      <path d="M12.5 6.5v11l7-5.5Z" />
    </Base>
  );
}
