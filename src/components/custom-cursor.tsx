'use client'

import { useEffect, useRef } from 'react'

const TRIANGLE = 'polygon(50% 0%, 100% 100%, 0% 100%)'

function isSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(ua)
}

interface CustomCursorProps {
  isLightMode?: boolean;
}

export function CustomCursor({ isLightMode: _isLightMode }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const sparkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    const spark = sparkRef.current

    if (!cursor || !trail || !spark) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const tr = { x: pos.x, y: pos.y }
    let targetScale = 1
    let curScale = 1
    let raf = 0
    let started = false

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!started) {
        started = true
        cursor.style.opacity = '1'
        trail.style.opacity = '0.1'
      }
      const target = e.target as HTMLElement | null
      const interactive = target?.closest(
        '[data-cursor="grow"], button, a, input, select, textarea, [role="button"], .interactive-target, #inbox-comparison, #pricing-tiers-grid'
      )
      targetScale = interactive ? 1.3 : 1
    }

    const onDown = () => {
      spark.style.transition = 'none'
      spark.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(0)`
      spark.style.opacity = '0.9'
      void spark.offsetWidth
      spark.style.transition = 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)'
      spark.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(1.4)`
      spark.style.opacity = '0'
    }

    const loop = () => {
      tr.x += (pos.x - tr.x) * 0.15
      tr.y += (pos.y - tr.y) * 0.15
      curScale += (targetScale - curScale) * 0.18

      // Translate so the top-center triangle tip (50% 0%) sits precisely at (pos.x, pos.y) and rotates about the tip
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, 0) rotate(-22deg) scale(${curScale})`
      trail.style.transform = `translate3d(${tr.x}px, ${tr.y}px, 0) translate(-50%, 0) rotate(-22deg) scale(${curScale * 0.6})`

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      cancelAnimationFrame(raf)
    }
  }, [])

  const safari = typeof window !== 'undefined' && isSafari()

  return (
    <>
      {/* SVG glass refraction filter guarantee */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <filter id="glass-refract">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={1} seed={4} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={16} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Main Glass Refracting Triangle Cursor - Origin at Tip (50% 0%) */}
      <div
        id="custom-cursor"
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '23px',
          height: '23px',
          transformOrigin: '50% 0%',
          clipPath: TRIANGLE,
          backdropFilter: safari ? 'blur(2px)' : 'blur(1px) saturate(200%)',
          WebkitBackdropFilter: safari ? 'blur(2px)' : 'blur(1px) saturate(200%)',
          filter: safari ? undefined : 'url(#glass-refract)',
          border: '0.5px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: safari ? 0.9 : 0,
          willChange: 'transform',
        }}
      />

      {/* Trailing Copy: 60% size, opacity 0.1, blur 4px, origin at Tip */}
      <div
        id="custom-cursor-trail"
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '20px',
          height: '20px',
          transformOrigin: '50% 0%',
          clipPath: TRIANGLE,
          filter: 'blur(4px)',
          background: 'rgba(255, 255, 255, 0.7)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          willChange: 'transform',
        }}
      />

      {/* Click Spark: Circle expanding from exact cursor tip location */}
      <div
        id="custom-cursor-spark"
        ref={sparkRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0,
          transformOrigin: 'center center',
        }}
      />
    </>
  )
}
