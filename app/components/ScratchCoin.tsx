'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Numeral } from './Typography';

// Conic gradient color stops — 4 light spokes at 0°, 90°, 180°, 270°
// with dark wedges between them. 8 stops, soft transitions.
const LIGHT: [number, number, number] = [0xE8, 0xC7, 0x7A]; // #E8C77A
const MID:   [number, number, number] = [0xC9, 0x9A, 0x4F]; // #C99A4F
const DARK:  [number, number, number] = [0x9A, 0x76, 0x35]; // #9A7635

// Stops placed around 360° — each spoke is a soft peak at its angle
const CONIC_STOPS: Array<{ at: number; rgb: [number, number, number] }> = [
  { at: 0,     rgb: LIGHT },
  { at: 0.06,  rgb: MID   },
  { at: 0.125, rgb: DARK  },
  { at: 0.19,  rgb: MID   },
  { at: 0.25,  rgb: LIGHT },
  { at: 0.31,  rgb: MID   },
  { at: 0.375, rgb: DARK  },
  { at: 0.44,  rgb: MID   },
  { at: 0.50,  rgb: LIGHT },
  { at: 0.56,  rgb: MID   },
  { at: 0.625, rgb: DARK  },
  { at: 0.69,  rgb: MID   },
  { at: 0.75,  rgb: LIGHT },
  { at: 0.81,  rgb: MID   },
  { at: 0.875, rgb: DARK  },
  { at: 0.94,  rgb: MID   },
  { at: 1,     rgb: LIGHT },
];

function sampleConic(t: number): [number, number, number] {
  // t in [0, 1) — find bracketing stops and lerp
  for (let i = 1; i < CONIC_STOPS.length; i++) {
    if (t <= CONIC_STOPS[i].at) {
      const a = CONIC_STOPS[i - 1];
      const b = CONIC_STOPS[i];
      const f = (t - a.at) / (b.at - a.at);
      // Smooth-step for softer transitions
      const s = f * f * (3 - 2 * f);
      return [
        a.rgb[0] + (b.rgb[0] - a.rgb[0]) * s,
        a.rgb[1] + (b.rgb[1] - a.rgb[1]) * s,
        a.rgb[2] + (b.rgb[2] - a.rgb[2]) * s,
      ];
    }
  }
  return LIGHT;
}

interface ScratchCoinProps {
  /** The text revealed underneath when scratched (e.g. "27", "DEC", "2026") */
  revealText: string;
  /** Diameter of the coin in CSS pixels. Default 100. */
  size?: number;
  /** Fires once when the coin crosses the 50% scratched threshold */
  onReveal: () => void;
  /** Optional ARIA label for screen readers */
  ariaLabel?: string;
}

export default function ScratchCoin({
  revealText,
  size = 100,
  onReveal,
  ariaLabel,
}: ScratchCoinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const revealFiredRef = useRef(false);
  const sampleCounterRef = useRef(0);

  // Paint the brushed-metal gold coin via a conic (angular) gradient
  const paintCoin = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2;
    const r2 = r * r;

    ctx.clearRect(0, 0, w, h);

    // Build conic gradient pixel-by-pixel
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;
    const TWO_PI = Math.PI * 2;

    for (let py = 0; py < h; py++) {
      const dy = py - cy;
      for (let px = 0; px < w; px++) {
        const dx = px - cx;
        if (dx * dx + dy * dy > r2) continue; // outside circle
        // Angle 0–1 around center
        let angle = Math.atan2(dy, dx); // -PI to PI
        if (angle < 0) angle += TWO_PI;
        const t = angle / TWO_PI;
        const [cr, cg, cb] = sampleConic(t);
        const idx = (py * w + px) * 4;
        data[idx]     = cr;
        data[idx + 1] = cg;
        data[idx + 2] = cb;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  // Sample the canvas to check how much has been scratched
  const checkProgress = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Sample every ~8th pixel to keep it fast
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 32) {
      total++;
      if (data[i] < 64) transparent++;
    }
    return transparent / total;
  }, []);

  // Erase a circle of pixels around a point
  const erase = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    // Smooth the edge with a softer second pass
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Mount: paint the coin, set up canvas with devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const bw = Math.round(size * dpr);
    const bh = Math.round(size * dpr);
    canvas.width = bw;
    canvas.height = bh;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // paintCoin uses putImageData which bypasses transforms — pass backing size
    paintCoin(ctx, bw, bh);

    // Set up DPR scale for subsequent erase operations (pointer-coordinate space)
    ctx.scale(dpr, dpr);
  }, [size, paintCoin]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const pos = getPointerPos(e);
    if (pos) {
      lastPointRef.current = pos;
      const ctx = canvas.getContext('2d');
      if (ctx) erase(ctx, pos.x, pos.y);
    }
  }, [erase]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPointerPos(e);
    if (!pos) return;

    const last = lastPointRef.current;
    if (last) {
      // Interpolate between last point and current to avoid gaps on fast drags
      const dx = pos.x - last.x;
      const dy = pos.y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 6));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        erase(ctx, last.x + dx * t, last.y + dy * t);
      }
    } else {
      erase(ctx, pos.x, pos.y);
    }
    lastPointRef.current = pos;

    // Progress sampling: check every 6th move event
    // No auto-clear. We just fire onReveal once when the coin crosses 70% scratched
    // so the parent can count toward the confetti trigger. The user keeps scratching freely.
    sampleCounterRef.current++;
    if (sampleCounterRef.current % 6 === 0 && !revealFiredRef.current) {
      const progress = checkProgress(ctx, canvas.width, canvas.height);
      if (progress > 0.7) {
        revealFiredRef.current = true;
        onReveal();
      }
    }
  }, [erase, checkProgress, size, onReveal]);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = false;
    lastPointRef.current = null;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  }, []);

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      role="button"
      aria-label={ariaLabel || `Scratch to reveal ${revealText}`}
    >
      {/* Revealed text — gold on transparent (page bg shows through) */}
      <span className="absolute inset-0 flex items-center justify-center text-center">
        <Numeral style={{ fontSize: size * 0.31 }}>{revealText}</Numeral>
      </span>

      {/* The scratch canvas, on top */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none', borderRadius: '50%' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
  );
}
