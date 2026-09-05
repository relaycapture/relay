'use client';

import confetti from 'canvas-confetti';

/**
 * Fires a clean, refined party confetti burst from both bottom corners
 * angling upwards towards the center.
 */
export function triggerPartyConfetti() {
  if (typeof window === 'undefined') return;

  const colors = [
    '#00f0ff', // Electric Cyan
    '#a855f7', // Vivid Purple
    '#ff2e93', // Neon Hot Pink
    '#ffde59', // Golden Spark
    '#00f59b', // Emerald Mint
    '#ffffff', // Pure White
  ];

  const zIndex = 999999;

  // Wave 1: Corner cannons shooting up-inward towards center
  // Bottom-left corner shooting up-right towards center (55 degrees, high velocity & low decay to cross center)
  confetti({
    particleCount: 95,
    angle: 55,
    spread: 60,
    origin: { x: 0, y: 0.95 },
    startVelocity: 60,
    decay: 0.925,
    colors,
    zIndex,
    ticks: 320,
    gravity: 0.72,
    scalar: 1.05,
  });

  // Bottom-right corner shooting up-left towards center (125 degrees, high velocity & low decay to cross center)
  confetti({
    particleCount: 95,
    angle: 125,
    spread: 60,
    origin: { x: 1, y: 0.95 },
    startVelocity: 60,
    decay: 0.925,
    colors,
    zIndex,
    ticks: 320,
    gravity: 0.72,
    scalar: 1.05,
  });

  // Wave 2: Secondary accent blast (+220ms) reaching the center
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 55,
      spread: 50,
      origin: { x: 0.02, y: 0.98 },
      startVelocity: 44,
      decay: 0.925,
      colors,
      zIndex,
      ticks: 260,
      gravity: 0.78,
      scalar: 0.85,
    });

    confetti({
      particleCount: 45,
      angle: 125,
      spread: 50,
      origin: { x: 0.98, y: 0.98 },
      startVelocity: 44,
      decay: 0.925,
      colors,
      zIndex,
      ticks: 260,
      gravity: 0.78,
      scalar: 0.85,
    });
  }, 220);
}

