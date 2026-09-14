import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getSignForDate, type ZodiacSign } from './zodiac'

export type SubscriptionTier = 'apprentice' | 'mystic' | 'oracle'
export type Gender = 'female' | 'male' | 'non-binary' | 'prefer-not-to-say'

export interface Wallet {
  coins: number
  gems: number
}

export interface UserProfile {
  email: string | null
  name: string
  birthDate: string | null // ISO date, e.g. "1995-06-21"
  gender: Gender | null
  tier: SubscriptionTier
  unlockedMineralIds: string[]
  streak: number
  wallet: Wallet
  dossierRewarded: string[]
  dossier: {
    birthTime: string
    birthPlace: string
    focusArea: string
    relationshipStatus: string
  }
}

const EMPTY_DOSSIER = { birthTime: '', birthPlace: '', focusArea: '', relationshipStatus: '' }
const DOSSIER_FIELD_REWARD_COINS = 25

const DEFAULT_PROFILE: UserProfile = {
  email: null,
  name: '',
  birthDate: null,
  gender: null,
  tier: 'apprentice',
  unlockedMineralIds: ['quartz', 'amethyst'],
  streak: 1,
  wallet: { coins: 150, gems: 50 },
  dossierRewarded: [],
  dossier: EMPTY_DOSSIER,
}

const STORAGE_KEY = 'mystic-companion-profile'

interface StoreValue {
  profile: UserProfile
  sign: ZodiacSign | null
  hasAccount: boolean
  isOnboarded: boolean
  isPremium: boolean
  setProfile: (updater: (prev: UserProfile) => UserProfile) => void
  register: (email: string) => void
  login: (email: string) => boolean
  logout: () => void
  completeOnboarding: (name: string, birthDate: string, gender: Gender) => void
  setTier: (tier: SubscriptionTier) => void
  unlockMineral: (mineralId: string) => void
  updateDossier: (fields: Partial<UserProfile['dossier']>) => void
  dossierCompletion: number
  earnCoins: (amount: number) => void
  earnGems: (amount: number) => void
  spendCoins: (amount: number) => boolean
  spendGems: (amount: number) => boolean
}

const StoreContext = createContext<StoreValue | null>(null)

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROFILE
    const parsed = JSON.parse(raw)
    return { ...DEFAULT_PROFILE, ...parsed, wallet: { ...DEFAULT_PROFILE.wallet, ...parsed.wallet } }
  } catch {
    return DEFAULT_PROFILE
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile>(loadProfile)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const sign = useMemo(() => (profile.birthDate ? getSignForDate(new Date(profile.birthDate)) : null), [profile.birthDate])

  const dossierCompletion = useMemo(() => {
    const fields = Object.values(profile.dossier)
    const filled = fields.filter((f) => f.trim().length > 0).length
    return Math.round((filled / fields.length) * 100)
  }, [profile.dossier])

  const value: StoreValue = {
    profile,
    sign,
    hasAccount: Boolean(profile.email),
    isOnboarded: Boolean(profile.name && profile.birthDate && profile.gender),
    isPremium: profile.tier !== 'apprentice',
    setProfile: (updater) => setProfileState(updater),
    register: (email) => setProfileState((prev) => ({ ...prev, email: email.trim().toLowerCase() })),
    login: (email) => {
      const normalized = email.trim().toLowerCase()
      if (!profile.email || profile.email !== normalized) return false
      return true
    },
    logout: () => setProfileState(() => DEFAULT_PROFILE),
    completeOnboarding: (name, birthDate, gender) => setProfileState((prev) => ({ ...prev, name, birthDate, gender })),
    setTier: (tier) => setProfileState((prev) => ({ ...prev, tier })),
    unlockMineral: (mineralId) =>
      setProfileState((prev) =>
        prev.unlockedMineralIds.includes(mineralId)
          ? prev
          : { ...prev, unlockedMineralIds: [...prev.unlockedMineralIds, mineralId] },
      ),
    updateDossier: (fields) =>
      setProfileState((prev) => {
        const nextDossier = { ...prev.dossier, ...fields }
        const newlyRewarded: string[] = []
        let bonusCoins = 0
        for (const [key, value] of Object.entries(fields)) {
          const wasEmpty = !prev.dossier[key as keyof typeof prev.dossier].trim()
          const isNowFilled = Boolean(value && value.trim())
          const alreadyRewarded = prev.dossierRewarded.includes(key)
          if (wasEmpty && isNowFilled && !alreadyRewarded) {
            newlyRewarded.push(key)
            bonusCoins += DOSSIER_FIELD_REWARD_COINS
          }
        }
        return {
          ...prev,
          dossier: nextDossier,
          dossierRewarded: [...prev.dossierRewarded, ...newlyRewarded],
          wallet: { ...prev.wallet, coins: prev.wallet.coins + bonusCoins },
        }
      }),
    dossierCompletion,
    earnCoins: (amount) => setProfileState((prev) => ({ ...prev, wallet: { ...prev.wallet, coins: prev.wallet.coins + amount } })),
    earnGems: (amount) => setProfileState((prev) => ({ ...prev, wallet: { ...prev.wallet, gems: prev.wallet.gems + amount } })),
    spendCoins: (amount) => {
      if (profile.wallet.coins < amount) return false
      setProfileState((prev) => ({ ...prev, wallet: { ...prev.wallet, coins: prev.wallet.coins - amount } }))
      return true
    },
    spendGems: (amount) => {
      if (profile.wallet.gems < amount) return false
      setProfileState((prev) => ({ ...prev, wallet: { ...prev.wallet, gems: prev.wallet.gems - amount } }))
      return true
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
