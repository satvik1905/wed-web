"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Eyebrow, Display, Body, MapLink } from "./Typography";
import { useLang } from "./LanguageContext";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function VenueSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="w-full"
      style={{ background: "#1A0E0E", color: "#F5EBD9" }}
    >
      {/* ── Venue info block ──────────────────────────────── */}
      <motion.div
        className="flex flex-col items-center text-center px-6 pt-12 pb-6"
        variants={fade}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      >
        <Eyebrow className="mb-4">{t.venue.intro}</Eyebrow>

        <Display
          className="text-center whitespace-pre-line"
          color="ivory"
        >
          {t.venue.name}
        </Display>

        <Body className="mt-3" style={{ color: "rgba(237,230,214,0.75)" }}>
          {t.venue.location}
        </Body>
      </motion.div>

      {/* ── Photo 2 — inset rounded ──────────────────────── */}
      <motion.div
        className="px-6 pb-10"
        variants={fade}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16 / 7", borderRadius: "1rem" }}
        >
          <Image
            src="/venue.jpg"
            alt={t.venue.image2Alt}
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </motion.div>

      {/* ── Map link ─────────────────────────────────────── */}
      <motion.div
        className="flex justify-center px-6 pb-16"
        variants={fade}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        <MapLink href="https://maps.app.goo.gl/8qvfKX2twfZdVVbFA">
          {t.venue.mapLink}
        </MapLink>
      </motion.div>
    </section>
  );
}
