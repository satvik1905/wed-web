'use client';

import { useState, useRef, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from 'framer-motion';

// ── Tokens ────────────────────────────────────────────────────────────────────

const GOLD       = '#D4AF37';
const GOLD_LIGHT = '#f5e272';
const PLEAT_N    = 18;   // total fold columns across SVG_W — ~8–9 visible when open
const SVG_W      = 500;
const SVG_H      = 1000;
const THRESHOLD  = 0.80;

// ── Math helpers ──────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Ease-in-out cubic: slow start/end, fast middle — feels like fabric catching air
const eio = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ── Curtain shape ─────────────────────────────────────────────────────────────

interface Shape {
  clipPath:  string; // closed polygon used for <clipPath>
  innerEdge: string; // open bezier path of the inner edge (for gold seam stroke)
  tieX:      number;
  tieY:      number;
  innerTopX: number; // x where inner edge meets the top rod
  botX:      number; // x where inner tail meets the bottom
}

/**
 * Produces the theatrical tied-back silhouette.
 * c=0 → full rectangle (curtain closed).
 * c=1 → classic swag drape matching the reference image.
 *
 * Left panel coordinate space: x=0 = screen-left, x=SVG_W = screen-center.
 * Right panel: x=0 = screen-center, x=SVG_W = screen-right.
 */
function getShape(side: 'left' | 'right', rawC: number): Shape {
  const c = eio(Math.max(0, Math.min(1, rawC)));
  const W = SVG_W, H = SVG_H;

  if (side === 'left') {
    // Inner edge key x-positions (right side of left curtain)
    const iTop = lerp(W, W * 0.46, c); // meets top rod close to screen-center
    const tieX = lerp(W, W * 0.13, c); // narrowest — the "tieback" x
    const tieY = H * 0.52;             // ~52% down (fixed)
    const botX = lerp(W, W * 0.37, c); // tail at bottom

    // Upper drape: from iTop down to tieback
    const uc1x = lerp(W, W * 0.54, c); // slight outward bow (toward center) near top
    const uc2x = lerp(W, W * 0.14, c); // rushes hard toward tieback

    // Lower tail: from tieback down to bottom
    const lc1x = lerp(W, W * 0.10, c); // continues tight from tieback
    const lc2x = lerp(W, W * 0.44, c); // fans back toward center for the tail

    const innerEdge = [
      `M ${iTop} 0`,
      `C ${uc1x} ${H * 0.18} ${uc2x} ${H * 0.46} ${tieX} ${tieY}`,
      `C ${lc1x} ${H * 0.63} ${lc2x} ${H * 0.84} ${botX} ${H}`,
    ].join(' ');

    const clipPath = `M 0 0 L ${iTop} 0 ${innerEdge.slice(2)} L 0 ${H} Z`;

    return { clipPath, innerEdge, tieX, tieY, innerTopX: iTop, botX };
  }

  // ── Right panel (perfect mirror) ─────────────────────────────────────────
  const iTop = lerp(0, W * 0.54, c);
  const tieX = lerp(0, W * 0.87, c);
  const tieY = H * 0.52;
  const botX = lerp(0, W * 0.63, c);

  const uc1x = lerp(0, W * 0.46, c);
  const uc2x = lerp(0, W * 0.86, c);
  const lc1x = lerp(0, W * 0.90, c);
  const lc2x = lerp(0, W * 0.56, c);

  const innerEdge = [
    `M ${iTop} 0`,
    `C ${uc1x} ${H * 0.18} ${uc2x} ${H * 0.46} ${tieX} ${tieY}`,
    `C ${lc1x} ${H * 0.63} ${lc2x} ${H * 0.84} ${botX} ${H}`,
  ].join(' ');

  const clipPath = `M ${W} 0 L ${iTop} 0 ${innerEdge.slice(2)} L ${W} ${H} Z`;

  return { clipPath, innerEdge, tieX, tieY, innerTopX: iTop, botX };
}

// ── Multi-stop fold gradient stops ───────────────────────────────────────────

/**
 * Generates gradient stops for PLEAT_N fold columns tiled across SVG_W.
 * Each column: deep valley shadow → rich crimson → peak highlight → shadow.
 * Odd/even columns alternate peak brightness to create fabric rhythm.
 */
function FoldGradientStops({ n }: { n: number }) {
  const stops: Array<{ offset: string; color: string; opacity?: number }> = [];

  for (let i = 0; i < n; i++) {
    const lo  = i / n;
    const mid = (i + 0.5) / n;
    const hi  = (i + 1) / n;
    const alt = i % 2 === 1;

    // Deep burgundy-maroon peaks (not bright red — matches the reference)
    const peak = alt ? '#9e1e1e' : '#b52525';
    const mid1 = alt ? '#3e0808' : '#540c0c';

    stops.push(
      { offset: pct(lo),                  color: '#070000' },
      { offset: pct(lo + 0.16 / n),       color: mid1      },
      { offset: pct(mid),                 color: peak      },
      { offset: pct(hi - 0.16 / n),       color: mid1      },
    );
    if (i < n - 1) {
      stops.push({ offset: pct(hi), color: '#070000' });
    }
  }
  stops.push({ offset: '100%', color: '#070000' });

  return (
    <>
      {stops.map((s, i) => (
        <stop key={i} offset={s.offset} stopColor={s.color} />
      ))}
    </>
  );
}

function pct(v: number) {
  return `${(v * 100).toFixed(2)}%`;
}

// ── Static SVG defs ───────────────────────────────────────────────────────────

function PanelDefs({ uid }: { uid: string }) {
  return (
    <defs>
      {/*
        Multi-stop fold gradient — userSpaceOnUse so the fold columns tile
        consistently at fixed x-positions regardless of clip shape.
        Left panel: outer folds (low x) stay visible when open.
        Right panel: outer folds (high x) stay visible when open.
      */}
      <linearGradient
        id={`folds-${uid}`}
        x1="0" y1="0" x2={SVG_W} y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <FoldGradientStops n={PLEAT_N} />
      </linearGradient>

      {/*
        Depth gradient — darkens top (pelmet shadow) and bottom hem.
        Layered over folds at low opacity for spatial depth.
      */}
      <linearGradient id={`depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#000" stopOpacity="0.55" />
        <stop offset="12%"  stopColor="#000" stopOpacity="0.12" />
        <stop offset="65%"  stopColor="#000" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.40" />
      </linearGradient>

      {/*
        Velvet nap filter — feTurbulence produces directional fiber noise.
        feBlend overlay enhances local contrast so fold peaks catch more light
        and shadow valleys go deeper. Gives the velvet "pile" quality.
      */}
      <filter
        id={`vt-${uid}`}
        x="0%" y="0%" width="100%" height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.70 0.022"
          numOctaves="5"
          seed="13"
          stitchTiles="stitch"
          result="grain"
        />
        <feColorMatrix in="grain" type="saturate" values="0" result="mono" />
        <feComponentTransfer in="mono" result="scaled">
          <feFuncR type="linear" slope="0.32" intercept="0.03" />
          <feFuncG type="linear" slope="0.32" intercept="0.03" />
          <feFuncB type="linear" slope="0.32" intercept="0.03" />
        </feComponentTransfer>
        <feBlend in="SourceGraphic" in2="scaled" mode="overlay" result="napped" />
        <feComposite in="napped" in2="SourceGraphic" operator="in" />
      </filter>

      {/*
        Edge displacement filter — wobbles the curtain silhouette by ≤3px
        so the fabric edge looks cut/draped rather than geometric.
      */}
      <filter id={`edge-${uid}`} x="-2%" y="0%" width="104%" height="100%">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.012 0.42"
          numOctaves="3"
          seed="5"
          result="warp"
        />
        <feDisplacementMap
          in="SourceGraphic" in2="warp"
          scale="3.5"
          xChannelSelector="R" yChannelSelector="G"
        />
      </filter>

      {/* Gold seam gradient (vertical, brightest mid-drop) */}
      <linearGradient id={`gs-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor={GOLD}       stopOpacity="0.15" />
        <stop offset="18%"  stopColor={GOLD_LIGHT} stopOpacity="0.92" />
        <stop offset="55%"  stopColor={GOLD_LIGHT} stopOpacity="1.00" />
        <stop offset="82%"  stopColor={GOLD_LIGHT} stopOpacity="0.92" />
        <stop offset="100%" stopColor={GOLD}       stopOpacity="0.15" />
      </linearGradient>

      {/* Pelmet / top rod */}
      <linearGradient id={`rod-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#030000" />
        <stop offset="55%"  stopColor="#110000" />
        <stop offset="100%" stopColor="#070000" />
      </linearGradient>

      {/* Gold tape trim under pelmet */}
      <linearGradient id={`tape-${uid}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor={GOLD}       stopOpacity="0.35" />
        <stop offset="20%"  stopColor={GOLD_LIGHT} stopOpacity="1.00" />
        <stop offset="80%"  stopColor={GOLD_LIGHT} stopOpacity="1.00" />
        <stop offset="100%" stopColor={GOLD}       stopOpacity="0.35" />
      </linearGradient>
    </defs>
  );
}

// ── CurtainPanel ──────────────────────────────────────────────────────────────

interface PanelProps {
  side: 'left' | 'right';
  onOpen: () => void;
}

function CurtainPanel({ side, onOpen }: PanelProps) {
  const uid = side;

  const compression = useMotionValue(0);
  const [c, setC]   = useState(0);
  useMotionValueEvent(compression, 'change', setC);

  const dragging  = useRef(false);
  const startX    = useRef(0);
  const panelPxW  = useRef(0);
  const openedRef = useRef(false);

  // ── Pointer drag ────────────────────────────────────────────────────────────

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    startX.current   = e.clientX;
    panelPxW.current = e.currentTarget.getBoundingClientRect().width;
    navigator.vibrate?.(10);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx  = e.clientX - startX.current;
    // Left panel: drag left (negative dx) opens. Right: drag right (positive).
    const raw = (side === 'left' ? -dx : dx) / panelPxW.current;
    // Elastic resistance outside [0,1]
    const val =
      raw < 0 ? raw * 0.07 :
      raw > 1 ? 1 + (raw - 1) * 0.07 :
      raw;
    compression.set(Math.max(-0.04, Math.min(1.04, val)));
  }, [side, compression]);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const cur = compression.get();
    if (cur >= THRESHOLD && !openedRef.current) {
      openedRef.current = true;
      navigator.vibrate?.([12, 50, 10]);
      animate(compression, 1, {
        type: 'spring', stiffness: 100, damping: 18,
        onComplete: onOpen,
      });
    } else {
      animate(compression, 0, { type: 'spring', stiffness: 95, damping: 22 });
    }
  }, [compression, onOpen]);

  // ── Derived geometry ─────────────────────────────────────────────────────────

  const safeC = Math.max(0, c);
  const shape = getShape(side, safeC);

  // Rings bunch from outer edge toward innerTopX as curtain opens
  const RING_N  = 9;
  const ringRx  = Math.max(2.5, 5.5 * (1 - safeC * 0.55));
  const ringSpan =
    side === 'left'
      ? shape.innerTopX                   // spans 0 → innerTopX
      : SVG_W - shape.innerTopX;          // spans innerTopX → SVG_W

  // Tieback glow: subtle warm radial that reveals at the gathered point as c grows
  const glowOpacity = Math.min(1, safeC * 1.8);

  return (
    <motion.div
      className="absolute top-0 h-full pointer-events-none"
      style={{ [side]: 0, width: '50%', willChange: 'transform' }}
      exit={{
        x: side === 'left' ? '-108%' : '108%',
        transition: { type: 'spring', stiffness: 200, damping: 28 },
      }}
    >
      {/* ── Fabric SVG ─────────────────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <PanelDefs uid={uid} />

        {/* Dynamic defs — update each frame with c */}
        <defs>
          <clipPath id={`clip-${uid}`}>
            <path d={shape.clipPath} />
          </clipPath>

          {/*
            Tieback radial glow: warm light at the gathered point.
            Simulates ambient light catching the bunched fabric.
            cx/cy track tieX/tieY which only change horizontally.
          */}
          <radialGradient
            id={`rg-${uid}`}
            cx={shape.tieX}
            cy={shape.tieY}
            r={SVG_W * 0.38}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#b01818" stopOpacity={0.38 * glowOpacity} />
            <stop offset="55%"  stopColor="#600808" stopOpacity={0.14 * glowOpacity} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/*
          ── Fabric layers (all clipped to curtain silhouette) ──────────────
          Render order (back to front):
          1. Fold gradient — the base velvet color + pleat columns
          2. Velvet nap pass — texture filter at partial opacity
          3. Depth gradient — darkens top/bottom for spatial realism
          4. Tieback glow — warm radial at the gathered point
        */}
        <g clipPath={`url(#clip-${uid})`}>
          {/* 1. Base fold-gradient (organic displaced edges) */}
          <rect
            x="0" y="0" width={SVG_W} height={SVG_H}
            fill={`url(#folds-${uid})`}
            filter={`url(#edge-${uid})`}
          />

          {/* 2. Velvet nap texture overlay */}
          <rect
            x="0" y="0" width={SVG_W} height={SVG_H}
            fill={`url(#folds-${uid})`}
            filter={`url(#vt-${uid})`}
            opacity="0.42"
          />

          {/* 3. Vertical depth darkening */}
          <rect
            x="0" y="0" width={SVG_W} height={SVG_H}
            fill={`url(#depth-${uid})`}
          />

          {/* 4. Tieback warm glow */}
          <rect
            x="0" y="0" width={SVG_W} height={SVG_H}
            fill={`url(#rg-${uid})`}
          />
        </g>

        {/* ── Gold inner-edge seam ── stroked on just the curved inner edge ── */}
        <path
          d={shape.innerEdge}
          fill="none"
          stroke={`url(#gs-${uid})`}
          strokeWidth="2.5"
          opacity="0.85"
        />

        {/* ── Pelmet bar ─────────────────────────────────────────────────── */}
        <rect x="0" y="0" width={SVG_W} height={24} fill={`url(#rod-${uid})`} />
        {/* Gold tape on the pelmet bottom edge */}
        <rect x="0" y="20" width={SVG_W} height={4} fill={`url(#tape-${uid})`} />

        {/* ── Curtain rings — bunch toward wall as curtain opens ──────────── */}
        {Array.from({ length: RING_N }, (_, i) => {
          const t  = (i + 0.5) / RING_N;
          const rx =
            side === 'left'
              ? t * ringSpan
              : shape.innerTopX + t * ringSpan;
          return (
            <g key={i}>
              {/* Shadow */}
              <ellipse
                cx={rx} cy={12.5}
                rx={ringRx + 0.5} ry={4.5}
                fill="none" stroke="#000" strokeWidth="1" opacity="0.38"
              />
              {/* Ring */}
              <ellipse
                cx={rx} cy={11.5}
                rx={ringRx} ry={4}
                fill="none" stroke={GOLD} strokeWidth="1.6" opacity="0.88"
              />
              {/* Highlight specular */}
              <ellipse
                cx={rx - ringRx * 0.28} cy={9.5}
                rx={ringRx * 0.28} ry={1.3}
                fill={GOLD_LIGHT} opacity="0.52"
              />
            </g>
          );
        })}
      </svg>

      {/* ── Drag overlay (pointer-events enabled here only) ─────────────── */}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none', pointerEvents: 'auto' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </motion.div>
  );
}

// ── Root Curtain ──────────────────────────────────────────────────────────────

interface CurtainProps {
  /** Fired once either panel snaps fully open. */
  onReveal?: () => void;
  /**
   * If true (default) the panels stay as a decorative frame after opening —
   * matching the reference image. Pass false to unmount them after reveal.
   */
  persistent?: boolean;
  children?: React.ReactNode;
}

export default function Curtain({
  onReveal,
  persistent = true,
  children,
}: CurtainProps) {
  const [revealed, setRevealed] = useState(false);

  const handleOpen = useCallback(() => {
    if (!persistent) setRevealed(true);
    onReveal?.();
  }, [persistent, onReveal]);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-black">
      {/* Content to reveal sits underneath the curtains */}
      {children}

      {/* Closed-seam center shadow — subtle depth between panels when shut */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="seam-shadow"
            className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-4 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(0,0,0,0.45), transparent)',
            }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Curtain panels */}
      <AnimatePresence>
        {!revealed && (
          <CurtainPanel key="left"  side="left"  onOpen={handleOpen} />
        )}
        {!revealed && (
          <CurtainPanel key="right" side="right" onOpen={handleOpen} />
        )}
      </AnimatePresence>
    </div>
  );
}
