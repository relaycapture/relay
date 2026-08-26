export type ActiveTab = 'cloudflare' | 'make' | 'gmail';

export interface CursorKeyframe {
  frame: number;
  x: number; // percentage (0-100) or pixel coordinate in 1920x1080 canvas
  y: number;
  action?: 'none' | 'click' | 'type' | 'drag';
  label?: string;
  duration?: number;
}

export interface CameraKeyframe {
  startFrame: number;
  endFrame: number;
  startScale: number;
  endScale: number;
  startOriginX: number; // percentage 0-100
  startOriginY: number; // percentage 0-100
  endOriginX: number;
  endOriginY: number;
}

export interface VideoConfigProps {
  primaryDomain?: string;
  senderName?: string;
  prospectName?: string;
}
