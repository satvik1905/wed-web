'use client';

import { useLang } from './LanguageContext';
import { GOLD } from './Typography';

interface LanguageToggleProps {
  visible: boolean;
}

export default function LanguageToggle({ visible }: LanguageToggleProps) {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
      className="fixed z-[100]"
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
        padding: '6px 14px',
        color: GOLD,
        fontFamily: lang === 'en' ? 'var(--font-tiro-devanagari)' : 'var(--font-geist-sans)',
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        cursor: 'pointer',
      }}
      aria-label={lang === 'en' ? 'Switch to Marathi' : 'Switch to English'}
    >
      {lang === 'en' ? '\u092E\u0930\u093E\u0920\u0940' : 'EN'}
    </button>
  );
}
