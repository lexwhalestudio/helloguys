import { Card } from '../components/Card'
import { getMoonPhase, getUpcomingPhases } from '../lib/moon'

export function MoonCalendar() {
  const phase = getMoonPhase()
  const upcoming = getUpcomingPhases()

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-2 text-center">
        <span className="text-6xl">{phase.emoji}</span>
        <h1 className="font-display text-xl text-gold">{phase.name}</h1>
        <p className="text-sm text-mystic-200/70">{phase.illumination}% illuminated</p>
        <p className="mt-2 text-sm text-mystic-50">{phase.ritual}</p>
      </Card>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Upcoming phases</h2>
        <div className="flex flex-col gap-2">
          {upcoming.map(({ date, phase: p }) => (
            <Card key={date.toISOString()} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-sm text-mystic-50">{p.name}</span>
              </div>
              <span className="text-xs text-mystic-200/60">
                {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
