export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Ona va Bola"
    >
      <rect width="40" height="40" rx="12" fill="var(--color-lapis-700)" />
      <path
        d="M20 9c6.08 0 11 4.92 11 11s-4.92 11-11 11"
        fill="none"
        stroke="var(--color-turquoise-300)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="27" cy="27" r="3.6" fill="var(--color-apricot-400)" />
    </svg>
  );
}
