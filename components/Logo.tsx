export default function Logo({ className = "w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      <path
        d="M8 40 C 22 20, 50 12, 78 16 C 96 18, 108 26, 114 34 L 108 40 C 92 34, 70 30, 52 34 C 34 38, 20 44, 12 46 Z"
        fill="#E11D2E"
      />
      <circle cx="34" cy="46" r="6" fill="#0a0a0a" stroke="#E11D2E" strokeWidth="2" />
      <circle cx="86" cy="46" r="6" fill="#0a0a0a" stroke="#E11D2E" strokeWidth="2" />
    </svg>
  );
}
