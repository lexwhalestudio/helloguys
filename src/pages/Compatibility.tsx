import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, PremiumLock } from '../components/Card'
import { getCompatibility } from '../lib/compatibility'
import { useStore } from '../lib/store'
import { getSignForDate } from '../lib/zodiac'

export function Compatibility() {
  const { sign, isPremium, dossierCompletion } = useStore()
  const [otherDate, setOtherDate] = useState('')

  const otherSign = otherDate ? getSignForDate(new Date(otherDate)) : null
  const result = sign && otherSign ? getCompatibility(sign, otherSign) : null

  const dossierReady = dossierCompletion >= 50

  return (
    <div className="flex flex-col gap-4">
      <Card className="text-center">
        <h1 className="font-display text-lg text-gold">Compatibility</h1>
        <p className="text-sm text-mystic-200/70">Enter someone else's birth date to see how the stars line up.</p>
      </Card>

      {!dossierReady && (
        <Card className="text-center text-sm text-mystic-200/70">
          Fill out a bit more of your{' '}
          <Link to="/profile" className="text-gold underline">
            Dossier
          </Link>{' '}
          before the stars will gossip about your match. ({dossierCompletion}% done)
        </Card>
      )}

      <PremiumLock unlocked={isPremium && dossierReady} label={dossierReady ? 'Premium' : 'A completed Dossier'}>
        <Card className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-mystic-200/80">
            Their birth date
            <input
              type="date"
              value={otherDate}
              onChange={(e) => setOtherDate(e.target.value)}
              className="rounded-xl border border-mystic-600/30 bg-void px-3 py-2 text-mystic-50 outline-none focus:border-gold"
            />
          </label>

          {result && otherSign && sign && (
            <div className="mt-2 flex flex-col items-center gap-1 text-center">
              <p className="text-sm text-mystic-200/70">
                {sign.symbol} {sign.name} + {otherSign.symbol} {otherSign.name}
              </p>
              <span className="font-display text-3xl text-gold">{result.score}%</span>
              <p className="text-sm text-mystic-50">{result.verdict}</p>
              <p className="text-xs text-mystic-200/60">{result.blurb}</p>
            </div>
          )}
        </Card>
      </PremiumLock>
    </div>
  )
}
