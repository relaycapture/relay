'use client';

import confetti from 'canvas-confetti';

/**
 * Fires a clean, refined party confetti burst from both bottom corners
 * angling upwards towards the center of the screen.
 */
export function triggerPartyConfetti() {
  if (typeof window === 'undefined') return;

  const colors = [
    '#ffffff', // Clean white
    '#00f0ff', // Electric cyan
    '#a855f7', // Vivid purple
    '#ffde59', // Golden accent
    '#ff2e93', // Hot pink
    '#00f59b', // Mint green
  ];

  const zIndex = 999999;
  const particleCount = 45;
  const startVelocity = 58;
  const spread = 52;
  const gravity = 1.0;
  const ticks = 240;

  // Bottom-Left Corner -> shoots up and right towards center (angle 60°)
  confetti({
    particleCount,
    angle: 60,
    spread,
    origin: { x: 0, y: 1.0 },
    startVelocity,
    colors,
    zIndex,
    ticks,
    gravity,
    scalar: 1.0,
  });

  // Bottom-Right Corner -> shoots up and left towards center (angle 120°)
  confetti({
    particleCount,
    angle: 120,
    spread,
    origin: { x: 1.0, y: 1.0 },
    startVelocity,
    colors,
    zIndex,
    ticks,
    gravity,
    scalar: 1.0,
  });
}
