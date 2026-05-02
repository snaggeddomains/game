interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Invert for use on dark/navy backgrounds */
  invert?: boolean;
}

const sizes = {
  sm: { icon: 28, wordmark: 'text-lg' },
  md: { icon: 36, wordmark: 'text-2xl' },
  lg: { icon: 48, wordmark: 'text-4xl' },
};

/**
 * Reproduces the Snagged brand identity:
 * — Circular icon with layered wave tiers and cream "S"
 * — Bold navy wordmark using Anton display font
 */
export default function SnaggedLogo({ className = '', size = 'md', invert = false }: Props) {
  const { icon, wordmark } = sizes[size];
  const textColor = invert ? 'text-brand-cream' : 'text-brand-navy';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Circular wave icon matching the Snagged favicon */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        style={{ borderRadius: '50%' }}
      >
        <circle cx="50" cy="50" r="50" fill="#7EC8D8" />
        {/* Wave tiers top→bottom: light→dark */}
        <path d="M0 35 Q25 20 50 35 Q75 50 100 35 L100 100 L0 100 Z" fill="#3B8FB5" />
        <path d="M0 50 Q25 38 50 50 Q75 62 100 50 L100 100 L0 100 Z" fill="#2E7FA5" />
        <path d="M0 65 Q25 55 50 65 Q75 75 100 65 L100 100 L0 100 Z" fill="#1B4A6B" />
        {/* Cream "S" */}
        <text
          x="50"
          y="67"
          textAnchor="middle"
          fontFamily="Anton, Impact, sans-serif"
          fontSize="52"
          fontWeight="900"
          fill="#EDE8DC"
        >
          S
        </text>
      </svg>

      {/* Wordmark */}
      <span
        className={`font-display uppercase tracking-tight ${wordmark} ${textColor}`}
        style={{ fontFamily: "'Anton', Impact, sans-serif" }}
      >
        Snagged
      </span>
    </div>
  );
}
