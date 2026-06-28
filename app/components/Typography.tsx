'use client';

import { Fragment, type ReactNode, type ElementType, type CSSProperties } from 'react';
import { useLang } from './LanguageContext';

// ── Tokens ─────────────────────────────────────────────────────
export const GOLD = '#E0B84F';
export const IVORY = '#F5EBD9';

// ── Font helpers ───────────────────────────────────────────────

function useFont() {
  const { lang } = useLang();
  const isMr = lang === 'mr';
  return {
    serif: isMr ? 'var(--font-tiro-devanagari)' : 'var(--font-cormorant)',
    sans: isMr ? 'var(--font-tiro-devanagari)' : 'var(--font-geist-sans)',
    isMr,
  };
}

// ── Lines helper ───────────────────────────────────────────────

export function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
      ))}
    </>
  );
}

// ── Eyebrow ────────────────────────────────────────────────────

interface EyebrowProps {
  children: ReactNode;
  variant?: 'default' | 'label';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Eyebrow({ children, variant = 'default', as: Tag = 'span', className = '', style }: EyebrowProps) {
  const { sans, isMr } = useFont();
  const isLabel = variant === 'label';
  const base: CSSProperties = {
    fontFamily: sans,
    fontSize: isMr
      ? (isLabel ? 'clamp(0.6875rem, 2.8vw, 0.75rem)' : 'clamp(0.75rem, 3vw, 0.8125rem)')
      : (isLabel ? 'clamp(0.5625rem, 2.2vw, 0.625rem)' : 'clamp(0.625rem, 2.5vw, 0.6875rem)'),
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: isMr ? (isLabel ? '0.08em' : '0.12em') : (isLabel ? '0.32em' : '0.42em'),
    lineHeight: isMr ? 1.6 : undefined,
    color: GOLD,
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── DisplayXL ──────────────────────────────────────────────────

interface DisplayXLProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function DisplayXL({ children, as: Tag = 'h1', className = '', style }: DisplayXLProps) {
  const { serif, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: serif,
    fontStyle: isMr ? 'normal' : 'italic',
    fontWeight: 400,
    fontSize: isMr ? 'clamp(5.25rem, 21vw, 9.5rem)' : 'clamp(4.5rem, 18vw, 8rem)',
    lineHeight: isMr ? 1.15 : 0.95,
    color: IVORY,
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── Display ────────────────────────────────────────────────────

interface DisplayProps {
  children: ReactNode;
  color?: 'gold' | 'ivory';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Display({ children, color = 'gold', as: Tag = 'h2', className = '', style }: DisplayProps) {
  const { serif, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: serif,
    fontStyle: isMr ? 'normal' : 'italic',
    fontWeight: 500,
    fontSize: isMr ? 'clamp(2.35rem, 8.2vw, 3.5rem)' : 'clamp(2rem, 7vw, 3rem)',
    letterSpacing: '0.02em',
    lineHeight: isMr ? 1.3 : undefined,
    color: color === 'gold' ? GOLD : IVORY,
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── Body ───────────────────────────────────────────────────────

interface BodyProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Body({ children, as: Tag = 'p', className = '', style }: BodyProps) {
  const { serif, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: isMr ? 'clamp(1.18rem, 4.8vw, 1.35rem)' : 'clamp(1rem, 4vw, 1.125rem)',
    lineHeight: isMr ? 1.9 : 1.7,
    letterSpacing: '0.01em',
    color: '#EDE6D6',
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── Numeral ────────────────────────────────────────────────────

interface NumeralProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Numeral({ children, as: Tag = 'span', className = '', style }: NumeralProps) {
  const { serif, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: serif,
    fontWeight: 600,
    fontSize: isMr ? 'clamp(2rem, 7.5vw, 2.8rem)' : 'clamp(1.7rem, 6.5vw, 2.4rem)',
    lineHeight: isMr ? 1.2 : 1,
    letterSpacing: '0.02em',
    color: GOLD,
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── EventName ──────────────────────────────────────────────────

interface EventNameProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function EventName({ children, as: Tag = 'span', className = '', style }: EventNameProps) {
  const { serif, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: isMr ? 'clamp(1.35rem, 5.2vw, 1.65rem)' : 'clamp(1.15rem, 4.5vw, 1.4rem)',
    letterSpacing: '0.02em',
    lineHeight: isMr ? 1.5 : undefined,
    color: '#EDE6D6',
  };
  return <Tag className={className} style={{ ...base, ...style }}>{children}</Tag>;
}

// ── MapLink ────────────────────────────────────────────────────

interface MapLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  style?: CSSProperties;
}

export function MapLink({ children, href, className = '', style }: MapLinkProps) {
  const { sans, isMr } = useFont();
  const base: CSSProperties = {
    fontFamily: sans,
    fontSize: isMr ? '0.875rem' : '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: isMr ? '0.06em' : '0.18em',
    color: GOLD,
    border: '1px solid rgba(224, 184, 79, 0.45)',
    borderRadius: '9999px',
    padding: '0.5rem 1.25rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'border-color 0.25s, background 0.25s',
    textDecoration: 'none',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ ...base, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(224, 184, 79, 0.85)';
        e.currentTarget.style.background = 'rgba(224, 184, 79, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(224, 184, 79, 0.45)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </a>
  );
}
