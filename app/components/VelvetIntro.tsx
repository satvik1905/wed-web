'use client';

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eyebrow } from './Typography';
import { useLang } from './LanguageContext';

type Stage = 'idle' | 'revealing' | 'fading' | 'done';

interface VelvetIntroProps {
  children: ReactNode;
  onComplete?: () => void;
}

export default function VelvetIntro({ children, onComplete }: VelvetIntroProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const doneTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { t } = useLang();

  // ── Mount: force first-frame decode ─────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.05;
    }
  }, []);

  // ── Cleanup timeouts on unmount ────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimeout(fadeTimeout.current);
      clearTimeout(doneTimeout.current);
    };
  }, []);

  // ── Lock body scroll until done ─────────────────────────────────────────────
  useEffect(() => {
    if (stage === 'done') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

  // ── Fire onComplete when intro finishes ────────────────────────────────────
  useEffect(() => {
    if (stage === 'done') {
      onComplete?.();
    }
  }, [stage, onComplete]);

  // ── Tap handler ────────────────────────────────────────────────────────────
  const handleTap = useCallback(() => {
    if (stage !== 'idle') return;
    setStage('revealing');

    const video = videoRef.current;
    if (video) {
      video.playbackRate = 2.0;
      video.play().catch(() => {
        setStage('fading');
      });
    }

    fadeTimeout.current = setTimeout(() => {
      setStage('fading');
    }, 2500);
  }, [stage]);

  // ── When entering 'fading', schedule 'done' ───────────────────────────────
  useEffect(() => {
    if (stage === 'fading') {
      doneTimeout.current = setTimeout(() => {
        setStage('done');
      }, 1000);
    }
  }, [stage]);

  const showVideo = stage !== 'done';
  const videoOpacity = stage === 'fading' ? 0 : 1;
  const childrenOpacity = stage === 'fading' || stage === 'done' ? 1 : 0;

  return (
    <div className="relative w-full min-h-[100svh]" onPointerDown={handleTap}>
      {/* ── Children layer (underneath) ─────────────────────────────────── */}
      <motion.div
        className="relative z-0"
        animate={{ opacity: childrenOpacity }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>

      {/* ── Video layer ─────────────────────────────────────────────────── */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 z-50"
          style={{ background: '#1A0E0E' }}
          animate={{ opacity: videoOpacity }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
        >
          <video
            ref={videoRef}
            src="/curtain.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* ── Tap-to-reveal overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'idle' && (
          <motion.div
            key="prompt"
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none px-6"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Outer breathing ring */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Soft glow halo behind the card */}
              <div
                className="absolute inset-0 -m-8 rounded-[2.5rem] blur-2xl"
                style={{ background: 'radial-gradient(closest-side, rgba(201,154,79,0.18), transparent 70%)' }}
                aria-hidden
              />

              {/* The card itself */}
              <div
                className="relative flex flex-col items-center gap-5 px-10 py-8 rounded-2xl border"
                style={{
                  background: 'rgba(40, 20, 16, 0.45)',
                  backdropFilter: 'blur(14px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(14px) saturate(140%)',
                  borderColor: 'rgba(201, 154, 79, 0.30)',
                  boxShadow: '0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Hand-tap icon with concentric tap-ripple rings */}
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: 'rgba(229,197,137,0.5)' }}
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.span
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: 'rgba(229,197,137,0.5)' }}
                    animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
                  />
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(229,197,137,0.95)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 11V6a2 2 0 0 1 4 0v5" />
                    <path d="M9 11V9a2 2 0 1 0-4 0v6c0 3 2 6 5 6h2a5 5 0 0 0 5-5v-4a2 2 0 1 0-4 0" />
                    <path d="M13 11V7a2 2 0 1 1 4 0v4" />
                  </svg>
                </div>

                {/* Hairline divider */}
                <div
                  className="h-px w-10"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(229,197,137,0.4), transparent)' }}
                />

                {/* The text */}
                <Eyebrow as="p">{t.tapToReveal}</Eyebrow>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
