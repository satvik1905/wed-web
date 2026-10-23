'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { GOLD } from './Typography';

/* ═══════════════════════════════════════════════════════════════
   Background-music toggle — floating bottom-right button.
   ═══════════════════════════════════════════════════════════════ */

/** Drop the audio file into /public and update this path. */
const AUDIO_SRC = '/background-music.m4a';

/** Set to false for a one-shot track. */
const AUDIO_LOOP = true;

/** 0 (silent) to 1 (full volume). */
const AUDIO_VOLUME = 1;

const LS_KEY = 'music-muted';

export interface MusicToggleHandle {
  /** Call synchronously inside a user-gesture handler to unlock playback. */
  start: () => void;
}

interface MusicToggleProps {
  visible: boolean;
}

const MusicToggle = forwardRef<MusicToggleHandle, MusicToggleProps>(
  function MusicToggle({ visible }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [muted, setMuted] = useState(() => {
      if (typeof window === 'undefined') return false;
      return localStorage.getItem(LS_KEY) === 'true';
    });
    /** Whether start() has been called (i.e. user gesture received). */
    const startedRef = useRef(false);

    /* ── Create the Audio element once ──────────────────────────── */
    useEffect(() => {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = AUDIO_LOOP;
      audio.volume = AUDIO_VOLUME;
      audio.preload = 'auto';
      audioRef.current = audio;
      return () => {
        audio.pause();
        audio.src = '';
      };
    }, []);

    /* ── Expose start() for the intro tap ───────────────────────── */
    useImperativeHandle(ref, () => ({
      start() {
        startedRef.current = true;
        const audio = audioRef.current;
        if (!audio) return;
        if (muted) return;            // respect stored preference
        audio.play().catch(() => {});  // swallow if blocked
      },
    }), [muted]);

    /* ── Pause / resume on visibility change ────────────────────── */
    useEffect(() => {
      function handleVisibility() {
        const audio = audioRef.current;
        if (!audio || !startedRef.current) return;
        if (document.hidden) {
          audio.pause();
        } else if (!muted) {
          audio.play().catch(() => {});
        }
      }
      document.addEventListener('visibilitychange', handleVisibility);
      return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [muted]);

    /* ── Toggle handler ─────────────────────────────────────────── */
    const toggle = useCallback(() => {
      setMuted((prev) => {
        const next = !prev;
        localStorage.setItem(LS_KEY, String(next));
        const audio = audioRef.current;
        if (!audio || !startedRef.current) return next;
        if (next) {
          audio.pause();
        } else {
          audio.play().catch(() => {});
        }
        return next;
      });
    }, []);

    /* ── Render ──────────────────────────────────────────────────── */
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        className="fixed z-[100]"
        style={{
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
          right: 'calc(env(safe-area-inset-right, 0px) + 16px)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(26, 14, 14, 0.75)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(224, 184, 79, 0.4)',
          cursor: 'pointer',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {muted ? (
          /* Speaker with slash */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Speaker with sound waves */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    );
  },
);

export default MusicToggle;
