interface IconProps {
  className?: string;
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.97 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 8.3c0-1.9-1.5-3.4-3.4-3.6C16.1 4.5 12 4.5 12 4.5s-4.1 0-6.6.2C3.5 4.9 2 6.4 2 8.3 1.8 9.9 1.8 12 1.8 12s0 2.1.2 3.7c0 1.9 1.5 3.4 3.4 3.6 2.5.2 6.6.2 6.6.2s4.1 0 6.6-.2c1.9-.2 3.4-1.7 3.4-3.6.2-1.6.2-3.7.2-3.7s0-2.1-.2-3.7ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 2h-3.2v13.4a2.9 2.9 0 1 1-2.4-2.86V9.3a6.1 6.1 0 1 0 5.6 6.08V8.2a7.9 7.9 0 0 0 4.4 1.34V6.3a4.7 4.7 0 0 1-4.4-4.3Z" />
    </svg>
  );
}
