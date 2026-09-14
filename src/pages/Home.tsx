import { Link } from 'react-router-dom'
import { Card, PremiumLock } from '../components/Card'
import { DAILY_WORDS } from '../data/dailyWords'
import { useStore } from '../lib/store'

export function Home() {
  const { profile, sign, isPremium } = useStore()
  const words = sign ? DAILY_WORDS[sign.id] : null

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col items-center gap-2 text-center">
        <span className="text-5xl">🌟</span>
        <p className="text-sm text-mystic-200/70">
          Hello, {profile.name || 'friend'}. {sign ? `${sign.symbol} ${sign.name}` : ''} — day {profile.streak} of paying attention to the universe.
        </p>
      </Card>

      <Card>
        <h2 className="font-display text-lg text-gold">Today's Word</h2>
        <p className="mt-2 text-sm text-mystic-50">{words?.free ?? 'The stars are still warming up.'}</p>
      </Card>

      <div>
        <h3 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Deeper reading</h3>
        <PremiumLock unlocked={isPremium}>
          <Card>
            <p className="text-sm text-mystic-50">{words?.premium}</p>
          </Card>
        </PremiumLock>
        {!isPremium && (
          <Link to="/upgrade" className="mt-2 block text-center text-xs text-gold underline">
            Unlock the full reading
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/tarot" className="rounded-xl bg-void-light p-4 text-center">
          <span className="block text-2xl">🃏</span>
          <span className="text-xs text-mystic-200/70">Draw today's card</span>
        </Link>
        <Link to="/moon" className="rounded-xl bg-void-light p-4 text-center">
          <span className="block text-2xl">🌙</span>
          <span className="text-xs text-mystic-200/70">Check the moon</span>
        </Link>
      </div>
    </div>
  )
}
