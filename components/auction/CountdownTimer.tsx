'use client';

import { useEffect, useState } from 'react';

interface Props {
  endTime: string | null;
  status: string;
  softCloseMinutes: number;
  onExpired?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(endTime: string): TimeLeft {
  const total = Math.max(0, new Date(endTime).getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}

export default function CountdownTimer({ endTime, status, softCloseMinutes, onExpired }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!endTime) return;
    const tick = () => {
      const tl = getTimeLeft(endTime);
      setTimeLeft(tl);
      if (tl.total === 0) onExpired?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime, onExpired]);

  if (status === 'preview') {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal mb-1">Auction Opens Soon</p>
        <p className="text-brand-navy/60 text-sm">Register now to be ready to bid</p>
      </div>
    );
  }

  if (status === 'closed' || status === 'cancelled') {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-navy/50 mb-1">
          Auction {status === 'closed' ? 'Ended' : 'Cancelled'}
        </p>
      </div>
    );
  }

  if (!timeLeft || !endTime) {
    return <div className="h-16 animate-pulse bg-brand-navy/5 rounded-xl" />;
  }

  const isClosingSoon = timeLeft.total > 0 && timeLeft.total < softCloseMinutes * 60 * 1000;
  const isExpired = timeLeft.total === 0;

  return (
    <div className="text-center">
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
        isClosingSoon ? 'text-brand-coral animate-pulse' : 'text-brand-navy/50'
      }`}>
        {isExpired ? 'Auction Ended' : isClosingSoon ? 'Closing Soon' : 'Auction Ends In'}
      </p>
      {!isExpired && (
        <div className="flex items-end justify-center gap-3">
          {timeLeft.days > 0 && (
            <TimeUnit value={timeLeft.days} label="Days" urgent={isClosingSoon} />
          )}
          <TimeUnit value={timeLeft.hours} label="Hrs" urgent={isClosingSoon} />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="Min" urgent={isClosingSoon} />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="Sec" urgent={isClosingSoon && timeLeft.total < 60000} />
        </div>
      )}
      {isClosingSoon && !isExpired && (
        <p className="mt-2 text-xs text-brand-coral font-medium">
          Bid extends timer by {softCloseMinutes}m
        </p>
      )}
    </div>
  );
}

function TimeUnit({ value, label, urgent }: { value: number; label: string; urgent: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`font-display text-4xl md:text-5xl leading-none tabular-nums ${
        urgent ? 'text-brand-coral' : 'text-brand-navy'
      }`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-brand-navy/40 mt-1 tracking-wider uppercase font-medium">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <span className="font-display text-3xl text-brand-navy/20 leading-none pb-5">:</span>
  );
}
