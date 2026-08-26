'use client';

/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react';


type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const vertexShaderSource = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.65 +
                  0.35 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern * 1.25) - (rnd / 18.0 * uNoiseIntensity);
  col.a = 1.0;
  gl_FragColor = col;
}
`;

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 2.5,
  scale = 0.8,
  color = '#1e1a26',
  noiseIntensity = 1.8,
  rotation = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const propsRef = useRef({ speed, scale, color, noiseIntensity, rotation });
  propsRef.current = { speed, scale, color, noiseIntensity, rotation };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    // Helper to compile shader
    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uColorLoc = gl.getUniformLocation(program, 'uColor');
    const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
    const uScaleLoc = gl.getUniformLocation(program, 'uScale');
    const uRotationLoc = gl.getUniformLocation(program, 'uRotation');
    const uNoiseLoc = gl.getUniformLocation(program, 'uNoiseIntensity');

    let startTime = performance.now();

    // Sizing function using offsetWidth / offsetHeight (handles CSS transform scale perfectly)
    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const parent = canvas.parentElement;
      const w = parent.offsetWidth || parent.clientWidth || 300;
      const h = parent.offsetHeight || parent.clientHeight || 300;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let isRunning = true;
    let isVisible = true;

    const render = () => {
      if (!isRunning || !isVisible) return;

      const now = performance.now();
      const timeElapsed = (now - startTime) / 1000;
      const p = propsRef.current;
      const rgb = hexToNormalizedRGB(p.color);

      gl.useProgram(program);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, timeElapsed);
      if (uSpeedLoc) gl.uniform1f(uSpeedLoc, p.speed);
      if (uScaleLoc) gl.uniform1f(uScaleLoc, p.scale);
      if (uNoiseLoc) gl.uniform1f(uNoiseLoc, p.noiseIntensity);
      if (uRotationLoc) gl.uniform1f(uRotationLoc, p.rotation);
      if (uColorLoc) gl.uniform3f(uColorLoc, rgb[0], rgb[1], rgb[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    // Viewport-gated Intersection Observer (stops burning GPU when off-screen)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const visible = entry?.isIntersecting ?? true;
        if (visible !== isVisible) {
          isVisible = visible;
          if (isVisible && isRunning) {
            if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
            animFrameIdRef.current = requestAnimationFrame(render);
          } else if (!isVisible && animFrameIdRef.current) {
            cancelAnimationFrame(animFrameIdRef.current);
          }
        }
      },
      { rootMargin: '600px 0px' }
    );
    intersectionObserver.observe(canvas);

    // Context loss prevention / cleanup
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default Silk;
