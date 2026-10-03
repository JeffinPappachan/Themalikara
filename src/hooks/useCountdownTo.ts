import { useEffect, useState } from 'react'

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

function getParts(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now())
  if (diff === 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, isComplete: false }
}

export function useCountdownTo(isoTarget: string): CountdownParts {
  const targetMs = new Date(isoTarget).getTime()

  const [parts, setParts] = useState(() => getParts(targetMs))

  useEffect(() => {
    setParts(getParts(targetMs))
    const id = window.setInterval(() => setParts(getParts(targetMs)), 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  return parts
}
