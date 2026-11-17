export function Mark({ size = 32, tile = true }: { size?: number; tile?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {tile && <rect width="64" height="64" rx="18" fill="#141C2B" />}
      <path d="M14 27A18 18 0 0 0 50 27A26 26 0 0 1 14 27Z" fill="#F0A04B" />
      <circle cx="47" cy="17" r="3.2" fill="#EEF0EA" />
    </svg>
  );
}

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="logo">
      <Mark size={size} />
      <span className="wordmark">nineri</span>
    </span>
  );
}
