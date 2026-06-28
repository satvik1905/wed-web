'use client';

import { useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from 'framer-motion';

// ── Helpers ──────────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const W = 390;
const H = 844;
const PLEAT_N = 12;
const SCALLOP_N = 4;
const SCALLOP_H = 8;

// ── Validated open-state geometry ────────────────────────────────────────────

const OPEN = {
  topInnerX: 0.42 * W,   // 163.8
  waistX: 0.22 * W,      // 85.8
  waistY: 0.42 * H,      // 354.48
  botInnerX: 0.40 * W,   // 156
} as const;

// Inner edge cubic bezier control points (open state)
const OPEN_INNER = {
  c1x: 150.7, c1y: 118.2,
  c2x: 98.7,  c2y: 236.3,
  c3x: 90.1,  c3y: 489.5,
  c4x: 132.6, c4y: 692.1,
} as const;

// ── Scalloped bottom segment ─────────────────────────────────────────────────

function scallops(x0: number, x1: number, y: number): string {
  let s = '';
  for (let i = 0; i < SCALLOP_N; i++) {
    const sx = lerp(x0, x1, i / SCALLOP_N);
    const ex = lerp(x0, x1, (i + 1) / SCALLOP_N);
    const mx = (sx + ex) / 2;
    s += ` Q ${mx} ${y - SCALLOP_H} ${ex} ${y}`;
  }
  return s;
}

// ── Path builders ────────────────────────────────────────────────────────────

function getClipD(c: number): string {
  // Closed: full rectangle  M 0 0 L W 0 L W H L 0 H Z
  // Open: silhouette with inner edge + scalloped bottom

  const topIx = lerp(W, OPEN.topInnerX, c);
  const waistX = lerp(W, OPEN.waistX, c);
  const waistY = OPEN.waistY; // fixed Y
  const botIx = lerp(W, OPEN.botInnerX, c);

  // Inner edge control points interpolate from straight (x=W) to open curves
  const ic1x = lerp(W, OPEN_INNER.c1x, c);
  const ic1y = lerp(OPEN.waistY * 0.33, OPEN_INNER.c1y, c);
  const ic2x = lerp(W, OPEN_INNER.c2x, c);
  const ic2y = lerp(OPEN.waistY * 0.67, OPEN_INNER.c2y, c);
  const ic3x = lerp(W, OPEN_INNER.c3x, c);
  const ic3y = lerp(OPEN.waistY + (H - OPEN.waistY) * 0.28, OPEN_INNER.c3y, c);
  const ic4x = lerp(W, OPEN_INNER.c4x, c);
  const ic4y = lerp(OPEN.waistY + (H - OPEN.waistY) * 0.69, OPEN_INNER.c4y, c);

  const innerEdge = [
    `L ${topIx} 0`,
    `C ${ic1x} ${ic1y} ${ic2x} ${ic2y} ${waistX} ${waistY}`,
    `C ${ic3x} ${ic3y} ${ic4x} ${ic4y} ${botIx} ${H}`,
  ].join(' ');

  const scallopPath = scallops(botIx, 0, H);

  return `M 0 0 ${innerEdge}${scallopPath} Z`;
}

// ── Pleat line geometry ──────────────────────────────────────────────────────

interface PleatEndpoints {
  sx: number; sy: number;
  ex: number; ey: number;
  cx: number; cy: number;
}

function getPleatOpen(i: number): PleatEndpoints {
  const t = (i + 0.5) / PLEAT_N;
  const sx = 8 + t * (OPEN.topInnerX - 16);
  const sy = 0;
  const ex = 4 + t * (OPEN.botInnerX - 8);
  const ey = 840;
  const naturalMidX = sx + (ex - sx) * (OPEN.waistY / H);
  const cx = naturalMidX + (OPEN.waistX * 1.05 - naturalMidX) * 0.55;
  const cy = OPEN.waistY;
  return { sx, sy, ex, ey, cx, cy };
}

function getPleatClosed(i: number): PleatEndpoints {
  const t = (i + 0.5) / PLEAT_N;
  const x = 8 + t * (W - 16);
  return { sx: x, sy: 0, ex: x, ey: 840, cx: x, cy: OPEN.waistY };
}

function pleatD(c: number, i: number): string {
  const open = getPleatOpen(i);
  const closed = getPleatClosed(i);
  const sx = lerp(closed.sx, open.sx, c);
  const sy = lerp(closed.sy, open.sy, c);
  const cx = lerp(closed.cx, open.cx, c);
  const cy = lerp(closed.cy, open.cy, c);
  const ex = lerp(closed.ex, open.ex, c);
  const ey = lerp(closed.ey, open.ey, c);
  return `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
}

// ── CurtainPanel ─────────────────────────────────────────────────────────────

const PLEAT_INDICES = Array.from({ length: PLEAT_N }, (_, i) => i);

function CurtainPanel({
  side,
  cValue,
}: {
  side: 'left' | 'right';
  cValue: MotionValue<number>;
}) {
  const clipD = useTransform(cValue, getClipD);
  const pleatDs = PLEAT_INDICES.map((i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(cValue, (v) => pleatD(v, i))
  );

  return (
    <div
      className="absolute top-0 h-full w-1/2"
      style={{
        [side]: 0,
        transform: side === 'right' ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`panel-clip-${side}`}>
            <motion.path d={clipD} />
          </clipPath>
        </defs>

        {/* Panel fill */}
        <motion.path d={clipD} fill="#C8102E" />

        {/* Pleat lines (clipped to silhouette) */}
        <g clipPath={`url(#panel-clip-${side})`}>
          {pleatDs.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.0"
              opacity="0.9"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CurtainTestPage() {
  const c = useMotionValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(c, 1, { duration: 1.8, ease: [0.32, 0.72, 0, 1] });
    }, 800);
    return () => clearTimeout(timeout);
  }, [c]);

  const handleReplay = useCallback(() => {
    c.set(0);
    setTimeout(() => {
      animate(c, 1, { duration: 1.8, ease: [0.32, 0.72, 0, 1] });
    }, 200);
  }, [c]);

  return (
    <div className="relative min-h-[100svh] w-full bg-[#FCFAF6] overflow-hidden">
      {/* Content behind curtains */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <h1 className="font-serif italic text-6xl md:text-7xl text-stone-800 mb-4">
          Sam &amp; Sofia
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase text-stone-500">
          Save the Date
        </p>
      </div>

      {/* Curtain panels */}
      <CurtainPanel side="left" cValue={c} />
      <CurtainPanel side="right" cValue={c} />

      {/* Replay */}
      <button
        onClick={handleReplay}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full bg-stone-900 text-stone-50 text-xs tracking-widest uppercase hover:bg-stone-700 active:scale-95 transition-transform"
      >
        Replay
      </button>
    </div>
  );
}
