'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Eyebrow, Display, EventName, Body, GOLD, IVORY } from './Typography';
import { useLang } from './LanguageContext';

/* ═══════════════════════════════════════════════════════════════
   Option A — Timeline Rail (temporary, for comparison)
   ═══════════════════════════════════════════════════════════════ */

const RAIL_CONFIG = {
  /** Distance from left edge to the centre of the gold rail line. */
  RAIL_LEFT: 24,
  /** Diameter of the dot on the rail. */
  DOT_SIZE: 12,
  /** Thumbnail illustration size. */
  THUMB_SIZE: 64,
  THUMB_RADIUS: 8,
  /** Vertical gap between event items. */
  EVENT_GAP: 32,
  /** Max column width (matches existing section). */
  COLUMN_MAX: 600,
};

const GOLD_BORDER = 'rgba(201, 154, 79, 0.3)';

/** Illustration paths — mirrors ItinerarySection. */
const ILLUSTRATIONS: Record<string, string> = {
  haldi: '/haldi.png',
  mayra: '/mayra.png',
  sangeet: '/sangeet.png',
  wedding: '',
  reception: '',
};

/* ── Placeholder helper ─────────────────────────────────────── */

function Placeholder({ children }: { children: string }) {
  return (
    <span
      style={{
        color: GOLD,
        opacity: 0.5,
        borderBottom: `1px dashed ${GOLD}`,
        paddingBottom: 1,
      }}
    >
      {children}
    </span>
  );
}

/* ── Types ──────────────────────────────────────────────────── */

interface RailEvent {
  id: string;
  time: string;
  name: string;
  venueSpot: string;
  dressCue: string;
  illustration: string;
  alt: string;
}

/* ── Day header on the rail ─────────────────────────────────── */

function RailDayHeader({ date }: { date: string }) {
  const dotCenter = RAIL_CONFIG.RAIL_LEFT;
  return (
    <div
      className="relative flex items-center"
      style={{ paddingLeft: dotCenter + RAIL_CONFIG.DOT_SIZE / 2 + 16, minHeight: 48 }}
    >
      {/* Larger gold diamond for day markers */}
      <div
        style={{
          position: 'absolute',
          left: dotCenter - 7,
          top: '50%',
          transform: 'translateY(-50%) rotate(45deg)',
          width: 14,
          height: 14,
          background: GOLD,
          zIndex: 2,
        }}
      />
      <Display
        as="h3"
        style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)', lineHeight: 1.2 }}
      >
        {date}
      </Display>
    </div>
  );
}

/* ── Single event row ───────────────────────────────────────── */

function RailEventItem({ event, dressLabel }: { event: RailEvent; dressLabel: string }) {
  const dotCenter = RAIL_CONFIG.RAIL_LEFT;
  const contentLeft = dotCenter + RAIL_CONFIG.DOT_SIZE / 2 + 16;
  const hasThumb = !!event.illustration;

  return (
    <div className="relative" style={{ paddingLeft: contentLeft }}>
      {/* Dot on the rail */}
      <div
        style={{
          position: 'absolute',
          left: dotCenter - RAIL_CONFIG.DOT_SIZE / 2,
          top: 4,
          width: RAIL_CONFIG.DOT_SIZE,
          height: RAIL_CONFIG.DOT_SIZE,
          borderRadius: '50%',
          border: `2px solid ${GOLD}`,
          background: '#1A0E0E',
          zIndex: 2,
        }}
      />

      <div className="flex items-start gap-3">
        {/* Text column */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {/* Time — primary anchor */}
          {event.time ? (
            <Display
              as="p"
              color="gold"
              style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', lineHeight: 1.2 }}
            >
              {event.time}
            </Display>
          ) : (
            <Body as="p" style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', lineHeight: 1.2 }}>
              <Placeholder>TIME TBD</Placeholder>
            </Body>
          )}

          {/* Event name */}
          <EventName
            as="h4"
            style={{ fontSize: 'clamp(1.15rem, 4.2vw, 1.4rem)', fontWeight: 500 }}
          >
            {event.name}
          </EventName>

          {/* Venue spot */}
          <Body
            as="p"
            style={{ fontSize: 'clamp(0.8rem, 3vw, 0.9rem)', opacity: 0.7, lineHeight: 1.4 }}
          >
            {event.venueSpot || <Placeholder>VENUE TBD</Placeholder>}
          </Body>

          {/* Dress cue */}
          <Eyebrow variant="label" style={{ opacity: 0.6, marginTop: 2 }}>
            {event.dressCue
              ? <>{dressLabel}: {event.dressCue}</>
              : <Placeholder>{`${dressLabel}: TBD`}</Placeholder>
            }
          </Eyebrow>
        </div>

        {/* Thumbnail */}
        {hasThumb && (
          <div
            className="relative flex-shrink-0"
            style={{
              width: RAIL_CONFIG.THUMB_SIZE,
              height: RAIL_CONFIG.THUMB_SIZE,
              borderRadius: RAIL_CONFIG.THUMB_RADIUS,
              overflow: 'hidden',
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <Image
              src={event.illustration}
              alt={event.alt}
              fill
              className="object-cover"
              sizes={`${RAIL_CONFIG.THUMB_SIZE}px`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export default function TimelineRailSection() {
  const { t } = useLang();

  const day1Events = useMemo<RailEvent[]>(
    () => [
      {
        id: 'haldi',
        time: t.itinerary.haldiTime,
        name: t.itinerary.haldi,
        venueSpot: '',
        dressCue: t.itinerary.haldiDress,
        illustration: ILLUSTRATIONS.haldi,
        alt: t.itinerary.haldi,
      },
      {
        id: 'mayra',
        time: t.itinerary.mayraTime,
        name: t.itinerary.mayra,
        venueSpot: '',
        dressCue: t.itinerary.mayraDress,
        illustration: ILLUSTRATIONS.mayra,
        alt: t.itinerary.mayra,
      },
      {
        id: 'sangeet',
        time: t.itinerary.sangeetTime,
        name: t.itinerary.sangeet,
        venueSpot: '',
        dressCue: t.itinerary.sangeetDress,
        illustration: ILLUSTRATIONS.sangeet,
        alt: t.itinerary.sangeet,
      },
    ],
    [t],
  );

  const day2Events = useMemo<RailEvent[]>(
    () => [
      {
        id: 'wedding',
        time: t.itinerary.muhuratTime,
        name: t.itinerary.wedding,
        venueSpot: '',
        dressCue: t.itinerary.weddingDress,
        illustration: ILLUSTRATIONS.wedding,
        alt: t.itinerary.wedding,
      },
      {
        id: 'reception',
        time: t.itinerary.receptionTime,
        name: t.itinerary.reception,
        venueSpot: '',
        dressCue: t.itinerary.receptionDress,
        illustration: ILLUSTRATIONS.reception,
        alt: t.itinerary.reception,
      },
    ],
    [t],
  );

  const dotCenter = RAIL_CONFIG.RAIL_LEFT;

  return (
    <section
      className="w-full px-4 sm:px-6 py-20 md:py-28"
      style={{ background: '#1A0E0E' }}
    >
      {/* ── Section label ──────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <Eyebrow style={{ opacity: 0.5 }}>Option A</Eyebrow>
        <Display color="ivory" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>
          Timeline Rail
        </Display>
      </div>

      {/* ── Rail container ─────────────────────────────── */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: RAIL_CONFIG.COLUMN_MAX }}
      >
        {/* Vertical gold line */}
        <div
          style={{
            position: 'absolute',
            left: dotCenter,
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, transparent, ${GOLD} 32px, ${GOLD} calc(100% - 32px), transparent)`,
            opacity: 0.4,
          }}
          aria-hidden
        />

        {/* ── Day 1 ─────────────────────────────────────── */}
        <RailDayHeader date={t.itinerary.day1} />

        <div
          className="flex flex-col"
          style={{ gap: RAIL_CONFIG.EVENT_GAP, paddingTop: 16, paddingBottom: 16 }}
        >
          {day1Events.map((ev) => (
            <RailEventItem key={ev.id} event={ev} dressLabel={t.itinerary.dressLabel} />
          ))}
        </div>

        {/* ── Day 2 ─────────────────────────────────────── */}
        <div style={{ marginTop: 16 }}>
          <RailDayHeader date={t.itinerary.day2} />
        </div>

        <div
          className="flex flex-col"
          style={{ gap: RAIL_CONFIG.EVENT_GAP, paddingTop: 16, paddingBottom: 16 }}
        >
          {day2Events.map((ev) => (
            <RailEventItem key={ev.id} event={ev} dressLabel={t.itinerary.dressLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
