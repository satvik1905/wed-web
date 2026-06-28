'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eyebrow, Display, EventName, GOLD } from './Typography';
import { useLang } from './LanguageContext';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function Diamond({ size = 8, filled = false }: { size?: number; filled?: boolean }) {
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x={half}
        y="0"
        width={half * 0.92}
        height={half * 0.92}
        rx="1"
        transform={`rotate(45 ${half} ${half})`}
        fill={filled ? GOLD : 'transparent'}
        stroke={GOLD}
        strokeWidth={filled ? 0 : 1.2}
      />
    </svg>
  );
}

function TimelineEvent({ time, name }: { time?: string; name: string }) {
  return (
    <motion.div className="flex items-start gap-4" variants={fadeUp}>
      <div className="pt-[3px]">
        <Diamond size={8} />
      </div>
      <div className="flex flex-col gap-0.5">
        {time && <Eyebrow variant="label">{time}</Eyebrow>}
        <EventName>{name}</EventName>
      </div>
    </motion.div>
  );
}

function DayStation({ date }: { date: string }) {
  return (
    <motion.div className="flex items-start gap-4" variants={fadeUp}>
      <div className="pt-[6px]">
        <Diamond size={12} filled />
      </div>
      <Display as="h3" style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)' }}>
        {date}
      </Display>
    </motion.div>
  );
}

export default function ItinerarySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="w-full flex flex-col items-center px-6 py-20 md:py-28"
      style={{ background: '#1A0E0E' }}
    >
      <motion.div
        className="flex flex-col items-center gap-3 mb-12"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
          <path
            d="M12 2C8 2 4 0 1 0C1 4 4 7 8 7C4 7 1 10 1 14C4 14 8 12 12 12C16 12 20 14 23 14C23 10 20 7 16 7C20 7 23 4 23 0C20 0 16 2 12 2Z"
            fill={GOLD}
            opacity="0.5"
          />
        </svg>
        <Eyebrow>{t.itinerary.heading}</Eyebrow>
      </motion.div>

      <motion.div
        className="relative w-full"
        style={{ maxWidth: 520 }}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div
          className="absolute"
          style={{
            left: 3.5,
            top: 10,
            bottom: 10,
            width: 1.5,
            background: `linear-gradient(to bottom, ${GOLD}, ${GOLD})`,
            opacity: 0.35,
          }}
          aria-hidden
        />

        <div className="flex flex-col gap-5">
          <DayStation date={t.itinerary.day1} />
          <div className="flex flex-col gap-5">
            <TimelineEvent time={t.itinerary.morning} name={t.itinerary.haldi} />
            <TimelineEvent time={t.itinerary.afternoon} name={t.itinerary.mayra} />
            <TimelineEvent time={t.itinerary.evening} name={t.itinerary.sangeet} />
          </div>
        </div>

        <div className="h-10 md:h-12" aria-hidden />

        <div className="flex flex-col gap-5">
          <DayStation date={t.itinerary.day2} />
          <div className="flex flex-col gap-5">
            <TimelineEvent name={t.itinerary.wedding} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
