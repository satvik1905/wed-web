'use client';

import { useState } from 'react';
import VelvetIntro from './components/VelvetIntro';
import ScratchSection from './components/ScratchSection';
import CountdownSection from './components/CountdownSection';
import RsvpSection from './components/RsvpSection';
import VenueSection from './components/VenueSection';
import ItinerarySection from './components/ItinerarySection';
import TimelineRailSection from './components/TimelineRailSection';
import FullBleedCardsSection from './components/FullBleedCardsSection';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider, useLang } from './components/LanguageContext';
import { Eyebrow, Display, Body, GOLD } from './components/Typography';
import { motion, useScroll, useTransform } from 'framer-motion';

function GoldDivider({ width = 'w-20' }: { width?: string }) {
  return (
    <div
      className={`h-px ${width} my-5`}
      style={{ background: 'linear-gradient(to right, transparent, rgba(201, 154, 79, 0.7), transparent)' }}
      aria-hidden
    />
  );
}

function ScrollCue() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const { t } = useLang();

  return (
    <motion.div
      style={{ opacity }}
      className="flex flex-col items-center gap-3 pb-8"
    >
      <motion.span
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Eyebrow>{t.scroll}</Eyebrow>
      </motion.span>
      <motion.svg
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 5, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <path d="M7 2 L7 18" />
        <path d="M2 13 L7 18 L12 13" />
      </motion.svg>
    </motion.div>
  );
}

function InvitationBlocks() {
  const { t } = useLang();
  const { blessing, hostLine, name1, name1Parents, conjunction, name2, name2Parents, closing } = t.invitation;

  return (
    <div className="flex flex-col items-center text-center max-w-[42ch]">
      {/* Blessing */}
      <Eyebrow as="p" className="mb-5">{blessing}</Eyebrow>

      {/* Host line */}
      <Body className="text-center">{hostLine}</Body>

      {/* Groom name */}
      <Display as="p" color="ivory" className="mt-2 mb-1">{name1}</Display>

      {/* Groom parents */}
      <p
        className="text-center leading-relaxed"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
          color: 'rgba(237, 230, 214, 1.0)',
          letterSpacing: '0.01em',
        }}
      >
        {name1Parents}
      </p>

      {/* Conjunction */}
      <Display as="p" className="my-1">{conjunction}</Display>

      {/* Bride name */}
      <Display as="p" color="ivory" className="mb-1">{name2}</Display>

      {/* Bride parents */}
      <p
        className="text-center leading-relaxed"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
          color: 'rgba(237, 230, 214, 1.0)',
          letterSpacing: '0.01em',
        }}
      >
        {name2Parents}
      </p>

      {/* Closing (used in Marathi) */}
      {closing && <Body className="text-center mt-3">{closing}</Body>}
    </div>
  );
}

function HomeContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const { t } = useLang();

  return (
    <>
      <VelvetIntro onComplete={() => setIntroComplete(true)}>
        <main
          className="min-h-[100svh] w-full flex flex-col items-center justify-center px-6 pt-8 pb-4"
          style={{ background: '#1A0E0E', color: '#F5EBD9' }}
        >
          {/* Blessing header: Ganesha + Sanskrit invocation */}
          <div className="flex flex-col items-center">
            <img
              src="/Ganesha.svg"
              alt="Lord Ganesha"
              className="block h-auto"
              style={{ width: 'clamp(70px, 22vw, 90px)' }}
            />

            <p
              className="text-center leading-snug mt-5 whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-tiro-devanagari)',
                fontSize: 'clamp(0.85rem, 3.2vw, 1rem)',
                color: '#F5EBD9',
                letterSpacing: '0.04em',
              }}
              lang="sa"
            >
              {t.ganpati}
            </p>

            <GoldDivider width="w-16" />
          </div>

          <InvitationBlocks />

          {/* Fixed-size gap before scroll cue */}
          <div className="h-6 md:h-10" aria-hidden />

          {/* Scroll cue */}
          <ScrollCue />
        </main>
        <ScratchSection />
        <VenueSection />
        <ItinerarySection />
        <TimelineRailSection />
        <FullBleedCardsSection />
        <RsvpSection />
        <CountdownSection />
      </VelvetIntro>
      <LanguageToggle visible={introComplete} />
    </>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
