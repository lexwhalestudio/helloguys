import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { useStore, type SubscriptionTier } from '../lib/store'

const TIERS: Array<{ id: SubscriptionTier; name: string; price: string; tagline: string; features: string[] }> = [
  {
    id: 'apprentice',
    name: 'Apprentice',
    price: 'Free',
    tagline: 'The stars, on a budget.',
    features: ['Daily one-liner', 'Moon calendar', '1 tarot card/day', 'Starter minerals'],
  },
  {
    id: 'mystic',
    name: 'Mystic',
    price: '$4.99/mo',
    tagline: 'For the mildly obsessed.',
    features: ['Full daily + weekly reading', 'Tarot spreads', 'Faster mineral drops', 'Deeper companion chats'],
  },
  {
    id: 'oracle',
    name: 'Oracle',
    price: '$9.99/mo',
    tagline: 'For those who have made peace with it.',
    features: ['Everything in Mystic', 'Yearly forecast', 'Compatibility readings', 'Rare & legendary minerals'],
  },
]

export function Upgrade() {
  const { profile, setTier } = useStore()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4">
      <Card className="text-center">
        <h1 className="font-display text-lg text-gold">Choose your path</h1>
        <p className="text-sm text-mystic-200/70">The stars are free. My rent is not.</p>
      </Card>

      {TIERS.map((tier) => {
        const isCurrent = profile.tier === tier.id
        return (
          <Card key={tier.id} className={isCurrent ? 'border-gold' : undefined}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base text-gold">{tier.name}</h2>
                <p className="text-xs text-mystic-200/60">{tier.tagline}</p>
              </div>
              <span className="text-sm font-semibold text-mystic-50">{tier.price}</span>
            </div>
            <ul className="mt-2 list-inside list-disc text-xs text-mystic-200/70">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                setTier(tier.id)
                navigate('/')
              }}
              disabled={isCurrent}
              className="mt-3 w-full rounded-xl bg-mystic-600 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              {isCurrent ? 'Current plan' : `Choose ${tier.name}`}
            </button>
          </Card>
        )
      })}

      <p className="text-center text-[11px] text-mystic-200/40">
        Mock plan selector — no real payment wired up yet. Stripe integration comes once accounts are set up.
      </p>
    </div>
  )
}
