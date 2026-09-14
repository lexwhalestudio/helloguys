import type { ZodiacSign } from './zodiac'

const ELEMENT_AFFINITY: Record<string, Record<string, number>> = {
  Fire: { Fire: 80, Air: 90, Earth: 45, Water: 40 },
  Earth: { Earth: 85, Water: 90, Fire: 45, Air: 40 },
  Air: { Air: 80, Fire: 90, Water: 45, Earth: 40 },
  Water: { Water: 85, Earth: 90, Air: 45, Fire: 40 },
}

const VERDICTS: Array<{ min: number; verdict: string; blurb: string }> = [
  { min: 85, verdict: 'Written in the stars', blurb: 'Suspiciously good. Either destiny or you both just have great taste.' },
  { min: 65, verdict: 'Strong potential', blurb: 'Real chemistry here — the kind that survives an argument about dishes.' },
  { min: 45, verdict: 'Workable, with effort', blurb: 'Not a cosmic slam dunk, but plenty of mismatched signs make it work anyway.' },
  { min: 0, verdict: 'A character-building match', blurb: 'The universe is testing your patience. Communication will matter a lot here.' },
]

export function getCompatibility(a: ZodiacSign, b: ZodiacSign): { score: number; verdict: string; blurb: string } {
  const base = ELEMENT_AFFINITY[a.element][b.element]
  // Small deterministic jitter so identical-element pairs aren't all identical scores.
  const jitter = (a.id.charCodeAt(0) + b.id.charCodeAt(0)) % 10
  const score = Math.min(99, base + jitter - 5)
  const { verdict, blurb } = VERDICTS.find((v) => score >= v.min)!
  return { score, verdict, blurb }
}
