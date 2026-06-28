'use client';

import { Fragment, useState } from 'react';
import VelvetIntro from './components/VelvetIntro';
import ScratchSection from './components/ScratchSection';
import CountdownSection from './components/CountdownSection';
import VenueSection from './components/VenueSection';
import ItinerarySection from './components/ItinerarySection';
import LanguageToggle from './components/LanguageToggle';
import { LanguageProvider, useLang } from './components/LanguageContext';
import { Eyebrow, DisplayXL, Display, Body, Lines, GOLD } from './components/Typography';
import { motion, useScroll, useTransform } from 'framer-motion';

function GoldDivider({ width = 'w-20' }: { width?: string }) {
  return (
    <div
      className={`h-px ${width} my-8`}
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
  const { blocks, name1, name2, ampersand } = t.invitation;

  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {i > 0 && <GoldDivider />}
          {(block.type === 'phrase' || block.type === 'honor') && (
            <Body className={`text-center ${block.type === 'phrase' ? 'max-w-[40ch]' : 'max-w-[36ch]'}`}>
              <Lines lines={block.lines} />
            </Body>
          )}
          {block.type === 'names' && (
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <DisplayXL className="text-center">{name1}</DisplayXL>
              <span aria-hidden>
                <Display as="span" className="leading-none">{ampersand}</Display>
              </span>
              <DisplayXL className="text-center">{name2}</DisplayXL>
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
}

function HomeContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const { t } = useLang();

  return (
    <>
      <VelvetIntro onComplete={() => setIntroComplete(true)}>
        <main
          className="min-h-[100svh] w-full flex flex-col items-center px-8 pt-16 pb-8"
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
              className="text-center leading-snug mt-5"
              style={{
                fontFamily: 'var(--font-tiro-devanagari)',
                fontSize: 'clamp(1.05rem, 4vw, 1.35rem)',
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
          <div className="h-12 md:h-16" aria-hidden />

          {/* Scroll cue */}
          <ScrollCue />
        </main>
        <ScratchSection />
        <VenueSection />
        <ItinerarySection />
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
