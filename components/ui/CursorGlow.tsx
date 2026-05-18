'use client'
import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glowRef.current
    if (!el) return

    let raf: number

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        el.style.opacity = '1'
      })
    }

    const onLeave = () => { el.style.opacity = '0' }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50"
      style={{
        width: 280,
        height: 280,
        marginLeft: -140,
        marginTop: -140,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.055) 0%, rgba(0,217,255,0.018) 35%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
