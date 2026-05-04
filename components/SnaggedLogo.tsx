interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { icon: 28, wordmark: 'text-lg' },
  md: { icon: 36, wordmark: 'text-2xl' },
  lg: { icon: 48, wordmark: 'text-4xl' },
};

export default function SnaggedLogo({ className = '', size = 'md' }: Props) {
  const { icon, wordmark } = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/snagged-logo.png"
        alt="Snagged"
        width={icon}
        height={icon}
        style={{ borderRadius: '50%' }}
      />
      <span
        className={`font-display uppercase tracking-tight text-brand-navy ${wordmark}`}
        style={{ fontFamily: "'Anton', Impact, sans-serif" }}
      >
        Snagged
      </span>
    </div>
  );
}
