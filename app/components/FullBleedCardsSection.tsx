'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Eyebrow, Display, EventName, GOLD } from './Typography';
import { useLang } from './LanguageContext';

/* ═══════════════════════════════════════════════════════════════
   Option B — Full-Bleed Cards (temporary, for comparison)
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  CARD_RADIUS: 16,
  CARD_GAP: 20,
  COLUMN_MAX: 600,
  /** Aspect ratio for cards with an illustration background. */
  ASPECT_RATIO: '3 / 4',
};

const GOLD_BORDER = 'rgba(201, 154, 79, 0.3)';
const CARD_BG_FALLBACK = '#1E1212';

const ILLUSTRATIONS: Record<string, string> = {
  haldi: '/haldi.png',
  mayra: '/mayra.png',
  sangeet: '/sangeet.png',
  wedding: '',
  reception: '',
};

/* ── Placeholder ────────────────────────────────────────────── */

function Placeholder({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'rgba(255, 255, 255, 0.5)',
        borderBottom: '1px dashed rgba(255, 255, 255, 0.4)',
        paddingBottom: 1,
      }}
    >
      {children}
    </span>
  );
}

/* ── Types ──────────────────────────────────────────────────── */

interface CardEvent {
  id: string;
  time: string;
  name: string;
  venueSpot: string;
  illustration: string;
  alt: string;
}

/* ── Day divider ────────────────────────────────────────────── */

function DayDivider({ date }: { date: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div
        className="h-px w-3/4 max-w-xs"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(201, 154, 79, 0.55), transparent)',
        }}
        aria-hidden
      />
      <Display as="h3" style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)' }}>
        {date}
      </Display>
    </div>
  );
}

/* ── Full-bleed event card ──────────────────────────────────── */

function BleedCard({ event }: { event: CardEvent }) {
  const hasImage = !!event.illustration;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: CONFIG.CARD_RADIUS,
        border: `1px solid ${GOLD_BORDER}`,
        aspectRatio: hasImage ? CONFIG.ASPECT_RATIO : undefined,
        background: hasImage ? '#000' : CARD_BG_FALLBACK,
        minHeight: hasImage ? undefined : 180,
      }}
    >
      {/* Background illustration */}
      {hasImage && (
        <Image
          src={event.illustration}
          alt={event.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 600px"
        />
      )}

      {/* Dark gradient overlay for text legibility */}
      {hasImage && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 35%, transparent 65%)',
          }}
          aria-hidden
        />
      )}

      {/* Text content — anchored to bottom */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1"
        style={{ padding: '0 20px 24px 20px' }}
      >
        {/* Event name */}
        <EventName
          as="h3"
          style={{
            fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)',
            fontWeight: 500,
            color: '#F5EBD9',
          }}
        >
          {event.name}
        </EventName>

        {/* Time */}
        {event.time ? (
          <Display
            as="p"
            color="gold"
            style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.6rem)', lineHeight: 1.2 }}
          >
            {event.time}
          </Display>
        ) : (
          <Eyebrow variant="label" style={{ opacity: 0.7 }}>
            <Placeholder>TIME TBD</Placeholder>
          </Eyebrow>
        )}

        {/* Venue spot */}
        <Eyebrow variant="label" style={{ marginTop: 4, opacity: 0.7 }}>
          <Placeholder>VENUE TBD</Placeholder>
        </Eyebrow>
      </div>
    </div>
  );
}

/* ── No-image fallback card (centred text) ──────────────────── */

function FallbackCard({ event }: { event: CardEvent }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        borderRadius: CONFIG.CARD_RADIUS,
        border: `1px solid ${GOLD_BORDER}`,
        background: CARD_BG_FALLBACK,
        minHeight: 180,
        padding: '32px 20px',
      }}
    >
      <EventName
        as="h3"
        style={{
          fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)',
          fontWeight: 500,
          color: '#F5EBD9',
        }}
      >
        {event.name}
      </EventName>

      {event.time ? (
        <Display
          as="p"
          color="gold"
          style={{
            fontSize: 'clamp(1.2rem, 4.5vw, 1.6rem)',
            lineHeight: 1.2,
            marginTop: 8,
          }}
        >
          {event.time}
        </Display>
      ) : (
        <div style={{ marginTop: 8 }}>
          <Eyebrow variant="label" style={{ opacity: 0.7 }}>
            <Placeholder>TIME TBD</Placeholder>
          </Eyebrow>
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <Eyebrow variant="label" style={{ opacity: 0.7 }}>
          <Placeholder>VENUE TBD</Placeholder>
        </Eyebrow>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function FullBleedCardsSection() {
  const { t } = useLang();

  const day1Events = useMemo<CardEvent[]>(
    () => [
      {
        id: 'haldi',
        time: t.itinerary.haldiTime,
        name: t.itinerary.haldi,
        venueSpot: '',
        illustration: ILLUSTRATIONS.haldi,
        alt: t.itinerary.haldi,
      },
      {
        id: 'mayra',
        time: t.itinerary.mayraTime,
        name: t.itinerary.mayra,
        venueSpot: '',
        illustration: ILLUSTRATIONS.mayra,
        alt: t.itinerary.mayra,
      },
      {
        id: 'sangeet',
        time: t.itinerary.sangeetTime,
        name: t.itinerary.sangeet,
        venueSpot: '',
        illustration: ILLUSTRATIONS.sangeet,
        alt: t.itinerary.sangeet,
      },
    ],
    [t],
  );

  const day2Events = useMemo<CardEvent[]>(
    () => [
      {
        id: 'wedding',
        time: t.itinerary.muhuratTime,
        name: t.itinerary.wedding,
        venueSpot: '',
        illustration: ILLUSTRATIONS.wedding,
        alt: t.itinerary.wedding,
      },
      {
        id: 'reception',
        time: t.itinerary.receptionTime,
        name: t.itinerary.reception,
        venueSpot: '',
        illustration: ILLUSTRATIONS.reception,
        alt: t.itinerary.reception,
      },
    ],
    [t],
  );

  return (
    <section
      className="w-full px-4 sm:px-6 py-20 md:py-28"
      style={{ background: '#1A0E0E' }}
    >
      {/* ── Section label ──────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <Eyebrow style={{ opacity: 0.5 }}>Option B</Eyebrow>
        <Display color="ivory" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>
          Full-Bleed Cards
        </Display>
      </div>

      <div className="mx-auto" style={{ maxWidth: CONFIG.COLUMN_MAX }}>
        {/* ── Day 1 ────────────────────────────────────── */}
        <DayDivider date={t.itinerary.day1} />

        <div className="flex flex-col" style={{ gap: CONFIG.CARD_GAP }}>
          {day1Events.map((ev) =>
            ev.illustration
              ? <BleedCard key={ev.id} event={ev} />
              : <FallbackCard key={ev.id} event={ev} />
          )}
        </div>

        {/* ── Day 2 ────────────────────────────────────── */}
        <DayDivider date={t.itinerary.day2} />

        <div className="flex flex-col" style={{ gap: CONFIG.CARD_GAP }}>
          {day2Events.map((ev) =>
            ev.illustration
              ? <BleedCard key={ev.id} event={ev} />
              : <FallbackCard key={ev.id} event={ev} />
          )}
        </div>
      </div>
    </section>
  );
}
