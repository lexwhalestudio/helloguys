import { Card } from '../components/Card'
import { MINERALS, RARITY_LABEL } from '../data/minerals'
import { useStore } from '../lib/store'

const RARITY_COLOR: Record<string, string> = {
  common: 'text-mystic-200/70',
  uncommon: 'text-mystic-50',
  rare: 'text-mystic-400',
  legendary: 'text-gold',
}

export function Minerals() {
  const { profile, isPremium } = useStore()
  const owned = new Set(profile.unlockedMineralIds)

  return (
    <div className="flex flex-col gap-4">
      <Card className="text-center">
        <h1 className="font-display text-lg text-gold">Your Collection</h1>
        <p className="text-sm text-mystic-200/70">
          {owned.size} / {MINERALS.length} minerals found
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {MINERALS.map((mineral) => {
          const isOwned = owned.has(mineral.id)
          const isLocked = mineral.premiumOnly && !isPremium && !isOwned
          return (
            <Card key={mineral.id} className={`text-center ${!isOwned ? 'opacity-40' : ''}`}>
              <span className="block text-3xl">{isLocked ? '❔' : mineral.emoji}</span>
              <p className="mt-1 text-sm text-mystic-50">{isOwned ? mineral.name : '???'}</p>
              <p className={`text-[10px] uppercase tracking-wide ${RARITY_COLOR[mineral.rarity]}`}>
                {RARITY_LABEL[mineral.rarity]}
              </p>
              {isOwned && <p className="mt-1 text-[11px] text-mystic-200/60">{mineral.meaning}</p>}
              {isLocked && <p className="mt-1 text-[11px] text-gold">Premium unlock</p>}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
