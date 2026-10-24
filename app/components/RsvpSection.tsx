'use client';

import { useState } from 'react';
import { Eyebrow, Display, Body, GOLD } from './Typography';
import { useLang } from './LanguageContext';

const GOLD_BORDER = 'rgba(201, 154, 79, 0.35)';

const INPUT_BG = 'rgba(255, 255, 255, 0.06)';
const INPUT_TEXT = '#F5EBD9';

/**
 * Google Apps Script Web App URL.
 * Set NEXT_PUBLIC_RSVP_URL in Vercel env vars (or .env.local for dev).
 */
const RSVP_ENDPOINT = process.env.NEXT_PUBLIC_RSVP_URL ?? '';

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const isYes = attending === 'yes';
  const isValid = name.trim() && attending && (isYes ? guestCount : true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === 'submitting') return;

    setStatus('submitting');

    try {
      const payload = {
        name: name.trim(),
        attending,
        guestCount: isYes ? Number(guestCount) : 0,
      };

      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // no-cors returns opaque response (status 0), so we can't check res.ok.
      // If fetch didn't throw, the request was sent successfully.
      setStatus('submitted');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'submitted') {
    return (
      <section
        className="w-full flex flex-col items-center px-6 py-20"
        style={{ background: '#1A0E0E' }}
      >
        <Display color="ivory">{t.rsvp.submitted}</Display>
      </section>
    );
  }

  const isSubmitting = status === 'submitting';

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
            disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  style={{
                    ...inputStyle,
                    textAlign: 'center',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
              disabled={isSubmitting}
            />
          </div>
        )}

        {/* Error message */}
        {status === 'error' && (
          <Body
            as="p"
            style={{
              fontSize: '0.85rem',
              color: '#e57373',
              textAlign: 'center',
            }}
          >
            {t.rsvp.error}
          </Body>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={{
            marginTop: 8,
            padding: '12px 24px',
            borderRadius: 9999,
            border: `1px solid ${isValid && !isSubmitting ? 'rgba(224, 184, 79, 0.6)' : GOLD_BORDER}`,
            background: isValid && !isSubmitting ? 'rgba(224, 184, 79, 0.15)' : 'transparent',
            color: GOLD,
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
            opacity: isValid && !isSubmitting ? 1 : 0.4,
            transition: 'opacity 0.2s, background 0.2s, border-color 0.2s',
          }}
        >
          {isSubmitting ? t.rsvp.submitting : t.rsvp.submit}
        </button>
      </form>
      </div>
    </section>
  );
}
