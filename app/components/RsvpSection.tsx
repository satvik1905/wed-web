'use client';

import { useState } from 'react';
import { Eyebrow, Display, GOLD } from './Typography';
import { useLang } from './LanguageContext';

const GOLD_BORDER = 'rgba(201, 154, 79, 0.35)';

const INPUT_BG = 'rgba(255, 255, 255, 0.06)';
const INPUT_TEXT = '#F5EBD9';

const inputStyle: React.CSSProperties = {
  background: INPUT_BG,
  border: `1px solid ${GOLD_BORDER}`,
  borderRadius: 8,
  padding: '10px 14px',
  color: INPUT_TEXT,
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '0.7rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: GOLD,
  marginBottom: 4,
};

/** CSS to override browser autofill backgrounds (WebKit + standard). */
const autofillOverrideCSS = `
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px rgba(30, 18, 18, 1) inset !important;
    -webkit-text-fill-color: ${INPUT_TEXT} !important;
    border-color: ${GOLD_BORDER} !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  input:autofill {
    background: ${INPUT_BG} !important;
    color: ${INPUT_TEXT} !important;
  }
`;

export default function RsvpSection() {
  const { t } = useLang();

  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');
  const [guestCount, setGuestCount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isYes = attending === 'yes';
  const isValid = name.trim() && attending && (isYes ? guestCount : true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    // TODO: wire up to backend / Google Sheets / etc.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section
        className="w-full flex flex-col items-center px-6 py-20"
        style={{ background: '#1A0E0E' }}
      >
        <Display color="ivory">{t.rsvp.submitted}</Display>
      </section>
    );
  }

  return (
    <section
      className="w-full flex flex-col items-center px-6 py-20"
      style={{ background: '#1A0E0E' }}
    >
      <style dangerouslySetInnerHTML={{ __html: autofillOverrideCSS }} />

      <div className="flex flex-col items-center gap-3 mb-10">
        <Display color="ivory">{t.rsvp.heading}</Display>
      </div>

      <div
        className="w-full"
        style={{
          maxWidth: 480,
          background: '#1E1212',
          border: '1px solid rgba(201, 154, 79, 0.3)',
          borderRadius: 20,
          padding: '28px 24px',
        }}
      >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* Name */}
        <div>
          <label style={labelStyle}>{t.rsvp.name} *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Attending */}
        <div>
          <label style={labelStyle}>{t.rsvp.attending} *</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {(['yes', 'no'] as const).map((val) => {
              const selected = attending === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAttending(val)}
                  style={{
                    ...inputStyle,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                    background: selected
                      ? 'rgba(224, 184, 79, 0.22)'
                      : 'rgba(255, 255, 255, 0.06)',
                    borderColor: selected
                      ? GOLD
                      : GOLD_BORDER,
                    color: selected ? GOLD : INPUT_TEXT,
                    fontWeight: selected ? 600 : 400,
                  }}
                >
                  {val === 'yes' ? t.rsvp.attendingYes : t.rsvp.attendingNo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guest count — visible only when "Yes" */}
        {isYes && (
          <div>
            <label style={labelStyle}>{t.rsvp.guestCount} *</label>
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            marginTop: 8,
            padding: '12px 24px',
            borderRadius: 9999,
            border: `1px solid ${isValid ? 'rgba(224, 184, 79, 0.6)' : GOLD_BORDER}`,
            background: isValid ? 'rgba(224, 184, 79, 0.15)' : 'transparent',
            color: GOLD,
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            cursor: isValid ? 'pointer' : 'not-allowed',
            opacity: isValid ? 1 : 0.4,
            transition: 'opacity 0.2s, background 0.2s, border-color 0.2s',
          }}
        >
          {t.rsvp.submit}
        </button>
      </form>
      </div>
    </section>
  );
}
