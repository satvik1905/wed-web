'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { Eyebrow, Display, EventName, Body, GOLD } from './Typography';
import { useLang } from './LanguageContext';

/* ═══════════════════════════════════════════════════════════════
   Provisional config — labelled constants, easy to tweak.
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  /** Inner padding of each card. */
  CARD_PADDING: 16,

  /** Border-radius of the inset illustration. */
  IMAGE_RADIUS: 16,

  /** Fixed height of the inset illustration (px). */
  IMAGE_SIZE: 200,

  /** Max-width of the single centred column. */
  COLUMN_MAX_WIDTH: 600,

  /** Font-weight for the large event name. 500 is the heaviest
      weight loaded for Cormorant Garamond (300 / 400 / 500). */
  NAME_WEIGHT: 500 as number,
};

/** Illustration paths — leave empty until file is in /public. */
const ILLUSTRATIONS: Record<string, string> = {
  haldi: '/haldi.png',
  mayra: '/mayra.png',
  sangeet: '/sangeet.png',
  wedding: '',          // TODO: add /public/wedding.png
  reception: '',        // TODO: add /public/reception.png
};

/* ── types ──────────────────────────────────────────────────── */

interface EventData {
  id: string;
  timeOfDay: string;
  exactTime: string;
  name: string;
  description: string;
  dressCode: string;
  illustration: string;
  alt: string;
}

/* ── shared tokens ─────────────────────────────────────────── */

const GOLD_BORDER = 'rgba(201, 154, 79, 0.3)';
const CARD_BG = '#1E1212';

/* ── sub-components ────────────────────────────────────────── */

function CardDetails({
  event,
  dressLabel,
  muhuratLabel,
  muhuratTime,
  isWedding,
}: {
  event: EventData;
  dressLabel: string;
  muhuratLabel?: string;
  muhuratTime?: string;
  isWedding?: boolean;
}) {
  return (
    <div className="flex flex-col justify-center gap-2 min-w-0">
      {/* Time-of-day label */}
      {event.timeOfDay && (
        <Eyebrow variant="label">{event.timeOfDay}</Eyebrow>
      )}

      {/* Muhurat (wedding only, hidden when empty) */}
      {isWedding && muhuratTime && (
        <div className="flex flex-col gap-1 mb-1">
          <Eyebrow variant="label">{muhuratLabel}</Eyebrow>
          <Display
            as="p"
            color="gold"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', lineHeight: 1 }}
          >
            {muhuratTime}
          </Display>
        </div>
      )}

      {/* Event name */}
      <EventName
        as="h3"
        style={{
          fontWeight: CONFIG.NAME_WEIGHT,
          fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)',
        }}
      >
        {event.name}
      </EventName>

      {/* Exact time — larger, below event name */}
      {event.exactTime && (
        <Display
          as="p"
          color="gold"
          style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', lineHeight: 1.2 }}
        >
          {event.exactTime}
        </Display>
      )}

      {/* Description (empty for now) */}
      {event.description && (
        <Body
          as="span"
          style={{ fontSize: 'clamp(0.85rem, 3.2vw, 0.95rem)', opacity: 0.75 }}
        >
          {event.description}
        </Body>
      )}

      {/* Dress code (hidden when empty) */}
      {event.dressCode && (
        <Eyebrow variant="label" style={{ opacity: 0.7, marginTop: 2 }}>
          {dressLabel}: {event.dressCode}
        </Eyebrow>
      )}
    </div>
  );
}

function EventCard({
  event,
  dressLabel,
  muhuratLabel,
  muhuratTime,
  isWedding,
}: {
  event: EventData;
  dressLabel: string;
  muhuratLabel?: string;
  muhuratTime?: string;
  isWedding?: boolean;
}) {
  const hasImage = !!event.illustration;
  const pad = CONFIG.CARD_PADDING;

  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: hasImage ? `1fr ${CONFIG.IMAGE_SIZE}px` : '1fr',
        gap: pad,
        padding: pad,
        border: `1px solid ${GOLD_BORDER}`,
        borderRadius: 16,
        background: CARD_BG,
      }}
    >
      <CardDetails
        event={event}
        dressLabel={dressLabel}
        muhuratLabel={muhuratLabel}
        muhuratTime={muhuratTime}
        isWedding={isWedding}
      />

      {hasImage && (
        <div
          className="relative self-stretch"
          style={{
            borderRadius: CONFIG.IMAGE_RADIUS,
            overflow: 'hidden',
            minHeight: CONFIG.IMAGE_SIZE,
          }}
        >
          <Image
            src={event.illustration}
            alt={event.alt}
            fill
            className="object-cover"
            sizes={`${CONFIG.IMAGE_SIZE}px`}
          />
        </div>
      )}
    </div>
  );
}

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

/* ── main component ────────────────────────────────────────── */

export default function ItinerarySection() {
  const { t } = useLang();

  const day1Events = useMemo<EventData[]>(
    () => [
      {
        id: 'haldi',
        timeOfDay: t.itinerary.morning,
        exactTime: t.itinerary.haldiTime,
        name: t.itinerary.haldi,
        description: t.itinerary.haldiDesc,
        dressCode: t.itinerary.haldiDress,
        illustration: ILLUSTRATIONS.haldi,
        alt: t.itinerary.haldi,
      },
      {
        id: 'mayra',
        timeOfDay: t.itinerary.afternoon,
        exactTime: t.itinerary.mayraTime,
        name: t.itinerary.mayra,
        description: t.itinerary.mayraDesc,
        dressCode: t.itinerary.mayraDress,
        illustration: ILLUSTRATIONS.mayra,
        alt: t.itinerary.mayra,
      },
      {
        id: 'sangeet',
        timeOfDay: t.itinerary.evening,
        exactTime: t.itinerary.sangeetTime,
        name: t.itinerary.sangeet,
        description: t.itinerary.sangeetDesc,
        dressCode: t.itinerary.sangeetDress,
        illustration: ILLUSTRATIONS.sangeet,
        alt: t.itinerary.sangeet,
      },
    ],
    [t],
  );

  const weddingEvent = useMemo<EventData>(
    () => ({
      id: 'wedding',
      timeOfDay: '',
      exactTime: '',
      name: t.itinerary.wedding,
      description: t.itinerary.weddingDesc,
      dressCode: t.itinerary.weddingDress,
      illustration: ILLUSTRATIONS.wedding,
      alt: t.itinerary.wedding,
    }),
    [t],
  );

  const receptionEvent = useMemo<EventData>(
    () => ({
      id: 'reception',
      timeOfDay: '',
      exactTime: t.itinerary.receptionTime,
      name: t.itinerary.reception,
      description: t.itinerary.receptionDesc,
      dressCode: t.itinerary.receptionDress,
      illustration: ILLUSTRATIONS.reception,
      alt: t.itinerary.reception,
    }),
    [t],
  );

  return (
    <section
      className="w-full px-4 sm:px-6 py-20 md:py-28"
      style={{ background: '#1A0E0E' }}
    >
      {/* ── Section heading ──────────────────────────── */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden>
          <path
            d="M12 2C8 2 4 0 1 0C1 4 4 7 8 7C4 7 1 10 1 14C4 14 8 12 12 12C16 12 20 14 23 14C23 10 20 7 16 7C20 7 23 4 23 0C20 0 16 2 12 2Z"
            fill={GOLD}
            opacity="0.5"
          />
        </svg>
        <Display color="ivory">{t.itinerary.heading}</Display>
      </div>

      <div className="mx-auto" style={{ maxWidth: CONFIG.COLUMN_MAX_WIDTH }}>
        {/* ── Day 1 divider ────────────────────────────── */}
        <DayDivider date={t.itinerary.day1} />

        {/* ── Day 1 cards ──────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {day1Events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              dressLabel={t.itinerary.dressLabel}
            />
          ))}
        </div>

        {/* ── Day 2 divider ────────────────────────────── */}
        <DayDivider date={t.itinerary.day2} />

        {/* ── Wedding card ─────────────────────────────── */}
        <EventCard
          event={weddingEvent}
          dressLabel={t.itinerary.dressLabel}
          muhuratLabel={t.itinerary.muhuratLabel}
          muhuratTime={t.itinerary.muhuratTime}
          isWedding
        />

        {/* ── Reception card ──────────────────────────── */}
        <div className="mt-4">
          <EventCard
            event={receptionEvent}
            dressLabel={t.itinerary.dressLabel}
          />
        </div>
      </div>
    </section>
  );
}
