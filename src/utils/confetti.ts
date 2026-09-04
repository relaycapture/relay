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
  // Bottom-left corner shooting up-right towards center (60 degrees)
  confetti({
    particleCount: 45,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.95 },
    startVelocity: 55,
    colors,
    zIndex,
    ticks: 250,
    gravity: 0.9,
    scalar: 1.0,
  });

  // Bottom-right corner shooting up-left towards center (120 degrees)
  confetti({
    particleCount: 45,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.95 },
    startVelocity: 55,
    colors,
    zIndex,
    ticks: 250,
    gravity: 0.9,
    scalar: 1.0,
  });

  // Wave 2: Subtle secondary puff (+150ms) for organic flutter
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 45,
      origin: { x: 0.02, y: 0.98 },
      startVelocity: 45,
      colors,
      zIndex,
      ticks: 200,
      gravity: 0.95,
      scalar: 0.9,
    });

    confetti({
      particleCount: 25,
      angle: 120,
      spread: 45,
      origin: { x: 0.98, y: 0.98 },
      startVelocity: 45,
      colors,
      zIndex,
      ticks: 200,
      gravity: 0.95,
      scalar: 0.9,
    });
  }, 150);
}

