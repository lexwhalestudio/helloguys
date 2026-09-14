export interface MoonPhase {
  name: string
  emoji: string
  /** 0 = new moon, 0.5 = full moon, wraps at 1 */
  age: number
  illumination: number
  ritual: string
}

// A known new moon reference (2000-01-06 18:14 UTC) and the synodic month length.
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14)
const SYNODIC_MONTH_DAYS = 29.530588853

const PHASES: Array<{ max: number; name: string; emoji: string; ritual: string }> = [
  { max: 0.02, name: 'New Moon', emoji: '🌑', ritual: 'Set an intention. Plant a seed, literal or otherwise.' },
  { max: 0.25, name: 'Waxing Crescent', emoji: '🌒', ritual: 'Take the first small step on that intention.' },
  { max: 0.27, name: 'First Quarter', emoji: '🌓', ritual: 'Push through the first real obstacle. It builds character.' },
  { max: 0.48, name: 'Waxing Gibbous', emoji: '🌔', ritual: 'Refine, adjust, keep going. Almost there.' },
  { max: 0.52, name: 'Full Moon', emoji: '🌕', ritual: 'Release what no longer serves you. Also: it is a great night for drama, astrologically speaking.' },
  { max: 0.73, name: 'Waning Gibbous', emoji: '🌖', ritual: 'Give thanks. Share what you have learned.' },
  { max: 0.77, name: 'Last Quarter', emoji: '🌗', ritual: 'Let go, forgive, declutter — physically and emotionally.' },
  { max: 0.98, name: 'Waning Crescent', emoji: '🌘', ritual: 'Rest. Reflect. The universe is not done with you yet.' },
  { max: 1, name: 'New Moon', emoji: '🌑', ritual: 'Set an intention. Plant a seed, literal or otherwise.' },
]

export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const daysSinceReference = (date.getTime() - REFERENCE_NEW_MOON) / 86400000
  const cyclePosition = daysSinceReference / SYNODIC_MONTH_DAYS
  const age = cyclePosition - Math.floor(cyclePosition)

  const phase = PHASES.find((p) => age <= p.max) ?? PHASES[PHASES.length - 1]
  const illumination = Math.round((1 - Math.cos(age * 2 * Math.PI)) * 50)

  return { name: phase.name, emoji: phase.emoji, age, illumination, ritual: phase.ritual }
}

const MAJOR_PHASES = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter']
const STEP_HOURS = 3

export function getUpcomingPhases(fromDate: Date = new Date(), count = 4): Array<{ date: Date; phase: MoonPhase }> {
  const results: Array<{ date: Date; phase: MoonPhase }> = []
  let cursorMs = fromDate.getTime()
  let lastName = getMoonPhase(new Date(cursorMs)).name

  while (results.length < count) {
    cursorMs += STEP_HOURS * 3600000
    const phase = getMoonPhase(new Date(cursorMs))
    if (MAJOR_PHASES.includes(phase.name) && phase.name !== lastName) {
      results.push({ date: new Date(cursorMs), phase })
    }
    lastName = phase.name
  }

  return results
}
