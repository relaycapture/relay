import React from 'react';
import { interpolate, spring, useCurrentFrame } from 'remotion';
import { CameraKeyframe } from '../types';

interface CameraZoomProps {
  children: React.ReactNode;
  keyframes: CameraKeyframe[];
  fps?: number;
}

export function CameraZoom({ children, keyframes, fps = 60 }: CameraZoomProps) {
  const frame = useCurrentFrame();

  // Find active camera keyframe
  let activeKf: CameraKeyframe | null = null;

  for (const kf of keyframes) {
    if (frame >= kf.startFrame && frame <= kf.endFrame) {
      activeKf = kf;
      break;
    }
  }

  let scale = 1;
  let originX = 50;
  let originY = 50;

  if (activeKf) {
    const duration = Math.max(1, activeKf.endFrame - activeKf.startFrame);
    const frameSinceStart = frame - activeKf.startFrame;

    // Smooth spring zoom transition
    const progress = spring({
      frame: frameSinceStart,
      fps,
      config: { damping: 20, mass: 0.8, stiffness: 90 },
      durationInFrames: Math.min(45, duration),
    });

    const clampedProgress = Math.min(1, Math.max(0, progress));

    scale = interpolate(clampedProgress, [0, 1], [activeKf.startScale, activeKf.endScale]);
    originX = interpolate(clampedProgress, [0, 1], [activeKf.startOriginX, activeKf.endOriginX]);
    originY = interpolate(clampedProgress, [0, 1], [activeKf.startOriginY, activeKf.endOriginY]);
  }

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: `${originX}% ${originY}%`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
