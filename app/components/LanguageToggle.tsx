'use client';

import { useLang } from './LanguageContext';
import { GOLD } from './Typography';

interface LanguageToggleProps {
  visible: boolean;
}

export default function LanguageToggle({ visible }: LanguageToggleProps) {
  const { lang, setLang } = useLang();

  const shared: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'background 0.25s, color 0.25s',
    border: 'none',
    background: 'transparent',
    color: GOLD,
    opacity: 0.55,
  };

  const active: React.CSSProperties = {
    ...shared,
    background: 'rgba(224, 184, 79, 0.15)',
    opacity: 1,
  };

  return (
    <div
      className="fixed z-[100] flex items-center gap-0.5"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        right: 'calc(env(safe-area-inset-right, 0px) + 16px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.5s ease-in-out',
        background: 'rgba(26, 14, 14, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(224, 184, 79, 0.4)',
        borderRadius: '9999px',
        padding: 3,
      }}
    >
      <button
        onClick={() => setLang('en')}
        style={{
          ...(lang === 'en' ? active : shared),
          fontFamily: 'var(--font-geist-sans)',
        }}
        aria-label="Switch to English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLang('mr')}
        style={{
          ...(lang === 'mr' ? active : shared),
          fontFamily: 'var(--font-tiro-devanagari)',
        }}
        aria-label="Switch to Marathi"
        aria-pressed={lang === 'mr'}
      >
        {'\u092E\u0930\u093E\u0920\u0940'}
      </button>
    </div>
  );
}
