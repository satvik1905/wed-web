'use client';

import { useState } from 'react';
import { Eyebrow, Display, GOLD } from './Typography';
import { useLang } from './LanguageContext';

const GOLD_BORDER = 'rgba(201, 154, 79, 0.35)';

const inputStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.06)',
  border: `1px solid ${GOLD_BORDER}`,
  borderRadius: 8,
  padding: '10px 14px',
  color: '#F5EBD9',
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

export default function RsvpSection() {
  const { t } = useLang();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');
  const [guestCount, setGuestCount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = firstName.trim() && lastName.trim() && attending && guestCount;

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
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>{t.rsvp.firstName} *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>{t.rsvp.lastName} *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>{t.rsvp.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Attending */}
        <div>
          <label style={labelStyle}>{t.rsvp.attending} *</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {(['yes', 'no'] as const).map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAttending(val)}
                style={{
                  ...inputStyle,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s',
                  background:
                    attending === val
                      ? 'rgba(224, 184, 79, 0.15)'
                      : 'rgba(255, 255, 255, 0.06)',
                  borderColor:
                    attending === val
                      ? 'rgba(224, 184, 79, 0.6)'
                      : GOLD_BORDER,
                }}
              >
                {val === 'yes' ? t.rsvp.attendingYes : t.rsvp.attendingNo}
              </button>
            ))}
          </div>
        </div>

        {/* Guest count */}
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
