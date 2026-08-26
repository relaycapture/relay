'use client';

import React, { useEffect, useRef } from 'react';

import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

#define NUM_LINES 40.0

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = vUv;
    float time = uTime * 0.5;
    
    float line_strength = 0.0;
    
    for (float i = 0.0; i < NUM_LINES; i += 1.0) {
        float t = i / NUM_LINES;
        float wave = sin(uv.x * 3.0 + time + t * 6.28) * uAmplitude;
        wave += cos(uv.x * 5.0 - time * 0.8 + t * 3.14) * (uAmplitude * 0.5);
        
        float dist = distance(uv, uMouse);
        float mouseWave = sin(dist * 10.0 - time * 2.0) * exp(-dist * 3.0) * 0.1;
        wave += mouseWave;
        
        float y = 0.5 + wave + (t - 0.5) * uDistance;
        float line = smoothstep(0.005, 0.0, abs(uv.y - y));
        line_strength += line;
    }

    float colorVal = 1.0 - line_strength;
    
    // Requested gradient colors: white (1,1,1), #a39eb5 (0.639, 0.620, 0.710), #d7fcf8 (0.843, 0.988, 0.973)
    vec3 cWhite = vec3(1.0, 1.0, 1.0);
    vec3 cSilverLavender = vec3(0.6392, 0.6196, 0.7098); // #a39eb5
    vec3 cMintCyan = vec3(0.8431, 0.9882, 0.9725);       // #d7fcf8
    
    vec3 gradientCol;
    if (uv.x < 0.5) {
        gradientCol = mix(cWhite, cSilverLavender, uv.x * 2.0);
    } else {
        gradientCol = mix(cSilverLavender, cMintCyan, (uv.x - 0.5) * 2.0);
    }
    
    vec3 finalCol = gradientCol * uColor;
    fragColor = vec4(finalCol * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const Threads = ({
  color = [1, 1, 1],
  amplitude = 0.2,
  distance = 0.1,
  enableMouseInteraction = true,
  ...rest
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>(0);

  // Keep the latest props in a ref so updating them mutates the live shader
  // uniforms instead of tearing down and rebuilding the whole WebGL context.
  const propsRef = useRef({ color, amplitude, distance, enableMouseInteraction });
  propsRef.current = { color, amplitude, distance, enableMouseInteraction };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: [0.5, 0.5] },
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('resize', resize);

    let targetMouse = [0.5, 0.5];
    let currentMouse = [0.5, 0.5];

    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));
      targetMouse = [x, y];
    }
    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      entries => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    let lastTime = performance.now();
    let totalTime = 0;

    function update(t: number) {
      animationFrameId.current = requestAnimationFrame(update);
      if (!isVisible) return;

      const delta = Math.min((t - lastTime) * 0.001, 0.1);
      lastTime = t;
      totalTime += delta;

      if (propsRef.current.enableMouseInteraction) {
        currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05;
        currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05;
      }

      program.uniforms.uColor.value.set(...propsRef.current.color);
      program.uniforms.uAmplitude.value = propsRef.current.amplitude;
      program.uniforms.uDistance.value = propsRef.current.distance;
      program.uniforms.uMouse.value = currentMouse;
      program.uniforms.uTime.value = totalTime;

      renderer.render({ scene: mesh });
    }
    animationFrameId.current = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
      {...rest}
    />
  );
};

export default Threads;
export { Threads };
