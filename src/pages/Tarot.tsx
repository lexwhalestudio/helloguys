import { useMemo, useState } from 'react'
import { Card, PremiumLock } from '../components/Card'
import { TAROT_DECK, type TarotCard } from '../data/tarot'
import { useStore } from '../lib/store'

interface Draw {
  card: TarotCard
  reversed: boolean
}

function drawCard(): Draw {
  const card = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)]
  return { card, reversed: Math.random() < 0.3 }
}

export function Tarot() {
  const { isPremium } = useStore()
  const [dailyDraw] = useState<Draw>(() => drawCard())
  const [spread, setSpread] = useState<Draw[] | null>(null)

  const dailyMeaning = useMemo(
    () => (dailyDraw.reversed ? dailyDraw.card.reversed : dailyDraw.card.upright),
    [dailyDraw],
  )

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-lg text-gold">Card of the Day</h1>
        <span className="text-5xl">{dailyDraw.card.emoji}</span>
        <p className="text-sm text-mystic-50">
          {dailyDraw.card.name} {dailyDraw.reversed && <span className="text-mystic-200/60">(reversed)</span>}
        </p>
        <p className="text-sm text-mystic-200/70">{dailyMeaning}</p>
      </Card>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Three-card spread</h2>
        <PremiumLock unlocked={isPremium}>
          <Card>
            <button
              onClick={() => setSpread([drawCard(), drawCard(), drawCard()])}
              className="w-full rounded-xl bg-mystic-600 py-2 text-sm font-semibold text-white"
            >
              Draw a spread
            </button>
            {spread && (
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {spread.map((d, i) => (
                  <div key={i}>
                    <span className="block text-3xl">{d.card.emoji}</span>
                    <span className="text-[11px] text-mystic-200/70">{d.card.name}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </PremiumLock>
      </div>
    </div>
  )
}
