@AGENTS.md

# CLAUDE.md — Project: Karjat Wedding Digital Invitation

## 🎯 Project Overview

A high-fidelity, mobile-first interactive wedding invitation featuring:

1. **The Reveal:** A draggable theater curtain pull with "pleat compression" physics.
2. **The Interaction:** A canvas-based "scratch-off" to reveal the wedding date.
3. **The Payoff:** A programmatic confetti burst and a luxury countdown timer.

## 🎨 Design System (Karjat Luxury Theme)

- **Primary Color:** Deep Crimson (#8B0000) - Velvet texture for curtains.
- **Accent Color:** Champagne Gold (#D4AF37) - Used for the scratch-off and typography.
- **Typography:** Serif (Display) for names; Satoshi (Custom) or high-end Sans for details.
- **Motion:** Heavy, organic spring physics (Stiffness: 100, Damping: 20).

## 🛠 Tech Stack

- **Framework:** Next.js (App Router).
- **Animation:** Framer Motion (Gestures & Transitions).
- **Graphics:** HTML5 Canvas (Scratch-off logic), SVG (Curtain geometry).
- **Haptics:** Browser Vibration API.

## 🏗 Interaction Layers & Implementation Logic

### 1. Curtain Component (`Curtain.tsx`)

- **Visual:** 10-12 SVG rectangles per panel with a linear gradient.
- **Logic:** Use `useMotionValue` for drag 'X'.
- **UX:** Map `scaleX` and `originX` so curtains "bunch" against the screen edges.
- **Trigger:** On drag start, initialize AudioContext (to bypass mobile autoplay blocks).

### 2. Scratch-Off Component (`ScratchCard.tsx`)

- **Logic:** - Render a 2D Canvas context.
  - Layer 1 (Bottom): The "Save the Date" text/graphic.
  - Layer 2 (Top): Canvas with gold fill.
  - Interaction: Use `globalCompositeOperation = 'destination-out'` on `touchmove`.
- **Threshold:** Calculate transparent pixel percentage; trigger "Complete" at 60%.

### 3. Celebration Layer (`Celebration.tsx`)

- **Confetti:** Use `canvas-confetti` on scratch completion.
- **Countdown:** A `useEffect` timer targeting December 2026.

## 📱 Mobile-First Requirements

- **Viewport:** Force `100svh` to prevent mobile browser chrome jumping.
- **Gestures:** Apply `touch-action: none` to the scratch-off canvas to prevent page scrolling during interaction.
- **Performance:** Use `requestAnimationFrame` for canvas drawing to ensure 60fps on mobile Safari.
- **Retina Support:** Scale canvas context by `window.devicePixelRatio`.

## 📂 Command Cheat Sheet

- `npm run dev` - Start development server.
- `npx shadcn-ui@latest add [component]` - Add UI primitives.
- `npx tailwind-config-init` - Re-sync design tokens.

## 🧠 Dev Notes (UX Design Principles)

- **Endowment Effect:** The curtain must resist the user slightly (`dragElastic: 0.1`) to make it feel physical.
- **Micro-delights:** Trigger `navigator.vibrate(15)` when a pleat "compresses" or when the scratch-off completes.
- **Audio:** Fade in the background track only after the first curtain drag.
