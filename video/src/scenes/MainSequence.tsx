import React from 'react';
import { useCurrentFrame, AbsoluteFill } from 'remotion';
import { BrowserShell } from '../components/BrowserShell';
import { Cursor } from '../components/Cursor';
import { CameraZoom } from '../components/CameraZoom';
import { CloudflareScene } from './CloudflareScene';
import { MakeScene } from './MakeScene';
import { GmailScene } from './GmailScene';
import { ActiveTab, CursorKeyframe, CameraKeyframe } from '../types';

export function MainSequence() {
  const frame = useCurrentFrame();

  // 1. Tab State Timeline (60 seconds = 3600 frames at 60fps)
  let activeTab: ActiveTab = 'cloudflare';
  if (frame >= 1200 && frame < 2400) {
    activeTab = 'make';
  } else if (frame >= 2400) {
    activeTab = 'gmail';
  }

  // 2. Cursor Keyframe Timeline across the full 60s video
  const cursorKeyframes: CursorKeyframe[] = [
    // --- ACT 1: CLOUDFLARE (0s - 20s / Frames 0 - 1200) ---
    { frame: 0, x: 960, y: 540, action: 'none' },
    { frame: 60, x: 650, y: 220, action: 'none', label: 'INSPECTING DNS' },
    { frame: 120, x: 740, y: 255, action: 'type', duration: 240, label: 'TYPING DMARC' },
    { frame: 380, x: 740, y: 255, action: 'none' },
    { frame: 450, x: 1720, y: 110, action: 'click', label: 'SAVING' },
    { frame: 500, x: 1720, y: 110, action: 'none' },
    { frame: 700, x: 960, y: 380, action: 'none', label: 'VALIDATING' },
    { frame: 1140, x: 960, y: 35, action: 'none' },
    { frame: 1200, x: 960, y: 35, action: 'click', label: 'SWITCHING TAB' },

    // --- ACT 2: MAKE.COM (20s - 40s / Frames 1200 - 2400) ---
    { frame: 1260, x: 270, y: 330, action: 'none', label: 'INSPECTING WEBHOOK' },
    { frame: 1380, x: 990, y: 330, action: 'none', label: 'ROUTING TELEMETRY' },
    { frame: 1480, x: 990, y: 330, action: 'click', label: 'DRAGGING CONNECTOR' },
    { frame: 1530, x: 1330, y: 450, action: 'click', label: 'SNAPPING TWILIO NODE' },
    { frame: 1620, x: 1330, y: 450, action: 'none' },
    { frame: 1860, x: 1720, y: 110, action: 'click', label: 'TRIGGERING RUN' },
    { frame: 1920, x: 1720, y: 110, action: 'none' },
    { frame: 2340, x: 1180, y: 35, action: 'none' },
    { frame: 2400, x: 1180, y: 35, action: 'click', label: 'SWITCHING TAB' },

    // --- ACT 3: GMAIL SARAH CHEN (40s - 60s / Frames 2400 - 3600) ---
    { frame: 2460, x: 120, y: 260, action: 'none', label: 'SPAM FOLDER' },
    { frame: 2540, x: 600, y: 220, action: 'none', label: 'FLAGGED PROPOSAL' },
    { frame: 2640, x: 120, y: 160, action: 'click', label: 'ENFORCING RFC 7489' },
    { frame: 2760, x: 600, y: 220, action: 'click', label: 'AUTHENTICATED' },
    { frame: 3100, x: 600, y: 320, action: 'none', label: 'VERIFIED' },
    { frame: 3500, x: 960, y: 540, action: 'none', label: 'ALL SYSTEMS GO' },
    { frame: 3600, x: 960, y: 540, action: 'none' },
  ];

  // 3. Dynamic Camera Focal Zooms
  const cameraKeyframes: CameraKeyframe[] = [
    // Intro wide overview
    { startFrame: 0, endFrame: 80, startScale: 1.0, endScale: 1.0, startOriginX: 50, startOriginY: 50, endOriginX: 50, endOriginY: 50 },
    // Act 1: Zoom in on Cloudflare DMARC Editor Row
    { startFrame: 80, endFrame: 540, startScale: 1.0, endScale: 1.48, startOriginX: 50, startOriginY: 50, endOriginX: 42, endOriginY: 28 },
    // Act 1 Pull back to header
    { startFrame: 540, endFrame: 1180, startScale: 1.48, endScale: 1.05, startOriginX: 42, startOriginY: 28, endOriginX: 50, endOriginY: 50 },
    // Act 2: Zoom in on Make.com Router & Twilio Node Snap
    { startFrame: 1220, endFrame: 1750, startScale: 1.0, endScale: 1.42, startOriginX: 50, startOriginY: 50, endOriginX: 62, endOriginY: 40 },
    // Act 2 Pull back
    { startFrame: 1750, endFrame: 2380, startScale: 1.42, endScale: 1.05, startOriginX: 62, startOriginY: 40, endOriginX: 50, endOriginY: 50 },
    // Act 3: Zoom in on Gmail Inbox Auth Pass
    { startFrame: 2420, endFrame: 3200, startScale: 1.0, endScale: 1.45, startOriginX: 50, startOriginY: 50, endOriginX: 45, endOriginY: 26 },
    // Outro Pull back to full 1.0 beauty shot
    { startFrame: 3200, endFrame: 3600, startScale: 1.45, endScale: 1.0, startOriginX: 45, startOriginY: 26, endOriginX: 50, endOriginY: 50 },
  ];

  return (
    <AbsoluteFill className="bg-[#050508] flex items-center justify-center p-8 overflow-hidden">
      {/* Dynamic Camera Zoom Container */}
      <CameraZoom keyframes={cameraKeyframes}>
        <BrowserShell activeTab={activeTab}>
          {activeTab === 'cloudflare' && <CloudflareScene sceneStartFrame={0} />}
          {activeTab === 'make' && <MakeScene sceneStartFrame={1200} />}
          {activeTab === 'gmail' && <GmailScene sceneStartFrame={2400} />}
        </BrowserShell>
      </CameraZoom>

      {/* Programmatic Relay Cursor Engine */}
      <Cursor keyframes={cursorKeyframes} />
    </AbsoluteFill>
  );
}
