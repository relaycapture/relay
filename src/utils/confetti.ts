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

  // Wave 1: Corner cannons shooting up towards center
  // Bottom-left corner shooting up-right towards center (55 degrees, higher velocity to cross center)
  confetti({
    particleCount: 95,
    angle: 55,
    spread: 85,
    origin: { x: 0, y: 0.95 },
    startVelocity: 85,
    decay: 0.92,
    colors,
    zIndex,
    ticks: 350,
    gravity: 0.7,
    scalar: 1.0,
  });

  // Bottom-right corner shooting up-left towards center (125 degrees, higher velocity to cross center)
  confetti({
    particleCount: 95,
    angle: 125,
    spread: 85,
    origin: { x: 1, y: 0.95 },
    startVelocity: 85,
    decay: 0.92,
    colors,
    zIndex,
    ticks: 350,
    gravity: 0.7,
    scalar: 1.0,
  });

  // Wave 2: Subtle secondary puff (+200ms) for organic flutter reaching center
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 55,
      spread: 75,
      origin: { x: 0.02, y: 0.98 },
      startVelocity: 72,
      decay: 0.92,
      colors,
      zIndex,
      ticks: 300,
      gravity: 0.75,
      scalar: 0.7,
    });

    confetti({
      particleCount: 45,
      angle: 125,
      spread: 75,
      origin: { x: 0.98, y: 0.98 },
      startVelocity: 72,
      decay: 0.92,
      colors,
      zIndex,
      ticks: 300,
      gravity: 0.75,
      scalar: 0.7,
    });
  }, 200);
}

