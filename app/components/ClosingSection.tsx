'use client';

import { Eyebrow, Display, Body, GOLD } from './Typography';
import { useLang } from './LanguageContext';

export default function ClosingSection() {
  const { t } = useLang();

  return (
    <section
      className="w-full flex flex-col items-center px-6 py-20 md:py-28 pb-32"
      style={{ background: '#1A0E0E' }}
    >
      {/* Decorative flourish */}
      <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden className="mb-8">
        <path
          d="M12 2C8 2 4 0 1 0C1 4 4 7 8 7C4 7 1 10 1 14C4 14 8 12 12 12C16 12 20 14 23 14C23 10 20 7 16 7C20 7 23 4 23 0C20 0 16 2 12 2Z"
          fill={GOLD}
          opacity="0.5"
        />
      </svg>

      {/* Message */}
      <Body className="text-center max-w-[36ch]" style={{ opacity: 0.85 }}>
        {t.closing.message}
      </Body>

      {/* Gold divider */}
      <div
        className="h-px w-16 my-8"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201, 154, 79, 0.7), transparent)',
        }}
        aria-hidden
      />

      {/* Heading */}
      <Display color="gold" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.2rem)' }}>
        {t.closing.heading}
      </Display>

      {/* Family members */}
      <div className="flex flex-col items-center gap-2 mt-6">
        {t.closing.familyMembers.map((member, i) => (
          <Body key={i} as="span" className="text-center" style={{ opacity: 0.85 }}>
            {member}
          </Body>
        ))}
      </div>

      {/* Family closing */}
      <Body
        className="text-center mt-6"
        style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', opacity: 0.85 }}
      >
        {t.closing.familyClosing}
      </Body>
    </section>
  );
}
