'use client';

import confetti from 'canvas-confetti';

/**
 * Fires a high-energy celebratory party confetti animation blowing upwards from the bottom of the screen.
 * Staggered across multiple cannon angles and bursts for a rich, dynamic party effect.
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
    '#ff6b35', // Warm Coral
  ];

  const zIndex = 999999;

  // Wave 1: Immediate massive triple cannon from bottom-left, center, and bottom-right
  // Left cannon shooting up-right
  confetti({
    particleCount: 90,
    angle: 65,
    spread: 75,
    origin: { x: 0.1, y: 1.0 },
    startVelocity: 75,
    colors,
    zIndex,
    ticks: 350,
    gravity: 0.85,
    scalar: 1.15,
  });

  // Right cannon shooting up-left
  confetti({
    particleCount: 90,
    angle: 115,
    spread: 75,
    origin: { x: 0.9, y: 1.0 },
    startVelocity: 75,
    colors,
    zIndex,
    ticks: 350,
    gravity: 0.85,
    scalar: 1.15,
  });

  // Center super-cannon shooting straight up and spreading wide
  confetti({
    particleCount: 120,
    angle: 90,
    spread: 100,
    origin: { x: 0.5, y: 1.0 },
    startVelocity: 85,
    colors,
    zIndex,
    ticks: 400,
    gravity: 0.9,
    scalar: 1.25,
  });

  // Wave 2: Staggered secondary explosion with high altitude spread (+180ms)
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 75,
      spread: 60,
      origin: { x: 0.25, y: 0.98 },
      startVelocity: 65,
      colors,
      zIndex,
      ticks: 300,
      gravity: 0.95,
      scalar: 1.0,
    });

    confetti({
      particleCount: 70,
      angle: 105,
      spread: 60,
      origin: { x: 0.75, y: 0.98 },
      startVelocity: 65,
      colors,
      zIndex,
      ticks: 300,
      gravity: 0.95,
      scalar: 1.0,
    });
  }, 180);

  // Wave 3: Grand finale micro-shower (+350ms)
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 120,
      origin: { x: 0.5, y: 0.95 },
      startVelocity: 60,
      colors,
      zIndex,
      ticks: 300,
      gravity: 1.0,
      scalar: 0.9,
    });
  }, 350);
}
