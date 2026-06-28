'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Eyebrow, Display, Body, MapLink, Lines } from './Typography';
import { useLang } from './LanguageContext';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function VenueSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="w-full flex flex-col items-center px-0"
      style={{ background: '#1A0E0E', color: '#F5EBD9' }}
    >
      <motion.div
        className="px-6 pt-20 pb-8 md:pt-24 md:pb-10 text-center"
        variants={fade}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Eyebrow>{t.venue.intro}</Eyebrow>
      </motion.div>

      <motion.div
        className="relative w-full"
        style={{ aspectRatio: '16 / 9' }}
        variants={fade}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        <Image
          src="/venue.jpg"
          alt={t.venue.imageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          preload={false}
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center px-6 pt-10 pb-20 md:pt-14 md:pb-28 gap-5"
        variants={fade}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
        <Display className="text-center">{t.venue.name}</Display>

        <Body className="text-center max-w-[36ch]">
          <Lines lines={t.venue.addressLines} />
        </Body>

        <MapLink href="https://maps.app.goo.gl/8qvfKX2twfZdVVbFA" className="mt-2">
          {t.venue.mapLink}
        </MapLink>
      </motion.div>
    </section>
  );
}
