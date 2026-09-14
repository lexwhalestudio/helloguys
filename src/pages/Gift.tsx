import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PublicShell } from '../components/PublicShell'
import { useStore, WELCOME_GIFT } from '../lib/store'

export function Gift() {
  const { claimWelcomeGift, profile } = useStore()
  const navigate = useNavigate()
  const [claimed, setClaimed] = useState(profile.firstRunComplete)

  function handleClaim() {
    claimWelcomeGift()
    setClaimed(true)
  }

  return (
    <PublicShell>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
        <span className="text-7xl">🎁</span>
        <div>
          <h1 className="font-display text-2xl text-gold">A gift, before you begin.</h1>
          <p className="mt-2 max-w-sm text-sm text-mystic-200/70">
            Every new wanderer gets a little something to start with. Spend it however you like.
          </p>
        </div>

        <div className="flex w-full items-center justify-around rounded-2xl border border-mystic-600/30 bg-void-light py-6">
          <div>
            <div className="text-3xl">🪙</div>
            <div className="mt-1 text-lg font-semibold text-mystic-50">{WELCOME_GIFT.coins}</div>
            <div className="text-[11px] text-mystic-200/60">Coins</div>
          </div>
          <div>
            <div className="text-3xl">💎</div>
            <div className="mt-1 text-lg font-semibold text-mystic-50">{WELCOME_GIFT.gems}</div>
            <div className="text-[11px] text-mystic-200/60">Gems</div>
          </div>
        </div>

        <p className="text-xs text-mystic-200/50">Plus 2 starter minerals, already in your collection.</p>

        <button
          onClick={() => {
            if (!claimed) handleClaim()
            navigate('/')
          }}
          className="w-full rounded-xl bg-mystic-600 py-3 font-semibold text-white"
        >
          {claimed ? 'Continue' : 'Claim your gift'}
        </button>
      </div>
    </PublicShell>
  )
}
