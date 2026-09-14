import { useState } from 'react'
import { Card } from '../components/Card'
import { COIN_EARN_ACTIONS, COIN_PACKS, COMING_SOON_ITEMS, GEM_PACKS, MINERAL_PULLS } from '../data/shop'
import { MINERALS } from '../data/minerals'
import { useStore } from '../lib/store'

function pullMineral(rarities: string[], ownedIds: string[]): { mineralId: string; isDuplicate: boolean } {
  const pool = MINERALS.filter((m) => rarities.includes(m.rarity))
  const unowned = pool.filter((m) => !ownedIds.includes(m.id))
  const candidates = unowned.length > 0 ? unowned : pool
  const picked = candidates[Math.floor(Math.random() * candidates.length)]
  return { mineralId: picked.id, isDuplicate: unowned.length === 0 }
}

const DUPLICATE_REFUND_COINS = 20

export function Shop() {
  const { profile, spendCoins, spendGems, earnCoins, earnGems, unlockMineral } = useStore()
  const [message, setMessage] = useState<string | null>(null)

  function handlePull(pull: (typeof MINERAL_PULLS)[number]) {
    const spend = pull.currency === 'coins' ? spendCoins : spendGems
    if (!spend(pull.cost)) {
      setMessage(`Not enough ${pull.currency === 'coins' ? 'Coins' : 'Gems'} for that yet.`)
      return
    }
    const { mineralId, isDuplicate } = pullMineral(pull.rarities, profile.unlockedMineralIds)
    const mineral = MINERALS.find((m) => m.id === mineralId)!
    if (isDuplicate) {
      earnCoins(DUPLICATE_REFUND_COINS)
      setMessage(`Duplicate! You already have ${mineral.name} — here's ${DUPLICATE_REFUND_COINS} coins instead.`)
    } else {
      unlockMineral(mineralId)
      setMessage(`You found ${mineral.emoji} ${mineral.name}!`)
    }
  }

  function handleBuyPack(kind: 'coins' | 'gems', amount: number, name: string) {
    if (kind === 'coins') earnCoins(amount)
    else earnGems(amount)
    setMessage(`Demo purchase: +${amount} ${kind === 'coins' ? 'Coins' : 'Gems'} from the ${name} pack. (No real payment yet.)`)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex items-center justify-around text-center">
        <div>
          <div className="text-2xl">🪙</div>
          <div className="text-lg font-semibold text-mystic-50">{profile.wallet.coins}</div>
          <div className="text-[11px] text-mystic-200/60">Coins</div>
        </div>
        <div>
          <div className="text-2xl">💎</div>
          <div className="text-lg font-semibold text-mystic-50">{profile.wallet.gems}</div>
          <div className="text-[11px] text-mystic-200/60">Gems</div>
        </div>
      </Card>

      {message && (
        <Card className="border-gold text-center text-sm text-gold">
          {message}
        </Card>
      )}

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Mineral Pulls</h2>
        <div className="flex flex-col gap-2">
          {MINERAL_PULLS.map((pull) => (
            <Card key={pull.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mystic-50">{pull.name}</p>
                <p className="text-[11px] text-mystic-200/60">{pull.description}</p>
              </div>
              <button
                onClick={() => handlePull(pull)}
                className="whitespace-nowrap rounded-xl bg-mystic-600 px-3 py-2 text-xs font-semibold text-white"
              >
                {pull.currency === 'coins' ? '🪙' : '💎'} {pull.cost}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Coming Soon</h2>
        <div className="flex flex-col gap-2">
          {COMING_SOON_ITEMS.map((item) => (
            <Card key={item.id} className="flex items-center justify-between opacity-60">
              <div>
                <p className="text-sm text-mystic-50">{item.name}</p>
                <p className="text-[11px] text-mystic-200/60">{item.description}</p>
              </div>
              <span className="whitespace-nowrap rounded-xl border border-mystic-600/30 px-3 py-2 text-xs font-semibold text-mystic-200/60">
                {item.currency === 'coins' ? '🪙' : '💎'} {item.cost}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Buy Gems</h2>
        <div className="grid grid-cols-2 gap-2">
          {GEM_PACKS.map((pack) => (
            <Card key={pack.id} className="text-center">
              <p className="text-sm text-mystic-50">💎 {pack.amount.toLocaleString()}</p>
              {pack.bonusLabel && <p className="text-[11px] text-gold">{pack.bonusLabel}</p>}
              <button
                onClick={() => handleBuyPack('gems', pack.amount, pack.name)}
                className="mt-2 w-full rounded-xl bg-void px-2 py-2 text-xs font-semibold text-mystic-50"
              >
                ${pack.priceUsd.toFixed(2)}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Buy Coins</h2>
        <div className="grid grid-cols-3 gap-2">
          {COIN_PACKS.map((pack) => (
            <Card key={pack.id} className="text-center">
              <p className="text-sm text-mystic-50">🪙 {pack.amount.toLocaleString()}</p>
              {pack.bonusLabel && <p className="text-[11px] text-gold">{pack.bonusLabel}</p>}
              <button
                onClick={() => handleBuyPack('coins', pack.amount, pack.name)}
                className="mt-2 w-full rounded-xl bg-void px-2 py-2 text-xs font-semibold text-mystic-50"
              >
                ${pack.priceUsd.toFixed(2)}
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xs uppercase tracking-wide text-mystic-200/50">Ways to Earn Coins</h2>
        <Card>
          <ul className="flex flex-col gap-1.5 text-sm text-mystic-200/80">
            {COIN_EARN_ACTIONS.map((a) => (
              <li key={a.action} className="flex justify-between">
                <span>{a.action}</span>
                <span className="text-gold">{a.amount}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className="text-center text-[11px] text-mystic-200/40">
        Gem/Coin packs above are a demo — no real payment is wired up yet. Mineral pulls are fully
        functional and update your Minerals collection.
      </p>
    </div>
  )
}
