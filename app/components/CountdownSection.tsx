'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Display, Eyebrow, Numeral } from './Typography';
import { useLang } from './LanguageContext';

const WEDDING_DATE = new Date('2026-12-27T12:00:00+05:30').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, WEDDING_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

interface CountBoxProps {
  value: number;
  label: string;
  padValue?: boolean;
}

function CountBox({ value, label, padValue = true }: CountBoxProps) {
  const display = padValue ? String(value).padStart(2, '0') : String(value);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          width: 'clamp(64px, 19vw, 92px)',
          height: 'clamp(64px, 19vw, 92px)',
          border: '1.5px solid rgba(201, 154, 79, 0.65)',
          background: 'rgba(201, 154, 79, 0.06)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={display}
            initial={{ opacity: 0.4, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.4, y: 2 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute"
          >
            <Numeral>{display}</Numeral>
          </motion.span>
        </AnimatePresence>
      </div>
      <Eyebrow variant="label" as="p">{label}</Eyebrow>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const { t } = useLang();

  useEffect(() => {
    setTimeLeft(computeTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tl = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section
      className="w-full flex flex-col items-center justify-center px-6 pt-20 pb-24 md:pt-24 md:pb-32"
      style={{ background: '#1A0E0E', color: '#F5EBD9' }}
    >
      <Display color="ivory" className="mb-2">{t.countdown.heading}</Display>

      <div
        className="h-px w-20 my-8"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201, 154, 79, 0.7), transparent)',
        }}
        aria-hidden
      />

      <div className="flex items-start justify-center gap-3 md:gap-5">
        <CountBox value={tl.days} label={t.countdown.days} padValue={false} />
        <CountBox value={tl.hours} label={t.countdown.hours} />
        <CountBox value={tl.minutes} label={t.countdown.minutes} />
        <CountBox value={tl.seconds} label={t.countdown.seconds} />
      </div>

      <div
        className="h-px w-12 mt-12 mb-5"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201, 154, 79, 0.8), transparent)',
        }}
        aria-hidden
      />
      <Eyebrow as="p" className="text-center">{t.countdown.footer}</Eyebrow>
    </section>
  );
}
