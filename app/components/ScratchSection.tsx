'use client';

import { useCallback, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import ScratchCoin from './ScratchCoin';
import { Eyebrow, Display } from './Typography';
import { useLang } from './LanguageContext';

export default function ScratchSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const allRevealedRef = useRef(false);
  const { t } = useLang();

  const handleReveal = useCallback(() => {
    setRevealedCount((c) => {
      const next = c + 1;
      if (next === 3 && !allRevealedRef.current) {
        allRevealedRef.current = true;
        setAllRevealed(true);
        setTimeout(() => {
          const colors = ['#C99A4F', '#E5C589', '#B91C1C', '#8B1A2B', '#F5EBD9'];
          const waves = 18;
          const duration = 2500;
          for (let i = 0; i < waves; i++) {
            setTimeout(() => {
              confetti({
                particleCount: 12,
                spread: 160,
                startVelocity: 8 + Math.random() * 18,
                origin: { x: Math.random(), y: 0 },
                angle: 270,
                gravity: 0.5 + Math.random() * 0.6,
                drift: (Math.random() - 0.5) * 1.2,
                colors,
                scalar: 0.7 + Math.random() * 0.5,
                ticks: 350,
              });
            }, (duration / waves) * i + Math.random() * 80);
          }
        }, 250);
      }
      return next;
    });
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center justify-center px-6 pt-12 pb-24 md:pt-16 md:pb-32"
      style={{ background: '#1A0E0E', color: '#F5EBD9' }}
    >
      <Display color="ivory" className="mb-3">{t.scratch.heading}</Display>

      <Eyebrow as="p" className="mb-14 md:mb-16">{t.scratch.instruction}</Eyebrow>

      <div className="flex items-center justify-center gap-5 md:gap-8">
        <ScratchCoin revealText={t.scratch.coinDay} onReveal={handleReveal} size={96} ariaLabel={t.scratch.ariaDay} />
        <ScratchCoin revealText={t.scratch.coinMonth} onReveal={handleReveal} size={96} ariaLabel={t.scratch.ariaMonth} />
        <ScratchCoin revealText={t.scratch.coinYear} onReveal={handleReveal} size={96} ariaLabel={t.scratch.ariaYear} />
      </div>

      <Display
        as="p"
        className="mt-10 text-center"
        style={{
          opacity: allRevealed ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out 0.4s',
        }}
      >
        {t.scratch.celebration}
      </Display>
    </section>
  );
}
