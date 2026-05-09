'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
}

function parseNumber(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([~]?)(\d+)([+%]?)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  return { prefix: match[1], number: parseInt(match[2]), suffix: match[3] }
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const { prefix, number, suffix } = parseNumber(value)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 40
    const increment = number / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, number])

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-4 text-center flex flex-col items-center justify-center gap-1 w-full h-full"
    >
      <span className="text-2xl font-bold font-heading text-accent">
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs text-light/60 leading-tight">{label}</span>
    </div>
  )
}
